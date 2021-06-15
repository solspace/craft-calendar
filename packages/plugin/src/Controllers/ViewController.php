<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\i18n\Locale;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Resources\Bundles\CalendarViewBundle;
use yii\web\Response;

class ViewController extends BaseController
{
    /**
     * Returns a collection of Event objects based on date ranges
     * for a given month.
     */
    public function actionMonthData(): Response
    {
        $this->requirePostRequest();

        $rangeStart = \Craft::$app->request->post('rangeStart');
        $rangeEnd = \Craft::$app->request->post('rangeEnd');
        $calendars = \Craft::$app->request->post('calendars');
        $siteId = \Craft::$app->request->post('siteId');

        $criteria = [
            'rangeStart' => $rangeStart,
            'rangeEnd' => $rangeEnd,
        ];

        if ($calendars) {
            if ('*' !== $calendars) {
                $criteria['calendarId'] = explode(',', $calendars);
            }
        } elseif (null !== $calendars) {
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
     * @param null|int $year
     * @param null|int $month
     * @param null|int $day
     */
    public function actionTargetTime(
        string $view = null,
        $year = null,
        $month = null,
        $day = null
    ): Response {
        $view = $view ?? Calendar::VIEW_MONTH;
        $calendarView = $view;

        if (Calendar::VIEW_WEEK === $calendarView) {
            $calendarView = 'agendaWeek';
        } elseif (Calendar::VIEW_DAY === $calendarView) {
            $calendarView = 'agendaDay';
        }

        $enabledSiteIds = Calendar::getInstance()->calendarSites->getAllEnabledSiteIds();

        $currentSiteId = \Craft::$app->sites->currentSite->id;
        $selectedSiteId = null;

        $siteMap = [];
        if (\Craft::$app->getIsMultiSite()) {
            foreach (\Craft::$app->sites->getAllSites() as $site) {
                if (!\in_array($site->id, $enabledSiteIds)) {
                    continue;
                }

                if ($site->id === $currentSiteId) {
                    $selectedSiteId = $currentSiteId;
                }

                $siteMap[$site->id] = $site->name;
            }
        }

        if (null === $selectedSiteId) {
            if (empty($siteMap)) {
                $selectedSiteId = $currentSiteId;
            } else {
                $siteIds = array_keys($siteMap);
                $selectedSiteId = reset($siteIds);
            }
        }

        if (null !== $year) {
            $currentDay = Carbon::createFromDate($year, $month, $day, DateHelper::UTC);
        } else {
            $currentDay = new Carbon(DateHelper::UTC);
        }

        $dateFormat = Calendar::getInstance()->formats->getDateFormat(null, Locale::FORMAT_PHP);
        $timeFormat = Calendar::getInstance()->formats->getTimeFormat(null, Locale::FORMAT_PHP);

        $language = \Craft::$app->sites->currentSite->language;
        $language = str_replace('_', '-', strtolower($language));
        $localeModulePath = __DIR__.'/../Resources/js/lib/fullcalendar/locale/'.$language.'.js';
        if (!file_exists($localeModulePath)) {
            $language = 'en';
        }

        $calendarOptions = $this->getCalendarService()->getAllAllowedCalendarTitles();

        \Craft::$app->view->registerAssetBundle(CalendarViewBundle::class);

        return $this->renderTemplate(
            'calendar/view/calendar',
            [
                'currentDay' => $currentDay,
                'currentView' => $view,
                'calendarView' => $calendarView,
                'calendarLanguage' => $language,
                'calendarOptions' => $calendarOptions,
                'isQuickCreateEnabled' => $this->getSettingsService()->isQuickCreateEnabled(),
                'currentSiteId' => $currentSiteId,
                'siteMap' => $siteMap,
                'selectedSiteId' => $selectedSiteId,
                'isMultiSite' => (bool) \Craft::$app->getIsMultiSite(),
                'dateFormat' => $dateFormat,
                'timeFormat' => $timeFormat,
                'weekStartDay' => $this->getSettingsService()->getFirstDayOfWeek(),
            ]
        );
    }

    public function actionMiniCal(): Response
    {
        $targetDate = \Craft::$app->request->post('date');
        $calendars = \Craft::$app->request->post('calendars');

        return $this->renderTemplate(
            'calendar/_widgets/month/mini-cal',
            [
                'targetDate' => $targetDate,
                'calendars' => $calendars,
            ]
        );
    }

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
