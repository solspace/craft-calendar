<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\web\Request;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\BookingsController;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\BookingsService;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\MethodNotAllowedHttpException;

/** @coversNothing */
class BookingRequestQueueTest extends TestCase
{
    public function testQueueRejectsUnauthorizedOrMalformedFiltersBeforeReadingBookings(): void
    {
        $previousApp = \Craft::$app;
        $previousPlugin = Calendar::getInstance();

        try {
            \Craft::$app = (object) ['loadedModules' => []];
            $service = $this->createMock(BookingsService::class);
            $service->method('getManageableCalendars')->willReturn([7 => new CalendarModel(['id' => 7, 'type' => 'scheduling'])]);
            $service->expects(self::never())->method('unavailableRequestIds');
            $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
            $plugin->setComponents(['bookings' => $service]);
            Calendar::setInstance($plugin);
            foreach ([[false, [], BadRequestHttpException::class], [true, ['calendarIds' => '9'], ForbiddenHttpException::class], [true, ['calendarIds' => []], BadRequestHttpException::class], [true, ['availability' => 'occupied'], BadRequestHttpException::class], [true, ['search' => []], BadRequestHttpException::class]] as [$cp, $params, $exception]) {
                $request = $this->createMock(Request::class);
                $request->method('getIsCpRequest')->willReturn($cp);
                $request->method('getQueryParam')->willReturnCallback(static fn ($name, $default = null) => $params[$name] ?? $default);
                \Craft::$app = (object) ['request' => $request, 'loadedModules' => []];
                Calendar::setInstance($plugin);
                $controller = $this->getMockBuilder(BookingsController::class)->disableOriginalConstructor()->onlyMethods(['renderTemplate'])->getMock();
                $controller->request = $request;
                $controller->expects(self::never())->method('renderTemplate');

                try {
                    $controller->actionRequests();
                    self::fail('Invalid filters must not query bookings.');
                } catch (BadRequestHttpException|ForbiddenHttpException $error) {
                    self::assertInstanceOf($exception, $error);
                }
            }
        } finally {
            \Craft::$app = $previousApp;
            Calendar::setInstance($previousPlugin);
        }
    }

    public function testModerationRequiresCpPostJsonAndAValidDecision(): void
    {
        $previousApp = \Craft::$app;

        try {
            foreach ([[false, true, true, []], [true, false, true, []], [true, true, false, []], [true, true, true, ['bookingStatus' => 'cancelled']], [true, true, true, ['bookingId' => 0]], [true, true, true, ['originalCalendarId' => []]], [true, true, true, ['originalStartDate' => []]]] as [$cp, $post, $json, $override]) {
                $params = $override + ['bookingId' => 42, 'bookingStatus' => 'confirmed', 'originalCalendarId' => 7, 'originalStartDate' => '2026-10-12T09:00:00Z'];
                $request = $this->createMock(Request::class);
                $request->method('getIsCpRequest')->willReturn($cp);
                $request->method('getIsPost')->willReturn($post);
                $request->method('getAcceptsJson')->willReturn($json);
                $request->method('getRequiredBodyParam')->willReturnCallback(static fn ($name) => $params[$name] ?? null);
                \Craft::$app = (object) ['request' => $request];
                $controller = $this->getMockBuilder(BookingsController::class)->disableOriginalConstructor()->onlyMethods(['asSuccess'])->getMock();
                $controller->request = $request;
                $controller->expects(self::never())->method('asSuccess');

                try {
                    $controller->actionModerateRequest();
                    self::fail('Invalid moderation must fail before saving.');
                } catch (BadRequestHttpException|MethodNotAllowedHttpException $error) {
                    self::assertSame($cp && !$post ? 405 : 400, $error->statusCode);
                }
            }
        } finally {
            \Craft::$app = $previousApp;
        }
    }
}
