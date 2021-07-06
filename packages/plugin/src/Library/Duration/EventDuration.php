<?php

namespace Solspace\Calendar\Library\Duration;

class EventDuration
{
    /** @var int */
    private $years;

    /** @var int */
    private $months;

    /** @var int */
    private $days;

    /** @var int */
    private $hours;

    /** @var int */
    private $minutes;

    /** @var int */
    private $seconds;

    /**
     * EventDuration constructor.
     */
    public function __construct(\DateInterval $interval)
    {
        $this->years = $interval->y;
        $this->months = $interval->m;
        $this->days = $interval->d;
        $this->hours = $interval->h;
        $this->minutes = $interval->i;
        $this->seconds = $interval->s;

        if ($interval->invert) {
            $this->years *= -1;
            $this->months *= -1;
            $this->days *= -1;
            $this->hours *= -1;
            $this->minutes *= -1;
            $this->seconds *= -1;
        }
    }

    /**
     * Converts the duration to a human readable string.
     */
    public function humanReadable(): string
    {
        $timeString = '';
        if ($this->years) {
            $timeString .= sprintf(' %dy', $this->years);
        }

        if ($this->months) {
            $timeString .= sprintf(' %dmon', $this->months);
        }

        if ($this->days) {
            $timeString .= sprintf(' %dd', $this->days);
        }

        if ($this->hours) {
            $timeString .= sprintf(' %dh', $this->hours);
        }

        if ($this->minutes) {
            $timeString .= sprintf(' %dm', $this->minutes);
        }

        if ($this->seconds) {
            $timeString .= sprintf(' %ds', $this->seconds);
        }

        return trim($timeString);
    }

    /**
     * @return int
     */
    public function getYears()
    {
        return $this->years;
    }

    /**
     * @return int
     */
    public function getMonths()
    {
        return $this->months;
    }

    /**
     * @return int
     */
    public function getDays()
    {
        return $this->days;
    }

    /**
     * @return int
     */
    public function getHours()
    {
        return $this->hours;
    }

    /**
     * @return int
     */
    public function getMinutes()
    {
        return $this->minutes;
    }

    /**
     * @return int
     */
    public function getSeconds()
    {
        return $this->seconds;
    }
}
