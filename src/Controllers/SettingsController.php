<?php

namespace Solspace\Calendar\Controllers;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Commons\Helpers\PermissionHelper;
use yii\web\Response;

class SettingsController extends BaseController
{
    /**
     * Make sure this controller requires a logged in member
     */
    public function init()
    {
        if (!\Craft::$app->request->getIsConsoleRequest()) {
            $this->requireLogin();
        }
    }

    /**
     * Redirects to the default selected view
     *
     * @return Response
     */
    public function actionDefaultView(): Response
    {
        $defaultView = $this->getSettingsService()->getSettingsModel()->defaultView;

        $canAccessCalendars = PermissionHelper::checkPermission(Calendar::PERMISSION_CALENDARS);
        $canAccessEvents    = PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS);

        $isMonthView     = $defaultView === Calendar::VIEW_MONTH;
        $isWeekView      = $defaultView === Calendar::VIEW_WEEK;
        $isDayView       = $defaultView === Calendar::VIEW_DAY;
        $isEventsView    = $defaultView === Calendar::VIEW_EVENTS;
        $isCalendarsView = $defaultView === Calendar::VIEW_CALENDARS;

        if ($isEventsView && !$canAccessEvents) {
            return $this->redirect(UrlHelper::cpUrl('calendar/view/' . Calendar::VIEW_MONTH));
        }

        if ($isCalendarsView && !$canAccessCalendars) {
            return $this->redirect(UrlHelper::cpUrl('calendar/view/' . Calendar::VIEW_MONTH));
        }

        if ($isMonthView || $isWeekView || $isDayView) {
            return $this->redirect(UrlHelper::cpUrl('calendar/view/' . $defaultView));
        }

        return $this->redirect(UrlHelper::cpUrl('calendar/' . $defaultView));
    }

    /**
     * Renders the General settings page template
     *
     * @return Response
     */
    public function actionGeneral(): Response
    {
        return $this->provideTemplate('general');
    }

    /**
     * Renders the Events settings page template
     *
     * @return Response
     */
    public function actionEvents(): Response
    {
        return $this->provideTemplate('events');
    }

    /**
     * Renders the ICS settings page template
     *
     * @return Response
     */
    public function actionIcs(): Response
    {
        return $this->provideTemplate('ics');
    }

    /**
     * Renders the Field Layout settings page template
     *
     * @return Response
     */
    public function actionFieldLayout(): Response
    {
        return $this->provideTemplate('field_layout');
    }

    /**
     * Renders the General settings page template
     *
     * @return Response
     */
    public function actionGuestAccess(): Response
    {
        $settings = $this->getSettingsService()->getSettingsModel();

        $guestAccess = $settings->guestAccess;
        $calendars   = $this->getCalendarService()->getAllCalendars();

        $calendarOptions = [];
        foreach ($calendars as $calendar) {
            $calendarOptions[$calendar->id] = $calendar->name;
        }

        return $this->provideTemplate(
            'guest_access',
            [
                'guestAccess' => $guestAccess,
                'calendars'   => $calendarOptions,
            ]
        );
    }

    /**
     * Handles layout saving and ICS field special treatment if necessery
     *
     * @return Response
     */
    public function actionSaveSettings(): Response
    {
        PermissionHelper::requirePermission(Calendar::PERMISSION_SETTINGS);

        $this->requirePostRequest();
        $postData = \Craft::$app->request->post('settings', []);

        if (isset($_POST['allowGuestAccess']) && !$_POST['allowGuestAccess']) {
            $postData['guestAccess'] = null;
        }

        if (isset($postData['guestAccess']) && !$postData['guestAccess']) {
            $postData['guestAccess'] = null;
        }

        $plugin = Calendar::getInstance();
        $plugin->setSettings($postData);

        \Craft::$app->plugins->savePluginSettings($plugin, $postData);
        \Craft::$app->session->setNotice(Calendar::t('Settings saved successfully.'));

        return $this->redirectToPostedUrl();
    }

    /**
     * Determines which template has to be rendered based on $template
     * Adds a Freeform_SettingsModel to template variables
     *
     * @param string $template
     * @param array  $variables
     *
     * @return Response
     */
    private function provideTemplate($template, array $variables = []): Response
    {
        PermissionHelper::requirePermission(Calendar::PERMISSION_SETTINGS);

        return $this->renderTemplate(
            'calendar/settings/_' . $template,
            array_merge(
                [
                    'settings' => $this->getSettingsService()->getSettingsModel(),
                ],
                $variables
            )
        );
    }
}
