<?php

namespace Solspace\Calendar\Library;

use Carbon\Carbon;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Exceptions\DateHelperException;

class DateHelper
{
    const UTC = 'utc';

    /** @var array */
    private static $weekDays = [
        'SU' => 'Sunday',
        'MO' => 'Monday',
        'TU' => 'Tuesday',
        'WE' => 'Wednesday',
        'TH' => 'Thursday',
        'FR' => 'Friday',
        'SA' => 'Saturday',
    ];

    /** @var array */
    private static $monthNames = [
        1  => 'January',
        2  => 'February',
        3  => 'March',
        4  => 'April',
        5  => 'May',
        6  => 'June',
        7  => 'July',
        8  => 'August',
        9  => 'September',
        10 => 'October',
        11 => 'November',
        12 => 'December',
    ];

    /**
     * @param int $dayOffset
     *
     * @return array
     */
    public static function getWeekDays(int $dayOffset = 0): array
    {
        return self::reOrderArray(self::$weekDays, $dayOffset);
    }

    /**
     * Returns a list of weekdays with the day names as abbreviations
     *
     * @param int  $dayOffset
     * @param int  $abbreviationLength
     * @param bool $translate
     *
     * @return array
     */
    public static function getWeekDaysShort(
        int $dayOffset = 0,
        int $abbreviationLength = 2,
        bool $translate = false
    ): array {
        $weekDays = self::getWeekDays($dayOffset);
        array_walk(
            $weekDays,
            function (&$value) use ($abbreviationLength, $translate) {
                $value = substr($value, 0, $abbreviationLength);
                if ($translate) {
                    $value = Calendar::t($value);
                }
            }
        );

        return $weekDays;
    }

    /**
     * Returns a list of month day numbers indexed by that same number
     *
     * @return array
     */
    public static function getMonthDays(): array
    {
        $monthDays = [];
        for ($i = 1; $i <= 31; $i++) {
            $monthDays[$i] = $i;
        }

        return $monthDays;
    }

    /**
     * Returns month names indexed by their respective month numbers
     *
     * @param bool $translate
     *
     * @return array
     */
    public static function getMonthNames(bool $translate = false): array
    {
        $monthNames = self::$monthNames;

        if ($translate) {
            array_walk(
                $monthNames,
                function (&$value) {
                    $value = ucfirst(Calendar::t($value));
                }
            );
        }

        return $monthNames;
    }

    /**
     * Parses seconds into a fully fledged interval
     *
     * @param int $seconds
     *
     * @return \DateInterval
     */
    public static function getDateIntervalFromSeconds(int $seconds): \DateInterval
    {
        $inverse = 0;
        if ($seconds < 0) {
            $seconds = abs($seconds);
            $inverse = 1;
        }

        $epoch       = new \DateTime('@0');
        $fromSeconds = new \DateTime("@$seconds");

        $interval         = $epoch->diff($fromSeconds);
        $interval->invert = $inverse;

        return $interval;
    }

    /**
     * Compares two Carbon dates and returns -1, 0, 1 respectively
     *
     * @param Carbon $carbonA
     * @param Carbon $carbonB
     *
     * @return int
     */
    public static function compareCarbons(Carbon $carbonA, Carbon $carbonB): int
    {
        return $carbonA <=> $carbonB;
    }

    /**
     * Returns the number of days between two dates __IGNORING THE TIME__
     * For example:
     *   2016-01-01 23:59:59 and 2016-01-02 00:00:00 would have 1 day in between
     *
     * @param Carbon $carbonA
     * @param Carbon $carbonB
     *
     * @return int
     */
    public static function carbonDiffInDays(Carbon $carbonA, Carbon $carbonB): int
    {
        $carbonA = $carbonA->copy()->setTime(0, 0, 0);
        $carbonB = $carbonB->copy()->setTime(0, 0, 0);

        return $carbonA->diffInDays($carbonB, false);
    }

    /**
     * Returns the number of months between two dates __IGNORING THE TIME__
     * For example:
     *   2016-01-31 23:59:59 and 2016-02-01 00:00:00 would have 1 month in between
     *
     * @param Carbon $carbonA
     * @param Carbon $carbonB
     *
     * @return int
     */
    public static function carbonDiffInMonths(Carbon $carbonA, Carbon $carbonB): int
    {
        $diffInYears = $carbonA->year - $carbonB->year;

        return $carbonB->month - ($carbonA->month + ($diffInYears * 12));
    }

    /**
     * Checks whether a $date is below the overlap threshold
     * Returns true if it is below
     *
     * @param Carbon $date
     * @param int    $overlapThreshold
     *
     * @return bool
     */
    public static function isDateBeforeOverlap(Carbon $date, int $overlapThreshold): bool
    {
        $hourBelowThreshold   = $date->hour < $overlapThreshold;
        $hourAtExactThreshold = $date->hour === $overlapThreshold;
        $timeAtZero           = $date->format('is') === '0000';

        return $hourBelowThreshold || ($hourAtExactThreshold && $timeAtZero);
    }

    /**
     * Changes the first day and last day of the week for the given $date Carbon
     *
     * @param Carbon $date
     * @param int    $firstDay
     */
    public static function updateWeekStartDate(Carbon $date, int $firstDay = 0)
    {
        $lastDay = ($firstDay + 6) % 7;

        $date::setWeekStartsAt($firstDay);
        $date::setWeekEndsAt($lastDay);
    }

