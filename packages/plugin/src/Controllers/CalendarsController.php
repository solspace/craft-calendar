<?php

namespace Solspace\Calendar\Controllers;

use craft\db\Query;
use craft\db\Table;
use craft\helpers\Cp;
use craft\helpers\DateTimeHelper;
use craft\helpers\Db;
use craft\helpers\Queue;
use craft\helpers\StringHelper as CraftStringHelper;
use craft\helpers\UrlHelper;
use craft\models\FieldLayout;
use craft\models\FieldLayoutTab;
use craft\queue\jobs\UpdateElementSlugsAndUris;
use craft\records\Field;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Library\Helpers\SitesHelper;
use Solspace\Calendar\Library\Helpers\StringHelper as FreeformStringHelper;
use Solspace\Calendar\Library\Scheduling\Availability;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Resources\Bundles\CalendarIndexBundle;
use yii\base\InvalidConfigException;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\HttpException;
use yii\web\Response;

class CalendarsController extends BaseController
{
    private bool $isCraft5 = true;

    /**
     * @throws ForbiddenHttpException
     */
    public function init(): void
    {
        if (!PermissionHelper::canAccessCalendars()) {
            PermissionHelper::requirePermission(Calendar::PERMISSION_CALENDARS);
        }

        if (
            version_compare(\Craft::$app->getVersion(), '3.1', '>=')
            && !\Craft::$app->getConfig()->getGeneral()->allowAdminChanges
        ) {
            throw new ForbiddenHttpException(Calendar::t('Administrative changes are disallowed in this environment.'));
        }

        $this->isCraft5 = version_compare(\Craft::$app->getVersion(), '5.0.0', '>=');

        parent::init();
    }

    public function actionCalendarsIndex(): Response
    {
        \Craft::$app->view->registerAssetBundle(CalendarIndexBundle::class);

        $crumbs = [
            [
                'label' => Calendar::t(Calendar::getInstance()->name),
                'url' => UrlHelper::cpUrl('calendar'),
            ],
            [
                'label' => Calendar::t('Calendars'),
                'url' => UrlHelper::cpUrl('calendar/calendars'),
                'current' => true,
            ],
        ];

        return $this->renderTemplate(
            'calendar/calendars',
            [
                'isCraft5' => $this->isCraft5,
                'crumbs' => $crumbs,
                'calendars' => $this->getCalendarService()->getAllCalendars(),
            ]
        );
    }

    /**
     * @throws ForbiddenHttpException
     */
    public function actionCreateCalendar(): Response
    {
        PermissionHelper::requirePermission(Calendar::PERMISSION_CREATE_CALENDARS);

        $calendar = CalendarModel::create($this->getSettingsService()->getSettingsModel()->getBookingDefaults());

        $layout = new FieldLayout();
        $layout->type = Event::class;
        $calendar->setFieldLayout($layout);

        return $this->renderEditTemplate($calendar, Calendar::t('Create a new calendar'));
    }

    /**
     * @throws HttpException
     */
    public function actionEditCalendar(string $handle): Response
    {
        $calendar = $this->getCalendarService()->getCalendarByHandle($handle);
        if (!$calendar) {
            throw new HttpException(
                404,
                Calendar::t('Calendar with a handle "{handle}" could not be found', ['handle' => $handle])
            );
        }

        PermissionHelper::requireCalendarEditPermissions($calendar);

        return $this->renderEditTemplate($calendar, $calendar->name);
    }

