<?php

namespace Solspace\Calendar\Services;

use Carbon\Carbon;
use craft\base\Component;
use craft\db\Query;
use craft\db\Table;
use craft\elements\ElementCollection;
use craft\errors\InvalidElementException;
use craft\helpers\Db;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceCodes;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceMaterializer;
use Solspace\Calendar\Bundles\Occurrences\OverrideReconciler;
use Solspace\Calendar\Bundles\Occurrences\RecurrenceId;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\RRule\RecurringEventMutationHelper;
use Solspace\Calendar\Records\EventSplitRecord;
use Solspace\Calendar\Records\OccurrenceOverrideRecord;
use Solspace\Calendar\Records\OccurrenceRecord;
use yii\base\InvalidArgumentException;

/**
 * Changes events from one occurrence onward ("this and following").
 *
 * A split ends an event's schedule just before one of its occurrences and continues it from there.
 * The part from that occurrence onward keeps the event itself: its ID, URI and relations. The earlier
 * part becomes a new event in the same series, and the earlier occurrences' overrides and codes move to it.
 */
class SeriesService extends Component
{
    private OccurrenceMaterializer $materializer;

    private OccurrenceCodes $codes;

    private RecurringEventMutationHelper $mutationHelper;

    public function init(): void
    {
        parent::init();

        $this->codes = new OccurrenceCodes();
        $this->materializer = new OccurrenceMaterializer($this->codes);
        $this->mutationHelper = new RecurringEventMutationHelper();
    }

    /**
     * Changes an event from one of its occurrences onward and saves it. `$applyChanges` gets the event
     * once it starts at that occurrence. At the first occurrence, this is a plain edit of the event.
     *
     * @param null|callable(Event): void $applyChanges
     *
     * @return Event the event, which now starts at the occurrence
     *
     * @throws InvalidArgumentException when the event has no such occurrence
     * @throws InvalidElementException  when the event can't be saved
     */
    public function split(Event $event, mixed $recurrenceId, ?callable $applyChanges = null): Event
    {
        $splitAt = $this->requireOccurrence($event, $recurrenceId);
        $transaction = \Craft::$app->getDb()->beginTransaction();

        try {
            if ($this->hasOccurrencesBefore($event, $splitAt)) {
                $earlier = $this->forkEarlierPart($event, $splitAt);
                $this->continueFrom($event, $splitAt);
                $event->seriesId = $earlier->seriesId;
            }

            if ($applyChanges) {
                $applyChanges($event);
            }

            $this->saveOrFail($event);
            $transaction->commit();
        } catch (\Throwable $exception) {
            $transaction->rollBack();

            throw $exception;
        }

        return $event;
    }

    /**
     * Ends an event's schedule just before one of its occurrences ("delete this and following"),
     * along with the later occurrences' overrides. At the first occurrence, the event is deleted.
     *
     * @throws InvalidArgumentException when the event has no such occurrence
     * @throws InvalidElementException  when the event can't be saved
     */
    public function endAt(Event $event, mixed $recurrenceId): bool
    {
        $splitAt = $this->requireOccurrence($event, $recurrenceId);
        if (!$this->hasOccurrencesBefore($event, $splitAt)) {
            return Calendar::getInstance()->events->deleteEvent($event);
        }

        $transaction = \Craft::$app->getDb()->beginTransaction();

        try {
            $split = $this->splitSchedule($event, $splitAt);
            \Craft::configure($event, $this->earlierPartAttributes($event, $split));

            $laterIds = $this->findOverrideIds((int) $event->id, '>=', $splitAt);
            $later = $laterIds
                ? OccurrenceOverride::find()->id($laterIds)->siteId($event->siteId)->status(null)->all()
                : [];

            foreach ($later as $override) {
                if (!\Craft::$app->getElements()->deleteElement($override, true)) {
                    throw new InvalidElementException($override, 'Couldn’t delete the occurrence override.');
                }
            }

            $this->saveOrFail($event);
            $transaction->commit();
        } catch (\Throwable $exception) {
            $transaction->rollBack();

            throw $exception;
        }

        return true;
    }

