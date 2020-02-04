<?php


namespace Solspace\Calendar\Library\Transformers;


use Carbon\Carbon;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\RecurrenceHelper;

class UiDataToEventTransformer
{
    /** @var Event */
    private $event;

    /** @var array */
    private $builderData;

    /**
     * UiDataToEventTransformer constructor.
     *
     * @param Event $event
     * @param array $builderData
     */
    public function __construct(Event $event, array $builderData)
    {
        $this->event       = $event;
        $this->builderData = $builderData;
    }

    public function transform()
    {
        $this->resetEvent();

        $data  = $this->builderData;
        $event = $this->event;

        $startDate = Carbon::createFromTimestampUTC($data['dates']['start']);
        $endDate   = Carbon::createFromTimestampUTC($data['dates']['end']);

        $allDay   = $data['allDay'] ?? false;
        $multiDay = $data['multiDay'] ?? false;
        $repeats  = $data['repeats'] ?? false;
        $freq     = $data['freq'] ?? null;

        $byDayInterval = $data['byDayInterval'] ?? 0;

        $interval = $data['interval'] ?? 1;

        $byDay      = $data['byDay'] ?? [];
        $byMonthDay = $data['byMonthDay'] ?? [];
        $byMonth    = $data['byMonth'] ?? [];

        $endRepeatType  = $data['endRepeat']['type'] ?? Event::UNTIL_TYPE_FOREVER;
        $endRepeatDate  = Carbon::createFromTimestampUTC($data['endRepeat']['date'] ?? time());
        $endRepeatCount = $data['endRepeat']['count'] ?? 1;

        $event->startDate          = $startDate;
        $event->startDateLocalized = new Carbon($startDate->toDateTimeString());

        $event->endDate          = $endDate;
        $event->endDateLocalized = new Carbon($endDate->toDateTimeString());

        $event->allDay = $allDay;
        if ($allDay) {
            $event->startDate->setTime(0, 0, 0);
            $event->endDate->setTime(23, 59, 59);
        }

        if (!$multiDay) {
            $event->endDate->setDate(
                $startDate->year,
                $startDate->month,
                $startDate->day
            );
        }

        if (!$repeats) {
            return;
        }

        $event->freq = $freq;
        if ($freq === RecurrenceHelper::SELECT_DATES) {
            return;
        }

        $event->interval = $interval;

        if ($endRepeatType === Event::UNTIL_TYPE_UNTIL) {
            $event->until = $endRepeatDate;
        } else if ($endRepeatType === Event::UNTIL_TYPE_AFTER) {
            $event->count = $endRepeatCount;
        }

        switch ($event->freq) {
            case RecurrenceHelper::WEEKLY:
                $event->byDay = $this->getImploded($byDay);

                break;

            case RecurrenceHelper::MONTHLY:
                if ($byDayInterval !== 0) {
                    $event->byDay = $this->getImploded($this->getDaysWithInterval($byDay, $byDayInterval));
                } else {
                    $event->byMonthDay = $this->getImploded($byMonthDay);
                }

                break;

            case RecurrenceHelper::YEARLY:
                if ($byDayInterval !== 0) {
                    $event->byDay   = $this->getImploded($this->getDaysWithInterval($byDay, $byDayInterval));
                    $event->byMonth = $this->getImploded($byMonth);
                }

                break;
        }

        $event->rrule = $event->getRRuleRFCString();
    }

    /**
     * @return Carbon[]
     */
    public function getExceptions(): array
    {
        return array_map(function ($timestamp) {
            return Carbon::createFromTimestampUTC($timestamp);
        }, $this->builderData['exceptions']);
    }

    /**
     * @return Carbon[]
     */
    public function getSelectDates(): array
    {
        return array_map(function ($timestamp) {
            return Carbon::createFromTimestampUTC($timestamp);
        }, $this->builderData['selectDates']);
    }

    /**
     * @param array|null $values
     *
     * @return string|null
     */
    private function getImploded(array $values = null)
    {
        return $values ? implode(',', $values) : null;
    }

    /**
     * @param array $days
     * @param int   $interval
     *
     * @return array
     */
    private function getDaysWithInterval(array $days, int $interval): array
    {
        return array_map(
            function ($value) use ($interval) {
                return sprintf('%d%s', $interval, $value);
            },
            $days
        );
    }

    private function resetEvent()
    {
        $event = $this->event;

        $event->rrule      = null;
        $event->freq       = null;
        $event->interval   = null;
        $event->until      = null;
        $event->count      = null;
        $event->byDay      = null;
        $event->byMonth    = null;
        $event->byMonthDay = null;
        $event->byYearDay  = null;
    }
}