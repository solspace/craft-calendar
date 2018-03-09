<?php

namespace Solspace\Calendar\Library\Events;

use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Duration\DayDuration;
use Carbon\CarbonInterval;

class EventWeek extends AbstractEventCollection
{
    /**
     * @return CarbonInterval
     */
    protected function getInterval(): CarbonInterval
    {
        return CarbonInterval::week();
    }

    /**
     * Builds an iterable object
     *
     * @param EventQuery $eventQuery
     *
     * @return array
     */
    protected function buildIterableObject(EventQuery $eventQuery): array
    {
        $dayList = array();

        $targetDate = $this->getStartDate();
        while ($this->getEndDate()->gt($targetDate)) {
            $dayDuration = new DayDuration($targetDate);
            $eventDay    = new EventDay($dayDuration, $eventQuery);

            $dayList[] = $eventDay;
            $targetDate->addDay();
        }

        return $dayList;
    }

    /**
     * @return Event[]
     */
    protected function buildEventCache(): array
    {
        return $this->getEventQuery()->getEventsByWeek($this->getDate());
    }
}
