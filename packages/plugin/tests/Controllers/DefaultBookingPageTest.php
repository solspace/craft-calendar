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
    public function testBookingDefaultsAndNavigationPreserveTheSiteAndRespectCalendarAccess(): void
    {
        $previousApp = \Craft::$app;
        $previousPlugin = Calendar::getInstance();

        try {
            foreach ([true, false] as $canManage) {
                foreach (['bookings', 'schedule', 'invalid'] as $bookingView) {
                    $request = $this->createMock(Request::class);
                    $request->method('getQueryParam')->with('site')->willReturn('secondary');
                    $request->method('getIsConsoleRequest')->willReturn(true);
                    \Craft::$app = new class($request) {
                        public array $loadedModules = [];
                        public string $language = 'en-US';

                        public function __construct(public Request $request) {}

                        public function getRequest(): Request
                        {
                            return $this->request;
                        }

                        public function getVersion(): string
                        {
                            return '5.8.0';
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
                                    return new GeneralConfig(['baseCpUrl' => 'https://example.test', 'cpTrigger' => 'admin', 'omitScriptNameInUrls' => true, 'allowAdminChanges' => false]);
                                }
                            };
                        }
                    };
                    $bookings = $this->createMock(BookingsService::class);
                    $bookings->expects(self::exactly(2))->method('getManageableCalendars')->willReturn($canManage ? [7 => new CalendarModel(['id' => 7, 'type' => CalendarModel::TYPE_SCHEDULING])] : []);
                    $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
                    $plugin->setComponents(['bookings' => $bookings]);
                    Calendar::setInstance($plugin);
                    $settings = new SettingsModel(['defaultBookingView' => $bookingView, 'bookingPageLabel' => 'Appointments']);
                    $settings->defaultView = Calendar::VIEW_BOOKINGS;
                    $service = $this->createMock(SettingsService::class);
                    $service->method('getSettingsModel')->willReturn($settings);
                    $plugin->set('settings', $service);
                    $subnav = [];
                    $subnav = include __DIR__.'/../../src/subnav.php';
                    if ($canManage) {
                        self::assertSame('Appointments', $subnav['bookings']['label']);
                        self::assertSame('schedule' === $bookingView ? 'calendar/bookings/schedule' : 'calendar/bookings', $subnav['bookings']['url']);
                    } else {
                        self::assertArrayNotHasKey('bookings', $subnav);
                    }
                    $controller = $this->getMockBuilder(SettingsController::class)->disableOriginalConstructor()->onlyMethods(['getSettingsService', 'redirect'])->getMock();
                    $controller->method('getSettingsService')->willReturn($service);
                    $response = $this->createMock(Response::class);
                    $controller->expects(self::once())->method('redirect')->with('https://example.test/admin/calendar/'.($canManage ? ('schedule' === $bookingView ? 'bookings/schedule' : 'bookings') : 'overview').'?site=secondary')->willReturn($response);
                    self::assertSame($response, $controller->actionDefaultView());
                }
            }
        } finally {
            \Craft::$app = $previousApp;
            Calendar::setInstance($previousPlugin);
        }
    }
}
