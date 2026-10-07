<?php

namespace Solspace\Tests\Unit\Calendar\Library\RRule;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use RRule\RRule;
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

    public function testResizeSeriesShiftsAdditionalAndExcludedDatesWithTheStart(): void
    {
        $helper = new RecurringEventMutationHelper();
        $rrule = implode(
            "\n",
            [
                'DTSTART:20260105T090000',
                'RRULE:FREQ=WEEKLY;UNTIL=20260202T090000',
                'RDATE:20260107T090000',
                'EXDATE:20260112T090000',
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
                    'RDATE:20260107T083000',
                    'EXDATE:20260112T083000',
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

    public function testSplitEndsTheEarlierPartAndReducesTheLaterPartsCount(): void
    {
        $rrule = "DTSTART:20261012T100000\nRRULE:FREQ=WEEKLY;COUNT=8";

        $split = (new RecurringEventMutationHelper())->splitRRule(
            $rrule,
            new Carbon('2026-10-12 10:00:00', 'UTC'),
            false,
            new Carbon('2026-10-26 10:00:00', 'UTC'),
        );

        self::assertSame("DTSTART:20261012T100000\nRRULE:FREQ=WEEKLY;UNTIL=20261019T100000", $split['before']);
        self::assertSame('2026-10-19 10:00:00', $split['beforeUntil']->format('Y-m-d H:i:s'));
        self::assertSame("DTSTART:20261026T100000\nRRULE:FREQ=WEEKLY;COUNT=6", $split['after']);
        self::assertSame('2026-10-26 10:00:00', $split['afterStart']->format('Y-m-d H:i:s'));
        self::assertPartitioned($rrule, $split);
    }

    public function testSplitKeepsTheLaterPartsEndDate(): void
    {
        $rrule = "DTSTART:20260105T090000\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,TH;UNTIL=20260402T090000";

        $split = (new RecurringEventMutationHelper())->splitRRule(
            $rrule,
            new Carbon('2026-01-05 09:00:00', 'UTC'),
            false,
            new Carbon('2026-02-02 09:00:00', 'UTC'),
        );

        self::assertStringContainsString('UNTIL=20260402T090000', $split['after']);
        self::assertStringStartsWith('DTSTART:20260202T090000', $split['after']);
        self::assertPartitioned($rrule, $split);
    }

    public function testSplitOfAnEndlessScheduleLeavesTheLaterPartEndless(): void
    {
        $rrule = "DTSTART:20260101T080000\nRRULE:FREQ=MONTHLY;BYDAY=2TU";

        $split = (new RecurringEventMutationHelper())->splitRRule(
            $rrule,
            new Carbon('2026-01-01 08:00:00', 'UTC'),
            false,
            new Carbon('2026-05-12 08:00:00', 'UTC'),
        );

        self::assertStringNotContainsString('UNTIL', $split['after']);
        self::assertStringNotContainsString('COUNT', $split['after']);
        self::assertSame('2026-04-14 08:00:00', $split['beforeUntil']->format('Y-m-d H:i:s'));
        self::assertPartitioned($rrule, $split);
    }

    public function testSplitSendsAdditionalAndExcludedDatesToTheirPart(): void
    {
        $rrule = implode("\n", [
            'DTSTART:20261012T100000',
            'RRULE:FREQ=WEEKLY;COUNT=8',
            'RDATE:20261015T100000,20261105T100000',
            'EXDATE:20261019T100000,20261109T100000',
        ]);

        $split = (new RecurringEventMutationHelper())->splitRRule(
            $rrule,
            new Carbon('2026-10-12 10:00:00', 'UTC'),
            false,
            new Carbon('2026-10-26 10:00:00', 'UTC'),
        );

        self::assertStringContainsString('RDATE:20261015T100000', $split['before']);
        self::assertStringContainsString('EXDATE:20261019T100000', $split['before']);
        self::assertStringNotContainsString('2026110', $split['before']);
        self::assertStringContainsString('RDATE:20261105T100000', $split['after']);
        self::assertStringContainsString('EXDATE:20261109T100000', $split['after']);
        self::assertStringNotContainsString('202610', substr($split['after'], (int) strpos($split['after'], 'RDATE')));
        self::assertPartitioned($rrule, $split);
    }

    public function testAllDaySplitUsesDates(): void
    {
        $rrule = "DTSTART;VALUE=DATE:20261013\nRRULE:FREQ=WEEKLY;COUNT=4";

        $split = (new RecurringEventMutationHelper())->splitRRule(
            $rrule,
            new Carbon('2026-10-13 00:00:00', 'UTC'),
            true,
            new Carbon('2026-10-27 00:00:00', 'UTC'),
        );

        self::assertSame("DTSTART:20261013\nRRULE:FREQ=WEEKLY;UNTIL=20261020", $split['before']);
        self::assertSame("DTSTART:20261027\nRRULE:FREQ=WEEKLY;COUNT=2", $split['after']);
        self::assertPartitioned($rrule, $split);
    }

    public function testSplitAtAnAdditionalDateStartsTheRuleAtItsNextOccurrence(): void
    {
        $rrule = "DTSTART:20261012T100000\nRRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=4\nRDATE:20261014T100000";

        $split = (new RecurringEventMutationHelper())->splitRRule(
            $rrule,
            new Carbon('2026-10-12 10:00:00', 'UTC'),
            false,
            new Carbon('2026-10-14 10:00:00', 'UTC'),
        );

        self::assertSame("DTSTART:20261026T100000\nRRULE:FREQ=WEEKLY;COUNT=3;INTERVAL=2\nRDATE:20261014T100000", $split['after']);
        self::assertSame('2026-10-26 10:00:00', $split['afterStart']->format('Y-m-d H:i:s'));
        self::assertPartitioned($rrule, $split);
    }

    /**
     * Every occurrence lands in exactly one part, in order, with nothing added at the boundary.
     */
    private static function assertPartitioned(string $rrule, array $split): void
    {
        $occurrences = static fn (?string $rule): array => null === $rule ? [] : array_map(
            static fn (\DateTimeInterface $date) => $date->format('Y-m-d H:i:s'),
            RRule::createFromRfcString($rule, true)->getOccurrences(60),
        );

        $expected = $occurrences($rrule);
        $before = $occurrences($split['before']);

        self::assertSame($expected, \array_slice(array_merge($before, $occurrences($split['after'])), 0, \count($expected)));
        self::assertNotEmpty($before);
        self::assertLessThan($split['afterStart']->format('Y-m-d H:i:s'), end($before));
    }
}
