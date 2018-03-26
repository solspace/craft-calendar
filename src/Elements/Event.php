<?php

namespace Solspace\Calendar\Elements;

use Carbon\Carbon;
use craft\base\Element;
use craft\elements\db\ElementQueryInterface;
use craft\elements\User;
use craft\helpers\UrlHelper;
use craft\models\FieldLayout;
use RRule\RRule;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Actions\DeleteEventAction;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Library\CalendarPermissionHelper;
use Solspace\Calendar\Library\Configurations\Occurrences;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Library\Duration\EventDuration;
use Solspace\Calendar\Library\RecurrenceHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\ExceptionModel;
use Solspace\Calendar\Models\SelectDateModel;
use Symfony\Component\PropertyAccess\PropertyAccessor;

class Event extends Element implements \JsonSerializable
{
    const TABLE     = '{{%calendar_events}}';
    const TABLE_STD = 'calendar_events';

    const UNTIL_TYPE_FOREVER = 'forever';
    const UNTIL_TYPE_UNTIL   = 'until';
    const UNTIL_TYPE_COUNT   = 'count';

    /** @var int */
    private static $overlapThreshold;

    /** @var ExceptionModel[] */
    private $exceptions;

    /** @var array */
    private $selectDatesCache;

    /** @var Event[] */
    private $occurrenceCache = [];

    /** @var int */
    public $calendarId;

    /** @var string */
    public $name;

    /** @var int */
    public $authorId;

    /** @var \DateTime */
    public $startDate;

    /** @var \DateTime */
    public $endDate;

    /** @var bool */
    public $allDay;

    /** @var string */
    public $rrule;

    /** @var string */
    public $freq;

    /** @var int */
    public $interval;

    /** @var int */
    public $count;

    /** @var \DateTime */
    public $until;

    /** @var string */
    public $byMonth;

    /** @var string */
    public $byYearDay;

    /** @var string */
    public $byMonthDay;

    /** @var string */
    public $byDay;

    /**
     * @return EventQuery|ElementQueryInterface
     */
    public static function find(): ElementQueryInterface
    {
        return new EventQuery(self::class);
    }

    /**
     * @return bool
     */
    public static function hasTitles(): bool
    {
        return true;
    }

    /**
     * @return bool
     */
    public static function hasContent(): bool
    {
        return true;
    }

    /**
     * @return bool
     */
    public static function isLocalized(): bool
    {
        return true;
    }

    /**
     * @return bool
     */
    public static function hasUris(): bool
    {
        return true;
    }

    /**
     * @param array $config
     *
     * @return EventQuery|ElementQueryInterface
     */
    public static function buildQuery(array $config = null): ElementQueryInterface
    {
        $query = self::find();

        if (null !== $config) {
            $propertyAccessor = new PropertyAccessor();

            foreach ($config as $key => $value) {
                if ($propertyAccessor->isWritable($query, $key)) {
                    $propertyAccessor->setValue($query, $key, $value);
                }
            }
        }

        $query->setOverlapThreshold(Calendar::getInstance()->settings->getOverlapThreshold());
        $query->siteId = $query->siteId ?? \Craft::$app->sites->currentSite->id;

        return $query;
    }

    /**
     * @param int|null $siteId
     * @param int|null $calendarId
     *
     * @return Event
     */
    public static function create(int $siteId = null, int $calendarId = null): Event
    {
        $settings = Calendar::getInstance()->settings;

        $date = new \DateTime();
        $date = new Carbon($date->format('Y-m-d H:i:s'), DateHelper::UTC);
        $date->setTime($date->hour, 0, 0);

        $element             = new self();
        $element->allDay     = $settings->isAllDayDefault();
        $element->authorId   = \Craft::$app->user->getId();
        $element->enabled    = true;
        $element->startDate  = $date;
        $element->endDate    = $element->startDate->copy()->addMinutes($settings->getEventDuration());
        $element->calendarId = $calendarId ?? Calendar::getInstance()->calendars->getFirstCalendarId();

        if ($siteId) {
            $element->siteId = $siteId;
        }

        return $element;
    }

