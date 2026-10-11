<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\i18n\Formatter;
use craft\i18n\Locale;
use craft\services\Elements;
use craft\web\Request;
use craft\web\Response;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\BookingsController;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Scheduling\BookingConflictException;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\BookingsService;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\MethodNotAllowedHttpException;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Controllers\BookingsController
 */
class BookingLifecycleTest extends TestCase
{
    private mixed $previousApp;
    private ?Calendar $previousPlugin;
    private BookingsController $controller;
    private Request $request;
    private BookingsService $service;
    private Elements $elements;
    private Booking $booking;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        $this->request = $this->createMock(Request::class);
        $this->service = $this->createMock(BookingsService::class);
        $this->elements = $this->createMock(Elements::class);
        \Craft::$app = new class($this->request, $this->elements) {
            public string $language = 'en';
            public string $timeZone = 'America/Toronto';

            public function __construct(public Request $request, private Elements $elements) {}

            public function getElements(): Elements
            {
                return $this->elements;
            }

            public function getSites(): object
            {
                return new class {
                    public function getPrimarySite(): object
                    {
                        return (object) ['id' => 1];
                    }
                };
            }

            public function getFormatter(): Formatter
            {
                return new Formatter(['locale' => 'en-US', 'timeZone' => 'America/Toronto', 'booleanFormat' => ['No', 'Yes'], 'nullDisplay' => '']);
            }

            public function getFormattingLocale(): Locale
            {
                return new Locale('en-US');
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
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->setComponents(['bookings' => $this->service]);
        Calendar::setInstance($plugin);
        $this->booking = $this->getMockBuilder(Booking::class)->disableOriginalConstructor()->onlyMethods(['getCalendar'])->getMock();
        $this->booking->id = 12;
        $this->booking->customerName = 'Customer';
        $this->booking->method('getCalendar')->willReturn(new CalendarModel(['id' => 7, 'type' => CalendarModel::TYPE_SCHEDULING]));
        $this->controller = $this->getMockBuilder(BookingsController::class)->disableOriginalConstructor()->onlyMethods(['asJson'])->getMock();
        $this->controller->request = $this->request;
        $this->controller->method('asJson')->willReturnCallback(static function ($data) {
            $response = (new \ReflectionClass(Response::class))->newInstanceWithoutConstructor();
            $response->data = $data;

            return $response;
        });
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        Calendar::setInstance($this->previousPlugin);
    }

    public function testDeletionUsesNativeSoftDeletionOnThePrimarySite(): void
    {
        $this->prepare(false);
        $this->elements->expects(self::once())->method('deleteElement')->with($this->booking, false)->willReturn(true);
        $this->elements->expects(self::never())->method('restoreElement');
        $this->service->expects(self::never())->method('save');
        self::assertSame(['success' => true], $this->controller->actionDelete()->data);
        self::assertSame('Customer', $this->booking->customerName);
    }

    public function testNativeDeletionVetoReturnsAnError(): void
    {
        $this->prepare(false);
        $this->elements->method('deleteElement')->willReturn(false);
        self::assertSame(['success' => false, 'message' => 'Could not delete booking.'], $this->controller->actionDelete()->data);
    }

    public function testRestorationUsesNativeLifecycleForTrashedBookings(): void
    {
        $this->prepare(true);
        $this->elements->expects(self::once())->method('restoreElement')->with($this->booking)->willReturn(true);
        $this->elements->expects(self::never())->method('deleteElement');
        $this->service->expects(self::never())->method('save');
        self::assertSame(['success' => true], $this->controller->actionRestore()->data);
    }

    public function testConflictingRestoreReturnsTheAvailabilityError(): void
    {
        $this->prepare(true);
        $this->elements->method('restoreElement')->willThrowException(new BookingConflictException('This time is unavailable.'));
        self::assertSame(['success' => false, 'message' => 'This time is unavailable.'], $this->controller->actionRestore()->data);
    }

    public function testNativeRestoreVetoReturnsAnError(): void
    {
        $this->prepare(true);
        $this->elements->method('restoreElement')->willReturn(false);
        self::assertSame(['success' => false, 'message' => 'Could not restore booking.'], $this->controller->actionRestore()->data);
    }

    public function testRestoreValidationErrorsAreReturned(): void
    {
        $this->prepare(true);
        $this->booking->addError('calendarId', 'Calendar is unavailable.');
        $this->elements->method('restoreElement')->willReturn(false);
        self::assertSame(['success' => false, 'message' => 'Calendar is unavailable.'], $this->controller->actionRestore()->data);
    }

    public function testDeletionRequiresCalendarManagementPermission(): void
    {
        $this->prepare(false, false);
        $this->elements->expects(self::never())->method('deleteElement');
        $this->expectException(ForbiddenHttpException::class);
        $this->controller->actionDelete();
    }

    public function testRestorationRequiresCalendarManagementPermission(): void
    {
        $this->prepare(true, false);
        $this->elements->expects(self::never())->method('restoreElement');
        $this->expectException(ForbiddenHttpException::class);
        $this->controller->actionRestore();
    }

    public function testMissingOrNonBookingElementsAreRejected(): void
    {
        $this->request->method('getIsCpRequest')->willReturn(true);
        $this->request->method('getIsPost')->willReturn(true);
        $this->request->method('getRequiredBodyParam')->willReturn(999);
        $this->elements->method('getElementById')->willReturn(null);
        $this->elements->expects(self::never())->method('deleteElement');
        $this->expectException(ForbiddenHttpException::class);
        $this->controller->actionDelete();
    }

    public function testInvalidIdsAreRejectedBeforeElementLookup(): void
    {
        $this->request->method('getIsCpRequest')->willReturn(true);
        $this->request->method('getIsPost')->willReturn(true);
        $this->request->method('getRequiredBodyParam')->willReturn([12]);
        $this->elements->expects(self::never())->method('getElementById');
        $this->expectException(BadRequestHttpException::class);
        $this->controller->actionDelete();
    }

    public function testSiteRequestsCannotDelete(): void
    {
        $this->request->method('getIsCpRequest')->willReturn(false);
        $this->expectException(BadRequestHttpException::class);
        $this->controller->actionDelete();
    }

    public function testGetRequestsCannotRestore(): void
    {
        $this->request->method('getIsCpRequest')->willReturn(true);
        $this->request->method('getIsPost')->willReturn(false);
        $this->expectException(MethodNotAllowedHttpException::class);
        $this->controller->actionRestore();
    }

    public function testBulkDeletionSoftDeletesEachUniqueBooking(): void
    {
        $other = $this->additionalBooking(13);
        $this->prepareSelection(['12', 13, 12], false, [$this->booking, $other]);
        $deleted = [];
        $this->elements->expects(self::exactly(2))->method('deleteElement')->willReturnCallback(static function (Booking $booking, bool $hardDelete) use (&$deleted) {
            self::assertFalse($hardDelete);
            $deleted[] = $booking->id;

            return true;
        });
        self::assertSame(['success' => true, 'completedIds' => [12, 13], 'errors' => []], $this->controller->actionDeleteSelected()->data);
        self::assertSame([12, 13], $deleted);
    }

    public function testBulkRestoreKeepsConflictingBookingsInTrashAndContinues(): void
    {
        $other = $this->additionalBooking(13);
        $this->prepareSelection([12, 13], true, [$this->booking, $other]);
        $this->elements->expects(self::exactly(2))->method('restoreElement')->willReturnCallback(static function (Booking $booking) {
            if (12 === $booking->id) {
                throw new BookingConflictException('This time is unavailable.');
            }

            return true;
        });
        self::assertSame([
            'success' => false, 'completedIds' => [13],
            'errors' => [['bookingId' => 12, 'customer' => 'Customer', 'message' => 'This time is unavailable.']],
        ], $this->controller->actionRestoreSelected()->data);
    }

    public function testBulkDeletionReportsNativeVeto(): void
    {
        $this->prepareSelection([12], false, [$this->booking]);
        $this->elements->method('deleteElement')->willReturn(false);
        self::assertSame([
            'success' => false, 'completedIds' => [],
            'errors' => [['bookingId' => 12, 'customer' => 'Customer', 'message' => 'Could not delete booking.']],
        ], $this->controller->actionDeleteSelected()->data);
    }

    public function testBulkRestoreReportsNativeValidationError(): void
    {
        $this->prepareSelection([12], true, [$this->booking]);
        $this->booking->addError('calendarId', 'Calendar is unavailable.');
        $this->elements->method('restoreElement')->willReturn(false);
        self::assertSame('Calendar is unavailable.', $this->controller->actionRestoreSelected()->data['errors'][0]['message']);
    }

    public function testBulkDeletionAuthorizesTheEntireSelectionBeforeDeleting(): void
    {
        $other = $this->additionalBooking(13);
        $this->prepareSelection([12, 13], false, [$this->booking, $other], false);
        $this->service->method('canManage')->willReturnOnConsecutiveCalls(true, false);
        $this->elements->expects(self::never())->method('deleteElement');
        $this->expectException(ForbiddenHttpException::class);
        $this->controller->actionDeleteSelected();
    }

    public function testBulkRestoreRejectsMissingElementsBeforeRestoring(): void
    {
        $this->prepareSelection([12, 99], true, [$this->booking]);
        $this->elements->expects(self::never())->method('restoreElement');
        $this->expectException(ForbiddenHttpException::class);
        $this->controller->actionRestoreSelected();
    }

    public function testBulkDeletionRejectsEmptySelection(): void
    {
        $this->prepareInvalidSelection([]);
        $this->expectException(BadRequestHttpException::class);
        $this->controller->actionDeleteSelected();
    }

    public function testBulkDeletionRejectsNonArraySelection(): void
    {
        $this->prepareInvalidSelection('12,13');
        $this->expectException(BadRequestHttpException::class);
        $this->controller->actionDeleteSelected();
    }

    public function testBulkRestoreRejectsInvalidIdBeforeAnyLookups(): void
    {
        $this->prepareInvalidSelection([12, '13oops']);
        $this->expectException(BadRequestHttpException::class);
        $this->controller->actionRestoreSelected();
    }

    public function testBulkDeletionRejectsMoreThanOnePage(): void
    {
        $this->prepareInvalidSelection(range(1, 51));
        $this->expectException(BadRequestHttpException::class);
        $this->controller->actionDeleteSelected();
    }

    public function testBulkDeletionRejectsSiteRequests(): void
    {
        $this->request->method('getIsCpRequest')->willReturn(false);
        $this->elements->expects(self::never())->method('deleteElement');
        $this->expectException(BadRequestHttpException::class);
        $this->controller->actionDeleteSelected();
    }

    public function testBulkRestoreRequiresPost(): void
    {
        $this->request->method('getIsCpRequest')->willReturn(true);
        $this->request->method('getIsPost')->willReturn(false);
        $this->elements->expects(self::never())->method('restoreElement');
        $this->expectException(MethodNotAllowedHttpException::class);
        $this->controller->actionRestoreSelected();
    }

    private function additionalBooking(int $id): Booking
    {
        $booking = $this->getMockBuilder(Booking::class)->disableOriginalConstructor()->onlyMethods(['getCalendar'])->getMock();
        $booking->id = $id;
        $booking->customerName = 'Another customer';
        $booking->method('getCalendar')->willReturn($this->booking->getCalendar());

        return $booking;
    }

    private function prepareInvalidSelection(mixed $ids): void
    {
        $this->request->method('getIsCpRequest')->willReturn(true);
        $this->request->method('getIsPost')->willReturn(true);
        $this->request->method('getRequiredBodyParam')->with('bookingIds')->willReturn($ids);
        $this->elements->expects(self::never())->method('getElementById');
        $this->elements->expects(self::never())->method('deleteElement');
        $this->elements->expects(self::never())->method('restoreElement');
    }

    private function prepareSelection(array $ids, bool $trashed, array $bookings, bool $allowed = true): void
    {
        $this->request->method('getIsCpRequest')->willReturn(true);
        $this->request->method('getIsPost')->willReturn(true);
        $this->request->method('getRequiredBodyParam')->with('bookingIds')->willReturn($ids);
        $this->elements->method('getElementById')->willReturnCallback(static function ($id, $type, $siteId, $criteria) use ($bookings, $trashed) {
            self::assertSame(Booking::class, $type);
            self::assertSame(1, $siteId);
            self::assertSame(['trashed' => $trashed], $criteria);
            foreach ($bookings as $booking) {
                if ($booking->id === $id) {
                    return $booking;
                }
            }

            return null;
        });
        if ($allowed) {
            $this->service->method('canManage')->willReturn(true);
        }
    }

    private function prepare(bool $trashed, bool $allowed = true): void
    {
        $this->request->method('getIsCpRequest')->willReturn(true);
        $this->request->method('getIsPost')->willReturn(true);
        $this->request->method('getRequiredBodyParam')->willReturn(12);
        $this->elements->expects(self::once())->method('getElementById')->with(12, Booking::class, 1, ['trashed' => $trashed])->willReturn($this->booking);
        $this->service->method('canManage')->willReturn($allowed);
    }
}
