<?php
/**
 * Created by PhpStorm.
 * User: gustavs
 * Date: 26/02/2018
 * Time: 12:28
 */

namespace Solspace\Calendar\Library\Configurations;

use Carbon\Carbon;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Commons\Configurations\BaseConfiguration;

class CalendarConfiguration extends BaseConfiguration
{
    /**
     * @param string|\DateTime|Carbon|null $value
     *
     * @return Carbon|null
     */
    protected function castToCarbon($value)
    {
        if (null === $value) {
            return null;
        }

        if (\is_string($value)) {
            return new Carbon($value, DateHelper::UTC);
        }

        if ($value instanceof Carbon) {
            return $value;
        }

        if ($value instanceof \DateTime) {
            return new Carbon($value->format('Y-m-d H:i:s'), DateHelper::UTC);
        }

        return null;
    }
}
