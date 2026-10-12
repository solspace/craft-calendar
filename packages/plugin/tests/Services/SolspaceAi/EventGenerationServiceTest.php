<?php

namespace Solspace\Tests\Unit\Calendar\Services\SolspaceAi;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Services\SolspaceAi\EventGenerationService;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Services\SolspaceAi\EventGenerationService
 */
class EventGenerationServiceTest extends TestCase
{
    public function testAiWallTimesBecomeFloatingUtcCarrierTimestamps(): void
    {
        $start = DateHelper::parseFloatingCarbon('2026-10-13T09:00:00');
        $end = DateHelper::parseFloatingCarbon('2026-10-13T09:30:00');

        self::assertSame('2026-10-13 09:00:00', $start->format('Y-m-d H:i:s'));
        self::assertSame('UTC', $start->timezoneName);
        self::assertSame(9, Carbon::createFromTimestampUTC($start->getTimestamp())->hour);
        self::assertSame(30, Carbon::createFromTimestampUTC($end->getTimestamp())->minute);
    }

    public function testAiOffsetsAreIgnoredSoWallClockStaysFloating(): void
    {
        $start = DateHelper::parseFloatingCarbon('2026-10-13T09:00:00+06:00');

        self::assertSame('2026-10-13 09:00:00', $start->format('Y-m-d H:i:s'));
        self::assertSame(9, Carbon::createFromTimestampUTC($start->getTimestamp())->hour);
    }

    public function testNormalizeGeneratedWeeklyRruleIncludesDtstart(): void
    {
        $service = new EventGenerationService();
        $method = new \ReflectionMethod($service, 'normalizeGeneratedRrule');
        $method->setAccessible(true);

        $start = DateHelper::parseFloatingCarbon('2026-10-13T09:00:00');
        $rrule = $method->invoke($service, Event::REPEAT_WEEKLY, '', $start, false);

        self::assertSame("DTSTART:20261013T090000\nRRULE:FREQ=WEEKLY;BYDAY=TU", $rrule);
    }

    public function testNormalizeAllDayRangeUsesExclusiveEnd(): void
    {
        $service = new EventGenerationService();
        $method = new \ReflectionMethod($service, 'normalizeAllDayRange');
        $method->setAccessible(true);

        $start = DateHelper::parseFloatingCarbon('2026-10-17T00:00:00');
        $end = DateHelper::parseFloatingCarbon('2026-10-17T23:59:59');
        [$normalizedStart, $normalizedEnd] = $method->invoke($service, $start, $end);

        self::assertSame('2026-10-17 00:00:00', $normalizedStart->format('Y-m-d H:i:s'));
        self::assertSame('2026-10-18 00:00:00', $normalizedEnd->format('Y-m-d H:i:s'));
    }

    public function testInferRepeatEndFromRruleUsesCountAndUntil(): void
    {
        $service = new EventGenerationService();
        $method = new \ReflectionMethod($service, 'inferRepeatEndFromRrule');
        $method->setAccessible(true);

        [$after, $afterUntil] = $method->invoke($service, 'FREQ=WEEKLY;BYDAY=FR;COUNT=8');
        self::assertSame(Event::REPEAT_END_AFTER, $after);
        self::assertNull($afterUntil);

        [$onDate, $until] = $method->invoke($service, 'FREQ=DAILY;UNTIL=20261201');
        self::assertSame(Event::REPEAT_END_ON_DATE, $onDate);
        self::assertSame(
            DateHelper::parseFloatingCarbon('2026-12-01T00:00:00')->getTimestamp(),
            $until
        );

        [$never] = $method->invoke($service, 'FREQ=WEEKLY;BYDAY=MO');
        self::assertSame(Event::REPEAT_END_NEVER, $never);
    }

    public function testAttachFixedDatesMergesAdditionalAndExcludedDates(): void
    {
        $service = new EventGenerationService();
        $method = new \ReflectionMethod($service, 'attachFixedDatesToRrule');
        $method->setAccessible(true);

        $start = DateHelper::parseFloatingCarbon('2026-10-13T09:00:00');
        $result = $method->invoke(
            $service,
            "DTSTART:20261013T090000\nRRULE:FREQ=WEEKLY;BYDAY=MO",
            $start,
            false,
            ['2026-10-24', '2026-10-20'],
            ['2026-10-27']
        );

        self::assertStringContainsString('RRULE:FREQ=WEEKLY;BYDAY=MO', $result);
        self::assertStringContainsString('RDATE:20261020T090000,20261024T090000', $result);
        self::assertStringContainsString('EXDATE:20261027T090000', $result);
    }
}