    /**
     * @inheritDoc
     */
    protected static function defineSources(string $context = null): array
    {
        $sources = [
            [
                'key'      => '*',
                'label'    => Calendar::t('All events'),
                'criteria' => [],
            ],
            ['heading' => Calendar::t('Calendars')],
        ];

        foreach (Calendar::getInstance()->calendars->getAllAllowedCalendars() as $calendar) {
            $sources[] = [
                'key'      => 'calendar:' . $calendar->id,
                'label'    => $calendar->name,
                'criteria' => ['calendarId' => $calendar->id],
            ];
        }

        return $sources;
    }

    /**
     * @inheritDoc
     */
    protected static function defineTableAttributes(): array
    {
        $attributes = [
            'title'       => ['label' => Calendar::t('Title')],
            'calendar'    => ['label' => Calendar::t('Calendar')],
            'startDate'   => ['label' => Calendar::t('Start Date')],
            'endDate'     => ['label' => Calendar::t('End Date')],
            'allDay'      => ['label' => Calendar::t('All Day')],
            'rrule'       => ['label' => Calendar::t('Repeats')],
            'author'      => ['label' => Calendar::t('Author')],
            'dateCreated' => ['label' => Calendar::t('Post Date')],
            'link'        => ['label' => Calendar::t('Link'), 'icon' => 'world'],
        ];

        // Hide Author from Craft Personal/Client
        if (\Craft::$app->getEdition() < \Craft::Pro) {
            unset($attributes['author']);
        }

        return $attributes;
    }

    /**
     * @return array
     */
    protected static function defineSortOptions(): array
    {
        $sortOptions = parent::defineSortOptions();

        $keys = array_keys($sortOptions);
        $keys[array_search('calendar', $keys, true)] = 'name';

        return array_combine($keys, $sortOptions);
    }

    /**
     * @inheritDoc
     */
    protected static function defineDefaultTableAttributes(string $source): array
    {
        return [
            'title',
            'calendar',
            'startDate',
            'endDate',
            'allDay',
            'dateCreated',
        ];
    }

    /**
     * @inheritDoc
     */
    protected static function defineActions(string $source = null): array
    {
        return [
            \Craft::$app->elements->createAction(
                [
                    'type'                => DeleteEventAction::class,
                    'confirmationMessage' => Calendar::t('Are you sure you want to delete the selected events?'),
                    'successMessage'      => Calendar::t('Events deleted.'),
                ]
            ),
        ];
    }

    /**
     * @inheritDoc
     */
    protected function tableAttributeHtml(string $attribute): string
    {
        switch ($attribute) {
            case 'author':
                $author = $this->getAuthor();

                if ($author) {
                    return \Craft::$app->view->render(
                        '_elements/element',
                        [
                            'element' => $author,
                        ]
                    );
                }

                return '';

            case 'calendar':
                return sprintf(
                    '<div style="white-space: nowrap;"><span class="color-indicator" style="background-color: %s;"></span>%s</div>',
                    $this->getCalendar()->color,
                    $this->getCalendar()->name
                );

            case 'allDay':
                return $this->allDay ? Calendar::t('Yes') : Calendar::t('No');

            case 'rrule':
                return $this->repeats() ? Calendar::t('Yes') : Calendar::t('No');

            case 'field:1':
                return parent::tableAttributeHtml($attribute);

            default:
                return parent::tableAttributeHtml($attribute);
        }
    }

    /**
     * @return array
     * @throws \craft\errors\SiteNotFoundException
     */
    public function getSupportedSites(): array
    {
        if (static::isLocalized()) {
            $siteSettings = $this->getCalendar()->getSiteSettings();

            $supportedSites = [];
            foreach ($siteSettings as $site) {
                $supportedSites[] = $site->siteId;
            }

            return $supportedSites;
        }

        return [\Craft::$app->getSites()->getPrimarySite()->id];
    }

