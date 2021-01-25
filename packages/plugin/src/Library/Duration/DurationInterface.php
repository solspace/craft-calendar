<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;

interface DurationInterface
{
    /**
     * Duration constructor.
     * Must get a valid start and end date from $targetDate.
     */
    public function __construct(Carbon $targetDate);

    public function getStartDate(): Carbon;

    public function getEndDate(): Carbon;
}
