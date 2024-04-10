<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\Helpers\DateHelper;

class MonthDuration extends AbstractDuration
{
    protected function init(Carbon $targetDate/* , ?int $firstDay */): void
    {
        /*
        $lastDay = ($firstDay + 6) % 7;

        $startDate = new Carbon($targetDate->toDateTimeString(), DateHelper::UTC);
        $startDate->startOfWeek($firstDay);
        $startDate->startOfMonth();

        $endDate = $startDate->copy();
        $endDate->endOfWeek($lastDay);
        $endDate->endOfMonth();
        */

        $startDate = new Carbon($targetDate->toDateTimeString(), DateHelper::UTC);
        $startDate->startOfMonth();

        $endDate = $startDate->copy();
        $endDate->endOfMonth();

        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }
}
