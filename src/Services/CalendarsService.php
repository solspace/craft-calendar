<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use craft\db\Query;
use craft\events\SiteEvent;
use craft\queue\jobs\ResaveElements;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Events\DeleteModelEvent;
use Solspace\Calendar\Events\SaveModelEvent;
use Solspace\Calendar\Library\Attributes\CalendarAttributes;
use Solspace\Calendar\Library\Exceptions\CalendarException;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Records\CalendarSiteSettingsRecord;
use Solspace\Commons\Helpers\PermissionHelper;

class CalendarsService extends Component
{
    const EVENT_BEFORE_SAVE   = 'beforeSave';
    const EVENT_AFTER_SAVE    = 'beforeSave';
    const EVENT_BEFORE_DELETE = 'beforeDelete';
    const EVENT_AFTER_DELETE  = 'beforeDelete';

    /** @var CalendarModel[] */
    private $calendarCache;
    private $allCalendarsCached;

    private $allowedCalendarCache;

    /**
     * @return int
     */
    public function getFirstCalendarId(): int
    {
        return (int) (new Query())
            ->select(['id'])
            ->from(CalendarRecord::TABLE)
            ->scalar();
    }

    /**
     * @return CalendarModel[]
     */
    public function getAllCalendars(): array
    {
        if (null === $this->calendarCache || !$this->allCalendarsCached) {
            $models  = [];
            $results = $this->getQuery()->all();
            foreach ($results as $result) {
                $model = $this->createModel($result);

                $models[$model->id] = $model;
            }

            $this->calendarCache      = $models;
            $this->allCalendarsCached = true;
        }

        return $this->calendarCache;
    }

    /**
     * @return CalendarModel[]
     */
    public function getAllAllowedCalendars(): array
    {
        $isAdmin      = PermissionHelper::isAdmin();
        $canManageAll = PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR_ALL);

        /** @var SettingsService $settings */
        $settings          = Calendar::getInstance()->settings;
        $publicCalendarIds = $settings->getSettingsModel()->guestAccess;

        if ($isAdmin || $canManageAll || $publicCalendarIds === '*') {
            return $this->getAllCalendars();
        }

