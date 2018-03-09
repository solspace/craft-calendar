<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\Carbon;
use Solspace\Calendar\Elements\Event;

interface EventCollectionInterface
{
    /**
     * @return Carbon
     */
    public function getDate(): Carbon;

    /**
     * @return Carbon
     */
    public function getStartDate(): Carbon;

    /**
     * @return Carbon
     */
    public function getEndDate(): Carbon;

    /**
     * @return Event[]
     */
    public function getEvents(): array;
}
