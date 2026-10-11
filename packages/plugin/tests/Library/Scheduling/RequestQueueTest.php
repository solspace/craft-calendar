<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\helpers\Db;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Scheduling\RequestQueue;
use Solspace\Calendar\Services\BookingsService;
use yii\db\Connection;

/** @covers \Solspace\Calendar\Library\Scheduling\RequestQueue */
class RequestQueueTest extends TestCase
{
    private mixed $previousApp;
    private mixed $previousDb;
    private Connection $db;
    private RequestQueue $queue;
    private array $scans = [];

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $property = new \ReflectionProperty(Db::class, '_db');
        $this->previousDb = $property->getValue();
        $property->setValue(null, null);
        $this->db = new Connection(['dsn' => 'sqlite::memory:']);
        $this->db->createCommand('CREATE TABLE elements (id INTEGER PRIMARY KEY, dateCreated TEXT, dateDeleted TEXT)')->execute();
        $this->db->createCommand('CREATE TABLE calendar_calendars (id INTEGER PRIMARY KEY, type TEXT, name TEXT)')->execute();
        $this->db->createCommand('CREATE TABLE calendar_bookings (id INTEGER PRIMARY KEY, calendarId INTEGER, customerName TEXT, customerEmail TEXT, bookingStatus TEXT, startDate TEXT, endDate TEXT)')->execute();
        \Craft::$app = new class($this->db) {
            public function __construct(public Connection $db) {}

            public function getDb(): Connection
            {
                return $this->db;
            }
        };
        foreach ([[1, 'scheduling', 'Studio'], [2, 'scheduling', 'Private'], [3, 'events', 'Events']] as [$id, $type, $name]) {
            $this->db->createCommand()->insert('calendar_calendars', compact('id', 'type', 'name'))->execute();
        }
        for ($id = 1; $id <= 122; ++$id) {
            $this->db->createCommand()->insert('elements', ['id' => $id, 'dateCreated' => '2026-10-11 01:00:00', 'dateDeleted' => $id === 119 ? '2026-10-11 02:00:00' : null])->execute();
            $this->db->createCommand()->insert('calendar_bookings', ['id' => $id, 'calendarId' => $id === 121 ? 2 : ($id === 122 ? 3 : 1), 'customerName' => 'Customer '.$id, 'customerEmail' => 'person'.$id.'@example.test', 'bookingStatus' => $id === 120 ? 'confirmed' : 'requested', 'startDate' => '2026-10-12 09:00:00', 'endDate' => '2026-10-12 09:30:00'])->execute();
        }
        $service = $this->getMockBuilder(BookingsService::class)->onlyMethods(['unavailableRequestIds'])->getMock();
        $service->method('unavailableRequestIds')->willReturnCallback(function ($records, $calendars, $batch): array {
            $this->scans[] = [\count($records), $batch];

            return array_fill_keys(array_map(static fn ($row) => $row->id, array_filter($records, static fn ($row) => (int) $row->id % 2 === 0)), true);
        });
        $this->queue = new RequestQueue($service);
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        (new \ReflectionProperty(Db::class, '_db'))->setValue(null, $this->previousDb);
    }

    public function testCountAndPagesExcludeTrashDecidedRequestsOtherCalendarsAndEvents(): void
    {
        self::assertSame(118, $this->queue->count([1]));
        self::assertSame(119, $this->queue->count([1, 2, 3]));
        self::assertSame(0, $this->queue->count([]));
        $page = $this->queue->page([], [1], '', 'submitted-asc', 'all', 1);
        self::assertSame(range(1, 50), $page['ids']);
        self::assertSame(118, $page['total']);
        self::assertSame([[50, false]], $this->scans);
        $last = $this->queue->page([], [1], '', 'submitted-asc', 'all', 999);
        self::assertSame(3, $last['page']);
        self::assertSame(range(101, 118), $last['ids']);
        self::assertSame(range(118, 69), $this->queue->page([], [1], '', 'submitted-desc', 'all', 1)['ids']);
    }

    public function testAvailabilityFiltersRunBeforePaginationAndScanOnlyRequestedRecords(): void
    {
        $page = $this->queue->page([], [1], '', 'submitted-asc', 'unavailable', 2);
        self::assertSame(59, $page['total']);
        self::assertSame(range(102, 118, 2), $page['ids']);
        self::assertSame(array_fill_keys($page['ids'], true), $page['unavailableRequestIds']);
        self::assertSame([[118, true]], $this->scans);
        $available = $this->queue->page([], [1], '', 'submitted-asc', 'available', 2);
        self::assertSame(range(101, 117, 2), $available['ids']);
        self::assertSame([], $available['unavailableRequestIds']);
    }

    public function testSearchUsesCustomerNameOrEmailAndEmptyResultsStayOnFirstPage(): void
    {
        self::assertSame([12], $this->queue->page([], [1], 'person12@', 'customer-asc', 'all', 1)['ids']);
        self::assertSame([42], $this->queue->page([], [1], 'Customer 42', 'date-asc', 'all', 1)['ids']);
        $empty = $this->queue->page([], [1], 'missing', 'calendar-asc', 'unavailable', 9);
        self::assertSame([], $empty['ids']);
        self::assertSame(0, $empty['total']);
        self::assertSame(1, $empty['page']);
    }
}