    /**
     * Shifts BYDAY rule forward or backward by a given amount of days
     *
     * @param string $dayList
     * @param int    $shiftAmount
     *
     * @return string|null
     * @throws DateHelperException
     */
    public static function shiftByDays(string $dayList = null, int $shiftAmount)
    {
        if (!$shiftAmount || empty($dayList)) {
            return $dayList;
        }

        $dayListArray = explode(',', $dayList);

        $modifiedDayList = [];
        foreach ($dayListArray as $day) {
            if (preg_match("/^(-)?(\d+)?(SU|MO|TU|WE|TH|FR|SA)$/", $day, $matches)) {
                $isDayNegative = $matches[1] === '-';
                $offsetNumber  = $matches[2];
                $day           = strtoupper($matches[3]);
            } else {
                throw new DateHelperException(
                    sprintf(
                        'shiftByDays() only accepts these array values: %s. %s given.',
                        implode(',', array_keys(self::$weekDays)),
                        $day
                    )
                );
            }

            $date = new Carbon(self::$weekDays[$day], 'UTC');
            $date->addDays($shiftAmount);

            $dayAbbreviation   = strtoupper(substr($date->format('D'), 0, 2));
            $modifiedDayList[] = ($isDayNegative ? '-' : '') . $offsetNumber . $dayAbbreviation;
        }

        return implode(',', $modifiedDayList);
    }

    /**
     * Shifts BYMONTHDAY rule forward or backward by a given amount of days
     *
     * @param string $monthDayList
     * @param int    $shiftAmount
     *
     * @return string|null
     */
    public static function shiftByMonthDay(string $monthDayList = null, int $shiftAmount)
    {
        if (empty($monthDayList)) {
            return $monthDayList;
        }

        $daysInMonth = 31;
        $shiftAmount %= $daysInMonth;

        if (!$shiftAmount) {
            return $monthDayList;
        }

        $monthDayListArray    = explode(',', $monthDayList);
        $modifiedMonthDayList = [];
        foreach ($monthDayListArray as $day) {
            $dayIsNegative = $day < 0;
            $day           = abs($day) + $shiftAmount;

            if ($day > $daysInMonth) {
                $day %= $daysInMonth;
            } else if ($day < 0) {
                $day = $daysInMonth - abs($day);
            }

            if ((int) $day === 0) {
                $day = $daysInMonth;
            }

            $modifiedMonthDayList[] = $day * ($dayIsNegative ? -1 : 1);
        }

        return implode(',', $modifiedMonthDayList);
    }

    /**
     * Shifts BYMONTH rule forward or backward by a given amount of days
     *
     * @param string $monthList
     * @param int    $shiftAmount
     *
     * @return string|null
     */
    public static function shiftByMonth(string $monthList = null, int $shiftAmount)
    {
        if (empty($monthList)) {
            return $monthList;
        }

        $monthsInYear = 12;
        $shiftAmount  %= $monthsInYear;

        if (!$shiftAmount) {
            return $monthList;
        }

        $monthListArray    = explode(',', $monthList);
        $modifiedMonthList = [];
        foreach ($monthListArray as $month) {
            $dayIsNegative = $month < 0;
            $month         = abs($month) + $shiftAmount;

            if ($month > $monthsInYear) {
                $month %= $monthsInYear;
            } else if ($month < 0) {
                $month = $monthsInYear - abs($month);
            }

            if ((int) $month === 0) {
                $month = $monthsInYear;
            }

            $modifiedMonthList[] = $month * ($dayIsNegative ? -1 : 1);
        }

        return implode(',', $modifiedMonthList);
    }

    /**
     * Sorts an array of dates ASC-endingly
     *
     * @param array $dateArray
     */
    public static function sortArrayOfDates(array &$dateArray)
    {
        usort(
            $dateArray,
            function (\DateTime $dateA, \DateTime $dateB) {
                if ($dateA < $dateB) {
                    return -1;
                }

                if ($dateA > $dateB) {
                    return 1;
                }

                return 0;
            }
        );
    }

    /**
     * Calculates a "week number" by diving the date's day of year with 7
     * And ceil()'ing the result.
     * This is meant for looking up dates cached by week number
     * The real week number calculation is too complex for what is needed
     *
     * @param Carbon $date
     *
     * @return int
     */
    public static function getCacheWeekNumber(Carbon $date): int
    {
        $startOfWeek = $date->copy()->startOfWeek();
        $weekNumber  = $startOfWeek->weekOfYear;

        return $date->year . $weekNumber;
    }

    /**
     * Returns an array of [relativeStartDate, relativeEndDate]
     * The start date will acquire the date from $occurrence, but retain it's time
     * The end date will adjust accordingly
     *
     * @param Carbon    $startDate
     * @param Carbon    $endDate
     * @param \DateTime $occurrence
     *
     * @return array - [relativeStartDate, relativeEndDate]
     */
    public static function getRelativeEventDates(Carbon $startDate, Carbon $endDate, \DateTime $occurrence): array
    {
        $occurrenceStartDate = $startDate->copy();
        $occurrenceStartDate->setDate(
            $occurrence->format('Y'),
            $occurrence->format('m'),
            $occurrence->format('d')
        );
        $occurrenceEndDate = $occurrenceStartDate->copy();
        $occurrenceEndDate->add($startDate->diff($endDate));

        return [$occurrenceStartDate, $occurrenceEndDate];
    }

    /**
     * @param array $array
     * @param int   $keyOffset - reorders the array putting $keyOffset amount of elements at the end
     *
     * @return array
     */
    private static function reOrderArray(array $array, int $keyOffset = 0): array
    {
        while ($keyOffset > 0) {
            $key   = key($array);
            $value = $array[$key];

            unset($array[$key]);
            $array[$key] = $value;

            $keyOffset--;
        }

        return $array;
    }
}
