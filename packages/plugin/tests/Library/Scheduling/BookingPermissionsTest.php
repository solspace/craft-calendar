<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\db\Query;
use craft\elements\User;
use craft\events\RegisterUserPermissionsEvent;
use craft\helpers\Db;
use craft\services\UserPermissions;
use craft\web\Request;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Elements\Db\BookingQuery;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Services\CalendarsService;
use Solspace\Calendar\Services\SettingsService;
use yii\base\Event;
use yii\db\Connection;
use yii\web\ForbiddenHttpException;

/** @covers \Solspace\Calendar\Services\BookingsService */
class BookingPermissionsTest extends TestCase
{
    private mixed $previousApp;
    private mixed $previousPlugin;
    private mixed $previousDb;
    private Connection $db;
    private BookingsService $service;
    private User $user;
    private array $grants = [];
    private array $dirtyFields = [];
    private array $calendars;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        $property = new \ReflectionProperty(Db::class, '_db');
        $this->previousDb = $property->getValue();
        $property->setValue(null, null);
        $this->db = new Connection(['dsn' => 'sqlite::memory:']);
        $this->db->createCommand('CREATE TABLE elements (id INTEGER PRIMARY KEY, title TEXT)')->execute();
        $this->db->createCommand('CREATE TABLE calendar_bookings (id INTEGER PRIMARY KEY, calendarId INTEGER, startDate TEXT, endDate TEXT, customerName TEXT, customerEmail TEXT, notes TEXT, bookingStatus TEXT, buffer INTEGER)')->execute();
        $this->user = $this->getMockBuilder(User::class)->disableOriginalConstructor()->onlyMethods(['can'])->getMock();
        $this->user->admin = false;
        $this->user->method('can')->willReturnCallback(fn ($permission) => \in_array($permission, $this->grants, true));
        $request = $this->createMock(Request::class);
        $request->method('getIsCpRequest')->willReturn(true);
        $request->method('getIsConsoleRequest')->willReturn(false);
        \Craft::$app = new class($this->db, $this->user, $request) {
            public array $loadedModules = [];
            public string $language = 'en-US';
            public object $userPermissions;

            public function __construct(public Connection $db, private User $user, public Request $request)
            {
                $this->userPermissions = new class {
                    public array $permissions = [];

                    public function getPermissionsByUserId($id): array
                    {
                        return $this->permissions;
                    }
                };
            }

            public function getEdition(): int
            {
                return \Craft::Pro;
            }

            public function getI18n(): object
            {
                return new class {
                    public function translate($category, $message, $params, $language): string
                    {
                        return strtr($message, array_combine(array_map(static fn ($key) => '{'.$key.'}', array_keys($params)), $params));
                    }
                };
            }

            public function getDb(): Connection
            {
                return $this->db;
            }

            public function getRequest(): Request
            {
                return $this->request;
            }

            public function getUser(): object
            {
                return new class($this->user) {
                    public function __construct(private User $user) {}

                    public function getIdentity(): User
                    {
                        return $this->user;
                    }

                    public function getId(): int
                    {
                        return 17;
                    }

                    public function getIsAdmin(): bool
                    {
                        return $this->user->admin;
                    }

                    public function checkPermission(string $permission): bool
                    {
                        return $this->user->can($permission);
                    }
                };
            }
        };
        $this->calendars = [7 => new CalendarModel(['id' => 7, 'uid' => 'first', 'type' => 'scheduling']), 8 => new CalendarModel(['id' => 8, 'uid' => 'second', 'type' => 'scheduling']), 9 => new CalendarModel(['id' => 9, 'uid' => 'event', 'type' => 'events'])];
        $calendars = $this->createMock(CalendarsService::class);
        $calendars->method('getAllCalendars')->willReturn($this->calendars);
        $calendars->method('getCalendarById')->willReturnCallback(fn ($id) => $this->calendars[$id] ?? null);
        $this->service = new BookingsService();
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->setComponents(['bookings' => $this->service, 'calendars' => $calendars, 'settings' => $this->createMock(SettingsService::class)]);
        $plugin->name = 'Calendar';
        Calendar::setInstance($plugin);
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        Calendar::setInstance($this->previousPlugin);
        (new \ReflectionProperty(Db::class, '_db'))->setValue(null, $this->previousDb);
    }

    public function testRegisteredPermissionsKeepLegacyGrantsAndSeparateEventAndBookingScopes(): void
    {
        $property = new \ReflectionProperty(Event::class, '_events');
        $previous = $property->getValue();

        try {
            (new \ReflectionMethod(Calendar::class, 'initPermissions'))->invoke(Calendar::getInstance());
            $event = new RegisterUserPermissionsEvent();
            Event::trigger(UserPermissions::class, UserPermissions::EVENT_REGISTER_PERMISSIONS, $event);
            $permissions = $event->permissions[array_key_last($event->permissions)]['permissions'];
            self::assertArrayHasKey(Calendar::PERMISSION_BOOKINGS, $permissions);
            self::assertArrayHasKey(Calendar::PERMISSION_BOOKINGS_INDIVIDUAL, $permissions);
            $booking = $permissions[Calendar::PERMISSION_BOOKINGS_ACCESS]['nested'];
            self::assertCount(6, $booking[Calendar::PERMISSION_BOOKINGS_VIEW]['nested']);
            $resources = $booking[Calendar::PERMISSION_BOOKINGS_BY_CALENDAR]['nested'];
            self::assertSame([Calendar::PERMISSION_BOOKINGS_VIEW.':first', Calendar::PERMISSION_BOOKINGS_VIEW.':second'], array_keys($resources));
            foreach (array_keys(Calendar::BOOKING_PERMISSIONS) as $action) {
                if ('view' !== $action) {
                    self::assertArrayHasKey(Calendar::BOOKING_PERMISSIONS[$action].':first', $resources[Calendar::PERMISSION_BOOKINGS_VIEW.':first']['nested']);
                }
            }
            $events = $permissions[Calendar::PERMISSION_EVENTS]['nested'][Calendar::PERMISSION_EVENTS_READ_INDIVIDUAL]['nested'];
            self::assertSame([Calendar::PERMISSION_EVENTS_READ_INDIVIDUAL.':event'], array_keys($events));
        } finally {
            $property->setValue(null, $previous);
        }
    }

    public function testEveryActionRequiresViewAndIsScopedToTheGrantedResource(): void
    {
        foreach (Calendar::BOOKING_PERMISSIONS as $action => $permission) {
            $this->grants = [$permission.':first'];
            self::assertSame('view' === $action, $this->service->can($this->calendars[7], $action));
            $this->grants = [Calendar::PERMISSION_BOOKINGS_VIEW.':first', $permission.':first'];
            foreach (Calendar::BOOKING_PERMISSIONS as $other => $unused) {
                self::assertSame($other === 'view' || $other === $action, $this->service->can($this->calendars[7], $other));
                self::assertFalse($this->service->can($this->calendars[8], $other));
            }
            self::assertSame([7], array_keys($this->service->getManageableCalendars($action)));
        }
        $this->grants = [Calendar::PERMISSION_BOOKINGS_ACCESS];
        self::assertSame([], $this->service->getManageableCalendars());
    }

    public function testLegacyFullAccessAndAdministratorsRetainOperationalAccess(): void
    {
        foreach ([[Calendar::PERMISSION_BOOKINGS], [Calendar::PERMISSION_BOOKINGS_INDIVIDUAL.':first']] as $grants) {
            $this->grants = $grants;
            foreach (array_keys(Calendar::BOOKING_PERMISSIONS) as $action) {
                self::assertTrue($this->service->can($this->calendars[7], $action));
                self::assertSame($grants === [Calendar::PERMISSION_BOOKINGS], $this->service->can($this->calendars[8], $action));
            }
        }
        $this->grants = [];
        $this->user->admin = true;
        foreach (array_keys(Calendar::BOOKING_PERMISSIONS) as $action) {
            self::assertTrue($this->service->can($this->calendars[8], $action));
        }
        self::assertFalse($this->service->can(new CalendarModel(['type' => 'events']), 'view'));
    }

    public function testCreationWithoutStatusPermissionCannotConfirmOrDecline(): void
    {
        $this->grants = [Calendar::PERMISSION_BOOKINGS_VIEW.':first', Calendar::BOOKING_PERMISSIONS['create'].':first'];
        $booking = $this->booking();
        self::assertTrue($this->service->canSaveChanges($booking, null));
        foreach ([Booking::CONFIRMED, Booking::DECLINED, Booking::CANCELLED] as $status) {
            $booking->bookingStatus = $status;
            self::assertFalse($this->service->canSaveChanges($booking, null));
        }
        $this->grants[] = Calendar::BOOKING_PERMISSIONS['status'].':first';
        self::assertTrue($this->service->canSaveChanges($booking, null));
    }

    public function testEditingContactDetailsDoesNotAllowReschedulingOrChangingStatus(): void
    {
        $this->grants = [Calendar::PERMISSION_BOOKINGS_VIEW.':first', Calendar::BOOKING_PERMISSIONS['edit'].':first'];
        $booking = $this->booking();
        $previous = $booking->getRecordData();
        $booking->notes = 'Updated notes';
        self::assertTrue($this->service->canSaveChanges($booking, $previous));
        $booking->bookingStatus = Booking::CONFIRMED;
        self::assertFalse($this->service->canSaveChanges($booking, $previous));
        $booking->bookingStatus = Booking::REQUESTED;
        $booking->startDate = $booking->startDate->modify('+1 hour');
        self::assertFalse($this->service->canSaveChanges($booking, $previous));
    }

    public function testModerationDoesNotGrantCustomFieldEditingOrCrossResourceMoves(): void
    {
        $this->grants = [Calendar::PERMISSION_BOOKINGS_VIEW, Calendar::BOOKING_PERMISSIONS['status'].':first'];
        $booking = $this->booking();
        $previous = $booking->getRecordData();
        $booking->bookingStatus = Booking::CONFIRMED;
        self::assertTrue($this->service->canSaveChanges($booking, $previous));
        $this->dirtyFields = ['privateField'];
        self::assertFalse($this->service->canSaveChanges($booking, $previous));
        $this->dirtyFields = [];
        $booking->calendarId = 8;
        self::assertFalse($this->service->canSaveChanges($booking, $previous));
        $this->grants[] = Calendar::BOOKING_PERMISSIONS['reschedule'];
        self::assertFalse($this->service->canSaveChanges($booking, $previous));
        $this->grants[] = Calendar::BOOKING_PERMISSIONS['status'].':second';
        self::assertTrue($this->service->canSaveChanges($booking, $previous));
    }

    public function testNativeSaveRejectsAnUnauthorizedChangeInsideTheElementTransaction(): void
    {
        $booking = $this->booking();
        $this->db->createCommand()->insert('elements', ['id' => 42, 'title' => 'Original'])->execute();
        $this->db->createCommand()->insert('calendar_bookings', array_intersect_key($booking->getRecordData(), array_flip(['id', 'calendarId', 'startDate', 'endDate', 'customerName', 'customerEmail', 'notes', 'bookingStatus', 'buffer'])))->execute();
        $this->grants = [Calendar::PERMISSION_BOOKINGS_VIEW, Calendar::BOOKING_PERMISSIONS['edit']];
        $booking->bookingStatus = Booking::CONFIRMED;
        $transaction = $this->db->beginTransaction();

        try {
            $this->db->createCommand()->update('elements', ['title' => 'Unauthorized'], ['id' => 42])->execute();
            $booking->afterSave(false);
            self::fail('The native element hook must reject a status change by an editor.');
        } catch (ForbiddenHttpException) {
            $transaction->rollBack();
        }
        self::assertSame('Original', $this->db->createCommand('SELECT title FROM elements')->queryScalar());
        self::assertSame('requested', $this->db->createCommand('SELECT bookingStatus FROM calendar_bookings')->queryScalar());
    }

    public function testNativeDeleteRestoreAndSaveUseIndependentPermissions(): void
    {
        $booking = $this->booking();
        $booking->trashed = true;
        $this->grants = [Calendar::PERMISSION_BOOKINGS_VIEW, Calendar::BOOKING_PERMISSIONS['delete']];
        self::assertTrue($booking->canDelete($this->user));
        self::assertFalse($booking->canSave($this->user));

        try {
            $booking->beforeRestore();
            self::fail('Delete must not grant restore.');
        } catch (ForbiddenHttpException) {
            self::assertTrue(true);
        }
        $this->grants = [Calendar::PERMISSION_BOOKINGS_VIEW, Calendar::BOOKING_PERMISSIONS['restore']];
        self::assertFalse($booking->canDelete($this->user));
        self::assertTrue($booking->canSave($this->user));
        $this->expectException(ForbiddenHttpException::class);
        $booking->beforeDelete();
    }

    public function testEventReadAccessIsScopedAndUsesTheSuppliedUser(): void
    {
        $first = new CalendarModel(['id' => 9, 'uid' => 'event', 'type' => 'events']);
        $second = new CalendarModel(['id' => 10, 'uid' => 'other', 'type' => 'events']);
        $event = $this->getMockBuilder(\Solspace\Calendar\Elements\Event::class)->disableOriginalConstructor()->onlyMethods(['getCalendar'])->getMock();
        $event->method('getCalendar')->willReturn($first);
        $this->grants = [strtolower(Calendar::PERMISSION_EVENTS), strtolower(Calendar::PERMISSION_EVENTS_READ_INDIVIDUAL.':event')];
        self::assertTrue($event->canView($this->user));
        self::assertFalse(PermissionHelper::canAccessEvents($second, $this->user));
        self::assertFalse($event->canSave($this->user));
        self::assertFalse($event->canDelete($this->user));
        $this->grants = [strtolower(Calendar::PERMISSION_EVENTS)];
        self::assertFalse($event->canView($this->user));
        $this->grants = [strtolower(Calendar::LEGACY_PERMISSION_EVENTS_FOR).':event'];
        self::assertTrue($event->canView($this->user));
        self::assertTrue($event->canSave($this->user));
        self::assertTrue($event->canDelete($this->user));
        self::assertTrue($event->canDuplicate($this->user));
    }

    public function testCpCalendarOptionsIgnorePublicAccessAndTheEventAccessParent(): void
    {
        $this->grants = [strtolower(Calendar::PERMISSION_EVENTS)];
        $calendars = $this->getMockBuilder(CalendarsService::class)->onlyMethods(['getAllCalendars'])->getMock();
        $calendars->method('getAllCalendars')->willReturn($this->calendars);
        self::assertSame([], $calendars->getAllAllowedCalendars());
        $this->grants[] = strtolower(Calendar::PERMISSION_EVENTS_READ_INDIVIDUAL.':event');
        self::assertSame([9], array_keys($calendars->getAllAllowedCalendars()));
        $this->grants = [strtolower(Calendar::PERMISSION_EVENTS_READ)];
        self::assertSame([9], array_keys($calendars->getAllAllowedCalendars()));
    }

    public function testNativeCpQueriesIntersectRequestedCalendarsWithViewPermissions(): void
    {
        $dialect = $this->createMock(\craft\db\Connection::class);
        $dialect->method('getIsMysql')->willReturn(false);
        (new \ReflectionProperty(Db::class, '_db'))->setValue(null, $dialect);
        $this->db->createCommand()->insert('calendar_bookings', ['id' => 1, 'calendarId' => 7])->execute();
        $this->db->createCommand()->insert('calendar_bookings', ['id' => 2, 'calendarId' => 8])->execute();
        $this->grants = [Calendar::PERMISSION_BOOKINGS_VIEW.':first'];
        foreach ([null => [1], 8 => []] as $requested => $expected) {
            $query = $this->getMockBuilder(BookingQuery::class)->disableOriginalConstructor()->onlyMethods(['joinElementTable', 'hasEventHandlers'])->getMock();
            $query->query = new Query();
            $query->subQuery = (new Query())->select('id')->from('calendar_bookings');
            $query->calendarId = $requested ?: null;
            self::assertTrue((new \ReflectionMethod($query, 'beforePrepare'))->invoke($query));
            self::assertSame($expected, array_map('intval', $query->subQuery->column($this->db)));
        }
        $this->db->createCommand('CREATE TABLE calendar_calendars (id INTEGER PRIMARY KEY, uid TEXT)')->execute();
        $this->db->createCommand('CREATE TABLE calendar_events (id INTEGER PRIMARY KEY, calendarId INTEGER)')->execute();
        foreach ([9 => 'event', 10 => 'other'] as $id => $uid) {
            $this->db->createCommand()->insert('calendar_calendars', ['id' => $id, 'uid' => $uid])->execute();
            $this->db->createCommand()->insert('calendar_events', ['id' => $id, 'calendarId' => $id])->execute();
        }
        $this->grants = [strtolower(Calendar::PERMISSION_EVENTS), strtolower(Calendar::PERMISSION_EVENTS_READ_INDIVIDUAL.':event')];
        \Craft::$app->userPermissions->permissions = $this->grants;
        $query = $this->getMockBuilder(EventQuery::class)->disableOriginalConstructor()->onlyMethods(['joinElementTable', 'hasEventHandlers'])->getMock();
        (new \ReflectionProperty(EventQuery::class, 'joinedTables'))->setValue($query, true);
        $query->query = new Query();
        $query->subQuery = (new Query())->select('calendar_events.id')->from('calendar_events')->innerJoin('calendar_calendars', 'calendar_calendars.id = calendar_events.calendarId');
        $query->setAllowedCalendarsOnly(false);
        self::assertTrue((new \ReflectionMethod($query, 'beforePrepare'))->invoke($query));
        self::assertSame([9], array_map('intval', $query->subQuery->column($this->db)));
    }

    private function booking(): Booking
    {
        $booking = $this->getMockBuilder(Booking::class)->disableOriginalConstructor()->onlyMethods(['getCalendar', 'getDirtyFields', 'isAttributeDirty'])->getMock();
        $booking->id = 42;
        $booking->calendarId = 7;
        $booking->startDate = new \DateTimeImmutable('2026-10-12T09:00:00Z');
        $booking->endDate = new \DateTimeImmutable('2026-10-12T09:30:00Z');
        $booking->bookingStatus = Booking::REQUESTED;
        $booking->method('getCalendar')->willReturnCallback(fn () => $this->calendars[$booking->calendarId] ?? null);
        $booking->method('getDirtyFields')->willReturnCallback(fn () => $this->dirtyFields);
        $booking->method('isAttributeDirty')->willReturn(false);

        return $booking;
    }
}
