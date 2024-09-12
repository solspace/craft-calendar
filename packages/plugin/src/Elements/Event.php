<?php

namespace Solspace\Calendar\Elements;

use Carbon\Carbon;
use craft\base\Element;
use craft\base\Field;
use craft\db\Query;
use craft\elements\actions\Edit;
use craft\elements\actions\Restore;
use craft\elements\conditions\ElementConditionInterface;
use craft\elements\db\ElementQuery;
use craft\elements\db\ElementQueryInterface;
use craft\elements\User;
use craft\errors\SiteNotFoundException;
use craft\events\RegisterElementActionsEvent;
use craft\fieldlayoutelements\TitleField;
use craft\helpers\Cp;
use craft\helpers\ElementHelper;
use craft\helpers\UrlHelper;
use craft\i18n\Locale;
use craft\models\FieldLayout;
use craft\models\FieldLayoutTab;
use craft\web\UploadedFile;
use Illuminate\Support\Collection;
use RRule\RRule;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Actions\DeleteEventAction;
use Solspace\Calendar\Elements\Actions\SetStatusAction;
use Solspace\Calendar\Elements\conditions\EventCondition;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Events\JsonValueTransformerEvent;
use Solspace\Calendar\Library\Configurations\Occurrences;
use Solspace\Calendar\Library\Duration\EventDuration;
use Solspace\Calendar\Library\Exceptions\CalendarException;
use Solspace\Calendar\Library\Exceptions\ConfigurationException;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Library\Helpers\RecurrenceHelper;
use Solspace\Calendar\Library\Transformers\EventToUiDataTransformer;
use Solspace\Calendar\Library\Transformers\UiDataToEventTransformer;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\ExceptionModel;
use Solspace\Calendar\Models\SelectDateModel;
use Solspace\Calendar\Records\ExceptionRecord;
use Solspace\Calendar\Records\SelectDateRecord;
use Solspace\Calendar\Resources\Bundles\EventEditBundle;
use Symfony\Component\PropertyAccess\PropertyAccessor;
use yii\base\Event as BaseEvent;
use yii\base\Exception;
use yii\base\InvalidConfigException;

class Event extends Element implements \JsonSerializable
{
    public const TABLE = '{{%calendar_events}}';
    public const TABLE_STD = 'calendar_events';

    public const UNTIL_TYPE_FOREVER = 'forever';
    public const UNTIL_TYPE_UNTIL = 'until';
    public const UNTIL_TYPE_AFTER = 'after';

    public const SPAN_LIMIT_DAYS = 365;

    public const EVENT_TRANSFORM_JSON_VALUE = 'transform-json-value';

    public null|Carbon|\DateTime|string $postDate = null;

    public ?int $calendarId = null;

    public ?string $name = null;

    public null|array|int|string $authorId = null;

    public null|Carbon|\DateTime|string $startDate = null;

    public null|Carbon|\DateTime|string $initialStartDate = null;

    public null|Carbon|\DateTime|string $startDateLocalized = null;

    public null|Carbon|\DateTime|string $endDate = null;

    public null|Carbon|\DateTime|string $initialEndDate = null;

    public null|Carbon|\DateTime|string $endDateLocalized = null;

    public ?bool $allDay = null;

    public ?string $rrule = null;

    public ?string $freq = null;

    public ?int $interval = null;

    public ?int $count = null;

    public null|Carbon|\DateTime|string $until = null;

    public null|Carbon|\DateTime|string $untilLocalized = null;

    public ?string $byMonth = null;

    public ?string $byYearDay = null;

    public ?string $byMonthDay = null;

    public ?string $byDay = null;

    public ?int $sortOrder = null;

    public ?int $score = null;

    public ?string $username = null;

    private static ?int $overlapThreshold = null;

    /** @var ExceptionModel[] */
    private ?array $exceptions = null;

    /** @var SelectDateModel[] */
    private ?array $selectDates = null;

    /** @var SelectDateModel[] */
    private ?array $selectDatesCache = null;

    /** @var Event[] */
    private array $occurrenceCache = [];

    private ?string $_fieldParamNamePrefix = null;

    /**
     * Event constructor.
     */
    public function __construct(array $config = [])
    {
        parent::__construct($config);

        $startDate = $this->startDate;
        if ($startDate instanceof \DateTime) {
            $startDate = $startDate->format('Y-m-d H:i:s');
        }

        $endDate = $this->endDate;
        if ($endDate instanceof \DateTime) {
            $endDate = $endDate->format('Y-m-d H:i:s');
        }

        $this->startDateLocalized = new Carbon($startDate ?? 'now');
        $this->startDate = new Carbon($startDate ?? 'now', DateHelper::UTC);
        $this->initialStartDate = $this->startDate->copy();
        $this->endDateLocalized = new Carbon($endDate ?? 'now');
        $this->endDate = new Carbon($endDate ?? 'now', DateHelper::UTC);
        $this->initialEndDate = $this->endDate->copy();
        $this->postDate = $this->postDate ? new Carbon($this->postDate) : null;
        if (null !== $this->until) {
            $until = $this->until;
            if ($until instanceof \DateTime) {
                $until = $until->format('Y-m-d H:i:s');
            }

            $this->untilLocalized = new Carbon($until);
            $this->until = new Carbon($until, DateHelper::UTC);
        }
    }

    public static function tableName(): string
    {
        return self::TABLE;
    }

    public function setEvent_builder_data($builderJson): void
    {
        $eventBuilderData = json_decode($builderJson, true);

        $transformer = new UiDataToEventTransformer($this, $eventBuilderData);
        $transformer->transform();
    }

    public static function displayName(): string
    {
        return \Craft::t('app', 'Event');
    }

    public static function lowerDisplayName(): string
    {
        return \Craft::t('app', 'event');
    }

    public static function pluralDisplayName(): string
    {
        return \Craft::t('app', 'Events');
    }

    public static function pluralLowerDisplayName(): string
    {
        return \Craft::t('app', 'events');
    }

    public static function refHandle(): string
    {
        return 'event';
    }

    public static function trackChanges(): bool
    {
        return false;
    }

