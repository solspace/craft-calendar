<?php

namespace Solspace\Tests\Unit\Calendar;

use craft\config\GeneralConfig;
use craft\web\Request;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Services\SettingsService;
use yii\db\Connection;

/** @coversNothing */
class CalendarNavBadgeTest extends TestCase
{
    public function testNativeBadgeCountsOnlyManageablePendingBookingsAndSkipsQueriesWhenDisabled(): void
    {
        $previousApp = \Craft::$app;
        $previousPlugin = Calendar::getInstance();
        $db = new Connection(['dsn' => 'sqlite::memory:']);
        $db->createCommand('CREATE TABLE elements (id INTEGER PRIMARY KEY, dateDeleted TEXT)')->execute();
        $db->createCommand('CREATE TABLE calendar_calendars (id INTEGER PRIMARY KEY, type TEXT)')->execute();
        $db->createCommand('CREATE TABLE calendar_bookings (id INTEGER PRIMARY KEY, calendarId INTEGER, bookingStatus TEXT)')->execute();
        foreach ([[7, 'scheduling'], [8, 'scheduling'], [9, 'events']] as [$id, $type]) {
            $db->createCommand()->insert('calendar_calendars', compact('id', 'type'))->execute();
        }
        foreach ([[1, 7, 'requested', null], [2, 8, 'requested', null], [3, 7, 'confirmed', null], [4, 7, 'declined', null], [5, 7, 'requested', '2026-10-12'], [6, 9, 'requested', null]] as [$id, $calendarId, $bookingStatus, $dateDeleted]) {
            $db->createCommand()->insert('elements', compact('id', 'dateDeleted'))->execute();
            $db->createCommand()->insert('calendar_bookings', compact('id', 'calendarId', 'bookingStatus'))->execute();
        }

        try {
            $cp = true;
            $request = $this->createMock(Request::class);
            $request->method('getIsCpRequest')->willReturnCallback(static function () use (&$cp): bool { return $cp; });
            $request->method('getIsConsoleRequest')->willReturn(true);
            \Craft::$app = new class($request, $db) {
                public string $language = 'en';
                public array $loadedModules = [];
                public int $dbReads = 0;

                public function __construct(public Request $request, private Connection $db) {}

                public function getRequest(): Request
                {
                    return $this->request;
                }

                public function getDb(): Connection
                {
                    ++$this->dbReads;

                    return $this->db;
                }

                public function getVersion(): string
                {
                    return '5.8.0';
                }

                public function getIsInitialized(): bool
                {
                    return false;
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

                public function getConfig(): object
                {
                    return new class {
                        public function getLoadingConfigFile(): ?string
                        {
                            return null;
                        }

                        public function getGeneral(): GeneralConfig
                        {
                            return new GeneralConfig(['allowAdminChanges' => false]);
                        }
                    };
                }
            };
            $settings = new SettingsModel();
            $settingsService = $this->createMock(SettingsService::class);
            $settingsService->method('getSettingsModel')->willReturn($settings);
            $allowed = [7 => new CalendarModel(['id' => 7, 'type' => 'scheduling'])];
            $bookings = $this->createMock(BookingsService::class);
            $bookings->method('getManageableCalendars')->willReturnCallback(static function () use (&$allowed): array { return $allowed; });
            $bookings->expects(self::never())->method('unavailableRequestIds');
            $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
            $plugin->setBasePath(__DIR__.'/../src');
            $plugin->id = 'calendar';
            $plugin->name = 'Calendar';
            $plugin->setComponents(['settings' => $settingsService, 'bookings' => $bookings]);
            Calendar::setInstance($plugin);

            self::assertArrayNotHasKey('badgeCount', $plugin->getCpNavItem());
            self::assertSame(0, \Craft::$app->dbReads);
            $settings->showBookingRequestBadge = true;
            $nav = $plugin->getCpNavItem();
            self::assertSame(1, $nav['badgeCount']);
            self::assertTrue($nav['linkAttributes']['data']['booking-request-nav-badge']);
            self::assertSame('calendar', $nav['url']);
            self::assertArrayHasKey('bookings', $nav['subnav']);
            self::assertGreaterThan(0, \Craft::$app->dbReads);

            $allowed = [];
            \Craft::$app->dbReads = 0;
            self::assertArrayNotHasKey('badgeCount', $plugin->getCpNavItem());
            self::assertSame(0, \Craft::$app->dbReads);
            $allowed = [7 => new CalendarModel(['id' => 7, 'type' => 'scheduling'])];
            $db->createCommand()->update('calendar_bookings', ['bookingStatus' => 'confirmed'], ['id' => 1])->execute();
            self::assertArrayNotHasKey('badgeCount', $plugin->getCpNavItem());
            $cp = false;
            \Craft::$app->dbReads = 0;
            self::assertArrayNotHasKey('badgeCount', $plugin->getCpNavItem());
            self::assertSame(0, \Craft::$app->dbReads);
        } finally {
            \Craft::$app = $previousApp;
            Calendar::setInstance($previousPlugin);
            $db->close();
        }
    }
}
