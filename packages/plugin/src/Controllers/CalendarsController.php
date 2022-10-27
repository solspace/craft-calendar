<?php

namespace Solspace\Calendar\Controllers;

use craft\db\Query;
use craft\db\Table;
use craft\helpers\Db;
use craft\models\FieldLayout;
use craft\records\Field;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Resources\Bundles\CalendarEditBundle;
use Solspace\Calendar\Resources\Bundles\CalendarIndexBundle;
use Solspace\Commons\Helpers\PermissionHelper;
use Solspace\Commons\Helpers\StringHelper;
use yii\web\ForbiddenHttpException;
use yii\web\HttpException;
use yii\web\Response;

class CalendarsController extends BaseController
{
    /**
     * @throws \yii\web\ForbiddenHttpException
     */
    public function init()
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
     * @throws \yii\web\ForbiddenHttpException
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
            return $this->asErrorJson('Could not find calendar');
        }

        $data = $calendar->toArray();
        unset($data['id'], $data['uid'], $data['icsHash']);

        $clone = new CalendarModel($data);

        $oldLayout = $calendar->getFieldLayout();
        if ($oldLayout) {
            $layoutData = $oldLayout->toArray();
            unset($layoutData['id'], $layoutData['uid']);

            $fieldService = \Craft::$app->fields;

            $newLayout = new FieldLayout($layoutData);
            $newLayout->uid = \craft\helpers\StringHelper::UUID();
            $newLayout->setTabs($fieldService->getLayoutTabsById($oldLayout->id));
            $newLayout->setFields($fieldService->getFieldsByLayoutId($oldLayout->id));

            $clone->setFieldLayout($newLayout);
        }

        $clonedSiteSettings = [];
        foreach ($calendar->getSiteSettings() as $siteSetting) {
            $clonedSiteSetting = new CalendarSiteSettingsModel($siteSetting->toArray());
            $clonedSiteSetting->uid = \craft\helpers\StringHelper::UUID();

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

        return $this->asErrorJson(StringHelper::implodeRecursively('. ', $clone->getErrorSummary(true)));
    }

    /**
     * Saves a calendar.
     *
     * @throws \Throwable
     * @throws \yii\web\BadRequestHttpException
     * @throws \yii\web\ForbiddenHttpException
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
            $calendar->uid = \craft\helpers\StringHelper::UUID();
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
        $calendar->icsTimezone = $request->post('icsTimezone');
        $calendar->allowRepeatingEvents = (bool) $request->post('allowRepeatingEvents');

        // Set the field layout
        $fieldLayout = \Craft::$app->getFields()->assembleLayoutFromPost();
        $fieldLayout->uid = $fieldLayout->id ? Db::uidById(Table::FIELDLAYOUTS, $fieldLayout->id) : \craft\helpers\StringHelper::UUID();
        $fieldLayout->type = Event::class;
        $calendar->setFieldLayout($fieldLayout);

        if ($fieldLayout) {
            $fieldHandles = [];

            /** @var Field $field */
            foreach ($fieldLayout->getFields() as $field) {
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
                $siteSettings->uid = \craft\helpers\StringHelper::UUID();
                $siteSettings->calendarId = $calendar->id;
                $siteSettings->siteId = $site->id;
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
     * @throws \yii\web\BadRequestHttpException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionEnableIcsSharing(): Response
    {
        PermissionHelper::requirePermission(Calendar::PERMISSION_EDIT_CALENDARS);
        Calendar::getInstance()->requirePro();

        $this->requirePostRequest();

        $calendarId = \Craft::$app->request->post('calendar_id');

        $calendar = $this->getCalendarService()->getCalendarById($calendarId);

        if (!$calendar) {
            return $this->asErrorJson(Calendar::t('No calendar exists with the ID "{id}"', ['id' => $calendarId]));
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
     * @throws \yii\web\BadRequestHttpException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionDisableIcsSharing(): Response
    {
        PermissionHelper::requirePermission(Calendar::PERMISSION_EDIT_CALENDARS);
        Calendar::getInstance()->requirePro();

        $this->requirePostRequest();

        $calendarId = \Craft::$app->request->post('calendar_id');

        $calendar = $this->getCalendarService()->getCalendarById($calendarId);

        if (!$calendar) {
            return $this->asErrorJson(Calendar::t('No calendar exists with the ID "{id}"', ['id' => $calendarId]));
        }

        $calendar->icsHash = null;
        $this->getCalendarService()->saveCalendar($calendar);

        return $this->asJson(['success' => true]);
    }

    /**
     * @throws \Throwable
     * @throws \yii\web\BadRequestHttpException
     * @throws \yii\web\ForbiddenHttpException
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
     * @throws \yii\base\InvalidConfigException
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
            ]
        );
    }
}
