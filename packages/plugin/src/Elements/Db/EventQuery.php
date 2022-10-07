<?php

namespace Solspace\Calendar\Elements\Db;

use Carbon\Carbon;
use craft\db\Table;
use craft\elements\db\ElementQuery;
use craft\helpers\Db;
use RRule\RRule;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Library\Duration\DayDuration;
use Solspace\Calendar\Library\Duration\DurationInterface;
use Solspace\Calendar\Library\Duration\MonthDuration;
use Solspace\Calendar\Library\Duration\WeekDuration;
use Solspace\Calendar\Library\Exceptions\CalendarException;
use Solspace\Calendar\Library\RecurrenceHelper;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\ExceptionsService;
use Solspace\Calendar\Services\SelectDatesService;
use Solspace\Commons\Helpers\PermissionHelper;
use yii\db\Connection;
use yii\db\Expression;

class EventQuery extends ElementQuery
{
    const MAX_EVENT_LENGTH_DAYS = 365;

    const TARGET_MONTH = 'Month';
    const TARGET_WEEK = 'Week';
    const TARGET_DAY = 'Day';

    /** @var int */
    public $typeId;

    /** @var string */
    private static $lastCachedConfigStateHash;

    /** @var array */
    private $calendarId;

    /** @var array */
    private $calendarUid;

    /** @var array */
    private $calendar;

    /** @var int */
    private $authorId;

    /** @var \DateTime */
    private $postDate;

    /** @var \DateTime */
    private $startDate;

    /** @var \DateTime */
    private $endDate;

    /** @var \DateTime */
    private $startsBefore;

    /** @var \DateTime */
    private $startsBeforeOrAt;

    /** @var \DateTime */
    private $startsAfter;

    /** @var \DateTime */
    private $startsAfterOrAt;

    /** @var \DateTime */
    private $endsAfter;

    /** @var \DateTime */
    private $endsAfterOrAt;

    /** @var \DateTime */
    private $endsBefore;

    /** @var \DateTime */
    private $endsBeforeOrAt;

    /** @var bool */
    private $allDay = false;

    /** @var \DateTime */
    private $until;

    /** @var bool */
    private $allowedCalendarsOnly = false;

    /** @var Carbon|string */
    private $rangeStart;

    /** @var Carbon|string */
    private $rangeEnd;

    /** @var bool|int|string */
    private $loadOccurrences = true;

    /** @var int */
    private $overlapThreshold;

    /** @var bool */
    private $shuffle;

    /** @var array - [date, [eventId, ..]] */
    private $eventCache;

    /** @var array - events ordered by startDate */
    private $eventsByDate;

    /** @var Event[] - events ordered by date */
    private $events;

    /** @var int[] */
    private $eventIds;

    /** @var array */
    private $eventsByMonth;

    /** @var array */
    private $eventsByWeek;

    /** @var array */
    private $eventsByDay;

    /** @var array */
    private $eventsByHour;

    /** @var int */
    private $totalCount;

    /** @var int */
    private $firstDay;

    /** @var bool */
    private $noMultiDayGroup;

    public function __construct(string $elementType, array $config = [])
    {
        $this->orderBy = ['startDate' => \SORT_ASC];
        $this->firstDay = Calendar::getInstance()->settings->getFirstDayOfWeek();

        parent::__construct($elementType, $config);
    }

    /**
     * @param array|int $value
     *
     * @return $this
     */
    public function setCalendarId($value = null): self
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->calendarId = $value;