    /**
     * Event constructor.
     *
     * @param array $config
     */
    public function __construct(array $config = [])
    {
        parent::__construct($config);

        $this->startDate = new Carbon($this->startDate, DateHelper::UTC);
        $this->endDate   = new Carbon($this->endDate, DateHelper::UTC);
        if (null !== $this->until) {
            $this->until = new Carbon($this->until, DateHelper::UTC);
        }
    }

    /**
     * @param \DateTime $date
     *
     * @return Event
     */
    public function cloneForDate(\DateTime $date): Event
    {
        $clone = clone $this;
        foreach ($this->getBehaviors() as $key => $value) {
            $clone->attachBehavior($key, $value);
        }

        if (null !== $date) {
            $startDate = $this->getStartDate()->copy();
            $endDate   = $this->getEndDate()->copy();

            $diffInSeconds = $startDate->diffInSeconds($endDate);

            $startDate->setDateTime(
                (int) $date->format('Y'),
                (int) $date->format('m'),
                (int) $date->format('d'),
                $startDate->hour,
                $startDate->minute,
                $startDate->second
            );
            $endDate = $startDate->copy();
            $endDate->addSeconds($diffInSeconds);

            $clone->startDate = $startDate;
            $clone->endDate   = $endDate;
        }

        return $clone;
    }

    /**
     * Returns whether the current user can edit the element.
     *
     * @return bool
     */
    public function isEditable(): bool
    {
        return CalendarPermissionHelper::canEditEvent($this);
    }

    /**
     * Returns the element's CP edit URL.
     *
     * @return string|false
     * @throws \yii\base\InvalidConfigException
     */
    public function getCpEditUrl()
    {
        if (!$this->isEditable()) {
            return false;
        }

        $siteHandle = static::isLocalized() ? '/' . $this->getSite()->handle : '';

        return UrlHelper::cpUrl('calendar/events/' . $this->id . $siteHandle);
    }

    /**
     * Returns the field layout used by this element.
     *
     * @return FieldLayout|null
     */
    public function getFieldLayout()
    {
        if ($this->calendarId) {
            return $this->getCalendar()->getFieldLayout();
        }

        return null;
    }

    /**
     * @return CalendarModel
     */
    public function getCalendar(): CalendarModel
    {
        return Calendar::getInstance()->calendars->getCalendarById($this->calendarId);
    }

    /**
     * @return User|null
     */
    public function getAuthor()
    {
        if ($this->authorId) {
            return \Craft::$app->users->getUserById($this->authorId);
        }

        return null;
    }

    /**
     * @return null|string
     */
    public function getUriFormat()
    {
        return $this->getCalendar()->getUriFormat($this->siteId);
    }

    /**
     * @return ExceptionModel[]
     */
    public function getExceptions(): array
    {
        if (null === $this->exceptions) {
            $this->exceptions = Calendar::getInstance()->exceptions->getExceptionsForEvent($this);
        }

        return $this->exceptions;
    }

    /**
     * @param ExceptionModel $exceptionModel
     *
     * @return $this
     */
    public function addException(ExceptionModel $exceptionModel): Event
    {
        $this->getExceptions();
        $this->exceptions[] = $exceptionModel;

        return $this;
    }

    /**
     * @return array
     */
    public function getExceptionDateStrings(): array
    {
        $exceptions = $this->getExceptions();

        $exceptionDates = [];
        foreach ($exceptions as $exception) {
            $exceptionDates[] = $exception->date->format('Y-m-d');
        }

        return $exceptionDates;
    }

