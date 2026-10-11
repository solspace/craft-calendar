<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\helpers\Db;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Scheduling\BookingConflictException;
use Solspace\Calendar\Library\Scheduling\BookingHistory;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SchedulingSettings;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Services\CalendarsService;
use yii\caching\ArrayCache;
use yii\db\Connection;
use yii\web\ForbiddenHttpException;

/**
 * @internal
 *
 * @requires extension pdo_sqlite
 *
 * @covers \Solspace\Calendar\Library\Scheduling\BookingHistory
 */
class BookingHistoryTest extends TestCase
{
    private Connection $db;
    private BookingHistory $history;
    private mixed $previousApp;
    private mixed $previousPlugin;
    private mixed $previousDb;
    private bool $allowed = true;
    private int $userId = 7;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        $property = new \ReflectionProperty(Db::class, '_db');
        $this->previousDb = $property->getValue();
        $property->setValue(null, null);
        $this->db = new Connection(['dsn' => 'sqlite::memory:']);
        $this->db->createCommand('CREATE TABLE elements (id INTEGER PRIMARY KEY, dateDeleted TEXT)')->execute();
        $this->db->createCommand('CREATE TABLE calendar_calendars (id INTEGER PRIMARY KEY, type TEXT, scheduling TEXT)')->execute();
        $this->db->createCommand('CREATE TABLE calendar_bookings (id INTEGER PRIMARY KEY, calendarId INTEGER, startDate TEXT, endDate TEXT, customerName TEXT, customerEmail TEXT, notes TEXT, bookingStatus TEXT, buffer INTEGER, statusChangedAt TEXT, statusChangedById INTEGER, statusChangedByName TEXT, statusChangeSource TEXT)')->execute();
        $settings = (new SchedulingSettings(['timezone' => 'America/Winnipeg']))->toArray();
        $this->db->createCommand()->insert('calendar_calendars', ['id' => 1, 'type' => 'scheduling', 'scheduling' => json_encode($settings)])->execute();
        $this->db->createCommand()->insert('elements', ['id' => 42])->execute();
        $this->db->createCommand()->insert('calendar_bookings', ['id' => 42, 'calendarId' => 1, 'startDate' => '2026-10-12 14:00:00', 'endDate' => '2026-10-12 14:30:00', 'customerName' => 'Customer', 'customerEmail' => 'customer@example.com', 'notes' => 'Original notes', 'bookingStatus' => 'confirmed', 'buffer' => 0, 'statusChangedAt' => '2026-10-11 06:56:00', 'statusChangedById' => 7, 'statusChangedByName' => 'Kelsey', 'statusChangeSource' => 'user'])->execute();
        $cache = new ArrayCache();
        $user = new class($this) {
            public function __construct(private BookingHistoryTest $test) {}

            public function getId(): int
            {
                return $this->test->currentUserId();
            }
        };
        \Craft::$app = new class($this->db, $cache, $user) {
            public string $language = 'en-US';
            public array $loadedModules = [];

            public function __construct(public $db, private $cache, private $user) {}

            public function getDb()
            {
                return $this->db;
            }

            public function getCache()
            {
                return $this->cache;
            }

            public function getUser()
            {
                return $this->user;
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
        $calendars = $this->createMock(CalendarsService::class);
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->setComponents(['calendars' => $calendars]);
        Calendar::setInstance($plugin);
        $service = $this->getMockBuilder(BookingsService::class)->onlyMethods(['canManage', 'save'])->getMock();
        $service->method('canManage')->willReturnCallback(fn () => $this->allowed);
        $service->method('save')->willReturnCallback(function (Booking $booking) use ($service): bool {
            try {
                // Keep real server availability validation; mock Craft's element lifecycle only.
                $service->assertSaveAllowed($booking);
            } catch (BookingConflictException $exception) {
                $booking->addError('startDate', $exception->getMessage());

                return false;
            }
            $this->db->createCommand()->update('calendar_bookings', $booking->getRecordData(), ['id' => $booking->id])->execute();

            return true;
        });
        $this->history = new class($service, $this) extends BookingHistory {
            public function __construct(BookingsService $service, private BookingHistoryTest $test)
            {
                parent::__construct($service);
            }

            protected function booking(int $id): Booking
            {
                return $this->test->booking($id);
            }
        };
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

    public function booking(int $id): Booking
    {
        $row = $this->row($id);
        $booking = $this->getMockBuilder(Booking::class)->disableOriginalConstructor()->onlyMethods(['getCalendar'])->getMock();
        foreach ($row as $key => $value) {
            $booking->{$key} = \in_array($key, ['startDate', 'endDate', 'statusChangedAt'], true) && $value ? new \DateTimeImmutable($value, new \DateTimeZone('UTC')) : $value;
        }
        $booking->method('getCalendar')->willReturn(new CalendarModel(['id' => 1, 'type' => 'scheduling']));

        return $booking;
    }

    public function testMultipleMovesUndoAndRedoExactlyAndPreserveDuration(): void
    {
        $first = $this->move('10:00');
        $second = $this->move('11:00');
        $this->history->replay($second, 'undo');
        self::assertSame('2026-10-12 15:00:00', $this->row()['startDate']);
        $this->history->replay($first, 'undo');
        self::assertSame('2026-10-12 14:30:00', $this->row()['endDate']);
        $this->history->replay($first, 'redo');
        $this->history->replay($second, 'redo');
        self::assertSame('2026-10-12 16:00:00', $this->row()['startDate']);
        self::assertSame('2026-10-12 16:30:00', $this->row()['endDate']);
    }

    public function testReplayPreservesLaterNotesAndStatusAttribution(): void
    {
        $token = $this->move('10:00');
        $this->db->createCommand()->update('calendar_bookings', ['notes' => 'Later notes'], ['id' => 42])->execute();
        $this->history->replay($token, 'undo');
        self::assertSame('Later notes', $this->row()['notes']);
        self::assertSame('Kelsey', $this->row()['statusChangedByName']);
        self::assertSame('2026-10-11 06:56:00', $this->row()['statusChangedAt']);
    }

    public function testNewReservationBlocksUndoWithoutLosingTheToken(): void
    {
        $token = $this->move('10:00');
        $busy = $this->row();
        $busy['id'] = 43;
        $busy['startDate'] = '2026-10-12 14:00:00';
        $busy['endDate'] = '2026-10-12 14:30:00';
        $this->db->createCommand()->insert('elements', ['id' => 43])->execute();
        $this->db->createCommand()->insert('calendar_bookings', $busy)->execute();

        try {
            $this->history->replay($token, 'undo');
            self::fail('The new reservation must block undo.');
        } catch (\RuntimeException) {
            self::assertSame('2026-10-12 15:00:00', $this->row()['startDate']);
        }
        $this->db->createCommand()->delete('calendar_bookings', ['id' => 43])->execute();
        $this->history->replay($token, 'undo');
        self::assertSame('2026-10-12 14:00:00', $this->row()['startDate']);
    }

    public function testLaterStatusChangesBlockReplay(): void
    {
        $token = $this->move('10:00');
        $this->db->createCommand()->update('calendar_bookings', ['bookingStatus' => 'cancelled'], ['id' => 42])->execute();
        $this->expectException(\RuntimeException::class);
        $this->history->replay($token, 'undo');
    }

    public function testTokensCannotBeReplayedByAnotherUser(): void
    {
        $token = $this->move('10:00');
        $this->userId = 8;
        $this->expectException(\RuntimeException::class);
        $this->history->replay($token, 'undo');
    }

    public function testPermissionsAreCheckedAgainOnReplay(): void
    {
        $token = $this->move('10:00');
        $this->allowed = false;
        $this->expectException(ForbiddenHttpException::class);
        $this->history->replay($token, 'undo');
    }

    public function testNoOpMoveDoesNotCreateHistory(): void
    {
        self::assertNull($this->move('09:00'));
    }

    public function testFailedMovesRollback(): void
    {
        try {
            $this->move('23:00');
            self::fail('Outside opening hours must fail.');
        } catch (\RuntimeException) {
            self::assertSame('2026-10-12 14:00:00', $this->row()['startDate']);
        }
    }

    public function testRepeatedUndoIsRejected(): void
    {
        $token = $this->move('10:00');
        $this->history->replay($token, 'undo');
        $this->expectException(\RuntimeException::class);
        $this->history->replay($token, 'undo');
    }

    private function move(string $time): ?string
    {
        return $this->history->move(42, new \DateTimeImmutable('2026-10-12T'.$time.':00-05:00'));
    }

    private function row(int $id = 42): array
    {
        return $this->db->createCommand('SELECT * FROM calendar_bookings WHERE id=:id', [':id' => $id])->queryOne();
    }
}
