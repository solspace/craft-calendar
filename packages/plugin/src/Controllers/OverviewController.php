<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\helpers\Cp;
use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Library\Helpers\SitesHelper;
use Solspace\Calendar\Resources\Bundles\OverviewBundle;
use yii\web\Response;

class OverviewController extends BaseController
{
    private bool $isCraft5 = true;

    public function init(): void
    {
        $this->isCraft5 = version_compare(\Craft::$app->getVersion(), '5.0.0', '>=');

        parent::init();
    }

    public function actionIndex(?string $year = null, ?string $month = null, ?string $day = null): Response
    {
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
            'label' => Calendar::t('Overview'),
            'url' => UrlHelper::cpUrl('calendar/overview'),
            'current' => true,
        ];

        $enabledSiteIds = Calendar::getInstance()->calendarSites->getAllEnabledSiteIds();

        $currentSiteId = $site?->id;

        $language = str_replace('_', '-', strtolower($site->language));

        $user = \Craft::$app->getUser()->getIdentity();

        $selectableSiteIds = [];
        foreach ($sites as $editableSite) {
            if (\in_array($editableSite->id, $enabledSiteIds)) {
                $selectableSiteIds[] = $editableSite->id;
            }
        }

        $selectedSiteId = $currentSiteId;
        if (!empty($selectableSiteIds) && !\in_array($currentSiteId, $selectableSiteIds)) {
            $selectedSiteId = reset($selectableSiteIds);
        }

        $currentDay = Carbon::createFromDate($year, $month, $day, DateHelper::UTC);

        $calendarOptions = $this->getCalendarService()->getAllAllowedCalendarTitles($selectedSiteId);

        $configuration = [
            'calendars' => $calendarOptions,
            'formats' => DateFormatHelper::toConfig(),
            'language' => $language,
            'currentDay' => $currentDay->toDateString(),
            'currentSiteId' => $selectedSiteId,
            'canEditEvents' => $user
                && (
                    PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR_ALL)
                    || PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR, true)
                )
                && !empty($calendarOptions),
            'isMultiSite' => \Craft::$app->getIsMultiSite(),
            'isQuickCreateEnabled' => $this->getSettingsService()->isQuickCreateEnabled(),
            'isDragAndDropEnabled' => $this->getSettingsService()->isDragAndDropEnabled(),
            'weekStartDay' => $this->getSettingsService()->getFirstDayOfWeek(),
            'overlapThreshold' => $this->getSettingsService()->getOverlapThreshold(),
            'timeInterval' => $this->getSettingsService()->getTimeInterval(),
            'eventDuration' => $this->getSettingsService()->getEventDuration(),
            'allDayDefault' => $this->getSettingsService()->isAllDayDefault(),
        ];

        $this->view->registerAssetBundle(OverviewBundle::class);

        return $this->renderTemplate('calendar/overview', [
            'isCraft5' => $this->isCraft5,
            'crumbs' => $crumbs,
            'configuration' => $configuration,
        ]);
    }
}
