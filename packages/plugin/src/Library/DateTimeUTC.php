<?php

namespace Solspace\Calendar\Library;

class DateTimeUTC extends \DateTime
{
    /**
     * Creates a new DateTime object from a string.
     *
     * @return null|\DateTime|false
     */
    public static function createFromString(array|string $date, mixed $timezone = \DateTimeZone::UTC): null|bool|\DateTime
    {
        $date = parent::createFromString($date, $timezone, false);

        if (!$date) {
            return $date;
        }

        $utc = new self();
        $utc->setTimestamp($date->getTimestamp());

        return $utc;
    }

    /**
     * Creates a new \Craft\DateTime object (rather than \DateTime).
     */
    public static function createFromFormat(string $format, string $datetime, mixed $timezone = \DateTimeZone::UTC): \DateTime
    {
        $date = parent::createFromFormat($format, $datetime, $timezone);

        if (!$date) {
            return $date;
        }

        $utc = new self();
        $utc->setTimestamp($date->getTimestamp());

        return $utc;
    }

    public function format(string $format, mixed $timezone = \DateTimeZone::UTC): string
    {
        if (!$timezone) {
            $timezone = $this->getTimezone();
        }

        if (\is_string($timezone)) {
            $timezone = new \DateTimeZone($timezone);
        }

        $workaroundDate = new \DateTime('now', $timezone);
        $workaroundDate->setTimestamp($this->getTimestamp());

        return $workaroundDate->format($format);
    }
}