    /**
     * @param \DateTime $rangeStart
     * @param \DateTime $rangeEnd
     *
     * @return SelectDateModel[]
     */
    public function getSelectDates(\DateTime $rangeStart = null, \DateTime $rangeEnd = null): array
    {
        if ($this->freq !== RecurrenceHelper::SELECT_DATES) {
            return [];
        }

        $cacheHash = md5(($rangeStart ? $rangeStart->getTimestamp() : 0) . ($rangeEnd ? $rangeEnd->getTimestamp() : 0));
        if (!isset($this->selectDatesCache[$cacheHash])) {
            $this->selectDatesCache[$cacheHash] = Calendar::getInstance()
                ->selectDates
                ->getSelectDatesForEvent($this, $rangeStart, $rangeEnd);
        }

        return $this->selectDatesCache[$cacheHash];
    }

    /**
     * @param \DateTime $rangeStart
     * @param \DateTime $rangeEnd
     *
     * @return \DateTime[]
     */
    public function getSelectDatesAsDates(\DateTime $rangeStart = null, \DateTime $rangeEnd = null): array
    {
        $models = $this->getSelectDates($rangeStart, $rangeEnd);

        $dates = [];
        foreach ($models as $model) {
            $dates[] = $model->date;
        }

        return $dates;
    }

    /**
     * @param string $format
     *
     * @return array
     */
    public function getSelectDatesAsString($format = 'Y-m-d'): array
    {
        $selectDates = $this->getSelectDates();

        $formattedDatesList = [];
        foreach ($selectDates as $selectDate) {
            $formattedDatesList[] = $selectDate->date->format($format);
        }

        return $formattedDatesList;
    }

    /**
     * @param SelectDateModel $selectDateModel
     *
     * @return $this
     */
    public function addSelectDate(SelectDateModel $selectDateModel): Event
    {
        $this->getSelectDates();
        $this->selectDatesCache[] = $selectDateModel;
        usort($this->selectDatesCache, function (SelectDateModel $a, SelectDateModel $b) {
            return $a->date <=> $b->date;
        });

        return $this;
    }

    /**
     * @return bool
     */
    public function isMultiDay(): bool
    {
        if (null === self::$overlapThreshold) {
            self::$overlapThreshold = Calendar::getInstance()->settings->getOverlapThreshold();
        }

        $startDate = $this->getStartDate();
        $endDate   = $this->getEndDate();

        if (!$startDate || !$endDate) {
            return false;
        }

        $diffInDays = DateHelper::carbonDiffInDays($startDate, $endDate);

        if ($diffInDays > 1) {
            return true;
        }

        $dateBeforeOverlap = DateHelper::isDateBeforeOverlap($this->getEndDate(), self::$overlapThreshold);

        return $diffInDays === 1 && !$dateBeforeOverlap;
    }

    /**
     * @return bool
     */
    public function isCurrentlyHappening(): bool
    {
        static $currentDate;
        if (null === $currentDate) {
            $local       = new Carbon('now', \Craft::$app->getTimeZone());
            $currentDate = new Carbon($local->format('Y-m-d H:i:s'), DateHelper::UTC);
        }

        return $this->isHappeningOn($currentDate);
    }

    /**
     * @param string|Carbon $date
     *
     * @return bool
     */
    public function isHappeningOn($date): bool
    {
        if (!$date instanceof Carbon) {
            $date = new Carbon($date, DateHelper::UTC);
        }

        return $date->between($this->getStartDate(), $this->getEndDate());
    }

    /**
     * @return bool
     */
    public function repeats(): bool
    {
        return null !== $this->freq;
    }

    /**
     * @return bool
     */
    public function repeatsOnSelectDates(): bool
    {
        return $this->repeats() && $this->freq === RecurrenceHelper::SELECT_DATES;
    }

    /**
     * @return string|null
     */
    public function getFrequency()
    {
        switch ($this->freq) {
            case RecurrenceHelper::DAILY:
            case RecurrenceHelper::WEEKLY:
            case RecurrenceHelper::MONTHLY:
            case RecurrenceHelper::YEARLY:
            case RecurrenceHelper::SELECT_DATES:
                return $this->freq;

            default:
                return null;
        }
    }

