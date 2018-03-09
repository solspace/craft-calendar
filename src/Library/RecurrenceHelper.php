<?php

namespace Solspace\Calendar\Library;

use Solspace\Calendar\Calendar;

class RecurrenceHelper
{
    const DAILY        = 'DAILY';
    const WEEKLY       = 'WEEKLY';
    const MONTHLY      = 'MONTHLY';
    const YEARLY       = 'YEARLY';
    const SELECT_DATES = 'SELECT_DATES';

    /**
     * @var array
     */
    private static $frequencyOptions = array(
        self::DAILY        => 'Day(s)',
        self::WEEKLY       => 'Week(s)',
        self::MONTHLY      => 'Month(s)',
        self::YEARLY       => 'Year(s)',
        self::SELECT_DATES => 'Select dates',
    );

    /**
     * @var array
     */
    private static $repeatsByOptions = array(
        1  => 'First',
        2  => 'Second',
        3  => 'Third',
        4  => 'Fourth',
        -1 => 'Last',
    );


    /**
     * Returns frequency options indexed by RRule frequency string and translates the values
     * [DAILY => Days(s), WEEKLY => Week(s), MONTHLY => Month(s), YEARLY => Year(s)]
     *
     * @return array
     */
    public static function getFrequencyOptions(): array
    {
        $translatedOptions = array();
        foreach (self::$frequencyOptions as $key => $value) {
            $translatedOptions[$key] = Calendar::t($value);
        }

        return $translatedOptions;
    }

    /**
     * Repeats By Week Day options
     * First, second, third, fourth or last (translated)
     *
     * @return array
     */
    public static function getRepeatsByOptions(): array
    {
        $translatedOptions = array();
        foreach (self::$repeatsByOptions as $key => $value) {
            $translatedOptions[$key] = Calendar::t($value);
        }

        return $translatedOptions;
    }
}
