<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;

interface DurationInterface
{
    /**
     * @return Carbon
     */
    public function getStartDate(): Carbon;

    /**
     * @return Carbon
     */
    public function getEndDate(): Carbon;

    /**
     * Duration constructor.
     * Must get a valid start and end date from $targetDate
     *
     * @param Carbon $targetDate
     */
    public function __construct(Carbon $targetDate);
}
