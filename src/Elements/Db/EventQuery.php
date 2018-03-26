<?php

namespace Solspace\Calendar\Elements\Db;

use Carbon\Carbon;
use craft\elements\db\ElementQuery;
use craft\helpers\Db;
use RRule\RRule;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Library\RecurrenceHelper;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\ExceptionsService;
use Solspace\Calendar\Services\SelectDatesService;
use Solspace\Commons\Helpers\PermissionHelper;
use yii\db\Connection;

class EventQuery extends ElementQuery implements \Countable
{
    const FORMAT_MONTH = 'Ym';
    const FORMAT_WEEK  = 'YW';
    const FORMAT_DAY   = 'Ymd';
    const FORMAT_HOUR  = 'YmdH';

    /** @var string */
    private static $lastCachedConfigStateHash;

    /** @var array */
    private $calendarId;

    /** @var array */
    private $calendar;

    /** @var int */
    private $authorId;

    /** @var \DateTime */
    private $startDate;

    /** @var \DateTime */
    private $endDate;

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

    /** @var bool */
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

    public function __construct(string $elementType, array $config = [])
    {
        $this->orderBy = ['startDate' => SORT_ASC];

        parent::__construct($elementType, $config);
    }

    /**
     * @param int|array $value
     *
     * @return $this
     */
    public function setCalendarId($value = null): EventQuery
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->calendarId = $value;

