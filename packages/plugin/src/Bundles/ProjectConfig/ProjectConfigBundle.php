<?php

namespace Solspace\Calendar\Bundles\ProjectConfig;

use craft\db\Query;
use craft\db\Table;
use craft\events\RebuildConfigEvent;
use craft\helpers\Db;
use craft\services\ProjectConfig;
use Solspace\Calendar\Library\Bundles\BundleInterface;
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
                'fieldLayout' => $this->buildFieldLayoutConfig($calendar['fieldLayoutId'] ?? null),
                'titleFormat' => $calendar['titleFormat'],
                'titleLabel' => $calendar['titleLabel'],
                'hasTitleField' => (bool) $calendar['hasTitleField'],
                'descriptionFieldHandle' => $calendar['descriptionFieldHandle'],
                'locationFieldHandle' => $calendar['locationFieldHandle'],
                'icsHash' => $calendar['icsHash'],
                'icsTimezone' => $calendar['icsTimezone'],
                'allowRepeatingEvents' => (bool) $calendar['allowRepeatingEvents'],
                'siteSettings' => $this->buildCalendarSitesConfig((int) $calendar['id']),
            ];
        }

        return $config;
    }

    private function buildFieldLayoutConfig(int $fieldLayoutId = null)
    {
        if (!$fieldLayoutId) {
            return null;
        }

        $fieldLayout = \Craft::$app->fields->getLayoutById($fieldLayoutId);
        if (!$fieldLayout) {
            return null;
        }

        $config = $fieldLayout->getConfig();
        $config['uid'] = $fieldLayout->uid;

        return $config;
    }

    private function buildCalendarSitesConfig(int $calendarId): array
    {
        $table = '{{%calendar_calendar_sites}}';

        $siteSettings = (new Query())
            ->select(
                [
                    "{$table}.[[id]]",
                    "{$table}.[[uid]]",
                    "{$table}.[[calendarId]]",
                    "{$table}.[[siteId]]",
                    "{$table}.[[enabledByDefault]]",
                    "{$table}.[[hasUrls]]",
                    "{$table}.[[uriFormat]]",
                    "{$table}.[[template]]",
                ]
            )
            ->from($table)
            ->where(['calendarId' => $calendarId])
            ->orderBy(['id' => \SORT_ASC])
            ->all()
        ;

        $config = [];
        foreach ($siteSettings as $setting) {
            $config[$setting['uid']] = [
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
