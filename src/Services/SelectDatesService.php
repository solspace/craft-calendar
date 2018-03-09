<?php

namespace Solspace\Calendar\Services;

use Carbon\Carbon;
use craft\base\Component;
use craft\db\Query;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Models\SelectDateModel;
use Solspace\Calendar\Records\SelectDateRecord;

class SelectDatesService extends Component
{
    /**
     * Returns a list of Calendar_SelectDateModel's if any are found
     *
     * @param Event     $event
     * @param \DateTime $rangeStart
     * @param \DateTime $rangeEnd
     *
     * @return SelectDateModel[]
     */
    public function getSelectDatesForEvent(
        Event $event,
        \DateTime $rangeStart = null,
        \DateTime $rangeEnd = null
    ): array {
        return $this->getSelectDatesForEventId($event->id, $rangeStart, $rangeEnd);
    }

    /**
     * Returns a list of Calendar_SelectDateModel's if any are found
     *
     * @param int       $eventId
     * @param \DateTime $rangeStart
     * @param \DateTime $rangeEnd
     *
     * @return SelectDateModel[]
     */
    public function getSelectDatesForEventId(
        int $eventId,
        \DateTime $rangeStart = null,
        \DateTime $rangeEnd = null
    ): array {
        if (!$eventId) {
            return [];
        }

        $conditions = ['eventId' => $eventId];

        if ($rangeStart) {
            $conditions[] = '>=';
            $conditions[] = 'date';
            $conditions[] = $rangeStart->format('Y-m-d');
        }

        if ($rangeEnd) {
            $conditions[] = '<=';
            $conditions[] = 'date';
            $conditions[] = $rangeStart->format('Y-m-d');
        }

        $selectDateRecords = SelectDateRecord::findAll($conditions);
        $selectDateModels  = [];
        foreach ($selectDateRecords as $record) {
            $model          = new SelectDateModel();
            $model->id      = $record->id;
            $model->eventId = $record->eventId;
            $model->date    = new Carbon($record->date, DateHelper::UTC);

            $selectDateModels[] = $model;
        }

        usort(
            $selectDateModels,
            function (SelectDateModel $dateA, SelectDateModel $dateB) {
                return $dateA <=> $dateB;
            }
        );

        return $selectDateModels;
    }

    /**
     * Returns a list of date strings
     *
     * @param int       $eventId
     * @param \DateTime $rangeStart
     * @param \DateTime $rangeEnd
     *
     * @return Carbon[]
     */
    public function getSelectDatesAsCarbonsForEventId(
        int $eventId,
        \DateTime $rangeStart = null,
        \DateTime $rangeEnd = null
    ): array {
        $selectDates = $this->getSelectDatesForEventId($eventId, $rangeStart, $rangeEnd);

        $dateStrings = [];
        foreach ($selectDates as $date) {
            $dateStrings[] = Carbon::createFromTimestampUTC($date->date->getTimestamp());
        }

        return $dateStrings;
    }

    /**
     * @param Event $event
     * @param array $dates
     */
    public function saveDates(Event $event, array $dates)
    {
        \Craft::$app->db
            ->createCommand()
            ->delete(
                SelectDateRecord::TABLE,
                ['eventId' => $event->id]
            )
            ->execute();

        foreach ($dates as $selectDate) {
            $selectDateRecord          = new SelectDateRecord();
            $selectDateRecord->eventId = $event->id;
            $selectDateRecord->date    = new \DateTime($selectDate);

            $selectDateRecord->save();
        }
    }

    /**
     * @param Event     $event
     * @param \DateTime $date
     */
    public function removeDate(Event $event, \DateTime $date)
    {
        $records = SelectDateRecord::findAll(
            [
                'eventId' => $event->id,
                'date'    => $date->format('Y-m-d H:i:s'),
            ]
        );

        foreach ($records as $record) {
            $record->delete();
        }
    }
}
