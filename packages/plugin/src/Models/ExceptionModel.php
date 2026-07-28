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
    public ?int $id = null;

    public ?int $eventId = null;

    public null|Carbon|\DateTime $date = null;
}
