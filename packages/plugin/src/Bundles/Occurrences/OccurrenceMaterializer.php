<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use craft\db\Query;
use craft\helpers\Db;
use RRule\RRuleInterface;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Records\OccurrenceOverrideRecord;
use Solspace\Calendar\Records\OccurrenceRecord;
use Solspace\Calendar\Records\OccurrenceWindowRecord;

/**
 * Generates an event's occurrence rows from its schedule, with its overrides applied.
 *
 * Infinite schedules are generated up to a window, which queries extend as they reach further.
 * The window never goes more than ten years ahead, so an infinite schedule's occurrences past that
 * aren't listed and can't be edited.
 */
class OccurrenceMaterializer
{
    private const BATCH_INSERT_SIZE = 500;
    private const DEFAULT_WINDOW = '+2 years';
    private const MAX_WINDOW = '+10 years';
    private const LOCK_TIMEOUT = 15;

    public function __construct(
        private OccurrenceCodes $codes = new OccurrenceCodes(),
    ) {}

    /**
     * Replaces the event's occurrence rows. An infinite schedule is generated at least as far ahead as before.
     */
    public function regenerate(CalendarEvent $element, ?Carbon $generatedThrough = null): void
    {
        $generatedThrough = self::latest($generatedThrough, $this->getGeneratedThrough((int) $element->id));

        $this->delete($element);
        $this->materialize($element, $generatedThrough);
    }

    /**
     * Occurrence codes are deliberately kept, so an occurrence that comes back gets its old code.
     */
    public function delete(CalendarEvent $element): void
    {
        OccurrenceWindowRecord::deleteAll(['eventId' => $element->id]);
        OccurrenceRecord::deleteAll(['eventId' => $element->id]);
    }

    /**
     * Generates an infinite schedule further ahead, up to the limit.
     */
    public function extend(CalendarEvent $element, Carbon $generatedThrough): void
    {
        $eventId = (int) $element->id;
        $generatedThrough = min($generatedThrough, $this->getMaxGeneratedThrough());

        if (!$element->getRRuleObject()?->isInfinite() || !$this->acquireLock($eventId)) {
            return;
        }

        try {
            // It may have been saved since it was loaded, and its rows follow the saved schedule
            $element = CalendarEvent::find()->id($eventId)->siteId($element->siteId)->status(null)->one();
            $rrule = $element?->getRRuleObject();
            if (!$rrule?->isInfinite()) {
                return;
            }

            $currentWindow = $this->getGeneratedThrough($eventId);
            if (!$currentWindow) {
                $this->regenerate($element, $generatedThrough);

                return;
            }

            if ($currentWindow >= $generatedThrough) {
                return;
            }

            // So that a request cut short doesn't leave rows past the window behind
            $transaction = \Craft::$app->getDb()->beginTransaction();

            try {
                $this->insertGeneratedOccurrences($element, $rrule, $generatedThrough, $currentWindow);
                Db::update(
                    OccurrenceWindowRecord::TABLE,
                    ['generatedThrough' => $generatedThrough->format(RecurrenceId::FORMAT)],
                    ['eventId' => $eventId],
                );

                $transaction->commit();
            } catch (\Throwable $exception) {
                $transaction->rollBack();

                throw $exception;
            }
        } finally {
            $this->releaseLock($eventId);
        }
    }

    /**
     * Saving an event regenerates its rows and extending its window adds to them, so both hold this lock.
     * Craft keeps it until the current transaction ends, so the changes are committed by the time it's free.
     */
    public function acquireLock(int $eventId): bool
    {
        return \Craft::$app->getMutex()->acquire(self::lockName($eventId), self::LOCK_TIMEOUT);
    }

    public function releaseLock(int $eventId): void
    {
        \Craft::$app->getMutex()->release(self::lockName($eventId));
    }

    /**
     * Updates one occurrence after its override changed, instead of regenerating the whole event.
     */
    public function refreshOccurrence(CalendarEvent $element, Carbon $recurrenceId): void
    {
        $key = $recurrenceId->format(RecurrenceId::FORMAT);
        $condition = ['eventId' => $element->id, 'recurrenceId' => $key];

        if (!(new Query())->from(OccurrenceRecord::TABLE)->where($condition)->exists()) {
            return;
        }

        $occurrence = $this->resolveOccurrence($element, $recurrenceId, $this->findOverrides((int) $element->id, [$key])[$key] ?? null);

        Db::update(OccurrenceRecord::TABLE, self::formatOccurrence($occurrence), $condition);
    }

    /**
     * When an occurrence takes place, with its override applied. Drafts have no occurrence rows,
     * so this works from the event and the override alone.
     *
     * @return array{startDate: Carbon, endDate: Carbon, allDay: bool, cancelled: bool}
     */
    public function describeOccurrence(CalendarEvent $element, Carbon $recurrenceId, ?OccurrenceOverride $override): array
    {
        $occurrence = $this->resolveOccurrence($element, $recurrenceId, $override ? [
            'id' => $override->id,
            'startDate' => $override->startDate,
            'endDate' => $override->endDate,
            'allDay' => $override->allDay,
            'cancelled' => $override->cancelled,
        ] : null);

        unset($occurrence['overrideId']);

        return $occurrence;
    }

