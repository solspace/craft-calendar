<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\Configurations\DurationConfiguration;
use Solspace\Calendar\Library\Exceptions\DurationException;

abstract class AbstractDuration implements DurationInterface
{
    protected ?Carbon $startDate = null;

    protected ?Carbon $startDateLocalized = null;

    protected ?Carbon $endDate = null;

    protected ?Carbon $endDateLocalized = null;

    protected DurationConfiguration $config;

    final public function __construct(
        Carbon $targetDate,
        array|DurationConfiguration $config = [],
    ) {
        $this->config = \is_array($config) ? new DurationConfiguration($config) : $config;
        $this->init($targetDate);

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
     * Checks if the given $date is contained in between $durationStartDate and $durationEndDate.
     */
    public function containsDate(Carbon $date): bool
    {
        return $date->between($this->startDate, $this->endDate);
    }

    public function getConfig(): ?DurationConfiguration
    {
        return $this->config;
    }

    /**
     * Initialize all dates.
     */
    abstract protected function init(Carbon $targetDate);
}