    /**
     * Starts "Edit this and following": a draft of the event that starts at the occurrence. Applying
     * the draft splits the event there. Returns null for the first occurrence, which is a plain edit.
     *
     * @throws InvalidArgumentException when the event has no such occurrence
     */
    public function createSplitDraft(Event $event, mixed $recurrenceId, int $creatorId): ?Event
    {
        $splitAt = $this->requireOccurrence($event, $recurrenceId);
        if (!$this->hasOccurrencesBefore($event, $splitAt)) {
            return null;
        }

        $later = clone $event;
        $this->continueFrom($later, $splitAt);

        $transaction = \Craft::$app->getDb()->beginTransaction();

        try {
            /** @var Event $draft */
            $draft = \Craft::$app->getDrafts()->createDraft(
                $event,
                $creatorId,
                Calendar::t('From {date}', ['date' => DateHelper::formatFloating($splitAt, $event->isAllDay())]),
                null,
                [
                    'startDate' => $later->startDate,
                    'endDate' => $later->endDate,
                    'rrule' => $later->rrule,
                    'repeatType' => $later->repeatType,
                    'repeatEndType' => $later->repeatEndType,
                ],
            );

            Db::insert(EventSplitRecord::TABLE, [
                'eventId' => $draft->id,
                'splitAt' => $splitAt->format(RecurrenceId::FORMAT),
            ]);

            // The earlier occurrences' overrides go to the earlier part when the draft is applied, so
            // the draft doesn't use them
            Db::delete(Table::ELEMENTS_OWNERS, [
                'ownerId' => $draft->id,
                'elementId' => $this->findOverrideIds((int) $event->id, '<', $splitAt),
            ]);

            $transaction->commit();
        } catch (\Throwable $exception) {
            $transaction->rollBack();

            throw $exception;
        }

        return $draft;
    }

    /**
     * The occurrence a draft made with "Edit this and following" continues its event from.
     */
    public function getSplitAt(Event $draft): ?Carbon
    {
        if (!$draft->id || !$draft->getIsDraft()) {
            return null;
        }

        $splitAt = (new Query())
            ->select(['splitAt'])
            ->from(EventSplitRecord::TABLE)
            ->where(['eventId' => $draft->id])
            ->scalar()
        ;

        return $splitAt ? RecurrenceId::toCarbon($splitAt) : null;
    }

    /**
     * Splits the live event as a draft made with "Edit this and following" is applied to it. Runs while the
     * draft is saved over the live event, in the same transaction, while the live event is still unchanged.
     *
     * @internal
     */
    public function splitForDraft(Event $event, Event $draft): void
    {
        $splitAt = $this->getSplitAt($draft);
        if (!$splitAt) {
            return;
        }

        $live = Event::find()->id($event->id)->siteId($event->siteId)->status(null)->one();
        if (!$live instanceof Event || !$this->hasOccurrencesBefore($live, $splitAt)) {
            return;
        }

        $event->seriesId = $this->forkEarlierPart($live, $splitAt)->seriesId;
    }

    /**
     * The events just before and after this one in its series, in any status.
     *
     * @return array{earlier: ?Event, later: ?Event}
     */
    public function getNeighbours(Event $event): array
    {
        $neighbours = ['earlier' => null, 'later' => null];
        if (!$event->seriesId) {
            return $neighbours;
        }

        $parts = Event::find()
            ->setSeriesId($event->seriesId)
            ->siteId($event->siteId)
            ->status(null)
            ->orderBy(['startDate' => \SORT_ASC])
            ->all()
        ;

        $ids = array_map(static fn (Event $part) => (int) $part->id, $parts);
        $index = array_search((int) $event->getCanonicalId(), $ids, true);
        if (false === $index) {
            return $neighbours;
        }

        return [
            'earlier' => $parts[$index - 1] ?? null,
            'later' => $parts[$index + 1] ?? null,
        ];
    }

    /**
     * Creates the earlier part as a copy of the event in every site, then moves the earlier occurrences'
     * overrides and codes to it. Leaves the event itself to the caller.
     */
    private function forkEarlierPart(Event $event, Carbon $splitAt): Event
    {
        $source = Event::find()->id($event->id)->siteId($event->siteId)->status(null)->one()
            ?? throw new InvalidArgumentException("Event {$event->id} could not be found.");

        $split = $this->splitSchedule($source, $splitAt);

        // Moved below instead of copied, so they keep their IDs
        $source->setOccurrenceOverrides(ElementCollection::make());

        /** @var Event $fork */
        $fork = \Craft::$app->getElements()->duplicateElement(
            $source,
            ['seriesId' => $source->seriesId ?? (int) $source->id] + $this->earlierPartAttributes($source, $split),
        );

        $splitKey = $splitAt->format(RecurrenceId::FORMAT);

        // Saving the copy gave its occurrences new codes; the earlier occurrences' own codes replace them.
        // Their rows go first, because codes are unique across occurrence rows too.
        $this->materializer->delete($fork);
        Db::delete(OccurrenceRecord::TABLE, ['and', ['eventId' => $source->id], ['<', 'recurrenceId', $splitKey]]);
        $this->codes->moveBefore((int) $source->id, (int) $fork->id, $splitKey);

        $overrideIds = $this->findOverrideIds((int) $source->id, '<', $splitAt);
        if ($overrideIds) {
            Db::update(OccurrenceOverrideRecord::TABLE, ['primaryOwnerId' => $fork->id], ['id' => $overrideIds]);
            Db::update(Table::ELEMENTS_OWNERS, ['ownerId' => $fork->id], ['elementId' => $overrideIds, 'ownerId' => $source->id]);

            // Drafts of the event shared them, but they belong to the earlier part alone now
            Db::delete(Table::ELEMENTS_OWNERS, ['and', ['elementId' => $overrideIds], ['not', ['ownerId' => $fork->id]]]);
        }

        (new OverrideReconciler($this->materializer, $this->codes))->reconcile($fork);
        $this->materializer->regenerate($fork);
        \Craft::$app->getElements()->invalidateCachesForElement($fork);

        return $fork;
    }