    public function actionDuplicate(): Response
    {
        $this->requirePostRequest();

        $id = \Craft::$app->request->post('id');
        $calendar = $this->getCalendarService()->getCalendarById($id);

        if (!$calendar) {
            return $this->asFailure(Calendar::t('Could not find calendar'));
        }

        PermissionHelper::requirePermission(Calendar::PERMISSION_CREATE_CALENDARS);
        PermissionHelper::requireCalendarEditPermissions($calendar);

        $data = $calendar->toArray();
        unset($data['id'], $data['uid'], $data['icsHash']);

        $clone = new CalendarModel($data);

        $oldLayout = $calendar->getFieldLayout();
        if ($oldLayout) {
            $layoutData = $oldLayout->toArray();
            unset($layoutData['id'], $layoutData['uid']);

            $newLayout = new FieldLayout($layoutData);
            $newLayout->uid = CraftStringHelper::UUID();

            $newLayoutTabs = [];

            $oldLayoutTabs = $oldLayout->getTabs();

            foreach ($oldLayoutTabs as $oldLayoutTab) {
                $newElements = [];
                foreach ($oldLayoutTab->getElements() as $oldElement) {
                    unset($oldElement['uid']);

                    $oldElement->uid = CraftStringHelper::UUID();
                    $newElements[] = $oldElement;
                }

                $newLayoutTab = new FieldLayoutTab();
                $newLayoutTab->uid = CraftStringHelper::UUID();
                $newLayoutTab->name = $oldLayoutTab->name;
                $newLayoutTab->sortOrder = $oldLayoutTab->sortOrder;
                $newLayoutTab->setLayout($newLayout);
                $newLayoutTab->setElements($newElements);

                $newLayoutTabs[] = $newLayoutTab;
            }

            $newLayout->setTabs($newLayoutTabs);

            $clone->setFieldLayout($newLayout);
        }

        $clonedSiteSettings = [];
        foreach ($calendar->getSiteSettings() as $siteSetting) {
            $clonedSiteSetting = new CalendarSiteSettingsModel($siteSetting->toArray());
            $clonedSiteSetting->uid = CraftStringHelper::UUID();

            $clonedSiteSettings[] = $clonedSiteSetting;
        }
        $clone->setSiteSettings($clonedSiteSettings);

        $handles = (new Query())
            ->select('handle')
            ->from(CalendarRecord::TABLE)
            ->column()
        ;

        $iterator = 0;
        foreach ($handles as $handle) {
            if (preg_match('/^(.*)(\d+)$/', $handle, $matches)) {
                $iterator = max($iterator, (int) $matches[2]);
            }
        }

        ++$iterator;

        $clone->name = preg_replace('/^(.*) \d+$/', '$1', $clone->name).' '.$iterator;
        $clone->handle = preg_replace('/^(.*)\d+$/', '$1', $clone->handle).$iterator;

        if ($this->getCalendarService()->saveCalendar($clone)) {
            return $this->asJson(['success' => true]);
        }

        return $this->asFailure(FreeformStringHelper::implodeRecursively('. ', $clone->getErrorSummary(true)));
    }

