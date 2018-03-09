<?php
/**
 * Created by PhpStorm.
 * User: gustavs
 * Date: 26/02/2018
 * Time: 12:17
 */

namespace Solspace\Calendar\Library\Configurations;

use Carbon\Carbon;

class Occurrences extends CalendarConfiguration
{
    /** @var Carbon */
    protected $rangeStart;

    /** @var Carbon */
    protected $rangeEnd;

    /** @var int */
    protected $limit;

    /**
     * @return Carbon|null
     */
    public function getRangeStart()
    {
        return $this->castToCarbon($this->rangeStart);
    }

    /**
     * @return Carbon|null
     */
    public function getRangeEnd()
    {
        return $this->castToCarbon($this->rangeEnd);
    }

    /**
     * @return int|null
     */
    public function getLimit()
    {
        return $this->castToInt($this->limit);
    }
}