    /**
     * Returns an array of \DateTime objects for each recurrence
     *
     * @return array|\DateTime[]
     */
    public function getOccurrenceDates(): array
    {
        return $this->getOccurrenceDatesBetween();
    }

    /**
     * @param \DateTime|null $rangeStart
     * @param \DateTime|null $rangeEnd
     *
     * @return array|\DateTIme[]
     */
    public function getOccurrenceDatesBetween(\DateTime $rangeStart = null, \DateTime $rangeEnd = null): array
    {
        $occurrences = [];

        if ($this->repeats()) {
            if ($this->repeatsOnSelectDates()) {
                $startDate = $this->getStartDate();
                if ((!$rangeStart || $startDate >= $rangeStart) && (!$rangeEnd || $startDate <= $rangeEnd)) {
                    $occurrences[] = $startDate->setTime(0, 0, 0);
                }

                $occurrences = array_merge($occurrences, $this->getSelectDatesAsDates($rangeStart, $rangeEnd));
            } else {
                $rrule = $this->getRRuleObject();
                if (null !== $rrule) {
                    if ($this->isInfinite()) {
                        $rangeStart = $rangeStart ?: new Carbon('today', DateHelper::UTC);
                        $rangeEnd   = $rangeEnd ?: new Carbon('+6 months', DateHelper::UTC);
                    }

                    $occurrences = array_merge($occurrences, $rrule->getOccurrencesBetween($rangeStart, $rangeEnd));
                }
            }
        }

        DateHelper::sortArrayOfDates($occurrences);

        return $occurrences;
    }

    /**
     * @return Carbon
     */
    public function getStartDate(): Carbon
    {
        return $this->startDate;
    }

    /**
     * @return Carbon
     */
    public function getEndDate(): Carbon
    {
        return $this->endDate;
    }

    /**
     * @return Carbon|null
     */
    public function getUntil()
    {
        return $this->until;
    }

    /**
     * An alias for getUntil()
     *
     * @return Carbon|null
     */
    public function getUntilDate()
    {
        return $this->getUntil();
    }

    /**
     * Returns the repeats ON rule, which could be -1, 1, 2, 3 or 4
     * Or 0 if no rule is set
     *
     * @return int
     */
    public function getRepeatsOnRule(): int
    {
        $weekDays = $this->getRepeatsByWeekDays();
        if (
            !empty($weekDays)
            && \in_array($this->getFrequency(), [RecurrenceHelper::MONTHLY, RecurrenceHelper::YEARLY], true)
        ) {
            $firstSymbol = $weekDays[0][0];
            if ($firstSymbol === '-') {
                return -1;
            }

            if (is_numeric($firstSymbol)) {
                return (int) $firstSymbol;
            }
        }

        return 0;
    }

    /**
     * Gets an array of week day 2 letter abbreviations if such a rule has been specified
     *
     * @return array|null
     */
    public function getRepeatsByWeekDays()
    {
        return $this->getArrayFromRRuleString($this->byDay);
    }

    /**
     * Strips off any "first", "second", "third", "fourth", "last" rules present in ::$byDay variable
     * and returns just the week days
     * [-1SU,-1WE] becomes [SU,WE], etc.
     *
     * @return array|null
     */
    public function getRepeatsByWeekDaysAbsolute()
    {
        $weekDays = $this->getArrayFromRRuleString($this->byDay);

        if (!$weekDays) {
            return null;
        }

        return array_map(
            function ($value) {
                return preg_replace('/^-?\d/', '', $value);
            },
            $weekDays
        );
    }

    /**
     * Gets an array of month day numbers if such a rule has been specified
     *
     * @return array|null
     */
    public function getRepeatsByMonthDays()
    {
        return $this->getArrayFromRRuleString($this->byMonthDay);
    }

