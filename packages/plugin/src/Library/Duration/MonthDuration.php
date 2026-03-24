<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;

class MonthDuration extends AbstractDuration
{
    protected function init(Carbon $targetDate): void
    {
        $start = $targetDate->copy();
        $start->startOfMonth();

        $end = $start->copy();
        $end->addMonth();

        $this->start = $start;
        $this->end = $end;
    }
}
