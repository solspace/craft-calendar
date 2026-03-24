<?php

namespace Solspace\Calendar\Services;

use Carbon\Carbon;
use craft\base\Component;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceList;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceProvider;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Duration\DayDuration;
use Solspace\Calendar\Library\Duration\DurationInterface;
use Solspace\Calendar\Library\Duration\HourDuration;
use Solspace\Calendar\Library\Duration\MonthDuration;
use Solspace\Calendar\Library\Duration\WeekDuration;
use Solspace\Calendar\Library\Events\EventDay;
use Solspace\Calendar\Library\Events\EventHour;
use Solspace\Calendar\Library\Events\EventMonth;
use Solspace\Calendar\Library\Events\EventWeek;
use Solspace\Calendar\Library\Helpers\DateHelper;

class ViewDataService extends Component
{
    public function __construct(
        private OccurrenceProvider $occurrenceProvider,
    ) {
        parent::__construct([]);
    }

    public function getMonth(?array $attributes = null): EventMonth
    {
        $targetDate = $this->getDateFromAttributes($attributes);

        $duration = new MonthDuration($targetDate, $attributes);
        $occurrences = $this->getOccurrences($duration, $attributes);

        return new EventMonth($duration, $occurrences);
    }

    public function getWeek(?array $attributes = null): EventWeek
    {
        $targetDate = $this->getDateFromAttributes($attributes);

        $duration = new WeekDuration($targetDate, $attributes);
        $occurrences = $this->getOccurrences($duration, $attributes);

        return new EventWeek($duration, $occurrences);
    }

    public function getDay(?array $attributes = null): EventDay
    {
        $duration = new DayDuration($this->getDateFromAttributes($attributes), $attributes);
        $occurrences = $this->getOccurrences($duration, $attributes);

        return new EventDay($duration, $occurrences);
    }

    public function getHour(?array $attributes = null): EventHour
    {
        $duration = new HourDuration($this->getDateFromAttributes($attributes), $attributes);
        $occurrences = $this->getOccurrences($duration, $attributes);

        return new EventHour($duration, $occurrences);
    }

    private function getOccurrences(DurationInterface $duration, ?array $attributes = null): OccurrenceList
    {
        $query = $this->occurrenceProvider->createQuery($this->assembleAttributes($duration, $attributes));

        return $this->occurrenceProvider->getOccurrences($query);
    }

    /**
     * Gets a Carbon date instance from $attributes if it's present
     * Today's date Carbon - if not.
     */
    private function getDateFromAttributes(?array $attributes = null): Carbon
    {
        return new Carbon($attributes['date'] ?? 'now', DateHelper::UTC);
    }

    /**
     * Returns the firstDayOfWeek either from attributes or
     * user preference or craft defaults.
     */
    private function getFirstDayFromAttributes(?array $attributes = null): int
    {
        $firstDay = $attributes['firstDay'] ?? null;
        if (is_numeric($firstDay)) {
            return abs((int) $firstDay);
        }

        try {
            return (new Carbon($firstDay, DateHelper::UTC))->dayOfWeek();
        } catch (\Exception $e) {
        }

        return Calendar::getInstance()->settings->getFirstDayOfWeek();
    }

    /**
     * Merges dateRangeStart and dateRangeEnd into attributes based on $duration.
     */
    private function assembleAttributes(DurationInterface $duration, ?array $attributes = null): array
    {
        unset($attributes['date']);

        return array_merge(
            $attributes ?: [],
            [
                'rangeStart' => $duration->getStart(),
                'rangeEnd' => $duration->getEnd(),
            ]
        );
    }
}
