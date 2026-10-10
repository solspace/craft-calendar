<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\ApiController;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\CalendarsService;
use yii\web\BadRequestHttpException;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Controllers\ApiController
 * @covers \Solspace\Calendar\Elements\Event
 */
class QuickCreateRecurrenceTest extends TestCase
{
    private mixed $previousApp;
    private ?Calendar $previousPlugin;
    private Calendar $plugin;
    private CalendarModel $calendar;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        \Craft::$app = new class {
            public string $language = 'en';
            public array $loadedModules = [];

            public function getTimeZone(): string
            {
                return 'America/Winnipeg';
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
        $this->calendar = new CalendarModel(['id' => 12, 'allowRepeatingEvents' => true]);
        $calendars = $this->createMock(CalendarsService::class);
        $calendars->method('getCalendarById')->willReturn($this->calendar);
        $this->plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $this->plugin->edition = Calendar::EDITION_PRO;
        $this->plugin->setComponents(['calendars' => $calendars]);
        Calendar::setInstance($this->plugin);
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        Calendar::setInstance($this->previousPlugin);
    }

    public function testSharedCreateAndDraftScheduleApplicationPreservesRecurrenceAndProtectsOtherAttributes(): void
    {
        $event = $this->event();
        $until = Carbon::parse('2026-11-09 14:30:00', 'UTC')->timestamp;
        $this->apply($event, [
            'repeatType' => 'CUSTOM',
            'repeatEndType' => 'ON_DATE',
            'rrule' => "DTSTART:20261009T143000\nRRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;UNTIL=20261109T143000",
            'until' => $until,
            'calendarId' => 999,
            'timezone' => 'Invalid/Zone',
            'allDay' => true,
            'start' => 0,
        ]);

        self::assertSame('CUSTOM', $event->repeatType);
        self::assertSame('ON_DATE', $event->repeatEndType);
        self::assertSame($until, $event->until->timestamp);
        self::assertSame('UTC', $event->timezone);
        self::assertSame(12, $event->calendarId);
        self::assertFalse($event->allDay);
        self::assertSame('2026-10-09 14:30:00', $event->startDate->format('Y-m-d H:i:s'));
        $event->validateRecurrence();
        self::assertSame([], $event->getErrors());
    }

    public function testAllDayRulesStayDateOnlyWithoutChangingExclusiveEndConversion(): void
    {
        $event = $this->event();
        $event->allDay = true;
        $event->startDate = Carbon::parse('2026-10-09 00:00:00', 'UTC');
        $event->endDate = Carbon::parse('2026-10-10 23:59:59', 'UTC');
        $this->apply($event, [
            'repeatType' => 'DAILY', 'repeatEndType' => 'AFTER',
            'rrule' => "DTSTART;VALUE=DATE:20261009\nRRULE:FREQ=DAILY;COUNT=4",
        ]);
        $event->validateRecurrence();
        self::assertSame([], $event->getErrors());
        self::assertStringContainsString('DTSTART:20261009', $event->rrule);
        self::assertSame('2026-10-10 23:59:59', $event->endDate->format('Y-m-d H:i:s'));
    }

    public function testRecurrenceCannotBypassCalendarRestrictionsOrProEdition(): void
    {
        $event = $this->event();
        $this->apply($event, ['repeatType' => 'DAILY', 'repeatEndType' => 'AFTER', 'rrule' => "DTSTART:20261009T143000\nRRULE:FREQ=DAILY;COUNT=4"]);
        $this->calendar->allowRepeatingEvents = false;
        $event->validateRecurrence();
        self::assertSame(['Repeating events are not allowed in the selected calendar.'], $event->getErrors('rrule'));
        $event->clearErrors();
        $this->calendar->allowRepeatingEvents = true;
        $this->plugin->edition = Calendar::EDITION_LITE;
        $event->validateRecurrence();
        self::assertSame(['Repeating events require Calendar Pro.'], $event->getErrors('rrule'));
    }

    public function testIncoherentMetadataIsRejectedByTheElementValidator(): void
    {
        $event = $this->event();
        $this->apply($event, ['repeatType' => 'DAILY', 'repeatEndType' => 'AFTER', 'rrule' => "DTSTART:20261009T143000\nRRULE:FREQ=WEEKLY"]);
        $event->validateRecurrence();
        self::assertTrue($event->hasErrors('repeatType'));
        self::assertTrue($event->hasErrors('repeatEndType'));
    }

    public function testNonRepeatingRequestsKeepTheirOriginalDefaults(): void
    {
        $event = $this->event();
        $this->apply($event, ['title' => 'Yoga', 'calendarId' => 12]);
        self::assertSame('NEVER', $event->repeatType);
        self::assertSame('NEVER', $event->repeatEndType);
        self::assertNull($event->rrule);
    }

    /**
     * @dataProvider invalidSettings
     */
    public function testMalformedPayloadsReturnBadRequest(array $values): void
    {
        $this->expectException(BadRequestHttpException::class);
        $this->apply($this->event(), $values);
    }

    public function invalidSettings(): iterable
    {
        yield [['repeatType' => ['DAILY']]];

        yield [['repeatEndType' => false]];

        yield [['rrule' => ['FREQ=DAILY']]];

        yield [['rrule' => null]];

        yield [['until' => []]];

        yield [['until' => 'not-a-date']];
    }

    private function event(): Event
    {
        $event = $this->getMockBuilder(Event::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
        $event->calendarId = 12;
        $event->timezone = 'UTC';
        $event->allDay = false;
        $event->startDate = Carbon::parse('2026-10-09 14:30:00', 'UTC');
        $event->endDate = Carbon::parse('2026-10-09 16:30:00', 'UTC');

        return $event;
    }

    private function apply(Event $event, array $values): void
    {
        $controller = (new \ReflectionClass(ApiController::class))->newInstanceWithoutConstructor();
        (new \ReflectionMethod(ApiController::class, 'applyQuickCreateRecurrence'))->invoke($controller, $event, $values);
    }
}
