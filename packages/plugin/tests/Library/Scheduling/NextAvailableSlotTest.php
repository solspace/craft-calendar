<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\BookingsService;

/** @coversNothing */
class NextAvailableSlotTest extends TestCase
{
    public function testClosedTodayFindsTheNextOpenDayAndReturnsNullWhenFullyBooked(): void
    {
        $service = new class extends BookingsService {
            public array $dates = [];
            public array $slots = [];

            public function availableSlots(CalendarModel $calendar, string $date, bool $public = true, ?int $except = null, ?int $duration = null): array
            {
                $this->dates[] = $date;

                return $this->slots[$date] ?? [];
            }
        };
        $calendar = new CalendarModel(['type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => ['timezone' => 'America/Winnipeg', 'maximumAdvance' => 2]]);
        $slot = ['start' => '2026-10-12T08:00:00-05:00', 'end' => '2026-10-12T09:00:00-05:00', 'label' => '08:00–09:00'];
        $service->slots['2026-10-12'] = [$slot];
        $now = new \DateTimeImmutable('2026-10-11T01:29:00-05:00');
        self::assertSame($slot, $service->nextAvailableSlot($calendar, $now));
        self::assertSame(['2026-10-11', '2026-10-12'], $service->dates);
        $service->slots = [];
        $service->dates = [];
        self::assertNull($service->nextAvailableSlot($calendar, $now));
        self::assertSame(['2026-10-11', '2026-10-12', '2026-10-13'], $service->dates);
        $service->slots['2026-10-11'] = [
            ['start' => '2026-10-11T08:00:00-05:00', 'end' => '2026-10-11T09:00:00-05:00', 'label' => '08:00–09:00'],
            ['start' => '2026-10-11T08:15:00-05:00', 'end' => '2026-10-11T09:15:00-05:00', 'label' => '08:15–09:15'],
        ];
        self::assertSame('08:15–09:15', $service->nextAvailableSlot($calendar, new \DateTimeImmutable('2026-10-11T08:07:00-05:00'))['label']);
    }
}
