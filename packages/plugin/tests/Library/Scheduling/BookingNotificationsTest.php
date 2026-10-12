<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\models\FieldLayout;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Scheduling\BookingNotifications;
use Solspace\Calendar\Models\BookingNotificationSettings;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Tests\Unit\Calendar\Support\BookingNotificationView;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;
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
                    public function format($message, $params, $language): string
                    {
                        return strtr($message, array_combine(array_map(static fn ($key) => '{'.$key.'}', array_keys($params)), array_values($params)));
                    }

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

    public function testAudienceSwitchesAndTriggersKeepLegacyDefaultsAndHonorEmptySelections(): void
    {
        $settings = new BookingNotificationSettings();
        foreach (BookingNotificationSettings::AUDIENCES as $audience) {
            self::assertSame(['enabled' => true, 'events' => BookingNotificationSettings::EVENTS], $settings->getSendingSettings($audience));
            foreach (BookingNotificationSettings::EVENTS as $event) {
                self::assertTrue($settings->shouldSend($audience, [$event]));
            }
        }
        $settings->templates = ['admin' => ['enabled' => '0', 'events' => ['created']], 'requester' => ['enabled' => '1', 'events' => ['confirmed', 'cancelled']]];
        self::assertTrue($settings->validate());
        self::assertFalse($settings->shouldSend('admin', ['created']));
        self::assertFalse($settings->shouldSend('requester', ['created', 'changed']));
        self::assertTrue($settings->shouldSend('requester', ['created', 'confirmed']));
        $settings->templates['requester']['events'] = '';
        self::assertTrue($settings->validate());
        self::assertSame([], $settings->templates['requester']['events']);
        self::assertFalse($settings->shouldSend('requester', ['confirmed']));
    }

    public function testMalformedNotificationControlsAreRejectedAndCannotEnableImportedRules(): void
    {
        foreach ([['enabled', 'yes'], ['enabled', []], ['events', 'confirmed'], ['events', null], ['events', ['invalid']], ['events', [['confirmed']]]] as [$field, $value]) {
            $settings = new BookingNotificationSettings(['templates' => ['admin' => [$field => $value]]]);
            self::assertFalse($settings->validate());
            self::assertTrue($settings->hasErrors('templates.admin.'.$field));
            self::assertFalse($settings->shouldSend('admin', ['created', 'confirmed']));
        }
    }

    public function testNotificationEventsDistinguishSubmissionStatusReschedulingAndRestore(): void
    {
        $record = ['calendarId' => 1, 'startDate' => '2026-10-13 09:00:00', 'endDate' => '2026-10-13 10:00:00', 'bookingStatus' => Booking::REQUESTED];
        self::assertSame(['created'], BookingNotifications::events($record, null));
        $confirmed = array_replace($record, ['bookingStatus' => Booking::CONFIRMED]);
        self::assertSame(['created', 'confirmed'], BookingNotifications::events($confirmed, null));
        self::assertSame([], BookingNotifications::events($record, $record));
        self::assertSame(['restored'], BookingNotifications::events($record, $record, true));
        foreach ([Booking::CONFIRMED, Booking::DECLINED, Booking::CANCELLED] as $status) {
            self::assertSame([$status], BookingNotifications::events(array_replace($record, ['bookingStatus' => $status]), $record));
        }
        self::assertSame(['requested'], BookingNotifications::events($record, $confirmed));
        self::assertSame(['changed'], BookingNotifications::events(array_replace($record, ['calendarId' => 2]), $record));
        self::assertSame(['confirmed', 'changed'], BookingNotifications::events(array_replace($confirmed, ['startDate' => '2026-10-13 10:00:00']), $record));
    }

    public function testNotificationPageRetainsIndependentSwitchesAndTriggerSelections(): void
    {
        $source = file_get_contents(__DIR__.'/../../../src/templates/bookings/notifications.twig');
        $source = preg_replace('/\{% do view\.registerTranslations.*?%\}/s', '', $source);
        $source = str_replace(['{% css %}', '{% endcss %}', '{% js %}', '{% endjs %}'], ['{% block styles %}', '{% endblock %}', '{% block scripts %}', '{% endblock %}'], $source);
        $forms = <<<'TWIG'
            {% macro lightswitchField(config) %}<input name="{{ config.name }}" value="{{ config.on ? '1' : '0' }}">{% endmacro %}
            {% macro checkboxGroupField(config) %}<input name="{{ config.name }}" value="">{% for value, label in config.options %}<label><input type="checkbox" name="{{ config.name }}[]" value="{{ value }}"{{ value in config.values ? ' checked' }}>{{ label }}</label>{% endfor %}{% endmacro %}
            {% macro textField(config) %}{% endmacro %}{% macro textareaField(config) %}{% endmacro %}{% macro select(config) %}{% endmacro %}{% macro errorList(config) %}{% endmacro %}
            TWIG;
        $twig = new Environment(new ArrayLoader(['notifications' => $source, '_includes/forms' => $forms, 'calendar/layouts/_bookings' => '{% block content %}{% endblock %}']), ['strict_variables' => true]);
        $twig->addFilter(new TwigFilter('t', static fn ($text) => $text));
        foreach (['csrfInput', 'actionInput'] as $function) {
            $twig->addFunction(new TwigFunction($function, static fn () => ''));
        }
        $settings = new BookingNotificationSettings(['templates' => ['admin' => ['enabled' => false, 'events' => []], 'requester' => ['enabled' => true, 'events' => ['confirmed']]]]);
        $html = $twig->render('notifications', ['notificationSettings' => $settings, 'statusOptions' => Booking::statusOptions(), 'craft' => ['calendar' => ['bookingResourceLabels' => ['singular' => 'Staff Member', 'plural' => 'Staff']]]]);
        $dom = new \DOMDocument();
        @$dom->loadHTML('<meta charset="utf-8">'.$html);
        $xpath = new \DOMXPath($dom);
        self::assertSame('0', $xpath->query('//input[@name="templates[admin][enabled]"]')->item(0)->getAttribute('value'));
        self::assertSame('1', $xpath->query('//input[@name="templates[requester][enabled]"]')->item(0)->getAttribute('value'));
        self::assertSame(0, $xpath->query('//input[@name="templates[admin][events][]"][@checked]')->length);
        self::assertSame(1, $xpath->query('//input[@name="templates[requester][events][]"][@checked][@value="confirmed"]')->length);
        self::assertSame(14, $xpath->query('//input[@type="checkbox"]')->length);
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

    public function testDeliverySettingsAreValidatedNormalizedAndIndependentForEachAudience(): void
    {
        $settings = new BookingNotificationSettings(['templates' => [
            'admin' => ['fromEmail' => ' sender@example.com ', 'fromName' => ' Room bookings ', 'replyTo' => ' replies@example.com ', 'cc' => "First@example.com, second@example.com\nfirst@example.com", 'bcc' => ' private@example.com '],
            'requester' => ['fromName' => 'Customer care'],
        ]]);
        self::assertTrue($settings->validate());
        self::assertSame(['fromEmail' => 'sender@example.com', 'fromName' => 'Room bookings', 'replyTo' => 'replies@example.com', 'cc' => ['First@example.com', 'second@example.com'], 'bcc' => ['private@example.com']], $settings->getDeliverySettings('admin'));
        self::assertSame(['fromEmail' => null, 'fromName' => 'Customer care', 'replyTo' => null, 'cc' => [], 'bcc' => []], $settings->getDeliverySettings('requester'));
        self::assertTrue((new BookingNotificationSettings())->validate());
    }

    public function testDeliverySettingsRejectInvalidAddressesHeaderInjectionAndTwig(): void
    {
        foreach ([
            ['fromEmail', 'invalid'], ['replyTo', 'Name <sender@example.com>'],
            ['fromEmail', "sender@example.com\r\nBcc: evil@example.com"],
            ['fromName', "Name\nBcc: evil@example.com"], ['fromName', "Name\0"],
            ['cc', 'valid@example.com, 0'], ['bcc', 'valid@example.com, invalid'],
            ['fromEmail', '{{ booking.customerEmail }}'], ['bcc', ['invalid']],
            ['fromName', str_repeat('x', 256)], ['cc', str_repeat('x', 10001)],
            ['bcc', implode(',', array_map(static fn ($i) => 'person'.$i.'@example.com', range(1, 101)))],
        ] as [$field, $value]) {
            $settings = new BookingNotificationSettings(['templates' => ['admin' => [$field => $value]]]);
            self::assertFalse($settings->validate(), $field);
            self::assertTrue($settings->hasErrors('templates.admin.'.$field));
            self::assertSame(\in_array($field, ['cc', 'bcc'], true) ? [] : null, $settings->getDeliverySettings('admin')[$field]);
        }
        $settings = new BookingNotificationSettings(['templates' => ['admin' => ['fromName' => '{{ calendar.name }}']]]);
        self::assertTrue($settings->validate());
        self::assertSame('{{ calendar.name }}', $settings->getDeliverySettings('admin')['fromName']);
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
