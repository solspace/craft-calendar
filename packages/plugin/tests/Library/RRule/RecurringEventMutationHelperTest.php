<?php

namespace Solspace\Tests\Unit\Calendar\Library\RRule;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\RRule\RecurringEventMutationHelper;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Library\RRule\RecurringEventMutationHelper
 */
class RecurringEventMutationHelperTest extends TestCase
{
    public function testDeleteOccurrenceAddsExdate(): void
    {
        $helper = new RecurringEventMutationHelper();
        $rrule = implode(
            "\n",
            [
                'DTSTART:20260108T090000',
                'RRULE:FREQ=WEEKLY;UNTIL=20260205T090000',
            ]
        );

        $updated = $helper->deleteOccurrenceRRule(
            $rrule,
            new Carbon('2026-01-08 09:00:00', 'UTC'),
            false,
            new Carbon('2026-01-15 09:00:00', 'UTC'),
        );

        self::assertSame(
            implode(
                "\n",
                [
                    'DTSTART:20260108T090000',
                    'RRULE:FREQ=WEEKLY;UNTIL=20260205T090000',
                    'EXDATE:20260115T090000',
                ]
            ),
            $updated,
        );
    }

    public function testMoveOccurrenceUpdatesExistingRdateInPlace(): void
    {
        $helper = new RecurringEventMutationHelper();
        $rrule = implode(
            "\n",
            [
                'DTSTART:20260108T090000',
                'RRULE:FREQ=WEEKLY;UNTIL=20260205T090000',
                'RDATE:20260210T090000',
                'EXDATE:20260212T090000',
            ]
        );

        $updated = $helper->moveOccurrenceRRule(
            $rrule,
            new Carbon('2026-01-08 09:00:00', 'UTC'),
            false,
            new Carbon('2026-02-10 09:00:00', 'UTC'),
            new Carbon('2026-02-11 09:00:00', 'UTC'),
        );

        self::assertSame(
            implode(
                "\n",
                [
                    'DTSTART:20260108T090000',
                    'RRULE:FREQ=WEEKLY;UNTIL=20260205T090000',
                    'RDATE:20260211T090000',
                    'EXDATE:20260212T090000',
                ]
            ),
            $updated,
        );
    }

    public function testMoveSeriesShiftsBaseRuleAndFixedDates(): void
    {
        $helper = new RecurringEventMutationHelper();
        $rrule = implode(
            "\n",
            [
                'DTSTART:20260105T090000',
                'RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20260202T090000',
                'RDATE:20260114T090000',
                'EXDATE:20260119T090000',
            ]
        );

        $updated = $helper->moveSeriesRRule(
            $rrule,
            new Carbon('2026-01-05 09:00:00', 'UTC'),
            new Carbon('2026-01-06 09:00:00', 'UTC'),
            86400,
            false,
        );

        self::assertSame(
            implode(
                "\n",
                [
                    'DTSTART:20260106T090000',
                    'RRULE:FREQ=WEEKLY;UNTIL=20260203T090000;BYDAY=TU',
                    'RDATE:20260115T090000',
                    'EXDATE:20260120T090000',
                ]
            ),
            $updated,
        );
    }

    public function testMoveRdateOnlySeriesShiftsAllFixedDates(): void
    {
        $helper = new RecurringEventMutationHelper();
        $rrule = implode(
            "\n",
            [
                'DTSTART:20260105T090000',
                'RDATE:20260105T090000,20260112T090000,20260119T090000',
            ]
        );

        $updated = $helper->moveSeriesRRule(
            $rrule,
            new Carbon('2026-01-05 09:00:00', 'UTC'),
            new Carbon('2026-01-06 10:00:00', 'UTC'),
            90000,
            false,
        );

        self::assertSame(
            implode(
                "\n",
                [
                    'DTSTART:20260106T100000',
                    'RDATE:20260106T100000,20260113T100000,20260120T100000',
                ]
            ),
            $updated,
        );
    }

    public function testMoveRdateOnlyOccurrenceUpdatesFixedDateInPlace(): void
    {
        $helper = new RecurringEventMutationHelper();
        $rrule = implode(
            "\n",
            [
                'DTSTART:20260105T090000',
                'RDATE:20260105T090000,20260112T090000,20260119T090000',
            ]
        );

        $updated = $helper->moveOccurrenceRRule(
            $rrule,
            new Carbon('2026-01-05 09:00:00', 'UTC'),
            false,
            new Carbon('2026-01-05 09:00:00', 'UTC'),
            new Carbon('2026-01-06 10:00:00', 'UTC'),
        );

        self::assertSame(
            implode(
                "\n",
                [
                    'DTSTART:20260105T090000',
                    'RDATE:20260106T100000,20260112T090000,20260119T090000',
                ]
            ),
            $updated,
        );
    }

