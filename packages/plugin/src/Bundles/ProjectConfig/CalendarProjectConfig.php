<?php

namespace Solspace\Calendar\Bundles\ProjectConfig;

use craft\db\Query;
use craft\db\Table;
use craft\events\ConfigEvent;
use craft\helpers\Db;
use craft\helpers\Json;
use craft\helpers\ProjectConfig as ProjectConfigHelper;
use craft\helpers\StringHelper;
use craft\models\FieldLayout;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SchedulingSettings;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Records\CalendarSiteSettingsRecord;
use yii\base\InvalidConfigException;

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

    public function handleChange(ConfigEvent $event): void
    {
        $uid = $event->tokenMatches[0];
        $id = Db::idByUid(CalendarRecord::TABLE, $uid);

        $newType = $event->newValue['type'] ?? CalendarModel::TYPE_EVENTS;
        if (!\in_array($newType, [CalendarModel::TYPE_EVENTS, CalendarModel::TYPE_SCHEDULING], true)) {
            throw new InvalidConfigException('Unknown calendar type.');
        }
        if ($id) {
            $oldType = (new Query())->select('type')->from(CalendarRecord::TABLE)->where(['id' => $id])->scalar();
            if ($newType !== $oldType && Calendar::getInstance()->calendars->hasCalendarContent((int) $id)) {
                throw new InvalidConfigException('The calendar type cannot be changed while events or bookings exist.');
            }
        }
        if ('scheduling' === $newType) {
            $settings = new SchedulingSettings($event->newValue['scheduling'] ?? []);
            if (!$settings->validate()) {
                throw new InvalidConfigException(implode(' ', $settings->getErrorSummary(true)));
            }
        }

        ProjectConfigHelper::ensureAllFieldsProcessed();
        ProjectConfigHelper::ensureAllUserGroupsProcessed();
        ProjectConfigHelper::ensureAllSitesProcessed();

        $fieldLayoutId = $this->handleFieldLayout($id, $event->newValue['fieldLayout']);

        $payload = [
            'type' => $event->newValue['type'] ?? CalendarModel::TYPE_EVENTS,
            'scheduling' => Json::encode($event->newValue['scheduling'] ?? []),
            'uid' => $uid,
            'name' => $event->newValue['name'],
            'handle' => $event->newValue['handle'],
            'description' => $event->newValue['description'],
            'color' => $event->newValue['color'],
            'titleTranslationMethod' => $event->newValue['titleTranslationMethod'],
            'titleTranslationKeyFormat' => $event->newValue['titleTranslationKeyFormat'],
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
        Calendar::getInstance()->calendars->clearCaches();
    }

    public function handleRemove(ConfigEvent $event): void
    {
        $uid = $event->tokenMatches[0];
        $id = Db::idByUid(CalendarRecord::TABLE, $uid);
        if (!$id) {
            return;
        }

        foreach (Booking::find()->calendarId($id)->status(null)->trashed(null)->all() as $booking) {
            \Craft::$app->elements->deleteElement($booking, true);
        }

        $this->removeSiteSettingsFor($id);

        \Craft::$app->db->createCommand()
            ->delete(CalendarRecord::TABLE, ['id' => $id])
            ->execute()
        ;
    }

    public function removeSiteSettingsFor(int $calendarId): void
    {
        \Craft::$app->db->createCommand()
            ->delete(CalendarSiteSettingsRecord::TABLE, ['calendarId' => $calendarId])
            ->execute()
        ;
    }

    private function handleFieldLayout($calendarId = null, ?array $data = null)
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
            $layout->uid = StringHelper::UUID();
            $layout->type = Event::class;

            \Craft::$app->getFields()->saveLayout($layout);

            return $layout->id;
        }
    }

    private function changeSiteSettings($calendarId, array $siteSettings): void
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
