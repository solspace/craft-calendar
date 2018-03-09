<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\Exceptions\DurationException;

abstract class AbstractDuration implements DurationInterface
{
    /** @var Carbon */
    protected $startDate;

    /** @var Carbon */
    protected $endDate;

    /**
     * AbstractDuration constructor.
     *
     * @param Carbon $targetDate
     *
     * @throws DurationException
     */
    final public function __construct(Carbon $targetDate)
    {
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
