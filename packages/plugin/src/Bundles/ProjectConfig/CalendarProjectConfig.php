<?php

namespace Solspace\Calendar\Bundles\ProjectConfig;

use craft\db\Table;
use craft\events\ConfigEvent;
use craft\helpers\Db;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Records\CalendarRecord;

class CalendarProjectConfig implements BundleInterface
{
    public function __construct()
    {
        \Craft::$app->projectConfig
            ->onAdd(Calendar::CONFIG_CALENDAR_PATH.'.{uid}', [$this, 'handleChange'])
            ->onUpdate(Calendar::CONFIG_CALENDAR_PATH.'.{uid}', [$this, 'handleChange'])
            ->onRemove(Calendar::CONFIG_CALENDAR_PATH.'.{uid}', [$this, 'handleRemove'])
        ;
    }

    public function handleChange(ConfigEvent $event)
    {
        $uid = $event->tokenMatches[0];
        $id = Db::idByUid(CalendarRecord::TABLE, $uid);

        $fieldLayoutId = null;
        if (isset($event->newValue['fieldLayoutId'])) {
            $fieldLayoutId = Db::idByUid(Table::FIELDLAYOUTS, $event->newValue['fieldLayoutId']);
        }

        $payload = [
            'uid' => $uid,
            'name' => $event->newValue['name'],
            'handle' => $event->newValue['handle'],
            'description' => $event->newValue['description'],
            'color' => $event->newValue['color'],
            'descriptionFieldHandle' => $event->newValue['descriptionFieldHandle'],
            'locationFieldHandle' => $event->newValue['locationFieldHandle'],
            'icsHash' => $event->newValue['icsHash'],
            'icsTimezone' => $event->newValue['icsTimezone'],
            'titleFormat' => $event->newValue['titleFormat'],
            'titleLabel' => $event->newValue['titleLabel'],
            'hasTitleField' => $event->newValue['hasTitleField'],
            'allowRepeatingEvents' => $event->newValue['allowRepeatingEvents'],
            'fieldLayoutId' => $fieldLayoutId,
        ];

        if (null === $id) {
            \Craft::$app->db->createCommand()
                ->insert(CalendarRecord::TABLE, $payload)
                ->execute()
            ;
        } else {
            \Craft::$app->db->createCommand()
                ->update(CalendarRecord::TABLE, $payload, ['id' => $id])
                ->execute()
            ;
        }
    }

    public function handleRemove(ConfigEvent $event)
    {
        $uid = $event->tokenMatches[0];
        $id = Db::idByUid(CalendarRecord::TABLE, $uid);
        if (!$id) {
            return;
        }

        \Craft::$app->db->createCommand()
            ->delete(CalendarRecord::TABLE, ['id' => $id])
            ->execute()
        ;
    }
}
