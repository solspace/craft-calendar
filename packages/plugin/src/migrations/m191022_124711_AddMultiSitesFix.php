<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use Solspace\Calendar\Elements\Event;

/**
 * m180628_091905_MigrateSelectDates migration.
 */
class m191022_124711_AddMultiSitesFix extends Migration
{
    public function safeUp(): bool
    {
        $allSites = \Craft::$app->getSites()->getAllSites();

        if (\count($allSites) > 1) {
            $query = Event::find()
                ->setAllowedCalendarsOnly(false)
                ->status(null)
                ->limit(null)
                ->offset(null)
            ;

            /** @var Event[] $events */
            $events = $query->all();

            if ($events) {
                foreach ($events as $event) {
                    foreach ($allSites as $site) {
                        $event->siteId = $site->id;
                        $searchService = \Craft::$app->getSearch();
                        $searchService->indexElementAttributes($event);
                    }
                }
            }
        }

        return true;
    }

    public function safeDown(): bool
    {
        return false;
    }
}
