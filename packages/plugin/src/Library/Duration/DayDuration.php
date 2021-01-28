<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\DateHelper;

class DayDuration extends AbstractDuration
{
    /**
     * Duration constructor.
     * Must get a valid start and end date from $targetDate.
     */
    protected function init(Carbon $targetDate)
    {
        $startDate = new Carbon($targetDate->toDateTimeString(), DateHelper::UTC);
        $startDate->setTime(0, 0, 0);

        $endDate = $startDate->copy();
        $endDate->setTime(23, 59, 59);

        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }
}
