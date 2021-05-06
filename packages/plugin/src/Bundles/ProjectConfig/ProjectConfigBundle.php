<?php

namespace Solspace\Calendar\Bundles\ProjectConfig;

use craft\db\Table;
use craft\events\RebuildConfigEvent;
use craft\helpers\Db;
use craft\services\ProjectConfig;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Records\CalendarRecord;
use yii\base\Event;

class ProjectConfigBundle implements BundleInterface
{
    public function __construct()
    {
        Event::on(ProjectConfig::class, ProjectConfig::EVENT_REBUILD, [$this, 'rebuildConfig']);
    }

    public function rebuildConfig(RebuildConfigEvent $event)
    {
        if (isset($event->config['solspace'])) {
            $event->config['solspace'] = ['calendar' => []];
        }

        $event->config['solspace']['calendar'] = $this->buildProjectConfig();
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
