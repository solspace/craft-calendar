<?php

namespace Solspace\Calendar\Elements;

use Carbon\Carbon;
use craft\base\Element;
use craft\elements\actions\Edit;
use craft\elements\actions\Restore;
use craft\elements\conditions\ElementConditionInterface;
use craft\elements\db\ElementQuery;
use craft\elements\db\ElementQueryInterface;
use craft\elements\User;
use craft\errors\SiteNotFoundException;
use craft\events\RegisterElementActionsEvent;
use craft\helpers\Cp;
use craft\helpers\ElementHelper;
use craft\helpers\UrlHelper;
use craft\i18n\Locale;
use craft\models\FieldLayout;
use craft\web\CpScreenResponseBehavior;
use Illuminate\Support\Collection;
use RRule\RRule;
use RRule\RRuleInterface;
use RRule\RSet;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Actions\DeleteEventAction;
use Solspace\Calendar\Elements\Actions\SetStatusAction;
use Solspace\Calendar\Elements\conditions\EventCondition;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Events\JsonValueTransformerEvent;
use Solspace\Calendar\Library\Duration\EventDuration;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Library\RRule\RRuleStringNormalizer;
use Solspace\Calendar\Models\CalendarModel;
use Symfony\Component\PropertyAccess\PropertyAccessor;
use yii\base\Event as BaseEvent;
use yii\base\Exception;
use yii\web\Response;

class Event extends Element implements \JsonSerializable
{
    public const TABLE = '{{%calendar_events}}';
    public const TABLE_STD = 'calendar_events';

    public const REPEAT_NEVER = 'NEVER';
    public const REPEAT_DAILY = 'DAILY';
    public const REPEAT_WEEKLY = 'WEEKLY';
    public const REPEAT_MONTHLY = 'MONTHLY';
    public const REPEAT_YEARLY = 'YEARLY';
    public const REPEAT_CUSTOM = 'CUSTOM';

    public const SPAN_LIMIT_DAYS = 365;

    public const EVENT_TRANSFORM_JSON_VALUE = 'transform-json-value';

    private const MAX_OCCURRENCES = 5000;
    private const CARBON_PROPERTIES = ['postDate'];
    private const CARBON_TZ_PROPERTIES = [
        'startDate',
        'endDate',
        'until',
    ];

    public ?int $calendarId = null;
    public ?int $authorId = null;
    public ?string $username = null;
    public ?string $name = null;

    public ?Carbon $postDate = null;
    public ?Carbon $startDate = null;
    public ?Carbon $startDateLocalized = null;
    public ?Carbon $endDate = null;
    public ?Carbon $endDateLocalized = null;
    public ?Carbon $until = null;
    public ?string $timezone = null;

    public ?string $rrule = null;
    public ?string $repeatType = null;
    public ?string $repeatEndType = null;
    public ?bool $allDay = null;
    public ?string $freq = null;
    public ?int $interval = null;
    public ?int $count = null;

    private bool $syncFromRequestOnSave = true;

    public function __construct($config = [])
    {
        foreach (self::CARBON_PROPERTIES as $property) {
            if (isset($config[$property]) && \is_string($config[$property])) {
                $config[$property] = new Carbon($config[$property]);
            }
        }

        foreach (self::CARBON_TZ_PROPERTIES as $property) {
            if (isset($config[$property]) && \is_string($config[$property])) {
                $config[$property] = new Carbon($config[$property], DateHelper::UTC);
            }
        }

        parent::__construct($config);

        if ($this->startDate) {
            $this->startDateLocalized = new Carbon($this->startDate->toDateTimeString());
        }

        if ($this->endDate) {
            $this->endDateLocalized = new Carbon($this->endDate->toDateTimeString());
        }
    }

    public function canCreateDrafts(User $user): bool
    {
        return true;
    }

