<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\DateHelper;

class HourDuration extends AbstractDuration
{
    /**
     * Duration constructor.
     * Must get a valid start and end date from $targetDate.
     */
    protected function init(Carbon $targetDate)
    {
        $startDate = new Carbon($targetDate->toDateTimeString(), DateHelper::UTC);
        $startDate->minute = 0;
        $startDate->second = 0;

        $endDate = $startDate->copy();
        $endDate->minute = 59;
        $endDate->second = 59;

        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }
}
