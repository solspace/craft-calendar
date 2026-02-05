<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\i18n\Locale;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Resources\Bundles\CalendarAppBundle;
use yii\web\Response;

class AppController extends BaseController
{
    public function actionIndex(?string $year = null, ?string $month = null, ?string $day = null): Response
    {
        $enabledSiteIds = Calendar::getInstance()->calendarSites->getAllEnabledSiteIds();
        $currentSiteId = \Craft::$app->sites->currentSite->id;
        $selectedSiteId = null;

        $user = \Craft::$app->getUser()->getIdentity();

        $siteMap = [];
        if (\Craft::$app->getIsMultiSite()) {
            foreach (\Craft::$app->sites->getAllSites() as $site) {
                if (!$user->can('editSite:'.$site->uid)) {
                    continue;
                }

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

        $currentDay = Carbon::createFromDate($year, $month, $day);

        $dateFormat = Calendar::getInstance()->formats->getDateFormat(null, Locale::FORMAT_PHP);
        $timeFormat = Calendar::getInstance()->formats->getTimeFormat(null, Locale::FORMAT_PHP);

        $language = \Craft::$app->sites->currentSite->language;
        $language = str_replace('_', '-', strtolower($language));

        $calendarOptions = $this->getCalendarService()->getAllAllowedCalendarTitles();

        $this->view->registerAssetBundle(CalendarAppBundle::class);

        return $this->renderTemplate('calendar/app', [
            'currentDay' => $currentDay,
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
        ]);
    }
}
