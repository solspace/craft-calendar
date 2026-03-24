<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\CarbonInterval;

class EventHour extends AbstractEventCollection
{
    protected function getInterval(): CarbonInterval
    {
        return CarbonInterval::hour();
    }

    protected function buildIterableObject(): array
    {
        return [];
    }
}
