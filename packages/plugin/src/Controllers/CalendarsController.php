<?php

namespace Solspace\Calendar\Controllers;

use craft\db\Query;
use craft\db\Table;
use craft\helpers\Db;
use craft\helpers\Queue;
use craft\helpers\StringHelper as CraftStringHelper;
use craft\models\FieldLayout;
use craft\models\FieldLayoutTab;
use craft\records\Field;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Jobs\UpdateEventsUriJob;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Library\Helpers\StringHelper as FreeformStringHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Resources\Bundles\CalendarEditBundle;
use Solspace\Calendar\Resources\Bundles\CalendarIndexBundle;
use yii\base\InvalidConfigException;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\HttpException;
use yii\web\Response;

class CalendarsController extends BaseController
{
    /**
     * @throws ForbiddenHttpException
     */
    public function init(): void
    {
        PermissionHelper::requirePermission(Calendar::PERMISSION_CALENDARS);

        if (
            version_compare(\Craft::$app->getVersion(), '3.1', '>=')
            && !\Craft::$app->getConfig()->getGeneral()->allowAdminChanges
        ) {
            throw new ForbiddenHttpException('Administrative changes are disallowed in this environment.');
        }

        parent::init();
    }

    public function actionCalendarsIndex(): Response
    {
        \Craft::$app->view->registerAssetBundle(CalendarIndexBundle::class);

        return $this->renderTemplate(
            'calendar/calendars',
            [
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

        $calendar = CalendarModel::create();

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

        PermissionHelper::requirePermission(Calendar::PERMISSION_EDIT_CALENDARS);

        return $this->renderEditTemplate($calendar, $calendar->name);
    }

    public function actionDuplicate(): Response
    {
        $this->requirePostRequest();

        $id = \Craft::$app->request->post('id');
        $calendar = $this->getCalendarService()->getCalendarById($id);

        if (!$calendar) {
            return $this->asFailure('Could not find calendar');
        }

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
                $newLayoutTab = new FieldLayoutTab();
                $newLayoutTab->name = $oldLayoutTab->name;
                $newLayoutTab->sortOrder = $oldLayoutTab->sortOrder;
                $newLayoutTab->setLayout($newLayout);
                $newLayoutTab->setElements($oldLayoutTab->getElements());

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

        $handleBase = preg_replace('/^(.*)-\d+/', '$1', $calendar->handle);

        $handles = (new Query())
            ->select('handle')
            ->from(CalendarRecord::TABLE)
            ->where(['like', 'handle', $handleBase])
            ->column()
        ;

        $iterator = 0;
        foreach ($handles as $handle) {
            if (preg_match('/-(\d+)$/', $handle, $matches)) {
                $iterator = max($iterator, (int) $matches[1]);
            }
        }

        ++$iterator;

        $clone->name = preg_replace('/^(.*) \d+$/', '$1', $clone->name).' '.$iterator;
        $clone->handle = preg_replace('/^(.*)-\d+$/', '$1', $clone->handle).$iterator;

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
            PermissionHelper::requirePermission(Calendar::PERMISSION_EDIT_CALENDARS);
        } else {
            PermissionHelper::requirePermission(Calendar::PERMISSION_CREATE_CALENDARS);
        }

        $calendar = $this->getCalendarService()->getCalendarById($postedCalendarId);
        if (!$calendar) {
            $calendar = new CalendarModel();
            $calendar->uid = CraftStringHelper::UUID();
        }

        $calendar->name = $request->post('name');
        $calendar->handle = $request->post('handle');
        $calendar->description = $request->post('description');
        $calendar->color = $request->post('color');
        $calendar->color = preg_replace('/^([a-z0-9]{6})$/i', '#$1', $calendar->color);
        $calendar->descriptionFieldHandle = $request->post('descriptionFieldHandle');
        $calendar->locationFieldHandle = $request->post('locationFieldHandle');
        $calendar->titleFormat = $request->post('titleFormat');
        $calendar->titleLabel = $request->post('titleLabel');
        $calendar->hasTitleField = (bool) $request->post('hasTitleField');
        $calendar->titleTranslationMethod = $request->post('titleTranslationMethod');
        $calendar->titleTranslationKeyFormat = $request->post('titleTranslationKeyFormat');
        $calendar->icsTimezone = $request->post('icsTimezone');
        $calendar->allowRepeatingEvents = (bool) $request->post('allowRepeatingEvents');

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
                foreach ($calendar->siteSettings as $siteSetting) {
                    Queue::push(new UpdateEventsUriJob([
                        'calendarId' => $calendar->id,
                        'siteId' => $siteSetting->siteId,
                        'uriFormat' => $siteSetting->uriFormat,
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
        PermissionHelper::requirePermission(Calendar::PERMISSION_EDIT_CALENDARS);
        Calendar::getInstance()->requirePro();

        $this->requirePostRequest();

        $calendarId = \Craft::$app->request->post('calendar_id');

        $calendar = $this->getCalendarService()->getCalendarById($calendarId);

        if (!$calendar) {
            return $this->asFailure(Calendar::t('No calendar exists with the ID "{id}"', ['id' => $calendarId]));
        }

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
        PermissionHelper::requirePermission(Calendar::PERMISSION_EDIT_CALENDARS);
        Calendar::getInstance()->requirePro();

        $this->requirePostRequest();

        $calendarId = \Craft::$app->request->post('calendar_id');

        $calendar = $this->getCalendarService()->getCalendarById($calendarId);

        if (!$calendar) {
            return $this->asFailure(Calendar::t('No calendar exists with the ID "{id}"', ['id' => $calendarId]));
        }

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

        PermissionHelper::requirePermission(Calendar::PERMISSION_DELETE_CALENDARS);

        $calendarId = \Craft::$app->request->post('id');

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
        $customFields = \Craft::$app->fields->getAllFields();
        $customFieldData = [];

        /** @var Field $field */
        foreach ($customFields as $field) {
            $customFieldData[$field->id] = [
                'handle' => $field->handle,
                'name' => $field->name,
            ];
        }

        \Craft::$app->view->registerAssetBundle(CalendarEditBundle::class);

        return $this->renderTemplate(
            'calendar/calendars/_edit',
            [
                'title' => $title,
                'calendar' => $calendar,
                'continueEditingUrl' => 'calendar/calendars/{handle}',
                'customFields' => $customFieldData,
                'timezoneOptions' => DateHelper::getTimezoneOptions(),
                'typeName' => Event::displayName(),
                'lowerTypeName' => Event::lowerDisplayName(),
            ]
        );
    }
}