    /**
     * Gets an array of month numbers if such a rule has been specified
     *
     * @return array|null
     */
    public function getRepeatsByMonths()
    {
        return $this->getArrayFromRRuleString($this->byMonth);
    }

    /**
     * Returns the RFC compliant RRULE string
     * Or NULL if no rule present
     *
     * @return string|null
     */
    public function getRRuleRFCString()
    {
        $rruleObject = $this->getRRuleObject();
        if ($rruleObject instanceof RRule) {
            return $rruleObject->rfcString();
        }

        return null;
    }

    /**
     * @return null|string
     */
    public function getHumanReadableRepeatsString()
    {
        if (!$this->repeats()) {
            return null;
        }

        $locale = \Craft::$app->getLocale();
        $format = \Craft::$app->locale->getDateFormat('medium', 'php');

        if ($this->repeatsOnSelectDates()) {
            return implode(', ', $this->getSelectDatesAsString($format));
        }

        $rruleObject = $this->getRRuleObject();

        $locale = $locale->id;
        $locale = preg_replace("/^(\w+)_.*$/", '$1', $locale);

        if ($rruleObject) {
            $string = $rruleObject->humanReadable(
                [
                    'locale'         => $locale,
                    'date_formatter' => function (\DateTime $date) use ($format) {
                        return $date->format($format);
                    },
                ]
            );

            return ucfirst($string);
        }

        return null;
    }

    /**
     * @return string
     */
    public function getUntilType(): string
    {
        if ($this->count) {
            return self::UNTIL_TYPE_COUNT;
        }

        if ($this->until) {
            return self::UNTIL_TYPE_UNTIL;
        }

        return self::UNTIL_TYPE_FOREVER;
    }

    /**
     * @return bool
     */
    public function isInfinite(): bool
    {
        return $this->getUntilType() === self::UNTIL_TYPE_FOREVER;
    }

    /**
     * @return bool
     */
    public function isFinite(): bool
    {
        return !$this->isInfinite();
    }

    /**
     * @return \DateTime
     */
    public function getDateCreated(): \DateTime
    {
        return $this->dateCreated;
    }

    /**
     * @return \DateTime
     */
    public function getPostDate(): \DateTime
    {
        return $this->getDateCreated();
    }

    /**
     * @return EventDuration
     */
    public function getDuration(): EventDuration
    {
        $startDate = $this->getStartDate();
        $endDate   = $this->getEndDate();

        if ($this->isAllDay()) {
            $endDate = $endDate->copy()->addSecond();
        }

        return new EventDuration($startDate->diff($endDate));
    }

    /**
     * @return boolean
     */
    public function isAllDay(): bool
    {
        return (bool) $this->allDay;
    }

    /**
     * @return bool
     */
    public function isRepeating(): bool
    {
        return $this->repeats();
    }

    /**
     * @return int
     */
    public function getInterval(): int
    {
        return $this->interval;
    }

    /**
     * @return string
     */
    public function getFreq(): string
    {
        return $this->freq;
    }

    /**
     * @return int
     */
    public function getCount(): int
    {
        return $this->count;
    }

    /**
     * @return string
     */
    public function getRRule(): string
    {
        return $this->rrule;
    }

    /**
     * @return string|null
     */
    public function getReadableRepeatRule()
    {
        return $this->getHumanReadableRepeatsString();
    }

