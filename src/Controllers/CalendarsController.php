<?php

namespace Solspace\Calendar\Controllers;

use craft\records\Field;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Resources\Bundles\CalendarEditBundle;
use Solspace\Calendar\Resources\Bundles\CalendarIndexBundle;
use Solspace\Commons\Helpers\PermissionHelper;
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

        parent::init();
    }

    /**
     * @return Response
     */
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
     * @return Response
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionCreateCalendar(): Response
    {
        PermissionHelper::requirePermission(Calendar::PERMISSION_CREATE_CALENDARS);

        $calendar = CalendarModel::create();

        return $this->renderEditTemplate($calendar, Calendar::t('Create a new calendar'));
    }

    /**
     * @param string $handle
     *
     * @return Response
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

    /**
     * Saves a calendar
     *
     * @return Response
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
        }

        // Shared attributes
        $calendar->id                     = $postedCalendarId;
        $calendar->name                   = $request->post('name');
        $calendar->handle                 = $request->post('handle');
        $calendar->description            = $request->post('description');
        $calendar->color                  = $request->post('color');
        $calendar->descriptionFieldHandle = $request->post('descriptionFieldHandle');
        $calendar->locationFieldHandle    = $request->post('locationFieldHandle');
        $calendar->titleFormat            = $request->post('titleFormat');
        $calendar->titleLabel             = $request->post('titleLabel');
        $calendar->hasTitleField          = (bool) $request->post('hasTitleField');

        // Site-specific settings
        $allSiteSettings = [];

        foreach (\Craft::$app->getSites()->getAllSites() as $site) {
            $postedSettings = $request->getBodyParam('sites.' . $site->handle);

            // Skip disabled sites if this is a multi-site install
            if (empty($postedSettings['enabled']) && \Craft::$app->getIsMultiSite()) {
                continue;
            }

            $siteSettings                   = new CalendarSiteSettingsModel();
            $siteSettings->siteId           = $site->id;
            $siteSettings->hasUrls          = !empty($postedSettings['uriFormat']);
            $siteSettings->enabledByDefault = (bool) $postedSettings['enabledByDefault'];

            if ($siteSettings->hasUrls) {
                $siteSettings->uriFormat = $postedSettings['uriFormat'];
                $siteSettings->template  = $postedSettings['template'];
            } else {
                $siteSettings->uriFormat = null;
                $siteSettings->template  = null;
            }

            $allSiteSettings[$site->id] = $siteSettings;
        }

        $calendar->setSiteSettings($allSiteSettings);


        // Set the field layout
        $fieldLayout       = \Craft::$app->getFields()->assembleLayoutFromPost();
        $fieldLayout->type = Event::class;
        $calendar->setFieldLayout($fieldLayout);

        if ($fieldLayout) {
            $fieldHandles = [];
            /** @var Field $field */
            foreach ($fieldLayout->getFields() as $field) {
                $fieldHandles[] = $field->handle;
            }

            $descriptionFieldHandle = $calendar->descriptionFieldHandle;
            $locationFieldHandle    = $calendar->locationFieldHandle;

            if ($descriptionFieldHandle && !\in_array($descriptionFieldHandle, $fieldHandles, true)) {
                $calendar->descriptionFieldHandle = null;
            }

            if ($locationFieldHandle && !\in_array($locationFieldHandle, $fieldHandles, true)) {
                $calendar->locationFieldHandle = null;
            }
        }

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
     * Returns the "ics_hash" via ajax response
     *
     * @return Response
     * @throws \Throwable
     * @throws \yii\web\BadRequestHttpException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionEnableIcsSharing(): Response
    {
        PermissionHelper::requirePermission(Calendar::PERMISSION_EDIT_CALENDARS);

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
     * Returns the "success: true" via ajax response
     *
     * @return Response
     * @throws \Throwable
     * @throws \yii\web\BadRequestHttpException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionDisableIcsSharing(): Response
    {
        PermissionHelper::requirePermission(Calendar::PERMISSION_EDIT_CALENDARS);

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
     * @return Response
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
     * @param CalendarModel $calendar
     * @param string        $title
     *
     * @return Response
     * @throws \yii\base\InvalidConfigException
     */
    private function renderEditTemplate(CalendarModel $calendar, string $title): Response
    {
        $customFields    = \Craft::$app->fields->getAllFields();
        $customFieldData = [];

        /** @var Field $field */
        foreach ($customFields as $field) {
            $customFieldData[$field->id] = [
                'handle' => $field->handle,
                'name'   => $field->name,
            ];
        }

        \Craft::$app->view->registerAssetBundle(CalendarEditBundle::class);

        return $this->renderTemplate(
            'calendar/calendars/_edit',
            [
                'title'              => $title,
                'calendar'           => $calendar,
                'continueEditingUrl' => 'calendar/calendars/{handle}',
                'customFields'       => $customFieldData,
            ]
        );
    }
}
