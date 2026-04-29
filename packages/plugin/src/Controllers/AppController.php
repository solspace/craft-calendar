<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Library\Helpers\DateHelper;
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

        $currentDay = Carbon::createFromDate($year, $month, $day, DateHelper::UTC);

        $language = \Craft::$app->sites->currentSite->language;
        $language = str_replace('_', '-', strtolower($language));

        $calendarOptions = $this->getCalendarService()->getAllAllowedCalendarTitles();

        $configuration = [
            'formats' => DateFormatHelper::toConfig(),
            'siteMap' => $siteMap,
            'language' => $language,
            'currentDay' => $currentDay->toDateString(),
            'currentSiteId' => $selectedSiteId,
            'canEditEvents' => $user && $user->can('calendar-manageEvents') && !empty($calendarOptions),
            'isMultiSite' => \Craft::$app->getIsMultiSite(),
            'isQuickCreateEnabled' => $this->getSettingsService()->isQuickCreateEnabled(),
            'weekStartDay' => $this->getSettingsService()->getFirstDayOfWeek(),
            'overlapThreshold' => $this->getSettingsService()->getOverlapThreshold(),
        ];

        $this->view->registerAssetBundle(CalendarAppBundle::class);

        return $this->renderTemplate('calendar/app', [
            'configuration' => $configuration,
        ]);
    }
}