        if (null === $this->allowedCalendarCache) {
            $allowedCalendarIds = PermissionHelper::getNestedPermissionIds(Calendar::PERMISSION_EVENTS_FOR);

            if (is_array($publicCalendarIds)) {
                $publicCalendarIds  = array_map('intval', $publicCalendarIds);
                $allowedCalendarIds = array_merge($allowedCalendarIds, $publicCalendarIds);
            }

            $results = $this->getQuery()
                ->where(['id' => $allowedCalendarIds])
                ->all();

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
     * Returns an array of calendar titles indexed by calendar ID
     *
     * @return array
     */
    public function getAllCalendarTitles(): array
    {
        $titleArray = [];
        $calendars  = $this->getAllCalendars();

        foreach ($calendars as $calendar) {
            $titleArray[$calendar->id] = $calendar->name;
        }

        return $titleArray;
    }

    /**
     * @return string
     */
    public function getLatestModificationDate(): string
    {
        return (new Query())
            ->select('MAX([[dateUpdated]])')
            ->from(CalendarRecord::TABLE)
            ->limit(1)
            ->scalar();
    }

    /**
     * @return String
     */
    public function getAllCalendarCount(): string
    {
        return (new Query())
            ->select('COUNT([[id]])')
            ->from(CalendarRecord::TABLE)
            ->scalar();
    }

    /**
     * Returns an array of calendar titles indexed by calendar ID
     *
     * @return array
     */
    public function getAllAllowedCalendarTitles(): array
    {
        $titleArray = [];
        $calendars  = $this->getAllAllowedCalendars();

        foreach ($calendars as $calendar) {
            $titleArray[$calendar->id] = $calendar->name;
        }

        return $titleArray;
    }

    /**
     * @param int $calendarId
     *
     * @return CalendarModel|null
     */
    public function getCalendarById($calendarId)
    {
        $calendars = $this->getAllCalendars();

        if (isset($calendars[$calendarId])) {
            return $calendars[$calendarId];
        }

        return null;
    }

    /**
     * @param string $handle
     *
     * @return CalendarModel|null
     */
    public function getCalendarByHandle(string $handle)
    {
        $data = $this->getQuery()
            ->where(['handle' => $handle])
            ->one();

        if ($data) {
            return $this->createModel($data);
        }

        return null;
    }

    /**
     * @param string $icsHash
     *
     * @return CalendarModel|null
     */
    public function getCalendarByIcsHash($icsHash)
    {
        if (!$icsHash) {
            return null;
        }

        $data = $this->getQuery()
            ->where(['icsHash' => $icsHash])
            ->one();

        if ($data) {
            return $this->createModel($data);
        }

        return null;
    }

    /**
     * @param CalendarModel $calendar
     * @param bool          $runValidation
     *
     * @return bool
     * @throws \Exception
     * @throws \Throwable
     */
    public function saveCalendar(CalendarModel $calendar, bool $runValidation = true): bool
    {
        $isNew = !$calendar->id;

        // Fire a 'beforeSaveSection' event
        if ($this->hasEventHandlers(self::EVENT_BEFORE_SAVE)) {
            $this->trigger(self::EVENT_BEFORE_SAVE, new SaveModelEvent($calendar, $isNew));
        }

        if ($runValidation && !$calendar->validate()) {
            \Craft::info('Calendar not saved due to validation error.', __METHOD__);

            return false;
        }

        if (!$isNew) {
            $calendarRecord = CalendarRecord::find()
                ->where(['id' => $calendar->id])
                ->one();

            if (!$calendarRecord) {
                throw new CalendarException("No calendar exists with the ID '{$calendar->id}'");
            }
        } else {
            $calendarRecord = new CalendarRecord();
        }

        $calendarRecord->name                   = $calendar->name;
        $calendarRecord->handle                 = $calendar->handle;
        $calendarRecord->description            = $calendar->description;
        $calendarRecord->color                  = $calendar->color;
        $calendarRecord->descriptionFieldHandle = $calendar->descriptionFieldHandle;
        $calendarRecord->locationFieldHandle    = $calendar->locationFieldHandle;
        $calendarRecord->icsHash                = $calendar->icsHash;
        $calendarRecord->titleFormat            = $calendar->titleFormat;
        $calendarRecord->titleLabel             = $calendar->titleLabel;
        $calendarRecord->hasTitleField          = $calendar->hasTitleField;

        $fieldLayout = $calendar->getFieldLayout();
        if ($fieldLayout) {
            \Craft::$app->getFields()->saveLayout($fieldLayout);

            $calendar->fieldLayoutId       = $fieldLayout->id;
            $calendarRecord->fieldLayoutId = $fieldLayout->id;
        }

        $allSiteSettings = $calendar->getSiteSettings();

        if (empty($allSiteSettings)) {
            throw new CalendarException('Tried to save a calendar without any site settings');
        }

        $db          = \Craft::$app->getDb();
        $transaction = $db->beginTransaction();

        try {
            $calendarRecord->save(false);

            // Now that we have a section ID, save it on the model
            if ($isNew) {
                $calendar->id = $calendarRecord->id;
            }

            // Might as well update our cache of the section while we have it. (It's possible that the URL format
            //includes {section.handle} or something...)
            $this->calendarCache[$calendar->id] = $calendar;

            if (!$isNew) {
                // Get the old section site settings
                $allOldSiteSettingsRecords = CalendarSiteSettingsRecord::find()
                    ->where(['calendarId' => $calendar->id])
                    ->indexBy('siteId')
                    ->all();
            } else {
                $allOldSiteSettingsRecords = [];
            }

            foreach ($allSiteSettings as $siteId => $siteSettings) {
                // Was this already selected?
                if (!$isNew && isset($allOldSiteSettingsRecords[$siteId])) {
                    $siteSettingsRecord = $allOldSiteSettingsRecords[$siteId];
                } else {
                    $siteSettingsRecord             = new CalendarSiteSettingsRecord();
                    $siteSettingsRecord->calendarId = $calendar->id;
                    $siteSettingsRecord->siteId     = $siteId;
                }

                $siteSettingsRecord->enabledByDefault = $siteSettings->enabledByDefault;
                $siteSettingsRecord->hasUrls          = $siteSettings->hasUrls;
                $siteSettingsRecord->uriFormat        = $siteSettings->uriFormat;
                $siteSettingsRecord->template         = $siteSettings->template;

                $siteSettingsRecord->save(false);

                // Set the ID on the model
                $siteSettings->id = $siteSettingsRecord->id;
            }

            if (!$isNew) {
                // Drop any sites that are no longer being used, as well as the associated entry/element site
                // rows
                $siteIds = array_keys($allSiteSettings);

                /** @noinspection PhpUndefinedVariableInspection */
                foreach ($allOldSiteSettingsRecords as $siteId => $siteSettingsRecord) {
                    if (!\in_array($siteId, $siteIds, false)) {
                        $siteSettingsRecord->delete();
                    }
                }
            }

            if (!$isNew) {
                // Get the most-primary site that this section was already enabled in
                $siteIds = array_values(
                    array_intersect(
                        \Craft::$app->getSites()->getAllSiteIds(),
                        array_keys($allOldSiteSettingsRecords)
                    )
                );

                if (!empty($siteIds)) {
                    // Resave entries for each site
                    foreach ($allSiteSettings as $siteId => $siteSettings) {
                        \Craft::$app->getQueue()->push(
                            new ResaveElements(
                                [
                                    'description' => \Craft::t(
                                        'app',
                                        'Resaving {calendar} events ({site})',
                                        ['calendar' => $calendar->name, 'site' => $siteSettings->getSite()->name]
                                    ),
                                    'elementType' => Event::class,
                                    'criteria'    => [
                                        'siteId'          => $siteId,
                                        'calendarId'      => $calendar->id,
                                        'loadOccurrences' => false,
                                        'status'          => null,
                                        'enabledForSite'  => false,
                                        'limit'           => null,
                                    ],
                                ]
                            )
                        );
                    }
                }
            }

            $transaction->commit();
        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        // Fire an 'afterSaveSection' event
        if ($this->hasEventHandlers(self::EVENT_AFTER_SAVE)) {
            $this->trigger(self::EVENT_AFTER_SAVE, new SaveModelEvent($calendar, $isNew));
        }

        return true;
    }

    /**
     * @param int $calendarId
     *
     * @return bool
     * @throws \Exception
     * @throws \Throwable
     */
    public function deleteCalendarById($calendarId)
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

        $transaction = \Craft::$app->db->beginTransaction();
        try {
            // Grab the event ids so we can clean the elements table.
            $eventIds = (new Query())
                ->select(['id'])
                ->from(Event::TABLE)
                ->where(['calendarId' => $calendarId])
                ->column();

            foreach ($eventIds as $eventId) {
                \Craft::$app->elements->deleteElementById($eventId);
            }

            $affectedRows = \Craft::$app->db
                ->createCommand()
                ->delete('calendar_calendars', ['id' => $calendarId])
                ->execute();

            if ($transaction !== null) {
                $transaction->commit();
            }

            $this->trigger(self::EVENT_AFTER_DELETE, new DeleteModelEvent($calendar));

            return (bool) $affectedRows;
        } catch (\Exception $exception) {
            if ($transaction !== null) {
                $transaction->rollBack();
            }

            throw $exception;
        }
    }

    /**
     * @param null|array $attributes
     *
     * @return CalendarModel[]
     * @throws \Solspace\Calendar\Library\Exceptions\AttributeException
     */
    public function getCalendars($attributes = null): array
    {
        $calendarAttributes = new CalendarAttributes($this->getQuery(), $attributes);
        $query              = $calendarAttributes->getQuery();

        $models  = [];
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
     * @param int $calendarId
     *
     * @return CalendarSiteSettingsModel[] The section’s site-specific settings.
     */
    public function getCalendarSiteSettings(int $calendarId): array
    {
        $table = '{{%calendar_calendar_sites}}';

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
            ->from([$table . ' calendar_calendar_sites'])
            ->innerJoin('{{%sites}} sites', 'sites.[[id]] = calendar_calendar_sites.[[siteId]]')
            ->where(['calendar_calendar_sites.[[calendarId]]' => $calendarId])
            ->orderBy(['sites.[[sortOrder]]' => SORT_ASC])
            ->all();

        foreach ($siteSettings as $key => $value) {
            $siteSettings[$key] = new CalendarSiteSettingsModel($value);
        }

        return $siteSettings;
    }

    /**
     * @param CalendarModel $calendar
     *
     * @return bool
     */
    public function isCalendarPublic(CalendarModel $calendar): bool
    {
        /** @var SettingsService $settings */
        $settings    = Calendar::getInstance()->settings;
        $guestAccess = $settings->getSettingsModel()->guestAccess;

        if ($guestAccess === '*') {
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
     * @param CalendarModel $calendar
     * @param int           $siteId
     *
     * @return bool
     * @throws \yii\base\Exception
     */
    public function isEventTemplateValid(CalendarModel $calendar, int $siteId): bool
    {
        $siteSettings = $calendar->getSiteSettingsForSite($siteId);

        if (!$siteSettings) {
            return null;
        }

        // Set Craft to the site template mode
        $view            = \Craft::$app->getView();
        $oldTemplateMode = $view->getTemplateMode();
        $view->setTemplateMode($view::TEMPLATE_MODE_SITE);

        // Does the template exist?
        $templateExists = \Craft::$app->getView()->doesTemplateExist((string) $siteSettings->template);

        // Restore the original template mode
        $view->setTemplateMode($oldTemplateMode);

        return $templateExists;
    }

    /**
     * @param SiteEvent $event
     *
     * @return bool
     */
    public function addSiteHandler(SiteEvent $event): bool
    {
        $siteId = $event->site->id;

        $rows      = [];
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
            ->execute();

        return true;
    }

    /**
     * @return Query
     */
    private function getQuery(): Query
    {
        return (new Query())
            ->select(
                [
                    'calendar.[[id]]',
                    'calendar.[[name]]',
                    'calendar.[[handle]]',
                    'calendar.[[description]]',
                    'calendar.[[color]]',
                    'calendar.[[fieldLayoutId]]',
                    'calendar.[[titleFormat]]',
                    'calendar.[[titleLabel]]',
                    'calendar.[[hasTitleField]]',
                    'calendar.[[descriptionFieldHandle]]',
                    'calendar.[[locationFieldHandle]]',
                    'calendar.[[icsHash]]',
                ]
            )
            ->from(CalendarRecord::TABLE . ' calendar')
            ->orderBy(['name' => SORT_ASC]);
    }

    /**
     * @param array $data
     *
     * @return CalendarModel
     */
    private function createModel(array $data): CalendarModel
    {
        return new CalendarModel($data);
    }
}
