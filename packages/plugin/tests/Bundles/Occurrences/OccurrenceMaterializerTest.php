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

    private function resolve(?array $override): array
    {
        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods([])
            ->getMock()
        ;
        $event->allDay = false;

        $method = new \ReflectionMethod(OccurrenceMaterializer::class, 'resolveOccurrence');

        return $method->invoke(
            new OccurrenceMaterializer(),
            $event,
            new Carbon('2026-11-09 10:00:00', 'UTC'),
            new \DateInterval('PT1H30M'),
            $override,
        );
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
