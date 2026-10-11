<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\models\FieldLayout;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Scheduling\BookingNotifications;
use Solspace\Calendar\Models\BookingNotificationSettings;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Tests\Unit\Calendar\Support\BookingNotificationView;
use Twig\TwigFunction;

require_once __DIR__.'/../../_support/BookingNotificationView.php';

/** @coversNothing */
class BookingNotificationsTest extends TestCase
{
    private mixed $previousApp;
    private BookingNotificationView $view;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->view = new BookingNotificationView();
        \Craft::$app = new class($this->view) {
            public string $language = 'en';

            public function __construct(private BookingNotificationView $view) {}

            public function getView(): BookingNotificationView
            {
                return $this->view;
            }

            public function getTimeZone(): string
            {
                return 'America/Winnipeg';
            }

            public function getI18n(): object
            {
                return new class {
                    public function translate($category, $message, $params, $language): string
                    {
                        foreach ($params as $key => $value) {
                            $message = str_replace('{'.$key.'}', $value, $message);
                        }

                        return $message;
                    }
                };
            }
        };
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
    }

    public function testIdenticalSubjectAndBodySourcesStillEscapeBookingInputAndNeverEvaluateItAsTwig(): void
    {
        $variables = BookingNotifications::sampleVariables('requester');
        $variables['booking']['customerName'] = "<script>alert(1)</script> {{ 7 * 7 }}\r\nBcc: injected@example.com";
        $message = BookingNotifications::render(['subject' => '{{ booking.customerName }}', 'body' => '{{ booking.customerName }}'], $variables);
        self::assertStringContainsString('&lt;script&gt;', $message['htmlBody']);
        self::assertStringNotContainsString('<script>', $message['htmlBody']);
        self::assertStringContainsString('{{ 7 * 7 }}', $message['htmlBody']);
        self::assertStringNotContainsString("\n", $message['subject']);
        self::assertSame('cp', $this->view->getTemplateMode());
    }

    public function testDefaultAudienceTemplatesAreDistinctAndIncludeTextAlternatives(): void
    {
        foreach (BookingNotificationSettings::AUDIENCES as $audience) {
            $message = BookingNotifications::render(BookingNotifications::defaults($audience), BookingNotifications::sampleVariables($audience));
            self::assertSame('Example Calendar — Requested', $message['subject']);
            self::assertStringContainsString('Alex Morgan', $message['body']);
            self::assertStringContainsString('09:00', $message['body']);
            self::assertStringContainsString('only after confirmation', $message['body']);
            self::assertSame('admin' === $audience, str_contains($message['htmlBody'], 'View booking'));
            self::assertSame('admin' === $audience, str_contains($message['body'], 'alex@example.com'));
        }
    }

    public function testEveryStatusUsesTheCorrectTimezoneAndConditionalNotice(): void
    {
        $booking = $this->getMockBuilder(Booking::class)->disableOriginalConstructor()->onlyMethods(['getFieldLayout'])->getMock();
        $booking->method('getFieldLayout')->willReturn(new FieldLayout());
        $booking->customerName = 'Alex';
        $booking->startDate = new \DateTimeImmutable('2026-10-13T00:30:00Z');
        $booking->endDate = new \DateTimeImmutable('2026-10-13T01:30:00Z');
        $calendar = new CalendarModel(['name' => 'Clinic', 'type' => 'scheduling', 'scheduling' => ['timezone' => 'America/Winnipeg']]);
        foreach (Booking::statusOptions() as $handle => $label) {
            $booking->bookingStatus = $handle;
            $variables = BookingNotifications::variables($booking, $calendar, 'requester');
            self::assertSame('2026-10-12', $variables['date']);
            self::assertSame('19:30', $variables['startTime']);
            self::assertNull($variables['cpEditUrl']);
            $message = BookingNotifications::render(BookingNotifications::defaults('requester'), $variables);
            self::assertStringContainsString('Status: '.$label, $message['body']);
            self::assertSame(Booking::REQUESTED === $handle, str_contains($message['body'], 'only after confirmation'));
        }
    }

    public function testSyntaxValidationDoesNotExecuteTemplateFunctions(): void
    {
        $calls = 0;
        $this->view->getTwig()->addFunction(new TwigFunction('side_effect', static function () use (&$calls): string {
            ++$calls;

            return 'Rendered';
        }));
        $settings = new BookingNotificationSettings(['templates' => ['admin' => ['subject' => '{{ side_effect() }}', 'body' => '<p>Custom</p>']]]);
        self::assertTrue($settings->validate());
        self::assertSame(0, $calls);
        $settings->templates['requester']['body'] = '{% if status %}';
        self::assertFalse($settings->validate());
        self::assertTrue($settings->hasErrors('templates.requester.body'));
    }

    public function testBlankFieldsUseDefaultsAndMalformedSettingsAreRejected(): void
    {
        $settings = new BookingNotificationSettings(['templates' => ['requester' => ['subject' => ' ', 'body' => '']]]);
        self::assertSame(BookingNotifications::defaults('requester'), $settings->getTemplates()['requester']);
        foreach ([['unknown' => []], ['admin' => 'invalid'], ['admin' => ['body' => []]], ['requester' => ['subject' => str_repeat('x', 1001)]]] as $templates) {
            $settings->templates = $templates;
            self::assertFalse($settings->validate());
            self::assertNotEmpty($settings->getTemplates());
        }
    }

    public function testBadImportedTemplatesFallBackToTheMatchingAudienceDefault(): void
    {
        $booking = $this->getMockBuilder(Booking::class)->disableOriginalConstructor()->onlyMethods(['getFieldLayout'])->getMock();
        $booking->method('getFieldLayout')->willReturn(new FieldLayout());
        $booking->customerName = 'Alex';
        $booking->startDate = new \DateTimeImmutable('2026-10-13T14:00:00Z');
        $booking->endDate = new \DateTimeImmutable('2026-10-13T15:00:00Z');
        $calendar = new CalendarModel(['name' => 'Clinic', 'type' => 'scheduling', 'scheduling' => ['timezone' => 'America/Winnipeg']]);
        $settings = new BookingNotificationSettings(['templates' => ['requester' => ['body' => '{{ removed_variable }}']]]);
        $message = BookingNotifications::renderForBooking($booking, $calendar, 'requester', $settings);
        self::assertSame('Clinic — Requested', $message['subject']);
        self::assertStringContainsString('Your booking', $message['htmlBody']);
    }
}
