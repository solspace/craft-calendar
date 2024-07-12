<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use craft\db\Query;
use craft\db\Table;
use craft\events\SiteEvent;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Events\DeleteModelEvent;
use Solspace\Calendar\Events\SaveModelEvent;
use Solspace\Calendar\Library\Attributes\CalendarAttributes;
use Solspace\Calendar\Library\Exceptions\AttributeException;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Records\CalendarSiteSettingsRecord;
use yii\base\Exception;

class CalendarsService extends Component
{
    public const EVENT_BEFORE_SAVE = 'beforeSave';
    public const EVENT_AFTER_SAVE = 'afterSave';
    public const EVENT_BEFORE_DELETE = 'beforeDelete';
    public const EVENT_AFTER_DELETE = 'afterDelete';

    /** @var CalendarModel[] */
    private ?array $calendarCache = null;

    private ?bool $allCalendarsCached = null;

    private ?array $allowedCalendarCache = null;

    public function getFirstCalendarId(): int
    {
        return (int) (new Query())
            ->select(['id'])
            ->from(CalendarRecord::TABLE)
            ->scalar()
        ;
    }

    /**
     * @return CalendarModel[]
     */
    public function getAllCalendars(): array
    {
        if (null === $this->calendarCache || !$this->allCalendarsCached) {
            $models = [];
            $results = $this->getQuery()->all();
            foreach ($results as $result) {
                $model = $this->createModel($result);

                $models[$model->id] = $model;
            }

            $this->calendarCache = $models;
            $this->allCalendarsCached = true;
        }

        return $this->calendarCache;
    }

    /**
     * @return CalendarModel[]
     */
    public function getAllAllowedCalendars(): array
    {
        $isAdmin = PermissionHelper::isAdmin();
        $canManageAll = PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR_ALL);

        /** @var SettingsService $settings */
        $settings = Calendar::getInstance()->settings;
        $publicCalendarIds = $settings->getSettingsModel()->guestAccess;

        if ($isAdmin || $canManageAll || '*' === $publicCalendarIds) {
            return $this->getAllCalendars();
        }

        if (null === $this->allowedCalendarCache) {
            $allowedUids = PermissionHelper::getNestedPermissionIds(Calendar::PERMISSION_EVENTS_FOR);
            $allowedCalendarIds = array_map(function ($uid) {
                return Db::idByUid(CalendarRecord::TABLE, $uid);
            }, $allowedUids);

            if (\is_array($publicCalendarIds) && \is_array($allowedCalendarIds)) {
                $publicCalendarIds = array_map('intval', $publicCalendarIds);
                $allowedCalendarIds = array_merge($allowedCalendarIds, $publicCalendarIds);
            }

            $results = $this->getQuery()
                ->where(['id' => $allowedCalendarIds])
                ->all()
            ;

            $models = [];
            foreach ($results as $data) {
                $model = $this->createModel($data);

                $models[$model->id] = $model;
            }

            $this->allowedCalendarCache = $models;
        }