    /**
     * Saves a calendar.
     *
     * @throws \Throwable
     * @throws BadRequestHttpException
     * @throws ForbiddenHttpException
     */
    public function actionSaveCalendar(): Response
    {
        $this->requirePostRequest();
        $request = \Craft::$app->request;

        $postedCalendarId = $request->post('calendarId');
        if ($postedCalendarId) {
            $postedCalendar = $this->getCalendarService()->getCalendarById($postedCalendarId);
            if ($postedCalendar) {
                PermissionHelper::requireCalendarEditPermissions($postedCalendar);
            } else {
                PermissionHelper::requirePermission(Calendar::PERMISSION_EDIT_CALENDARS);
            }
        } else {
            PermissionHelper::requirePermission(Calendar::PERMISSION_CREATE_CALENDARS);
        }

        $calendar = $postedCalendar ?? $this->getCalendarService()->getCalendarById($postedCalendarId);
        if (!$calendar) {
            $calendar = new CalendarModel(['scheduling' => $this->getSettingsService()->getSettingsModel()->getBookingDefaults()->toArray()]);
            $calendar->uid = CraftStringHelper::UUID();
        }

        $calendar->name = $request->post('name');
        $calendar->type = (string) $request->getBodyParam('type', $calendar->type);
        if ($calendar->getIsScheduling()) {
            $data = (array) $request->getBodyParam('scheduling', []);
            $settings = $calendar->getSchedulingSettings();
            $settings->timezone = (string) ($data['timezone'] ?? $settings->timezone);
            foreach (['duration', 'increment', 'buffer', 'minimumNotice', 'maximumAdvance'] as $key) {
                $number = filter_var($data[$key] ?? $settings->{$key}, \FILTER_VALIDATE_INT);
                if (false === $number) {
                    throw new BadRequestHttpException(Calendar::t('Booking rules must use whole numbers.'));
                }
                $settings->{$key} = $number;
            }
            foreach (['allowOverlap', 'allowGuests', 'requireApproval'] as $key) {
                $settings->{$key} = \array_key_exists($key, $data) ? !empty($data[$key]) : $settings->{$key};
            }
            $settings->active = \array_key_exists('active', $data) ? !empty($data['active']) : $calendar->getSchedulingSettings()->active;
            foreach (['availableFrom', 'availableUntil'] as $key) {
                $value = $data[$key] ?? null;
                if (\is_array($value)) {
                    if (empty($value['date'])) {
                        $value = null;
                    } else {
                        try {
                            $value = DateTimeHelper::toDateTime($value, true)?->format('Y-m-d') ?? 'invalid';
                        } catch (\Throwable) {
                            $value = 'invalid';
                        }
                    }
                }
                $settings->{$key} = null === $value || '' === $value ? null : (\is_string($value) ? trim($value) : 'invalid');
            }
            $settings->notificationEmail = trim((string) ($data['notificationEmail'] ?? $settings->notificationEmail));
            $settings->hours = array_values((array) (($data['hours'] ?? $settings->hours) ?: []));
            $settings->exceptions = array_values((array) (($data['exceptions'] ?? $settings->exceptions) ?: []));
            foreach (['hours', 'exceptions'] as $group) {
                foreach ($settings->{$group} as &$row) {
                    if (!\is_array($row)) {
                        continue;
                    }
                    foreach (['start' => 'H:i', 'end' => 'H:i', 'dateFrom' => 'Y-m-d', 'dateTo' => 'Y-m-d'] as $key => $format) {
                        if (isset($row[$key]) && \is_array($row[$key])) {
                            try {
                                $parsed = DateTimeHelper::toDateTime($row[$key], true);
                                $row[$key] = $parsed ? $parsed->format($format) : '';
                            } catch (\Throwable) {
                                $row[$key] = '';
                            }
                        }
                    }
                }
                unset($row);
            }

            $calendar->scheduling = $settings->toArray();
        }
        $calendar->handle = $request->post('handle');
        $calendar->description = $request->post('description');
        $calendar->color = $request->post('color');
        $calendar->color = preg_replace('/^([a-z0-9]{6})$/i', '#$1', $calendar->color);
        $calendar->descriptionFieldHandle = $request->post('descriptionFieldHandle');
        $calendar->locationFieldHandle = $request->post('locationFieldHandle');
        $calendar->titleFormat = $request->post('titleFormat');
        $calendar->titleLabel = $request->post('titleLabel');
        if ($calendar->getIsScheduling() && !$calendar->titleLabel) {
            $calendar->titleLabel = 'Title';
        }
        $calendar->hasTitleField = $calendar->getIsScheduling() || (bool) $request->post('hasTitleField');
        $calendar->titleTranslationMethod = $request->post('titleTranslationMethod');
        $calendar->titleTranslationKeyFormat = $request->post('titleTranslationKeyFormat');
        $calendar->icsTimezone = $request->post('icsTimezone');
        $calendar->allowRepeatingEvents = !$calendar->getIsScheduling() && (bool) $request->post('allowRepeatingEvents');

        // Set the field layout
        $fieldLayout = \Craft::$app->getFields()->assembleLayoutFromPost();
        $fieldLayout->uid = $fieldLayout->id ? Db::uidById(Table::FIELDLAYOUTS, $fieldLayout->id) : CraftStringHelper::UUID();
        $fieldLayout->type = Event::class;
        $calendar->setFieldLayout($fieldLayout);

        if ($fieldLayout) {
            $fieldHandles = [];

            /** @var Field $field */
            foreach ($fieldLayout->getCustomFields() as $field) {
                $fieldHandles[] = $field->handle;
            }

            $descriptionFieldHandle = $calendar->descriptionFieldHandle;
            $locationFieldHandle = $calendar->locationFieldHandle;

            if ($descriptionFieldHandle && !\in_array($descriptionFieldHandle, $fieldHandles, true)) {
                $calendar->descriptionFieldHandle = null;
            }

            if ($locationFieldHandle && !\in_array($locationFieldHandle, $fieldHandles, true)) {
                $calendar->locationFieldHandle = null;
            }
        }

        // Set site settings
        $previousSiteSettings = $this->getCalendarSitesService()->getSiteSettingsForCalendar($calendar);
        $newSiteSettings = [];
        $hasUriFormatChanges = false;
        foreach (\Craft::$app->getSites()->getAllSites() as $site) {
            $postedSettings = $request->getBodyParam('sites.'.$site->handle);

            // Skip disabled sites if this is a multi-site install
            if (empty($postedSettings['enabled']) && \Craft::$app->getIsMultiSite()) {
                continue;
            }

            if (isset($previousSiteSettings[$site->id])) {
                $siteSettings = $previousSiteSettings[$site->id];
            } else {
                $siteSettings = new CalendarSiteSettingsModel();
                $siteSettings->uid = CraftStringHelper::UUID();
                $siteSettings->calendarId = $calendar->id;
                $siteSettings->siteId = $site->id;
            }
            if (!empty($postedSettings['uriFormat']) && !empty($previousSiteSettings[$site->id]) && !empty($previousSiteSettings[$site->id]['uriFormat']) && $postedSettings['uriFormat'] !== $previousSiteSettings[$site->id]['uriFormat']) {
                $hasUriFormatChanges = true;
            }

            $siteSettings->hasUrls = !empty($postedSettings['uriFormat']);
            $siteSettings->enabledByDefault = (bool) $postedSettings['enabledByDefault'];

            $siteSettings->uriFormat = $siteSettings->hasUrls ? $postedSettings['uriFormat'] : null;
            $siteSettings->template = $siteSettings->hasUrls ? $postedSettings['template'] : null;

            $newSiteSettings[] = $siteSettings;
        }

        $calendar->setSiteSettings($newSiteSettings);

        // Save it
        if ($this->getCalendarService()->saveCalendar($calendar)) {
            if ($hasUriFormatChanges) {
                $events = Calendar::getInstance()->events->getEventQuery([
                    'calendarId' => $calendar->id,
                ])->all();

                foreach ($events as $event) {
                    Queue::push(new UpdateElementSlugsAndUris([
                        'elementId' => $event->id,
                        'elementType' => $event::class,
                        'updateDescendants' => false,
                    ]));
                }
            }

            \Craft::$app->session->setNotice(Calendar::t('Calendar saved.'));

            return $this->redirectToPostedUrl($calendar);
        }

        \Craft::$app->session->setError(Calendar::t('Couldn’t save calendar.'));

        return $this->renderEditTemplate($calendar, $calendar->name);
    }

