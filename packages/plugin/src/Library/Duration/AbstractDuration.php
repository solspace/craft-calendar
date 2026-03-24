<?php

namespace Solspace\Calendar\Library\Duration;

use Carbon\Carbon;
use Solspace\Calendar\Library\Configurations\DurationConfiguration;
use Solspace\Calendar\Library\Helpers\DateHelper;

abstract class AbstractDuration implements DurationInterface
{
    protected Carbon $start;
    protected Carbon $startLocalized;
    protected Carbon $end;
    protected Carbon $endLocalized;
    protected DurationConfiguration $config;

    final public function __construct(
        Carbon $targetDate,
        array|DurationConfiguration $config = [],
    ) {
        $this->config = \is_array($config) ? new DurationConfiguration($config) : $config;
        $this->init($targetDate);

        $this->start = $this->start->setTimezone(DateHelper::UTC);
        $this->end = $this->end->setTimezone(DateHelper::UTC);

        $this->startLocalized = new Carbon($this->start->toDateTimeString());
        $this->endLocalized = new Carbon($this->end->toDateTimeString());
    }

    final public function getStart(): Carbon
    {
        return $this->start;
    }

    final public function getStartLocalized(): Carbon
    {
        return $this->getStart();
    }

    final public function getEnd(): Carbon
    {
        return $this->end;
    }

    final public function getEndLocalized(): Carbon
    {
        return $this->getEnd();
    }

    /**
     * Checks if the given $date is contained in between $durationStartDate and $durationEndDate.
     */
    public function containsDate(Carbon $date): bool
    {
        return $date->between($this->start, $this->end);
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
