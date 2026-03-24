<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\Carbon;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceList;

interface EventCollectionInterface
{
    public function getDate(): Carbon;

    public function getStart(): Carbon;

    public function getEnd(): Carbon;

    public function getOccurrences(): OccurrenceList;

    public function getOccurrenceCount(): int;

    public function containsDate(Carbon $date): bool;
}
