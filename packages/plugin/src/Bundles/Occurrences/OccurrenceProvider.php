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

        /** @var Event[] $events */
        $events = Event::find()->where(['id' => $eventIds])->indexBy('id')->all();
        $calendars = $this->calendarsService->getCalendars(['id' => $calendarIds]);

        $models = [];
        foreach ($occurrences as $occurrence) {
            $event = $events[$occurrence['eventId']] ?? null;
            $calendar = $calendars[$occurrence['calendarId']] ?? null;

            if (!$event || !$calendar) {
                continue;
            }

            $startDate = new Carbon($occurrence['startDate'], $event->timezone);
            $endDate = new Carbon($occurrence['endDate'], $event->timezone);

            $model = new OccurrenceModel();
            $model->event = $event;
            $model->calendar = $calendar;
            $model->startDate = $startDate;
            $model->endDate = $endDate;
            $model->allDay = $occurrence['allDay'] ?? false;
            $model->dateCreated = new Carbon($occurrence['dateCreated']);
            $model->dateUpdated = new Carbon($occurrence['dateUpdated']);
            $model->uid = $occurrence['uid'];

            $models[] = $model;
        }

        return $models;
    }
}
