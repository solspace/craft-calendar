<?php

namespace Solspace\Tests\Unit\Calendar\Elements;

use craft\db\Connection;
use craft\helpers\Db;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Scheduling\BookingConflictException;
use Solspace\Calendar\Models\SchedulingSettings;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Services\CalendarsService;

/**
 * @internal
 *
 * @requires extension pdo_sqlite
 *
 * @covers \Solspace\Calendar\Elements\Booking::afterRestore
 */
class BookingRestoreTest extends TestCase
{
    private Connection $db;
    private mixed $previousApp;
    private mixed $previousPlugin;
    private mixed $previousDb;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        $property = new \ReflectionProperty(Db::class, '_db');
        $this->previousDb = $property->getValue();
        $property->setValue(null, null);
        $this->db = new Connection(['dsn' => 'sqlite::memory:']);
        $this->db->createCommand('PRAGMA foreign_keys = ON')->execute();
        $this->db->createCommand('CREATE TABLE elements (id INTEGER PRIMARY KEY, dateDeleted TEXT)')->execute();
        $this->db->createCommand('CREATE TABLE calendar_calendars (id INTEGER PRIMARY KEY, type TEXT, scheduling TEXT)')->execute();
        $this->db->createCommand('CREATE TABLE calendar_bookings (id INTEGER PRIMARY KEY REFERENCES elements(id) ON DELETE CASCADE, calendarId INTEGER, startDate TEXT, endDate TEXT, customerName TEXT, customerEmail TEXT, notes TEXT, bookingStatus TEXT, buffer INTEGER, statusChangedAt TEXT, statusChangedById INTEGER, statusChangedByName TEXT, statusChangeSource TEXT)')->execute();
        $settings = (new SchedulingSettings(['timezone' => 'America/Winnipeg', 'buffer' => 15]))->toArray();
        $this->db->createCommand()->insert('calendar_calendars', ['id' => 1, 'type' => 'scheduling', 'scheduling' => json_encode($settings)])->execute();
        $this->db->createCommand()->insert('elements', ['id' => 42, 'dateDeleted' => '2026-10-11 12:00:00'])->execute();
        $this->db->createCommand()->insert('calendar_bookings', ['id' => 42, 'calendarId' => 1, 'startDate' => '2026-10-12 14:00:00', 'endDate' => '2026-10-12 14:30:00', 'customerName' => 'Customer', 'customerEmail' => 'customer@example.com', 'notes' => 'Original notes', 'bookingStatus' => 'confirmed', 'buffer' => 0, 'statusChangedAt' => '2026-10-11 06:56:00', 'statusChangedById' => 7, 'statusChangedByName' => 'Kelsey', 'statusChangeSource' => 'user'])->execute();
        \Craft::$app = new class($this->db) {
            public string $language = 'en-US';

            public function __construct(public Connection $db) {}

            public function getIsInstalled(): bool
            {
                return false;
            }

            public function getBasePath(): string
            {
                return \dirname((new \ReflectionClass(\Craft::class))->getFileName());
            }

            public function getDb(): Connection
            {
                return $this->db;
            }

            public function getI18n(): object
            {
                return new class {
                    public function translate($category, $message, $params, $language): string
                    {
                        return $message;
                    }
                };
            }
        };
        $service = $this->getMockBuilder(BookingsService::class)->onlyMethods(['save', 'scheduleNotification'])->getMock();
        // Keep real restoration validation and persistence; notification delivery
        // is covered separately by BookingStorageTest.
        $service->expects(self::never())->method('save');
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->setComponents(['bookings' => $service, 'calendars' => $this->createMock(CalendarsService::class)]);
        Calendar::setInstance($plugin);
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        Calendar::setInstance($this->previousPlugin);
        (new \ReflectionProperty(Db::class, '_db'))->setValue(null, $this->previousDb);
        $this->db->close();
    }

    public function testRestoreRefreshesTheBufferAndPreservesCustomerAndStatusHistory(): void
    {
        $before = $this->row();
        $booking = $this->booking();
        $events = 0;
        $booking->on(Booking::EVENT_AFTER_RESTORE, static function () use (&$events): void { ++$events; });
        $this->restore($booking);
        self::assertSame(array_replace($before, ['buffer' => '15']), $this->row());
        self::assertSame(1, $events);
        self::assertNull($this->deletedAt());
    }

    public function testConflictingRestoreRollsBackTheElementAndBookingChanges(): void
    {
        $before = $this->row();
        $this->db->createCommand()->insert('elements', ['id' => 43])->execute();
        $this->db->createCommand()->insert('calendar_bookings', array_replace($before, ['id' => 43]))->execute();

        try {
            $this->restore($this->booking());
            self::fail('An occupied time must not be restored.');
        } catch (BookingConflictException $exception) {
            self::assertStringContainsString('unavailable', $exception->getMessage());
        }
        self::assertSame($before, $this->row());
        self::assertSame('2026-10-11 12:00:00', $this->deletedAt());
    }

    public function testAnotherTrashedBookingDoesNotBlockRestoration(): void
    {
        $this->db->createCommand()->insert('elements', ['id' => 43, 'dateDeleted' => '2026-10-11 12:00:00'])->execute();
        $this->db->createCommand()->insert('calendar_bookings', array_replace($this->row(), ['id' => 43]))->execute();
        $this->restore($this->booking());
        self::assertNull($this->deletedAt());
    }

    public function testCancelledBookingCanBeRestoredWithoutReservingTime(): void
    {
        $this->db->createCommand()->update('calendar_bookings', ['bookingStatus' => Booking::CANCELLED], ['id' => 42])->execute();
        $this->db->createCommand()->insert('elements', ['id' => 43])->execute();
        $this->db->createCommand()->insert('calendar_bookings', array_replace($this->row(), ['id' => 43, 'bookingStatus' => Booking::CONFIRMED]))->execute();
        $this->restore($this->booking());
        self::assertSame(Booking::CANCELLED, $this->row()['bookingStatus']);
        self::assertNull($this->deletedAt());
    }

    private function booking(): Booking
    {
        $booking = $this->getMockBuilder(Booking::class)->disableOriginalConstructor()->onlyMethods(['fieldLayoutFields'])->getMock();
        $booking->method('fieldLayoutFields')->willReturn([]);
        foreach ($this->row() as $key => $value) {
            $booking->{$key} = \in_array($key, ['startDate', 'endDate', 'statusChangedAt'], true) && $value ? new \DateTimeImmutable($value, new \DateTimeZone('UTC')) : $value;
        }

        return $booking;
    }

    private function restore(Booking $booking): void
    {
        // Mirror Craft's ordering: native element restoration and afterRestore run
        // together in one transaction; throwing from the hook rolls back both.
        $transaction = $this->db->beginTransaction();

        try {
            $this->db->createCommand()->update('elements', ['dateDeleted' => null], ['id' => $booking->id])->execute();
            $booking->afterRestore();
            $transaction->commit();
        } catch (\Throwable $exception) {
            $transaction->rollBack();

            throw $exception;
        }
    }

    private function row(): array
    {
        return $this->db->createCommand('SELECT * FROM calendar_bookings WHERE id = 42')->queryOne();
    }

    private function deletedAt(): ?string
    {
        return $this->db->createCommand('SELECT dateDeleted FROM elements WHERE id = 42')->queryScalar() ?: null;
    }
}
