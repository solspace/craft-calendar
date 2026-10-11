<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Scheduling\Availability;
use Solspace\Calendar\Models\SchedulingSettings;

/** @coversNothing */
class AvailabilityTest extends TestCase
{
    public function testSeparateDurationAndIncrements(): void
    {
        $slots = $this->slots(['hours' => [['day' => 1, 'start' => '08:00', 'end' => '09:00']]]);
        self::assertSame(['08:00–08:30', '08:15–08:45', '08:30–09:00'], array_column($slots, 'label'));
    }

    public function testSplitHoursAndClosedWeekday(): void
    {
        $settings = ['hours' => [['day' => 1, 'start' => '08:00', 'end' => '09:00'], ['day' => 1, 'start' => '10:00', 'end' => '11:00']]];
        self::assertCount(6, $this->slots($settings));
        self::assertSame([], $this->slots($settings, [], '2026-10-13'));
        self::assertSame([], $this->slots(['hours' => []]));
    }

    public function testHolidayRangeOverridesCustomHoursAndWeeklyHours(): void
    {
        $exceptions = [
            ['dateFrom' => '2026-10-12', 'dateTo' => '2026-10-12', 'type' => 'hours', 'start' => '10:00', 'end' => '11:00'],
            ['dateFrom' => '2026-10-11', 'dateTo' => '2026-10-13', 'type' => 'closed'],
        ];
        self::assertSame([], $this->slots(['exceptions' => $exceptions]));
        array_pop($exceptions);
        self::assertSame(['10:00–10:30', '10:15–10:45', '10:30–11:00'], array_column($this->slots(['exceptions' => $exceptions]), 'label'));
    }

    public function testPartialDayExceptionAndBoundaryTouching(): void
    {
        $slots = $this->slots([
            'hours' => [['day' => 1, 'start' => '08:00', 'end' => '10:00']],
            'exceptions' => [['dateFrom' => '2026-10-12', 'dateTo' => '2026-10-12', 'type' => 'block', 'start' => '08:30', 'end' => '09:00']],
        ]);
        self::assertSame(['08:00–08:30', '09:00–09:30', '09:15–09:45', '09:30–10:00'], array_column($slots, 'label'));
    }

    public function testBuffersOnBothSidesOfBusyBooking(): void
    {
        $busy = [['start' => '2026-10-12T14:00:00Z', 'end' => '2026-10-12T14:30:00Z', 'buffer' => 15]];
        $slots = $this->slots(['buffer' => 15, 'hours' => [['day' => 1, 'start' => '08:00', 'end' => '10:30']]], $busy);
        self::assertSame(['08:00–08:30', '08:15–08:45', '09:45–10:15'], array_column($slots, 'label'));
    }

    public function testOverlapOptionDoesNotIgnoreClosures(): void
    {
        $busy = [['start' => '2026-10-12T13:00:00Z', 'end' => '2026-10-12T14:00:00Z', 'buffer' => 0]];
        self::assertCount(3, $this->slots(['allowOverlap' => true, 'hours' => [['day' => 1, 'start' => '08:00', 'end' => '09:00']]], $busy));
        self::assertSame([], $this->slots(['allowOverlap' => true, 'exceptions' => [['dateFrom' => '2026-10-12', 'dateTo' => '2026-10-12', 'type' => 'closed']]], $busy));
    }

    public function testMinimumNoticeAndBookingWindow(): void
    {
        $settings = (new SchedulingSettings(['timezone' => 'America/Winnipeg', 'minimumNotice' => 2, 'maximumAdvance' => 1]))->toArray();
        $now = new \DateTimeImmutable('2026-10-12T08:00:00-05:00');
        $slots = Availability::slots($settings, '2026-10-12', [], $now);
        self::assertSame('10:00–10:30', $slots[0]['label']);
        self::assertSame([], Availability::slots($settings, '2026-10-14', [], $now));
        self::assertSame([], Availability::slots($settings, '2026-10-11', [], $now));
    }

    public function testSpringDaylightSavingSkipsNonexistentLocalTimes(): void
    {
        $slots = $this->slots(['hours' => [['day' => 7, 'start' => '01:00', 'end' => '04:00']], 'duration' => 30, 'increment' => 30], [], '2027-03-14');
        self::assertSame(['01:00–01:30', '01:30–03:00', '03:00–03:30', '03:30–04:00'], array_column($slots, 'label'));
        self::assertSame([], $this->slots(['hours' => [['day' => 7, 'start' => '02:00', 'end' => '04:00']]], [], '2027-03-14'));
    }

    public function testFallDaylightSavingSlotsCarryDistinctOffsets(): void
    {
        $slots = $this->slots(['hours' => [['day' => 7, 'start' => '00:30', 'end' => '03:00']], 'duration' => 30, 'increment' => 30], [], '2026-11-01');
        $timestamps = array_map(static fn ($slot) => (new \DateTimeImmutable($slot['start']))->getTimestamp(), $slots);
        self::assertCount(\count($slots), array_unique($timestamps));
        self::assertContains('2026-11-01T01:00:00-05:00', array_column($slots, 'start'));
        self::assertContains('2026-11-01T01:00:00-06:00', array_column($slots, 'start'));
    }

    public function testOverlappingOpeningPeriodsDoNotDuplicateSlots(): void
    {
        $slots = $this->slots(['hours' => [['day' => 1, 'start' => '08:00', 'end' => '09:00'], ['day' => 1, 'start' => '08:15', 'end' => '09:00']]]);
        self::assertCount(3, $slots);
    }

    public function testRejectsMalformedDatesAndConfiguration(): void
    {
        self::assertSame([], $this->slots([], [], '2026-02-30'));
        self::assertNotEmpty(Availability::configurationErrors(['hours' => [['day' => 8, 'start' => '08:00', 'end' => '09:00']]]));
        self::assertNotEmpty(Availability::configurationErrors(['hours' => [['day' => 1, 'start' => '09:00', 'end' => '08:00']]]));
        self::assertNotEmpty(Availability::configurationErrors(['exceptions' => [['type' => 'hours', 'dateFrom' => 'bad', 'dateTo' => 'bad']]]));
    }

    public function testStoredUtcBookingsRespectLocalTimezone(): void
    {
        $busy = [['start' => '2026-10-12 13:00:00', 'end' => '2026-10-12 13:30:00', 'buffer' => 0]];
        $slots = $this->slots(['hours' => [['day' => 1, 'start' => '08:00', 'end' => '09:00']]], $busy);
        self::assertSame(['08:30–09:00'], array_column($slots, 'label'));
    }

    private function slots(array $overrides = [], array $busy = [], string $date = '2026-10-12'): array
    {
        $settings = (new SchedulingSettings(array_merge(['timezone' => 'America/Winnipeg'], $overrides)))->toArray();

        return Availability::slots($settings, $date, $busy, new \DateTimeImmutable('2026-10-01T00:00:00Z'), false);
    }
}
