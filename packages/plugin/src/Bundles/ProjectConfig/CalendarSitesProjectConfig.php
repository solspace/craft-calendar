<?php

namespace Solspace\Calendar\Bundles\ProjectConfig;

use craft\db\Table;
use craft\events\ConfigEvent;
use craft\helpers\Db;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Records\CalendarSiteSettingsRecord;

class CalendarSitesProjectConfig implements BundleInterface
{
    public function __construct()
    {
        \Craft::$app->projectConfig
            ->onAdd(Calendar::CONFIG_CALENDAR_SITES_PATH.'.{uid}', [$this, 'handleChange'])
            ->onUpdate(Calendar::CONFIG_CALENDAR_SITES_PATH.'.{uid}', [$this, 'handleChange'])
            ->onRemove(Calendar::CONFIG_CALENDAR_SITES_PATH.'.{uid}', [$this, 'handleRemove'])
        ;
    }

    public function handleChange(ConfigEvent $event)
    {
        $uid = $event->tokenMatches[0];
        $id = Db::idByUid(CalendarSiteSettingsRecord::TABLE, $uid);

        $payload = [
            'uid' => $uid,
            'calendarId' => Db::idByUid(CalendarRecord::TABLE, $event->newValue['calendarId']),
            'siteId' => Db::idByUid(Table::SITES, $event->newValue['siteId']),
            'enabledByDefault' => $event->newValue['enabledByDefault'],
            'hasUrls' => $event->newValue['hasUrls'],
            'uriFormat' => $event->newValue['uriFormat'],
            'template' => $event->newValue['template'],
        ];

        if (null === $id) {
            \Craft::$app->db->createCommand()
                ->insert(CalendarSiteSettingsRecord::TABLE, $payload)
                ->execute()
            ;
        } else {
            \Craft::$app->db->createCommand()
                ->update(CalendarSiteSettingsRecord::TABLE, $payload, ['id' => $id])
                ->execute()
            ;
        }
    }

    public function handleRemove(ConfigEvent $event)
    {
        $uid = $event->tokenMatches[0];
        $id = Db::idByUid(CalendarSiteSettingsRecord::TABLE, $uid);
        if (!$id) {
            return;
        }

        \Craft::$app->db->createCommand()
            ->delete(CalendarSiteSettingsRecord::TABLE, ['id' => $id])
            ->execute()
        ;
    }
}
