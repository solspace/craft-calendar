<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\CarbonInterval;
use Solspace\Calendar\Library\Duration\WeekDuration;

class EventMonth extends AbstractEventCollection
{
    protected function getInterval(): CarbonInterval
    {
        return CarbonInterval::month();
    }

    protected function buildIterableObject(): array
    {
        $weekList = [];

        $config = $this->getDuration()->getConfig();
        $firstDay = ($config->firstDay ?? 0); // 0 to 6, where 0 = Sunday

        $monthStart = $this->getStart();
        $monthEnd = $this->getEnd();

        // day Of Week: 0 = Sun to 6 = Sat
        $startDow = $monthStart->dayOfWeek;
        $endDow = $monthEnd->dayOfWeek;

        // Start = previous firstDay (or same day if already firstDay)
        $shiftToGridStart = (7 + $startDow - $firstDay) % 7;
        $gridStart = $monthStart->copy()->subDays($shiftToGridStart)->startOfDay();

        // End = next (firstDay + 6) (or same day if already last day of week)
        $lastWeekEndDow = ($firstDay + 6) % 7;
        $shiftToGridEnd = (7 + $lastWeekEndDow - $endDow) % 7;
        $gridEnd = $monthEnd->copy()->addDays($shiftToGridEnd);

        $occurrences = $this->getOccurrences();

        for ($cursorStart = $gridStart->copy(); $cursorStart->lte($gridEnd); $cursorStart->addWeek()) {
            $weekList[] = new EventWeek(
                new WeekDuration($cursorStart, $config),
                $occurrences->filterRange($cursorStart, $cursorStart->copy()->addWeek())
            );
        }

        return $weekList;
    }
}
