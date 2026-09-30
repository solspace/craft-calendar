<?php

namespace Solspace\Calendar\Models;

use Carbon\Carbon;
use craft\base\Model;

/**
 * @property int       $eventId
 * @property \DateTime $date
 */
class SelectDateModel extends Model
{
    public ?int $id = null;

    public ?int $eventId = null;

    public Carbon|\DateTime|null $date = null;

    public function __toString(): string
    {
        return $this->date->format('Y-m-d');
    }
}
