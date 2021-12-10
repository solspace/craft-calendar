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
    /** @var int */
    public $id;

    /** @var int */
    public $eventId;

    /** @var Carbon|\DateTime */
    public $date;

    public function __toString(): string
    {
        return $this->date->format('Y-m-d');
    }
}
