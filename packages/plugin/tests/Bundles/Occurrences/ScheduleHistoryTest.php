<?php

namespace Solspace\Tests\Unit\Calendar\Bundles\Occurrences;

use craft\db\Connection;
use craft\helpers\Db;
use craft\services\Elements;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceMaterializer;
use Solspace\Calendar\Bundles\Occurrences\ScheduleHistory;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\SeriesService;
use yii\caching\ArrayCache;
use yii\mutex\FileMutex;
use yii\web\Response;

/**
 * Exercises snapshot persistence in SQLite; Craft's element lifecycle and occurrence generation are
 * mocked, leaving real scheduling, ownership and durable-code rows to be restored in transactions.
 *
 * @internal
 *
 * @requires extension pdo_sqlite
 *
 * @covers \Solspace\Calendar\Bundles\Occurrences\ScheduleHistory
 */
class ScheduleHistoryTest extends TestCase
{
    private Connection $db;
    private ScheduleHistory $history;
    private mixed $previousApp;
    private mixed $previousPlugin;
    private mixed $previousDb;
    private int $userId = 7;
    private bool $failRestore = false;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        $property = new \ReflectionProperty(Db::class, '_db');
        $this->previousDb = $property->getValue();
        $property->setValue(null, null);
        $this->db = new Connection(['dsn' => 'sqlite::memory:']);
        foreach ([
            'elements' => 'id INTEGER PRIMARY KEY, dateDeleted TEXT, dateUpdated TEXT',
            'elements_sites' => 'elementId INTEGER, siteId INTEGER, title TEXT, slug TEXT, uri TEXT, content TEXT, enabled INTEGER',
            'elements_owners' => 'elementId INTEGER, ownerId INTEGER, sortOrder INTEGER',
            'calendar_events' => 'id INTEGER PRIMARY KEY, startDate TEXT, endDate TEXT, until TEXT, timezone TEXT, allDay INTEGER, rrule TEXT, repeatType TEXT, repeatEndType TEXT, seriesId INTEGER',
            'calendar_occurrence_overrides' => 'id INTEGER PRIMARY KEY, primaryOwnerId INTEGER, recurrenceId TEXT, startDate TEXT, endDate TEXT, allDay INTEGER, cancelled INTEGER, orphaned INTEGER',
            'calendar_occurrence_codes' => 'eventId INTEGER, recurrenceId TEXT, code TEXT UNIQUE, PRIMARY KEY(eventId, recurrenceId)',
        ] as $table => $columns) {
            $this->db->createCommand("CREATE TABLE {$table} ({$columns})")->execute();
        }
        $elements = $this->createMock(Elements::class);
        $elements->method('deleteElement')->willReturnCallback(function ($element): bool {
            $this->db->createCommand()->update('elements', ['dateDeleted' => '2026-10-09'], ['id' => $element->id])->execute();

            return true;
        });
        $elements->method('restoreElement')->willReturnCallback(function ($element): bool {
            if ($this->failRestore) {
                return false;
            }
            $this->db->createCommand()->update('elements', ['dateDeleted' => null], ['id' => $element->id])->execute();
            $element->trashed = false;

            return true;
        });
        $cache = new ArrayCache();
        $mutex = new FileMutex(['mutexPath' => sys_get_temp_dir().'/calendar-history-tests']);
        $user = new class($this) {
            public function __construct(private ScheduleHistoryTest $test) {}

            public function getId(): int
            {
                return $this->test->currentUserId();
            }
        };
        \Craft::$app = new class($this->db, $elements, $cache, $mutex, $user) {
            public string $language = 'en-US';
            public string $charset = 'UTF-8';
            public array $loadedModules = [];

            public function __construct(private $db, private $elements, private $cache, private $mutex, private $user) {}

            public function getDb()
            {
                return $this->db;
            }

            public function getElements()
            {
                return $this->elements;
            }

            public function getCache()
            {
                return $this->cache;
            }

            public function getMutex()
            {
                return $this->mutex;
            }

            public function getUser()
            {
                return $this->user;
            }

            public function getSearch()
            {
                return new class {
                    public function indexElementAttributes($element): void {}
                };
            }

            public function getI18n()
            {
                return new class {
                    public function translate($category, $message, $params, $language)
                    {
                        return $message;
                    }
                };
            }
        };
        $events = $this->createMock(EventsService::class);
        $events->method('requireEventEditPermissions')->willReturn(true);
        $events->method('getEventById')->willReturnCallback(fn ($id) => $this->event($id));
        $series = $this->createMock(SeriesService::class);
        $series->method('findParts')->willReturnCallback(function () {
            $ids = $this->db->createCommand('SELECT id FROM calendar_events')->queryColumn();
            $query = $this->createMock(EventQuery::class);
            $query->method('status')->willReturnSelf();
            $query->method('ids')->willReturn($ids);

            return $query;
        });
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->setComponents(['events' => $events, 'series' => $series]);
        Calendar::setInstance($plugin);
        $materializer = $this->createMock(OccurrenceMaterializer::class);
        $this->history = new class($materializer, $this) extends ScheduleHistory {
            public function __construct(OccurrenceMaterializer $materializer, private ScheduleHistoryTest $test)
            {
                parent::__construct($materializer);
            }

            protected function event(int $id, int $siteId): Event
            {
                return $this->test->event($id);
            }

            protected function override(int $id, int $siteId): ?OccurrenceOverride
            {
                return $this->test->override($id);
            }
        };
        $this->insertEvent(42, '2026-11-01 10:00:00', '2026-11-01 11:00:00');
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        Calendar::setInstance($this->previousPlugin);
        (new \ReflectionProperty(Db::class, '_db'))->setValue(null, $this->previousDb);
    }

    public function currentUserId(): int
    {
        return $this->userId;
    }

    public function event(int $id): Event
    {
        $event = $this->getMockBuilder(Event::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
        $event->id = $id;
        $event->siteId = 1;
        $event->trashed = (bool) $this->db->createCommand('SELECT dateDeleted FROM elements WHERE id = :id', [':id' => $id])->queryScalar();

        return $event;
    }

    public function override(int $id): OccurrenceOverride
    {
        $override = $this->getMockBuilder(OccurrenceOverride::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
        $override->id = $id;
        $override->siteId = 1;
        $override->trashed = (bool) $this->db->createCommand('SELECT dateDeleted FROM elements WHERE id = :id', [':id' => $id])->queryScalar();

        return $override;
    }

    public function testUndoRedoPreservesTimesAndAllDayExactly(): void
    {
        $token = $this->record(function (): void {
            $this->db->createCommand()->update('calendar_events', ['startDate' => '2026-11-03 00:00:00', 'endDate' => '2026-11-04 23:59:59', 'allDay' => 1], ['id' => 42])->execute();
        });
        $this->history->replay($token, 'undo');
        self::assertSame('2026-11-01 11:00:00', $this->row('calendar_events', 42)['endDate']);
        self::assertSame(0, (int) $this->row('calendar_events', 42)['allDay']);
        $this->history->replay($token, 'redo');
        self::assertSame('2026-11-04 23:59:59', $this->row('calendar_events', 42)['endDate']);
        self::assertSame(1, (int) $this->row('calendar_events', 42)['allDay']);
    }

    public function testNewOccurrenceOverrideIsTrashedAndRestoredWithTheSameId(): void
    {
        $token = $this->record(fn () => $this->insertOverride(91, 42));
        $this->history->replay($token, 'undo');
        self::assertNotNull($this->row('elements', 91)['dateDeleted']);
        $this->history->replay($token, 'redo');
        self::assertNull($this->row('elements', 91)['dateDeleted']);
        self::assertSame(42, (int) $this->row('calendar_occurrence_overrides', 91)['primaryOwnerId']);
        self::assertSame(42, (int) $this->db->createCommand('SELECT ownerId FROM elements_owners WHERE elementId = 91')->queryScalar());
    }

    public function testFollowingSplitRestoresOwnershipAndCodesInBothDirections(): void
    {
        $this->insertOverride(91, 42);
        $this->db->createCommand()->insert('calendar_occurrence_codes', ['eventId' => 42, 'recurrenceId' => '2026-11-01 10:00:00', 'code' => 'earlier-code'])->execute();
        $token = $this->record(function (): void {
            $this->insertEvent(43, '2026-11-01 10:00:00', '2026-11-01 11:00:00');
            $this->db->createCommand()->update('calendar_events', ['startDate' => '2026-11-08 12:00:00', 'endDate' => '2026-11-08 13:00:00', 'seriesId' => 42], ['id' => 42])->execute();
            $this->db->createCommand()->update('calendar_occurrence_overrides', ['primaryOwnerId' => 43], ['id' => 91])->execute();
            $this->db->createCommand()->update('elements_owners', ['ownerId' => 43], ['elementId' => 91])->execute();
            $this->db->createCommand()->update('calendar_occurrence_codes', ['eventId' => 43], ['code' => 'earlier-code'])->execute();
        });
        $this->history->replay($token, 'undo');
        self::assertNotNull($this->row('elements', 43)['dateDeleted']);
        self::assertSame(42, (int) $this->row('calendar_occurrence_overrides', 91)['primaryOwnerId']);
        self::assertSame(42, (int) $this->db->createCommand('SELECT eventId FROM calendar_occurrence_codes WHERE code = "earlier-code"')->queryScalar());
        self::assertNull($this->row('elements', 91)['dateDeleted']);
        $this->history->replay($token, 'redo');
        self::assertNull($this->row('elements', 43)['dateDeleted']);
        self::assertSame(43, (int) $this->row('calendar_occurrence_overrides', 91)['primaryOwnerId']);
        self::assertSame(43, (int) $this->db->createCommand('SELECT eventId FROM calendar_occurrence_codes WHERE code = "earlier-code"')->queryScalar());
    }

    public function testDateBasedTitlesAndUrlsAreRestored(): void
    {
        $token = $this->record(function (): void {
            $this->db->createCommand()->update('calendar_events', ['startDate' => '2026-11-03 10:00:00'], ['id' => 42])->execute();
            $this->db->createCommand()->update('elements_sites', ['title' => 'November 3', 'slug' => 'november-3', 'uri' => 'events/november-3'], ['elementId' => 42])->execute();
        });
        $this->history->replay($token, 'undo');
        self::assertSame('Event', $this->db->createCommand('SELECT title FROM elements_sites WHERE elementId = 42')->queryScalar());
        $this->history->replay($token, 'redo');
        self::assertSame('events/november-3', $this->db->createCommand('SELECT uri FROM elements_sites WHERE elementId = 42')->queryScalar());
    }

    public function testLaterContentChangesBlockUndo(): void
    {
        $token = $this->record(fn () => $this->db->createCommand()->update('calendar_events', ['endDate' => '2026-11-01 12:00:00'], ['id' => 42])->execute());
        $this->db->createCommand()->update('elements_sites', ['content' => '{"location":"Changed elsewhere"}'], ['elementId' => 42])->execute();
        $this->expectException(\RuntimeException::class);
        $this->history->replay($token, 'undo');
    }

    public function testFailedRestoreRollsBackAndCanBeRetried(): void
    {
        $token = $this->record(fn () => $this->insertOverride(91, 42));
        $this->history->replay($token, 'undo');
        $this->failRestore = true;

        try {
            $this->history->replay($token, 'redo');
            self::fail('The lifecycle failure must stop replay.');
        } catch (\RuntimeException) {
            self::assertNotNull($this->row('elements', 91)['dateDeleted']);
            self::assertSame(0, (int) $this->db->createCommand('SELECT COUNT(*) FROM elements_owners WHERE elementId = 91')->queryScalar());
        }
        $this->failRestore = false;
        $this->history->replay($token, 'redo');
        self::assertNull($this->row('elements', 91)['dateDeleted']);
    }

    public function testExpandedOccurrenceWindowDoesNotBlockUndo(): void
    {
        $token = $this->record(fn () => $this->db->createCommand()->update('calendar_events', ['allDay' => 1], ['id' => 42])->execute());
        $this->db->createCommand()->insert('calendar_occurrence_codes', ['eventId' => 42, 'recurrenceId' => '2029-01-01 10:00:00', 'code' => 'new-window'])->execute();
        $this->history->replay($token, 'undo');
        self::assertSame(0, (int) $this->row('calendar_events', 42)['allDay']);
        self::assertSame('new-window', $this->db->createCommand('SELECT code FROM calendar_occurrence_codes')->queryScalar());
    }

    public function testTokensBelongToTheirUser(): void
    {
        $token = $this->record(fn () => $this->db->createCommand()->update('calendar_events', ['allDay' => 1], ['id' => 42])->execute());
        $this->userId = 8;
        $this->expectException(\RuntimeException::class);
        $this->history->replay($token, 'undo');
    }

    private function record(callable $change): string
    {
        $response = $this->history->record($this->event(42), static function () use ($change): Response {
            $change();

            return new Response(['data' => ['success' => true]]);
        });

        return $response->data['historyToken'];
    }

    private function insertEvent(int $id, string $start, string $end): void
    {
        $this->insertElement($id);
        $this->db->createCommand()->insert('calendar_events', ['id' => $id, 'startDate' => $start, 'endDate' => $end, 'timezone' => 'America/Winnipeg', 'allDay' => 0])->execute();
    }

    private function insertOverride(int $id, int $owner): void
    {
        $this->insertElement($id);
        $this->db->createCommand()->insert('calendar_occurrence_overrides', ['id' => $id, 'primaryOwnerId' => $owner, 'recurrenceId' => '2026-11-01 10:00:00', 'startDate' => '2026-11-02 14:00:00', 'endDate' => '2026-11-02 15:00:00', 'allDay' => 0, 'cancelled' => 0, 'orphaned' => 0])->execute();
        $this->db->createCommand()->insert('elements_owners', ['elementId' => $id, 'ownerId' => $owner, 'sortOrder' => 1])->execute();
    }

    private function insertElement(int $id): void
    {
        $this->db->createCommand()->insert('elements', ['id' => $id])->execute();
        $this->db->createCommand()->insert('elements_sites', ['elementId' => $id, 'siteId' => 1, 'title' => 'Event', 'slug' => 'event-'.$id, 'content' => '{"location":"Studio"}', 'enabled' => 1])->execute();
    }

    private function row(string $table, int $id): array
    {
        return $this->db->createCommand("SELECT * FROM {$table} WHERE id = :id", [':id' => $id])->queryOne();
    }
}