    /**
     * Makes the event start at the occurrence, keeping its length.
     */
    private function continueFrom(Event $event, Carbon $splitAt): void
    {
        $split = $this->splitSchedule($event, $splitAt);
        $length = $event->getStartDate()->diff($event->getEndDate());

        \Craft::configure($event, $this->scheduleAttributes(
            $split['after'],
            $event->repeatType,
            $event->repeatEndType,
            $event->until,
        ));

        $event->startDate = $split['afterStart']->copy();
        $event->endDate = $split['afterStart']->copy()->add($length);
    }

    /**
     * @return array{before: ?string, beforeUntil: ?Carbon, after: ?string, afterStart: Carbon}
     */
    private function splitSchedule(Event $event, Carbon $splitAt): array
    {
        return $this->mutationHelper->splitRRule(
            $event->getRRuleRFCString(),
            $event->getStartDate(),
            $event->isAllDay(),
            $splitAt,
        );
    }

    /**
     * The earlier part ends on a date, the way the event builder would set it up.
     */
    private function earlierPartAttributes(Event $event, array $split): array
    {
        return $this->scheduleAttributes(
            $split['before'],
            $event->repeatType,
            Event::REPEAT_END_ON_DATE,
            $split['beforeUntil'],
        );
    }

    /**
     * A part's rule with repeat settings that match it. A part left with additional dates and no
     * repeat rule is what the event builder calls selected dates.
     */
    private function scheduleAttributes(?string $rrule, ?string $repeatType, ?string $repeatEndType, ?Carbon $until): array
    {
        if (null === $rrule || !str_contains($rrule, 'RRULE:')) {
            return [
                'rrule' => $rrule,
                'until' => null,
                'repeatType' => Event::REPEAT_NEVER,
                'repeatEndType' => Event::REPEAT_END_NEVER,
            ];
        }

        return [
            'rrule' => $rrule,
            'until' => $until,
            'repeatType' => $repeatType,
            'repeatEndType' => $repeatEndType,
        ];
    }

    private function hasOccurrencesBefore(Event $event, Carbon $splitAt): bool
    {
        return (new Query())
            ->from(OccurrenceRecord::TABLE)
            ->where(['eventId' => $event->getCanonicalId()])
            ->andWhere(['<', 'recurrenceId', Db::prepareDateForDb($splitAt)])
            ->exists()
        ;
    }

    /**
     * The event's own overrides before (`<`) or from (`>=`) the occurrence, trashed ones included.
     *
     * @return int[]
     */
    private function findOverrideIds(int $eventId, string $operator, Carbon $splitAt): array
    {
        return array_map('intval', (new Query())
            ->select(['id'])
            ->from(OccurrenceOverrideRecord::TABLE)
            ->where(['primaryOwnerId' => $eventId])
            ->andWhere([$operator, 'recurrenceId', $splitAt->format(RecurrenceId::FORMAT)])
            ->column());
    }

    private function requireOccurrence(Event $event, mixed $recurrenceId): Carbon
    {
        $key = RecurrenceId::normalize($recurrenceId);
        $splitAt = null !== $key ? RecurrenceId::toCarbon($key) : null;

        if (!$splitAt || !$this->materializer->producesRecurrenceId($event, $splitAt)) {
            throw new InvalidArgumentException("Event {$event->id} has no occurrence at {$key}.");
        }

        return $splitAt;
    }

    private function saveOrFail(Event $event): void
    {
        if (!Calendar::getInstance()->events->saveEvent($event)) {
            throw new InvalidElementException($event, implode(' ', $event->getErrorSummary(true)) ?: 'Couldn’t save the event.');
        }
    }
}
