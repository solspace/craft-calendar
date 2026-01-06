<?php

namespace Solspace\Calendar\Elements\Db;

use Carbon\Carbon;
use Carbon\Exceptions\InvalidDateException;
use craft\base\ElementInterface;
use craft\db\Table;
use craft\elements\db\ElementQuery;
use craft\helpers\Db;
use RRule\RRule;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Duration\DayDuration;
use Solspace\Calendar\Library\Duration\DurationInterface;
use Solspace\Calendar\Library\Duration\MonthDuration;
use Solspace\Calendar\Library\Duration\WeekDuration;
use Solspace\Calendar\Library\Exceptions\CalendarException;
use Solspace\Calendar\Library\Exceptions\DateFormatException;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Library\Helpers\RecurrenceHelper;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Records\OccurrenceRecord;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\ExceptionsService;
use Solspace\Calendar\Services\SelectDatesService;
use yii\base\Model;
use yii\db\Connection;
use yii\db\Expression;

class EventQuery extends ElementQuery
{
    public const MAX_EVENT_LENGTH_DAYS = 365;

    public const TARGET_MONTH = 'Month';
    public const TARGET_WEEK = 'Week';
    public const TARGET_DAY = 'Day';

    private const INPUT_FORMATS = [
        // ISO / RFC
        'Y-m-d\TH:i:sP',
        'Y-m-d\TH:i:s\Z',
        \DATE_RFC3339,
        \DATE_ATOM,

        // Common SQL/ISO-ish
        'Y-m-d H:i:s',
        'Y-m-d H:i',
        'Y-m-d',

        // UK/EU (DMY)
        'd/m/Y H:i:s',
        'd/m/Y H:i',
        'd/m/Y',
        'd-m-Y H:i:s',
        'd-m-Y H:i',
        'd-m-Y',
        'd.m.Y H:i:s',
        'd.m.Y H:i',
        'd.m.Y',

        // US (MDY)
        'm/d/Y H:i:s',
        'm/d/Y H:i',
        'm/d/Y',
        'm-d-Y H:i:s',
        'm-d-Y H:i',
        'm-d-Y',
        'm.d.Y H:i:s',
        'm.d.Y H:i',
        'm.d.Y',
    ];

    public ?int $typeId = null;

    private ?array $calendarId = null;
    private ?array $calendarUid = null;
    private ?array $calendar = null;

    private null|array|int|string $authorId = null;

    private null|\DateTime|string $postDate = null;
    private null|\DateTime|string $startDate = null;
    private null|\DateTime|string $endDate = null;
    private null|\DateTime|string $startsBefore = null;
    private null|\DateTime|string $startsBeforeOrAt = null;
    private null|\DateTime|string $startsAfter = null;
    private null|\DateTime|string $startsAfterOrAt = null;
    private null|\DateTime|string $endsAfter = null;
    private null|\DateTime|string $endsAfterOrAt = null;
    private null|\DateTime|string $endsBefore = null;
    private null|\DateTime|string $endsBeforeOrAt = null;

    private bool $allDay = false;
    private bool $allowedCalendarsOnly = false;
    private null|\DateTime|string $until = null;
    private null|\DateTime|string $rangeStart = null;
    private null|\DateTime|string $rangeEnd = null;

    private bool|int|string $loadOccurrences = true;

    private ?int $overlapThreshold = null;
    private ?bool $shuffle = null;

    /** @var null|array - [date, [eventId, ..]] */
    private ?array $eventCache = null;

    /** @var null|array - events ordered by startDate */
    private ?array $eventsByDate = null;

    /** @var Event[] - events ordered by date */
    private ?array $events = null;

    /** @var int[] */
    private ?array $eventsByHour = null;

    private ?int $totalCount = null;
    private ?int $firstDay = null;
    private ?bool $noMultiDayGroup = null;

    public function __construct(string $elementType, array $config = [])
    {
        $this->orderBy = ['startDate' => \SORT_ASC];
        $this->firstDay = Calendar::getInstance()->settings->getFirstDayOfWeek();

        parent::__construct($elementType, $config);
    }

    public function setCalendarId(null|array|int|string $value = null): self
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->calendarId = $value;

