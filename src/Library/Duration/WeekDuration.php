<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\DateHelper;

class WeekDuration extends AbstractDuration
{
    /**
     * @param Carbon $targetDate
     */
    protected function init(Carbon $targetDate)
    {
        $startDate = Carbon::createFromTimestamp($targetDate->getTimestamp(), DateHelper::UTC);
        $startDate->startOfWeek();

        $endDate = $startDate->copy();
        $endDate->endOfWeek();

        $this->startDate = $startDate;
        $this->endDate   = $endDate;
    }
}
