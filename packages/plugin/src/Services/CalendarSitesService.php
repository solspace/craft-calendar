<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use craft\db\Query;
use craft\db\Table;
use craft\helpers\Db;
use craft\queue\jobs\ResaveElements;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Records\CalendarSiteSettingsRecord;

class CalendarSitesService extends Component
{
    /**
     * @return CalendarSiteSettingsModel[]
     */
    public function getAllSiteSettings(): array
    {
        $rows = $this->getQuery()->all();

        $models = [];
        foreach ($rows as $row) {
            $models[] = $this->createModel($row);
        }

        return $models;
    }

    /**
     * @return CalendarSiteSettingsModel[]
     */
    public function getSiteSettingsForCalendar(CalendarModel $calendar): array
    {
        $rows = $this
            ->getQuery()
            ->where(['[[calendarId]]' => $calendar->id])
            ->indexBy('siteId')
            ->all()
        ;

        $models = [];
        foreach ($rows as $row) {
            $models[$row['siteId']] = $this->createModel($row);
        }

        return $models;
    }

    public function save(CalendarModel $calendar, CalendarSiteSettingsModel $siteSettings)
    {
        $projectConfig = \Craft::$app->projectConfig;

        $siteUid = Db::uidById(Table::SITES, $siteSettings->siteId);

        $path = Calendar::CONFIG_CALENDAR_SITES_PATH.'.'.$siteSettings->uid;
        $projectConfig
            ->set(
                $path,
                [
                    'calendarId' => $calendar->uid,
                    'siteId' => $siteUid,
                    'enabledByDefault' => $siteSettings->enabledByDefault,
                    'hasUrls' => $siteSettings->hasUrls,
                    'uriFormat' => $siteSettings->uriFormat,
                    'template' => $siteSettings->template,
                ]
            )
        ;

        if (!$siteSettings->id) {
            $siteSettings->id = Db::idByUid(CalendarSiteSettingsRecord::TABLE, $siteSettings->uid);
        } else {
            \Craft::$app->getQueue()->push(
                new ResaveElements(
                    [
                        'description' => \Craft::t(
                            'app',
                            'Resaving {calendar} events ({site})',
                            ['calendar' => $calendar->name, 'site' => $siteSettings->getSite()->name]
                        ),
                        'elementType' => Event::class,
                        'criteria' => [
                            'siteId' => $siteSettings->siteId,
                            'calendarId' => $calendar->id,
                            'loadOccurrences' => false,
                            'status' => null,
                            'enabledForSite' => false,
                            'limit' => null,
                        ],
                    ]
                )
            );
        }
    }

    public function delete(CalendarSiteSettingsModel $model)
    {
        $path = Calendar::CONFIG_CALENDAR_SITES_PATH.'.'.$model->uid;
        \Craft::$app->projectConfig->remove($path);
    }

    private function getQuery(): Query
    {
        return (new Query())
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
            ->from(CalendarSiteSettingsRecord::TABLE.' calendarSites')
            ->orderBy(['id' => \SORT_ASC])
        ;
    }

    private function createModel(array $data): CalendarSiteSettingsModel
    {
        return new CalendarSiteSettingsModel($data);
    }
}
