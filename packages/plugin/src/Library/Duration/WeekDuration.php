<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\Helpers\DateHelper;

class WeekDuration extends AbstractDuration
{
    protected function init(Carbon $targetDate): void
    {
        $startDate = new Carbon($targetDate->toDateTimeString(), DateHelper::UTC);

        $startDate->startOfDay();
        $day = $startDate->dayOfWeek;
        $firstDay = $this->getConfig()->firstDay;

        $subDays = 0;
        if ($day > $firstDay) {
            $subDays = $day - $firstDay;
        } elseif ($day < $firstDay) {
            $subDays = 7 - $firstDay + $day;
        }

        $startDate->subDays($subDays);

        $endDate = $startDate->copy();
        $endDate->addDays(6)->endOfDay();

        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }
}
