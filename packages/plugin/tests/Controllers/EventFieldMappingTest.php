<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\fields\PlainText;
use craft\models\FieldLayout;
use craft\web\Request;
use craft\web\User;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Controllers\EventsApiController;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\CalendarsService;
use yii\web\ForbiddenHttpException;
use yii\web\Response;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Controllers\EventsApiController
 */
class EventFieldMappingTest extends TestCase
{
    private mixed $previousApp;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
    }

    public function testCustomFieldSourcesUseFieldHandlesInsteadOfNumericIds(): void
    {
        $controller = $this->controller();
        $field = $this->getMockBuilder(PlainText::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
        $field->id = 42;
        $field->handle = 'eventDescription';
        $field->name = 'Event Description';
        $layout = $this->createMock(FieldLayout::class);
        $layout->method('getCustomFields')->willReturn([$field]);
        $calendar = $this->calendar();
        $calendar->method('getFieldLayout')->willReturn($layout);
        $service = $this->createMock(CalendarsService::class);
        $service->expects(self::once())->method('getCalendarById')->with(17)->willReturn($calendar);
        $controller->method('getCalendarService')->willReturn($service);

        self::assertSame([['id' => 'eventDescription', 'label' => 'Event Description']], $controller->actionCustomFields()->data);
    }

    public function testCalendarsWithoutLayoutsReturnAnEmptyList(): void
    {
        $controller = $this->controller();
        $service = $this->createMock(CalendarsService::class);
        $service->method('getCalendarById')->willReturn($this->calendar());
        $controller->method('getCalendarService')->willReturn($service);

        self::assertSame([], $controller->actionCustomFields()->data);
    }

    public function testFieldMappingRespectsCalendarReadPermissions(): void
    {
        $controller = $this->controller(false);
        $calendar = $this->calendar();
        $calendar->expects(self::never())->method('getFieldLayout');
        $service = $this->createMock(CalendarsService::class);
        $service->method('getCalendarById')->willReturn($calendar);
        $controller->method('getCalendarService')->willReturn($service);

        $this->expectException(ForbiddenHttpException::class);
        $controller->actionCustomFields();
    }

    public function testSchedulingCalendarsCannotExposeEventFieldMappings(): void
    {
        $controller = $this->controller();
        $calendar = $this->calendar(true);
        $calendar->expects(self::never())->method('getFieldLayout');
        $service = $this->createMock(CalendarsService::class);
        $service->method('getCalendarById')->willReturn($calendar);
        $controller->method('getCalendarService')->willReturn($service);

        $this->expectException(ForbiddenHttpException::class);
        $controller->actionCustomFields();
    }

    private function controller(bool $admin = true): EventsApiController
    {
        $request = $this->createMock(Request::class);
        $request->method('get')->with('calendarId')->willReturn('17');
        $request->method('getIsConsoleRequest')->willReturn(false);
        $user = $this->createMock(User::class);
        $user->method('getIsAdmin')->willReturn($admin);
        $user->method('checkPermission')->willReturn(false);
        \Craft::$app = new class($request, $user) {
            public function __construct(public Request $request, public User $user) {}

            public function getUser(): User
            {
                return $this->user;
            }

            public function getEdition(): mixed
            {
                return \Craft::Pro;
            }
        };
        $controller = $this->getMockBuilder(EventsApiController::class)->disableOriginalConstructor()
            ->onlyMethods(['requireLogin', 'requireCpRequest', 'asJson', 'getCalendarService'])->getMock()
        ;
        $controller->request = $request;
        $controller->expects(self::once())->method('requireLogin');
        $controller->expects(self::once())->method('requireCpRequest');
        $controller->method('asJson')->willReturnCallback(function ($data): Response {
            $response = $this->getMockBuilder(Response::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
            $response->data = $data;

            return $response;
        });

        return $controller;
    }

    private function calendar(bool $scheduling = false): CalendarModel
    {
        $calendar = $this->getMockBuilder(CalendarModel::class)->disableOriginalConstructor()
            ->onlyMethods(['getIsScheduling', 'getFieldLayout'])->getMock()
        ;
        $calendar->uid = 'calendar-uid';
        $calendar->method('getIsScheduling')->willReturn($scheduling);

        return $calendar;
    }
}
