<?php

namespace Solspace\Calendar\Library\Events;

use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Duration\WeekDuration;
use Carbon\CarbonInterval;

class EventMonth extends AbstractEventCollection
{
    /**
     * @return CarbonInterval
     */
    protected function getInterval(): CarbonInterval
    {
        return CarbonInterval::month();
    }

    /**
     * @param EventQuery $eventQuery
     *
     * @return array
     */
    protected function buildIterableObject(EventQuery $eventQuery): array
    {
        $weekList = array();

        $targetWeekDate = $this->getDate()->copy();
        $targetEndDate = $this->getEndDate()->copy()->endOfWeek();
        while ($targetEndDate->gt($targetWeekDate)) {
            $weekDuration = new WeekDuration($targetWeekDate);
            $eventWeek    = new EventWeek($weekDuration, $eventQuery);

            $weekList[] = $eventWeek;

            $targetWeekDate->addWeek();
        }

        return $weekList;
    }

    /**
     * @return Event[]
     */
    protected function buildEventCache(): array
    {
        return $this->getEventQuery()->getEventsByMonth($this->getDate());
    }

    /**
     * Builds a list of Events based on specific rules
     * Provided by the child object
     *
     * @param EventQuery $eventQuery
     *
     * @return array|Event[]
     */
    protected function buildEvents(EventQuery $eventQuery): array
    {
        $dayStart = $this->getStartDate();
        $dayEnd   = $this->getEndDate();

        $events = array();
        foreach ($eventQuery->all() as $event) {
            $eventStartDate = $event->getStartDate();
            $eventEndDate   = $event->getEndDate();

            if ($eventEndDate->gte($dayStart) && $eventStartDate->lte($dayEnd)) {
                $events[] = $event;
            }
        }

        return $events;
    }
}
