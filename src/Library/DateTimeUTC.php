<?php

namespace Solspace\Calendar\Library;

use Craft\DateTime;

class DateTimeUTC extends DateTime
{
    /**
     * Creates a new DateTime object from a string.
     *
     * @param string|array $date
     * @param string|null  $timezone
     *
     * @return DateTime|null|false
     */
    public static function createFromString($date, $timezone = self::UTC)
    {
        $date = parent::createFromString($date, $timezone, false);

        if (!$date) {
            return $date;
        }

        $utc = new DateTimeUTC();
        $utc->setTimestamp($date->getTimestamp());

        return $utc;
    }

    /**
     * Creates a new \Craft\DateTime object (rather than \DateTime)
     *
     * @param string $format
     * @param string $time
     * @param mixed  $timezone The timezone the string is set in (defaults to UTC).
     *
     * @return DateTime
     */
    public static function createFromFormat($format, $time, $timezone = self::UTC)
    {
        $date = parent::createFromFormat($format, $time, $timezone);

        if (!$date) {
            return $date;
        }

        $utc = new DateTimeUTC();
        $utc->setTimestamp($date->getTimestamp());

        return $utc;
    }

    /**
     * @param string            $format
     * @param mixed|null|string $timezone
     *
     * @return string
     */
    public function format($format, $timezone = self::UTC)
    {
        if (!$timezone) {
            $timezone = $this->getTimezone();
        }

        if (is_string($timezone)) {
            $timezone = new \DateTimeZone($timezone);
        }

        $workaroundDate = new \DateTime("now", $timezone);
        $workaroundDate->setTimestamp($this->getTimestamp());

        return $workaroundDate->format($format);
    }
}
