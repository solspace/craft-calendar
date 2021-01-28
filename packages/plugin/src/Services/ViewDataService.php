<?php

namespace Solspace\Calendar\Services;

use Carbon\Carbon;
use craft\base\Component;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Library\Duration\DayDuration;
use Solspace\Calendar\Library\Duration\DurationInterface;
use Solspace\Calendar\Library\Duration\HourDuration;
use Solspace\Calendar\Library\Duration\MonthDuration;
use Solspace\Calendar\Library\Duration\WeekDuration;
use Solspace\Calendar\Library\Events\EventDay;
use Solspace\Calendar\Library\Events\EventHour;
use Solspace\Calendar\Library\Events\EventMonth;
use Solspace\Calendar\Library\Events\EventWeek;

class ViewDataService extends Component
{
    /**
     * @throws \Solspace\Calendar\Library\Exceptions\DurationException
     */
    public function getMonth(array $attributes = null): EventMonth
    {
        $targetDate = $this->getDateFromAttributes($attributes);
        DateHelper::updateWeekStartDate($targetDate, $this->getFirstDayFromAttributes($attributes));

        $duration = new MonthDuration($targetDate);
        $eventQuery = $this->getEventQuery($duration, $attributes);

        return new EventMonth($duration, $eventQuery);
    }

    /**
     * @throws \Solspace\Calendar\Library\Exceptions\DurationException
     */
    public function getWeek(array $attributes = null): EventWeek
    {
        $targetDate = $this->getDateFromAttributes($attributes);
        DateHelper::updateWeekStartDate($targetDate, $this->getFirstDayFromAttributes($attributes));

        $duration = new WeekDuration($targetDate);
        $eventQuery = $this->getEventQuery($duration, $attributes);

        return new EventWeek($duration, $eventQuery);
    }

    /**
     * @throws \Solspace\Calendar\Library\Exceptions\DurationException
     */
    public function getDay(array $attributes = null): EventDay
    {
        $duration = new DayDuration($this->getDateFromAttributes($attributes));
        $eventList = $this->getEventQuery($duration, $attributes);

        return new EventDay($duration, $eventList);
    }

    /**
     * @throws \Solspace\Calendar\Library\Exceptions\DurationException
     */
    public function getHour(array $attributes = null): EventHour
    {
        $duration = new HourDuration($this->getDateFromAttributes($attributes));
        $eventQuery = $this->getEventQuery($duration, $attributes);

        return new EventHour($duration, $eventQuery);
    }

    /**
     * @param null|array $attributes
     */
    private function getEventQuery(DurationInterface $duration, $attributes = null): EventQuery
    {
        $eventService = Calendar::getInstance()->events;

        return $eventService->getEventQuery($this->assembleAttributes($duration, $attributes));
    }

    /**
     * Gets a Carbon date instance from $attributes if it's present
     * Today's date Carbon - if not.
     */
    private function getDateFromAttributes(array $attributes = null): Carbon
    {
        if (null === $attributes || !isset($attributes['date'])) {
            $date = 'now';
        } else {
            $date = $attributes['date'];
        }

        return new Carbon($date);
    }

    /**
     * Returns the firstDayOfWeek either from attributes or
     * user preference or craft defaults.
     */
    private function getFirstDayFromAttributes(array $attributes = null): int
    {
        if (null !== $attributes && isset($attributes['firstDay'])) {
            $firstDay = $attributes['firstDay'];

            if (is_numeric($firstDay)) {
                return abs((int) $attributes['firstDay']);
            }

            try {
                $carbon = new Carbon($firstDay);

                return $carbon->dayOfWeek;
            } catch (\Exception $e) {
            }
        }

        return Calendar::getInstance()->settings->getFirstDayOfWeek();
    }

    /**
     * Merges dateRangeStart and dateRangeEnd into attributes based on $duration.
     *
     * @param null|array $attributes
     */
    private function assembleAttributes(DurationInterface $duration, $attributes = null): array
    {
        unset($attributes['date']);

        return array_merge(
            $attributes ?: [],
            [
                'rangeStart' => $duration->getStartDate()->copy()->subWeek(),
                'rangeEnd' => $duration->getEndDate()->copy()->addWeek(),
            ]
        );
    }
}
