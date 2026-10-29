<?php

namespace Solspace\Tests\Unit\Calendar\Elements;

use Carbon\Carbon;
use craft\console\Application;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\RecurrenceHelper;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\SelectDatesService;

/**
 * @internal
 *
 * @coversNothing
 */
class SelectDatesTest extends TestCase
{
    /** @dataProvider occurrenceLimits */
    public function testQueryCachesEachDayOncePerSite(bool|int|string $loadOccurrences, array $expectedDays): void
    {
        $originalApp = \Craft::$app;
        \Craft::$app = (new \ReflectionClass(Application::class))->newInstanceWithoutConstructor();

        try {
            $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
            $plugin->edition = Calendar::EDITION_PRO;
            \Craft::$app->loadedModules[Calendar::class] = $plugin;

            $events = $this->createMock(EventsService::class);
            $events->method('getRecurringEventMetadata')->willReturn(array_map(static fn ($siteId) => [
                'id' => 467,
                'siteId' => $siteId,
                'startDate' => '2026-10-15 10:00:00',
                'endDate' => '2026-10-15 11:00:00',
                'freq' => RecurrenceHelper::SELECT_DATES,
                'allowRepeatingEvents' => true,
            ], [1, 2]));
            $plugin->set('events', $events);

            $selectDates = $this->createMock(SelectDatesService::class);
            $selectDates->method('getSelectDatesAsCarbonsForEventId')->willReturn([
                new Carbon('2026-10-15', 'UTC'),
                new Carbon('2026-10-16', 'UTC'),
                new Carbon('2026-10-16 12:00:00', 'UTC'),
                new Carbon('2026-10-17', 'UTC'),
            ]);
            $plugin->set('selectDates', $selectDates);

            $query = (new \ReflectionClass(EventQuery::class))->newInstanceWithoutConstructor();
            $query->siteId([1, 2])->setLoadOccurrences($loadOccurrences);
            $method = new \ReflectionMethod(EventQuery::class, 'cacheRecurringEvents');
            $method->setAccessible(true);
            $method->invoke($query, [467]);

            $cache = new \ReflectionProperty(EventQuery::class, 'eventCache');
            $cache->setAccessible(true);
            $dates = [];
            foreach ($cache->getValue($query) as [$date, $id, $siteId]) {
                $dates[$siteId][] = $date->format('Y-m-d H:i:s');
                $this->assertSame(467, $id);
            }

            $expectedDates = array_map(static fn ($day) => $day.' 10:00:00', $expectedDays);
            $this->assertSame([1 => $expectedDates, 2 => $expectedDates], $dates);
        } finally {
            \Craft::$app = $originalApp;
        }
    }

    public static function occurrenceLimits(): array
    {
        return [
            'all occurrences' => [true, ['2026-10-15', '2026-10-16', '2026-10-17']],
            'two distinct occurrences' => [2, ['2026-10-15', '2026-10-16']],
            'next occurrence' => ['next', ['2026-10-15']],
            'stored event only' => [false, ['2026-10-15']],
        ];
    }

    public function testOccurrenceDatesDeduplicateLegacyDatesAndPreserveStartTime(): void
    {
        $event = $this->makeEvent();
        $dates = $event->getOccurrenceDatesBetween();

        $this->assertSame(['2026-10-15', '2026-10-16', '2026-10-17'], array_map(
            static fn ($date) => $date->format('Y-m-d'),
            $dates
        ));
        $this->assertSame('2026-10-15 10:00:00', $event->startDate->toDateTimeString());
    }

    public function testOccurrenceLimitCountsDistinctSelectedDates(): void
    {
        $event = $this->makeEvent();
        $event->setExceptions([]);
        $occurrences = $event->getOccurrences([
            'rangeStart' => '2026-10-15 00:00:00',
            'rangeEnd' => '2026-10-18 00:00:00',
            'limit' => 3,
        ]);

        $this->assertSame(['2026-10-15', '2026-10-16', '2026-10-17'], array_map(
            static fn ($occurrence) => $occurrence->startDate->format('Y-m-d'),
            $occurrences
        ));
    }

    private function makeEvent(): Event
    {
        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['behaviors'])
            ->getMock()
        ;
        $event->method('behaviors')->willReturn([]);
        $event->id = 467;
        $event->freq = RecurrenceHelper::SELECT_DATES;
        $event->startDate = new Carbon('2026-10-15 10:00:00', 'UTC');
        $event->endDate = new Carbon('2026-10-15 11:00:00', 'UTC');
        $event->setSelectDates(['2026-10-15', '2026-10-16', '2026-10-16', '2026-10-17']);

        return $event;
    }
}
