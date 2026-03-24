<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\CarbonInterval;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Duration\HourDuration;
use Solspace\Calendar\Models\OccurrenceModel;

class EventDay extends AbstractEventCollection
{
    protected function getInterval(): CarbonInterval
    {
        return CarbonInterval::day();
    }

    protected function buildIterableObject(): array
    {
        $currentTime = $this->getStart();

        $hourList = [];
        foreach (range(0, 23) as $hour) {
            $currentTime->hour = $hour;

            $occurrences = $this->occurrences->filter(
                static fn (OccurrenceModel $occurrence) => $occurrence->event->getStartDate()->hour === $hour,
            );

            $hourDuration = new HourDuration($currentTime, $this->getDuration()->getConfig());
            $eventHour = new EventHour(
                $hourDuration,
                $occurrences,
            );

            $hourList[] = $eventHour;
        }

        return $hourList;
    }

    /**
     * Checks if an event matches "allDay" for the given day.
     */
    private function checkIfAllDayEvent(Event $event): bool
    {
        $isAllDay = $event->isAllDay();
        if (!$isAllDay && $event->isMultiDay()) {
            $isAllDay = !$this->containsDate($event->getStartDate()) && !$this->containsDate($event->getEndDate());
        }

        return $isAllDay;
    }
}
