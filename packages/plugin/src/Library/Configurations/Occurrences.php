<?php

namespace Solspace\Calendar\Library\Configurations;

use Carbon\Carbon;

class Occurrences extends CalendarConfiguration
{
    protected Carbon|\DateTime|string|null $rangeStart = null;

    protected Carbon|\DateTime|string|null $rangeEnd = null;

    protected ?int $limit = null;

    public function getRangeStart(): ?Carbon
    {
        return $this->castToCarbon($this->rangeStart);
    }

    public function getRangeEnd(): ?Carbon
    {
        return $this->castToCarbon($this->rangeEnd);
    }

    public function getLimit(): ?int
    {
        return $this->castToInt($this->limit);
    }
}