    /**
     * @param array|null $config
     *
     * @return Event[]
     * @throws \ReflectionException
     * @throws \Solspace\Commons\Exceptions\Configurations\ConfigurationException
     */
    public function getOccurrences(array $config = null): array
    {
        $occurrencesConfig = new Occurrences($config);
        $configHash        = $occurrencesConfig->getConfigHash();

        if (!isset($this->occurrenceCache[$configHash])) {
            $occurrenceDates = [];

            $rangeStart = $occurrencesConfig->getRangeStart();
            if (null === $rangeStart) {
                $rangeStart = $this->isInfinite() ? new \DateTime('today') : $this->getStartDate();
            }

            $rangeEnd = $occurrencesConfig->getRangeEnd();
            if (null === $rangeEnd) {
                $rangeEnd = $this->isInfinite() ? new \DateTime('+6 months') : $this->getUntil();
            }

            if ($this->getRRuleObject()) {
                $occurrenceDates = $this->getOccurrenceDatesBetween($rangeStart, $rangeEnd);
            } else if ($this->getSelectDates()) {
                $occurrenceDates = $this->getSelectDatesAsDates();
            }

            $occurrences = [];
            $exceptions  = $this->getExceptionDateStrings();
            $count       = 0;
            foreach ($occurrenceDates as $date) {
                if (\in_array($date->format('Y-m-d'), $exceptions, true)) {
                    continue;
                }

                if ($occurrencesConfig->getLimit() && ++$count > $occurrencesConfig->getLimit()) {
                    break;
                }

                $occurrences[] = $this->cloneForDate($date);
            }

            $this->occurrenceCache[$configHash] = $occurrences;
        }

        return $this->occurrenceCache[$configHash];
    }

    /**
     * @return int
     */
    public function getOccurrenceCount(): int
    {
        return \count($this->getOccurrences());
    }

    /**
     * Compare this event to another event's MultiDay property
     * Returns: -1    if this is multi-day and the other isn't
     *          1     if this is not multi-day, but the other is
     *          true  if both are multi-day
     *          false if both aren't multi-day
     *
     * @param Event $event
     *
     * @return int|bool
     */
    public function compareMultiDay(Event $event)
    {
        if ($this->isMultiDay() && !$event->isMultiDay()) {
            return -1;
        }

        if (!$this->isMultiDay() && $event->isMultiDay()) {
            return 1;
        }

        return $this->isMultiDay() && $event->isMultiDay();
    }

    /**
     * Compare this event to another event's MultiDay property
     * Returns: -1    if this is all-day and the other isn't
     *          1     if this is not all-day, but the other is
     *          true  if both are all-day
     *          false if both aren't all-day
     *
     * @param Event $event
     *
     * @return int|bool
     */
    public function compareAllDay(Event $event)
    {
        if ($this->isAllDay() && !$event->isAllDay()) {
            return -1;
        }

        if (!$this->isAllDay() && $event->isAllDay()) {
            return 1;
        }

        return $this->isAllDay() && $event->isAllDay();
    }

    /**
     * @param Event $event
     *
     * @return int
     */
    public function compareStartDates(Event $event): int
    {
        return DateHelper::compareCarbons($this->getStartDate(), $event->getStartDate());
    }

    /**
     * @param Event $event
     *
     * @return int
     */
    public function compareEndDates(Event $event): int
    {
        return DateHelper::compareCarbons($this->getEndDate(), $event->getEndDate());
    }

    /**
     * Get the diff in days between two events
     *
     * @param Event $event
     *
     * @return int
     */
    public function diffInDays(Event $event): int
    {
        return DateHelper::carbonDiffInDays($this->getStartDate(), $event->getStartDate());
    }

    /**
     * @param bool $isNew
     */
    public function afterSave(bool $isNew)
    {
        $insertData = [
            'calendarId' => $this->calendarId,
            'authorId'   => $this->authorId,
            'startDate'  => $this->startDate->toDateTimeString(),
            'endDate'    => $this->endDate->toDateTimeString(),
            'allDay'     => (bool) $this->allDay,
            'rrule'      => $this->rrule,
            'freq'       => $this->freq,
            'interval'   => $this->interval,
            'count'      => $this->count,
            'until'      => $this->until ? $this->until->toDateTimeString() : null,
            'byMonth'    => $this->byMonth,
            'byYearDay'  => $this->byYearDay,
            'byMonthDay' => $this->byMonthDay,
            'byDay'      => $this->byDay,
        ];

        if ($isNew) {
            $insertData['id'] = $this->id;

            \Craft::$app->db
                ->createCommand()
                ->insert(self::TABLE, $insertData)
                ->execute();
        } else {
            \Craft::$app->db
                ->createCommand()
                ->update(self::TABLE, $insertData, ['id' => $this->id])
                ->execute();
        }

        parent::afterSave($isNew);
    }

