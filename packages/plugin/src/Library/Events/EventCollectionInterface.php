<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\Carbon;
use Solspace\Calendar\Elements\Event;

interface EventCollectionInterface
{
    public function getDate(): Carbon;

    public function getStartDate(): Carbon;

    public function getEndDate(): Carbon;

    /**
     * @return Event[]
     */
    public function getEvents(): array;
}
