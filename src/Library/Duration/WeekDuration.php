<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;

class WeekDuration extends AbstractDuration
{
    /**
     * @param Carbon $targetDate
     */
    protected function init(Carbon $targetDate)
    {
        $startDate = Carbon::createFromTimestampUTC($targetDate->getTimestamp());
        $startDate->startOfWeek();

        $endDate = $startDate->copy();
        $endDate->endOfWeek();
        
        $this->startDate         = $startDate;
        $this->endDate           = $endDate;
    }
}
