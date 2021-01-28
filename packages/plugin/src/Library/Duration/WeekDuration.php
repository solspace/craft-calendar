<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\DateHelper;

class WeekDuration extends AbstractDuration
{
    protected function init(Carbon $targetDate)
    {
        $startDate = new Carbon($targetDate->toDateTimeString(), DateHelper::UTC);
        $startDate->startOfWeek();

        $endDate = $startDate->copy();
        $endDate->endOfWeek();

        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }
}