    /**
     * Enables the ICS hash for a given calendar
     * Returns the "ics_hash" via ajax response.
     *
     * @throws \Throwable
     * @throws BadRequestHttpException
     * @throws ForbiddenHttpException
     */
    public function actionEnableIcsSharing(): Response
    {
        Calendar::getInstance()->requirePro();

        $this->requirePostRequest();

        $calendarId = \Craft::$app->request->post('calendar_id');

        $calendar = $this->getCalendarService()->getCalendarById($calendarId);

        if (!$calendar) {
            return $this->asFailure(Calendar::t('No calendar exists with the ID "{id}"', ['id' => $calendarId]));
        }

        PermissionHelper::requireCalendarEditPermissions($calendar);

        $icsHash = $calendar->regenerateIcsHash();
        $this->getCalendarService()->saveCalendar($calendar);

        return $this->asJson(['ics_hash' => $icsHash]);
    }

    /**
     * Disables the ICS hash for a given calendar
     * Returns the "success: true" via ajax response.
     *
     * @throws \Throwable
     * @throws BadRequestHttpException
     * @throws ForbiddenHttpException
     */
    public function actionDisableIcsSharing(): Response
    {
        Calendar::getInstance()->requirePro();

        $this->requirePostRequest();

        $calendarId = \Craft::$app->request->post('calendar_id');

        $calendar = $this->getCalendarService()->getCalendarById($calendarId);

        if (!$calendar) {
            return $this->asFailure(Calendar::t('No calendar exists with the ID "{id}"', ['id' => $calendarId]));
        }

        PermissionHelper::requireCalendarEditPermissions($calendar);

        $calendar->icsHash = null;
        $this->getCalendarService()->saveCalendar($calendar);

        return $this->asJson(['success' => true]);
    }

    /**
     * @throws \Throwable
     * @throws BadRequestHttpException
     * @throws ForbiddenHttpException
     */
    public function actionDelete(): Response
    {
        $this->requirePostRequest();

        $calendarId = \Craft::$app->request->post('id');
        $calendar = $this->getCalendarService()->getCalendarById($calendarId);

        if (!$calendar) {
            return $this->asJson(['success' => false]);
        }

        PermissionHelper::requirePermission(Calendar::PERMISSION_DELETE_CALENDARS);
        PermissionHelper::requireCalendarEditPermissions($calendar);

        if ($this->getCalendarService()->deleteCalendarById($calendarId)) {
            return $this->asJson(['success' => true]);
        }

        return $this->asJson(['success' => false]);
    }

