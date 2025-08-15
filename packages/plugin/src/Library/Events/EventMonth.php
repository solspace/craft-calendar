<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\CarbonInterval;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Duration\WeekDuration;

class EventMonth extends AbstractEventCollection
{
    protected function getInterval(): CarbonInterval
    {
        return CarbonInterval::month();
    }

    protected function buildIterableObject(EventQuery $eventQuery): array
    {
        $weekList = [];

        $config = $this->getDuration()->getConfig();
        $firstDay = ($config->firstDay ?? 0); // 0 to 6, where 0 = Sunday
        $monthStart = $this->getStartDate()->copy()->startOfDay();
        $monthEnd = $this->getEndDate()->copy()->endOfDay();

        // day Of Week: 0 = Sun to 6 = Sat
        $startDow = $monthStart->dayOfWeek;
        $endDow = $monthEnd->dayOfWeek;

        // Start = previous firstDay (or same day if already firstDay)
        $shiftToGridStart = (7 + $startDow - $firstDay) % 7;
        $gridStart = $monthStart->copy()->subDays($shiftToGridStart)->startOfDay();

        // End = next (firstDay + 6) (or same day if already last day of week)
        $lastWeekEndDow = ($firstDay + 6) % 7;
        $shiftToGridEnd = (7 + $lastWeekEndDow - $endDow) % 7;
        $gridEnd = $monthEnd->copy()->addDays($shiftToGridEnd)->endOfDay();

        for ($cursor = $gridStart->copy(); $cursor->lte($gridEnd); $cursor->addWeek()) {
            $weekList[] = new EventWeek(new WeekDuration($cursor, [], $config), $eventQuery);
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
}
