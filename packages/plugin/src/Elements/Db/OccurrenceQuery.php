<?php

namespace Solspace\Calendar\Elements\Db;

use Carbon\Carbon;
use craft\db\ActiveQuery;
use craft\helpers\Db;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceMaterializer;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Models\OccurrenceModel;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Records\OccurrenceRecord;
use Solspace\Calendar\Records\OccurrenceWindowRecord;
use Solspace\Calendar\Transformers\FullCalTransformer;
use yii\db\Query;

class OccurrenceQuery extends ActiveQuery
{
    /**
     * Occurrence table columns that can be sorted.
     * Anything else in $orderBy is assumed to be a custom field on the Event's field layout.
     */
    private const NATIVE_ORDER_COLUMNS = [
        'uid',
        'eventId',
        'calendarId',
        'allDay',
        'startDate',
        'endDate',
        'dateCreated',
        'dateUpdated',
    ];

    public ?string $status = Event::STATUS_ENABLED;

    public null|array|string $id = null;
    public null|array|string $uid = null;
    public null|array|int|string $event = null;
    public null|array|int|string $calendarId = null;
    public null|array|string $calendarUid = null;
    public null|array|int|string $calendar = null;
    public null|array|int|string $site = null;
    public null|array|int|string $siteId = null;
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