    /**
     * @return array
     */
    public function jsonSerialize(): array
    {
        $object = [
            'id'                 => (int) $this->id,
            'url'                => $this->getUrl(),
            'title'              => $this->title,
            'slug'               => $this->slug,
            'start'              => $this->startDate->toAtomString(),
            'end'                => $this->endDate->toAtomString(),
            'allDay'             => $this->isAllDay(),
            'multiDay'           => $this->isMultiDay(),
            'repeats'            => $this->isRepeating(),
            'readableRepeatRule' => $this->getReadableRepeatRule(),
            'calendar'           => $this->getCalendar(),
            'site'               => [
                'id'       => $this->getSite()->id,
                'name'     => $this->getSite()->name,
                'handle'   => $this->getSite()->handle,
                'language' => $this->getSite()->language,
            ],
            'editable'           => $this->isEditable(),
            'enabled'            => (bool) $this->enabled,
            'backgroundColor'    => $this->getCalendar()->color,
            'borderColor'        => $this->getCalendar()->getDarkerColor(),
            'textColor'          => $this->getCalendar()->getContrastColor(),
        ];

        return array_merge($object, $this->getFieldValues());
    }

    public function rules()
    {
        $rules   = parent::rules();
        $rules[] = [
            ['startDate'],
            'validateDates',
        ];

        return $rules;
    }

    public function validateDates()
    {
        if (!$this->startDate) {
            $this->addError('startDate', Calendar::t('Start Date is required'));
        }

        if (!$this->endDate) {
            $this->addError('endDate', Calendar::t('End Date is required'));
        }

        if ($this->startDate >= $this->endDate) {
            $this->addError('startDate', Calendar::t('Start Date must be before End Date'));
        }
    }

    /**
     * @inheritdoc
     */
    protected function route()
    {
        if (!$this->enabled) {
            return null;
        }

        // Make sure the section is set to have URLs for this site
        $siteId = \Craft::$app->getSites()->getCurrentSite()->id;
        $siteSettings = $this->getCalendar()->getSiteSettingsForSite($siteId);

        if (!isset($siteSettings) || !$siteSettings->hasUrls) {
            return null;
        }

        return [
            'templates/render', [
                'template' => $siteSettings->template,
                'variables' => [
                    'event' => $this,
                ]
            ]
        ];
    }

    /**
     * Parses rules like "TU,WE,FR" and returns an array of [TU, WE, FR]
     * Returns NULL if the rule string is empty
     *
     * @param string $data
     *
     * @return array|null
     */
    private function getArrayFromRRuleString($data)
    {
        if (!$data) {
            return null;
        }

        return explode(',', $data);
    }

    /**
     * $countLimit is used for infinite recurrence rules when getting occurrences
     *
     * @return RRule|null
     */
    private function getRRuleObject()
    {
        if (!$this->getFrequency() || $this->repeatsOnSelectDates()) {
            return null;
        }

        return new RRule(
            [
                'FREQ'       => $this->getFrequency(),
                'INTERVAL'   => $this->interval,
                'DTSTART'    => $this->getStartDate(),
                'UNTIL'      => $this->getUntil(),
                'COUNT'      => $this->count,
                'BYDAY'      => $this->byDay,
                'BYMONTHDAY' => $this->byMonthDay,
                'BYMONTH'    => $this->byMonth,
                'BYYEARDAY'  => $this->byYearDay,
            ]
        );
    }
}
