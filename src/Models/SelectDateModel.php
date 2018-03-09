<?php

namespace Solspace\Calendar\Models;

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

    /** @var \DateTime */
    public $date;
}
