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
     * @param Carbon|null     $rangeStart
     * @param Carbon|null     $rangeEnd
     * @param int|null        $limit
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

        $this->rangeStart      = $rangeStart;
        $this->rangeEnd        = $rangeEnd;
        $this->limit           = $limit;
        $this->loadOccurrences = $loadOccurrences;
    }

    /**
     * @return int|null
     */
    public function getLimit()
    {
        return $this->limit;
    }

    /**
     * @return Carbon|null
     */
    public function getRangeStart()
    {
        return $this->rangeStart;
    }

    /**
     * @return Carbon|null
     */
    public function getRangeEnd()
    {
        return $this->rangeEnd;
    }

    /**
     * @return bool|int|string|null
     */
    public function getLoadOccurrences()
    {
        return $this->loadOccurrences;
    }
}
