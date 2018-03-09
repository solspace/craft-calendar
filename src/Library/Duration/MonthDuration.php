<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;

class MonthDuration extends AbstractDuration
{
    /**
     * @param Carbon $targetDate
     */
    protected function init(Carbon $targetDate)
    {
        $startDate = Carbon::createFromTimestampUTC($targetDate->getTimestamp());
        $startDate->startOfMonth();

        $endDate = $startDate->copy();
        $endDate->endOfMonth();

        $this->startDate = $startDate;
        $this->endDate   = $endDate;
    }
}
