<?php

namespace Solspace\Calendar\Models;

use Carbon\Carbon;
use craft\base\Model;

/**
 * @property int       $eventId
 * @property \DateTime $date
 */
class ExceptionModel extends Model
{
    /** @var int */
    public $id;

    /** @var int */
    public $eventId;

    /** @var Carbon|\DateTime */
    public $date;
}
