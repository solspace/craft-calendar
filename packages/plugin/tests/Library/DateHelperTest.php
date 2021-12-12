<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Library\Exceptions\DateHelperException;

/**
 * @internal
 * @coversNothing
 */
class DateHelperTest extends TestCase
{
    public function comparisonDataProvider(): array
    {
        return [
            [
                new Carbon('2016-01-01', 'Europe/Riga'),
                new Carbon('2016-01-01', 'Europe/Riga'),
                0,
            ],
            [
                new Carbon('2016-01-01 01:00:00', 'Europe/Riga'),
                new Carbon('2016-01-01 00:00:00', 'Europe/Riga'),
                1,
            ],
        ];
    }

    /**
     * @dataProvider comparisonDataProvider
     */
    public function testComparisons(Carbon $dateA, Carbon $dateB, int $expectedResult): void
    {
        $comparison = DateHelper::compareCarbons($dateA, $dateB);

        self::assertSame($expectedResult, $comparison);
    }

    public function testGetDateIntervalFromSeconds(): void
    {
        $date = Carbon::create(2016, 01, 20, 16, 45, 30, 'UTC');

        $seconds = -93730; // 1 day 2 hrs 2 minutes 10 seconds

        $interval = DateHelper::getDateIntervalFromSeconds($seconds);
        $date->add($interval);

        self::assertEquals(1, $interval->days);
        self::assertEquals(2, $interval->h);
        self::assertEquals(2, $interval->i);
        self::assertEquals(10, $interval->s);
        self::assertEquals('2016-01-19 14:43:20', $date->toDateTimeString());
    }

    public function testDiffInDays(): void
    {
        $dateA = new Carbon('2016-01-02 00:00:00', 'UTC');
        $dateB = new Carbon('2016-01-01 23:59:59', 'UTC');

        self::assertSame(-1, DateHelper::carbonDiffInDays($dateA, $dateB));
    }

    public function diffInMonthsDataProvider(): array
    {
        return [
            ['2016-01-31 23:59:59', '2016-02-01 00:00:00', 1],
            ['2016-01-31 23:59:59', '2016-01-31 00:00:00', 0],
            ['2016-05-31', '2016-01-01', -4],
            ['2016-05-31', '2017-01-01', 8],
            ['2011-01-01', '2024-01-01', 156],
            ['2016-01-01', '2016-05-31', 4],
            ['2017-01-01', '2016-05-31', -8],
            ['2024-01-01', '2011-01-01', -156],
        ];
    }

    /**
     * @dataProvider diffInMonthsDataProvider
     */
    public function testDiffInMonths(string $dateStringA, string $dateStringB, int $expectedResult): void
    {
        $dateA = new Carbon($dateStringA, 'UTC');
        $dateB = new Carbon($dateStringB, 'UTC');

        self::assertSame($expectedResult, DateHelper::carbonDiffInMonths($dateA, $dateB));
    }

    public function shiftByDayDataProvider(): array
    {
        return [
            ['WE,SU', 0, 'WE,SU'],
            ['SU,WE,FR', 38, 'WE,SA,MO'],
            ['MO,TU,FR', 5, 'SA,SU,WE'],
            ['3MO,3TU,5FR', 5, '3SA,3SU,5WE'],
            ['MO,TU,FR', -4, 'TH,FR,MO'],
            ['-MO,-TU', -3, '-FR,-SA'],
            ['-MO,-TU', 3, '-TH,-FR'],
            ['-1MO,-2TU', 3, '-1TH,-2FR'],
            ['', 3, ''],
        ];
    }

    /**
     * @dataProvider shiftByDayDataProvider
     * @covers       \DateHelper::shiftByDays()
     *
     * @throws DateHelperException
     */
    public function testShiftByDay(string $dayList, int $shiftAmount, string $expectedResult): void
    {
        $updatedList = DateHelper::shiftByDays($dayList, $shiftAmount);

        self::assertSame(
            $updatedList,
            $expectedResult,
            sprintf('Shifting %s by %d days. Expecting %s', $dayList, $shiftAmount, $expectedResult)
        );
    }

    public function shiftByDayFailingDataProvider(): array
    {
        return [
            ['SOME,FAIL', 1],
            ['0,SU', 3],
            ['sa', 2],
        ];
    }

    /**
     * @dataProvider shiftByDayFailingDataProvider
     */
    public function testShiftByDayFails(string $dayList, int $shiftAmount): void
    {
        $this->expectException(DateHelperException::class);

        DateHelper::shiftByDays($dayList, $shiftAmount);
    }

