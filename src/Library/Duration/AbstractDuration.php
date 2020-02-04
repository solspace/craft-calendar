<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Exceptions\DurationException;

abstract class AbstractDuration implements DurationInterface
{
    /** @var Carbon */
    protected $startDate;

    /** @var Carbon */
    protected $endDate;

    /** @var Event[] */
    protected $events;

    /**
     * AbstractDuration constructor.
     *
     * @param Carbon  $targetDate
     * @param Event[] $events
     *
     * @throws DurationException
     */
    final public function __construct(Carbon $targetDate, array $events = [])
    {
        $this->events = $events;
        $this->init($targetDate);

        if (null === $this->startDate) {
            throw new DurationException('Init method hasn\'t instantiated a startDate');
        }

        if (null === $this->endDate) {
            throw new DurationException('Init method hasn\'t instantiated an endDate');
        }
    }

    /**
     * Initialize all dates
     *
     * @param Carbon $targetDate
     */
    abstract protected function init(Carbon $targetDate);

    /**
     * @return Carbon
     */
    final public function getStartDate(): Carbon
    {
        return $this->startDate;
    }

    /**
     * @return Carbon
     */
    final public function getEndDate(): Carbon
    {
        return $this->endDate;
    }

    /**
     * @return Event[]
     */
    public function getEvents(): array
    {
        return $this->events;
    }

    /**
     * Checks if the given $date is contained in between $durationStartDate and $durationEndDate
     *
     * @param Carbon $date
     *
     * @return bool
     */
    public function containsDate(Carbon $date): bool
    {
        return $date->between($this->startDate, $this->endDate);
    }
}
