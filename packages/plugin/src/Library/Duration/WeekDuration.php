<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;

class WeekDuration extends AbstractDuration
{
    protected function init(Carbon $targetDate): void
    {
        $start = $targetDate->copy();

        $start->startOfDay();
        $day = $start->dayOfWeek;
        $firstDay = $this->getConfig()->firstDay;

        $subDays = 0;
        if ($day > $firstDay) {
            $subDays = $day - $firstDay;
        } elseif ($day < $firstDay) {
            $subDays = 7 - $firstDay + $day;
        }

        $start->subDays($subDays);

        $end = $start->copy();
        $end->addWeek();

        $this->start = $start;
        $this->end = $end;
    }
}
