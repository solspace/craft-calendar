<?php

namespace Solspace\Calendar\Elements\Db;

use Carbon\Carbon;
use craft\db\ActiveQuery;
use craft\db\Table;
use craft\elements\db\ElementQueryInterface;
use craft\helpers\Db;
use craft\models\Site;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceMaterializer;
use Solspace\Calendar\Bundles\Occurrences\RecurrenceId;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Models\OccurrenceModel;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Records\OccurrenceOverrideRecord;
use Solspace\Calendar\Records\OccurrenceRecord;
use Solspace\Calendar\Records\OccurrenceWindowRecord;
use Solspace\Calendar\Transformers\FullCalTransformer;
use yii\base\InvalidArgumentException;
use yii\db\ExpressionInterface;
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
        'recurrenceId',
        'code',
        'allDay',
        'cancelled',
        'startDate',
        'endDate',
        'dateCreated',
        'dateUpdated',
    ];

    public ?string $status = Event::STATUS_LIVE;

    public array|string|null $id = null;
    public array|string|null $uid = null;
    public mixed $recurrenceId = null;
    public array|string|null $code = null;
    public array|string|null $slug = null;
    public ?bool $cancelled = null;
    public mixed $relatedTo = null;
    public mixed $search = null;
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

    public function init(): void
    {
        parent::init();

        // Criteria set the property directly, without what `orderBy()` does to it
        if (null !== $this->orderBy) {
            $this->orderBy = $this->normalizeOrderBy($this->orderBy);
        }
    }

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

    /**
     * Matches occurrences by the start their schedule originally produced.
     * Combine with `event()`, because recurrence IDs are only unique within an event.
     */
    public function recurrenceId(mixed $recurrenceId): self
    {
        $this->recurrenceId = $recurrenceId;

        return $this;
    }

    /**
     * Matches occurrences by their code, regardless of their date.
     */
    public function code(array|string|null $code): self
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Matches occurrences by their slug. The date in the slug has to be
     * the date the occurrence currently takes place on.
     */
    public function slug(array|string|null $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * `true` returns only cancelled occurrences, `false` leaves them out,
     * and `null` (the default) returns both.
     */
    public function cancelled(?bool $cancelled): self
    {
        $this->cancelled = $cancelled;

        return $this;
    }

    /**
     * Matches occurrences whose event, or whose own override, is related to the given elements.
     * Accepts the same values as an element query's `relatedTo` param.
     */
    public function relatedTo(mixed $relatedTo): self
    {
        $this->relatedTo = $relatedTo;

        return $this;
    }

    /**
     * Matches occurrences whose event, or whose own override, matches a search query.
     */
    public function search(mixed $search): self
    {
        $this->search = $search;

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
        $this->extendInfiniteOccurrenceWindows();

        $this->applyOccurrenceIdentityFilters();
        $this->applyRelationAndSearchFilters();
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

        $query = parent::prepare($builder);

        // Field values aren't columns. `all()` and `one()` sort by them in PHP, and nothing else needs the order.
        if (\is_array($query->orderBy)) {
            $query->orderBy = array_intersect_key($query->orderBy, array_flip(self::NATIVE_ORDER_COLUMNS)) ?: null;
        }

        return $query;
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
            // `with` holds Craft eager-loading paths, not Active Record relations
            $with = $this->with;
            $this->with = null;

            try {
                return parent::populate($rows);
            } finally {
                $this->with = $with;
            }
        }

        $eventIds = array_unique(array_column($rows, 'eventId'));
        $calendarIds = array_unique(array_column($rows, 'calendarId'));
        [$contentPaths, $eventPaths] = $this->getEagerLoadingPaths();

        /** @var Event[] $events */
        $eventQuery = clone $this->getEventQuery();
        if ($contentPaths || $eventPaths) {
            $eventQuery->andWith(array_merge($contentPaths, $eventPaths));
        }

        $events = $eventQuery->id($eventIds)->indexBy('id')->all();
        $overrides = $this->loadOverrides($rows, $events, $contentPaths);
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
            $model->recurrenceId = new Carbon($occurrence['recurrenceId'], DateHelper::UTC);
            $model->code = $occurrence['code'];
            $model->startDate = $startDate;
            $model->startDateLocalized = DateHelper::toLocalized($startDate);
            $model->endDate = $endDate;
            $model->endDateLocalized = DateHelper::toLocalized($endDate);
            $model->allDay = $occurrence['allDay'] ?? false;
            $model->cancelled = (bool) ($occurrence['cancelled'] ?? false);
            $model->dateCreated = new Carbon($occurrence['dateCreated']);
            $model->dateUpdated = new Carbon($occurrence['dateUpdated']);
            $model->uid = $occurrence['uid'];

            $override = $overrides[(int) ($occurrence['overrideId'] ?? 0)] ?? null;
            if ($override) {
                $override->setPrimaryOwner($event);
                $override->setOwner($event);
                $model->override = $override;
            }

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

    public function one($db = null)
    {
        if (!$this->orderByCustomField()) {
            return parent::one($db);
        }

        $models = (clone $this)->limit(1)->indexBy(null)->all($db);

        return $models[0] ?? null;
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

    /**
     * Occurrences are ordered by column names and field handles only, so nothing else reaches the SQL.
     * Strings like `startDate desc, title` are read the way Yii reads them.
     *
     * @param mixed $columns
     */
    protected function normalizeOrderBy($columns): array
    {
        if (\is_string($columns)) {
            $parsed = [];
            foreach (preg_split('/\s*,\s*/', trim($columns), -1, \PREG_SPLIT_NO_EMPTY) as $column) {
                $words = preg_split('/\s+/', $column);
                $parsed[$words[0]] = match (\count($words)) {
                    1 => \SORT_ASC,
                    2 => $words[1],
                    default => null,
                };
            }

            $columns = $parsed;
        }

        if ($columns instanceof ExpressionInterface || !\is_array($columns)) {
            throw new InvalidArgumentException('Occurrences can only be ordered by columns and field handles.');
        }

        $orderBy = [];
        foreach ($columns as $column => $direction) {
            if (\is_int($column) && \is_string($direction)) {
                [$column, $direction] = [$direction, \SORT_ASC];
            }

            $direction = match (\is_string($direction) ? strtolower($direction) : $direction) {
                \SORT_ASC, 'asc' => \SORT_ASC,
                \SORT_DESC, 'desc' => \SORT_DESC,
                default => null,
            };

            if (null === $direction || !\is_string($column) || !preg_match('/^\w+$/', $column)) {
                throw new InvalidArgumentException('Occurrences can only be ordered by columns and field handles.');
            }

            $orderBy[$column] = $direction;
        }

        return $orderBy;
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

        if (null !== $this->code) {
            $this->andWhere(['code' => $this->normalizeCodes($this->code)]);
        }

        if (null !== $this->cancelled) {
            $this->andWhere(['cancelled' => $this->cancelled]);
        }

        if (null !== $this->recurrenceId) {
            $this->applyAnyOfConditions($this->recurrenceId, static function (mixed $value): ?array {
                $recurrenceId = RecurrenceId::normalize($value);

                return null === $recurrenceId ? null : ['recurrenceId' => $recurrenceId];
            });
        }

        if (null !== $this->slug) {
            $siteId = $this->resolveContentSiteId();

            $this->applyAnyOfConditions(
                $this->slug,
                fn (mixed $slug) => \is_string($slug) ? $this->buildSlugCondition($slug, $siteId) : null,
            );
        }

        if (null !== $this->id) {
            $this->applyAnyOfConditions(
                $this->id,
                fn (mixed $occurrenceId) => $this->buildOccurrenceIdCondition((string) $occurrenceId),
            );
        }
    }

    /**
     * ORs the conditions built for each value. Values that can't match anything are skipped,
     * and if none are left, the query matches nothing.
     *
     * @param callable(mixed): ?array $buildCondition
     */
    private function applyAnyOfConditions(mixed $values, callable $buildCondition): void
    {
        $conditions = [];

        foreach (\is_array($values) ? $values : [$values] as $value) {
            $condition = $buildCondition($value);
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
        if (!preg_match('/^(\d+)-(\d{14})$/', $occurrenceId, $matches)) {
            return null;
        }

        [, $eventId, $recurrenceId] = $matches;

        $recurrenceId = RecurrenceId::normalize($recurrenceId);
        if (null === $recurrenceId) {
            return null;
        }

        return [
            'and',
            ['eventId' => (int) $eventId],
            ['recurrenceId' => $recurrenceId],
        ];
    }

    /**
     * A slug only matches an occurrence's current slug in the site: its custom slug if it has one,
     * otherwise its generated one. A generated slug also stops matching once the occurrence moves.
     */
    private function buildSlugCondition(string $slug, int $siteId): ?array
    {
        $slug = trim($slug);
        if ('' === $slug) {
            return null;
        }

        if (!preg_match(OccurrenceModel::GENERATED_SLUG_PATTERN, strtolower($slug), $matches)) {
            return ['overrideId' => $this->findOverridesWithCustomSlug($siteId)->andWhere(['elements_sites.slug' => $slug])];
        }

        [, $date, $code] = $matches;

        $dayStart = Carbon::createFromFormat('!Y-m-d', $date, DateHelper::UTC);
        if (!$dayStart instanceof Carbon || $dayStart->format('Y-m-d') !== $date) {
            return null;
        }

        return [
            'and',
            ['code' => $code],
            ['>=', 'startDate', $dayStart->format('Y-m-d H:i:s')],
            ['<', 'startDate', $dayStart->copy()->addDay()->format('Y-m-d H:i:s')],
            ['or', ['overrideId' => null], ['not in', 'overrideId', $this->findOverridesWithCustomSlug($siteId)]],
        ];
    }

    /**
     * IDs of the overrides with a custom slug in the given site.
     */
    private function findOverridesWithCustomSlug(int $siteId): Query
    {
        return (new Query())
            ->select(['elements_sites.elementId'])
            ->from(['elements_sites' => Table::ELEMENTS_SITES])
            ->innerJoin(['overrides' => OccurrenceOverrideRecord::TABLE], '[[overrides.id]] = [[elements_sites.elementId]]')
            ->where(['elements_sites.siteId' => $siteId])
            ->andWhere(['not', ['elements_sites.slug' => null]])
            ->andWhere(['not', ['elements_sites.slug' => '']])
        ;
    }

    /**
     * Two-tier matching: `relatedTo` and `search` match an occurrence through its event,
     * or through its own override. Per-field params only ever see the event's values.
     */
    private function applyRelationAndSearchFilters(): void
    {
        if (null !== $this->relatedTo) {
            $relatedTo = $this->relatedTo;
            $this->andWhere($this->matchEventOrOverride(static fn (ElementQueryInterface $query) => $query->relatedTo($relatedTo)));
        }

        if (null !== $this->search) {
            $search = $this->search;
            $this->andWhere($this->matchEventOrOverride(static fn (ElementQueryInterface $query) => $query->search($search)));
        }
    }

    /**
     * @param callable(ElementQueryInterface): ElementQueryInterface $criteria
     */
    private function matchEventOrOverride(callable $criteria): array
    {
        $siteId = $this->resolveContentSiteId();

        return [
            'or',
            ['eventId' => $criteria(Event::find()->siteId($siteId)->status(null))->ids()],
            ['overrideId' => $criteria(OccurrenceOverride::find()->siteId($siteId)->status(null))->ids()],
        ];
    }

    /**
     * The site whose slugs, relations and search index occurrences are matched against.
     */
    /**
     * The site whose content slugs, search and relations match. GraphQL passes `site` as a list.
     */
    private function resolveContentSiteId(): int
    {
        $siteId = \is_array($this->siteId) && 1 === \count($this->siteId) ? reset($this->siteId) : $this->siteId;
        if (is_numeric($siteId)) {
            return (int) $siteId;
        }

        $site = \is_array($this->site) && 1 === \count($this->site) ? reset($this->site) : $this->site;
        if ($site instanceof Site) {
            return $site->id;
        }

        $sites = \Craft::$app->getSites();
        if (\is_string($site) && '*' !== $site) {
            $site = $sites->getSiteByHandle($site);
            if ($site) {
                return $site->id;
            }
        }

        return $sites->getCurrentSite()->id;
    }

    /**
     * `with` takes Craft eager-loading paths. `content.<field>`, or just `<field>`, loads a field for the
     * occurrences' content, from both their events and their overrides. `event.<field>` loads it on the events only.
     *
     * @return array{0: array, 1: array} content paths, event paths
     */
    private function getEagerLoadingPaths(): array
    {
        $contentPaths = [];
        $eventPaths = [];

        foreach ((array) $this->with as $plan) {
            [$path, $criteria] = \is_array($plan) ? [$plan[0] ?? null, $plan[1] ?? null] : [$plan, null];
            if (!\is_string($path) || '' === $path) {
                continue;
            }

            if (str_starts_with($path, 'event.')) {
                $eventPaths[] = self::eagerLoadingPlan(substr($path, \strlen('event.')), $criteria);
            } else {
                $contentPath = str_starts_with($path, 'content.') ? substr($path, \strlen('content.')) : $path;
                $contentPaths[] = self::eagerLoadingPlan($contentPath, $criteria);
            }
        }

        return [$contentPaths, $eventPaths];
    }

    private static function eagerLoadingPlan(string $path, mixed $criteria): array|string
    {
        return null === $criteria ? $path : [$path, $criteria];
    }

    /**
     * Loads the overrides of a page of occurrences in one query per site, in their events' sites.
     *
     * @param Event[] $events indexed by ID
     *
     * @return array<int, OccurrenceOverride> indexed by ID
     */
    private function loadOverrides(array $rows, array $events, array $with): array
    {
        $overrideIdsBySite = [];
        foreach ($rows as $row) {
            $event = $events[$row['eventId']] ?? null;
            if ($event && !empty($row['overrideId'])) {
                $overrideIdsBySite[$event->siteId][] = (int) $row['overrideId'];
            }
        }

        $overrides = [];
        foreach ($overrideIdsBySite as $siteId => $overrideIds) {
            $query = OccurrenceOverride::find()->id(array_unique($overrideIds))->siteId($siteId)->status(null);
            if ($with) {
                $query->with($with);
            }

            foreach ($query->all() as $override) {
                $overrides[$override->id] = $override;
            }
        }

        return $overrides;
    }

    /**
     * Codes are generated in lowercase, and PostgreSQL compares strings case-sensitively.
     *
     * @return string|string[]
     */
    private function normalizeCodes(array|string $codes): array|string
    {
        if (\is_array($codes)) {
            return array_values(array_map(static fn (mixed $code) => strtolower(trim((string) $code)), $codes));
        }

        return strtolower(trim($codes));
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
            'recurrenceId' => $model->recurrenceId,
            'code' => $model->code,
            'allDay' => $model->allDay,
            'cancelled' => $model->cancelled,
            'startDate' => $model->startDate,
            'endDate' => $model->endDate,
            'dateCreated' => $model->dateCreated,
            'dateUpdated' => $model->dateUpdated,
            // Titles and custom fields sort by the occurrence's own values where it overrides them
            default => isset($model->getContent()->{$key}) ? $model->getContent()->{$key} : null,
        };
    }
}
