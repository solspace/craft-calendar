<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\elements\User;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\BookingsController;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SchedulingSettings;
use Solspace\Calendar\Services\BookingsService;
use yii\web\BadRequestHttpException;

/** @coversNothing */
class SchedulingSettingsTest extends TestCase
{
    public function testAllClosedHoursSurviveReload(): void
    {
        $settings = new SchedulingSettings(['hours' => []]);
        self::assertSame([], (new SchedulingSettings($settings->toArray()))->hours);
        self::assertSame([], $settings->getHoursForDisplay());
        self::assertTrue($settings->validate());
    }

    public function testSavedHoursDisplaySundayFirstWithoutChangingSplitPeriods(): void
    {
        $hours = [
            ['day' => '1', 'start' => '13:00', 'end' => '17:00'],
            ['day' => 6, 'start' => '10:00', 'end' => '14:00'],
            ['day' => '7', 'start' => '09:00', 'end' => '12:00'],
            ['day' => 1, 'start' => '09:00', 'end' => '12:00'],
            ['day' => 7, 'start' => '13:00', 'end' => '15:00'],
        ];
        $settings = new SchedulingSettings(['hours' => $hours]);
        self::assertSame([$hours[2], $hours[4], $hours[0], $hours[3], $hours[1]], $settings->getHoursForDisplay());
        self::assertSame($hours, $settings->hours);
        self::assertSame($hours, $settings->toArray()['hours']);

        // Invalid posted rows must remain available for correction after validation fails.
        $settings->hours = ['invalid', ['day' => 'invalid'], $hours[2]];
        self::assertSame([$hours[2], 'invalid', ['day' => 'invalid']], $settings->getHoursForDisplay());
    }

    public function testValidDefaultsAndInvalidLimits(): void
    {
        $settings = new SchedulingSettings();
        self::assertTrue($settings->validate());
        $settings->increment = 0;
        $settings->maximumAdvance = 0;
        $settings->timezone = 'floating';
        self::assertFalse($settings->validate());
        self::assertTrue($settings->hasErrors('increment'));
        self::assertTrue($settings->hasErrors('maximumAdvance'));
        self::assertTrue($settings->hasErrors('timezone'));
    }

    public function testCalendarDefaultsToEvents(): void
    {
        $calendar = new CalendarModel();
        self::assertSame(CalendarModel::TYPE_EVENTS, $calendar->type);
        self::assertFalse($calendar->getIsScheduling());
        $calendar->type = CalendarModel::TYPE_SCHEDULING;
        self::assertTrue($calendar->getIsScheduling());
    }

    public function testBookingPermissionsAreSeparateFromEventPermissions(): void
    {
        $calendar = new CalendarModel(['type' => CalendarModel::TYPE_SCHEDULING, 'uid' => 'resource-1']);
        $user = $this->getMockBuilder(User::class)->disableOriginalConstructor()->onlyMethods(['can'])->getMock();
        $user->admin = false;
        $user->method('can')->willReturnCallback(static fn ($permission) => Calendar::PERMISSION_EVENTS_FOR_ALL === $permission);
        self::assertFalse((new BookingsService())->canManage($calendar, $user));
    }

    public function testNativeEventSaveCannotBypassSchedulingGuard(): void
    {
        $event = $this->getMockBuilder(Event::class)->disableOriginalConstructor()->onlyMethods(['getCalendar'])->getMock();
        $event->method('getCalendar')->willReturn(new CalendarModel(['type' => CalendarModel::TYPE_SCHEDULING]));
        self::assertFalse($event->beforeSave(true));
        self::assertTrue($event->hasErrors('calendarId'));
    }

    public function testResourcePermissionDoesNotGrantOtherResources(): void
    {
        $user = $this->getMockBuilder(User::class)->disableOriginalConstructor()->onlyMethods(['can'])->getMock();
        $user->admin = false;
        $user->method('can')->willReturnCallback(static fn ($permission) => Calendar::PERMISSION_BOOKINGS_INDIVIDUAL.':resource-1' === $permission);
        $service = new BookingsService();
        self::assertTrue($service->canManage(new CalendarModel(['type' => CalendarModel::TYPE_SCHEDULING, 'uid' => 'resource-1']), $user));
        self::assertFalse($service->canManage(new CalendarModel(['type' => CalendarModel::TYPE_SCHEDULING, 'uid' => 'resource-2']), $user));
        self::assertFalse($service->canManage(new CalendarModel(['type' => CalendarModel::TYPE_EVENTS, 'uid' => 'resource-1']), $user));
    }

    public function testBookingInsertIncludesAllRequiredColumnsAndUtcDates(): void
    {
        $booking = (new \ReflectionClass(Booking::class))->newInstanceWithoutConstructor();
        $booking->id = 42;
        $booking->calendarId = 7;
        $booking->customerName = 'Alex';
        $booking->customerEmail = 'alex@example.com';
        $booking->startDate = new \DateTimeImmutable('2026-10-12T08:00:00-05:00');
        $booking->endDate = new \DateTimeImmutable('2026-10-12T08:30:00-05:00');
        $data = $booking->getRecordData();
        self::assertSame(42, $data['id']);
        self::assertSame(7, $data['calendarId']);
        self::assertSame('2026-10-12 13:00:00', $data['startDate']);
        self::assertSame('2026-10-12 13:30:00', $data['endDate']);
        self::assertSame('Alex', $data['customerName']);
        self::assertSame('alex@example.com', $data['customerEmail']);
        self::assertSame('requested', $data['bookingStatus']);
    }

    public function testTimeslotRequiresOffsetAndValidCalendarDate(): void
    {
        $controller = (new \ReflectionClass(BookingsController::class))->newInstanceWithoutConstructor();
        $parse = new \ReflectionMethod(BookingsController::class, 'parseStart');
        self::assertSame('2026-10-12T08:00:00-05:00', $parse->invoke($controller, '2026-10-12T08:00:00-05:00')->format(\DATE_ATOM));
        foreach (['2026-10-12 08:00', '2026-10-12T08:00:00', '2026-02-30T08:00:00Z', '2026-10-12T25:00:00Z', 'tomorrow', ''] as $value) {
            try {
                $parse->invoke($controller, $value);
                self::fail('An invalid timeslot was accepted: '.$value);
            } catch (BadRequestHttpException) {
                self::assertTrue(true);
            }
        }
    }
}
