<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;

class DayDuration extends AbstractDuration
{
    protected function init(Carbon $targetDate): void
    {
        $start = $targetDate->copy();
        $start->startOfDay();

        $end = $start->copy();
        $end->addDay();

        $this->start = $start;
        $this->end = $end;
    }
}
