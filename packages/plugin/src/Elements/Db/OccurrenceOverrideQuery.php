<?php

namespace Solspace\Calendar\Elements\Db;

use craft\db\QueryAbortedException;
use craft\elements\db\ElementQuery;
use craft\elements\db\NestedElementQueryInterface;
use craft\elements\db\NestedElementQueryTrait;
use Solspace\Calendar\Bundles\Occurrences\RecurrenceId;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Records\OccurrenceOverrideRecord;
use Solspace\Calendar\Records\OccurrenceOverrideSiteRecord;

/**
 * @extends ElementQuery<int, OccurrenceOverride>
 */
class OccurrenceOverrideQuery extends ElementQuery implements NestedElementQueryInterface
{
    use NestedElementQueryTrait;

    public mixed $recurrenceId = null;
    public ?bool $cancelled = null;
    public ?bool $orphaned = null;

    /**
     * Overrides used by an event, or by a draft of it.
     */
    public function event(Event|int|null $event): static
    {
        if ($event instanceof Event) {
            return $this->owner($event);
        }

        return $this->ownerId($event);
    }

    public function recurrenceId(mixed $recurrenceId): static
    {
        $this->recurrenceId = $recurrenceId;

        return $this;
    }

    public function cancelled(?bool $cancelled = true): static
    {
        $this->cancelled = $cancelled;

        return $this;
    }

    public function orphaned(?bool $orphaned = true): static
    {
        $this->orphaned = $orphaned;

        return $this;
    }

    protected function beforePrepare(): bool
    {
        // Overrides belong to their event rather than to one of its fields
        if (!empty($this->fieldId)) {
            throw new QueryAbortedException();
        }

        $table = OccurrenceOverrideRecord::TABLE_STD;

        $this->joinElementTable($table);
        $this->query->leftJoin(
            ['overrides_sites' => OccurrenceOverrideSiteRecord::TABLE],
            '[[overrides_sites.id]] = [[elements.id]] AND [[overrides_sites.siteId]] = [[elements_sites.siteId]]',
        );

        $this->query->addSelect([
            "{$table}.primaryOwnerId",
            "{$table}.recurrenceId",
            "{$table}.startDate",
            "{$table}.endDate",
            "{$table}.allDay",
            "{$table}.cancelled",
            "{$table}.orphaned",
            'overrides_sites.overriddenFields',
        ]);

        $this->applyNestedElementParams("{$table}.fieldId", "{$table}.primaryOwnerId");

        if (null !== $this->recurrenceId) {
            $recurrenceIds = array_filter(array_map(
                static fn (mixed $value) => RecurrenceId::normalize($value),
                \is_array($this->recurrenceId) ? $this->recurrenceId : [$this->recurrenceId],
            ));

            $this->subQuery->andWhere($recurrenceIds ? ["{$table}.recurrenceId" => array_values($recurrenceIds)] : '0=1');
        }

        if (null !== $this->cancelled) {
            $this->subQuery->andWhere(["{$table}.cancelled" => $this->cancelled]);
        }

        if (null !== $this->orphaned) {
            $this->subQuery->andWhere(["{$table}.orphaned" => $this->orphaned]);
        }

        return parent::beforePrepare();
    }

    /**
     * Overrides use their event's calendar field layout.
     */
    protected function fieldLayouts(): array
    {
        $layouts = [];
        foreach (Calendar::getInstance()->calendars->getAllCalendars() as $calendar) {
            $layout = $calendar->getFieldLayout();
            if ($layout) {
                $layouts[$layout->id] = $layout;
            }
        }

        return array_values($layouts);
    }
}
