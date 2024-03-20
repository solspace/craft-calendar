<?php

namespace Solspace\Calendar\Library\Duration;

class EventDuration
{
    private ?int $years = null;

    private ?int $months = null;

    private ?int $days = null;

    private ?int $hours = null;

    private ?int $minutes = null;

    private ?int $seconds = null;

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

    public function getYears(): ?int
    {
        return $this->years;
    }

    public function getMonths(): ?int
    {
        return $this->months;
    }

    public function getDays(): ?int
    {
        return $this->days;
    }

    public function getHours(): ?int
    {
        return $this->hours;
    }

    public function getMinutes(): ?int
    {
        return $this->minutes;
    }

    public function getSeconds(): ?int
    {
        return $this->seconds;
    }
}
