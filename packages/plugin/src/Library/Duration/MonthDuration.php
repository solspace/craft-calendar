<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\Helpers\DateHelper;

class MonthDuration extends AbstractDuration
{
    protected function init(Carbon $targetDate): void
    {
        $startDate = new Carbon($targetDate->toDateTimeString(), DateHelper::UTC);
        $startDate->startOfMonth();

        $endDate = $startDate->copy();
        $endDate->endOfMonth();

        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }
}
