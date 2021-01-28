<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use PHPUnit\Framework\TestCase;

/**
 * @internal
 * @coversNothing
 */
class CarbonTest extends TestCase
{
    public function testLessThan(): void
    {
        $dateA = new Carbon('2016-01-01 01:00:00', 'Europe/Riga');
        $dateB = new Carbon('2016-01-01 00:00:00', 'Europe/Riga');

        $comparison = $dateA->lt($dateB);

        self::assertFalse($comparison);
    }

    public function testInterval(): void
    {
        $date = new Carbon('2016-01-20 18:45:30', 'UTC');

        $intervalString = 'P1DT7H30M'; // 1 day 7 hrs 30 minutes
        $interval = new \DateInterval($intervalString);
        $interval = CarbonInterval::instance($interval);
        $interval->invert = 1;

        $date->add($interval);

        self::assertEquals('30', $interval->minutes);
        self::assertSame('2016-01-19 11:15:30', $date->toDateTimeString());
    }

    public function testFeb28ToApr1Interval(): void
    {
        // 32 days
        $deltaSeconds = 2764800;

        $epoch = new \DateTime('@0');
        $fromSeconds = new \DateTime("@{$deltaSeconds}");

        $interval = $epoch->diff($fromSeconds);

        self::assertEquals(32, $interval->days);
        self::assertEquals(1, $interval->m);
        self::assertEquals(1, $interval->d);

        $originalDate = '2019-02-28 04:00:00';
        $wrongDate = '2019-03-29 04:00:00';
        $expectedDate = '2019-04-01 04:00:00';

        $dateWithInterval = new Carbon($originalDate, 'UTC');
        $dateWithSeconds = new Carbon($originalDate, 'UTC');

        self::assertEquals($originalDate, $dateWithInterval->toDateTimeString());

        $dateWithInterval->add($interval);
        self::assertEquals($wrongDate, $dateWithInterval->toDateTimeString());

        $dateWithSeconds->addSeconds($deltaSeconds);
        self::assertEquals($expectedDate, $dateWithSeconds->toDateTimeString());
    }
}
