<?php

namespace Solspace\Calendar\Library\DataObjects;

use Carbon\Carbon;

class OccurrenceLoader
{
    private ?int $limit = null;

    private ?Carbon $rangeStart = null;

    private ?Carbon $rangeEnd = null;

    private null|bool|int|string $loadOccurrences = null;

    public function __construct(
        ?Carbon $rangeStart = null,
        ?Carbon $rangeEnd = null,
        ?int $limit = null,
        bool|int|string $loadOccurrences = true
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

    public function getLimit(): ?int
    {
        return $this->limit;
    }

    public function getRangeStart(): ?Carbon
    {
        return $this->rangeStart;
    }

    public function getRangeEnd(): ?Carbon
    {
        return $this->rangeEnd;
    }

    public function getLoadOccurrences(): null|bool|int|string
    {
        return $this->loadOccurrences;
    }
}