    public function id(null|array|int|string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function uid(null|array|string $uid): self
    {
        $this->uid = $uid;

        return $this;
    }

    public function event(null|array|int|string $event): self
    {
        $this->event = $event;

        return $this;
    }

    public function setCalendarId(null|array|int|string $calendarId): self
    {
        $this->calendarId = $calendarId;

        return $this;
    }

    public function setCalendarUid(null|array|string $calendarUid): self
    {
        $this->calendarUid = $calendarUid;

        return $this;
    }

    public function calendar(null|array|int|string $calendar): self
    {
        $this->calendar = $calendar;

        return $this;
    }

    public function site(null|array|int|string $site): self
    {
        $this->site = $site;

        return $this;
    }

    public function setSiteId(null|array|int|string $siteId): self
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
        $this->extendInfiniteOccurrenceWindows();

        $this->applyOccurrenceIdentityFilters();
        $this->applyOccurrenceNativeFilters();
        $this->applyEventExistsFilter();

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

    public function all($db = null): array
    {
        if (!$this->orderByCustomField()) {
            return parent::all($db);
        }

        // The requested order depends on Event custom field values which aren't columns on the occurrences table.
        // Let the DB return every match unordered and unlimited and then sort and cut excess once the real events have been built.
        $orderBy = $this->orderBy;
        $limit = $this->limit;
        $offset = $this->offset;
        $indexBy = $this->indexBy;

        $this->orderBy = null;
        $this->limit = null;
        $this->offset = null;
        $this->indexBy = null;

        $models = parent::all($db);

        $this->orderBy = $orderBy;
        $this->limit = $limit;
        $this->offset = $offset;
        $this->indexBy = $indexBy;

        $this->sortByOrderCriteria($models, $orderBy);

        if (null !== $limit && $limit >= 0) {
            $models = \array_slice($models, $offset ?: 0, $limit);
        }

        if (!$indexBy) {
            return $models;
        }

        $indexed = [];
        foreach ($models as $model) {
            $indexed[$model[$indexBy]] = $model;
        }

        return $indexed;
    }

    private function resolveDate(mixed $date): Carbon
    {
        return new Carbon($date, DateHelper::UTC);
    }

    private function extendInfiniteOccurrenceWindows(): void
    {
        if (!$this->rangeEnd) {
            return;
        }

        $rangeEnd = $this->resolveDate($this->rangeEnd);
        $materializer = new OccurrenceMaterializer();

        foreach ($this->getOccurrenceWindowCandidateIds($rangeEnd) as $eventIds) {
            $eventQuery = clone $this->getEventQuery();
            $events = $eventQuery->id($eventIds)->all();

            foreach ($events as $event) {
                if (!$event->isInfinite()) {
                    continue;
                }

                $materializer->extend($event, $rangeEnd);
            }
        }
    }

    private function getOccurrenceWindowCandidateIds(Carbon $rangeEnd): iterable
    {
        $query = (new Query())
            ->select(['events.id'])
            ->from(['events' => Event::TABLE])
            ->innerJoin(
                ['windows' => OccurrenceWindowRecord::TABLE],
                '[[windows]].[[eventId]] = [[events]].[[id]]',
            )
            ->where(['not', ['events.rrule' => null]])
            ->andWhere(['<>', 'events.rrule', ''])
            ->andWhere(['<', 'windows.generatedThrough', Db::prepareDateForDb($rangeEnd)])
            ->orderBy(['events.id' => \SORT_ASC])
        ;

        if (null !== $this->event) {
            $query->andWhere(Db::parseParam('[[events]].[[id]]', $this->event));
        }

        if (null !== $this->calendarId && !$this->isWildcardValue($this->calendarId)) {
            $query->andWhere(Db::parseParam('[[events]].[[calendarId]]', $this->calendarId));
        }

        $calendarIds = $this->resolveCalendarIds();
        if ([] === $calendarIds) {
            return;
        }

        if (null !== $calendarIds) {
            $query->andWhere(Db::parseParam('[[events]].[[calendarId]]', $calendarIds));
        }

        foreach ($query->batch(100) as $rows) {
            $eventIds = array_map('intval', array_column($rows, 'id'));
            if ($eventIds) {
                yield $eventIds;
            }
        }
    }

    private function applyOccurrenceNativeFilters(): void
    {
        if (null !== $this->event) {
            $this->andWhere(Db::parseParam('[[eventId]]', $this->event));
        }

        if (null !== $this->calendarId && !$this->isWildcardValue($this->calendarId)) {
            $this->andWhere(Db::parseParam('[[calendarId]]', $this->calendarId));
        }

        $calendarIds = $this->resolveCalendarIds();
        if (null === $calendarIds) {
            return;
        }

        if ([] === $calendarIds) {
            $this->andWhere('0=1');

            return;
        }

        $this->andWhere(Db::parseParam('[[calendarId]]', $calendarIds));
    }

    private function applyEventExistsFilter(): void
    {
        if (!$this->shouldLimitByEventQuery()) {
            return;
        }

        $eventQuery = clone $this->getEventQuery();
        $eventQuery->andWhere(
            '[[calendar_events]].[[id]] = '.OccurrenceRecord::TABLE.'.[[eventId]]'
        );

        $this->andWhere(['exists', $eventQuery]);
    }

    private function shouldLimitByEventQuery(): bool
    {
        return null !== $this->eventQuery
            || null !== $this->status
            || null !== $this->site
            || null !== $this->siteId;
    }

    private function resolveCalendarIds(): ?array
    {
        $conditions = ['and'];

        if (null !== $this->calendarUid && !$this->isWildcardValue($this->calendarUid)) {
            $conditions[] = Db::parseParam('[[uid]]', $this->calendarUid);
        }

        if (null !== $this->calendar && !$this->isWildcardValue($this->calendar)) {
            $conditions[] = Db::parseParam('[[handle]]', $this->calendar);
        }

        if (1 === \count($conditions)) {
            return null;
        }

        return (new Query())
            ->select(['id'])
            ->from(CalendarRecord::TABLE)
            ->where($conditions)
            ->column()
        ;
    }

    private function isWildcardValue(mixed $value): bool
    {
        if ('*' === $value) {
            return true;
        }

        return \is_array($value) && '*' === reset($value);
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

    private function orderByCustomField(): bool
    {
        if (!\is_array($this->orderBy) || [] === $this->orderBy) {
            return false;
        }

        foreach (array_keys($this->orderBy) as $key) {
            if (!\in_array($key, self::NATIVE_ORDER_COLUMNS, true)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param OccurrenceModel[] $models
     */
    private function sortByOrderCriteria(array &$models, array $orderBy): void
    {
        usort(
            $models,
            function (OccurrenceModel $modelA, OccurrenceModel $modelB) use ($orderBy) {
                foreach ($orderBy as $key => $direction) {
                    $valueA = $this->resolveOrderValue($modelA, $key);
                    $valueB = $this->resolveOrderValue($modelB, $key);

                    $comparison = $valueA <=> $valueB;

                    if (0 === $comparison) {
                        continue;
                    }

                    return \SORT_ASC === $direction ? $comparison : -$comparison;
                }

                return 0;
            }
        );
    }

    private function resolveOrderValue(OccurrenceModel $model, string $key): mixed
    {
        return match ($key) {
            'uid' => $model->uid,
            'eventId' => $model->event->id,
            'calendarId' => $model->calendar->id,
            'allDay' => $model->allDay,
            'startDate' => $model->startDate,
            'endDate' => $model->endDate,
            'dateCreated' => $model->dateCreated,
            'dateUpdated' => $model->dateUpdated,
            default => $model->event->canGetProperty($key) ? $model->event->{$key} : null,
        };
    }
}
