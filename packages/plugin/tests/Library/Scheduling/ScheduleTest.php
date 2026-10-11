<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\i18n\Locale;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Scheduling\Availability;
use Solspace\Calendar\Library\Scheduling\Schedule;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\SettingsService;

/** @covers \Solspace\Calendar\Library\Scheduling\Schedule */
class ScheduleTest extends TestCase
{
    private mixed $previousApp;
    private ?Calendar $previousPlugin;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        \Craft::$app = new class {
            public string $timeZone = 'UTC';
            public array $loadedModules = [];

            public function getI18n(): object
            {
                return new class {
                    public function translate($category, $message, $params, $language): string
                    {
                        return strtr($message, array_combine(array_map(static fn ($key) => '{'.$key.'}', array_keys($params)), $params));
                    }
                };
            }

            public function getFormattingLocale(): Locale
            {
                return new Locale('en-US');
            }
        };
        $settings = $this->createMock(SettingsService::class);
        $settings->method('getSettingsModel')->willReturn(new SettingsModel());
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->setComponents(['settings' => $settings]);
        Calendar::setInstance($plugin);
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        Calendar::setInstance($this->previousPlugin);
    }

    public function testCalendarSelectionIsCanonicalAndRestrictedToManageableResources(): void
    {
        $calendars = [7 => 'A', 2 => 'B', 5 => 'C'];
        self::assertSame([7, 2, 5], Schedule::calendarIds($calendars, 'all'));
        self::assertSame([7, 5], Schedule::calendarIds($calendars, '5,7,5'));
        self::assertSame([2], Schedule::calendarIds($calendars, '2'));
        foreach (['', '0', '-1', '7,', '7, 2', 'ALL', ['7']] as $invalid) {
            try {
                Schedule::calendarIds($calendars, $invalid);
                self::fail('Accepted an invalid selection.');
            } catch (\InvalidArgumentException) {
                self::assertTrue(true);
            }
        }
        $this->expectException(\OutOfBoundsException::class);
        Schedule::calendarIds($calendars, '7,9');
    }

    public function testAvailabilityUsesEachResourceTimezoneAndStaysInItsOwnColumn(): void
    {
        $day = new \DateTimeImmutable('2026-10-12', new \DateTimeZone('America/Winnipeg'));
        $room = new CalendarModel(['id' => 7, 'scheduling' => ['timezone' => 'America/Winnipeg', 'hours' => [['day' => 1, 'start' => '08:00', 'end' => '10:00']]]]);
        $remote = new CalendarModel(['id' => 8, 'scheduling' => ['timezone' => 'Asia/Tokyo', 'hours' => [['day' => 2, 'start' => '08:00', 'end' => '10:00']]]]);
        $dates = [];
        $slots = static function ($resource, $date) use (&$dates) {
            $dates[$resource->id][] = $date;

            return Availability::slots($resource->getSchedulingSettings()->toArray(), $date, [], null, false);
        };
        $localColumn = Schedule::column($room, $day, [], $slots);
        $remoteColumn = Schedule::column($remote, $day, [], $slots);
        self::assertSame(['2026-10-12'], $dates[7]);
        self::assertSame(['2026-10-12', '2026-10-13'], $dates[8]);
        self::assertArrayHasKey(480, $localColumn['slots']);
        self::assertArrayNotHasKey(1080, $localColumn['slots']);
        self::assertArrayHasKey(1080, $remoteColumn['slots']);
        self::assertArrayNotHasKey(480, $remoteColumn['slots']);
        self::assertSame('2026-10-13T08:00:00+09:00', $remoteColumn['slots'][1080][0]['start']);
        self::assertStringContainsString('6', $remoteColumn['slots'][1080][0]['label']);
    }

    public function testOvernightBookingsAreClippedAndDoNotConsumeOtherCalendarLanes(): void
    {
        $room = new CalendarModel(['id' => 7]);
        $day = new \DateTimeImmutable('2026-10-12', new \DateTimeZone('UTC'));
        $bookings = [
            (object) ['calendarId' => 7, 'startDate' => new \DateTimeImmutable('2026-10-11T23:00:00Z'), 'endDate' => new \DateTimeImmutable('2026-10-12T01:00:00Z')],
            (object) ['calendarId' => 8, 'startDate' => new \DateTimeImmutable('2026-10-12T00:00:00Z'), 'endDate' => new \DateTimeImmutable('2026-10-12T02:00:00Z')],
            (object) ['calendarId' => 7, 'startDate' => new \DateTimeImmutable('2026-10-12T00:30:00Z'), 'endDate' => new \DateTimeImmutable('2026-10-12T02:00:00Z')],
            (object) ['calendarId' => 7, 'startDate' => new \DateTimeImmutable('2026-10-12T23:00:00Z'), 'endDate' => new \DateTimeImmutable('2026-10-13T02:00:00Z')],
        ];
        $column = Schedule::column($room, $day, $bookings, static fn () => []);
        self::assertCount(3, $column['bookings']);
        self::assertSame(0, $column['bookings'][0]['minute']);
        self::assertSame(60, $column['bookings'][0]['length']);
        self::assertSame(1, $column['bookings'][1]['lane']);
        self::assertSame(60, $column['bookings'][2]['length']);
        self::assertSame(2, $column['lanes']);
    }

    public function testRepeatedDstStartsRemainSeparateAndMovingUsesDisplayTimezone(): void
    {
        $room = new CalendarModel(['id' => 7, 'scheduling' => ['timezone' => 'America/New_York']]);
        $day = new \DateTimeImmutable('2026-11-01', new \DateTimeZone('America/New_York'));
        $column = Schedule::column($room, $day, [], static fn () => [
            ['start' => '2026-11-01T01:30:00-04:00', 'end' => '2026-11-01T01:00:00-05:00'],
            ['start' => '2026-11-01T01:30:00-05:00', 'end' => '2026-11-01T02:00:00-05:00'],
        ]);
        self::assertCount(2, $column['slots'][90]);
        self::assertSame(30, $column['slots'][90][0]['length']);
        self::assertSame(30, $column['slots'][90][1]['length']);
        $start = Schedule::moveStart('2026-10-12', 1080, 'America/Winnipeg');
        self::assertSame('2026-10-13 08:00', $start->setTimezone(new \DateTimeZone('Asia/Tokyo'))->format('Y-m-d H:i'));
    }

    public function testCombinedAvailabilityOnlyOffersEligibleCalendarsAndRespectsTheirIncrements(): void
    {
        $day = new \DateTimeImmutable('2026-10-12', new \DateTimeZone('UTC'));
        $columns = [];
        foreach ([
            ['id' => 7, 'increment' => 15, 'duration' => 30, 'hours' => [['day' => 1, 'start' => '08:00', 'end' => '10:00']]],
            ['id' => 8, 'increment' => 30, 'duration' => 60, 'hours' => [['day' => 1, 'start' => '09:00', 'end' => '11:00']]],
            ['id' => 9, 'increment' => 60, 'duration' => 60, 'hours' => []],
        ] as $config) {
            $calendar = new CalendarModel(['id' => $config['id'], 'scheduling' => array_diff_key($config, ['id' => true]) + ['timezone' => 'UTC']]);
            $columns[] = Schedule::column($calendar, $day, [], static fn ($resource, $date) => Availability::slots($resource->getSchedulingSettings()->toArray(), $date, [['start' => '2026-10-12T08:00:00Z', 'end' => '2026-10-12T09:00:00Z']], null, false));
        }
        $combined = Schedule::combined($columns);
        self::assertArrayNotHasKey(480, $combined['slots']);
        self::assertSame([7, 8], array_map(static fn ($option) => $option['calendar']->id, $combined['slots'][540]['options']));
        self::assertSame([7], array_map(static fn ($option) => $option['calendar']->id, $combined['slots'][555]['options']));
        self::assertSame([8], array_map(static fn ($option) => $option['calendar']->id, $combined['slots'][600]['options']));
        self::assertSame(15, $combined['slots'][540]['height']);
        self::assertSame(30, $combined['slots'][600]['height']);
        self::assertSame([30, 60], array_column($combined['slots'][540]['options'], 'length'));
        self::assertArrayNotHasKey(631, $combined['slots']);
    }

    public function testCombinedScheduleKeepsFortyCalendarsReadableAndRestoresWidthAfterOverlaps(): void
    {
        $columns = [];
        for ($id = 1; $id <= 40; ++$id) {
            $columns[] = ['calendar' => new CalendarModel(['id' => $id]), 'slots' => [], 'bookings' => [
                ['booking' => (object) ['id' => $id], 'minute' => 480, 'length' => 60, 'label' => '8am - 9am', 'lane' => 0],
            ]];
        }
        $columns[0]['bookings'][] = ['booking' => (object) ['id' => 41], 'minute' => 600, 'length' => 60, 'label' => '10am - 11am', 'lane' => 0];
        $combined = Schedule::combined(array_reverse($columns));
        self::assertCount(3, $combined['bookings']);
        self::assertSame([1, 2, 41], array_map(static fn ($item) => $item['booking']->id, $combined['bookings']));
        self::assertSame([3, 3, 1], array_column($combined['bookings'], 'lanes'));
        self::assertSame([0, 1, 0], array_column($combined['bookings'], 'lane'));
        self::assertCount(1, $combined['overflow']);
        self::assertCount(38, $combined['overflow'][0]['items']);
        self::assertSame(480, $combined['overflow'][0]['minute']);
        self::assertSame(60, $combined['overflow'][0]['length']);
        self::assertSame(40, $combined['overflow'][0]['items'][37]['calendar']->id);
    }

    public function testCombinedSchedulePreservesBothDstChoicesAndIndependentOverlapGroups(): void
    {
        $calendar = new CalendarModel(['id' => 7, 'scheduling' => ['timezone' => 'America/New_York']]);
        $day = new \DateTimeImmutable('2026-11-01', new \DateTimeZone('America/New_York'));
        $column = Schedule::column($calendar, $day, [], static fn () => [
            ['start' => '2026-11-01T01:30:00-04:00', 'end' => '2026-11-01T01:00:00-05:00'],
            ['start' => '2026-11-01T01:30:00-05:00', 'end' => '2026-11-01T02:00:00-05:00'],
        ]);
        $column['bookings'] = [
            ['booking' => (object) ['id' => 1], 'minute' => 0, 'length' => 60, 'label' => 'midnight'],
            ['booking' => (object) ['id' => 2], 'minute' => 30, 'length' => 60, 'label' => 'half past'],
            ['booking' => (object) ['id' => 3], 'minute' => 60, 'length' => 60, 'label' => 'one'],
            ['booking' => (object) ['id' => 4], 'minute' => 180, 'length' => 60, 'label' => 'three'],
        ];
        $combined = Schedule::combined([$column]);
        self::assertSame(['2026-11-01T01:30:00-04:00', '2026-11-01T01:30:00-05:00'], array_column($combined['slots'][90]['options'], 'start'));
        self::assertSame([2, 2, 2, 1], array_column($combined['bookings'], 'lanes'));
        self::assertSame([0, 1, 0, 0], array_column($combined['bookings'], 'lane'));
        self::assertSame([], $combined['overflow']);
    }

    public function testMovesRejectInvalidAndNonexistentDisplayTimes(): void
    {
        foreach ([['2026-02-30', 0, 'UTC'], ['2026-10-12', 1440, 'UTC'], ['2026-10-12', -1, 'UTC'], ['2026-10-12', 1.5, 'UTC'], ['2026-10-12', 30, 'invalid'], ['2026-03-08', 150, 'America/New_York']] as $args) {
            try {
                Schedule::moveStart(...$args);
                self::fail('Accepted an invalid schedule time.');
            } catch (\InvalidArgumentException) {
                self::assertTrue(true);
            }
        }
    }
}
