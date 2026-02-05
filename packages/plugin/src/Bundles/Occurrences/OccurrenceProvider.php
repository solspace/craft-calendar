<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use Solspace\Calendar\Elements\Db\OccurrenceQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\OccurrenceModel;
use Solspace\Calendar\Records\OccurrenceRecord;
use Solspace\Calendar\Services\CalendarsService;

class OccurrenceProvider
{
    public function __construct(
        private CalendarsService $calendarsService
    ) {}

    public function createQuery(array $criteria = []): OccurrenceQuery
    {
        return new OccurrenceQuery(OccurrenceRecord::class, $criteria);
    }

    public function getOccurrences(OccurrenceQuery $query): array
    {
        $occurrences = $query->asArray()->all();

        $eventIds = $calendarIds = [];
        foreach ($occurrences as $occurrence) {
            $eventIds[] = $occurrence['eventId'];
            $calendarIds[] = $occurrence['calendarId'];
        }

        $events = Event::find()->where(['id' => $eventIds])->indexBy('id')->all();
        $calendars = $this->calendarsService->getCalendars(['id' => $calendarIds]);

        $models = [];
        foreach ($occurrences as $occurrence) {
            $event = $events[$occurrence['eventId']] ?? null;
            $calendar = $calendars[$occurrence['calendarId']] ?? null;

            if (!$event || !$calendar) {
                continue;
            }

            $startDate = new Carbon($occurrence['startDate']);
            $endDate = new Carbon($occurrence['endDate']);

            $model = new OccurrenceModel([
                'event' => $events[$occurrence['eventId']],
                'calendar' => $calendars[$occurrence['calendarId']],
                'startDate' => $startDate,
                'endDate' => $endDate,
                'allDay' => $occurrence['allDay'] ?? false,
                'dateCreated' => new Carbon($occurrence['dateCreated']),
                'dateUpdated' => new Carbon($occurrence['dateUpdated']),
                'uid' => $occurrence['uid'],
            ]);

            $models[] = $model;
        }

        return $models;
    }
}
