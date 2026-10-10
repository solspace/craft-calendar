<?php

namespace Solspace\Tests\Unit\Calendar\Bundles\Occurrences;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Bundles\Occurrences\ScheduleShift;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Bundles\Occurrences\ScheduleShift
 */
class ScheduleShiftTest extends TestCase
{
    private const WEEKLY = ['2026-11-02 10:00:00', '2026-11-09 10:00:00', '2026-11-16 10:00:00'];

    public function testEveryOccurrenceMovingTheSameDistanceIsAShift(): void
    {
        $after = ['2026-11-03 18:00:00', '2026-11-10 18:00:00', '2026-11-17 18:00:00'];

        self::assertSame(32 * 3600, ScheduleShift::detect(self::WEEKLY, $after, true));
    }

    public function testAnUnchangedScheduleIsNotAShift(): void
    {
        self::assertNull(ScheduleShift::detect(self::WEEKLY, self::WEEKLY, true));
    }

    public function testOccurrencesMovingDifferentDistancesIsNotAShift(): void
    {
        $after = ['2026-11-02 10:00:00', '2026-11-12 10:00:00', '2026-11-16 10:00:00'];

        self::assertNull(ScheduleShift::detect(self::WEEKLY, $after, true));
    }

    public function testAnAddedOccurrenceIsNotAShift(): void
    {
        $after = ['2026-11-03 10:00:00', '2026-11-10 10:00:00', '2026-11-17 10:00:00', '2026-11-24 10:00:00'];

        self::assertNull(ScheduleShift::detect(self::WEEKLY, $after, true));
    }

    public function testARemovedOccurrenceIsNotAShift(): void
    {
        self::assertNull(ScheduleShift::detect(self::WEEKLY, ['2026-11-03 10:00:00', '2026-11-10 10:00:00'], true));
    }

    public function testAnInfiniteScheduleOnlyComparesWhatWasGenerated(): void
    {
        $after = ['2026-11-03 10:00:00', '2026-11-10 10:00:00', '2026-11-17 10:00:00', '2026-11-24 10:00:00'];

        self::assertSame(86400, ScheduleShift::detect(self::WEEKLY, $after, false));
    }

    public function testNothingBeforeIsNotAShift(): void
    {
        self::assertNull(ScheduleShift::detect([], self::WEEKLY, true));
    }

    public function testStartingLaterOnTheSamePatternIsNotAShift(): void
    {
        $before = ['2026-11-02 10:00:00', '2026-11-03 10:00:00', '2026-11-04 10:00:00', '2026-11-05 10:00:00'];
        $after = ['2026-11-05 10:00:00', '2026-11-06 10:00:00', '2026-11-07 10:00:00', '2026-11-08 10:00:00', '2026-11-09 10:00:00'];

        self::assertNull(ScheduleShift::detect($before, $after, false));
    }

    public function testStartingEarlierOnTheSamePatternIsNotAShift(): void
    {
        $after = ['2026-10-26 10:00:00', '2026-11-02 10:00:00', '2026-11-09 10:00:00', '2026-11-16 10:00:00'];

        self::assertNull(ScheduleShift::detect(self::WEEKLY, $after, false));
    }
}