    public function testResizeSeriesUpdatesStartBoundariesAndUntil(): void
    {
        $helper = new RecurringEventMutationHelper();
        $rrule = implode(
            "\n",
            [
                'DTSTART:20260105T090000',
                'RRULE:FREQ=WEEKLY;UNTIL=20260202T090000',
            ]
        );

        $updated = $helper->resizeSeriesRRule(
            $rrule,
            new Carbon('2026-01-05 09:00:00', 'UTC'),
            new Carbon('2026-01-05 08:30:00', 'UTC'),
            -1800,
            false,
        );

        self::assertSame(
            implode(
                "\n",
                [
                    'DTSTART:20260105T083000',
                    'RRULE:FREQ=WEEKLY;UNTIL=20260202T083000',
                ]
            ),
            $updated,
        );
    }

    public function testAllDayDeleteOccurrenceUsesDateFormatting(): void
    {
        $helper = new RecurringEventMutationHelper();
        $rrule = implode(
            "\n",
            [
                'DTSTART:20260108',
                'RRULE:FREQ=WEEKLY;UNTIL=20260129',
            ]
        );

        $updated = $helper->deleteOccurrenceRRule(
            $rrule,
            new Carbon('2026-01-08 00:00:00', 'UTC'),
            true,
            new Carbon('2026-01-15 00:00:00', 'UTC'),
        );

        self::assertSame(
            implode(
                "\n",
                [
                    'DTSTART:20260108',
                    'RRULE:FREQ=WEEKLY;UNTIL=20260129',
                    'EXDATE;VALUE=DATE:20260115',
                ]
            ),
            $updated,
        );
    }

    public function testAllDayOccurrenceChangesDoNotShiftExistingModifiedDatesBackOneDay(): void
    {
        $previousTimezone = date_default_timezone_get();
        date_default_timezone_set('Europe/Riga');

        try {
            $helper = new RecurringEventMutationHelper();
            $rrule = implode(
                "\n",
                [
                    'DTSTART:20260108',
                    'RRULE:FREQ=WEEKLY;UNTIL=20260129',
                    'RDATE;VALUE=DATE:20260120',
                    'EXDATE;VALUE=DATE:20260115',
                ]
            );

            $updated = $helper->deleteOccurrenceRRule(
                $rrule,
                new Carbon('2026-01-08 00:00:00', 'UTC'),
                true,
                new Carbon('2026-01-22 00:00:00', 'UTC'),
            );

            self::assertSame(
                implode(
                    "\n",
                    [
                        'DTSTART:20260108',
                        'RRULE:FREQ=WEEKLY;UNTIL=20260129',
                        'RDATE;VALUE=DATE:20260120',
                        'EXDATE;VALUE=DATE:20260115,20260122',
                    ]
                ),
                $updated,
            );
        } finally {
            date_default_timezone_set($previousTimezone);
        }
    }

    public function testTimedOccurrenceMoveMatchesExistingRdateOutsideUtcTimezone(): void
    {
        $previousTimezone = date_default_timezone_get();
        date_default_timezone_set('Europe/Riga');

        try {
            $helper = new RecurringEventMutationHelper();
            $rrule = implode(
                "\n",
                [
                    'DTSTART:20260105T090000',
                    'RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20260202T090000',
                    'RDATE:20260113T090000',
                    'EXDATE:20260112T090000',
                ]
            );

            $updated = $helper->moveOccurrenceRRule(
                $rrule,
                new Carbon('2026-01-05 09:00:00', 'UTC'),
                false,
                new Carbon('2026-01-13 09:00:00', 'UTC'),
                new Carbon('2026-01-14 09:00:00', 'UTC'),
            );

            self::assertSame(
                implode(
                    "\n",
                    [
                        'DTSTART:20260105T090000',
                        'RRULE:FREQ=WEEKLY;UNTIL=20260202T090000;BYDAY=MO',
                        'RDATE:20260114T090000',
                        'EXDATE:20260112T090000',
                    ]
                ),
                $updated,
            );
        } finally {
            date_default_timezone_set($previousTimezone);
        }
    }

    public function testTimedSeriesMoveDoesNotShiftPreviouslyMovedOccurrenceClockTime(): void
    {
        $previousTimezone = date_default_timezone_get();
        date_default_timezone_set('Europe/Riga');

        try {
            $helper = new RecurringEventMutationHelper();
            $rrule = implode(
                "\n",
                [
                    'DTSTART:20260105T090000',
                    'RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20260202T090000',
                    'RDATE:20260113T090000',
                    'EXDATE:20260112T090000',
                ]
            );

            $updated = $helper->moveSeriesRRule(
                $rrule,
                new Carbon('2026-01-05 09:00:00', 'UTC'),
                new Carbon('2026-01-06 09:00:00', 'UTC'),
                86400,
                false,
            );

            self::assertSame(
                implode(
                    "\n",
                    [
                        'DTSTART:20260106T090000',
                        'RRULE:FREQ=WEEKLY;UNTIL=20260203T090000;BYDAY=TU',
                        'RDATE:20260114T090000',
                        'EXDATE:20260113T090000',
                    ]
                ),
                $updated,
            );
        } finally {
            date_default_timezone_set($previousTimezone);
        }
    }
}
