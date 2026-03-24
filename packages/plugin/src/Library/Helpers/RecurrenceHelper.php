<?php

namespace Solspace\Calendar\Library\Helpers;

use Solspace\Calendar\Calendar;

class RecurrenceHelper
{
    public const DAILY = 'DAILY';
    public const WEEKLY = 'WEEKLY';
    public const MONTHLY = 'MONTHLY';
    public const YEARLY = 'YEARLY';
    public const CUSTOM = 'CUSTOM';

    private static array $frequencyOptions = [
        self::DAILY => 'Day(s)',
        self::WEEKLY => 'Week(s)',
        self::MONTHLY => 'Month(s)',
        self::YEARLY => 'Year(s)',
        self::CUSTOM => 'Custom',
    ];

    private static array $repeatsByOptions = [
        1 => 'First',
        2 => 'Second',
        3 => 'Third',
        4 => 'Fourth',
        -1 => 'Last',
    ];

    /**
     * Returns frequency options indexed by RRule frequency string and translates the values
     * [DAILY => Days(s), WEEKLY => Week(s), MONTHLY => Month(s), YEARLY => Year(s)].
     */
    public static function getFrequencyOptions(): array
    {
        return array_map(
            static fn ($value) => Calendar::t($value),
            self::$frequencyOptions
        );
    }

    /**
     * Repeats By Week Day options
     * First, second, third, fourth or last (translated).
     */
    public static function getRepeatsByOptions(): array
    {
        return array_map(
            static fn ($value) => Calendar::t($value),
            self::$repeatsByOptions
        );
    }
}
