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
    private static $cachedDates = [];

    /**
     * Returns a list of Calendar_SelectDateModel's if any are found.
     *
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
     * Returns a list of Calendar_SelectDateModel's if any are found.
     *
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

        $hash = $this->getCacheHash($eventId, $rangeStart, $rangeEnd);
        if (!isset(self::$cachedDates[$hash])) {
            $query = (new Query())
                ->select('*')
                ->from(SelectDateRecord::TABLE)
                ->where(['eventId' => $eventId])
                ->orderBy(['date' => \SORT_ASC])
            ;

            if ($rangeStart) {
                $query->andWhere('date >= :startRange', ['startRange' => $rangeStart->format('Y-m-d')]);
            }

            if ($rangeEnd) {
                $query->andWhere('date <= :endRange', ['endRange' => $rangeEnd->format('Y-m-d')]);
            }

            $dates = $query->all();

            $selectDateModels = [];
            foreach ($dates as $data) {
                $model = new SelectDateModel();
                $model->id = (int) $data['id'];
                $model->eventId = (int) $data['eventId'];
                $model->date = new Carbon($data['date'], DateHelper::UTC);

                $selectDateModels[] = $model;
            }

            self::$cachedDates[$hash] = $selectDateModels;
        }

        return self::$cachedDates[$hash];
    }

    /**
     * Returns a list of date strings.
     *
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
     * @param Carbon[] $dates
     */
    public function saveDates(Event $event, array $dates)
    {
        \Craft::$app->db
            ->createCommand()
            ->delete(SelectDateRecord::TABLE, ['eventId' => $event->id])
            ->execute()
    ;

        foreach ($dates as $date) {
            $selectDateRecord = new SelectDateRecord();
            $selectDateRecord->eventId = $event->id;
            $selectDateRecord->date = $date;

            $selectDateRecord->save();
        }
    }

    public function removeDate(Event $event, \DateTime $date)
    {
        $records = SelectDateRecord::findAll(
            [
                'eventId' => $event->id,
                'date' => $date->format('Y-m-d H:i:s'),
            ]
        );

        foreach ($records as $record) {
            $record->delete();
        }
    }

    /**
     * @param \DateTime $rangeStart
     * @param \DateTime $rangeEnd
     */
    private function getCacheHash(int $eventId, \DateTime $rangeStart = null, \DateTime $rangeEnd = null): string
    {
        $string = $eventId;

        if ($rangeStart) {
            $string .= $rangeStart->format('YmdHis');
        }

        if ($rangeEnd) {
            $string .= $rangeEnd->format('YmdHis');
        }

        return sha1($string);
    }
}
