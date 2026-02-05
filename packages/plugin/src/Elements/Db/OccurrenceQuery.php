<?php

namespace Solspace\Calendar\Elements\Db;

use Carbon\Carbon;
use craft\db\ActiveQuery;
use Solspace\Calendar\Elements\Event;
use yii\db\Query;

class OccurrenceQuery extends ActiveQuery
{
    public ?string $status = Event::STATUS_ENABLED;
    public array|int|string|null $eventId = null;
    public array|int|string|null $calendarId = null;
    public array|int|string|null $siteId = null;

    public ?\DateTime $startsBefore = null;
    public ?\DateTime $startsBeforeOrAt = null;
    public ?\DateTime $startsAfter = null;
    public ?\DateTime $startsAfterOrAt = null;
    public ?\DateTime $endsBefore = null;
    public ?\DateTime $endsBeforeOrAt = null;
    public ?\DateTime $endsAfter = null;
    public ?\DateTime $endsAfterOrAt = null;
    public ?\DateTime $rangeStart = null;
    public ?\DateTime $rangeEnd = null;

    public function status(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function event(array|int|string|null $event): self
    {
        $this->eventId = $event;

        return $this;
    }

    public function eventId(array|int|string|null $eventId): self
    {
        return $this->event($eventId);
    }

    public function calendar(array|int|string|null $calendar): self
    {
        $this->calendarId = $calendar;

        return $this;
    }

    public function calendarId(array|int|string $calendarId): self
    {
        return $this->calendar($calendarId);
    }

    public function startsBefore(mixed $date): self
    {
        $this->startsBefore = (new Carbon($date))->toDateTime();

        return $this;
    }

    public function setStartsBeforeOrAt(mixed $startsBeforeOrAt): self
    {
        $this->startsBeforeOrAt = (new Carbon($startsBeforeOrAt))->toDateTime();

        return $this;
    }

    public function startsAfter(mixed $date): self
    {
        $this->startsAfter = (new Carbon($date))->toDateTime();

        return $this;
    }

    public function setStartsAfterOrAt(mixed $startsAfterOrAt): self
    {
        $this->startsAfterOrAt = (new Carbon($startsAfterOrAt))->toDateTime();

        return $this;
    }

    public function endsBefore(mixed $date): self
    {
        $this->endsBefore = (new Carbon($date))->toDateTime();

        return $this;
    }

    public function endsBeforeOrAt(mixed $endsBeforeOrAt): self
    {
        $this->endsBeforeOrAt = (new Carbon($endsBeforeOrAt))->toDateTime();

        return $this;
    }

    public function endsAfter(mixed $date): self
    {
        $this->endsAfter = (new Carbon($date))->toDateTime();

        return $this;
    }

    public function endsAfterOrAt(mixed $endsAfterOrAt): self
    {
        $this->endsAfterOrAt = (new Carbon($endsAfterOrAt))->toDateTime();

        return $this;
    }

    public function rangeStart(mixed $date): self
    {
        $this->rangeStart = (new Carbon($date))->toDateTime();

        return $this;
    }

    public function rangeEnd(mixed $date): self
    {
        $this->rangeEnd = (new Carbon($date))->toDateTime();

        return $this;
    }

    public function inRange(mixed $start, mixed $end): self
    {
        return $this->rangeStart($start)->rangeEnd($end);
    }

    public function prepare($builder): Query
    {
        if ($this->startsBefore) {
            $this->andWhere('[[startDate]] < :startsBefore', ['startsBefore' => $this->startsBefore]);
        } elseif ($this->startsBeforeOrAt) {
            $this->andWhere('[[startDate]] <= :startsBefore', ['startsBefore' => $this->startsBefore]);
        }

        if ($this->startsAfter) {
            $this->andWhere('[[startDate]] > :startsAfter', ['startsAfter' => $this->startsAfter]);
        } elseif ($this->startsAfterOrAt) {
            $this->andWhere('[[startDate]] >= :startsAfter', ['startsAfter' => $this->startsAfter]);
        }

        if ($this->endsBefore) {
            $this->andWhere('[[endDate]] < :endsBefore', ['endsBefore' => $this->endsBefore]);
        } elseif ($this->endsBeforeOrAt) {
            $this->andWhere('[[endDate]] <= :endsBefore', ['endsBefore' => $this->endsBefore]);
        }

        if ($this->endsAfter) {
            $this->andWhere('[[endDate]] > :endsAfter', ['endsAfter' => $this->endsAfter]);
        } elseif ($this->endsAfterOrAt) {
            $this->andWhere('[[endDate]] >= :endsAfter', ['endsAfter' => $this->endsAfter]);
        }

        if ($this->rangeStart) {
            $this->andWhere('[[endDate]] >= :rangeStart', ['rangeStart' => $this->rangeStart]);
        }

        if ($this->rangeEnd) {
            $this->andWhere('[[startDate]] <= :rangeEnd', ['rangeEnd' => $this->rangeEnd]);
        }

        return parent::prepare($builder);
    }
}
