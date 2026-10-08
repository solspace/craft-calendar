<?php

namespace Solspace\Tests\Unit\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceMaterializer;
use Solspace\Calendar\Elements\Event;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Bundles\Occurrences\OccurrenceMaterializer
 */
class OccurrenceMaterializerTest extends TestCase
{
    public function testOccurrenceWithoutOverrideFollowsTheEvent(): void
    {
        self::assertSame(
            [
                'startDate' => '2026-11-09 10:00:00',
                'endDate' => '2026-11-09 11:30:00',
                'allDay' => false,
                'cancelled' => false,
                'overrideId' => null,
            ],
            $this->resolve(null),
        );
    }

    public function testOverrideWithOwnTimes(): void
    {
        self::assertSame(
            [
                'startDate' => '2026-11-10 18:00:00',
                'endDate' => '2026-11-10 20:00:00',
                'allDay' => false,
                'cancelled' => false,
                'overrideId' => 42,
            ],
            $this->resolve($this->override(startDate: '2026-11-10 18:00:00', endDate: '2026-11-10 20:00:00', allDay: '0')),
        );
    }

    public function testOverrideWithoutEndKeepsTheEventsDuration(): void
    {
        $occurrence = $this->resolve($this->override(startDate: '2026-11-10 18:00:00'));

        self::assertSame('2026-11-10 19:30:00', $occurrence['endDate']);
        self::assertFalse($occurrence['allDay']);
    }

    public function testContentOnlyOverrideKeepsTheSeriesTimes(): void
    {
        $occurrence = $this->resolve($this->override(cancelled: '1'));

        self::assertSame('2026-11-09 10:00:00', $occurrence['startDate']);
        self::assertSame('2026-11-09 11:30:00', $occurrence['endDate']);
        self::assertTrue($occurrence['cancelled']);
        self::assertSame(42, $occurrence['overrideId']);
    }

    public function testOverrideCanMakeAnOccurrenceAllDay(): void
    {
        $occurrence = $this->resolve($this->override(startDate: '2026-11-09 00:00:00', endDate: '2026-11-09 00:00:00', allDay: '1'));

        self::assertTrue($occurrence['allDay']);
    }

    public function testOverrideWithOwnTimesFromTheElement(): void
    {
        $occurrence = $this->resolve([
            'id' => 42,
            'startDate' => new Carbon('2026-11-10 18:00:00', 'Europe/Riga'),
            'endDate' => null,
            'allDay' => false,
            'cancelled' => false,
        ]);

        self::assertSame('2026-11-10 18:00:00', $occurrence['startDate']);
        self::assertSame('2026-11-10 19:30:00', $occurrence['endDate']);
    }

    public function testRecurrenceIdsAreTheRulesFloatingStarts(): void
    {
        $event = $this->makeEvent("DTSTART:20261102T100000\nRRULE:FREQ=WEEKLY;COUNT=3");

        self::assertSame(
            ['2026-11-02 10:00:00', '2026-11-09 10:00:00'],
            (new OccurrenceMaterializer())->recurrenceIds($event, 2),
        );
    }

    public function testRecurrenceIdsDontDependOnTheDefaultTimezone(): void
    {
        $timezone = date_default_timezone_get();
        date_default_timezone_set('America/New_York');

        try {
            // 02:30 doesn't exist in New York on 2027-03-14
            $event = $this->makeEvent("DTSTART:20270313T023000\nRRULE:FREQ=DAILY;COUNT=3");

            self::assertSame(
                ['2027-03-13 02:30:00', '2027-03-14 02:30:00', '2027-03-15 02:30:00'],
                (new OccurrenceMaterializer())->recurrenceIds($event, 3),
            );
        } finally {
            date_default_timezone_set($timezone);
        }
    }

    public function testProducesRecurrenceIdChecksTheRule(): void
    {
        $materializer = new OccurrenceMaterializer();
        $event = $this->makeEvent("DTSTART:20261102T100000\nRRULE:FREQ=WEEKLY;BYDAY=MO\nEXDATE:20261109T100000");

        self::assertTrue($materializer->producesRecurrenceId($event, new Carbon('2027-06-07 10:00:00', 'UTC')));
        self::assertFalse($materializer->producesRecurrenceId($event, new Carbon('2027-06-07 11:00:00', 'UTC')));
        self::assertFalse($materializer->producesRecurrenceId($event, new Carbon('2026-11-09 10:00:00', 'UTC')));
        self::assertFalse($materializer->producesRecurrenceId($event, new Carbon('2026-10-26 10:00:00', 'UTC')));
    }

    public function testInfiniteSchedulesHaveNoOccurrencesPastTheGenerationLimit(): void
    {
        $event = $this->makeEvent("DTSTART:20261102T100000\nRRULE:FREQ=MONTHLY;BYDAY=MO;BYSETPOS=-1");

        self::assertFalse((new OccurrenceMaterializer())->producesRecurrenceId($event, new Carbon('9999-12-27 10:00:00', 'UTC')));
    }

    public function testOneOffEventProducesItsOwnStart(): void
    {
        $event = $this->makeEvent(null);
        $event->startDate = new Carbon('2026-11-02 10:00:00', 'Europe/Riga');

        self::assertTrue((new OccurrenceMaterializer())->producesRecurrenceId($event, new Carbon('2026-11-02 10:00:00', 'UTC')));
        self::assertSame(['2026-11-02 10:00:00', '2026-11-02 10:00:00'], (new OccurrenceMaterializer())->getScheduleSpan($event));
    }

    public function testScheduleSpan(): void
    {
        $materializer = new OccurrenceMaterializer();

        self::assertSame(
            ['2026-11-02 10:00:00', '2026-11-16 10:00:00'],
            $materializer->getScheduleSpan($this->makeEvent("DTSTART:20261102T100000\nRRULE:FREQ=WEEKLY;COUNT=3")),
        );
        self::assertSame(
            ['2026-11-02 10:00:00', null],
            $materializer->getScheduleSpan($this->makeEvent("DTSTART:20261102T100000\nRRULE:FREQ=WEEKLY")),
        );
    }

    private function resolve(?array $override): array
    {
        $method = new \ReflectionMethod(OccurrenceMaterializer::class, 'resolveOccurrence');
        $occurrence = $method->invoke(
            new OccurrenceMaterializer(),
            $this->makeEvent(null),
            new Carbon('2026-11-09 10:00:00', 'UTC'),
            $override,
        );

        $occurrence['startDate'] = $occurrence['startDate']->format('Y-m-d H:i:s');
        $occurrence['endDate'] = $occurrence['endDate']->format('Y-m-d H:i:s');

        return $occurrence;
    }

    /**
     * A 90-minute event.
     */
    private function makeEvent(?string $rrule): Event
    {
        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods([])
            ->getMock()
        ;
        $event->allDay = false;
        $event->rrule = $rrule;
        $event->startDate = new Carbon('2026-11-02 10:00:00', 'UTC');
        $event->endDate = new Carbon('2026-11-02 11:30:00', 'UTC');

        return $event;
    }

    private function override(
        ?string $startDate = null,
        ?string $endDate = null,
        ?string $allDay = null,
        string $cancelled = '0',
    ): array {
        return [
            'id' => '42',
            'recurrenceId' => '2026-11-09 10:00:00',
            'startDate' => $startDate,
            'endDate' => $endDate,
            'allDay' => $allDay,
            'cancelled' => $cancelled,
        ];
    }
}
