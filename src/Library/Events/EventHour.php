<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\CarbonInterval;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;

class EventHour extends AbstractEventCollection
{
    /**
     * @return CarbonInterval
     */
    protected function getInterval(): CarbonInterval
    {
        return CarbonInterval::hour();
    }

    /**
     * Builds an iterable object
     *
     * @param EventQuery $eventQuery
     *
     * @return array
     */
    protected function buildIterableObject(EventQuery $eventQuery): array
    {
        return array();
    }

    /**
     * @return Event[]
     */
    protected function buildEventCache(): array
    {
        return $this->getEventQuery()->getEventsByHour($this->getDate());
    }
}
