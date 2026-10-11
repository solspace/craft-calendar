<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\i18n\Locale;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Services\SettingsService;

/** @coversNothing */
class NextAvailableSlotTest extends TestCase
{
    private mixed $previousApp;
    private mixed $previousPlugin;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        \Craft::$app = new class {
            public array $loadedModules = [];
            public string $timeZone = 'UTC';

            public function getFormattingLocale()
            {
                return new Locale('en-US');
            }
        };
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $settings = $this->createMock(SettingsService::class);
        $settings->method('getSettingsModel')->willReturn(new SettingsModel());
        $plugin->setComponents(['settings' => $settings]);
        Calendar::setInstance($plugin);
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        Calendar::setInstance($this->previousPlugin);
    }

    public function testClosedDaysAreSkippedAndTheFirstAvailableTimeIsReturned(): void
    {
        $service = $this->service();
        $calendar = new CalendarModel(['id' => 1, 'type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => ['timezone' => 'America/Winnipeg', 'maximumAdvance' => 2, 'hours' => [['day' => 1, 'start' => '08:00', 'end' => '09:00']]]]);
        $slot = $service->nextAvailableSlot($calendar, new \DateTimeImmutable('2026-10-11T01:29:00-05:00'));
        self::assertSame('2026-10-12T08:00:00-05:00', $slot['start']);
        self::assertSame([['2026-10-12', '2026-10-13']], $service->reads);
        $service->occupied = [['start' => '2026-10-12T08:00:00-05:00', 'end' => '2026-10-12T09:00:00-05:00', 'buffer' => 0]];
        self::assertNull($service->nextAvailableSlot($calendar, new \DateTimeImmutable('2026-10-11T01:29:00-05:00')));
    }

    public function testMaximumWindowUsesBoundedBatchesRatherThanADatabaseReadPerDay(): void
    {
        $service = $this->service();
        $calendar = new CalendarModel(['id' => 1, 'type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => ['timezone' => 'UTC', 'maximumAdvance' => 730]]);
        $service->occupied = [['start' => '2026-10-11T00:00:00Z', 'end' => '2028-10-12T00:00:00Z', 'buffer' => 0]];
        self::assertNull($service->nextAvailableSlot($calendar, new \DateTimeImmutable('2026-10-11T00:00:00Z')));
        self::assertCount(24, $service->reads);
        $calendar->scheduling = ['timezone' => 'UTC', 'maximumAdvance' => 730, 'hours' => []];
        $service->reads = [];
        self::assertNull($service->nextAvailableSlot($calendar, new \DateTimeImmutable('2026-10-11T00:00:00Z')));
        self::assertSame([], $service->reads);
    }

    public function testPastTimesAreSkippedAndUnsortedOpeningPeriodsStillFindTheEarliestTime(): void
    {
        $service = $this->service();
        $calendar = new CalendarModel(['id' => 1, 'type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => ['timezone' => 'America/Winnipeg', 'hours' => [['day' => 1, 'start' => '10:00', 'end' => '11:00'], ['day' => 1, 'start' => '08:00', 'end' => '09:00']]]]);
        $slot = $service->nextAvailableSlot($calendar, new \DateTimeImmutable('2026-10-12T08:07:00-05:00'));
        self::assertSame('2026-10-12T08:15:00-05:00', $slot['start']);
    }

    public function testInactiveResourcesSkipReadsAndFutureSeasonsStartAtTheFirstBookableDate(): void
    {
        $service = $this->service();
        $calendar = new CalendarModel(['id' => 1, 'type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => ['active' => false]]);
        self::assertNull($service->nextAvailableSlot($calendar, new \DateTimeImmutable('2026-10-11T00:00:00Z')));
        self::assertSame([], $service->reads);
        self::assertSame([], $service->availableSlots($calendar, '2026-10-12', false));
        self::assertSame([], $service->reads);
        $calendar->scheduling = ['availableFrom' => '2026-11-01', 'availableUntil' => '2026-11-01'];
        self::assertSame('2026-11-01T08:00:00+00:00', $service->nextAvailableSlot($calendar, new \DateTimeImmutable('2026-10-11T00:00:00Z'))['start']);
        self::assertSame([['2026-11-01', '2026-11-01']], $service->reads);
    }

    public function testStaffPickerIncludesBookedSlotsWithExistingDurationAndExclusion(): void
    {
        $service = $this->service();
        $calendar = new CalendarModel(['id' => 1, 'type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => [
            'timezone' => 'UTC', 'duration' => 30, 'increment' => 30,
            'hours' => [['day' => 1, 'start' => '08:00', 'end' => '10:00']],
        ]]);
        $service->occupied = [['start' => '2026-10-12T08:30:00Z', 'end' => '2026-10-12T09:00:00Z', 'buffer' => 15]];
        $slots = $service->availableSlots($calendar, '2026-10-12', false, 42, 60, true);
        self::assertSame([false, false, false], array_column($slots, 'available'));
        self::assertSame('8:00am - 9:00am', $slots[0]['label']);
        self::assertSame([42], $service->exclusions);
        self::assertSame([['2026-10-12', null]], $service->reads);
        self::assertSame([], $service->availableSlots($calendar, '2026-10-12', false, 42, 60));
        $service->occupied = [];
        self::assertSame([true, true, true], array_column($service->availableSlots($calendar, '2026-10-12', false, 42, 60, true), 'available'));
    }

    private function service(): BookingsService
    {
        return new class extends BookingsService {
            public array $reads = [];
            public array $occupied = [];
            public array $exclusions = [];

            protected function busy(int $calendarId, ?int $except = null, bool $lock = false, ?string $date = null, string $timezone = 'UTC', ?string $dateTo = null): array
            {
                $this->reads[] = [$date, $dateTo];
                $this->exclusions[] = $except;

                return $this->occupied;
            }
        };
    }
}
