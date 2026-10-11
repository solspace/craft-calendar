<?php

namespace Solspace\Tests\Unit\Calendar\Variables;

use craft\web\View;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Services\CalendarsService;
use Solspace\Calendar\Variables\CalendarVariable;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Variables\CalendarVariable
 */
class BookingFormTest extends TestCase
{
    private mixed $previousApp;
    private ?Calendar $previousPlugin;
    private CalendarVariable $variable;
    private BookingsService $bookings;
    private View $view;
    private CalendarModel $calendar;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        $this->view = $this->createMock(View::class);
        \Craft::$app = new class($this->view) {
            public array $loadedModules = [];

            public function __construct(public View $view) {}
        };
        $this->bookings = $this->createMock(BookingsService::class);
        $calendars = $this->createMock(CalendarsService::class);
        $this->calendar = new CalendarModel(['id' => 7, 'name' => 'Meeting room', 'type' => CalendarModel::TYPE_SCHEDULING]);
        $this->calendar->scheduling = ['timezone' => 'America/Winnipeg', 'maximumAdvance' => 30];
        $calendars->method('getCalendarById')->willReturn($this->calendar);
        $calendars->method('getCalendarByHandle')->willReturn($this->calendar);
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->setComponents(['bookings' => $this->bookings, 'calendars' => $calendars]);
        Calendar::setInstance($plugin);
        $this->variable = (new \ReflectionClass(CalendarVariable::class))->newInstanceWithoutConstructor();
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        Calendar::setInstance($this->previousPlugin);
    }

    public function testPrivateOrUnavailableCalendarsProduceNoMarkupOrResources(): void
    {
        $this->bookings->method('getPublicCalendars')->willReturn([]);
        $this->view->expects(self::never())->method('renderTemplate');
        $this->bookings->expects(self::never())->method('getPublicFormFields');
        self::assertSame('', (string) $this->variable->bookingForm('meetingRoom'));
    }

    public function testFrameworkThemeDateAndSubmittedValuesReachTheFormWithUniqueIds(): void
    {
        $this->bookings->method('getPublicCalendars')->willReturn([7 => $this->calendar]);
        $booking = (new \ReflectionClass(Booking::class))->newInstanceWithoutConstructor();
        $booking->customerName = 'Submitted visitor';
        $this->bookings->method('getPublicFormFields')->with($booking)->willReturn([['handle' => 'publicQuestion']]);
        $today = new \DateTimeImmutable('now', new \DateTimeZone('America/Winnipeg'));
        $selected = $today->modify('+2 days')->format('Y-m-d');
        $ids = [];
        $this->view->expects(self::exactly(2))->method('renderTemplate')->willReturnCallback(static function ($template, $variables, $mode) use ($booking, $today, $selected, &$ids) {
            self::assertSame('calendar/bookings/_form', $template);
            self::assertSame(View::TEMPLATE_MODE_CP, $mode);
            self::assertSame('tailwind', $variables['framework']);
            self::assertSame('dark', $variables['theme']);
            self::assertSame($booking, $variables['booking']);
            self::assertSame($selected, $variables['date']);
            self::assertSame($today->format('Y-m-d'), $variables['minDate']);
            self::assertSame($today->modify('+30 days')->format('Y-m-d'), $variables['maxDate']);
            self::assertSame([['handle' => 'publicQuestion']], $variables['publicFields']);
            $ids[] = $variables['formId'];

            return '<form></form>';
        });
        foreach (['meetingRoom', 7] as $resource) {
            self::assertSame('<form></form>', (string) $this->variable->bookingForm($resource, ['framework' => 'tailwind', 'theme' => 'dark', 'date' => $selected, 'booking' => $booking]));
        }
        self::assertNotSame($ids[0], $ids[1]);
    }

    public function testInvalidOrOutOfWindowDatesFallBackToToday(): void
    {
        $this->bookings->method('getPublicCalendars')->willReturn([7 => $this->calendar]);
        $this->bookings->method('getPublicFormFields')->willReturn([]);
        $this->view->expects(self::exactly(4))->method('renderTemplate')->willReturnCallback(static function ($template, $variables) {
            self::assertSame($variables['minDate'], $variables['date']);
            self::assertSame('default', $variables['framework']);
            self::assertSame('auto', $variables['theme']);

            return '';
        });
        foreach (['not-a-date', '2000-01-01', '2999-01-01', ['unexpected']] as $date) {
            $this->variable->bookingForm(7, ['date' => $date, 'booking' => (new \ReflectionClass(Booking::class))->newInstanceWithoutConstructor()]);
        }
    }

    public function testInvalidStyleOptionsAreRejected(): void
    {
        $this->bookings->method('getPublicCalendars')->willReturn([7 => $this->calendar]);
        $this->view->expects(self::never())->method('renderTemplate');
        $this->expectException(\InvalidArgumentException::class);
        $this->variable->bookingForm(7, ['theme' => 'unexpected', 'booking' => (new \ReflectionClass(Booking::class))->newInstanceWithoutConstructor()]);
    }

    public function testSeasonalBoundsClampTheDatePickerAndFallbackDate(): void
    {
        $today = new \DateTimeImmutable('now', new \DateTimeZone('America/Winnipeg'));
        $from = $today->modify('+3 days')->format('Y-m-d');
        $until = $today->modify('+10 days')->format('Y-m-d');
        $this->calendar->scheduling += ['availableFrom' => $from, 'availableUntil' => $until];
        $this->bookings->method('getPublicCalendars')->willReturn([7 => $this->calendar]);
        $this->bookings->method('getPublicFormFields')->willReturn([]);
        $this->view->expects(self::once())->method('renderTemplate')->willReturnCallback(static function ($template, $variables) use ($from, $until) {
            self::assertSame($from, $variables['minDate']);
            self::assertSame($from, $variables['date']);
            self::assertSame($until, $variables['maxDate']);

            return '';
        });
        $this->variable->bookingForm(7, ['booking' => (new \ReflectionClass(Booking::class))->newInstanceWithoutConstructor()]);
    }

    public function testEventCaptchaHelperRespectsItsToggleAndReturnsOnlyPublicConfig(): void
    {
        self::assertSame('', (string) $this->variable->captcha());
        Calendar::getInstance()->setSettings(['captchaProvider' => 'recaptcha-v3', 'captchaSiteKey' => 'site-key', 'captchaSecretKey' => 'private-key', 'captchaProtectEvents' => true]);
        $this->view->expects(self::once())->method('renderTemplate')->willReturnCallback(static function ($template, $variables, $mode) {
            self::assertSame('calendar/spam-protection/_widget', $template);
            self::assertSame(View::TEMPLATE_MODE_CP, $mode);
            self::assertSame('calendar_event', $variables['captcha']['action']);
            self::assertSame('dark', $variables['theme']);
            self::assertStringNotContainsString('private-key', json_encode($variables));

            return '<div>captcha</div>';
        });
        self::assertSame('<div>captcha</div>', (string) $this->variable->captcha('event', ['theme' => 'dark']));
    }

    public function testCaptchaConfigurationReachesPublicFormsWithoutThePrivateKey(): void
    {
        Calendar::getInstance()->setSettings(['bookingCaptchaProvider' => 'hcaptcha', 'bookingCaptchaSiteKey' => 'site-key', 'bookingCaptchaSecretKey' => 'private-key']);
        $this->bookings->method('getPublicCalendars')->willReturn([7 => $this->calendar]);
        $this->bookings->method('getPublicFormFields')->willReturn([]);
        $this->view->expects(self::once())->method('renderTemplate')->willReturnCallback(static function ($template, $variables) {
            self::assertSame(['provider' => 'hcaptcha', 'siteKey' => 'site-key', 'responseField' => 'h-captcha-response', 'action' => 'calendar-booking'], $variables['captcha']);
            self::assertStringNotContainsString('private-key', json_encode($variables['captcha']));

            return '';
        });
        $this->variable->bookingForm(7, ['booking' => (new \ReflectionClass(Booking::class))->newInstanceWithoutConstructor()]);
    }
}
