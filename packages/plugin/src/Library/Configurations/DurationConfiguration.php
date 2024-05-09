<?php

namespace Solspace\Calendar\Library\Configurations;

use Solspace\Calendar\Calendar;

class DurationConfiguration
{
    public ?int $firstDay = null;

    public function __construct(array $config = [])
    {
        \Craft::configure($this, $config);

        if (null === $this->firstDay) {
            $this->firstDay = Calendar::getInstance()->settings->getFirstDayOfWeek();
        }
    }
}
