<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Resources\Bundles\CalendarViewBundle;
use yii\helpers\FormatConverter;
use yii\web\Response;

class ViewController extends BaseController
{
    /**
     * Returns a collection of Event objects based on date ranges
     * for a given month
     *
     * @return Response
     */
    public function actionMonthData(): Response
    {
        $this->requirePostRequest();

        $rangeStart  = \Craft::$app->request->post('rangeStart');
        $rangeEnd    = \Craft::$app->request->post('rangeEnd');
        $calendars   = \Craft::$app->request->post('calendars');
        $nonEditable = \Craft::$app->request->post('nonEditable');
        $siteId      = \Craft::$app->request->post('siteId');

        $criteria = [
            'rangeStart' => $rangeStart,
            'rangeEnd'   => $rangeEnd,
        ];

        $calendarIds = null;
        if ($calendars) {
            if ($calendars !== '*') {
                $criteria['calendarId'] = explode(',', $calendars);
            }
        } else if (null !== $calendars) {
            $criteria['calendarId'] = -1;
        }

        if (\Craft::$app->getIsMultiSite()) {
            $criteria['siteId'] = $siteId ?: \Craft::$app->sites->currentSite->id;
        }

        $eventQuery = $this->getEventsService()->getEventQuery($criteria);

        // Check settings if disabled events should be shown
        if ($this->getSettingsService()->showDisabledEvents()) {
            $eventQuery->status = null;
        }

        return $this->asJson($eventQuery->all());
    }

    /**
     * @param string|null $view
     * @param int|null    $year
     * @param int|null    $month
     * @param int|null    $day
     *
     * @return Response
     */
    public function actionTargetTime(
        string $view = null,
        int $year = null,
        int $month = null,
        int $day = null
    ): Response
    {
        $view         = $view ?? Calendar::VIEW_MONTH;
        $calendarView = $view;

        if ($calendarView === Calendar::VIEW_WEEK) {
            $calendarView = 'agendaWeek';
        } else if ($calendarView === Calendar::VIEW_DAY) {
            $calendarView = 'agendaDay';
        }

        $currentSiteId = \Craft::$app->sites->currentSite->id;
        $siteMap       = [];
        if (\Craft::$app->getIsMultiSite()) {
            foreach (\Craft::$app->sites->getAllSites() as $site) {
                $siteMap[$site->id] = $site->name;
            }
        }

        if (null !== $year) {
            $currentDay = Carbon::createFromDate($year, $month, $day, DateHelper::UTC);
        } else {
            $currentDay = new Carbon(DateHelper::UTC);
        }

        $dateTimeFormats = \Craft::$app->locale->getFormatter()->dateTimeFormats;
        $dateFormat      = $dateTimeFormats[\Craft::$app->locale->getFormatter()->dateFormat]['date'];
        $timeFormat      = $dateTimeFormats[\Craft::$app->locale->getFormatter()->timeFormat]['time'];

        $dateFormat = FormatConverter::convertDateIcuToPhp($dateFormat);
        $timeFormat = FormatConverter::convertDateIcuToPhp($timeFormat, 'time');

        $language         = \Craft::$app->sites->currentSite->language;
        $language         = str_replace('_', '-', strtolower($language));
        $localeModulePath = __DIR__ . '/../Resources/js/lib/fullcalendar/locale/' . $language . '.js';
        if (!file_exists($localeModulePath)) {
            $language = 'en';
        }

        $calendarOptions = $this->getCalendarService()->getAllAllowedCalendarTitles();

        \Craft::$app->view->registerAssetBundle(CalendarViewBundle::class);

        return $this->renderTemplate(
            'calendar/view/calendar',
            [
                'currentDay'           => $currentDay,
                'currentView'          => $view,
                'calendarView'         => $calendarView,
                'calendarLanguage'     => $language,
                'calendarOptions'      => $calendarOptions,
                'isQuickCreateEnabled' => $this->getSettingsService()->isQuickCreateEnabled(),
                'currentSiteId'        => $currentSiteId,
                'siteMap'              => $siteMap,
                'isMultisite'          => \Craft::$app->getIsMultiSite(),
                'dateFormat'           => $dateFormat,
                'timeFormat'           => $timeFormat,
            ]
        );
    }

    /**
     * @return Response
     */
    public function actionMiniCal(): Response
    {
        $targetDate = \Craft::$app->request->post('date');
        $calendars  = \Craft::$app->request->post('calendars');

        return $this->renderTemplate(
            'calendar/_widgets/month/mini-cal',
            [
                'targetDate' => $targetDate,
                'calendars'  => $calendars,
            ]
        );
    }

    /**
     * @return Response
     */
    public function actionDismissDemoAlert(): Response
    {
        $this->requireAdmin();

        $demoDismissed = $this->getSettingsService()->dismissDemoBanner();
        if ($demoDismissed) {
            return $this->asJson('success');
        }

        return $this->asErrorJson('Could not save plugin settings. Plugin not enabled.');
    }
}