    /**
     * The first recurrence IDs the event's schedule produces.
     *
     * @return string[]
     */
    public function recurrenceIds(CalendarEvent $element, int $limit): array
    {
        $rrule = $element->getRRuleObject();
        if (null === $rrule) {
            return [DateHelper::parseFloatingCarbon($element->startDate)->format(RecurrenceId::FORMAT)];
        }

        $recurrenceIds = [];
        foreach ($this->getOccurrenceDates($rrule) as $date) {
            if (\count($recurrenceIds) >= $limit) {
                break;
            }

            $key = $date->format(RecurrenceId::FORMAT);
            $recurrenceIds[$key] = $key;
        }

        return array_values($recurrenceIds);
    }

    /**
     * The first and last recurrence IDs the event's schedule produces. The last is null for an infinite schedule.
     *
     * @return array{0: ?string, 1: ?string}
     */
    public function getScheduleSpan(CalendarEvent $element): array
    {
        $rrule = $element->getRRuleObject();
        if (null === $rrule) {
            $recurrenceId = DateHelper::parseFloatingCarbon($element->startDate)->format(RecurrenceId::FORMAT);

            return [$recurrenceId, $recurrenceId];
        }

        if ($rrule->isInfinite()) {
            return [$this->recurrenceIds($element, 1)[0] ?? null, null];
        }

        $first = $last = null;
        foreach ($this->getOccurrenceDates($rrule) as $date) {
            $first ??= $date;
            $last = $date;
        }

        return [$first?->format(RecurrenceId::FORMAT), $last?->format(RecurrenceId::FORMAT)];
    }

    /**
     * How far ahead the event's rows go, or null when they hold its whole schedule.
     */
    public function getGeneratedThrough(int $eventId): ?Carbon
    {
        $generatedThrough = OccurrenceWindowRecord::find()
            ->select(['generatedThrough'])
            ->where(['eventId' => $eventId])
            ->scalar()
        ;

        return $generatedThrough ? RecurrenceId::toCarbon($generatedThrough) : null;
    }

    /**
     * Whether the event's schedule produces an occurrence with this recurrence ID.
     */
    public function producesRecurrenceId(CalendarEvent $element, Carbon $recurrenceId): bool
    {
        $rrule = $element->getRRuleObject();
        if (null === $rrule) {
            return DateHelper::parseFloatingCarbon($element->startDate)->format(RecurrenceId::FORMAT) === $recurrenceId->format(RecurrenceId::FORMAT);
        }

        // Never generated, and rules that can't be checked without iterating would take as long as it is far
        if ($rrule->isInfinite() && $recurrenceId > $this->getMaxGeneratedThrough()) {
            return false;
        }

        return $rrule->occursAt(RecurrenceId::toCarbon($recurrenceId->format(RecurrenceId::FORMAT)));
    }

    private function materialize(CalendarEvent $element, ?Carbon $generatedThrough): void
    {
        $rrule = $element->getRRuleObject();
        if (null === $rrule) {
            $this->insertOccurrences($element, [DateHelper::parseFloatingCarbon($element->startDate)]);

            return;
        }

        if (!$rrule->isInfinite()) {
            $this->insertGeneratedOccurrences($element, $rrule);

            return;
        }

        $generatedThrough = $this->resolveWindow($element, $generatedThrough);

        $this->insertGeneratedOccurrences($element, $rrule, $generatedThrough);
        Db::insert(OccurrenceWindowRecord::TABLE, [
            'eventId' => (int) $element->id,
            'generatedThrough' => $generatedThrough->format(RecurrenceId::FORMAT),
        ]);
    }

    /**
     * The default window, or further when the schedule was generated further already or one of its
     * overrides is further ahead, so an occurrence moved closer doesn't disappear. Never past the limit.
     */
    private function resolveWindow(CalendarEvent $element, ?Carbon $generatedThrough): Carbon
    {
        $latestOverride = OccurrenceOverrideRecord::findForEvent((int) $element->id)
            ->andWhere(['overrides.orphaned' => false])
            ->max('[[overrides.recurrenceId]]')
        ;

        $window = self::latest(
            new Carbon(self::DEFAULT_WINDOW, DateHelper::UTC),
            $generatedThrough,
            $latestOverride ? RecurrenceId::toCarbon($latestOverride) : null,
        );

        return min($window, $this->getMaxGeneratedThrough());
    }

    private function getMaxGeneratedThrough(): Carbon
    {
        return new Carbon(self::MAX_WINDOW, DateHelper::UTC);
    }