    /**
     * @throws InvalidConfigException
     */
    private function renderEditTemplate(CalendarModel $calendar, string $title): Response
    {
        $calendarTypeLocked = $calendar->id && $this->getCalendarService()->hasCalendarContent($calendar->id);
        if ($calendarTypeLocked) {
            // A rejected type change must still display the persisted type and its settings.
            $calendar->type = (string) (new Query())->select('type')->from(CalendarRecord::TABLE)->where(['id' => $calendar->id])->scalar();
        }

        $fieldLayout = $calendar->getFieldLayout();

        if (!$fieldLayout) {
            $fieldLayout = new FieldLayout();
            $calendar->setFieldLayout($fieldLayout);
        }

        if (!$fieldLayout->type || !class_exists($fieldLayout->type)) {
            $fieldLayout->type = Event::class;
        }

        $customFields = \Craft::$app->fields->getAllFields();
        $customFieldData = [];

        /** @var Field $field */
        foreach ($customFields as $field) {
            $customFieldData[$field->id] = [
                'handle' => $field->handle,
                'name' => $field->name,
            ];
        }

        $site = SitesHelper::getCurrentCpSite();
        $sites = SitesHelper::getEditableSites();

        $crumbs = [];

        if ($this->isCraft5 && $site && \Craft::$app->getIsMultiSite()) {
            $crumbs[] = [
                'id' => 'site-crumb',
                'icon' => Cp::earthIcon(),
                'label' => \Craft::t('site', $site->name),
                'menu' => [
                    'label' => \Craft::t('site', 'Select site'),
                    'items' => Cp::siteMenuItems($sites, $site),
                ],
            ];
        }

        $crumbs[] = [
            'label' => Calendar::t(Calendar::getInstance()->name),
            'url' => UrlHelper::cpUrl('calendar'),
        ];

        $crumbs[] = [
            'label' => Calendar::t('Calendars'),
            'url' => UrlHelper::cpUrl('calendar/calendars'),
        ];

        if ($calendar->name === $title) {
            $crumbs[] = [
                'label' => Calendar::t($calendar->name),
                'url' => UrlHelper::cpUrl('calendar/calendars/'.$calendar->handle),
                'current' => true,
            ];
        } else {
            $crumbs[] = [
                'label' => Calendar::t('Create a new calendar'),
                'url' => UrlHelper::cpUrl('calendar/calendars/new'),
                'current' => true,
            ];
        }

        $scheduling = $calendar->getSchedulingSettings();
        $schedulingDates = [];
        foreach (['availableFrom', 'availableUntil'] as $key) {
            $schedulingDates[$key] = Availability::validDate($scheduling->{$key}) ? new \DateTimeImmutable($scheduling->{$key}, new \DateTimeZone($scheduling->timezone)) : null;
        }
        $hours = $scheduling->hours;
        $exceptions = $scheduling->exceptions;
        $zone = new \DateTimeZone(\Craft::$app->getTimeZone());
        foreach ([&$hours, &$exceptions] as &$rows) {
            foreach ($rows as &$row) {
                if (!\is_array($row)) {
                    continue;
                }
                foreach (['start', 'end', 'dateFrom', 'dateTo'] as $key) {
                    if (!empty($row[$key]) && \is_string($row[$key])) {
                        try {
                            $row[$key] = new \DateTimeImmutable($row[$key], $zone);
                        } catch (\Throwable) {
                            $row[$key] = null;
                        }
                    }
                }
            }
            unset($row);
        }
        unset($rows);

        return $this->renderTemplate(
            'calendar/calendars/_edit',
            [
                'isCraft5' => $this->isCraft5,
                'crumbs' => $crumbs,
                'title' => $title,
                'calendar' => $calendar,
                'calendarTypeLocked' => $calendarTypeLocked,
                'scheduling' => $scheduling,
                'schedulingDates' => $schedulingDates,
                'schedulingHours' => $hours,
                'schedulingExceptions' => $exceptions,
                'continueEditingUrl' => 'calendar/calendars/{handle}',
                'customFields' => $customFieldData,
                'timezoneOptions' => DateHelper::getTimezoneOptions(),
                'typeName' => Event::displayName(),
                'lowerTypeName' => Event::lowerDisplayName(),
            ]
        );
    }
}