    public function getIsTitleTranslatable(): bool
    {
        return Field::TRANSLATION_METHOD_NONE !== $this->getCalendar()->titleTranslationMethod;
    }

    public function getTitleTranslationDescription(): ?string
    {
        return ElementHelper::translationDescription(
            $this->getCalendar()->titleTranslationMethod
        );
    }

    public function getTitleTranslationKey(): string
    {
        $calendar = $this->getCalendar();

        return ElementHelper::translationKey(
            $this,
            $calendar->titleTranslationMethod,
            $calendar->titleTranslationKeyFormat
        );
    }

    /**
     * Updates the entry's title, if its entry type has a dynamic title format.
     */
    public function updateTitle(): void
    {
        $calendar = $this->getCalendar();

        if (!$calendar->hasTitleField) {
            // Make sure that the locale has been loaded in case the title format has any Date/Time fields
            \Craft::$app->getLocale();

            // Set Craft to the entry's site's language, in case the title format has any static translations
            $language = \Craft::$app->language;

            \Craft::$app->language = $this->getSite()->language;

            $title = \Craft::$app->getView()->renderObjectTemplate($calendar->titleFormat, $this);

            if ('' !== $title) {
                $this->title = $title;
            }

            \Craft::$app->language = $language;
        }
    }

    /**
     * @return ElementQueryInterface|EventQuery
     */
    public static function find(): ElementQueryInterface
    {
        return new EventQuery(self::class);
    }

    public static function createCondition(): ElementConditionInterface
    {
        return \Craft::createObject(EventCondition::class, [static::class]);
    }

    public static function typeHandle(): string
    {
        return 'event';
    }

    public static function hasTitles(): bool
    {
        return true;
    }

    public static function hasContent(): bool
    {
        return version_compare(\Craft::$app->getVersion(), '5.0.0', '<');
    }

    public static function isLocalized(): bool
    {
        return true;
    }

    public static function hasUris(): bool
    {
        return true;
    }

    public static function hasStatuses(): bool
    {
        return true;
    }

    public static function statuses(): array
    {
        return [
            self::STATUS_ENABLED => \Craft::t('app', 'Enabled'),
            self::STATUS_DISABLED => \Craft::t('app', 'Disabled'),
        ];
    }

    public static function buildQuery(?array $config = null): ElementQueryInterface
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
        $query->siteId ??= \Craft::$app->sites->currentSite->id;