    private function insertGeneratedOccurrences(
        CalendarEvent $element,
        RRuleInterface $rrule,
        ?Carbon $generatedThrough = null,
        ?Carbon $startsAfter = null,
    ): void {
        $recurrenceIds = [];
        $seen = [];

        foreach ($this->getOccurrenceDates($rrule, $generatedThrough, $startsAfter) as $recurrenceId) {
            $key = $recurrenceId->format(RecurrenceId::FORMAT);
            if (isset($seen[$key])) {
                continue;
            }

            $seen[$key] = true;
            $recurrenceIds[] = $recurrenceId;

            if (\count($recurrenceIds) >= self::BATCH_INSERT_SIZE) {
                $this->insertOccurrences($element, $recurrenceIds);
                $recurrenceIds = [];
            }
        }

        if ($recurrenceIds) {
            $this->insertOccurrences($element, $recurrenceIds);
        }
    }

    /**
     * @param Carbon[] $recurrenceIds
     */
    private function insertOccurrences(CalendarEvent $element, array $recurrenceIds): void
    {
        $keys = array_map(static fn (Carbon $recurrenceId) => $recurrenceId->format(RecurrenceId::FORMAT), $recurrenceIds);
        $codes = $this->codes->ensure((int) $element->id, $keys);
        $overrides = $this->findOverrides((int) $element->id, $keys);

        $rows = [];
        foreach ($recurrenceIds as $index => $recurrenceId) {
            $key = $keys[$index];
            $occurrence = self::formatOccurrence($this->resolveOccurrence($element, $recurrenceId, $overrides[$key] ?? null));

            $rows[] = [
                (int) $element->id,
                (int) $element->calendarId,
                $key,
                $codes[$key],
                $occurrence['startDate'],
                $occurrence['endDate'],
                $occurrence['allDay'],
                $occurrence['cancelled'],
                $occurrence['overrideId'],
            ];
        }

        \Craft::$app->getDb()
            ->createCommand()
            ->batchInsert(
                OccurrenceRecord::TABLE,
                ['eventId', 'calendarId', 'recurrenceId', 'code', 'startDate', 'endDate', 'allDay', 'cancelled', 'overrideId'],
                $rows,
            )
            ->execute()
        ;
    }

    /**
     * @return iterable<Carbon>
     */
    private function getOccurrenceDates(
        RRuleInterface $rrule,
        ?Carbon $generatedThrough = null,
        ?Carbon $startsAfter = null,
    ): iterable {
        foreach ($rrule as $occurrence) {
            $occurrence = DateHelper::parseFloatingCarbon($occurrence);

            if ($startsAfter && $occurrence <= $startsAfter) {
                continue;
            }

            if ($generatedThrough && $occurrence > $generatedThrough) {
                break;
            }

            yield $occurrence;
        }
    }

    /**
     * An occurrence starts at its recurrence ID and lasts as long as the event,
     * unless its override gives it its own times.
     *
     * @param null|array{id: mixed, startDate: mixed, endDate: mixed, allDay: mixed, cancelled: mixed} $override
     *                                                                                                           stored values or the element's own
     *
     * @return array{startDate: Carbon, endDate: Carbon, allDay: bool, cancelled: bool, overrideId: ?int}
     */
    private function resolveOccurrence(CalendarEvent $element, Carbon $recurrenceId, ?array $override): array
    {
        $startDate = $recurrenceId;
        $endDate = null;
        $allDay = (bool) $element->allDay;

        if (null !== ($override['startDate'] ?? null)) {
            $startDate = DateHelper::parseFloatingCarbon($override['startDate']);
            $endDate = null !== $override['endDate'] ? DateHelper::parseFloatingCarbon($override['endDate']) : null;
            $allDay = null !== $override['allDay'] ? (bool) $override['allDay'] : $allDay;
        }

        $endDate ??= $startDate->copy()->add($element->startDate->diff($element->endDate));

        return [
            'startDate' => $startDate,
            'endDate' => $endDate,
            'allDay' => $allDay,
            'cancelled' => (bool) ($override['cancelled'] ?? false),
            'overrideId' => isset($override['id']) ? (int) $override['id'] : null,
        ];
    }

    /**
     * @param string[] $recurrenceIds
     *
     * @return array<string, array> the event's overrides, by recurrence ID
     */
    private function findOverrides(int $eventId, array $recurrenceIds): array
    {
        return OccurrenceOverrideRecord::findForEvent($eventId)
            ->select([
                'overrides.id',
                'overrides.recurrenceId',
                'overrides.startDate',
                'overrides.endDate',
                'overrides.allDay',
                'overrides.cancelled',
            ])
            ->andWhere(['overrides.recurrenceId' => $recurrenceIds])
            // If there are ever two for one occurrence, the oldest one wins
            ->orderBy(['overrides.id' => \SORT_DESC])
            ->indexBy('recurrenceId')
            ->all()
        ;
    }

    private static function formatOccurrence(array $occurrence): array
    {
        return [
            'startDate' => $occurrence['startDate']->format(RecurrenceId::FORMAT),
            'endDate' => $occurrence['endDate']->format(RecurrenceId::FORMAT),
        ] + $occurrence;
    }

    private static function latest(?Carbon ...$dates): ?Carbon
    {
        $dates = array_filter($dates);

        return $dates ? max($dates) : null;
    }

    private static function lockName(int $eventId): string
    {
        return 'calendar-occurrences:'.$eventId;
    }
}
