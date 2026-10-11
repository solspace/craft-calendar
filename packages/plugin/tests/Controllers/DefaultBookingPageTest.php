<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\config\GeneralConfig;
use craft\web\Request;
use craft\web\Response;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\SettingsController;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Services\SettingsService;

/** @coversNothing */
class DefaultBookingPageTest extends TestCase
{
    public function testBookingDefaultPreservesTheSiteAndFallsBackWhenNoCalendarIsManageable(): void
    {
        $previousApp = \Craft::$app;
        $previousPlugin = Calendar::getInstance();

        try {
            foreach ([true, false] as $canManage) {
                $request = $this->createMock(Request::class);
                $request->method('getQueryParam')->with('site')->willReturn('secondary');
                \Craft::$app = new class($request) {
                    public array $loadedModules = [];

                    public function __construct(public Request $request) {}

                    public function getRequest(): Request
                    {
                        return $this->request;
                    }

                    public function getIsInitialized(): bool
                    {
                        return false;
                    }

                    public function getConfig(): object
                    {
                        return new class {
                            public function getLoadingConfigFile(): ?string
                            {
                                return null;
                            }

                            public function getGeneral(): GeneralConfig
                            {
                                return new GeneralConfig(['baseCpUrl' => 'https://example.test', 'cpTrigger' => 'admin', 'omitScriptNameInUrls' => true]);
                            }
                        };
                    }
                };
                $bookings = $this->createMock(BookingsService::class);
                $bookings->expects(self::once())->method('getManageableCalendars')->willReturn($canManage ? [7 => new CalendarModel(['id' => 7, 'type' => CalendarModel::TYPE_SCHEDULING])] : []);
                $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
                $plugin->setComponents(['bookings' => $bookings]);
                Calendar::setInstance($plugin);
                $settings = new SettingsModel();
                $settings->defaultView = Calendar::VIEW_BOOKINGS;
                $service = $this->createMock(SettingsService::class);
                $service->method('getSettingsModel')->willReturn($settings);
                $controller = $this->getMockBuilder(SettingsController::class)->disableOriginalConstructor()->onlyMethods(['getSettingsService', 'redirect'])->getMock();
                $controller->method('getSettingsService')->willReturn($service);
                $response = $this->createMock(Response::class);
                $controller->expects(self::once())->method('redirect')->with('https://example.test/admin/calendar/'.($canManage ? 'bookings' : 'overview').'?site=secondary')->willReturn($response);
                self::assertSame($response, $controller->actionDefaultView());
            }
        } finally {
            \Craft::$app = $previousApp;
            Calendar::setInstance($previousPlugin);
        }
    }
}
