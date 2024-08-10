<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\CarbonInterval;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Duration\HourDuration;

class EventDay extends AbstractEventCollection
{
    /** @var Event[] */
    private ?array $allDayEvents = null;

    /** @var Event[] */
    private ?array $nonAllDayEvents = null;

    /**
     * @return Event[]
     */
    public function getNonAllDayEvents(): array
    {
        if (null === $this->nonAllDayEvents) {
            $events = $this->getEvents();

            foreach ($events as $key => $event) {
                if ($this->checkIfAllDayEvent($event)) {
                    unset($events[$key]);
                }
            }

            $this->nonAllDayEvents = $events;
        }

        return $this->nonAllDayEvents;
    }

    public function getNonAllDayEventCount(): int
    {
        return \count($this->getNonAllDayEvents());
    }

    /**
     * @return Event[]
     */
    public function getAllDayEvents(): array
    {
        if (null === $this->allDayEvents) {
            $eventList = [];

            foreach ($this->getEvents() as $event) {
                if ($this->checkIfAllDayEvent($event)) {
                    $eventList[] = $event;
                }
            }

            $this->allDayEvents = $eventList;
        }

        return $this->allDayEvents;
    }

    public function getAllDayEventCount(): int
    {
        return \count($this->getAllDayEvents());
    }

    protected function getInterval(): CarbonInterval
    {
        return CarbonInterval::day();
    }

    /**
     * @return Event[]
     */
    protected function buildEventCache(): array
    {
        return $this->getEventQuery()->getEventsByDay($this->getDate());
    }

    /**
     * Builds an iterable object.
     */
    protected function buildIterableObject(EventQuery $eventQuery): array
    {
        $currentTime = $this->getStartDate();

        $hourList = [];
        foreach (range(0, 23) as $hour) {
            $currentTime->hour = $hour;

            $hourDuration = new HourDuration($currentTime, [], $this->getDuration()->getConfig());
            $eventHour = new EventHour($hourDuration, $eventQuery);

            $hourList[] = $eventHour;
        }

        return $hourList;
    }

    /**
     * Builds a list of Events based on specific rules
     * Provided by the child object.
     *
     * @return array|Event[]
     */
    protected function buildEvents(EventQuery $eventQuery): array
    {
        $dayStart = $this->getStartDate();
        $dayEnd = $this->getEndDate();

        $events = [];
        foreach ($eventQuery->all() as $event) {
            $eventStartDate = $event->getStartDate();
            $eventEndDate = $event->getEndDate();

            if ($eventEndDate->gte($dayStart) && $eventStartDate->lte($dayEnd)) {
                $events[] = $event;
            }
        }

        return $events;
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
