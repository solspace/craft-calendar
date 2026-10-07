<?php

namespace Solspace\Calendar\Services;

use Carbon\Carbon;
use craft\base\Component;
use craft\base\Element;
use craft\db\Table;
use craft\errors\InvalidElementException;
use craft\helpers\Db;
use craft\helpers\ElementHelper;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceMaterializer;
use Solspace\Calendar\Bundles\Occurrences\RecurrenceId;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Library\RRule\RecurringEventMutationHelper;
use yii\base\InvalidArgumentException;

/**
 * Edits single occurrences of an event.
 *
 * Every method takes the event an occurrence is being edited for. Pass a draft to make the
 * change inside that draft; it reaches the live event when the draft is published.
 */
class OccurrencesService extends Component
{
    private OccurrenceMaterializer $materializer;

    public function init(): void
    {
        parent::init();

        $this->materializer = new OccurrenceMaterializer();
    }

    public function getOverride(Event $event, mixed $recurrenceId, ?int $siteId = null): ?OccurrenceOverride
    {
        return OccurrenceOverride::find()
            ->ownerId($event->id)
            ->siteId($siteId ?? $event->siteId)
            ->recurrenceId($this->normalizeRecurrenceId($recurrenceId))
            ->one()
        ;
    }

    /**
     * Returns the override to edit for an occurrence, creating a new one if it has none.
     * Inside a draft, an override shared with the live event is copied first, so the
     * live event doesn't change until the draft is published.
     */
    public function getOrCreateOverride(Event $event, mixed $recurrenceId, ?int $siteId = null): OccurrenceOverride
    {
        $key = $this->normalizeRecurrenceId($recurrenceId);

        $override = $this->getOverride($event, $key, $siteId);
        if ($override) {
            return $this->forOwner($override, $event);
        }

        if (!$this->materializer->producesRecurrenceId($event, RecurrenceId::toCarbon($key))) {
            throw new InvalidArgumentException("Event {$event->id} has no occurrence at {$key}.");
        }

        $override = new OccurrenceOverride();
        $override->siteId = $siteId ?? $event->siteId;
        $override->recurrenceId = RecurrenceId::toCarbon($key);
        $override->fieldLayoutId = $event->getFieldLayout()?->id;
        $override->setPrimaryOwner($event);
        $override->setOwner($event);

        return $override;
    }

    public function saveOverride(OccurrenceOverride $override, bool $runValidation = true): bool
    {
        $event = $this->requireEvent($override);

        // Like the control panel does for live content, so required fields it overrides can't be left empty
        if (Element::SCENARIO_DEFAULT === $override->getScenario() && $event->enabled && $event->getEnabledForSite()) {
            $override->setScenario(Element::SCENARIO_LIVE);
        }

        if (!\Craft::$app->getElements()->saveElement($override, $runValidation)) {
            return false;
        }

        $this->afterOccurrenceChanged($event, $override->recurrenceId);

        return true;
    }

    /**
     * Gives an occurrence its own times. Moving and resizing it are both done this way.
     */
    public function reschedule(Event $event, mixed $recurrenceId, Carbon $startDate, Carbon $endDate, bool $allDay): OccurrenceOverride
    {
        $override = $this->getOrCreateOverride($event, $recurrenceId);
        $override->reschedule($startDate, $endDate, $allDay);
        $this->saveOrFail($override);

        return $override;
    }

    public function cancel(Event $event, mixed $recurrenceId): OccurrenceOverride
    {
        return $this->setCancelled($event, $recurrenceId, true);
    }

    public function uncancel(Event $event, mixed $recurrenceId): OccurrenceOverride
    {
        return $this->setCancelled($event, $recurrenceId, false);
    }

    /**
     * Removes everything an occurrence changed, so it follows the event again.
     */
    public function resetOverride(Event $event, mixed $recurrenceId): bool
    {
        $override = $this->getOverride($event, $recurrenceId);
        if (!$override) {
            return true;
        }

        if ($override->getPrimaryOwnerId() !== $event->id) {
            // The draft only shares this override with the live event, so it just stops using it
            Db::delete(Table::ELEMENTS_OWNERS, ['elementId' => $override->id, 'ownerId' => $event->id]);

            return true;
        }

        if (!\Craft::$app->getElements()->deleteElement($override, true)) {
            return false;
        }

        $this->afterOccurrenceChanged($event, $override->recurrenceId);

        return true;
    }

    /**
     * Removes an occurrence from the event's schedule, along with anything it changed.
     */
    public function deleteOccurrence(Event $event, mixed $recurrenceId): bool
    {
        $key = $this->normalizeRecurrenceId($recurrenceId);
        $transaction = \Craft::$app->getDb()->beginTransaction();

        try {
            if (!$this->resetOverride($event, $key)) {
                $transaction->rollBack();

                return false;
            }

            (new RecurringEventMutationHelper())->deleteOccurrence($event, RecurrenceId::toCarbon($key));
            $event->disableRequestSyncOnSave();

            if (!Calendar::getInstance()->events->saveEvent($event)) {
                $transaction->rollBack();

                return false;
            }

            $transaction->commit();
        } catch (\Throwable $exception) {
            $transaction->rollBack();

            throw $exception;
        }

        return true;
    }

    /**
     * Copy-on-write: a draft editing an override it shares with the live event gets its own copy.
     */
    public function forOwner(OccurrenceOverride $override, Event $event): OccurrenceOverride
    {
        if ($override->getPrimaryOwnerId() === $event->id) {
            return $override;
        }

        /** @var OccurrenceOverride $copy */
        $copy = \Craft::$app->getElements()->duplicateElement($override, [
            'canonicalId' => $override->id,
            'primaryOwner' => $event,
            'owner' => $event,
        ]);

        Db::delete(Table::ELEMENTS_OWNERS, ['elementId' => $override->id, 'ownerId' => $event->id]);

        return $copy;
    }

    private function setCancelled(Event $event, mixed $recurrenceId, bool $cancelled): OccurrenceOverride
    {
        $override = $this->getOrCreateOverride($event, $recurrenceId);
        $override->cancelled = $cancelled;
        $this->saveOrFail($override);

        return $override;
    }

    private function saveOrFail(OccurrenceOverride $override): void
    {
        if (!$this->saveOverride($override)) {
            throw new InvalidElementException($override, implode(' ', $override->getErrorSummary(true)));
        }
    }

    /**
     * Drafts have no occurrence rows; the live event's are refreshed when a draft is published.
     */
    private function afterOccurrenceChanged(Event $event, Carbon $recurrenceId): void
    {
        if (ElementHelper::isDraftOrRevision($event)) {
            return;
        }

        $this->materializer->refreshOccurrence($event, $recurrenceId);

        // Cached event lists key on the latest event change
        Db::update(Event::TABLE, ['dateUpdated' => Db::prepareDateForDb(new \DateTime())], ['id' => $event->id], [], false);
        \Craft::$app->getElements()->invalidateCachesForElement($event);
    }

    private function requireEvent(OccurrenceOverride $override): Event
    {
        return $override->getEvent() ?? throw new InvalidArgumentException('The occurrence override has no event.');
    }

    private function normalizeRecurrenceId(mixed $recurrenceId): string
    {
        return RecurrenceId::normalize($recurrenceId)
            ?? throw new InvalidArgumentException('Invalid recurrence ID: '.(\is_scalar($recurrenceId) ? $recurrenceId : get_debug_type($recurrenceId)));
    }
}
