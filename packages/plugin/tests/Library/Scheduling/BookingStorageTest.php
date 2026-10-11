<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\db\Connection;
use craft\helpers\Db;
use craft\models\FieldLayout;
use craft\web\Request;
use craft\web\Response;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\BookingsController;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Scheduling\BookingConflictException;
use Solspace\Calendar\Library\Scheduling\BookingRateLimit;
use Solspace\Calendar\migrations\m261011_020000_HardenBookings;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SchedulingSettings;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Services\CalendarsService;
use Solspace\Calendar\Services\SettingsService;
use Solspace\Tests\Unit\Calendar\Support\BookingNotificationView;

require_once __DIR__.'/../../_support/BookingNotificationView.php';

/**
 * Uses SQLite by default. Set CALENDAR_TEST_DSN (and optional CALENDAR_TEST_USER/
 * CALENDAR_TEST_PASSWORD) to an empty, disposable MySQL/PostgreSQL database.
 *
 * @coversNothing
 */
class BookingStorageTest extends TestCase
{
    private Connection $db;
    private BookingsService $service;
    private mixed $previousApp;
    private mixed $previousPlugin;
    private mixed $previousDb;
    private object $queue;
    private array $tables = ['calendar_bookings', 'calendar_events', 'calendar_calendars', 'elements', 'calendar_booking_rate_limits'];

