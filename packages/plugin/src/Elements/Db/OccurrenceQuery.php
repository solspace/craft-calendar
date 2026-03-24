<?php

namespace Solspace\Calendar\Elements\Db;

use Carbon\Carbon;
use craft\db\ActiveQuery;
use craft\helpers\Db;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Models\OccurrenceModel;
use Solspace\Calendar\Transformers\FullCalTransformer;
use yii\db\Query;

class OccurrenceQuery extends ActiveQuery
{
    public ?string $status = Event::STATUS_ENABLED;

    public array|string|null $id = null;
    public array|string|null $uid = null;
    public array|int|string|null $event = null;
    public array|int|string|null $calendarId = null;
    public array|string|null $calendarUid = null;
    public array|int|string|null $calendar = null;
    public array|int|string|null $site = null;
    public array|int|string|null $siteId = null;
    public ?EventQuery $eventQuery = null;

    public mixed $startsBefore = null;
    public mixed $startsBeforeOrAt = null;
    public mixed $startsAfter = null;
    public mixed $startsAfterOrAt = null;
    public mixed $endsBefore = null;
    public mixed $endsBeforeOrAt = null;
    public mixed $endsAfter = null;
    public mixed $endsAfterOrAt = null;
    public mixed $rangeStart = null;
    public mixed $rangeEnd = null;

