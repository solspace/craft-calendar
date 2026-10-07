<?php

namespace Solspace\Calendar\Library\RRule;

use RRule\RRule;
use RRule\RRuleInterface;

/**
 * Parses event rule strings. Their dates are floating, so they're read as UTC wall-clock times.
 *
 * php-rrule reads dates without a timezone in PHP's default timezone, which in the control panel is the
 * user's. That would make the same rule produce different occurrences for different users, because
 * daylight saving moves or skips some wall-clock times, and occurrences are identified by them.
 */
final class RRuleParser
{
    public static function parse(string $rrule): RRuleInterface
    {
        $timezone = date_default_timezone_get();
        date_default_timezone_set('UTC');

        try {
            return RRule::createFromRfcString($rrule, true);
        } finally {
            date_default_timezone_set($timezone);
        }
    }
}
