<?php

namespace Solspace\Calendar\Library\Helpers;

use craft\models\Site;

class SitesHelper
{
    public static function getCurrentCpSite(): ?Site
    {
        $site = null;

        if (!\Craft::$app->request->isConsoleRequest) {
            $query = \Craft::$app->request->getQueryParam('site');
            if ($query) {
                $site = \Craft::$app->sites->getSiteByHandle($query);
            }
        }

        if (!$site) {
            $site = \Craft::$app->sites->getCurrentSite();
        }

        return $site;
    }

    public static function getEditableSites(): array
    {
        return \Craft::$app->sites->getEditableSites();
    }
}
