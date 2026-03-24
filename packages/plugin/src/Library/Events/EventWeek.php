<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\CarbonInterval;
use Solspace\Calendar\Library\Duration\DayDuration;

class EventWeek extends AbstractEventCollection
{
    protected function getInterval(): CarbonInterval
    {
        return CarbonInterval::week();
    }

    protected function buildIterableObject(): array
    {
        $dayList = [];

        $targetDate = $this->getStart();
        while ($this->getEnd()->gt($targetDate)) {
            $dayDuration = new DayDuration($targetDate, $this->getDuration()->getConfig());
            $eventDay = new EventDay(
                $dayDuration,
                $this->occurrences->filterRange($targetDate, $targetDate->copy()->addDay())
            );

            $dayList[] = $eventDay;
            $targetDate->addDay();
        }

        return $dayList;
    }
}
