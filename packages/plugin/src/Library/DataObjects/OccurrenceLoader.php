<?php

namespace Solspace\Calendar\Library\DataObjects;

use Carbon\Carbon;

class OccurrenceLoader
{
    /** @var int */
    private $limit;

    /** @var Carbon */
    private $rangeStart;

    /** @var Carbon */
    private $rangeEnd;

    /** @var bool|int|string */
    private $loadOccurrences;

    /**
     * OccurrenceLoader constructor.
     *
     * @param bool|int|string $loadOccurrences
     */
    public function __construct(
        Carbon $rangeStart = null,
        Carbon $rangeEnd = null,
        int $limit = null,
        $loadOccurrences = true
    ) {
        if ($rangeStart) {
            $rangeStart->setTime(0, 0, 0);
        }

        if ($rangeEnd) {
            $rangeEnd->setTime(23, 59, 59);
        }

        $this->rangeStart = $rangeStart;
        $this->rangeEnd = $rangeEnd;
        $this->limit = $limit;
        $this->loadOccurrences = $loadOccurrences;
    }

    /**
     * @return null|int
     */
    public function getLimit()
    {
        return $this->limit;
    }

    /**
     * @return null|Carbon
     */
    public function getRangeStart()
    {
        return $this->rangeStart;
    }

    /**
     * @return null|Carbon
     */
    public function getRangeEnd()
    {
        return $this->rangeEnd;
    }

    /**
     * @return null|bool|int|string
     */
    public function getLoadOccurrences()
    {
        return $this->loadOccurrences;
    }
}
