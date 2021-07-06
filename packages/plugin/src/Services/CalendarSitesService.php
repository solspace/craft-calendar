<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use craft\db\Query;
use Solspace\Calendar\Calendar;
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

    public function getAllEnabledSiteIds(): array
    {
        $rows = $this->getQuery()->all();

        $sites = [];
        foreach ($rows as $row) {
            $sites[] = (int) $row['siteId'];
        }

        return array_unique($sites);
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
                    '[[calendarSites]].[[id]]',
                    '[[calendarSites]].[[uid]]',
                    '[[calendarSites]].[[calendarId]]',
                    '[[calendarSites]].[[siteId]]',
                    '[[calendarSites]].[[enabledByDefault]]',
                    '[[calendarSites]].[[hasUrls]]',
                    '[[calendarSites]].[[uriFormat]]',
                    '[[calendarSites]].[[template]]',
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
