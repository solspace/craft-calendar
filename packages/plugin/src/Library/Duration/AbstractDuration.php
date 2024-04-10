<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Exceptions\DurationException;

abstract class AbstractDuration implements DurationInterface
{
    protected ?Carbon $startDate = null;

    protected ?Carbon $startDateLocalized = null;

    protected ?Carbon $endDate = null;

    protected ?Carbon $endDateLocalized = null;

    /** @var Event[] */
    protected ?array $events = null;

    // protected ?int $firstDay = null;

    /**
     * AbstractDuration constructor.
     *
     * @param Event[] $events
     *
     * @throws DurationException
     */
    final public function __construct(Carbon $targetDate, array $events = []/* , int $firstDay = null */)
    {
        $this->events = $events;
        $this->init($targetDate);
        // $this->firstDay = $firstDay;
        // $this->init($targetDate, $firstDay);

        $this->startDateLocalized = new Carbon($this->startDate->toDateTimeString());
        $this->endDateLocalized = new Carbon($this->endDate->toDateTimeString());

        if (null === $this->startDate) {
            throw new DurationException('Init method hasn\'t instantiated a startDate');
        }

        if (null === $this->endDate) {
            throw new DurationException('Init method hasn\'t instantiated an endDate');
        }
    }

    final public function getStartDate(): Carbon
    {
        return $this->startDate;
    }

    final public function getStartDateLocalized(): Carbon
    {
        return $this->startDateLocalized;
    }

    final public function getEndDate(): Carbon
    {
        return $this->endDate;
    }

    final public function getEndDateLocalized(): Carbon
    {
        return $this->endDateLocalized;
    }

    /**
     * @return Event[]
     */
    public function getEvents(): array
    {
        return $this->events;
    }

    /**
     * Checks if the given $date is contained in between $durationStartDate and $durationEndDate.
     */
    public function containsDate(Carbon $date): bool
    {
        return $date->between($this->startDate, $this->endDate);
    }

    /*
    public function setFirstDay(int $firstDay): void
    {
        $this->firstDay = $firstDay;
    }
    */

    /*
    public function getFirstDay(): ?int
    {
        return $this->firstDay;
    }
    */

    /**
     * Initialize all dates.
     */
    abstract protected function init(Carbon $targetDate/* , ?int $firstDay */);
}