        return $this;
    }

    public function setCalendarUid(null|array|string $value = null): self
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->calendarUid = $value;

        return $this;
    }

    public function setCalendar(null|array|string $value = null): self
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->calendar = $value;

        return $this;
    }

    public function setAuthorId(null|array|int|string $value = null): self
    {
        if (null !== $value && !\is_array($value)) {
            $value = [$value];
        }

        $this->authorId = $value;

        return $this;
    }

    /**
     * Narrows the query results based on the entries’ author ID(s).
     *
     * Possible values include:
     *
     * | Value | Fetches entries…
     * | - | -
     * | `1` | with an author with an ID of 1.
     * | `'not 1'` | not with an author with an ID of 1.
     * | `[1, 2]` | with an author with an ID of 1 or 2.
     * | `['and', 1, 2]` |  with authors with IDs of 1 and 2.
     * | `['not', 1, 2]` | not with an author with an ID of 1 or 2.
     *
     * ---
     *
     * ```twig
     * {# Fetch entries with an author with an ID of 1 #}
     * {% set {elements-var} = {twig-method}
     *   .authorId(1)
     *   .all() %}
     * ```
     *
     * ```php
     * // Fetch entries with an author with an ID of 1
     * ${elements-var} = {php-method}
     *     ->authorId(1)
     *     ->all();
     * ```
     *
     * @param mixed $value The property value
     *
     * @return static self reference
     *
     * @uses $authorId
     */
    public function authorId(mixed $value): static
    {
        $this->authorId = $value;

        return $this;
    }

    public function setPostDate(mixed $value = null): self
    {
        $this->postDate = $value;

        return $this;
    }

    public function setStartDate(mixed $value = null): self
    {
        $this->startDate = $this->parseCarbon($value);

        return $this;
    }

    public function setEndDate(mixed $value = null): self
    {
        $this->endDate = $this->parseCarbon($value);

        return $this;
    }

    public function setStartsBefore(mixed $startsBefore): self
    {
        $this->startsBefore = $this->parseCarbon($startsBefore);

        return $this;
    }

    public function setStartsBeforeOrAt(mixed $startsBeforeOrAt): self
    {
        $this->startsBeforeOrAt = $this->parseCarbon($startsBeforeOrAt);

        return $this;
    }

    public function setStartsAfter(mixed $startsAfter): self
    {
        $this->startsAfter = $this->parseCarbon($startsAfter);

        return $this;
    }

    public function setStartsAfterOrAt(mixed $startsAfterOrAt): self
    {
        $this->startsAfterOrAt = $this->parseCarbon($startsAfterOrAt);

        return $this;
    }

    public function setEndsAfter(mixed $endsAfter): self
    {
        $this->endsAfter = $this->parseCarbon($endsAfter);

        return $this;
    }

    public function setEndsAfterOrAt(mixed $endsAfterOrAt): self
    {
        $this->endsAfterOrAt = $this->parseCarbon($endsAfterOrAt);

        return $this;
    }

    public function setEndsBefore(mixed $endsBefore): self
    {
        $this->endsBefore = $this->parseCarbon($endsBefore);

        return $this;
    }

    public function setEndsBeforeOrAt(mixed $endsBeforeOrAt): self
    {
        $this->endsBeforeOrAt = $this->parseCarbon($endsBeforeOrAt);

        return $this;
    }

    public function setAllDay(bool $value): self
    {
        $this->allDay = $value;

        return $this;
    }

    public function setUntil(mixed $value = null): self
    {
        $this->until = $this->parseCarbon($value);

        return $this;
    }

    public function setAllowedCalendarsOnly(bool $value): self
    {
        $this->allowedCalendarsOnly = $value;

        return $this;
    }

    public function setRangeStart(mixed $rangeStart = null): self
    {
        $this->rangeStart = $this->parseCarbon($rangeStart);

        return $this;
    }

    public function setRangeEnd(mixed $rangeEnd = null): self
    {
        $this->rangeEnd = $this->parseCarbon($rangeEnd);
        if ('000000' === $this->rangeEnd->format('His')) {
            $this->rangeEnd->setTime(23, 59, 59);
        }

        return $this;
    }

    public function setLoadOccurrences(bool|int|string $loadOccurrences): self
    {
        $this->loadOccurrences = $loadOccurrences;

        return $this;
    }

    public function setOverlapThreshold(?int $overlapThreshold = null): self
    {
        $this->overlapThreshold = $overlapThreshold;

        return $this;
    }

    protected function beforePrepare(): bool
    {
        $events = Event::TABLE;
        $occurrences = OccurrenceRecord::TABLE;
        $calendar = CalendarRecord::TABLE;
        $users = Table::USERS;

        $this->joinElementTable($events);
        $this->join('INNER JOIN', $calendar, "{$calendar}.[[id]] = {$events}.[[calendarId]]");
        $this->join('LEFT JOIN', $users, "{$users}.[[id]] = {$events}.[[authorId]]");
        $this->subQuery
            ->join('INNER JOIN', $occurrences, "{$occurrences}.[[eventId]] = {$events}.[[id]]")
            ->groupBy([$events.'.[[id]]', 'siteSettingsId'])
        ;

        $this->query->select([
            $events.'.[[calendarId]]',
            $events.'.[[authorId]]',
            $events.'.[[startDate]]',
            $events.'.[[endDate]]',
            $events.'.[[dateCreated]]',
            $events.'.[[dateUpdated]]',
            $events.'.[[allDay]]',
            $events.'.[[rrule]]',
            $events.'.[[freq]]',
            $events.'.[[interval]]',
            $events.'.[[count]]',
            $events.'.[[until]]',
            $events.'.[[byMonth]]',
            $events.'.[[byYearDay]]',
            $events.'.[[byMonthDay]]',
            $events.'.[[byDay]]',
            $events.'.[[postDate]]',
            $users.'.[[username]]',
            $calendar.'.[[name]]',
        ]);

        if ($this->calendarId) {
            if (\is_array($this->calendarId)) {
                $firstCalendar = reset($this->calendarId);
                $isWildcard = '*' === $firstCalendar;
            } else {
                $isWildcard = '*' === $this->calendarId;
            }

            if (!$isWildcard) {
                $this->subQuery->andWhere(Db::parseParam($events.'.[[calendarId]]', $this->calendarId));
            }
        }

        if ($this->calendarUid) {
            $this->subQuery->andWhere(Db::parseParam($calendar.'.[[uid]]', $this->calendarUid));
        }

        if ($this->calendar) {
            $this->subQuery->andWhere(Db::parseParam($calendar.'.[[handle]]', $this->calendar));
        }

        if ($this->authorId) {
            $this->subQuery->andWhere(Db::parseParam($events.'.[[authorId]]', $this->authorId));
        }

        if ($this->dateCreated) {
            $value = $this->dateCreated;
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[dateCreated]]',
                    \is_array($value) ? $value : $this->extractDateAsFormattedString($value)
                )
            );
        }

        if ($this->dateUpdated) {
            $value = $this->dateUpdated;
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[dateUpdated]]',
                    \is_array($value) ? $value : $this->extractDateAsFormattedString($value)
                )
            );
        }

        if ($this->postDate) {
            $value = $this->postDate;
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[postDate]]',
                    \is_array($value) ? $value : $this->extractDateAsFormattedString($value)
                )
            );
        }

        if ($this->startDate) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startDate)
                )
            );
        }

        if ($this->startsBefore) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startsBefore),
                    '<'
                )
            );
        }

        if ($this->startsBeforeOrAt) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startsBeforeOrAt),
                    '<='
                )
            );
        }

        if ($this->startsAfter) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startsAfter),
                    '>'
                )
            );
        }

        if ($this->startsAfterOrAt) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[startDate]]',
                    $this->extractDateAsFormattedString($this->startsAfterOrAt),
                    '>='
                )
            );
        }

        if ($this->endsAfter) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endsAfter),
                    '>'
                )
            );
        }

        if ($this->endsAfterOrAt) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endsAfterOrAt),
                    '>='
                )
            );
        }

        if ($this->endsBefore) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endsBefore),
                    '<'
                )
            );
        }

        if ($this->endsBeforeOrAt) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endsBeforeOrAt),
                    '<='
                )
            );
        }

        if ($this->endDate) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[endDate]]',
                    $this->extractDateAsFormattedString($this->endDate)
                )
            );
        }

        if ($this->rangeStart) {
            $this->subQuery->andWhere(
                "{$occurrences}.[[endUtc]] >= :rangeStart",
                ['rangeStart' => $this->rangeStart],
            );
        }

        if ($this->rangeEnd) {
            $this->subQuery->andWhere(
                "{$occurrences}.[[startUtc]] <= :rangeEnd",
                ['rangeEnd' => $this->rangeEnd],
            );
        }

        if ($this->allDay) {
            $this->subQuery->andWhere(Db::parseParam($events.'.[[allDay]]', $this->allDay));
        }

        if ($this->until) {
            $this->subQuery->andWhere(
                Db::parseParam(
                    $events.'.[[until]]',
                    $this->extractDateAsFormattedString($this->until)
                )
            );
        }

        if ($this->allowedCalendarsOnly) {
            $isAdmin = PermissionHelper::isAdmin();
            $canManageAll = PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR_ALL);

            if (!$isAdmin && !$canManageAll) {
                $allowedUids = PermissionHelper::getNestedPermissionIds(Calendar::PERMISSION_EVENTS_FOR);
                $this->subQuery->andWhere(Db::parseParam($calendar.'.[[uid]]', $allowedUids));
            }

            if (!PermissionHelper::isAdmin() && Calendar::getInstance()->settings->isAuthoredEventEditOnly()) {
                $this->subQuery->andWhere($events.'.[[authorId]]', \Craft::$app->user->id);
            }
        }

        return parent::beforePrepare();
    }

    private function hasExplicitTime(string $value): bool
    {
        // looks for HH:MM or a 'T' with time portion
        return (bool) preg_match('/(?:T|\s)\d{1,2}:\d{2}/', $value);
    }

    /**
     * Normalize a date string (possibly with an operator) to 'Y-m-d H:i:s' UTC.
     * Returns the original trimmed string if it can’t confidently parse it.
     */
    private function normalizeStringDate(string $date, ?\DateTimeZone $defaultTz = null): string
    {
        $date = trim($date);
        if ('' === $date) {
            return $date;
        }

        // Extract optional operator
        $operator = '';
        if (preg_match('/^(<=|>=|<>|<|>|=)\s*(.+)$/', $date, $matches)) {
            $operator = $matches[1];
            $date = trim($matches[2]);
        }

        // Numeric unix timestamp?
        if (ctype_digit($date)) {
            $datetime = (new \DateTimeImmutable('@'.$date))->setTimezone(new \DateTimeZone('UTC'));

            return ltrim($operator.' '.$datetime->format('Y-m-d H:i:s'));
        }

        $hasTime = $this->hasExplicitTime($date);

        $defaultTz ??= new \DateTimeZone('UTC');

        // Try whitelisted formats first
        foreach (self::INPUT_FORMATS as $format) {
            $datetime = \DateTimeImmutable::createFromFormat($format, $date, $defaultTz);
            if ($datetime instanceof \DateTimeImmutable) {
                if (!$hasTime) {
                    $datetime = $datetime->setTime(0, 0, 0);
                }

                // If input had no tz info, $defaultTz is used; convert to UTC for storage
                $datetime = $datetime->setTimezone(new \DateTimeZone('UTC'));

                return ltrim($operator.' '.$datetime->format('Y-m-d H:i:s'));
            }
        }

        // Fallback: let PHP try
        try {
            $datetime = new \DateTimeImmutable($date, $defaultTz);

            if (!$hasTime) {
                $datetime = $datetime->setTime(0, 0, 0);
            }

            $datetime = $datetime->setTimezone(new \DateTimeZone('UTC'));

            return ltrim($operator.' '.$datetime->format('Y-m-d H:i:s'));
        } catch (\Exception) {
            // Give up: return original so Db::parseParam can still handle known operator strings
            return trim(($operator ? $operator.' ' : '').$date);
        }
    }

    private function extractDateAsFormattedString(mixed $date): array|string
    {
        // normalize recursively and preserve operator tokens
        if (\is_array($date)) {
            $normalized = [];

            foreach ($date as $key => $value) {
                // Preserve common logical tokens as-is
                if (\is_string($value) && \in_array(strtolower(trim($value)), ['and', 'or', 'not'], true)) {
                    $normalized[$key] = $value;

                    continue;
                }

                // Recurse for nested arrays or format scalars
                $normalized[$key] = $this->extractDateAsFormattedString($value);
            }

            return $normalized;
        }

        // Carbon -> 'Y-m-d H:i:s'
        if ($date instanceof Carbon) {
            $date = $date->toDateTimeString();
        }

        // DateTime -> 'Y-m-d H:i:s'
        if ($date instanceof \DateTimeInterface) {
            $date = $date->format('Y-m-d H:i:s');
        }

        // Unix timestamp (int)
        if (\is_int($date)) {
            // Use date() or gmdate() depending on your storage conventions
            return date('Y-m-d H:i:s', $date);
        }

        // Strings (including operator strings like '>= 2024-09-01 00:00:00')
        if (\is_string($date)) {
            return $this->normalizeStringDate($date);
        }

        // explicit to help debugging
        throw new \InvalidArgumentException(\sprintf(
            'Invalid date param type: %s',
            \is_object($date) ? $date::class : \gettype($date)
        ));
    }

    /**
     * Makes a Carbon instance from a given value.
     */
    private function parseCarbon(mixed $value = null): ?Carbon
    {
        try {
            return Carbon::parse($value);
        } catch (\Exception) {
            throw new DateFormatException(
                sprintf(
                    'Invalid date param type: %s',
                    \is_object($value) ? $value::class : \gettype($value)
                )
            );
        }
    }

    /**
     * @param class-string<DurationInterface> $extractableClass
     *
     * @return DurationInterface[]
     */
    private function extractGroupedEvents(string $extractableClass, string $targetTimeframe): array
    {
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
}
