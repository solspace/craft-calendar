<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\services\Elements;
use craft\web\Request;
use craft\web\Response;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\BookingsController;
use Solspace\Calendar\Elements\Booking;
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
class BookingStatusTest extends TestCase
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

            public function __construct(public Request $request, private Elements $elements) {}

            public function getElements(): Elements
            {
                return $this->elements;
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

    public function testStatusUpdatesUseTheBookingSaveServiceAndPreserveOtherAttributes(): void
    {
        $this->prepare(Booking::CONFIRMED);
        $this->service->expects(self::once())->method('save')->with($this->booking)->willReturn(true);
        self::assertSame(['success' => true, 'bookingStatus' => Booking::CONFIRMED], $this->controller->actionSetStatus()->data);
        self::assertSame('Customer', $this->booking->customerName);
        self::assertSame(12, $this->booking->id);
    }

    public function testUnchangedStatusDoesNotSaveOrSendAnotherNotification(): void
    {
        $this->prepare(Booking::REQUESTED);
        $this->service->expects(self::never())->method('save');
        self::assertTrue($this->controller->actionSetStatus()->data['success']);
    }

    public function testUnavailableConfirmationReturnsTheValidationError(): void
    {
        $this->prepare(Booking::CONFIRMED);
        $this->booking->addError('startDate', 'This time is unavailable.');
        $this->service->method('save')->willReturn(false);
        self::assertSame(['success' => false, 'message' => 'This time is unavailable.'], $this->controller->actionSetStatus()->data);
    }

    public function testCannotUpdateABookingInAnUnmanageableCalendar(): void
    {
        $this->prepare(Booking::CONFIRMED, false);
        $this->service->expects(self::never())->method('save');
        $this->expectException(ForbiddenHttpException::class);
        $this->controller->actionSetStatus();
    }

    public function testInvalidStatusesAreRejectedBeforeSaving(): void
    {
        $this->prepare(['confirmed']);
        $this->service->expects(self::never())->method('save');
        $this->expectException(BadRequestHttpException::class);
        $this->controller->actionSetStatus();
    }

    public function testUnknownBookingIsRejected(): void
    {
        $this->request->method('getIsCpRequest')->willReturn(true);
        $this->request->method('getIsPost')->willReturn(true);
        $this->request->method('getRequiredBodyParam')->willReturn(999);
        $this->elements->method('getElementById')->willReturn(null);
        $this->service->expects(self::never())->method('save');
        $this->expectException(ForbiddenHttpException::class);
        $this->controller->actionSetStatus();
    }

    public function testUnknownStatusIsRejectedBeforeSaving(): void
    {
        $this->prepare('unrecognized');
        $this->service->expects(self::never())->method('save');
        $this->expectException(BadRequestHttpException::class);
        $this->controller->actionSetStatus();
    }

    public function testSiteRequestsCannotChangeStatus(): void
    {
        $this->request->method('getIsCpRequest')->willReturn(false);
        $this->expectException(BadRequestHttpException::class);
        $this->controller->actionSetStatus();
    }

    public function testGetRequestsCannotChangeStatus(): void
    {
        $this->request->method('getIsCpRequest')->willReturn(true);
        $this->request->method('getIsPost')->willReturn(false);
        $this->expectException(MethodNotAllowedHttpException::class);
        $this->controller->actionSetStatus();
    }

    private function prepare(mixed $status, bool $allowed = true): void
    {
        $this->request->method('getIsCpRequest')->willReturn(true);
        $this->request->method('getIsPost')->willReturn(true);
        $this->request->method('getRequiredBodyParam')->willReturnMap([['bookingId', 12], ['bookingStatus', $status]]);
        $this->elements->method('getElementById')->with(12, Booking::class)->willReturn($this->booking);
        $this->service->method('canManage')->willReturn($allowed);
    }
}
