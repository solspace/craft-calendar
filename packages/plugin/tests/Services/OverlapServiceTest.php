<?php

namespace Solspace\Tests\Unit\Calendar\Services;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceProvider;
use Solspace\Calendar\Elements\Db\OccurrenceQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\OccurrenceModel;
use Solspace\Calendar\Services\OccurrencesService;
use Solspace\Calendar\Services\OverlapService;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Services\OverlapService
 */
class OverlapServiceTest extends TestCase
{
    private array $criteria = [];
    private array $candidates = [];
    private OccurrenceQuery $query;
    private mixed $previousApp;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        \Craft::$app = new class {
            public function getTimeZone(): string
            {
                return 'America/Winnipeg';
            }
        };
        Carbon::setTestNow(new Carbon('2026-10-09 12:00:00', 'UTC'));
        $this->query = $this->getMockBuilder(OccurrenceQuery::class)->disableOriginalConstructor()->onlyMethods(['all'])->getMock();
        $this->query->method('all')->willReturnCallback(fn () => $this->candidates);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        \Craft::$app = $this->previousApp;
    }

    public function testFeedSearchChecksOtherEventsInSameCalendarAndSite(): void
    {
        $target = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-14 11:00:00');
        $this->candidates = [$target, $this->occurrence(43, '2026-10-14 10:30:00', '2026-10-14 11:30:00')];
        $result = $this->service()->forFeed([$target], 3);
        self::assertSame(1, $result[$target->getOccurrenceKey()]['count']);
        self::assertSame(3, $this->criteria['siteId']);
        self::assertSame([1], $this->criteria['calendarId']);
        self::assertFalse($this->criteria['cancelled']);
        self::assertArrayNotHasKey('search', $this->criteria);
        self::assertNull($this->query->event);
        self::assertSame(Event::STATUS_LIVE, $this->query->status);
    }

    public function testAllDayUsesInclusiveStoredLastDayAndExclusiveConflictBoundary(): void
    {
        $target = $this->occurrence(42, '2026-10-14 00:00:00', '2026-10-15 23:59:59', true);
        $this->candidates = [
            $this->occurrence(43, '2026-10-15 23:00:00', '2026-10-16 00:00:00'),
            $this->occurrence(44, '2026-10-16 00:00:00', '2026-10-16 01:00:00'),
        ];
        $result = $this->service()->forFeed([$target], 1);
        self::assertSame(1, $result[$target->getOccurrenceKey()]['count']);
        self::assertSame('2026-10-16 00:00:00', $this->criteria['rangeEnd']->format('Y-m-d H:i:s'));
    }

    public function testDisabledAndCancelledTargetsSkipTheConflictQuery(): void
    {
        $disabled = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-14 11:00:00');
        $disabled->event->enabled = false;
        $cancelled = clone $disabled;
        $cancelled->cancelled = true;
        self::assertSame([], $this->service()->forFeed([$disabled, $cancelled], 1));
        self::assertSame([], $this->criteria);
    }

    public function testExpiredAndPendingTargetsDoNotProduceConflictWarnings(): void
    {
        $expired = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-14 11:00:00');
        $expired->event->expiryDate = new \DateTime('2026-10-01 00:00:00', new \DateTimeZone('UTC'));
        $pending = $this->occurrence(43, '2026-10-14 10:00:00', '2026-10-14 11:00:00');
        $pending->event->postDate = new Carbon('2099-01-01 00:00:00', 'UTC');
        self::assertSame([], $this->service()->forFeed([$expired, $pending], 1));
        self::assertSame([], $this->criteria);
    }

    public function testPreviewPreservesFloatingTimesAndExcludesCanonicalEvent(): void
    {
        $target = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-14 11:00:00')->event;
        $target->id = null; // A new editor can have a canonical ID without saved override rows in this test.
        $target->startDate = new Carbon('2026-10-14 10:00:00', 'Europe/Riga');
        $target->endDate = new Carbon('2026-10-14 11:00:00', 'Europe/Riga');
        $target->rrule = null;
        $this->candidates = [$this->occurrence(43, '2026-10-14 10:30:00', '2026-10-14 11:30:00')];
        $result = $this->service()->forSchedule($target);
        self::assertSame(1, $result['count']);
        self::assertSame(['not', 42], $this->query->event);
        self::assertSame('2026-10-14 10:00:00', $this->criteria['rangeStart']->format('Y-m-d H:i:s'));
        self::assertFalse($result['recurring']);
    }

    public function testRecurringPreviewIncludesAdditionalDatesButNotExcludedDates(): void
    {
        $event = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-14 11:00:00')->event;
        $event->id = null;
        $event->rrule = "DTSTART:20261014T100000\nRRULE:FREQ=WEEKLY;COUNT=3\nEXDATE:20261021T100000\nRDATE:20261022T100000";
        $this->candidates = [
            $this->occurrence(43, '2026-10-21 10:00:00', '2026-10-21 11:00:00'),
            $this->occurrence(44, '2026-10-22 10:00:00', '2026-10-22 11:00:00'),
        ];
        $result = $this->service()->forSchedule($event);
        self::assertSame(1, $result['count']);
        self::assertSame(3, $result['checked']);
        self::assertSame('Event 44', $result['events'][0]['title']);
    }

    public function testPreviewCountsAllConflictsBeforeLimitingDetails(): void
    {
        $event = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-14 11:00:00')->event;
        $event->id = null;
        for ($id = 43; $id < 53; ++$id) {
            $this->candidates[] = $this->occurrence($id, '2026-10-14 10:30:00', '2026-10-14 11:30:00');
        }
        $result = $this->service()->forSchedule($event);
        self::assertSame(10, $result['count']);
        self::assertCount(3, $result['events']);
    }

    public function testRecurringPreviewCountsSharedConflictsOnce(): void
    {
        $event = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-14 11:00:00')->event;
        $event->id = null;
        $event->rrule = "DTSTART:20261014T100000\nRRULE:FREQ=DAILY;COUNT=2";
        $this->candidates = [$this->occurrence(43, '2026-10-14 10:30:00', '2026-10-15 11:30:00')];
        $result = $this->service()->forSchedule($event);
        self::assertSame(1, $result['count']);
        self::assertCount(1, $result['events']);
    }

    public function testInfinitePreviewIsBounded(): void
    {
        $event = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-14 11:00:00')->event;
        $event->id = null;
        $event->rrule = "DTSTART:20261014T100000\nRRULE:FREQ=DAILY";
        $result = $this->service()->forSchedule($event);
        self::assertTrue($result['limited']);
        self::assertSame(100, $result['checked']);
        self::assertSame('2027-10-14', $result['through']);
    }

    public function testOccurrencePreviewExcludesItselfButNotOtherOccurrencesOfItsEvent(): void
    {
        $target = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-16 10:00:00');
        $this->candidates = [$target, $this->occurrence(42, '2026-10-15 10:00:00', '2026-10-17 10:00:00')];
        $times = ['startDate' => $target->startDate, 'endDate' => $target->endDate, 'allDay' => false, 'cancelled' => false];
        $result = $this->service()->forOccurrence($target->event, '2026-10-14 10:00:00', $times);
        self::assertSame(1, $result['count']);
        $times['cancelled'] = true;
        self::assertSame(0, $this->service()->forOccurrence($target->event, '2026-10-14 10:00:00', $times)['count']);
    }

    public function testUnsavedRecurringOccurrencesCanOverlapEachOther(): void
    {
        $event = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-16 10:00:00')->event;
        $event->id = null;
        $event->rrule = "DTSTART:20261014T100000\nRRULE:FREQ=DAILY;COUNT=2";
        $result = $this->service()->forSchedule($event);
        self::assertSame(2, $result['count']);
        self::assertSame('Event 42', $result['events'][0]['title']);
    }

    public function testPreviewAppliesMovedAndCancelledOverridesAndIgnoresOrphans(): void
    {
        $event = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-14 11:00:00')->event;
        $event->rrule = "DTSTART:20261014T100000\nRRULE:FREQ=WEEKLY;COUNT=3";
        $moved = $this->override('2026-10-14 10:00:00', '2026-10-15 12:00:00', '2026-10-15 13:00:00');
        $cancelled = $this->override('2026-10-21 10:00:00');
        $cancelled->cancelled = true;
        $orphan = $this->override('2026-10-22 10:00:00', '2026-10-22 12:00:00', '2026-10-22 13:00:00');
        $this->candidates = [
            $this->occurrence(43, '2026-10-14 10:00:00', '2026-10-14 11:00:00'),
            $this->occurrence(44, '2026-10-15 12:00:00', '2026-10-15 13:00:00'),
            $this->occurrence(45, '2026-10-21 10:00:00', '2026-10-21 11:00:00'),
            $this->occurrence(46, '2026-10-22 12:00:00', '2026-10-22 13:00:00'),
        ];
        $result = $this->service([$moved, $cancelled, $orphan])->forSchedule($event);
        self::assertSame(1, $result['count']);
        self::assertSame('Event 44', $result['events'][0]['title']);
        self::assertSame(2, $result['checked']);
    }

    public function testMovedOccurrenceFromOutsideThePreviewRangeIsIncluded(): void
    {
        $event = $this->occurrence(42, '2026-10-14 10:00:00', '2026-10-14 11:00:00')->event;
        $event->rrule = "DTSTART:20261014T100000\nRRULE:FREQ=YEARLY;COUNT=3";
        $moved = $this->override('2028-10-14 10:00:00', '2026-10-15 12:00:00', '2026-10-15 13:00:00');
        $this->candidates = [$this->occurrence(43, '2026-10-15 12:00:00', '2026-10-15 13:00:00')];
        $result = $this->service([$moved])->forSchedule($event);
        self::assertSame(1, $result['count']);
        self::assertSame('Event 43', $result['events'][0]['title']);
    }

    private function override(string $recurrenceId, ?string $start = null, ?string $end = null): OccurrenceOverride
    {
        $override = $this->getMockBuilder(OccurrenceOverride::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
        $override->recurrenceId = new Carbon($recurrenceId, 'UTC');
        $override->startDate = $start ? new Carbon($start, 'UTC') : null;
        $override->endDate = $end ? new Carbon($end, 'UTC') : null;
        $override->allDay = false;

        return $override;
    }

    private function service(array $overrides = []): OverlapService
    {
        $provider = $this->createMock(OccurrenceProvider::class);
        $provider->method('createQuery')->willReturnCallback(function (array $criteria) {
            $this->criteria = $criteria;

            return $this->query;
        });
        $occurrences = $this->createMock(OccurrencesService::class);
        $occurrences->method('getOverrides')->willReturn($overrides);

        return new OverlapService($provider, occurrences: $occurrences);
    }

    private function occurrence(int $eventId, string $start, string $end, bool $allDay = false): OccurrenceModel
    {
        $event = $this->getMockBuilder(Event::class)->disableOriginalConstructor()->onlyMethods(['getCpEditUrl', 'getCanonicalId', 'getEnabledForSite', 'getFieldLayout'])->getMock();
        $event->method('getCpEditUrl')->willReturn('/admin/calendar/events/'.$eventId);
        $event->method('getCanonicalId')->willReturn($eventId);
        $event->method('getEnabledForSite')->willReturn(true);
        $event->method('getFieldLayout')->willReturn(null);
        $event->id = $eventId;
        $event->siteId = 1;
        $event->calendarId = 1;
        $event->title = 'Event '.$eventId;
        $event->enabled = true;
        $event->enabledForSite = true;
        $event->postDate = new Carbon('2026-10-01 00:00:00', 'UTC');
        $event->allDay = $allDay;
        $event->startDate = new Carbon($start, 'UTC');
        $event->endDate = new Carbon($end, 'UTC');
        $occurrence = new OccurrenceModel();
        $occurrence->event = $event;
        $occurrence->calendar = new CalendarModel();
        $occurrence->calendar->id = 1;
        $occurrence->recurrenceId = new Carbon($start, 'UTC');
        $occurrence->startDate = new Carbon($start, 'UTC');
        $occurrence->endDate = new Carbon($end, 'UTC');
        $occurrence->allDay = $allDay;

        return $occurrence;
    }
}
