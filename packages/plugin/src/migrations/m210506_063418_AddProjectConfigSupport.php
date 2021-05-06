<?php

namespace Solspace\Calendar\migrations;

use Craft;
use craft\db\Migration;
use craft\db\Query;
use craft\db\Table;
use craft\helpers\Db;
use Solspace\Calendar\Records\CalendarRecord;

/**
 * m210506_063418_AddProjectConfigSupport migration.
 */
class m210506_063418_AddProjectConfigSupport extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        // Don't make the same config changes twice
        $projectConfig = Craft::$app->getProjectConfig();
        $schemaVersion = $projectConfig->get('plugins.calendar.schemaVersion', true);
        if (version_compare($schemaVersion, '3.3.0', '>=')) {
            return null;
        }

        $projectConfig->set('solspace.calendar', $this->buildProjectConfig());

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m210506_063418_AddProjectConfigSupport cannot be reverted.\n";

        return false;
    }

    private function buildProjectConfig(): array
    {
        return [
            'calendars' => $this->buildCalendarConfig(),
            'calendar-sites' => $this->buildCalendarSitesConfig(),
        ];
    }

    private function buildCalendarConfig(): array
    {
        $calendars = (new Query())
            ->select(
                [
                    'calendar.[[id]]',
                    'calendar.[[uid]]',
                    'calendar.[[name]]',
                    'calendar.[[handle]]',
                    'calendar.[[description]]',
                    'calendar.[[color]]',
                    'calendar.[[fieldLayoutId]]',
                    'calendar.[[titleFormat]]',
                    'calendar.[[titleLabel]]',
                    'calendar.[[hasTitleField]]',
                    'calendar.[[descriptionFieldHandle]]',
                    'calendar.[[locationFieldHandle]]',
                    'calendar.[[icsHash]]',
                    'calendar.[[icsTimezone]]',
                    'calendar.[[allowRepeatingEvents]]',
                ]
            )
            ->from('{{%calendar_calendars}} calendar')
            ->orderBy(['name' => \SORT_ASC])
            ->all()
        ;

        $config = [];
        foreach ($calendars as $calendar) {
            $config[$calendar['uid']] = [
                'name' => $calendar['name'],
                'handle' => $calendar['handle'],
                'description' => $calendar['description'],
                'color' => $calendar['color'],
                'fieldLayoutId' => $calendar['fieldLayoutId'] ? Db::uidById(Table::FIELDLAYOUTS, $calendar['fieldLayoutId']) : null,
                'titleFormat' => $calendar['titleFormat'],
                'titleLabel' => $calendar['titleLabel'],
                'hasTitleField' => (bool) $calendar['hasTitleField'],
                'descriptionFieldHandle' => $calendar['descriptionFieldHandle'],
                'locationFieldHandle' => $calendar['locationFieldHandle'],
                'icsHash' => $calendar['icsHash'],
                'icsTimezone' => $calendar['icsTimezone'],
                'allowRepeatingEvents' => (bool) $calendar['allowRepeatingEvents'],
            ];
        }

        return $config;
    }

    private function buildCalendarSitesConfig(): array
    {
        $siteSettings = (new Query())
            ->select(
                [
                    'calendarSites.[[id]]',
                    'calendarSites.[[uid]]',
                    'calendarSites.[[calendarId]]',
                    'calendarSites.[[siteId]]',
                    'calendarSites.[[enabledByDefault]]',
                    'calendarSites.[[hasUrls]]',
                    'calendarSites.[[uriFormat]]',
                    'calendarSites.[[template]]',
                ]
            )
            ->from('{{%calendar_calendar_sites}} calendarSites')
            ->orderBy(['id' => \SORT_ASC])
            ->all()
        ;

        $config = [];
        foreach ($siteSettings as $setting) {
            $config[$setting['uid']] = [
                'calendarId' => Db::uidById(CalendarRecord::TABLE, $setting['calendarId']),
                'siteId' => Db::uidById(Table::SITES, $setting['siteId']),
                'enabledByDefault' => (bool) $setting['enabledByDefault'],
                'hasUrls' => (bool) $setting['hasUrls'],
                'uriFormat' => $setting['uriFormat'],
                'template' => $setting['template'],
            ];
        }

        return $config;
    }
}