    protected function setUp(): void
    {
        if (!getenv('CALENDAR_TEST_DSN') && !\extension_loaded('pdo_sqlite')) {
            self::markTestSkipped('Requires PDO SQLite or CALENDAR_TEST_DSN.');
        }
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        $property = new \ReflectionProperty(Db::class, '_db');
        $this->previousDb = $property->getValue();
        $property->setValue(null, null);
        $this->queue = new class {
            public array $jobs = [];

            public function priority($value): self
            {
                return $this;
            }

            public function delay($value): self
            {
                return $this;
            }

            public function ttr($value): self
            {
                return $this;
            }

            public function push($job): string
            {
                $this->jobs[] = $job;

                return (string) \count($this->jobs);
            }
        };
        $this->connect();
        foreach ($this->tables as $table) {
            $this->db->createCommand('DROP TABLE IF EXISTS '.$table)->execute();
        }
        $this->db->createCommand()->createTable('elements', ['id' => 'integer PRIMARY KEY', 'dateDeleted' => 'datetime'])->execute();
        $this->db->createCommand()->createTable('calendar_events', ['id' => 'integer PRIMARY KEY', 'calendarId' => 'integer'])->execute();
        $this->db->createCommand()->createTable('calendar_calendars', ['id' => 'integer PRIMARY KEY', 'type' => 'string', 'scheduling' => 'text'])->execute();
        $this->db->createCommand()->createTable('calendar_bookings', [
            'id' => 'integer PRIMARY KEY', 'calendarId' => 'integer', 'startDate' => 'datetime', 'endDate' => 'datetime',
            'customerName' => 'string', 'customerEmail' => 'string', 'notes' => 'text', 'bookingStatus' => 'string', 'buffer' => 'integer',
            'statusChangedAt' => 'datetime', 'statusChangedById' => 'integer', 'statusChangedByName' => 'string', 'statusChangeSource' => 'string',
            'dateCreated' => 'datetime', 'dateUpdated' => 'datetime', 'uid' => 'string',
        ])->execute();
        $migration = new m261011_020000_HardenBookings(['db' => $this->db, 'compact' => true]);
        $migration->safeUp();
        $migration->safeUp();
        $calendar = new CalendarModel(['id' => 1, 'name' => 'Room', 'type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => ['timezone' => 'UTC']]);
        $this->db->createCommand()->insert('calendar_calendars', ['id' => 1, 'type' => 'scheduling', 'scheduling' => json_encode($calendar->getSchedulingSettings()->toArray())])->execute();
        $calendars = $this->createMock(CalendarsService::class);
        $calendars->method('getCalendarById')->willReturn($calendar);
        $this->service = new BookingsService();
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->setComponents(['calendars' => $calendars, 'bookings' => $this->service]);
        Calendar::setInstance($plugin);
        foreach ([1, 2] as $id) {
            $this->db->createCommand()->insert('elements', ['id' => $id])->execute();
            $booking = $this->booking($id);
            $this->db->createCommand()->insert('calendar_bookings', $booking->getRecordData())->execute();
        }
    }

    protected function tearDown(): void
    {
        if (!isset($this->db)) {
            return;
        }
        foreach ($this->tables as $table) {
            $this->db->createCommand('DROP TABLE IF EXISTS '.$table)->execute();
        }
        $this->db->close();
        \Craft::$app = $this->previousApp;
        Calendar::setInstance($this->previousPlugin);
        (new \ReflectionProperty(Db::class, '_db'))->setValue(null, $this->previousDb);
    }

    public function testCalendarTypeChangesRemainBlockedForTrashedContentAndEveryBookingStatus(): void
    {
        $service = new CalendarsService();
        self::assertFalse($service->hasCalendarContent(2));
        $this->db->createCommand()->insert('elements', ['id' => 99, 'dateDeleted' => '2026-10-11 00:00:00'])->execute();
        $this->db->createCommand()->insert('calendar_events', ['id' => 99, 'calendarId' => 2])->execute();
        self::assertTrue($service->hasCalendarContent(2));
        self::assertFalse($service->hasCalendarContent(3));
        $this->db->createCommand()->delete('calendar_events', ['id' => 99])->execute();
        self::assertFalse($service->hasCalendarContent(2));

        $this->db->createCommand()->update('elements', ['dateDeleted' => '2026-10-11 00:00:00'], ['id' => 1])->execute();
        foreach ([Booking::REQUESTED, Booking::CONFIRMED, Booking::DECLINED, Booking::CANCELLED] as $status) {
            $this->db->createCommand()->update('calendar_bookings', ['bookingStatus' => $status], ['calendarId' => 1])->execute();
            self::assertTrue($service->hasCalendarContent(1));
            $calendar = new CalendarModel(['id' => 1, 'type' => CalendarModel::TYPE_EVENTS]);
            self::assertFalse($service->saveCalendar($calendar, false));
            self::assertTrue($calendar->hasErrors('type'));
            self::assertSame('scheduling', $this->db->createCommand('SELECT type FROM calendar_calendars WHERE id=1')->queryScalar());
        }
    }

    public function testInactiveAndSeasonalRulesBlockNewBookingsAndMovesButAllowExistingMetadataAndCancellation(): void
    {
        foreach ([['active' => false], ['availableFrom' => '2026-10-13'], ['availableUntil' => '2026-10-11']] as $rules) {
            $settings = (new SchedulingSettings($rules))->toArray();
            $this->db->createCommand()->update('calendar_calendars', ['scheduling' => json_encode($settings)], ['id' => 1])->execute();
            $existing = $this->booking(1);
            $existing->notes = 'Updated notes';
            $this->service->assertSaveAllowed($existing);
            self::assertSame('Updated notes', $existing->notes);
            foreach (['create', 'create_cancelled', 'move', 'confirm', 'restore'] as $change) {
                $booking = $this->booking(1);
                if (str_starts_with($change, 'create')) {
                    $booking->id = 99;
                }
                if ('create_cancelled' === $change) {
                    $booking->bookingStatus = Booking::CANCELLED;
                }
                if ('move' === $change) {
                    $booking->startDate = $booking->startDate->modify('+15 minutes');
                    $booking->endDate = $booking->endDate->modify('+15 minutes');
                }
                if ('confirm' === $change) {
                    $booking->bookingStatus = Booking::CONFIRMED;
                }

                try {
                    $this->service->assertSaveAllowed($booking, 'restore' === $change);
                    self::fail('Unavailable calendar accepted '.$change);
                } catch (BookingConflictException) {
                    self::assertTrue(true);
                }
            }
            $cancelled = $this->booking(1);
            $cancelled->bookingStatus = Booking::CANCELLED;
            $this->service->assertSaveAllowed($cancelled);
            self::assertSame(Booking::CANCELLED, $cancelled->bookingStatus);
        }
    }

    public function testPublicRequestsCannotSaveOrNotifyWithoutCaptchaVerification(): void
    {
        $request = $this->createMock(Request::class);
        $body = ['calendarId' => 1, 'start' => '2026-10-12T09:00:00Z', 'customerName' => 'Visitor', 'customerEmail' => 'visitor@example.test'];
        $request->method('getRequiredBodyParam')->willReturnCallback(static fn ($name) => $body[$name]);
        $request->method('getBodyParam')->willReturnCallback(static fn ($name, $default = null) => $body[$name] ?? $default);
        $request->method('getUserIP')->willReturn('192.0.2.99');
        \Craft::$app->request = $request;
        $settings = $this->createMock(SettingsService::class);
        $settings->method('getSettingsModel')->willReturn(new SettingsModel(['bookingCaptchaProvider' => 'turnstile', 'bookingCaptchaSiteKey' => 'public-key', 'bookingCaptchaSecretKey' => 'private-key']));
        $bookings = $this->createMock(BookingsService::class);
        $bookings->method('getPublicCalendars')->willReturn([1 => new CalendarModel(['id' => 1, 'type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => ['timezone' => 'UTC']])]);
        $bookings->method('getPublicFields')->willReturn([]);
        $bookings->expects(self::never())->method('availableSlots');
        $bookings->expects(self::never())->method('save');
        Calendar::getInstance()->setComponents(['bookings' => $bookings, 'settings' => $settings]);
        $controller = $this->getMockBuilder(BookingsController::class)->disableOriginalConstructor()->onlyMethods(['requireSiteRequest', 'requirePostRequest', 'asFailure'])->getMock();
        $controller->expects(self::once())->method('asFailure')->willReturnCallback(static function ($message, $data, $routeParams) {
            self::assertArrayHasKey('bookingCaptchaToken', $data['errors']);
            self::assertSame('Visitor', $routeParams['booking']->customerName);
            self::assertSame('visitor@example.test', $routeParams['booking']->customerEmail);
            $response = (new \ReflectionClass(Response::class))->newInstanceWithoutConstructor();
            $response->data = $data;

            return $response;
        });
        $controller->actionRequest();
        self::assertSame(2, (int) $this->db->createCommand('SELECT COUNT(*) FROM calendar_bookings')->queryScalar());
        self::assertSame([], $this->queue->jobs);
    }

    public function testRestoreRejectsAnOccupiedSlotAndRollsBackItsElementRestoration(): void
    {
        $this->db->createCommand()->update('calendar_bookings', ['bookingStatus' => Booking::CONFIRMED], ['id' => [1, 2]])->execute();
        $this->db->createCommand()->update('elements', ['dateDeleted' => '2026-10-11 00:00:00'], ['id' => 1])->execute();
        $booking = $this->booking(1);
        $booking->bookingStatus = Booking::CONFIRMED;
        $transaction = $this->db->beginTransaction();

        try {
            $this->db->createCommand()->update('elements', ['dateDeleted' => null], ['id' => 1])->execute();
            $booking->afterRestore();
            self::fail('A conflicting confirmed booking was restored.');
        } catch (BookingConflictException $exception) {
            $transaction->rollBack();
        }
        self::assertNotNull($this->db->createCommand('SELECT dateDeleted FROM elements WHERE id=1')->queryScalar());
        self::assertSame([], $this->queue->jobs);
        $this->db->createCommand()->update('calendar_bookings', ['bookingStatus' => Booking::CANCELLED], ['id' => 2])->execute();
        $transaction = $this->db->beginTransaction();
        $this->db->createCommand()->update('elements', ['dateDeleted' => null], ['id' => 1])->execute();
        $booking->afterRestore();
        self::assertSame([], $this->queue->jobs);
        $transaction->commit();
        self::assertCount(1, $this->queue->jobs);
    }

    public function testNativeElementSavesNotifyAfterOuterCommitAndOnlyForTheFinalChange(): void
    {
        $booking = $this->booking(1);
        $transaction = $this->db->beginTransaction();
        $booking->bookingStatus = Booking::CONFIRMED;
        $booking->afterSave(false);
        $inner = $this->db->beginTransaction();
        $booking->startDate = $booking->startDate->modify('+1 hour');
        $booking->endDate = $booking->endDate->modify('+1 hour');
        $booking->afterSave(false);
        $inner->commit();
        self::assertSame([], $this->queue->jobs);
        $transaction->commit();
        self::assertCount(1, $this->queue->jobs);
        self::assertStringContainsString('10:00', $this->queue->jobs[0]->body);
        $booking->notes = 'Unrelated edit';
        $transaction = $this->db->beginTransaction();
        $booking->afterSave(false);
        $transaction->commit();
        self::assertCount(1, $this->queue->jobs);
    }

    public function testOuterRollbackAndRolledBackSavepointsNeverNotify(): void
    {
        $booking = $this->booking(1);
        $transaction = $this->db->beginTransaction();
        $booking->bookingStatus = Booking::CONFIRMED;
        $booking->afterSave(false);
        $transaction->rollBack();
        self::assertSame([], $this->queue->jobs);
        $transaction = $this->db->beginTransaction();
        $inner = $this->db->beginTransaction();
        $booking->afterSave(false);
        $inner->rollBack();
        $transaction->commit();
        self::assertSame([], $this->queue->jobs);

        $transaction = $this->db->beginTransaction();
        $booking->afterSave(false);
        $inner = $this->db->beginTransaction();
        $booking->bookingStatus = Booking::CANCELLED;
        $booking->afterSave(false);
        $inner->rollBack();
        $transaction->commit();
        self::assertCount(1, $this->queue->jobs);
        self::assertStringContainsString('Status: Confirmed', $this->queue->jobs[0]->body);
    }

    public function testSeparateAudienceTemplatesAreRenderedAndQueuedOnlyAfterCommit(): void
    {
        $calendar = Calendar::getInstance()->calendars->getCalendarById(1);
        $calendar->scheduling['notificationEmail'] = 'customer@example.test';
        \Craft::$app->notificationTemplates = [
            'requester' => ['fromName' => 'Customer care', 'cc' => 'customer-copy@example.test', 'subject' => 'Requester: {{ status }}', 'body' => '<p>{{ booking.customerName }}</p>'],
            'admin' => ['fromEmail' => 'staff@example.test', 'replyTo' => 'help@example.test', 'bcc' => 'archive@example.test', 'subject' => 'Admin: {{ status }}', 'body' => '<p>{{ booking.customerEmail }}</p>'],
        ];
        $booking = $this->booking(1);
        $booking->customerName = '<b>{{ 7 * 7 }}</b>';
        $booking->bookingStatus = Booking::CONFIRMED;
        $transaction = $this->db->beginTransaction();
        $booking->afterSave(false);
        self::assertSame([], $this->queue->jobs);
        $transaction->commit();
        self::assertCount(2, $this->queue->jobs);
        self::assertSame('Requester: Confirmed', $this->queue->jobs[0]->subject);
        self::assertSame('<p>&lt;b&gt;{{ 7 * 7 }}&lt;/b&gt;</p>', $this->queue->jobs[0]->htmlBody);
        self::assertSame('Customer care', $this->queue->jobs[0]->fromName);
        self::assertSame(['customer-copy@example.test'], $this->queue->jobs[0]->cc);
        self::assertSame([], $this->queue->jobs[0]->bcc);
        self::assertSame('staff@example.test', $this->queue->jobs[1]->fromEmail);
        self::assertSame('help@example.test', $this->queue->jobs[1]->replyTo);
        self::assertSame(['archive@example.test'], $this->queue->jobs[1]->bcc);
        self::assertSame([], $this->queue->jobs[1]->cc);
        self::assertSame('Admin: Confirmed', $this->queue->jobs[1]->subject);
        self::assertSame('customer@example.test', $this->queue->jobs[1]->recipient);
    }

    public function testAtomicRateCounterHasIndependentIpsHourlyResetAndExpiryCleanup(): void
    {
        $limit = new BookingRateLimit();
        $now = 1791792000;
        for ($i = 0; $i < 20; ++$i) {
            self::assertTrue($limit->consume('192.0.2.1', $now));
        }
        self::assertFalse($limit->consume('192.0.2.1', $now));
        self::assertTrue($limit->consume('192.0.2.2', $now));
        self::assertTrue($limit->consume('192.0.2.1', $now + 3600));
        $limit->prune($now + 3600);
        self::assertSame(1, (int) $this->db->createCommand('SELECT COUNT(*) FROM calendar_booking_rate_limits')->queryScalar());
    }

    public function testConcurrentConfirmationsOnlyReserveTheSlotOnce(): void
    {
        $results = $this->parallel(2, function (int $worker): string {
            $booking = $this->booking($worker + 1);
            $booking->bookingStatus = Booking::CONFIRMED;
            $transaction = $this->db->beginTransaction();
            // Establish a consistent-read snapshot before either worker obtains the resource lock.
            $this->db->createCommand('SELECT COUNT(*) FROM calendar_bookings')->queryScalar();
            $command = $this->db->createCommand('SELECT id FROM elements WHERE id=:id FOR UPDATE', [':id' => $booking->id]);
            $command->queryOne();

            try {
                $booking->afterSave(false);
                usleep(100000);
                $transaction->commit();

                return 'saved';
            } catch (BookingConflictException $exception) {
                $transaction->rollBack();

                return 'conflict';
            }
        });
        sort($results);
        self::assertSame(['conflict', 'saved'], $results);
        self::assertSame(1, (int) $this->db->createCommand("SELECT COUNT(*) FROM calendar_bookings WHERE bookingStatus='confirmed'")->queryScalar());
    }

    public function testConcurrentRequestsCannotExceedTheRateLimit(): void
    {
        $results = $this->parallel(30, static function (int $worker): string {
            return (new BookingRateLimit())->consume('192.0.2.99', 1791792000) ? 'accepted' : 'limited';
        });
        self::assertCount(20, array_filter($results, static fn ($result) => 'accepted' === $result));
        self::assertCount(10, array_filter($results, static fn ($result) => 'limited' === $result));
        self::assertSame(20, (int) $this->db->createCommand('SELECT attempts FROM calendar_booking_rate_limits')->queryScalar());
    }

    private function connect(): void
    {
        $plugin = Calendar::getInstance();
        $this->db = new Connection(['dsn' => getenv('CALENDAR_TEST_DSN') ?: 'sqlite::memory:', 'username' => getenv('CALENDAR_TEST_USER') ?: null, 'password' => getenv('CALENDAR_TEST_PASSWORD') ?: null, 'enableSchemaCache' => false, 'enableLogging' => false, 'enableProfiling' => false]);
        \Craft::$app = new class($this->db, $this->queue) {
            public string $language = 'en-US';
            public array $loadedModules = [];
            public ?Request $request = null;
            public array $notificationTemplates = [];

            public function __construct(public $db, private $queue) {}

            public function getDb()
            {
                return $this->db;
            }

            public function getQueue()
            {
                return $this->queue;
            }

            public function getProjectConfig()
            {
                return new class($this) {
                    public function __construct(private object $app) {}

                    public function get($path)
                    {
                        return $this->app->notificationTemplates;
                    }
                };
            }

            public function getView()
            {
                return new BookingNotificationView();
            }

            public function getIsInstalled()
            {
                return false;
            }

            public function getBasePath()
            {
                return \dirname((new \ReflectionClass(\Craft::class))->getFileName());
            }

            public function get($id, $throw = true)
            {
                return null;
            }

            public function getRequest()
            {
                return new class {
                    public function getIsConsoleRequest()
                    {
                        return true;
                    }
                };
            }

            public function getSites()
            {
                return new class {
                    public function getPrimarySite()
                    {
                        return (object) ['id' => 1];
                    }
                };
            }

            public function getI18n()
            {
                return new class {
                    public function translate($category, $message, $params, $language)
                    {
                        foreach ($params as $key => $value) {
                            $message = str_replace('{'.$key.'}', $value, $message);
                        }

                        return $message;
                    }
                };
            }
        };
        (new \ReflectionProperty(Db::class, '_db'))->setValue(null, null);
        if ($plugin) {
            Calendar::setInstance($plugin);
        }
    }

    private function booking(int $id): Booking
    {
        $class = new class extends Booking {
            public function init(): void {}

            public function getFieldLayout(): ?FieldLayout
            {
                return null;
            }

            public function getCpEditUrl(): ?string
            {
                return 'https://example.test/admin/calendar/bookings/'.$this->id;
            }
        };
        $booking = (new \ReflectionClass($class))->newInstanceWithoutConstructor();
        $booking->id = $id;
        $booking->calendarId = 1;
        $booking->startDate = new \DateTimeImmutable('2026-10-12T09:00:00Z');
        $booking->endDate = new \DateTimeImmutable('2026-10-12T09:30:00Z');
        $booking->customerName = 'Customer';
        $booking->customerEmail = 'customer@example.test';
        $booking->bookingStatus = Booking::REQUESTED;

        return $booking;
    }

    private function parallel(int $workers, callable $action): array
    {
        if (!getenv('CALENDAR_TEST_DSN') || !\function_exists('pcntl_fork')) {
            self::markTestSkipped('Concurrent integration checks require pcntl and a disposable MySQL/PostgreSQL database.');
        }
        $directory = sys_get_temp_dir().'/calendar-booking-test-'.bin2hex(random_bytes(8));
        mkdir($directory);
        $this->db->close();
        $children = [];

        try {
            for ($worker = 0; $worker < $workers; ++$worker) {
                $pid = pcntl_fork();
                if (-1 === $pid) {
                    throw new \RuntimeException('Could not start database test worker.');
                }
                if (0 === $pid) {
                    try {
                        $this->connect();
                        touch($directory.'/ready-'.$worker);
                        $deadline = microtime(true) + 15;
                        while (!is_file($directory.'/start')) {
                            if (microtime(true) > $deadline) {
                                throw new \RuntimeException('Worker start timed out.');
                            }
                            usleep(1000);
                        }
                        file_put_contents($directory.'/result-'.$worker, $action($worker));

                        exit(0);
                    } catch (\Throwable $exception) {
                        file_put_contents($directory.'/result-'.$worker, 'error: '.$exception->getMessage());

                        exit(1);
                    }
                }
                $children[] = $pid;
            }
            $deadline = microtime(true) + 15;
            while (\count(glob($directory.'/ready-*')) < $workers) {
                if (microtime(true) > $deadline) {
                    throw new \RuntimeException('Workers did not become ready.');
                }
                usleep(1000);
            }
            touch($directory.'/start');
            foreach ($children as $pid) {
                pcntl_waitpid($pid, $status);
            }
            $results = [];
            for ($worker = 0; $worker < $workers; ++$worker) {
                $result = file_get_contents($directory.'/result-'.$worker);
                self::assertStringNotContainsString('error:', $result);
                $results[] = $result;
            }

            return $results;
        } finally {
            foreach (glob($directory.'/*') as $file) {
                unlink($file);
            }
            rmdir($directory);
            $this->connect();
        }
    }
}