        return $this->allowedCalendarCache;
    }

    /**
     * Returns an array of calendar titles indexed by calendar ID.
     */
    public function getAllCalendarTitles(): array
    {
        $titleArray = [];
        $calendars = $this->getAllCalendars();

        foreach ($calendars as $calendar) {
            $titleArray[$calendar->id] = $calendar->name;
        }

        return $titleArray;
    }

    public function getLatestModificationDate(): string
    {
        return (new Query())
            ->select('MAX([[dateUpdated]])')
            ->from(CalendarRecord::TABLE)
            ->limit(1)
            ->scalar()
        ;
    }

    public function getAllCalendarCount(): string
    {
        return (new Query())
            ->select('COUNT([[id]])')
            ->from(CalendarRecord::TABLE)
            ->scalar()
        ;
    }

    /**
     * Returns an array of calendar titles indexed by calendar ID.
     */
    public function getAllAllowedCalendarTitles(): array
    {
        $titleArray = [];
        $calendars = $this->getAllAllowedCalendars();

        foreach ($calendars as $calendar) {
            $titleArray[$calendar->id] = $calendar->name;
        }

        return $titleArray;
    }

    public function getCalendarById(?int $calendarId): ?CalendarModel
    {
        $calendars = $this->getAllCalendars();

        if (isset($calendars[$calendarId])) {
            return $calendars[$calendarId];
        }

        return null;
    }

    public function getCalendarByUid(mixed $uid): ?CalendarModel
    {
        $data = $this->getQuery()->where(['uid' => $uid])->one();
        if (!$data) {
            return null;
        }

        return $this->createModel($data);
    }

    public function getCalendarByHandle(string $handle): ?CalendarModel
    {
        $data = $this->getQuery()
            ->where(['handle' => $handle])
            ->one()
        ;

        if ($data) {
            return $this->createModel($data);
        }

        return null;
    }

    public function getCalendarByIcsHash(string $icsHash): ?CalendarModel
    {
        if (!$icsHash) {
            return null;
        }

        $data = $this->getQuery()
            ->where(['icsHash' => $icsHash])
            ->one()
        ;

        if ($data) {
            return $this->createModel($data);
        }

        return null;
    }

    /**
     * @throws \Exception
     * @throws \Throwable
     */
    public function saveCalendar(CalendarModel $calendar, bool $runValidation = true): bool
    {
        $isNew = !$calendar->id;

        if ($isNew) {
            $calendar->uid = StringHelper::UUID();
        } elseif (!$calendar->uid) {
            $calendar->uid = Db::uidById(CalendarRecord::TABLE, $calendar->id);
        }

        // Fire a 'beforeSaveSection' event
        if ($this->hasEventHandlers(self::EVENT_BEFORE_SAVE)) {
            $this->trigger(self::EVENT_BEFORE_SAVE, new SaveModelEvent($calendar, $isNew));
        }

        if ($runValidation && !$calendar->validate()) {
            \Craft::info('Calendar not saved due to validation error.', __METHOD__);

            return false;
        }

        $fieldLayout = $calendar->getFieldLayout();
        $fieldLayoutConfig = null;
        if ($fieldLayout && $fieldLayout->getConfig()) {
            $calendar->fieldLayoutId = $fieldLayout->id;

            $fieldLayoutConfig = array_merge(
                ['uid' => $fieldLayout->uid],
                $fieldLayout->getConfig()
            );
        } else {
            $calendar->fieldLayoutId = null;
        }

        $siteSettings = [];
        foreach ($calendar->getSiteSettings() as $setting) {
            $siteSettings[$setting->uid] = [
                'siteId' => Db::uidById(Table::SITES, $setting->siteId),
                'enabledByDefault' => $setting->enabledByDefault,
                'hasUrls' => $setting->hasUrls,
                'uriFormat' => $setting->uriFormat,
                'template' => $setting->template,
            ];
        }

        $projectConfig = \Craft::$app->projectConfig;

        $path = Calendar::CONFIG_CALENDAR_PATH.'.'.$calendar->uid;
        $projectConfig
            ->set(
                $path,
                [
                    'name' => $calendar->name,
                    'handle' => $calendar->handle,
                    'description' => $calendar->description,
                    'color' => $calendar->color,
                    'titleTranslationMethod' => $calendar->titleTranslationMethod,
                    'titleTranslationKeyFormat' => $calendar->titleTranslationKeyFormat,
                    'descriptionFieldHandle' => $calendar->descriptionFieldHandle,
                    'locationFieldHandle' => $calendar->locationFieldHandle,
                    'icsHash' => $calendar->icsHash,
                    'icsTimezone' => $calendar->icsTimezone,
                    'titleFormat' => $calendar->titleFormat,
                    'titleLabel' => $calendar->titleLabel,
                    'hasTitleField' => $calendar->hasTitleField,
                    'allowRepeatingEvents' => $calendar->allowRepeatingEvents,
                    'fieldLayout' => $fieldLayoutConfig,
                    'siteSettings' => $siteSettings,
                ]
            )
        ;

        if ($isNew) {
            $calendar->id = Db::idByUid(CalendarRecord::TABLE, $calendar->uid);
        }

        // Fire an 'afterSaveSection' event
        if ($this->hasEventHandlers(self::EVENT_AFTER_SAVE)) {
            $this->trigger(self::EVENT_AFTER_SAVE, new SaveModelEvent($calendar, $isNew));
        }

        return true;
    }

    /**
     * @throws \Exception
     * @throws \Throwable
     */
    public function deleteCalendarById(int $calendarId): bool
    {
        $calendar = $this->getCalendarById($calendarId);
        if (!$calendar) {
            return false;
        }

        $beforeDeleteEvent = new DeleteModelEvent($calendar);
        $this->trigger(self::EVENT_BEFORE_DELETE, $beforeDeleteEvent);

        if (!$beforeDeleteEvent->isValid) {
            return false;
        }

        $projectConfig = \Craft::$app->projectConfig;

        // Grab the event ids so we can clean the elements table.
        $eventIds = (new Query())
            ->select(['id'])
            ->from(Event::TABLE)
            ->where(['calendarId' => $calendarId])
            ->column()
        ;

        foreach ($eventIds as $eventId) {
            \Craft::$app->elements->deleteElementById($eventId);
        }

        foreach ($calendar->getSiteSettings() as $siteSetting) {
            $path = Calendar::CONFIG_CALENDAR_SITES_PATH.'.'.$siteSetting->uid;
            $projectConfig->remove($path);
        }

        $path = Calendar::CONFIG_CALENDAR_PATH.'.'.$calendar->uid;
        $projectConfig->remove($path);

        $this->trigger(self::EVENT_AFTER_DELETE, new DeleteModelEvent($calendar));

        return true;
    }

    /**
     * @return CalendarModel[]
     *
     * @throws AttributeException
     */
    public function getCalendars(?array $attributes = null): array
    {
        $calendarAttributes = new CalendarAttributes($this->getQuery(), $attributes);
        $query = $calendarAttributes->getQuery();

        $models = [];
        $results = $query->all();
        foreach ($results as $data) {
            $model = $this->createModel($data);

            $models[$model->id] = $model;
        }

        return $models;
    }

    /**
     * Returns a section’s site-specific settings.
     *
     * @return CalendarSiteSettingsModel[] the section’s site-specific settings
     */
    public function getCalendarSiteSettings(int $calendarId): array
    {
        $table = CalendarSiteSettingsRecord::tableName();

        $siteSettings = (new Query())
            ->select(
                [
                    'calendar_calendar_sites.[[id]]',
                    'calendar_calendar_sites.[[calendarId]]',
                    'calendar_calendar_sites.[[siteId]]',
                    'calendar_calendar_sites.[[enabledByDefault]]',
                    'calendar_calendar_sites.[[hasUrls]]',
                    'calendar_calendar_sites.[[uriFormat]]',
                    'calendar_calendar_sites.[[template]]',
                ]
            )
            ->from([$table.' calendar_calendar_sites'])
            ->innerJoin(Table::SITES.' sites', 'sites.[[id]] = calendar_calendar_sites.[[siteId]]')
            ->where(['calendar_calendar_sites.[[calendarId]]' => $calendarId])
            ->orderBy(['sites.[[sortOrder]]' => \SORT_ASC])
            ->all()
        ;

        foreach ($siteSettings as $key => $value) {
            $siteSettings[$key] = new CalendarSiteSettingsModel($value);
        }

        return $siteSettings;
    }

    public function isCalendarPublic(CalendarModel $calendar): bool
    {
        /** @var SettingsService $settings */
        $settings = Calendar::getInstance()->settings;
        $guestAccess = $settings->getSettingsModel()->guestAccess;

        if ('*' === $guestAccess) {
            return true;
        }

        if (null === $guestAccess || !\is_array($guestAccess)) {
            return false;
        }

        $guestAccess = array_map('\intval', $guestAccess);

        return \in_array((int) $calendar->id, $guestAccess, true);
    }

    /**
     * Returns whether a calendar’s events have URLs for the given site ID, and if the
     * calendar’s template path is valid.
     *
     * @throws Exception
     */
    public function isEventTemplateValid(CalendarModel $calendar, int $siteId): bool
    {
        $siteSettings = $calendar->getSiteSettingsForSite($siteId);

        if (!$siteSettings) {
            return false;
        }

        // Set Craft to the site template mode
        $view = \Craft::$app->getView();
        $oldTemplateMode = $view->getTemplateMode();
        $view->setTemplateMode($view::TEMPLATE_MODE_SITE);

        $templateExists = false;
        if ($siteSettings->template) {
            // Does the template exist?
            $templateExists = \Craft::$app->getView()->doesTemplateExist((string) $siteSettings->template);
        }

        // Restore the original template mode
        $view->setTemplateMode($oldTemplateMode);

        return $templateExists;
    }

    public function addSiteHandler(SiteEvent $event): bool
    {
        if (false === \Craft::$app->getPlugins()->isPluginEnabled('calendar')) {
            return true;
        }

        if (!$event->isNew) {
            return true;
        }

        $siteId = $event->site->id;

        $rows = [];
        $calendars = $this->getAllCalendars();
        foreach ($calendars as $calendar) {
            $rows[] = [
                $calendar->id,
                $siteId,
                0,
                0,
                null,
                null,
            ];
        }

        (new Query())
            ->createCommand()
            ->batchInsert(
                CalendarSiteSettingsRecord::TABLE,
                [
                    'calendarId',
                    'siteId',
                    'enabledByDefault',
                    'hasUrls',
                    'uriFormat',
                    'template',
                ],
                $rows
            )
            ->execute()
        ;

        return true;
    }

    public function getResolvedCalendars(array $arguments): array
    {
        $limit = $arguments['limit'] ?? null;
        $sort = strtolower($arguments['sort'] ?? 'asc');
        $sort = 'desc' === $sort ? \SORT_DESC : \SORT_ASC;

        $orderBy = $arguments['orderBy'] ?? 'id';
        $orderBy = [$orderBy => $sort];

        $offset = $arguments['offset'] ?? null;

        unset($arguments['limit'], $arguments['orderBy'], $arguments['sort'], $arguments['offset']);

        $query = $this->getQuery()
            ->where($arguments)
            ->orderBy($orderBy)
            ->limit($limit)
            ->offset($offset)
        ;

        $results = $query->all();

        $calendars = [];
        foreach ($results as $result) {
            $calendars[] = $this->createModel($result);
        }

        return $calendars;
    }

    private function getQuery(): Query
    {
        return (new Query())
            ->select(
                [
                    'calendar.[[id]]',
                    'calendar.[[uid]]',
                    'calendar.[[name]]',
                    'calendar.[[handle]]',
                    'calendar.[[description]]',
                    'calendar.[[color]]',
                    'calendar.[[fieldLayoutId]]',
                    'calendar.[[titleFormat]]',
                    'calendar.[[titleLabel]]',
                    'calendar.[[hasTitleField]]',
                    'calendar.[[titleTranslationMethod]]',
                    'calendar.[[titleTranslationKeyFormat]]',
                    'calendar.[[descriptionFieldHandle]]',
                    'calendar.[[locationFieldHandle]]',
                    'calendar.[[icsHash]]',
                    'calendar.[[icsTimezone]]',
                    'calendar.[[allowRepeatingEvents]]',
                ]
            )
            ->from(CalendarRecord::TABLE.' calendar')
            ->orderBy(['name' => \SORT_ASC])
        ;
    }

    private function createModel(array $data): CalendarModel
    {
        return new CalendarModel($data);
    }
}