        return $query;
    }

    public static function create(?int $siteId = null, ?int $calendarId = null): self
    {
        $settings = Calendar::getInstance()->settings;

        $date = new \DateTime();
        $date = new Carbon($date->format('Y-m-d H:i:s'), DateHelper::UTC);
        $date->setTime($date->hour, 0, 0);

        $element = new self();
        $element->postDate = new Carbon();
        $element->allDay = $settings->isAllDayDefault();
        $element->authorId = \Craft::$app->user->getId();
        $element->enabled = true;
        $element->startDate = $date;
        $element->endDate = $element->startDate->copy()->addMinutes($settings->getEventDuration());
        $element->calendarId = $calendarId ?? Calendar::getInstance()->calendars->getFirstCalendarId();

        if ($siteId) {
            $element->siteId = $siteId;

            $siteSettings = $element->getCalendar()->getSiteSettingsForSite($siteId);
            if ($siteSettings) {
                $element->enabledForSite = $siteSettings->enabledByDefault;
            }
        }

        return $element;
    }

    /**
     * @throws SiteNotFoundException
     */
    public function getSupportedSites(): array
    {
        if (static::isLocalized()) {
            $siteSettings = $this->getCalendar()->getSiteSettings();

            $supportedSites = [];
            foreach ($siteSettings as $site) {
                $supportedSites[] = [
                    'siteId' => $site->siteId,
                    'enabledByDefault' => $site->enabledByDefault,
                ];
            }

            return $supportedSites;
        }

        return [\Craft::$app->getSites()->getPrimarySite()->id];
    }

    public function cloneForDate(\DateTime $date): self
    {
        $clone = clone $this;
        foreach ($this->getBehaviors() as $key => $value) {
            $clone->attachBehavior($key, $value);
        }

        if (null !== $date) {
            if (!$this->happensOn($date)) {
                throw new CalendarException('Invalid event date');
            }

            $startDate = $this->getStartDate()->copy();
            $endDate = $this->getEndDate()->copy();

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
            $clone->endDate = $endDate;
            $clone->startDateLocalized = new Carbon($startDate->toDateTimeString());
            $clone->endDateLocalized = new Carbon($endDate->toDateTimeString());
        }

        return $clone;
    }

    /**
     * Returns whether the current user can edit the element.
     */
    public function isEditable(): bool
    {
        return PermissionHelper::canEditEvent($this);
    }

    public function can(string $permission): bool
    {
        $currentUser = \Craft::$app->getUser()->getIdentity();
        if ($currentUser->admin) {
            return true;
        }

        if (!isset($this->id)) {
            return false;
        }

        return \Craft::$app->getUserPermissions()->doesUserHavePermission($currentUser->id, $permission);
    }

    public function canView(User $user): bool
    {
        return true;
    }

    public static function gqlTypeNameByContext(mixed $context): string
    {
        if ($context instanceof CalendarModel) {
            return $context->handle.'_Event';
        }

        return parent::gqlTypeNameByContext($context);
    }

    public function getGqlTypeName(): string
    {
        return static::gqlTypeNameByContext($this->getCalendar());
    }

    /**
     * Returns the element's CP edit URL.
     *
     * @throws InvalidConfigException
     */
    public function getCpEditUrl(): ?string
    {
        if (!$this->isEditable()) {
            return null;
        }

        $siteHandle = $this->getSite()->handle;

        return UrlHelper::cpUrl('calendar/events/'.$this->id.'/'.$siteHandle);
    }

    /**
     * Returns the field layout used by this element.
     */
    public function getFieldLayout(): ?FieldLayout
    {
        if (!$this->calendarId) {
            return null;
        }

        $fieldLayout = $this->getCalendar()->getFieldLayout();
        if (!$fieldLayout) {
            $fieldLayout = new FieldLayout();
        }

        if ($this->getCalendar()->hasTitleField) {
            $tabs = $fieldLayout->getTabs();

            if (empty($tabs)) {
                $tab = new FieldLayoutTab();
                $tab->name = 'Content';
                $tab->setLayout($fieldLayout);

                $fieldLayout->setTabs([$tab]);

                $tabs = $fieldLayout->getTabs();
            }

            $hasTitle = !empty(
                array_filter(
                    $tabs,
                    function (FieldLayoutTab $tab) {
                        foreach ($tab->getElements() as $element) {
                            if ($element instanceof TitleField) {
                                return true;
                            }
                        }

                        return false;
                    }
                )
            );

            if (!$hasTitle) {
                $firstTab = reset($tabs);
                if ($firstTab) {
                    $titleLabel = $this->getCalendar()->titleLabel;

                    $firstTab->setElements(
                        array_merge([
                            new TitleField([
                                'label' => $titleLabel,
                                'title' => $titleLabel,
                                'name' => 'title',
                            ]),
                        ], $firstTab->getElements())
                    );
                }
            }
        }

        return $fieldLayout;
    }

    public function getCalendar(): CalendarModel
    {
        return Calendar::getInstance()->calendars->getCalendarById($this->calendarId);
    }

    public function getAuthorId(): ?int
    {
        return $this->authorId;
    }

    public function getAuthor(): ?User
    {
        if ($this->authorId) {
            return \Craft::$app->users->getUserById($this->authorId);
        }

        return null;
    }

    public function getUriFormat(): ?string
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
     * @return ExceptionModel[]
     */
    public function getExceptionsLocalized(): array
    {
        $exceptionsLocalized = $this->getExceptions();
        foreach ($exceptionsLocalized as $exceptionLocalized) {
            $exceptionLocalized->date = new Carbon($exceptionLocalized->date->toDateTimeString());
        }

        return $exceptionsLocalized;
    }

    public function setExceptions(array $exceptions): self
    {
        $this->exceptions = [];

        foreach ($exceptions as $date) {
            if ($date instanceof ExceptionModel) {
                $this->exceptions[] = $date;
            } elseif ($date instanceof \DateTime) {
                $model = new ExceptionModel();
                $model->date = Carbon::createFromTimestampUTC($date->getTimestamp());
                $model->eventId = $this->id;

                $this->exceptions[] = $model;
            } elseif (\is_string($date)) {
                $model = new ExceptionModel();
                $model->date = Carbon::createFromDate($date);
                $model->eventId = $this->id;

                $this->exceptions[] = $model;
            }
        }

        return $this;
    }

    /**
     * @return $this
     */
    public function addException(ExceptionModel $exceptionModel): self
    {
        $this->getExceptions();
        $this->exceptions[] = $exceptionModel;

        return $this;
    }

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
     * @return SelectDateModel[]
     */
    public function getSelectDates(?\DateTime $rangeStart = null, ?\DateTime $rangeEnd = null): array
    {
        if (RecurrenceHelper::SELECT_DATES !== $this->freq || !$this->id) {
            return [];
        }

        if (null === $this->selectDates) {
            $this->hydrateSelectDates();
        }

        $cacheHash = md5(($rangeStart ? $rangeStart->getTimestamp() : 0).($rangeEnd ? $rangeEnd->getTimestamp() : 0));
        if (!isset($this->selectDatesCache[$cacheHash])) {
            $this->selectDatesCache[$cacheHash] = array_filter(
                $this->selectDates,
                function (SelectDateModel $selectDate) use ($rangeStart, $rangeEnd) {
                    $isAfterRangeStart = null === $rangeStart || $selectDate->date >= $rangeStart;
                    $isBeforeRangeEnd = null === $rangeEnd || $selectDate->date <= $rangeEnd;

                    return $isAfterRangeStart && $isBeforeRangeEnd;
                }
            );
        }

        return $this->selectDatesCache[$cacheHash];
    }

    public function setSelectDates(array $selectDates = []): self
    {
        $this->selectDates = [];
        $this->selectDatesCache = [];

        foreach ($selectDates as $date) {
            if ($date instanceof SelectDateModel) {
                $this->selectDates[] = $date;
            } elseif ($date instanceof \DateTime) {
                $model = new SelectDateModel();
                $model->date = Carbon::createFromTimestampUTC($date->getTimestamp());
                $model->eventId = $this->id;

                $this->selectDates[] = $model;
            } elseif (\is_string($date)) {
                $model = new SelectDateModel();
                $model->date = Carbon::createFromDate($date);
                $model->eventId = $this->id;

                $this->selectDates[] = $model;
            }
        }

        return $this;
    }

    /**
     * @return \DateTime[]
     */
    public function getSelectDatesAsDates(?\DateTime $rangeStart = null, ?\DateTime $rangeEnd = null): array
    {
        $models = $this->getSelectDates($rangeStart, $rangeEnd);

        $dates = [];
        foreach ($models as $model) {
            $dates[] = $model->date;
        }

        return $dates;
    }

    public function getSelectDatesAsDatesLocalized(?\DateTime $rangeStart = null, ?\DateTime $rangeEnd = null): array
    {
        $models = $this->getSelectDates($rangeStart, $rangeEnd);

        $dates = [];
        foreach ($models as $model) {
            $dates[] = new Carbon($model->date->toDateTimeString());
        }

        return $dates;
    }

    public function getSelectDatesAsString(string $format = 'Y-m-d'): array
    {
        $selectDates = $this->getSelectDates();

        $formattedDatesList = [];
        foreach ($selectDates as $selectDate) {
            $formattedDatesList[] = $selectDate->date->format($format);
        }

        return $formattedDatesList;
    }

    /**
     * @return $this
     */
    public function addSelectDate(SelectDateModel $selectDateModel): self
    {
        $this->getSelectDates();
        $this->selectDates[] = $selectDateModel;
        $this->selectDatesCache = [];

        return $this;
    }

    public function isMultiDay(): bool
    {
        if (null === self::$overlapThreshold) {
            self::$overlapThreshold = Calendar::getInstance()->settings->getOverlapThreshold();
        }

        $startDate = $this->getStartDate();
        $endDate = $this->getEndDate();

        if (!$startDate || !$endDate) {
            return false;
        }

        $diffInDays = DateHelper::carbonDiffInDays($startDate, $endDate);

        if ($diffInDays > 1) {
            return true;
        }

        $dateBeforeOverlap = DateHelper::isDateBeforeOverlap($this->getEndDate(), self::$overlapThreshold);

        return 1 === $diffInDays && !$dateBeforeOverlap;
    }

    public function isCurrentlyHappening(): bool
    {
        static $currentDate;
        if (null === $currentDate) {
            $local = new Carbon('now', \Craft::$app->getTimeZone());
            $currentDate = new Carbon($local->format('Y-m-d H:i:s'), DateHelper::UTC);
        }

        return $this->isHappeningOn($currentDate);
    }

    public function isHappeningOn(Carbon|string $date): bool
    {
        if (!$date instanceof Carbon) {
            $date = new Carbon($date, DateHelper::UTC);
        }

        return $date->between($this->getStartDate(), $this->getEndDate());
    }

    public function repeats(): bool
    {
        return null !== $this->freq;
    }

    public function repeatsOnSelectDates(): bool
    {
        return $this->repeats() && RecurrenceHelper::SELECT_DATES === $this->freq;
    }

    public function getFrequency(): ?string
    {
        return match ($this->freq) {
            RecurrenceHelper::DAILY, RecurrenceHelper::WEEKLY, RecurrenceHelper::MONTHLY, RecurrenceHelper::YEARLY, RecurrenceHelper::SELECT_DATES => $this->freq,
            default => null,
        };
    }

    /**
     * Returns an array of \DateTime objects for each recurrence.
     *
     * @return array|\DateTime[]
     */
    public function getOccurrenceDates(): array
    {
        return $this->getOccurrenceDatesBetween();
    }

    /**
     * @return array|\DateTime[]
     */
    public function getOccurrenceDatesBetween(?\DateTime $rangeStart = null, ?\DateTime $rangeEnd = null): array
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
                        $rangeEnd = $rangeEnd ?: new Carbon('+6 months', DateHelper::UTC);
                    }

                    $occurrences = array_merge($occurrences, $rrule->getOccurrencesBetween($rangeStart, $rangeEnd));
                }
            }
        }

        DateHelper::sortArrayOfDates($occurrences);

        return $occurrences;
    }

    /**
     * @throws \Exception
     */
    public function happensOn(\DateTime $date): bool
    {
        if (!$date instanceof Carbon) {
            $date = new Carbon($date->format('Y-m-d'), DateHelper::UTC);
        }
        $date->setTime(0, 0, 0);

        if ($date->toDateString() === $this->getStartDate()->toDateString()) {
            return true;
        }

        if ($this->repeatsOnSelectDates()) {
            $dates = $this->getSelectDatesAsString();

            return \in_array($date->toDateString(), $dates, true);
        }

        $rrule = $this->getRRuleObject();
        if (null === $rrule) {
            return false;
        }

        return $rrule->occursAt($date);
    }

    public function getStartDate(): null|Carbon|\DateTime|string
    {
        return $this->startDate;
    }

    public function getStartDateLocalized(): null|Carbon|\DateTime|string
    {
        return $this->startDateLocalized;
    }

    public function getEndDate(): null|Carbon|\DateTime|string
    {
        return $this->endDate;
    }

    public function getEndDateLocalized(): null|Carbon|\DateTime|string
    {
        return $this->endDateLocalized;
    }

    public function getUntil(): null|Carbon|\DateTime|string
    {
        return $this->until;
    }

    public function getUntilLocalized(): null|Carbon|\DateTime|string
    {
        return $this->untilLocalized;
    }

    /**
     * An alias for getUntil().
     */
    public function getUntilDate(): null|Carbon|\DateTime|string
    {
        return $this->getUntil();
    }

    /**
     * Returns the repeats ON rule, which could be -1, 1, 2, 3 or 4
     * Or 0 if no rule is set.
     */
    public function getRepeatsOnRule(): int
    {
        $weekDays = $this->getRepeatsByWeekDays();
        if (
            !empty($weekDays)
            && \in_array(
                $this->getFrequency(),
                [RecurrenceHelper::MONTHLY, RecurrenceHelper::YEARLY],
                true
            )
        ) {
            $firstSymbol = $weekDays[0][0];
            if ('-' === $firstSymbol) {
                return -1;
            }

            if (is_numeric($firstSymbol)) {
                return (int) $firstSymbol;
            }
        }

        return 0;
    }

    /**
     * Gets an array of week day 2 letter abbreviations if such a rule has been specified.
     */
    public function getRepeatsByWeekDays(): ?array
    {
        return $this->getArrayFromRRuleString($this->byDay);
    }

    /**
     * Strips off any "first", "second", "third", "fourth", "last" rules present in ::$byDay variable
     * and returns just the week days
     * [-1SU,-1WE] becomes [SU,WE], etc.
     */
    public function getRepeatsByWeekDaysAbsolute(): ?array
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
     * Gets an array of month day numbers if such a rule has been specified.
     */
    public function getRepeatsByMonthDays(): ?array
    {
        return $this->getArrayFromRRuleString($this->byMonthDay);
    }

    /**
     * Gets an array of month numbers if such a rule has been specified.
     */
    public function getRepeatsByMonths(): ?array
    {
        return $this->getArrayFromRRuleString($this->byMonth);
    }

    /**
     * Returns the RFC compliant RRULE string
     * Or NULL if no rule present.
     */
    public function getRRuleRFCString(): ?string
    {
        $rruleObject = $this->getRRuleObject();
        if ($rruleObject instanceof RRule) {
            return $rruleObject->rfcString();
        }

        return null;
    }

    public function getHumanReadableRepeatsString(): ?string
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
        $locale = preg_replace('/^(\\w+)_.*$/', '$1', $locale);

        if ($rruleObject) {
            $string = $rruleObject->humanReadable([
                'locale' => $locale,
                'date_formatter' => function (\DateTime $date) use ($format) {
                    return $date->format($format);
                },
            ]);

            return ucfirst($string);
        }

        return null;
    }

    public function getUntilType(): string
    {
        if ($this->count) {
            return self::UNTIL_TYPE_AFTER;
        }

        if ($this->until) {
            return self::UNTIL_TYPE_UNTIL;
        }

        return self::UNTIL_TYPE_FOREVER;
    }

    public function isInfinite(): bool
    {
        return self::UNTIL_TYPE_FOREVER === $this->getUntilType();
    }

    public function isFinite(): bool
    {
        return !$this->isInfinite();
    }

    public function getDateCreated(): null|Carbon|\DateTime|string
    {
        return $this->dateCreated;
    }

    public function getPostDate(): null|Carbon|\DateTime|string
    {
        return $this->postDate;
    }

    public function getDuration(): EventDuration
    {
        $startDate = $this->getStartDate();
        $endDate = $this->getEndDate();

        if ($this->isAllDay()) {
            $endDate = $endDate->copy()->addSecond();
        }

        return new EventDuration($startDate->diff($endDate));
    }

    public function isAllDay(): bool
    {
        return (bool) $this->allDay;
    }

    public function isRepeating(): bool
    {
        return Calendar::getInstance()->isPro() && $this->repeats();
    }

    public function getInterval(): ?int
    {
        return $this->interval;
    }

    public function getFreq(): ?string
    {
        return $this->freq;
    }

    public function getCount(): ?int
    {
        return $this->count;
    }

    public function getRRule(): ?string
    {
        return $this->rrule;
    }

    public function getReadableRepeatRule(): ?string
    {
        return $this->getHumanReadableRepeatsString();
    }

    public function getSimplifiedRepeatRule(): ?string
    {
        if (!$this->repeats()) {
            return null;
        }

        return match ($this->getFrequency()) {
            RecurrenceHelper::YEARLY => Calendar::t('Yearly'),
            RecurrenceHelper::MONTHLY => Calendar::t('Monthly'),
            RecurrenceHelper::WEEKLY => Calendar::t('Weekly'),
            RecurrenceHelper::DAILY => Calendar::t('Daily'),
            default => null,
        };
    }

    /**
     * @return Event[]
     *
     * @throws ConfigurationException
     * @throws \ReflectionException
     */
    public function getOccurrences(?array $config = null): array
    {
        $occurrencesConfig = new Occurrences($config);
        $configHash = $occurrencesConfig->getConfigHash();

        if (!isset($this->occurrenceCache[$configHash])) {
            $occurrenceDates = [];

            $rangeStart = $occurrencesConfig->getRangeStart();
            if (null === $rangeStart) {
                $rangeStart = new Carbon('today', DateHelper::UTC);
            }

            $rangeEnd = $occurrencesConfig->getRangeEnd();
            if (null === $rangeEnd) {
                $rangeEnd = $this->isInfinite() ? new \DateTime('+6 months') : $this->getUntil();
            }

            if ($this->getRRuleObject()) {
                $occurrenceDates = $this->getOccurrenceDatesBetween($rangeStart, $rangeEnd);
            } elseif ($this->getSelectDates()) {
                $occurrenceDates = $this->getSelectDatesAsDates($rangeStart, $rangeEnd);
            }

            $occurrences = [];
            $exceptions = $this->getExceptionDateStrings();
            $count = 0;
            foreach ($occurrenceDates as $date) {
                if (\in_array($date->format('Y-m-d'), $exceptions, true)) {
                    continue;
                }

                if ($occurrencesConfig->getLimit() && ++$count > $occurrencesConfig->getLimit()) {
                    break;
                }

                try {
                    $occurrences[] = $this->cloneForDate($date);
                } catch (CalendarException $e) {
                }
            }

            $this->occurrenceCache[$configHash] = $occurrences;
        }

        return $this->occurrenceCache[$configHash];
    }

    public function getOccurrenceCount(): int
    {
        return \count($this->getOccurrences());
    }

    /**
     * Compare this event to another event's MultiDay property
     * Returns: -1    if this is multi-day and the other isn't
     *          1     if this is not multi-day, but the other is
     *          true  if both are multi-day
     *          false if both aren't multi-day.
     */
    public function compareMultiDay(self $event): bool|int
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
     *          false if both aren't all-day.
     */
    public function compareAllDay(self $event): bool|int
    {
        if ($this->isAllDay() && !$event->isAllDay()) {
            return -1;
        }

        if (!$this->isAllDay() && $event->isAllDay()) {
            return 1;
        }

        return $this->isAllDay() && $event->isAllDay();
    }

    public function compareStartDates(self $event): int
    {
        return DateHelper::compareCarbons($this->getStartDate(), $event->getStartDate());
    }

    public function compareEndDates(self $event): int
    {
        return DateHelper::compareCarbons($this->getEndDate(), $event->getEndDate());
    }

    /**
     * Get the diff in days between two events.
     */
    public function diffInDays(self $event): int
    {
        return DateHelper::carbonDiffInDays($this->getStartDate(), $event->getStartDate());
    }

    public function canDelete(User $user): bool
    {
        return $this->isEditable($this);
    }

    public function canSave(User $user): bool
    {
        return $this->isEditable($this);
    }

    /**
     * @throws Exception if reasons
     */
    public function beforeSave(bool $isNew): bool
    {
        $this->updateTitle();

        return parent::beforeSave($isNew);
    }

    public function afterSave(bool $isNew): void
    {
        $insertData = [
            'calendarId' => $this->calendarId,
            'authorId' => $this->authorId,
            'startDate' => $this->startDate->toDateTimeString(),
            'endDate' => $this->endDate->toDateTimeString(),
            'allDay' => (bool) $this->allDay,
            'rrule' => $this->rrule,
            'freq' => $this->freq,
            'interval' => $this->interval,
            'count' => $this->count,
            'until' => $this->until ? $this->until->toDateTimeString() : null,
            'byMonth' => $this->byMonth,
            'byYearDay' => $this->byYearDay,
            'byMonthDay' => $this->byMonthDay,
            'byDay' => $this->byDay,
            'postDate' => $this->postDate ? $this->postDate->format('Y-m-d H:i:s') : null,
        ];

        $db = \Craft::$app->db;
        if ($isNew) {
            $insertData['id'] = $this->id;

            $db->createCommand()
                ->insert(self::TABLE, $insertData)
                ->execute()
            ;
        } else {
            $db->createCommand()
                ->update(self::TABLE, $insertData, ['id' => $this->id])
                ->execute()
            ;
        }

        if (\is_array($this->selectDates)) {
            $existingDates = (new Query())
                ->select(['id', 'date'])
                ->from(SelectDateRecord::TABLE)
                ->where(['eventId' => $this->id])
                ->pairs()
            ;

            $currentDates = [];
            foreach ($this->selectDates as $selectDate) {
                $currentDates[] = $selectDate->date->toDateTimeString();
            }

            $toDelete = array_keys(array_diff($existingDates, $currentDates));
            $toInsert = array_diff($currentDates, $existingDates);

            if ($toDelete) {
                $db->createCommand()
                    ->delete(SelectDateRecord::TABLE, ['eventId' => $this->id, 'id' => $toDelete])
                    ->execute()
                ;
            }

            foreach ($toInsert as $selectDate) {
                $record = new SelectDateRecord();
                $record->eventId = $this->id;
                $record->date = new Carbon($selectDate, DateHelper::UTC);

                $record->save();
            }
        }

        if (\is_array($this->exceptions)) {
            $existingDates = (new Query())
                ->select(['id', 'date'])
                ->from(ExceptionRecord::TABLE)
                ->where(['eventId' => $this->id])
                ->pairs()
            ;

            $currentDates = [];
            foreach ($this->exceptions as $exception) {
                $currentDates[] = $exception->date->toDateTimeString();
            }

            $toDelete = array_keys(array_diff($existingDates, $currentDates));
            $toInsert = array_diff($currentDates, $existingDates);

            if ($toDelete) {
                $db->createCommand()
                    ->delete(ExceptionRecord::TABLE, ['eventId' => $this->id, 'id' => $toDelete])
                    ->execute()
                ;
            }

            foreach ($toInsert as $exception) {
                $record = new ExceptionRecord();
                $record->eventId = $this->id;
                $record->date = new Carbon($exception, DateHelper::UTC);

                $record->save();
            }
        }

        parent::afterSave($isNew);
    }

    public function jsonSerialize(): array
    {
        $object = [
            'id' => (int) $this->id,
            'url' => $this->getUrl(),
            'title' => $this->title,
            'slug' => $this->slug,
            'start' => $this->startDate->toAtomString(),
            'end' => $this->endDate->toAtomString(),
            'allDay' => $this->isAllDay(),
            'multiDay' => $this->isMultiDay(),
            'repeats' => $this->isRepeating(),
            'readableRepeatRule' => $this->getReadableRepeatRule(),
            'calendar' => $this->getCalendar(),
            'site' => [
                'id' => $this->getSite()->id,
                'name' => $this->getSite()->name,
                'handle' => $this->getSite()->handle,
                'language' => $this->getSite()->language,
            ],
            'editable' => $this->isEditable(),
            'enabled' => (bool) $this->enabled,
            'backgroundColor' => $this->getCalendar()->color,
            'borderColor' => $this->getCalendar()->getDarkerColor(),
            'textColor' => $this->getCalendar()->getContrastColor(),
        ];

        $fieldValues = [];
        foreach ($this->getFieldValues() as $key => $value) {
            $event = new JsonValueTransformerEvent($key, $value);
            $this->trigger(self::EVENT_TRANSFORM_JSON_VALUE, $event);

            $value = $event->getValue();

            if (is_a($value, 'fruitstudios\linkit\base\Link')) {
                $value = $value->getLink([], false);
            }

            if ($value instanceof ElementQuery) {
                $value = $value->ids();
            }

            $fieldValues[$key] = $value;
        }

        return array_merge($object, $fieldValues);
    }

    public function rules(): array
    {
        $rules = parent::rules();
        $rules[] = [['startDate'], 'validateDates'];
        $rules[] = [['startDate', 'endDate'], 'required'];

        return $rules;
    }

    public function validateDates(): void
    {
        if ($this->startDate >= $this->endDate) {
            $this->addError('startDate', Calendar::t('Start Date must be before End Date'));
        }

        if ($this->startDate->diffInDays($this->endDate, true) > self::SPAN_LIMIT_DAYS) {
            $this->addError('startDate', Calendar::t('The maximum time span of an event is 365 days'));
        }
    }

    public function getEditorHtml(): string
    {
        $plugin = Calendar::getInstance();
        $view = \Craft::$app->getView();

        $view->registerAssetBundle(EventEditBundle::class);
        $output = $view->renderTemplate('calendar/events/_event_editor', [
            'event' => $this,
            'eventData' => (new EventToUiDataTransformer($this))->transform(),
            'eventConfig' => [
                'timeFormat' => $plugin->formats->getTimeFormat(Locale::LENGTH_SHORT),
                'dateFormat' => $plugin->formats->getDateFormat(Locale::LENGTH_SHORT),
                'timeInterval' => $plugin->settings->getTimeInterval(),
                'eventDuration' => $plugin->settings->getEventDuration(),
                'locale' => \Craft::$app->getSites()->getCurrentSite()->language,
                'firstDayOfWeek' => $plugin->settings->getFirstDayOfWeek(),
                'isNewEvent' => !$this->id,
            ],
        ]);
        $output .= parent::getEditorHtml();

        return $output;
    }

    public function metaFieldsHtml(bool $static): string
    {
        $fields = [];
        $view = \Craft::$app->getView();

        $fields[] = (function () {
            return Cp::textFieldHtml([
                'label' => \Craft::t('app', 'Calendar'),
                'id' => 'calendar',
                'name' => 'calendar',
                'value' => $this->getCalendar()->name,
                'readonly' => true,
            ]);
        })();

        // Slug
        $fields[] = $this->slugFieldHtml($static);

        // Author
        if (\Craft::Solo !== \Craft::$app->getEdition()) {
            $fields[] = (function () use ($static) {
                $author = $this->getAuthor();

                return Cp::elementSelectFieldHtml([
                    'label' => \Craft::t('app', 'Author'),
                    'id' => 'authorId',
                    'name' => 'authorId',
                    'elementType' => User::class,
                    'selectionLabel' => \Craft::t('app', 'Choose'),
                    'criteria' => [],
                    'single' => true,
                    'elements' => $author ? [$author] : null,
                    'disabled' => $static,
                ]);
            })();
        }

        $isDeltaRegistrationActive = $view->getIsDeltaRegistrationActive();
        $view->setIsDeltaRegistrationActive(true);
        $view->registerDeltaName('postDate');
        $view->setIsDeltaRegistrationActive($isDeltaRegistrationActive);

        // Post Date
        $fields[] = Cp::dateTimeFieldHtml([
            'label' => \Craft::t('app', 'Post Date'),
            'id' => 'postDate',
            'name' => 'postDate',
            'value' => $this->getPostDate(),
            'errors' => $this->getErrors('postDate'),
            'disabled' => $static,
        ]);

        $fields[] = parent::metaFieldsHtml($static);

        return implode("\n", $fields);
    }

    /**
     * We override actions from Element as we dont want to append View, Edit and Delete actions.
     * We only want our custom Status, Delete and Restore actions.
     *
     * {@inheritdoc}
     */
    public static function actions(string $source): array
    {
        $actions = Collection::make(static::defineActions($source));

        // Give plugins a chance to modify them
        $event = new RegisterElementActionsEvent([
            'source' => $source,
            'actions' => $actions->all(),
        ]);

        BaseEvent::trigger(static::class, self::EVENT_REGISTER_ACTIONS, $event);

        return $event->actions;
    }

    public function setFieldValuesFromRequest(string $paramNamespace = ''): void
    {
        $this->setFieldParamNamespace($paramNamespace);

        if (isset($this->_fieldParamNamePrefix)) {
            $values = \Craft::$app->getRequest()->getBodyParam($paramNamespace, []);
        } else {
            $values = \Craft::$app->getRequest()->getBodyParams();
        }

        // Run through this multiple times, in case any fields become visible as a result of other field value changes
        $processedFields = [];
        do {
            $processedAnyFields = false;
            foreach ($this->fieldLayoutFields(true) as $field) {
                // Have we already processed this field?
                if (isset($processedFields[$field->id])) {
                    continue;
                }

                $processedFields[$field->id] = true;
                $processedAnyFields = true;

                // Do we have any post data for this field?
                if (isset($values[$field->handle])) {
                    $value = $values[$field->handle];
                } elseif (
                    isset($this->_fieldParamNamePrefix)
                    && UploadedFile::getInstancesByName("{$this->_fieldParamNamePrefix}.{$field->handle}")
                ) {
                    // A file was uploaded for this field
                    $value = null;
                } else {
                    continue;
                }

                // Add in additional support for other field types
                if ($field instanceof \benf\neo\Field) {
                    if (!empty($values[$field->handle]['blocks']) && \is_array($values[$field->handle]['blocks'])) {
                        $index = 0;
                        $blocks = [];
                        foreach ($values[$field->handle]['blocks'] as $block) {
                            $blocks['new'.$index] = $block;
                            ++$index;
                        }
                        $this->setFieldValues([$field->handle => $blocks]);
                    } else {
                        $this->setFieldValues([$field->handle => '']);
                    }
                } else {
                    $this->setFieldValueFromRequest($field->handle, $value);
                }
            }
        } while ($processedAnyFields);
    }

    public function setFieldParamNamespace(string $namespace): void
    {
        $this->_fieldParamNamePrefix = '' !== $namespace ? $namespace : null;
    }

    public function attributes(): array
    {
        $names = parent::attributes();
        $names[] = 'authorId';
        $names[] = 'author';

        return $names;
    }

    public function extraFields(): array
    {
        $names = parent::extraFields();
        $names[] = 'authorId';
        $names[] = 'author';

        return $names;
    }

    protected static function prepElementQueryForTableAttribute(ElementQueryInterface $elementQuery, string $attribute): void
    {
        switch ($attribute) {
            case 'authorId':
                $elementQuery->andWith(['authorId', ['status' => null]]);

                break;

            case 'author':
                $elementQuery->andWith(['author', ['status' => null]]);

                break;

            default:
                parent::prepElementQueryForTableAttribute($elementQuery, $attribute);
        }
    }

    protected static function defineSources(?string $context = null): array
    {
        $sources = [
            [
                'key' => '*',
                'label' => Calendar::t('All events'),
                'criteria' => [],
            ],
            ['heading' => Calendar::t('Calendars')],
        ];

        foreach (Calendar::getInstance()->calendars->getAllAllowedCalendars() as $calendar) {
            $sources[] = [
                'key' => 'calendar:'.$calendar->id,
                'label' => $calendar->name,
                'criteria' => ['calendarId' => $calendar->id],
                'sites' => array_keys($calendar->getSiteSettings()),
                'data' => [
                    'id' => $calendar->id,
                    'name' => $calendar->name,
                    'handle' => $calendar->handle,
                    'color' => $calendar->color,
                ],
            ];
        }

        return $sources;
    }

    protected static function defineTableAttributes(): array
    {
        $attributes = [
            'slug' => ['label' => Calendar::t('Slug')],
            'calendar' => ['label' => Calendar::t('Calendar')],
            'startDateLocalized' => ['label' => Calendar::t('Start Date')],
            'endDateLocalized' => ['label' => Calendar::t('End Date')],
            'allDay' => ['label' => Calendar::t('All Day')],
            'rrule' => ['label' => Calendar::t('Repeats')],
            'authorId' => ['label' => Calendar::t('Author ID')],
            'author' => ['label' => Calendar::t('Author')],
            'postDate' => ['label' => Calendar::t('Post Date')],
            'link' => ['label' => Calendar::t('Link'), 'icon' => 'world'],
        ];

        // Hide Author from Craft Solo
        if (\Craft::Solo === \Craft::$app->getEdition()) {
            unset($attributes['authorId'], $attributes['author']);
        }

        return $attributes;
    }

    protected static function defineSortOptions(): array
    {
        return [
            'authorId' => Calendar::t('Author ID'),
            'author' => Calendar::t('Author'),
            'title' => Calendar::t('Title'),
            'name' => Calendar::t('Calendar'),
            'startDate' => Calendar::t('Start Date'),
            'endDate' => Calendar::t('End Date'),
            'allDay' => Calendar::t('All Day'),
            'postDate' => Calendar::t('Post Date'),
        ];
    }

    protected static function defineSearchableAttributes(): array
    {
        return ['authorId', 'author', 'id', 'title', 'startDate', 'endDate'];
    }

    protected static function defineDefaultTableAttributes(string $source): array
    {
        return [
            'authorId',
            'author',
            'calendar',
            'startDate',
            'endDate',
            'allDay',
            'postDate',
        ];
    }

    protected static function defineActions(?string $source = null): array
    {
        $actions = [
            \Craft::$app->elements->createAction([
                'type' => DeleteEventAction::class,
                'confirmationMessage' => Calendar::t('Are you sure you want to delete the selected events?'),
                'successMessage' => Calendar::t('Events deleted.'),
            ]),
            \Craft::$app->elements->createAction([
                'type' => SetStatusAction::class,
            ]),
        ];

        if (version_compare(\Craft::$app->getVersion(), '3.1', '>=')) {
            $actions[] = \Craft::$app->elements->createAction([
                'type' => Restore::class,
                'successMessage' => \Craft::t('app', 'Events restored.'),
                'partialSuccessMessage' => \Craft::t('app', 'Some events restored.'),
                'failMessage' => \Craft::t('app', 'Events not restored.'),
            ]);
        }

        return $actions;
    }

    protected function tableAttributeHtml(string $attribute): string
    {
        switch ($attribute) {
            case 'author':
                $author = $this->getAuthor();

                return $author ? \Craft::$app->view->renderTemplate('_elements/element', ['element' => $author]) : '';

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

            case 'status':
                return Calendar::t(ucfirst($this->getStatus()));

            default:
                return parent::tableAttributeHtml($attribute);
        }
    }

    protected function attributeHtml(string $attribute): string
    {
        switch ($attribute) {
            case 'author':
                $author = $this->getAuthor();

                return $author ? \Craft::$app->view->renderTemplate('_elements/element', ['element' => $author]) : '';

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

            case 'status':
                return Calendar::t(ucfirst($this->getStatus()));

            default:
                return parent::attributeHtml($attribute);
        }
    }

    protected function route(): null|array|string
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
            'templates/render',
            [
                'template' => $siteSettings->template,
                'variables' => [
                    'event' => $this,
                ],
            ],
        ];
    }

    protected function safeActionMenuItems(): array
    {
        // Hide the edit option since we're already on the edit screen
        return [];
        /*
        if (!$this->id) {
            return parent::safeActionMenuItems();
        }

        $safeActionMenuItems = [];

        if ($this->can('view') && $this->isEditable()) {
            $editId = sprintf('action-edit-%s', mt_rand());

            $safeActionMenuItems[] = [
                'id' => $editId,
                'icon' => 'edit',
                'label' => \Craft::t('app', 'Edit {type}', [
                    'type' => static::lowerDisplayName(),
                ]),
            ];
        }

        return $safeActionMenuItems;
        */
    }

    protected function destructiveActionMenuItems(): array
    {
        if (!$this->id) {
            return parent::destructiveActionMenuItems();
        }

        $destructiveItems = [];

        $siteHandle = $this->getSite()->handle;

        $redirectUrl = UrlHelper::cpUrl('calendar/events?site='.$siteHandle.'&source=calendar:'.$this->calendarId);

        if ($this->can('delete') && $this->isEditable()) {
            $destructiveItems[] = [
                'icon' => 'trash',
                'label' => \Craft::t('app', 'Delete {type}', [
                    'type' => static::lowerDisplayName(),
                ]),
                'action' => 'calendar/events/delete-event',
                'params' => [
                    'siteId' => $this->siteId,
                    'id' => $this->getCanonicalId(),
                    'eventId' => $this->getCanonicalId(),
                    'elementId' => $this->getCanonicalId(),
                ],
                'redirect' => $redirectUrl,
                'confirm' => \Craft::t('app', 'Are you sure you want to delete this {type}?', [
                    'type' => static::lowerDisplayName(),
                ]),
                'destructive' => false,
            ];
        }

        return $destructiveItems;
    }

    private function hydrateSelectDates(): void
    {
        $this->selectDates = Calendar::getInstance()->selectDates->getSelectDatesForEvent($this);
    }

    /**
     * Parses rules like "TU,WE,FR" and returns an array of [TU, WE, FR]
     * Returns NULL if the rule string is empty.
     */
    private function getArrayFromRRuleString(?string $data = null): ?array
    {
        if (!$data) {
            return null;
        }

        return explode(',', $data);
    }

    /**
     * $countLimit is used for infinite recurrence rules when getting occurrences.
     */
    private function getRRuleObject(): ?RRule
    {
        if (!$this->getFrequency() || $this->repeatsOnSelectDates()) {
            return null;
        }

        $sortedByDay = $this->byDay;
        if ($sortedByDay) {
            if (\defined('\RRule\RRule::WEEKDAYS')) {
                $weekDays = RRule::WEEKDAYS;
            } else {
                $weekDays = RRule::$week_days;
            }
            $sortedByDay = explode(',', $sortedByDay);
            usort(
                $sortedByDay,
                fn ($a, $b) => ($weekDays[$a] ?? 0) <=> ($weekDays[$b] ?? 0)
            );

            $sortedByDay = implode(',', $sortedByDay);
        }

        return new RRule([
            'FREQ' => $this->getFrequency(),
            'INTERVAL' => $this->interval,
            'DTSTART' => $this->initialStartDate->copy()->setTime(0, 0, 0),
            'UNTIL' => $this->getUntil(),
            'COUNT' => $this->count,
            'BYDAY' => $sortedByDay,
            'BYMONTHDAY' => $this->byMonthDay,
            'BYMONTH' => $this->byMonth,
            'BYYEARDAY' => $this->byYearDay,
        ]);
    }
}
