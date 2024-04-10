<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\Helpers\DateHelper;

class WeekDuration extends AbstractDuration
{
    protected function init(Carbon $targetDate/* , ?int $firstDay */): void
    {
        // $firstDay = 4;
        // $lastDay = ($firstDay + 6) % 7;

        /*
        $startDate = new Carbon($targetDate->toDateTimeString(), DateHelper::UTC);
        $startDate->startOfWeek($firstDay);

        $endDate = $startDate->copy();
        $endDate->endOfWeek($lastDay);
        */

        $startDate = new Carbon($targetDate->toDateTimeString(), DateHelper::UTC);
        $startDate->startOfWeek(/* $firstDay */);

        $endDate = $startDate->copy();
        $endDate->endOfWeek(/* $lastDay */);

        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }
}