    public function shiftByMonthDayDataProvider(): array
    {
        return [
            ['1', -1, '31'],
            ['1', -2, '30'],
            ['31', 1, '1'],
            ['31', 2, '2'],
            ['31', 31, '31'],
            ['31', -31, '31'],
            ['1,2,3', 5, '6,7,8'],
            ['15,31,-10', 5, '20,5,-15'],
            ['15,31,-10', -5, '10,26,-5'],
            ['1,31,15', 35, '5,4,19'],
            ['1,31,15', -35, '28,27,11'],
        ];
    }

    /**
     * @dataProvider shiftByMonthDayDataProvider
     */
    public function testShiftByMonthDay(string $monthDayList, int $shiftAmount, string $expectedResult): void
    {
        $updatedList = DateHelper::shiftByMonthDay($monthDayList, $shiftAmount);

        self::assertSame(
            $expectedResult,
            $updatedList,
            sprintf('Shifting %s by %d days. Expecting %s', $monthDayList, $shiftAmount, $expectedResult)
        );
    }

    public function shiftByMonthDataProvider(): array
    {
        return [
            ['1', -1, '12'],
            ['1', -2, '11'],
            ['12', 1, '1'],
            ['12', 2, '2'],
            ['12', 12, '12'],
            ['12', -12, '12'],
            ['1,2,3', 5, '6,7,8'],
            ['7,12,-10', 5, '12,5,-3'],
            ['7,12,-10', -5, '2,7,-5'],
            ['1,12,8', 16, '5,4,12'],
            ['1,12,8', -16, '9,8,4'],
        ];
    }

    /**
     * @dataProvider shiftByMonthDataProvider
     */
    public function testShiftByMonth(string $monthList, int $shiftAmount, string $expectedResult): void
    {
        $updatedList = DateHelper::shiftByMonth($monthList, $shiftAmount);

        self::assertSame(
            $expectedResult,
            $updatedList,
            sprintf(
                'Shifting %s by %d days. Expecting %s',
                $monthList,
                $shiftAmount,
                $expectedResult
            )
        );
    }

    public function dayOfWeekDataProvider(): array
    {
        return [
            [Carbon::SUNDAY, Carbon::SATURDAY],
            [Carbon::MONDAY, Carbon::SUNDAY],
            [Carbon::TUESDAY, Carbon::MONDAY],
            [Carbon::WEDNESDAY, Carbon::TUESDAY],
            [Carbon::THURSDAY, Carbon::WEDNESDAY],
            [Carbon::FRIDAY, Carbon::THURSDAY],
            [Carbon::SATURDAY, Carbon::FRIDAY],
        ];
    }

    /**
     * Tests the updated first day of week.
     *
     * @dataProvider dayOfWeekDataProvider
     * @covers       \DateHelper::updateWeekStartDate()
     */
    public function testUpdateDayOfWeek(int $firstDay, int $expectedLastDay): void
    {
        $carbon = new Carbon('UTC');

        DateHelper::updateWeekStartDate($carbon, $firstDay);

        self::assertSame($carbon->getWeekStartsAt(), $firstDay, sprintf('Expected start day: %d', $firstDay));
        self::assertSame(
            Carbon::getWeekEndsAt(),
            $expectedLastDay,
            sprintf('Expected last day: %d', $expectedLastDay)
        );
    }

    public function testSortArrayByDates(): void
    {
        $dateArray = [
            new \DateTime('2016-01-20'),
            new \DateTime('2016-02-20'),
            new \DateTime('2016-01-19'),
            new \DateTime('2015-01-19'),
            new \DateTime('2017-01-19'),
        ];

        DateHelper::sortArrayOfDates($dateArray);

        self::assertCount(5, $dateArray);
        self::assertEquals($dateArray[0]->format('Y-m-d'), '2015-01-19');
        self::assertEquals($dateArray[1]->format('Y-m-d'), '2016-01-19');
        self::assertEquals($dateArray[2]->format('Y-m-d'), '2016-01-20');
        self::assertEquals($dateArray[3]->format('Y-m-d'), '2016-02-20');
        self::assertEquals($dateArray[4]->format('Y-m-d'), '2017-01-19');
    }

    public function cacheWeekNumberDataProvider(): array
    {
        return [
            ['2016-05-29', Carbon::SUNDAY, 201621],
            ['2016-05-29', Carbon::MONDAY, 201621],
            ['2016-06-05', Carbon::SUNDAY, 201622],
            ['2016-06-05', Carbon::MONDAY, 201622],
        ];
    }
}
