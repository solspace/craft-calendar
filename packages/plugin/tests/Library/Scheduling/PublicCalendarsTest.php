<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Services\CalendarsService;

/** @coversNothing */
class PublicCalendarsTest extends TestCase
{
    public function testPublicResourcesRespectActiveStateSeasonGuestSettingAndCurrentSite(): void
    {
        $previousApp = \Craft::$app;
        $previousPlugin = Calendar::getInstance();

        try {
            \Craft::$app = new class {
                public array $loadedModules = [];
                public object $sites;

                public function __construct()
                {
                    $this->sites = new class {
                        public function getCurrentSite(): object
                        {
                            return (object) ['id' => 2];
                        }
                    };
                }
            };
            $today = new \DateTimeImmutable('now', new \DateTimeZone('America/Winnipeg'));
            $resources = [];
            foreach ([
                1 => [CalendarModel::TYPE_EVENTS, true, []],
                2 => [CalendarModel::TYPE_SCHEDULING, true, ['active' => false]],
                3 => [CalendarModel::TYPE_SCHEDULING, true, ['availableUntil' => $today->modify('-1 day')->format('Y-m-d')]],
                4 => [CalendarModel::TYPE_SCHEDULING, true, ['allowGuests' => false]],
                5 => [CalendarModel::TYPE_SCHEDULING, false, []],
                6 => [CalendarModel::TYPE_SCHEDULING, true, ['availableFrom' => $today->modify('+3 days')->format('Y-m-d')]],
                7 => [CalendarModel::TYPE_SCHEDULING, true, ['availableUntil' => $today->format('Y-m-d')]],
                8 => [CalendarModel::TYPE_SCHEDULING, true, ['availableFrom' => 'invalid']],
            ] as $id => [$type, $supportsSite, $rules]) {
                $calendar = $this->getMockBuilder(CalendarModel::class)->onlyMethods(['getSiteSettingsForSite'])->getMock();
                $calendar->id = $id;
                $calendar->type = $type;
                $calendar->scheduling = array_replace(['timezone' => 'America/Winnipeg', 'allowGuests' => true], $rules);
                $calendar->method('getSiteSettingsForSite')->with(2)->willReturn($supportsSite ? new CalendarSiteSettingsModel() : null);
                $resources[$id] = $calendar;
            }
            $calendars = $this->createMock(CalendarsService::class);
            $calendars->method('getAllCalendars')->willReturn($resources);
            $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
            $plugin->setComponents(['calendars' => $calendars]);
            $plugin->setSettings(['guestAccess' => [1]]);
            Calendar::setInstance($plugin);
            self::assertSame([6, 7], array_keys((new BookingsService())->getPublicCalendars()));
        } finally {
            \Craft::$app = $previousApp;
            Calendar::setInstance($previousPlugin);
        }
    }
}