    public function status(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function setEventQuery(?EventQuery $eventQuery): self
    {
        $this->eventQuery = $eventQuery;

        return $this;
    }

    public function eventQuery(?EventQuery $eventQuery): self
    {
        return $this->setEventQuery($eventQuery);
    }

    public function id(array|int|string|null $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function uid(array|string|null $uid): self
    {
        $this->uid = $uid;

        return $this;
    }

    public function event(array|int|string|null $event): self
    {
        $this->event = $event;

        return $this;
    }

    public function setCalendarId(array|int|string|null $calendarId): self
    {
        $this->calendarId = $calendarId;

        return $this;
    }

    public function setCalendarUid(array|string|null $calendarUid): self
    {
        $this->calendarUid = $calendarUid;

        return $this;
    }

    public function calendar(array|int|string|null $calendar): self
    {
        $this->calendar = $calendar;

        return $this;
    }

    public function site(array|int|string|null $site): self
    {
        $this->site = $site;

        return $this;
    }

    public function setSiteId(array|int|string|null $siteId): self
    {
        $this->siteId = $siteId;

        return $this;
    }

    public function startsBefore(mixed $date): self
    {
        $this->startsBefore = (new Carbon($date, DateHelper::UTC))->toDateTime();

        return $this;
    }

    public function setStartsBeforeOrAt(mixed $startsBeforeOrAt): self
    {
        $this->startsBeforeOrAt = (new Carbon($startsBeforeOrAt, DateHelper::UTC))->toDateTime();

        return $this;
    }

    public function startsAfter(mixed $date): self
    {
        $this->startsAfter = (new Carbon($date, DateHelper::UTC))->toDateTime();

        return $this;
    }

    public function setStartsAfterOrAt(mixed $startsAfterOrAt): self
    {
        $this->startsAfterOrAt = (new Carbon($startsAfterOrAt, DateHelper::UTC))->toDateTime();

        return $this;
    }

    public function endsBefore(mixed $date): self
    {
        $this->endsBefore = (new Carbon($date, DateHelper::UTC))->toDateTime();

        return $this;
    }

    public function endsBeforeOrAt(mixed $endsBeforeOrAt): self
    {
        $this->endsBeforeOrAt = (new Carbon($endsBeforeOrAt, DateHelper::UTC))->toDateTime();

        return $this;
    }

    public function endsAfter(mixed $date): self
    {
        $this->endsAfter = (new Carbon($date, DateHelper::UTC))->toDateTime();

        return $this;
    }

    public function endsAfterOrAt(mixed $endsAfterOrAt): self
    {
        $this->endsAfterOrAt = (new Carbon($endsAfterOrAt, DateHelper::UTC))->toDateTime();

        return $this;
    }

    public function rangeStart(mixed $date): self
    {
        $this->rangeStart = (new Carbon($date, DateHelper::UTC))->toDateTime();

        return $this;
    }

    public function rangeEnd(mixed $date): self
    {
        $this->rangeEnd = (new Carbon($date, DateHelper::UTC))->toDateTime();

        return $this;
    }

    public function inRange(mixed $start, mixed $end): self
    {
        return $this->rangeStart($start)->rangeEnd($end);
    }

    public function prepare($builder): Query
    {
        $this->applyOccurrenceIdentityFilters();

        $eventIds = $this->resolveEventIds();
        if ([] === $eventIds) {
            $this->andWhere('0=1');
        } elseif (null !== $eventIds) {
            $this->andWhere(Db::parseParam('[[eventId]]', $eventIds));
        }

        if ($this->startsBefore) {
            $this->andWhere('[[startDate]] < :startsBefore', ['startsBefore' => $this->resolveDate($this->startsBefore)]);
        } elseif ($this->startsBeforeOrAt) {
            $this->andWhere('[[startDate]] <= :startsBeforeOrAt', ['startsBeforeOrAt' => $this->resolveDate($this->startsBeforeOrAt)]);
        }

        if ($this->startsAfter) {
            $this->andWhere('[[startDate]] > :startsAfter', ['startsAfter' => $this->resolveDate($this->startsAfter)]);
        } elseif ($this->startsAfterOrAt) {
            $this->andWhere('[[startDate]] >= :startsAfterOrAt', ['startsAfterOrAt' => $this->resolveDate($this->startsAfterOrAt)]);
        }

        if ($this->endsBefore) {
            $this->andWhere('[[endDate]] < :endsBefore', ['endsBefore' => $this->resolveDate($this->endsBefore)]);
        } elseif ($this->endsBeforeOrAt) {
            $this->andWhere('[[endDate]] <= :endsBeforeOrAt', ['endsBeforeOrAt' => $this->resolveDate($this->endsBeforeOrAt)]);
        }

        if ($this->endsAfter) {
            $this->andWhere('[[endDate]] > :endsAfter', ['endsAfter' => $this->resolveDate($this->endsAfter)]);
        } elseif ($this->endsAfterOrAt) {
            $this->andWhere('[[endDate]] >= :endsAfterOrAt', ['endsAfterOrAt' => $this->resolveDate($this->endsAfterOrAt)]);
        }

        if ($this->rangeStart) {
            $this->andWhere('[[endDate]] >= :rangeStart', ['rangeStart' => $this->resolveDate($this->rangeStart)]);
        }

        if ($this->rangeEnd) {
            $this->andWhere('[[startDate]] <= :rangeEnd', ['rangeEnd' => $this->resolveDate($this->rangeEnd)]);
        }

        return parent::prepare($builder);
    }

    public function toFullcalendar(): array
    {
        $transformer = new FullCalTransformer();
        $occurrences = $this->all();

        return $transformer->fromList($occurrences);
    }

    public function getEventQuery(): EventQuery
    {
        if ($this->eventQuery) {
            return $this->eventQuery;
        }

        $query = Event::find();
        $query->status($this->status);
        $query->id($this->event);
        $query->setCalendarId($this->calendarId);
        $query->setCalendarUid($this->calendarUid);
        $query->setCalendar($this->calendar);
        $query->site($this->site);
        $query->siteId = $this->siteId;

        $this->eventQuery = $query;

        return $this->eventQuery;
    }

    public function populate($rows): array
    {
        if (empty($rows)) {
            return [];
        }

        if ($this->asArray) {
            return parent::populate($rows);
        }

        $eventIds = array_unique(array_column($rows, 'eventId'));
        $calendarIds = array_unique(array_column($rows, 'calendarId'));

        /** @var Event[] $events */
        $eventQuery = clone $this->getEventQuery();
        $events = $eventQuery->id($eventIds)->indexBy('id')->all();
        $calendars = Calendar::getInstance()->calendars->getCalendars(['id' => $calendarIds]);

        $models = [];
        foreach ($rows as $occurrence) {
            $event = $events[$occurrence['eventId']] ?? null;
            $calendar = $calendars[$occurrence['calendarId']] ?? null;

            if (!$event || !$calendar) {
                continue;
            }

            $startDate = new Carbon($occurrence['startDate'], DateHelper::UTC);
            $endDate = new Carbon($occurrence['endDate'], DateHelper::UTC);

            $model = new OccurrenceModel();
            $model->event = $event;
            $model->calendar = $calendar;
            $model->startDate = $startDate;
            $model->startDateLocalized = DateHelper::toLocalized($startDate);
            $model->endDate = $endDate;
            $model->endDateLocalized = DateHelper::toLocalized($endDate);
            $model->allDay = $occurrence['allDay'] ?? false;
            $model->dateCreated = new Carbon($occurrence['dateCreated']);
            $model->dateUpdated = new Carbon($occurrence['dateUpdated']);
            $model->uid = $occurrence['uid'];

            $models[] = $model;
        }

        if ($this->indexBy === null) {
            return $models;
        }

        $result = [];
        foreach ($models as $model) {
            $result[$model[$this->indexBy]] = $model;
        }

        return $result;
    }

    private function resolveDate(mixed $date): Carbon
    {
        return new Carbon($date, DateHelper::UTC);
    }

    private function resolveEventIds(): ?array
    {
        if (!$this->shouldLimitByEventQuery()) {
            return null;
        }

        return $this->getEventQuery()->ids();
    }

    private function shouldLimitByEventQuery(): bool
    {
        return null !== $this->eventQuery
            || null !== $this->status
            || null !== $this->event
            || null !== $this->calendarId
            || null !== $this->calendarUid
            || null !== $this->calendar
            || null !== $this->site
            || null !== $this->siteId;
    }

    private function applyOccurrenceIdentityFilters(): void
    {
        if (null !== $this->uid) {
            $this->andWhere(Db::parseParam('[[uid]]', $this->uid));
        }

        if (null === $this->id) {
            return;
        }

        $ids = \is_array($this->id) ? $this->id : [$this->id];
        $conditions = [];

        foreach ($ids as $occurrenceId) {
            $condition = $this->buildOccurrenceIdCondition((string) $occurrenceId);
            if (null !== $condition) {
                $conditions[] = $condition;
            }
        }

        if ([] === $conditions) {
            $this->andWhere('0=1');

            return;
        }

        array_unshift($conditions, 'or');
        $this->andWhere($conditions);
    }

    private function buildOccurrenceIdCondition(string $occurrenceId): ?array
    {
        if (!preg_match('/^(\d+)-(\d{8})(\d{6})$/', $occurrenceId, $matches)) {
            return null;
        }

        [, $eventId, $date, $time] = $matches;

        $startDate = Carbon::createFromFormat(
            'YmdHis',
            $date.$time,
            DateHelper::UTC,
        );

        if (false === $startDate) {
            return null;
        }

        return [
            'and',
            ['eventId' => (int) $eventId],
            ['startDate' => $startDate->format('Y-m-d H:i:s')],
        ];
    }
}
