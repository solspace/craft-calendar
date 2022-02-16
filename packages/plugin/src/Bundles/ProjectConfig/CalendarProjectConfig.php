<?php

namespace Solspace\Calendar\Bundles\ProjectConfig;

use craft\db\Query;
use craft\db\Table;
use craft\events\ConfigEvent;
use craft\helpers\Db;
use craft\helpers\ProjectConfig as ProjectConfigHelper;
use craft\models\FieldLayout;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Records\CalendarSiteSettingsRecord;

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

        ProjectConfigHelper::ensureAllFieldsProcessed();
        ProjectConfigHelper::ensureAllUserGroupsProcessed();
        ProjectConfigHelper::ensureAllSitesProcessed();

        $fieldLayoutId = $this->handleFieldLayout($id, $event->newValue['fieldLayout']);

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

            $id = Db::idByUid(CalendarRecord::TABLE, $uid);
        } else {
            \Craft::$app->db->createCommand()
                ->update(CalendarRecord::TABLE, $payload, ['id' => $id])
                ->execute()
            ;
        }

        $this->changeSiteSettings($id, $event->newValue['siteSettings']);
    }

    public function handleRemove(ConfigEvent $event)
    {
        $uid = $event->tokenMatches[0];
        $id = Db::idByUid(CalendarRecord::TABLE, $uid);
        if (!$id) {
            return;
        }

        $this->removeSiteSettingsFor($id);

        \Craft::$app->db->createCommand()
            ->delete(CalendarRecord::TABLE, ['id' => $id])
            ->execute()
        ;
    }

    public function removeSiteSettingsFor(int $calendarId)
    {
        \Craft::$app->db->createCommand()
            ->delete(CalendarSiteSettingsRecord::TABLE, ['calendarId' => $calendarId])
            ->execute()
        ;
    }

    private function handleFieldLayout($calendarId = null, array $data = null)
    {
        $uid = $data['uid'] ?? null;
        if (!$uid && $calendarId) {
            $id = (new Query())
                ->select('fieldLayoutId')
                ->from(CalendarRecord::TABLE)
                ->where(['id' => $calendarId])
                ->scalar()
            ;

            if ($id) {
                \Craft::$app->fields->deleteLayoutById($id);
            }

            return null;
        }

        if (!empty($data['tabs'])) {
            $layout = FieldLayout::createFromConfig($data);
            $layout->id = Db::idByUid(Table::FIELDLAYOUTS, $uid);
            $layout->uid = $uid;
            $layout->type = Event::class;

            \Craft::$app->getFields()->saveLayout($layout);

            return $layout->id;
        }
    }

    private function changeSiteSettings($calendarId, array $siteSettings)
    {
        $existingIds = (new Query())
            ->select('id')
            ->from(CalendarSiteSettingsRecord::TABLE)
            ->where(['calendarId' => $calendarId])
            ->column()
        ;

        $usedIds = [];
        foreach ($siteSettings as $uid => $siteSetting) {
            $id = Db::idByUid(CalendarSiteSettingsRecord::TABLE, $uid);
            $usedIds[] = $id;

            $payload = [
                'uid' => $uid,
                'calendarId' => $calendarId,
                'siteId' => Db::idByUid(Table::SITES, $siteSetting['siteId']),
                'enabledByDefault' => $siteSetting['enabledByDefault'],
                'hasUrls' => $siteSetting['hasUrls'],
                'uriFormat' => $siteSetting['uriFormat'],
                'template' => $siteSetting['template'],
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

        $deleteIds = array_diff($existingIds, $usedIds);

        \Craft::$app->db->createCommand()
            ->delete(CalendarSiteSettingsRecord::TABLE, ['id' => $deleteIds])
            ->execute()
        ;
    }
}