        return $this;
    }

    /**
     * @param array|string $value
     *
     * @return $this
     */
    public function setCalendarUid($value = null): self
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->calendarUid = $value;

        return $this;
    }

    /**
     * @param array|string $value
     */
    public function setCalendar($value = null): self
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->calendar = $value;

        return $this;
    }

    /**
     * @param array|int $value
     *
     * @return $this
     */
    public function setAuthorId($value = null): self
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->authorId = $value;

        return $this;
    }

    /**
     * @param null $value
     *
     * @return $this
     */
    public function setPostDate($value = null): self
    {
        $this->postDate = $value;

        return $this;
    }

    /**
     * @param null|Carbon|\DateTime|string $value
     */
    public function setStartDate($value = null): self
    {
        $this->startDate = $this->parseCarbon($value);

        return $this;
    }

    /**
     * @param null|Carbon|\DateTime|string $value
     */
    public function setEndDate($value = null): self
    {
        $this->endDate = $this->parseCarbon($value);

        return $this;
    }

    /**
     * @param \DateTime $startsBefore
     */
    public function setStartsBefore($startsBefore): self
    {
        $this->startsBefore = $this->parseCarbon($startsBefore);

        return $this;
    }

    /**
     * @param \DateTime $startsBeforeOrAt
     */
    public function setStartsBeforeOrAt($startsBeforeOrAt): self
    {
        $this->startsBeforeOrAt = $this->parseCarbon($startsBeforeOrAt);

        return $this;
    }

    /**
     * @param \DateTime $startsAfter
     */
    public function setStartsAfter($startsAfter): self
    {
        $this->startsAfter = $this->parseCarbon($startsAfter);

        return $this;
    }

    /**
     * @param \DateTime $startsAfterOrAt
     */
    public function setStartsAfterOrAt($startsAfterOrAt): self
    {
        $this->startsAfterOrAt = $this->parseCarbon($startsAfterOrAt);

        return $this;
    }

    /**
     * @param \DateTime $endsAfter
     */
    public function setEndsAfter($endsAfter): self
    {
        $this->endsAfter = $this->parseCarbon($endsAfter);

        return $this;
    }

    /**
     * @param \DateTime $endsAfterOrAt
     */
    public function setEndsAfterOrAt($endsAfterOrAt): self
    {
        $this->endsAfterOrAt = $this->parseCarbon($endsAfterOrAt);

        return $this;
    }

    /**
     * @param \DateTime $endsBefore
     */
    public function setEndsBefore($endsBefore): self
    {
        $this->endsBefore = $this->parseCarbon($endsBefore);

        return $this;
    }

    /**
     * @param \DateTime $endsBeforeOrAt
     */
    public function setEndsBeforeOrAt($endsBeforeOrAt): self
    {
        $this->endsBeforeOrAt = $this->parseCarbon($endsBeforeOrAt);

        return $this;
    }

    /**
     * @return $this
     */
    public function setAllDay(bool $value): self
    {
        $this->allDay = $value;

        return $this;
    }

    /**
     * @param null|Carbon|\DateTime|string $value
     */
    public function setUntil($value = null): self
    {
        $this->until = $this->parseCarbon($value);

        return $this;
    }

    /**
     * @param null|bool $value
     */
    public function setAllowedCalendarsOnly(bool $value): self
    {
        $this->allowedCalendarsOnly = $value;

        return $this;
    }

    /**
     * @param Carbon|string $rangeStart
     */
    public function setRangeStart($rangeStart = null): self
    {
        $this->rangeStart = $this->parseCarbon($rangeStart);

        return $this;
    }

    /**
     * @param Carbon|string $rangeEnd
     */
    public function setRangeEnd($rangeEnd = null): self
    {
        $this->rangeEnd = $this->parseCarbon($rangeEnd);
        if ('000000' === $this->rangeEnd->format('His')) {
            $this->rangeEnd->setTime(23, 59, 59);
        }

        return $this;
    }

    /**
     * @param Carbon|string $rangeStart
     */
    public function setDateRangeStart($rangeStart = null): self
    {
        return $this->setRangeStart($rangeStart);
    }

    /**
     * @param Carbon|string $rangeEnd
     */
    public function setDateRangeEnd($rangeEnd = null): self
    {
        return $this->setRangeEnd($rangeEnd);
    }

    /**
     * @param bool|int|string $loadOccurrences
     */
    public function setLoadOccurrences($loadOccurrences): self
    {
        $this->loadOccurrences = $loadOccurrences;

        return $this;
    }

    /**
     * @param int $overlapThreshold
     */
    public function setOverlapThreshold(int $overlapThreshold = null): self
    {
        $this->overlapThreshold = $overlapThreshold;

        return $this;
    }

    public function setShuffle(bool $shuffle): self
    {
        $this->shuffle = $shuffle;

        return $this;
    }

    public function setFirstDay(int $firstDay): self
    {
        DateHelper::updateWeekStartDate(new Carbon(), $firstDay);

        return $this;
    }

    /**
     * @param string $q
     * @param null   $db
     */
    public function count($q = '*', $db = null)
    {
        $this->all($db);

        if (null === $this->totalCount) {
            $this->totalCount = \count($this->events ?? []);
        }

        return $this->totalCount;
    }

    /**
     * @param null $db
     *
     * @return null|array|\craft\base\ElementInterface
     */
    public function one($db = null)
    {
        $oldLimit = $this->limit;
        $this->limit = 1;

        $events = $this->all($db);

        $this->limit = $oldLimit;

        if (\count($events) >= 1) {
            return reset($events);
        }

        return null;
    }

    /**
     * @param null $db
     *
     * @return Event[]
     */
    public function all($db = null): array
    {
        // If an array data is requested - return it as is, without
        // fetching occurrences
        if ($this->asArray) {
            return parent::all();
        }

        $configHash = $this->getConfigStateHash();

        // Nasty elements index hack
        if (!\Craft::$app->request->isConsoleRequest) {
            $context = \Craft::$app->request->post('context');
            if (\in_array($context, ['index', 'modal'], true)) {
                $this->loadOccurrences = false;
            }
        }

        if (null === $this->events || self::$lastCachedConfigStateHash !== $configHash) {
            $limit = $this->limit;
            $offset = $this->offset;
            $indexBy = $this->indexBy;
            $this->limit = null;
            $this->offset = null;
            $this->indexBy = null;

            $ids = parent::ids($db);

            $this->limit = $limit;
            $this->offset = $offset;
            $this->indexBy = $indexBy;

            if (empty($ids)) {
                return [];
            }

            $this->events = [];
            $this->eventCache = [];
            $this->eventsByDate = [];
            $this->eventsByHour = [];
            $this->eventsByDay = [];
            $this->eventsByWeek = [];
            $this->eventsByMonth = [];

            $this->cacheSingleEvents($ids);
            $this->cacheRecurringEvents($ids);

            // Order the dates in a chronological order
            if ($this->shouldOrderByStartDate() || $this->shouldOrderByEndDate()) {
                $this->orderDates($this->eventCache);
            }

            if ($this->shouldRandomize()) {
                $this->randomizeDates($this->eventCache);
            }

            if ($this->shuffle) {
                shuffle($this->eventCache);
            }

            $this->totalCount = \count($this->eventCache);

            // Remove excess dates based on ::$limit and ::$offset
            $this->cutOffExcess($this->eventCache);

            $this->cacheToStorage();
            $this->orderEvents($this->events);

            // Build up an event cache, to be accessed later
            $this->cacheEvents();
            self::$lastCachedConfigStateHash = $configHash;
        }

        return $this->events;
    }

    /**
     * @return null|Event
     */
    public function nth(int $n, Connection $db = null)
    {
        $this->all($db);

        return $this->events[$n] ?? null;
    }

    /**
     * @param null $db
     *
     * @return int[]
     */
    public function ids($db = null): array
    {
        $events = $this->all($db);

        $eventIds = [];
        foreach ($events as $event) {
            $eventIds[] = $event->id;
        }

        return array_unique($eventIds);
    }

    public function getGroupedByMonth(): array
    {
        return $this->extractGroupedEvents(MonthDuration::class, self::TARGET_MONTH);
    }

    public function getEventsByMonth(Carbon $date): array
    {
        return $this->extractSpecificDurationEvents($this->resetMonth($date), self::TARGET_MONTH);
    }

    /**
     * @return Event[]
     */
    public function getGroupedByWeek(): array
    {
        return $this->extractGroupedEvents(WeekDuration::class, self::TARGET_WEEK);
    }

    /**
     * @return Event[]
     */
    public function getEventsByWeek(Carbon $date): array
    {
        return $this->extractSpecificDurationEvents($this->resetWeek($date), self::TARGET_WEEK);
    }

    /**
     * @return Event[]
     */
    public function getGroupedByDay(): array
    {
        return $this->extractGroupedEvents(DayDuration::class, self::TARGET_DAY);
    }

    /**
     * @return Event[]
     */
    public function getEventsByDay(Carbon $date): array
    {
        return $this->extractSpecificDurationEvents($this->resetDay($date), self::TARGET_DAY);
    }

    /**
     * @return Event[]
     */
    public function getEventsByHour(Carbon $date): array
    {
        $this->all();
        $hour = $date->setMinutes(0)->setSeconds(0);

        return $this->eventsByHour[$hour->getTimestamp()] ?? [];
    }

    protected function beforePrepare(): bool
    {
        $table = Event::TABLE_STD;
        $calendarTable = CalendarRecord::TABLE;

        // join in the products table
        $this->joinElementTable($table);
        $hasCalendarsJoined = false;
        $hasRelations = false;
        $hasUsers = false;

        if (!empty($this->join)) {
            foreach ($this->join as $join) {
                if ($join[1] === $calendarTable) {
                    $hasCalendarsJoined = true;
                }

                if ('{{%relations}} relations' === $join[1]) {
                    $hasRelations = true;
                }

                if (isset($join[1]['relations']) && '{{%relations}}' === $join[1]['relations']) {
                    $hasRelations = true;
                }

                if ('{{%users}}' === $join[1]) {
                    $hasUsers = true;
                }
            }
        }

        if (!$hasCalendarsJoined) {
            if (null === $this->join) {
                $this->join = [];
            }

            $this->join[] = ['INNER JOIN', $calendarTable, "{$calendarTable}.[[id]] = {$table}.[[calendarId]]"];
        }

        if (!$hasUsers) {
            if (null === $this->join) {
                $this->join = [];
            }

            $this->join[] = ['LEFT JOIN', '{{%users}}', "{{%users}}.[[id]] = {$table}.[[authorId]]"];
        }

        $select = [
            $table.'.[[calendarId]]',
            $table.'.[[authorId]]',
            $table.'.[[startDate]]',
            $table.'.[[endDate]]',
            $table.'.[[allDay]]',
            $table.'.[[rrule]]',
            $table.'.[[freq]]',
            $table.'.[[interval]]',
            $table.'.[[count]]',
            $table.'.[[until]]',
            $table.'.[[byMonth]]',
            $table.'.[[byYearDay]]',
            $table.'.[[byMonthDay]]',
            $table.'.[[byDay]]',
            $table.'.[[postDate]]',
            '{{%users}}.[[username]]',
            $calendarTable.'.[[name]]',
        ];

        if ($hasRelations) {
            $select[] = '[[relations.sortOrder]]';
        }

        // select the price column
        $this->query->select($select);

        if ($this->calendarId) {
            if (\is_array($this->calendarId)) {
                $firstCalendar = reset($this->calendarId);
                $isWildcard = '*' === $firstCalendar;
            } else {
                $isWildcard = '*' === $this->calendarId;
            }

            if (!$isWildcard) {
                $this->subQuery->andWhere(Db::parseParam($table.'.[[calendarId]]', $this->calendarId));
            }
        }

        if ($this->calendarUid) {
            $this->subQuery->andWhere(Db::parseParam($calendarTable.'.[[uid]]', $this->calendarUid));
        }

        if ($this->calendar) {
            $this->subQuery->andWhere(Db::parseParam($calendarTable.'.[[handle]]', $this->calendar));
        }

        if ($this->authorId) {
            $this->subQuery->andWhere(Db::parseParam($table.'.[[authorId]]', $this->authorId));
        }

        if ($this->postDate) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[postDate]]',
                    $this->extractDateAsFormattedString($this->postDate)
                )
            );
        }

        if ($this->startDate) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startDate)
                )
            );
        }

        if ($this->startsBefore) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startsBefore),
                    '<'
                )
            );
        }

        if ($this->startsBeforeOrAt) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startsBeforeOrAt),
                    '<='
                )
            );
        }

        if ($this->startsAfter) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startsAfter),
                    '>'
                )
            );
        }

        if ($this->startsAfterOrAt) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startsAfterOrAt),
                    '>='
                )
            );
        }

        if ($this->endsAfter) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endsAfter),
                    '>'
                )
            );
        }

        if ($this->endsAfterOrAt) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endsAfterOrAt),
                    '>='
                )
            );
        }

        if ($this->endsBefore) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endsBefore),
                    '<'
                )
            );
        }

        if ($this->endsBeforeOrAt) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endsBeforeOrAt),
                    '<='
                )
            );
        }

        if ($this->endDate) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endDate)
                )
            );
        }

        if ($this->rangeStart) {
            $rangeStartString = $this->extractDateAsFormattedString($this->rangeStart);

            $this->subQuery->andWhere(
                "({$table}.[[rrule]] IS NULL AND {$table}.[[endDate]] >= :rangeStart)
                OR ({$table}.[[rrule]] IS NOT NULL AND {$table}.[[until]] IS NOT NULL AND {$table}.[[until]] >= :rangeStart)
                OR ({$table}.[[rrule]] IS NOT NULL AND {$table}.[[until]] IS NULL)
                OR ({$table}.[[freq]] = :freq)",
                [
                    'rangeStart' => $rangeStartString,
                    'freq' => RecurrenceHelper::SELECT_DATES,
                ]
            );
        }

        if ($this->rangeEnd) {
            $rangeEndString = $this->extractDateAsFormattedString($this->rangeEnd);

            $this->subQuery->andWhere(
                "{$table}.[[startDate]] <= :rangeEnd OR {$table}.[[freq]] = :freq",
                [
                    'rangeEnd' => $rangeEndString,
                    'freq' => RecurrenceHelper::SELECT_DATES,
                ]
            );
        }

        if ($this->allDay) {
            $this->subQuery->andWhere(Db::parseParam($table.'.[[allDay]]', (bool) $this->allDay));
        }

        if ($this->until) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table.'.[[until]]',
                    $this->extractDateAsFormattedString($this->until)
                )
            );
        }

        if ($this->allowedCalendarsOnly) {
            $isAdmin = PermissionHelper::isAdmin();
            $canManageAll = PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR_ALL);

            if (!$isAdmin && !$canManageAll) {
                $allowedUids = PermissionHelper::getNestedPermissionIds(Calendar::PERMISSION_EVENTS_FOR);
                $allowedIds = array_map(function ($uid) {
                    return Db::idByUid(CalendarRecord::TABLE, $uid);
                }, $allowedUids);

                $this->subQuery->andWhere(Db::parseParam($table.'.[[calendarId]]', $allowedIds));
            }

            if (!PermissionHelper::isAdmin() && Calendar::getInstance()->settings->isAuthoredEventEditOnly()) {
                $this->subQuery->andWhere($table.'.[[authorId]]', \Craft::$app->user->id);
            }
        }

        if (\is_array($this->orderBy)) {
            if (isset($this->orderBy['dateCreated'])) {
                $sortDirection = $this->orderBy['dateCreated'];
                $this->orderBy['[[calendar_events.dateCreated]]'] = $sortDirection;

                unset($this->orderBy['dateCreated']);
            }
            if (isset($this->orderBy['postDate'])) {
                $sortDirection = $this->orderBy['postDate'];
                $this->orderBy['[[calendar_events.postDate]]'] = $sortDirection;

                unset($this->orderBy['postDate']);
            }
        }

        return parent::beforePrepare();
    }

    /**
     * @param Carbon|\DateTime|string $date
     */
    private function extractDateAsFormattedString($date): string
    {
        if ($date instanceof Carbon) {
            $date = $date->toDateTimeString();
        }

        if ($date instanceof \DateTime) {
            $date = $date->format('Y-m-d H:i:s');
        }

        return $date;
    }

    /**
     * Picks out the single events from the given $foundIds list
     * Adds them all to event cache.
     *
     * @param array $foundIds
     */
    private function cacheSingleEvents($foundIds)
    {
        $singleEventMetadata = $this->getEventService()->getSingleEventMetadata($foundIds);

        foreach ($singleEventMetadata as $metadata) {
            $startDate = new Carbon($metadata['startDate'], DateHelper::UTC);
            $this->cacheEvent($metadata['id'], $startDate);
        }
    }

    /**
     * Picks out the recurring events from $foundIds list
     * Generates their recurrences within the current date range
     * Stores the valid event occurrences in cache.
     */
    private function cacheRecurringEvents(array $foundIds)
    {
        $recurringEventMetadata = $this->getEventService()->getRecurringEventMetadata($foundIds);

        if (Calendar::getInstance()->isLite()) {
            $this->loadOccurrences = false;
        }

        $loadOccurrences = $this->loadOccurrences;

        if (\is_string($loadOccurrences) && !is_numeric($loadOccurrences) && 'next' === strtolower($loadOccurrences)) {
            $loadOccurrences = 1;
        }

        foreach ($recurringEventMetadata as $metadata) {
            $occurrencesLoaded = 0;

            $eventId = $metadata['id'];
            $startDate = $metadata['startDate'];
            $endDate = $metadata['endDate'];
            $startDateCarbon = new Carbon($startDate, DateHelper::UTC);
            $endDateCarbon = new Carbon($endDate, DateHelper::UTC);
            $freq = $metadata['freq'];

            // If we're not loading occurrences,
            // We must check the first event to see if it matches the given range
            // And add it accordingly
            if (!$loadOccurrences || !(bool) $metadata['allowRepeatingEvents']) {
                $isOutsideStartRange = $this->rangeStart && $startDateCarbon->lt($this->rangeStart);
                $isOutsideEndRange = $this->rangeEnd && $endDateCarbon->gt($this->rangeEnd);

                if ($isOutsideStartRange || $isOutsideEndRange) {
                    continue;
                }

                $this->cacheEvent($eventId, $startDateCarbon);

                continue;
            }

            if (RecurrenceHelper::SELECT_DATES === $freq) {
                $paddedRangeStart = $this->getPaddedRangeStart();
                $paddedRangeEnd = $this->getPaddedRangeEnd();

                $selectDates = $this->getSelectDatesService()->getSelectDatesAsCarbonsForEventId(
                    $eventId,
                    $paddedRangeStart,
                    $paddedRangeEnd
                );

                // Adds original event date as an occurrence
                array_unshift($selectDates, new Carbon($metadata['startDate'], DateHelper::UTC));

                foreach ($selectDates as $date) {
                    if (\is_int($loadOccurrences) && $loadOccurrences <= $occurrencesLoaded) {
                        break;
                    }

                    /**
                     * @var Carbon $occurrenceStartDate
                     * @var Carbon $occurrenceEndDate
                     */
                    list($occurrenceStartDate, $occurrenceEndDate) = DateHelper::getRelativeEventDates(
                        $startDateCarbon,
                        $endDateCarbon,
                        $date
                    );

                    $isOutsideStartRange = $this->rangeStart && $occurrenceEndDate->lt($this->rangeStart);
                    $isOutsideEndRange = $this->rangeEnd && $occurrenceStartDate->gt($this->rangeEnd);

                    if ($isOutsideStartRange || $isOutsideEndRange) {
                        continue;
                    }

                    $this->cacheEvent($eventId, $occurrenceStartDate);
                    ++$occurrencesLoaded;
                }
            } else {
                $rruleObject = $this->getRRuleFromEventMetadata($metadata);

                if (!$rruleObject) {
                    continue;
                }

                $isInfinite = $rruleObject->isInfinite();
                $paddedRangeStart = $this->getPaddedRangeStart($isInfinite ? $startDate : null);
                $paddedRangeEnd = $this->getPaddedRangeEnd(
                    $isInfinite ? $startDate : null,
                    $isInfinite ? $freq : null
                );

                if ($paddedRangeStart) {
                    $paddedRangeStart->setTime(0, 0, 0);
                }

                if ($paddedRangeEnd) {
                    $paddedRangeEnd->setTime(23, 59, 59);
                }

                $occurrences = $rruleObject->getOccurrencesBetween($paddedRangeStart, $paddedRangeEnd);
                $exceptions = $this->getExceptionService()->getExceptionDatesForEventId($eventId);

                /** @var \DateTime $occurrence */
                foreach ($occurrences as $occurrence) {
                    if (\is_int($loadOccurrences) && $loadOccurrences <= $occurrencesLoaded) {
                        break;
                    }

                    if (\in_array($occurrence->format('Y-m-d'), $exceptions, true)) {
                        continue;
                    }

                    /**
                     * @var Carbon $occurrenceStartDate
                     * @var Carbon $occurrenceEndDate
                     */
                    list($occurrenceStartDate, $occurrenceEndDate) = DateHelper::getRelativeEventDates(
                        $startDateCarbon,
                        $endDateCarbon,
                        $occurrence
                    );

                    $isOutsideStartRange = $this->rangeStart && $occurrenceEndDate->lt($this->rangeStart);
                    $isOutsideEndRange = $this->rangeEnd && $occurrenceStartDate->gt($this->rangeEnd);

                    if ($isOutsideStartRange || $isOutsideEndRange) {
                        continue;
                    }

                    $this->cacheEvent($eventId, $occurrenceStartDate);
                    ++$occurrencesLoaded;
                }
            }
        }
    }

    /**
     * @param string $relativeDate
     *
     * @return null|Carbon
     */
    private function getPaddedRangeStart($relativeDate = null)
    {
        $paddedRangeStart = null;
        if ($this->rangeStart) {
            $paddedRangeStart = $this->rangeStart->copy()->subWeek();
        } elseif ($relativeDate) {
            $paddedRangeStart = new Carbon($relativeDate, DateHelper::UTC);
        }

        return $paddedRangeStart;
    }

    /**
     * @param null|Carbon|string $relativeDate
     * @param string             $recurrenceFrequency
     *
     * @return null|Carbon
     */
    private function getPaddedRangeEnd($relativeDate = null, $recurrenceFrequency = null)
    {
        if ($this->rangeEnd) {
            return $this->rangeEnd->copy()->addWeek();
        }

        $paddedRangeEnd = null;
        if ($recurrenceFrequency) {
            $paddedRangeEnd = $this->parseCarbon($relativeDate) ?? new Carbon(DateHelper::UTC);

            switch ($recurrenceFrequency) {
                case RecurrenceHelper::DAILY:
                    $paddedRangeEnd->addMonth();

                    break;

                case RecurrenceHelper::WEEKLY:
                    $paddedRangeEnd->addMonths(6);

                    break;

                default:
                    $paddedRangeEnd->addYear();

                    break;
            }
        }

        return $paddedRangeEnd;
    }

    /**
     * @param array $eventMetadata
     *
     * @return null|RRule
     */
    private function getRRuleFromEventMetadata($eventMetadata)
    {
        $startDate = $eventMetadata['startDate'];
        $freq = $eventMetadata['freq'];
        $count = $eventMetadata['count'];
        $interval = $eventMetadata['interval'];
        $byDay = $eventMetadata['byDay'];
        $byMonthDay = $eventMetadata['byMonthDay'];
        $byMonth = $eventMetadata['byMonth'];
        $byYearDay = $eventMetadata['byYearDay'];
        $until = $eventMetadata['until'];

        $startDate = new Carbon($startDate, DateHelper::UTC);
        if ($until) {
            $until = new Carbon($until, DateHelper::UTC);
        }

        try {
            return new RRule(
                [
                    'FREQ' => $freq,
                    'INTERVAL' => $interval,
                    'DTSTART' => $startDate,
                    'UNTIL' => $until,
                    'COUNT' => $count,
                    'BYDAY' => $byDay,
                    'BYMONTHDAY' => $byMonthDay,
                    'BYMONTH' => $byMonth,
                    'BYYEARDAY' => $byYearDay,
                ]
            );
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Adds event ID and occurrence date to the cache.
     *
     * @param int $eventId
     */
    private function cacheEvent($eventId, Carbon $date)
    {
        $this->eventCache[] = [$date, $eventId];
    }

    /**
     * Takes eventIds from cache and stores the respective Event object in the list.
     */
    private function cacheToStorage()
    {
        $eventIds = array_map(
            function ($data) {
                return $data[1];
            },
            $this->eventCache
        );

        $this->eventIds = array_unique($eventIds);
        $limit = $this->limit;
        $offset = $this->offset;
        $this->limit = null;
        $this->offset = null;

        // Introducing a hotfix for when Craft tries to get the count of rows
        $firstColumn = reset($this->select);
        if ($firstColumn) {
            $isExpression = $firstColumn instanceof Expression && '1' === $firstColumn->expression;
            if ($isExpression) {
                $this->select('elements.[[id]]');
            }
        }

        $events = parent::all();

        $this->limit = $limit;
        $this->offset = $offset;

        $eventsById = [];
        foreach ($events as $event) {
            if (\is_array($event)) {
                $event = new Event($event);
            }

            $eventsById[$event->getId()] = $event;
        }

        /**
         * Store each remaining date in the event date cache as an Event.
         *
         * @var Carbon $date
         * @var int    $eventId
         */
        foreach ($this->eventCache as list($date, $eventId)) {
            if (!isset($eventsById[$eventId])) {
                continue;
            }

            $this->storeEventOnDate($eventsById[$eventId], $date);
        }
    }

    private function storeEventOnDate(Event $event, Carbon $date)
    {
        try {
            $this->events[] = $event->cloneForDate($date);
        } catch (CalendarException $e) {
        }
    }

    private function orderDates(array &$dates)
    {
        $modifier = $this->getSortModifier();

        usort(
            $dates,
            function (array $arrayA, array $arrayB) use ($modifier) {
                $dateA = $arrayA[0];
                $dateB = $arrayB[0];

                if ($dateA < $dateB) {
                    return -1 * $modifier;
                }

                if ($dateA > $dateB) {
                    return 1 * $modifier;
                }

                return 0;
            }
        );
    }

    private function randomizeDates(array &$dates)
    {
        shuffle($dates);
    }

    /**
     * Orders events by their start dates.
     *
     * @param Event[] $events
     */
    private function orderEvents(array &$events)
    {
        $modifier = $this->getSortModifier();
        $orderBy = $this->getOrderByField() ?? 'startDate';

        if ('relations.sortOrder' === $orderBy) {
            $orderBy = 'sortOrder';
        }

        if (false !== strpos($orderBy, '.')) {
            $orderBy = 'startDate';
        }

        $firstEvent = reset($events);
        if (!$firstEvent || !isset($firstEvent->{$orderBy})) {
            return;
        }

        usort(
            $events,
            function (Event $eventA, Event $eventB) use ($modifier, $orderBy) {
                if ('startDate' !== $orderBy) {
                    if ($modifier > 0) {
                        return $eventA->{$orderBy} <=> $eventB->{$orderBy};
                    }

                    return $eventB->{$orderBy} <=> $eventA->{$orderBy};
                }

                if ($eventA->diffInDays($eventB)) {
                    return $eventA->compareStartDates($eventB) * $modifier;
                }

                $multiDayComparison = $eventA->compareMultiDay($eventB);
                $allDayComparison = $eventA->compareAllDay($eventB);

                // If both are not multi-day
                if (false === $multiDayComparison) {
                    // If both aren't all-day
                    if (false === $allDayComparison) {
                        // Sort by start date
                        return $eventA->compareStartDates($eventB) * $modifier;
                    }

                    // If both are all-day
                    if (true === $allDayComparison) {
                        // Compare the end dates
                        return $eventA->compareEndDates($eventB) * $modifier;
                    }

                    // Otherwise put the all-day event in front
                    return $allDayComparison;
                }

                // If both are multi-day
                if (true === $multiDayComparison) {
                    // Sort by end date - inverse the results
                    return $eventA->compareEndDates($eventB) * -1 * $modifier;
                }

                // Otherwise put the one which is multi-day - first
                return $multiDayComparison;
            }
        );
    }

    /**
     * Cuts off the excess events based on ::$limit and ::$offset.
     */
    private function cutOffExcess(array &$array)
    {
        if ($this->limit >= 0) {
            $offset = $this->offset ?: 0;

            $array = \array_slice($array, $offset, $this->limit);
        }
    }

    /**
     * Builds a cache of events for easy lookup with indexes.
     */
    private function cacheEvents()
    {
        $eventsByMonth = $eventsByWeek = $eventsByDay = $eventsByHour = [];
        foreach ($this->events as $event) {
            $startDate = $event->getStartDate();
            if ($this->rangeStart && $this->rangeStart->gt($startDate)) {
                $startDate = $this->rangeStart;
            }

            $endDate = $event->getEndDate();
            if ($this->rangeEnd && $this->rangeEnd->lt($endDate)) {
                $endDate = $this->rangeEnd;
            }

            $diffInDays = DateHelper::carbonDiffInDays($startDate, $endDate);

            $month = $this->resetMonth($startDate->copy());
            while ($month->lessThanOrEqualTo($endDate)) {
                $this->addEventToCache($eventsByMonth, $month, $event);
                $month->addMonth();
            }

            $week = $this->resetWeek($startDate->copy());
            while ($week->lessThanOrEqualTo($endDate)) {
                $this->addEventToCache($eventsByWeek, $week, $event);
                $week->addWeek();
            }

            $day = $this->resetDay($startDate->copy());
            for ($i = 0; $i <= $diffInDays && $i <= self::MAX_EVENT_LENGTH_DAYS; ++$i) {
                if ($this->overlapThreshold && 0 !== $i && $i === $diffInDays) {
                    if (DateHelper::isDateBeforeOverlap($endDate, $this->overlapThreshold)) {
                        break;
                    }
                }
                $this->addEventToCache($eventsByDay, $day, $event);
                $day->addDay();
                if ($this->noMultiDayGroup) {
                    break;
                }
            }

            if (!$event->isAllDay()) {
                $hour = $startDate
                    ->copy()
                    ->setMinute(0)
                    ->setSecond(0)
                ;

                $this->addEventToCache($eventsByHour, $hour, $event);
                if ($diffInDays && !DateHelper::isDateBeforeOverlap($endDate, $this->overlapThreshold ?? 0)) {
                    $this->addEventToCache($eventsByHour, $endDate, $event);
                }
            }
        }

        foreach ($eventsByDay as $events) {
            $this->orderEvents($events);
        }

        $this->eventsByMonth = $eventsByMonth;
        $this->eventsByWeek = $eventsByWeek;
        $this->eventsByDay = $eventsByDay;
        $this->eventsByHour = $eventsByHour;
    }

    /**
     * Warms up the cache if needed, adds event to it.
     */
    private function addEventToCache(array &$cache, Carbon $date, Event $event)
    {
        $key = $date->getTimestamp();
        if (!isset($cache[$key])) {
            $cache[$key] = [];
        }

        $cache[$key][] = $event;
    }

    /**
     * Makes a Carbon instance from a given value.
     *
     * @param null|Carbon|\DateTime|string $value
     *
     * @return null|Carbon
     */
    private function parseCarbon($value = null)
    {
        if (null === $value) {
            return null;
        }

        if ($value instanceof Carbon) {
            return $value;
        }

        if (!$value instanceof \DateTime) {
            $value = new \DateTime($value);
        }

        return Carbon::createFromFormat(
            'Y-m-d H:i:s',
            $value->format('Y-m-d H:i:s'),
            DateHelper::UTC
        );
    }

    /**
     * Checks whether an order parameter has been set
     * If it hasn't - return true, since we sort by start date by default
     * If it has - check if is set to start date.
     */
    private function shouldOrderByStartDate(): bool
    {
        if (\is_array($this->orderBy)) {
            foreach ($this->orderBy as $key => $sortDirection) {
                if (preg_match('/\\.?startDate$/', $key)) {
                    return true;
                }
            }
        } else {
            return null === $this->orderBy || preg_match('/\\.?startDate$/', $this->orderBy);
        }

        return false;
    }

    /**
     * Checks whether an order parameter has been set
     * If it hasn't - return false, since we sort by start date by default
     * If it has - check if is set to end date.
     */
    private function shouldOrderByEndDate(): bool
    {
        if (\is_array($this->orderBy)) {
            foreach ($this->orderBy as $key => $sortDirection) {
                if (preg_match('/\\.?endDate$/', $key)) {
                    return true;
                }
            }
        } else {
            return null === $this->orderBy || preg_match('/\\.?endDate$/', $this->orderBy);
        }

        return false;
    }

    /**
     * Checks whether the events should be randomized.
     */
    private function shouldRandomize(): bool
    {
        if (\is_array($this->orderBy)) {
            return \array_key_exists('RAND()', $this->orderBy);
        }

        return null !== $this->orderBy && 'RAND()' === $this->orderBy;
    }

    /**
     * Returns 1 for ASC and -1 for DESC
     * Based on ::$sort.
     */
    private function getSortModifier(): int
    {
        if (\is_array($this->orderBy) && \count($this->orderBy)) {
            $sortDirection = reset($this->orderBy);

            if (is_numeric($sortDirection)) {
                return \SORT_DESC === $sortDirection ? -1 : 1;
            }

            return 'desc' === strtolower($sortDirection) ? -1 : 1;
        }

        return 1;
    }

    /**
     * Returns the first order by field.
     *
     * @return null|string
     */
    private function getOrderByField()
    {
        if (\is_array($this->orderBy) && \count($this->orderBy)) {
            $keys = array_keys($this->orderBy);

            return reset($keys);
        }

        return $this->orderBy;
    }

    private function extractDateFromCacheKey(int $key): Carbon
    {
        preg_match('/^(\\d{4})(\\d{2})(\\d{2})?$/', $key, $matches);

        $year = $matches[1] ?? null;
        $month = $matches[2] ?? null;
        $day = $matches[3] ?? 1;

        return Carbon::createFromDate($year, $month, $day, DateHelper::UTC);
    }

    /**
     * @param class-string<DurationInterface> $extractableClass
     *
     * @return DurationInterface[]
     */
    private function extractGroupedEvents(string $extractableClass, string $targetTimeframe): array
    {
        Carbon::setWeekStartsAt($this->firstDay ?? 1);
        $initialGrouping = $this->noMultiDayGroup;
        $this->noMultiDayGroup = true;
        $this->all();
        $this->noMultiDayGroup = $initialGrouping;

        $grouped = [];
        $groupedEvents = $this->{'eventsBy'.$targetTimeframe};
        if ($groupedEvents) {
            foreach ($groupedEvents as $timestamp => $events) {
                $date = Carbon::createFromTimestampUTC($timestamp);
                $grouped[] = new $extractableClass($date, $events);
            }
        }

        return $grouped;
    }

    private function extractSpecificDurationEvents(Carbon $date, string $targetTimeframe): array
    {
        $this->all();

        return $this->{'eventsBy'.$targetTimeframe}[$date->getTimestamp()] ?? [];
    }

    private function resetMonth(Carbon $date): Carbon
    {
        return $date->setDay(1)->setTime(0, 0);
    }

    private function resetWeek(Carbon $date): Carbon
    {
        return $date->startOfWeek($this->firstDay)->setTime(0, 0);
    }

    private function resetDay(Carbon $date): Carbon
    {
        return $date->setTime(0, 0);
    }

    private function getEventService(): EventsService
    {
        return Calendar::getInstance()->events;
    }

    private function getSelectDatesService(): SelectDatesService
    {
        return Calendar::getInstance()->selectDates;
    }

    private function getExceptionService(): ExceptionsService
    {
        return Calendar::getInstance()->exceptions;
    }

    private function getConfigStateHash(): string
    {
        $data = [
            'elementType' => $this->elementType,
            'id' => $this->id,
            'status' => $this->status,
            'archived' => $this->archived,
            'postDate' => $this->postDate,
            'dateCreated' => $this->dateCreated,
            'dateUpdated' => $this->dateUpdated,
            'siteId' => $this->siteId,
            'enabledForSite' => $this->enabledForSite,
            'title' => $this->title,
            'slug' => $this->slug,
            'uri' => $this->uri,
            'search' => $this->search,
            'orderBy' => $this->orderBy,
            'limit' => $this->limit,
            'offset' => $this->offset,
            'indexBy' => $this->indexBy,
        ];

        return sha1(serialize($data));
    }
}
