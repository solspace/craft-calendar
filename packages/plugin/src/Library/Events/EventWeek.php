<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\CarbonInterval;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Duration\DayDuration;

class EventWeek extends AbstractEventCollection
{
    protected function getInterval(): CarbonInterval
    {
        return CarbonInterval::week();
    }

    /**
     * Builds an iterable object.
     */
    protected function buildIterableObject(EventQuery $eventQuery): array
    {
        $dayList = [];

        // FIXME - this needs to come from template level or calendar settings
        $firstDay = 4;
        $lastDay = ($firstDay + 6) % 7;

        $targetDate = $this->getStartDate()->copy()->startOfWeek($firstDay);
        while ($this->getEndDate()->gt($targetDate)) {
            $dayDuration = new DayDuration($targetDate);
            $eventDay = new EventDay($dayDuration, $eventQuery);

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