    public static function tableName(): string
    {
        return self::TABLE;
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

    public static function hasDrafts(): bool
    {
        return true;
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
     * Updates the entry's title if its entry type has a dynamic title format.
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
     * @return EventQuery
     */
    public static function find(): ElementQueryInterface
    {
        return new EventQuery(self::class);
    }

    public static function createCondition(): ElementConditionInterface
    {
        return \Craft::createObject(EventCondition::class, [static::class]);
    }

    public static function hasTitles(): bool
    {
        return true;
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

        $date = new Carbon('now');
        $date->setTime($date->hour, 0);

        $element = new self();
        $element->startDate = $date;
        $element->endDate = $element->startDate->copy()->addMinutes($settings->getEventDuration());
        $element->allDay = $settings->isAllDayDefault();
        $element->calendarId = $calendarId ?? Calendar::getInstance()->calendars->getFirstCalendarId();
        $element->authorId = \Craft::$app->user->getId();
        $element->postDate = new Carbon('now', DateHelper::UTC);
        $element->enabled = true;

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

    public function getPostEditUrl(): ?string
    {
        return UrlHelper::cpUrl('calendar/events');
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

    public function isMultiDay(): bool
    {
        $startDate = $this->getStartDate();
        $endDate = $this->getEndDate();

        $diffInDays = DateHelper::carbonDiffInDays($startDate, $endDate);
        if ($diffInDays > 1) {
            return true;
        }

        $threshold = $this->getOverlapThreshold();
        $dateBeforeOverlap = DateHelper::isDateBeforeOverlap($this->getEndDate(), $threshold);

        return $diffInDays === 1 && !$dateBeforeOverlap;
    }

    public function isCurrentlyHappening(): bool
    {
        static $isHappening;
        if (null === $isHappening) {
            $isHappening = $this->isHappeningOn(new Carbon('now', DateHelper::UTC));
        }

        return $isHappening;
    }

    public function isHappeningOn(\DateTime|string $date): bool
    {
        if (\is_string($date)) {
            $date = new Carbon($date, DateHelper::UTC);
        } elseif ($date instanceof \DateTimeInterface) {
            $date = new Carbon($date->format('Y-m-d H:i:s'), DateHelper::UTC);
        }

        return $date->between($this->getStartDate(), $this->getEndDate());
    }

    public function repeats(): bool
    {
        return $this->repeatType !== self::REPEAT_NEVER;
    }

    /**
     * @return \DateTime[]
     */
    public function getOccurrenceDates(): array
    {
        return $this->getOccurrenceDatesBetween();
    }

    /**
     * @return \DateTime[]
     */
    public function getOccurrenceDatesBetween(?\DateTime $rangeStart = null, ?\DateTime $rangeEnd = null): array
    {
        $rrule = $this->getRRuleObject();

        return $rrule?->getOccurrencesBetween($rangeStart, $rangeEnd, self::MAX_OCCURRENCES) ?? [];
    }

    public function happensOn(\DateTime $date): bool
    {
        $date = Carbon::createFromInterface($date);
        $date->setTime(0, 0);

        $rrule = $this->getRRuleObject();
        if (null !== $rrule) {
            return $rrule->occursAt($date);
        }

        return $date->toDateString() === $this->getStartDate()->toDateString();
    }

    public function getStartDate(): Carbon
    {
        return $this->startDate;
    }

    public function getStartDateLocalized(): Carbon
    {
        return $this->startDateLocalized;
    }

    public function getEndDate(): Carbon
    {
        return $this->endDate;
    }

    public function getEndDateLocalized(): Carbon
    {
        return $this->endDateLocalized;
    }

    public function getUntil(): ?Carbon
    {
        return $this->until;
    }

    public function getTimezone(): ?string
    {
        return $this->timezone;
    }

    /**
     * Returns the RFC compliant RRULE string
     * Or NULL if no rule present.
     */
    public function getRRuleRFCString(): ?string
    {
        return $this->rrule ?: null;
    }

    public function getHumanReadableRepeatsString(): ?string
    {
        if (!$this->repeats()) {
            return null;
        }

        $locale = \Craft::$app->getLocale();
        $format = $locale->getDateFormat('medium', 'php');
        $locale = $locale->id;
        $locale = preg_replace('/^(\w+)_.*$/', '$1', $locale);

        $rruleObject = $this->getRRuleObject();
        if ($rruleObject instanceof RSet) {
            $rruleObject = $rruleObject->getRRules()[0] ?? null;
        }

        if ($rruleObject instanceof RRule) {
            $string = $rruleObject->humanReadable([
                'locale' => $locale,
                'date_formatter' => static function (\DateTime $date) use ($format) {
                    return $date->format($format);
                },
            ]);

            return ucfirst($string);
        }

        return null;
    }

    public function isInfinite(): bool
    {
        return $this->getRRuleObject()?->isInfinite() ?? false;
    }

    public function isFinite(): bool
    {
        return !$this->isInfinite();
    }

    public function getDateCreated(): ?\DateTime
    {
        return $this->dateCreated;
    }

    public function getPostDate(): ?\DateTime
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

    public function getRRule(): ?string
    {
        return $this->rrule;
    }

    public function getRRuleObject(): ?RRuleInterface
    {
        if (!$this->rrule) {
            return null;
        }

        return RRule::createFromRfcString($this->rrule, true);
    }

    public function getReadableRepeatRule(): ?string
    {
        return $this->getHumanReadableRepeatsString();
    }

    public function diffInDays(self $event): int
    {
        return DateHelper::carbonDiffInDays($this->getStartDate(), $event->getStartDate());
    }

    public function canDuplicate(User $user): bool
    {
        return $this->isEditable();
    }

    public function canDelete(User $user): bool
    {
        return $this->isEditable();
    }

    public function canSave(User $user): bool
    {
        return $this->isEditable();
    }

    /**
     * @throws Exception if reasons
     */
    public function beforeSave(bool $isNew): bool
    {
        if (!parent::beforeSave($isNew)) {
            return false;
        }

        $this->updateTitle();

        if (!$this->syncFromRequestOnSave) {
            if (!$this->timezone || '' === trim((string) $this->timezone)) {
                $this->timezone = \Craft::$app->getTimeZone();
            }

            return true;
        }

        $request = \Craft::$app->getRequest();

        $timezone = $request->getBodyParam('timezone', $this->timezone);
        if (!\is_string($timezone) || '' === trim($timezone)) {
            $timezone = \Craft::$app->getTimeZone();
        }
        $timezone = trim((string) $timezone);

        $start = $this->bodyParamToCarbon('start', $this->startDate, 'startDate', $timezone);
        $end = $this->bodyParamToCarbon('end', $this->endDate, 'endDate', $timezone);
        $until = $this->bodyParamToCarbon('until', $this->until, null, $timezone);

        $allDay = (bool) $request->getBodyParam('allDay', $this->allDay);

        $repeatType = $request->getBodyParam('repeatType', $this->repeatType);
        $repeatEndType = $request->getBodyParam('repeatEndType', $this->repeatEndType);
        $rrule = $request->getBodyParam('rrule', $this->rrule);
        if ($allDay && \is_string($rrule)) {
            $rrule = RRuleStringNormalizer::normalizeAllDayRRule($rrule);
        }

        $this->startDate = $start;
        $this->endDate = $end;
        $this->until = $until;
        $this->timezone = '' !== $timezone ? $timezone : null;
        $this->allDay = $allDay;

        $this->repeatType = $repeatType;
        $this->repeatEndType = $repeatEndType;
        $this->rrule = $rrule;

        return true;
    }

    public function disableRequestSyncOnSave(): self
    {
        $this->syncFromRequestOnSave = false;

        return $this;
    }

    public function afterSave(bool $isNew): void
    {
        $insertData = [
            'calendarId' => $this->calendarId,
            'authorId' => $this->authorId,
            'startDate' => $this->startDate,
            'endDate' => $this->endDate,
            'until' => $this->until,
            'timezone' => $this->timezone,
            'allDay' => (bool) $this->allDay,
            'rrule' => $this->rrule,
            'repeatType' => $this->repeatType,
            'repeatEndType' => $this->repeatEndType,
            'postDate' => $this->postDate,
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

        parent::afterSave($isNew);
    }

    public function getFieldLayout(): ?FieldLayout
    {
        return $this->getCalendar()->getFieldLayout();
    }

    public function builderConfig(): array
    {
        $plugin = Calendar::getInstance();

        return [
            'app' => [
                'pro' => $plugin->isPro(),
                'formats' => DateFormatHelper::toConfig(),
                'weekStartDay' => $plugin->settings->getFirstDayOfWeek(),
                'timeInterval' => $plugin->settings->getTimeInterval(),
                'eventDuration' => $plugin->settings->getEventDuration(),
                'allDayDefault' => $plugin->settings->isAllDayDefault(),
                'overlapThreshold' => $plugin->settings->getOverlapThreshold(),
            ],
            'event' => [
                'start' => $this->startDate->timestamp,
                'end' => $this->endDate->timestamp,
                'until' => $this->until?->timestamp,
                'timezone' => $this->timezone ?: DateHelper::UTC,

                'allDay' => $this->allDay,
                'repeatType' => $this->repeatType,
                'repeatEndType' => $this->repeatEndType,
                'rrule' => $this->rrule,
            ],
        ];
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
            'timezone' => $this->timezone,
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

        // Author - Hide Author from Craft Solo
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

    public function prepareEditScreen(Response $response, string $containerId): void
    {
        /** @var CpScreenResponseBehavior $screen */
        $screen = $response->getBehavior('cp-screen');
        if (!$screen) {
            return;
        }

        $screen->selectedSubnavItem('events');
        $screen->crumbs([
            [
                'label' => Calendar::t('Calendar'),
                'url' => UrlHelper::cpUrl('calendar'),
            ],
            [
                'label' => Calendar::t('Events'),
                'url' => UrlHelper::cpUrl('calendar/events'),
            ],
        ]);
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

    public function attributes(): array
    {
        $names = parent::attributes();
        $names[] = 'authorId';
        $names[] = 'author';

        // Hide Author from Craft Solo
        if (\Craft::Solo === \Craft::$app->getEdition()) {
            unset($names['authorId'], $names['author']);
        }

        return $names;
    }

    public function extraFields(): array
    {
        $names = parent::extraFields();
        $names[] = 'authorId';
        $names[] = 'author';

        // Hide Author from Craft Solo
        if (\Craft::Solo === \Craft::$app->getEdition()) {
            unset($names['authorId'], $names['author']);
        }

        return $names;
    }

    protected function cpEditUrl(): ?string
    {
        if (!$this->isEditable()) {
            return null;
        }

        return 'calendar/events/'.$this->getCanonicalId();
    }

    protected static function prepElementQueryForTableAttribute(ElementQueryInterface $elementQuery, string $attribute): void
    {
        parent::prepElementQueryForTableAttribute($elementQuery, $attribute);
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
            'name' => ['label' => Calendar::t('Calendar')],
            'startDate' => ['label' => Calendar::t('Start Date')],
            'endDate' => ['label' => Calendar::t('End Date')],
            'dateCreated' => ['label' => Calendar::t('Date Created')],
            'dateUpdated' => ['label' => Calendar::t('Date Updated')],
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
        $attributes = [
            'authorId' => Calendar::t('Author ID'),
            'title' => Calendar::t('Title'),
            'name' => Calendar::t('Calendar'),
            'startDate' => Calendar::t('Start Date'),
            'endDate' => Calendar::t('End Date'),
            'dateCreated' => Calendar::t('Date Created'),
            'dateUpdated' => Calendar::t('Date Updated'),
            'allDay' => Calendar::t('All Day'),
            'postDate' => Calendar::t('Post Date'),
        ];

        // Hide Author from Craft Solo
        if (\Craft::Solo === \Craft::$app->getEdition()) {
            unset($attributes['authorId']);
        }

        return $attributes;
    }

    protected static function defineSearchableAttributes(): array
    {
        $attributes = [
            'name',
            'authorId',
            'author',
            'id',
            'title',
            'startDate',
            'endDate',
            'dateCreated',
            'dateUpdated',
            'postDate',
        ];

        // Hide Author from Craft Solo
        if (\Craft::Solo === \Craft::$app->getEdition()) {
            unset($attributes['authorId'], $attributes['author']);
        }

        return $attributes;
    }

    protected static function defineDefaultTableAttributes(string $source): array
    {
        return [
            'name',
            'startDate',
            'endDate',
            'dateCreated',
            'dateUpdated',
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

                return $author ? Cp::elementHtml($author) : '';

            case 'name':
                return \sprintf(
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

                return $author ? Cp::elementChipHtml($author) : '';

            case 'name':
                return \sprintf(
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

    protected function route(): array|string|null
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
        // Uncomment the block below to add ... and extra context menu to last item in breadcrumbs list
        return parent::destructiveActionMenuItems();
        /*
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
                'action' => 'calendar/events/delete',
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
        */
    }

    private function bodyParamToCarbon(
        string $name,
        ?Carbon $fallback = null,
        ?string $fallbackName = null,
        ?string $timezone = null,
    ): ?Carbon {
        $request = \Craft::$app->getRequest();
        $value = $request->getBodyParam($name);

        if ((null === $value || '' === $value) && null !== $fallbackName) {
            $value = $request->getBodyParam($fallbackName);
        }

        if (null === $value || '' === $value) {
            return $fallback;
        }

        if ($value instanceof \DateTimeInterface) {
            return new Carbon($value->format('Y-m-d H:i:s'), DateHelper::UTC);
        }

        if (\is_array($value)) {
            $date = (string) ($value['date'] ?? '');
            $time = (string) ($value['time'] ?? '');
            $value = trim($date.' '.$time);

            if ('' === $value) {
                return $fallback;
            }
        }

        if (\is_numeric($value)) {
            return Carbon::createFromTimestampUTC((int) $value);
        }

        if (\is_string($value)) {
            try {
                return new Carbon($value, DateHelper::UTC);
            } catch (\Throwable) {
                return $fallback;
            }
        }

        return $fallback;
    }

    private function getOverlapThreshold(): int
    {
        static $overlapThreshold;
        if (null === $overlapThreshold) {
            $overlapThreshold = Calendar::getInstance()->settings->getOverlapThreshold();
        }

        return $overlapThreshold;
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
}
