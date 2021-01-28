<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\DateHelper;

class MonthDuration extends AbstractDuration
{
    protected function init(Carbon $targetDate)
    {
        $startDate = new Carbon($targetDate->toDateTimeString(), DateHelper::UTC);
        $startDate->startOfMonth();

        $endDate = $startDate->copy();
        $endDate->endOfMonth();

        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }
}