        return $this;
    }

    /**
     * @param string|array $value
     *
     * @return EventQuery
     */
    public function setCalendar($value = null): EventQuery
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->calendar = $value;

        return $this;
    }

    /**
     * @param int|array $value
     *
     * @return $this
     */
    public function setAuthorId($value = null): EventQuery
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->authorId = $value;

        return $this;
    }

    /**
     * @param string|\DateTime|Carbon|null $value
     *
     * @return EventQuery
     */
    public function setStartDate($value = null): EventQuery
    {
        $this->startDate = $this->parseCarbon($value);

        return $this;
    }

    /**
     * @param string|\DateTime|Carbon|null $value
     *
     * @return EventQuery
     */
    public function setEndDate($value = null): EventQuery
    {
        $this->endDate = $this->parseCarbon($value);

        return $this;
    }

    /**
     * @param bool $value
     *
     * @return $this
     */
    public function setAllDay(bool $value): EventQuery
    {
        $this->allDay = $value;

        return $this;
    }

    /**
     * @param string|\DateTime|Carbon|null $value
     *
     * @return EventQuery
     */
    public function setUntil($value = null): EventQuery
    {
        $this->until = $this->parseCarbon($value);

        return $this;
    }

    /**
     * @param bool|null $value
     *
     * @return EventQuery
     */
    public function setAllowedCalendarsOnly(bool $value): EventQuery
    {
        $this->allowedCalendarsOnly = $value;

        return $this;
    }

    /**
     * @param Carbon|string $rangeStart
     *
     * @return EventQuery
     */
    public function setRangeStart($rangeStart = null): EventQuery
    {
        $this->rangeStart = $this->parseCarbon($rangeStart);

        return $this;
    }

    /**
     * @param Carbon|string $rangeEnd
     *
     * @return EventQuery
     */
    public function setRangeEnd($rangeEnd = null): EventQuery
    {
        $this->rangeEnd = $this->parseCarbon($rangeEnd);

        return $this;
    }

    /**
     * @param bool $loadOccurrences
     *
     * @return EventQuery
     */
    public function setLoadOccurrences(bool $loadOccurrences): EventQuery
    {
        $this->loadOccurrences = $loadOccurrences;

        return $this;
    }

    /**
     * @param int $overlapThreshold
     *
     * @return EventQuery
     */
    public function setOverlapThreshold(int $overlapThreshold = null): EventQuery
    {
        $this->overlapThreshold = $overlapThreshold;

        return $this;
    }

    /**
     * @param bool $shuffle
     *
     * @return EventQuery
     */
    public function setShuffle(bool $shuffle): EventQuery
    {
        $this->shuffle = $shuffle;

        return $this;
    }

    /**
     * @param string $q
     * @param null   $db
     *
     * @return int
     */
    public function count($q = '*', $db = null): int
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
     * @return Event[]
     */
    public function all($db = null): array
    {
        $configHash = $this->getConfigStateHash();

        // Nasty elements index hack
        $context = \Craft::$app->request->post('context');
        if (\in_array($context, ['index', 'modal'], true)) {
            $this->loadOccurrences = false;
        }

        if (null === $this->events || self::$lastCachedConfigStateHash !== $configHash) {
            $limit        = $this->limit;
            $offset       = $this->offset;
            $this->limit  = null;
            $this->offset = null;

            $ids = parent::ids($db);

            $this->limit  = $limit;
            $this->offset = $offset;

            if (empty($ids)) {
                return [];
            }

            $this->events        = [];
            $this->eventCache    = [];
            $this->eventsByDate  = [];
            $this->eventsByHour  = [];
            $this->eventsByDay   = [];
            $this->eventsByWeek  = [];
            $this->eventsByMonth = [];

            $this->cacheSingleEvents($ids);
            $this->cacheRecurringEvents($ids);

            // Order the dates in a chronological order
            if ($this->shouldOrderByStartDate()) {
                $this->orderDates($this->eventCache);
            }

            if ($this->shuffle) {
                shuffle($this->eventCache);
            }

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
     * @param int             $n
     * @param Connection|null $db
     *
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
        $this->all($db);

        return $this->eventIds ?? [];
    }

    /**
     * @param Carbon $date
     *
     * @return Event[]
     */
    public function getEventsByMonth(Carbon $date): array
    {
        $this->all();
        $month = $date->format(self::FORMAT_MONTH);

        return $this->eventsByMonth[$month] ?? [];
    }

    /**
     * @param Carbon $date
     *
     * @return Event[]
     */
    public function getEventsByWeek(Carbon $date): array
    {
        $this->all();
        $week = DateHelper::getCacheWeekNumber($date);

        return $this->eventsByWeek[$week] ?? [];
    }

    /**
     * @param Carbon $date
     *
     * @return Event[]
     */
    public function getEventsByDay(Carbon $date): array
    {
        $this->all();
        $day = $date->format(self::FORMAT_DAY);

        return $this->eventsByDay[$day] ?? [];
    }

    /**
     * @param Carbon $date
     *
     * @return Event[]
     */
    public function getEventsByHour(Carbon $date): array
    {
        $this->all();
        $hour = $date->format(self::FORMAT_HOUR);

        return $this->eventsByHour[$hour] ?? [];
    }

    /**
     * @return bool
     */
    protected function beforePrepare(): bool
    {
        $table         = Event::TABLE_STD;
        $calendarTable = CalendarRecord::TABLE;

        // join in the products table
        $this->joinElementTable($table);
        $hasCalendarsJoined = false;

        if (!empty($this->join)) {
            foreach ($this->join as $join) {
                if ($join[1] === $calendarTable) {
                    $hasCalendarsJoined = true;
                }
            }
        }

        if (!$hasCalendarsJoined) {
            if (null === $this->join) {
                $this->join = [];
            }

            $this->join[] = ['INNER JOIN', $calendarTable, "$calendarTable.[[id]] = $table.[[calendarId]]"];
        }

        // select the price column
        $this->query->select(
            [
                $table . '.[[calendarId]]',
                $table . '.[[authorId]]',
                $table . '.[[startDate]]',
                $table . '.[[endDate]]',
                $table . '.[[allDay]]',
                $table . '.[[rrule]]',
                $table . '.[[freq]]',
                $table . '.[[interval]]',
                $table . '.[[count]]',
                $table . '.[[until]]',
                $table . '.[[byMonth]]',
                $table . '.[[byYearDay]]',
                $table . '.[[byMonthDay]]',
                $table . '.[[byDay]]',
                $calendarTable . '.[[name]]',
            ]
        );

        if ($this->calendarId) {
            $this->subQuery->andWhere(Db::parseParam($table . '.[[calendarId]]', $this->calendarId));
        }

        if ($this->calendar) {
            $this->subQuery->andWhere(Db::parseParam($calendarTable . '.[[handle]]', $this->calendar));
        }

        if ($this->authorId) {
            $this->subQuery->andWhere(Db::parseParam($table . '.[[authorId]]', $this->authorId));
        }

        if ($this->startDate) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table . '.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startDate)
                )
            );
        }

        if ($this->endDate) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table . '.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endDate)
                )
            );
        }

        if ($this->rangeStart) {
            $rangeStartString = $this->extractDateAsFormattedString($this->rangeStart);

            $this->subQuery->andWhere(
                "($table.[[rrule]] IS NULL AND $table.[[endDate]] >= :rangeStart)
                OR ($table.[[rrule]] IS NOT NULL AND $table.[[until]] IS NOT NULL AND $table.[[until]] >= :rangeStart)
                OR ($table.[[rrule]] IS NOT NULL AND $table.[[until]] IS NULL)
                OR ($table.[[freq]] = :freq)",
                [
                    'rangeStart' => $rangeStartString,
                    'freq'       => RecurrenceHelper::SELECT_DATES,
                ]
            );
        }

        if ($this->rangeEnd) {
            $rangeEnd = $this->rangeEnd->copy();

            if ($rangeEnd->format('His') === '000000') {
                $rangeEnd->setTime(23, 59, 59);
            }

            $rangeEndString = $this->extractDateAsFormattedString($rangeEnd);

            $this->subQuery->andWhere(
                "$table.[[startDate]] <= :rangeEnd OR $table.[[freq]] = :freq",
                [
                    'rangeEnd' => $rangeEndString,
                    'freq'     => RecurrenceHelper::SELECT_DATES,
                ]
            );
        }

        if ($this->allDay) {
            $this->subQuery->andWhere(Db::parseParam($table . '.[[allDay]]', (bool) $this->allDay));
        }

        if ($this->until) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $table . '.[[until]]',
                    $this->extractDateAsFormattedString($this->until)
                )
            );
        }

        if ($this->allowedCalendarsOnly) {
            $isAdmin      = PermissionHelper::isAdmin();
            $canManageAll = PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR_ALL);

            if (!$isAdmin && !$canManageAll) {
                $allowedCalendarIds = PermissionHelper::getNestedPermissionIds(
                    Calendar::PERMISSION_EVENTS_FOR
                );

                $this->subQuery->andWhere(Db::parseParam($table . '.[[calendarId]]', $allowedCalendarIds));
            }

            if (!PermissionHelper::isAdmin() && Calendar::getInstance()->settings->isAuthoredEventEditOnly()) {
                $this->subQuery->andWhere($table . '.[[authorId]]', \Craft::$app->user->id);
            }
        }

        return parent::beforePrepare();
    }

    /**
     * @param string|Carbon|\DateTime $date
     *
     * @return string
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
     * Adds them all to event cache
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
     * Stores the valid event occurrences in cache
     *
     * @param array $foundIds
     */
    private function cacheRecurringEvents(array $foundIds)
    {
        $recurringEventMetadata = $this->getEventService()->getRecurringEventMetadata($foundIds);

        foreach ($recurringEventMetadata as $metadata) {
            $eventId         = $metadata['id'];
            $startDate       = $metadata['startDate'];
            $endDate         = $metadata['endDate'];
            $startDateCarbon = new Carbon($startDate, DateHelper::UTC);
            $endDateCarbon   = new Carbon($endDate, DateHelper::UTC);
            $freq            = $metadata['freq'];

            // If we're not loading occurrences,
            // We must check the first event to see if it matches the given range
            // And add it accordingly
            if (!$this->loadOccurrences) {
                $isOutsideStartRange = $this->rangeStart && $startDateCarbon->lt($this->rangeStart);
                $isOutsideEndRange   = $this->rangeEnd && $endDateCarbon->gt($this->rangeEnd);

                if ($isOutsideStartRange || $isOutsideEndRange) {
                    continue;
                }

                $this->cacheEvent($eventId, $startDateCarbon);
                continue;
            }

            if ($freq === RecurrenceHelper::SELECT_DATES) {
                $paddedRangeStart = $this->getPaddedRangeStart();
                $paddedRangeEnd   = $this->getPaddedRangeEnd();

                $selectDates = $this
                    ->getSelectDatesService()
                    ->getSelectDatesAsCarbonsForEventId($eventId, $paddedRangeStart, $paddedRangeEnd);

                array_unshift($selectDates, new Carbon($metadata['startDate'], DateHelper::UTC));

                foreach ($selectDates as $date) {
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
                    $isOutsideEndRange   = $this->rangeEnd && $occurrenceStartDate->gt($this->rangeEnd);

                    if ($isOutsideStartRange || $isOutsideEndRange) {
                        continue;
                    }

                    $this->cacheEvent($eventId, $occurrenceStartDate);
                }
            } else {
                $rruleObject = $this->getRRuleFromEventMetadata($metadata);

                if (!$rruleObject) {
                    continue;
                }

                $paddedRangeStart = $this->getPaddedRangeStart($rruleObject->isInfinite() ? $startDate : null);
                $paddedRangeEnd   = $this->getPaddedRangeEnd($rruleObject->isInfinite() ? $freq : null);

                $occurrences = $rruleObject->getOccurrencesBetween($paddedRangeStart, $paddedRangeEnd);
                $exceptions  = $this->getExceptionService()->getExceptionDatesForEventId($eventId);

                foreach ($occurrences as $occurrence) {
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
                    $isOutsideEndRange   = $this->rangeEnd && $occurrenceStartDate->gt($this->rangeEnd);

                    if ($isOutsideStartRange || $isOutsideEndRange) {
                        continue;
                    }

                    $this->cacheEvent($eventId, $occurrenceStartDate);
                }
            }
        }
    }

    /**
     * @param string $relativeDate
     *
     * @return Carbon|null
     */
    private function getPaddedRangeStart($relativeDate = null)
    {
        $paddedRangeStart = null;
        if ($this->rangeStart) {
            $paddedRangeStart = $this->rangeStart->copy()->subWeek();
        } else if ($relativeDate) {
            $paddedRangeStart = new Carbon($relativeDate, DateHelper::UTC);
        }

        return $paddedRangeStart;
    }

    /**
     * @param string $recurrenceFrequency
     *
     * @return Carbon|null
     */
    private function getPaddedRangeEnd($recurrenceFrequency = null)
    {
        $paddedRangeEnd = null;
        if ($this->rangeEnd) {
            $paddedRangeEnd = $this->rangeEnd->copy()->addWeek();
        } else if ($recurrenceFrequency) {
            $paddedRangeEnd = new Carbon(DateHelper::UTC);

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
        $startDate  = $eventMetadata['startDate'];
        $freq       = $eventMetadata['freq'];
        $count      = $eventMetadata['count'];
        $interval   = $eventMetadata['interval'];
        $byDay      = $eventMetadata['byDay'];
        $byMonthDay = $eventMetadata['byMonthDay'];
        $byMonth    = $eventMetadata['byMonth'];
        $byYearDay  = $eventMetadata['byYearDay'];
        $until      = $eventMetadata['until'];

        try {
            return new RRule(
                [
                    'FREQ'       => $freq,
                    'INTERVAL'   => $interval,
                    'DTSTART'    => $startDate,
                    'UNTIL'      => $until,
                    'COUNT'      => $count,
                    'BYDAY'      => $byDay,
                    'BYMONTHDAY' => $byMonthDay,
                    'BYMONTH'    => $byMonth,
                    'BYYEARDAY'  => $byYearDay,
                ]
            );
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Adds event ID and occurrence date to the cache
     *
     * @param int    $eventId
     * @param Carbon $date
     */
    private function cacheEvent($eventId, Carbon $date)
    {
        $this->eventCache[] = [$date, $eventId];
    }

    /**
     * Takes eventIds from cache and stores the respective Event object in the list
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
        $limit          = $this->limit;
        $offset         = $this->offset;
        $this->limit    = null;
        $this->offset   = null;

        $events = parent::all();

        $this->limit  = $limit;
        $this->offset = $offset;

        $eventsById = [];
        foreach ($events as $event) {
            $eventsById[$event->getId()] = $event;
        }

        /**
         * Store each remaining date in the event date cache as an Event
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

    /**
     * @param Event  $event
     * @param Carbon $date
     */
    private function storeEventOnDate(Event $event, Carbon $date)
    {
        $this->events[] = $event->cloneForDate($date);
    }

    /**
     * @param array $dates
     */
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

    /**
     * Orders events by their start dates
     *
     * @param Event[] $events
     */
    private function orderEvents(array &$events)
    {
        $modifier = $this->getSortModifier();
        $orderBy  = $this->getOrderByField() ?? 'startDate';

        if (false !== strpos($orderBy, '.')) {
            $orderBy = 'startDate';
        }

        usort(
            $events,
            function (Event $eventA, Event $eventB) use ($modifier, $orderBy) {
                if ($orderBy !== 'startDate') {
                    if ($modifier > 0) {
                        return $eventA->{$orderBy} <=> $eventB->{$orderBy};
                    }

                    return $eventB->{$orderBy} <=> $eventA->{$orderBy};
                }

                if ($eventA->diffInDays($eventB)) {
                    return $eventA->compareStartDates($eventB) * $modifier;
                }

                $multiDayComparison = $eventA->compareMultiDay($eventB);
                $allDayComparison   = $eventA->compareAllDay($eventB);

                // If both are not multi-day
                if ($multiDayComparison === false) {

                    // If both aren't all-day
                    if ($allDayComparison === false) {

                        // Sort by start date
                        return $eventA->compareStartDates($eventB) * $modifier;
                    }

                    // If both are all-day
                    if ($allDayComparison === true) {

                        // Compare the end dates
                        return $eventA->compareEndDates($eventB) * $modifier;
                    }

                    // Otherwise put the all-day event in front
                    return $allDayComparison;
                }

                // If both are multi-day
                if ($multiDayComparison === true) {

                    // Sort by end date - inverse the results
                    return $eventA->compareEndDates($eventB) * -1 * $modifier;
                }

                // Otherwise put the one which is multi-day - first
                return $multiDayComparison;
            }
        );
    }

    /**
     * Cuts off the excess events based on ::$limit and ::$offset
     *
     * @param array $array
     */
    private function cutOffExcess(array &$array)
    {
        if (null !== $this->limit) {
            $offset = $this->offset ?: 0;

            $array = \array_slice($array, $offset, $this->limit);
        }
    }

    /**
     * Builds a cache of events for easy lookup with indexes
     */
    private function cacheEvents()
    {
        $eventsByMonth = $eventsByWeek = $eventsByDay = $eventsByHour = [];
        foreach ($this->events as $event) {
            $startDate  = $event->getStartDate();
            $endDate    = $event->getEndDate();
            $diffInDays = DateHelper::carbonDiffInDays($startDate, $endDate);

            $month = $startDate->format(self::FORMAT_MONTH);
            $this->addEventToCache($eventsByMonth, $month, $event);

            $week = DateHelper::getCacheWeekNumber($startDate);
            $this->addEventToCache($eventsByWeek, $week, $event);

            $day = $startDate->copy();
            for ($i = 0; $i <= $diffInDays; $i++) {
                if ($this->overlapThreshold && $i !== 0 && $i === $diffInDays) {
                    if (DateHelper::isDateBeforeOverlap($endDate, $this->overlapThreshold)) {
                        break;
                    }
                }
                $this->addEventToCache($eventsByDay, $day->format(self::FORMAT_DAY), $event);
                $day->addDay();
            }

            if (!$event->isAllDay()) {
                $hour = $startDate->format(self::FORMAT_HOUR);
                $this->addEventToCache($eventsByHour, $hour, $event);
                if ($diffInDays && !DateHelper::isDateBeforeOverlap($endDate, $this->overlapThreshold ?? 0)) {
                    $this->addEventToCache($eventsByHour, $endDate->format(self::FORMAT_HOUR), $event);
                }
            }
        }

        foreach ($eventsByDay as $events) {
            $this->orderEvents($events);
        }

        $this->eventsByMonth = $eventsByMonth;
        $this->eventsByWeek  = $eventsByWeek;
        $this->eventsByDay   = $eventsByDay;
        $this->eventsByHour  = $eventsByHour;
    }

    /**
     * Warms up the cache if needed, adds event to it
     *
     * @param array  $cache
     * @param string $key
     * @param Event  $event
     */
    private function addEventToCache(array &$cache, string $key, Event $event)
    {
        if (!isset($cache[$key])) {
            $cache[$key] = [];
        }

        $cache[$key][] = $event;
    }

    /**
     * Makes a Carbon instance from a given value
     *
     * @param string|\DateTime|Carbon|null $value
     *
     * @return Carbon|null
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
     * If it has - check if is set to start date
     *
     * @return bool
     */
    private function shouldOrderByStartDate(): bool
    {
        if (\is_array($this->orderBy)) {
            foreach ($this->orderBy as $key => $sortDirection) {
                if (preg_match("/\.?startDate$/", $key)) {
                    return true;
                }
            }
        } else {
            return null === $this->orderBy || preg_match("/\.?startDate$/", $this->orderBy);
        }

        return false;
    }

    /**
     * Returns 1 for ASC and -1 for DESC
     * Based on ::$sort
     *
     * @return int
     */
    private function getSortModifier(): int
    {
        if (\is_array($this->orderBy) && count($this->orderBy)) {
            $sortDirection = reset($this->orderBy);

            if (is_numeric($sortDirection)) {
                return $sortDirection === SORT_DESC ? -1 : 1;
            }

            return strtolower($sortDirection) === 'desc' ? -1 : 1;
        }

        return 1;
    }

    /**
     * Returns the first order by field
     *
     * @return string|null
     */
    private function getOrderByField()
    {
        if (\is_array($this->orderBy) && \count($this->orderBy)) {
            $keys = array_keys($this->orderBy);

            return reset($keys);
        }

        return $this->orderBy;
    }

    /**
     * @return EventsService
     */
    private function getEventService(): EventsService
    {
        return Calendar::getInstance()->events;
    }

    /**
     * @return SelectDatesService
     */
    private function getSelectDatesService(): SelectDatesService
    {
        return Calendar::getInstance()->selectDates;
    }

    /**
     * @return ExceptionsService
     */
    private function getExceptionService(): ExceptionsService
    {
        return Calendar::getInstance()->exceptions;
    }

    /**
     * @return string
     */
    private function getConfigStateHash(): string
    {
        $data = [
            'elementType'    => $this->elementType,
            'id'             => $this->id,
            'status'         => $this->status,
            'archived'       => $this->archived,
            'dateCreated'    => $this->dateCreated,
            'dateUpdated'    => $this->dateUpdated,
            'siteId'         => $this->siteId,
            'enabledForSite' => $this->enabledForSite,
            'title'          => $this->title,
            'slug'           => $this->slug,
            'uri'            => $this->uri,
            'search'         => $this->search,
            'orderBy'        => $this->orderBy,
            'limit'          => $this->limit,
            'offset'         => $this->offset,
            'indexBy'        => $this->indexBy,
        ];

        return sha1(serialize($data));
    }
}
