<?php

namespace Solspace\Calendar\Library\Helpers;

use craft\helpers\ArrayHelper;
use craft\helpers\Cp;
use craft\helpers\UrlHelper;
use craft\models\Site;
use Illuminate\Support\Collection;

class CpHelper extends Cp
{
    /**
     * Returns a menu item array for the given sites, possibly grouping them by site group but using specific Calendar URL structure.
     *
     * @param array<int,array{site:Site,status?:string}|Site> $sites
     *
     * @since 5.0.0
     */
    public static function siteMenuItems(
        ?array $sites = null,
        ?Site $selectedSite = null,
        array $config = [],
    ): array {
        if (null === $sites) {
            $sites = \Craft::$app->getSites()->getEditableSites();
        }

        $config += [
            'showSiteGroupHeadings' => null,
            'includeOmittedSites' => false,
        ];

        $items = [];

        $siteGroups = \Craft::$app->getSites()->getAllGroups();
        $config['showSiteGroupHeadings'] ??= \count($siteGroups) > 1;

        // Normalize and index the sites
        /** @var array<int,array{site:Site,status?:string}> $sites */
        $sites = Collection::make($sites)
            ->map(fn (array|Site $site) => $site instanceof Site ? ['site' => $site] : $site)
            ->keyBy(fn (array $site) => $site['site']->id)
            ->all()
        ;

        $request = \Craft::$app->getRequest();
        // Strip off events site handle
        $segments = $request->getSegments();
        array_pop($segments);
        $path = implode('/', $segments);
        $params = $request->getQueryParamsWithoutPath();
        unset($params['fresh']);

        foreach ($siteGroups as $siteGroup) {
            $groupSites = $siteGroup->getSites();
            if (!$config['includeOmittedSites']) {
                $groupSites = array_filter($groupSites, fn (Site $site) => isset($sites[$site->id]));
            }

            if (empty($groupSites)) {
                continue;
            }

            $groupSiteItems = array_map(fn (Site $site) => [
                'status' => $sites[$site->id]['status'] ?? null,
                'label' => \Craft::t('site', $site->name),
                // Use the selected site handle
                'url' => UrlHelper::cpUrl($path.'/'.$site->handle, ['site' => $site->handle] + $params),
                'hidden' => !isset($sites[$site->id]),
                'selected' => $site->id === $selectedSite?->id,
                'attributes' => [
                    'data' => [
                        'site-id' => $site->id,
                    ],
                ],
            ], $groupSites);

            if ($config['showSiteGroupHeadings']) {
                $items[] = [
                    'heading' => \Craft::t('site', $siteGroup->name),
                    'items' => $groupSiteItems,
                    'hidden' => !ArrayHelper::contains($groupSiteItems, fn (array $item) => !$item['hidden']),
                ];
            } else {
                array_push($items, ...$groupSiteItems);
            }
        }

        return $items;
    }
}
