<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Twig\Extensions\CalendarGlobalExtension;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;
use Twig\TwigFunction;

/** @coversNothing */
class RequestQueueTemplateTest extends TestCase
{
    public function testQueueOffersConfirmOnlyForAvailableTimesAndPreservesModerationSnapshots(): void
    {
        $twig = $this->environment();
        $output = $twig->render('calendar/bookings/requests', $this->variables());
        $dom = new \DOMDocument();
        @$dom->loadHTML($output);
        $xpath = new \DOMXPath($dom);
        self::assertSame(1, $xpath->query('//tr[@data-request-id="1"]//button[@data-request-status="confirmed"]')->length);
        self::assertSame(0, $xpath->query('//tr[@data-request-id="2"]//button[@data-request-status="confirmed"]')->length);
        self::assertSame(2, $xpath->query('//button[@data-request-status="declined"]')->length);
        self::assertSame('2026-10-12T14:00:00+00:00', $xpath->query('//tr[@data-request-id="1"]')->item(0)->getAttribute('data-original-start'));
        self::assertSame(1, $xpath->query('//th[@aria-sort="ascending"]')->length);
        self::assertSame('calendar/bookings/requests', $xpath->query('//nav/ul/li[1]/a')->item(0)->getAttribute('href'));
        self::assertSame('sel', $xpath->query('//nav/ul/li[1]/a')->item(0)->getAttribute('class'));
        self::assertStringContainsString('Needs attention', $output);
        self::assertStringNotContainsString('<script>alert', $output);
        self::assertStringContainsString('&lt;script&gt;', $output);
        self::assertSame(1, $xpath->query('//span[@data-booking-request-count][not(@hidden)]')->length);
    }

    public function testReviewRendersNotesAndEveryStaticFieldTab(): void
    {
        $twig = $this->environment();
        $variables = $this->variables();
        $booking = $variables['bookings'][0];
        $booking->notes = '<script>alert(1)</script>';
        $booking->fieldLayout = new class {
            public function createForm($element, bool $static): object
            {
                self::assertStatic($static);

                return (object) ['tabs' => [(object) ['name' => 'First', 'content' => '<div>First field value</div>'], (object) ['name' => 'Second', 'content' => '<div>Second field value</div>']]];
            }

            private static function assertStatic(bool $value): void
            {
                TestCase::assertTrue($value);
            }
        };
        foreach ([false, true] as $unavailable) {
            $output = $twig->render('calendar/bookings/_request-review', $variables + ['booking' => $booking, 'unavailable' => $unavailable, 'containerId' => 'cp-screen-demo']);
            self::assertStringContainsString('First field value', $output);
            self::assertStringContainsString('Second field value', $output);
            self::assertStringContainsString('&lt;script&gt;alert(1)&lt;/script&gt;', $output);
            self::assertSame($unavailable, str_contains($output, 'Choose another available time or decline this request.'));
            self::assertStringContainsString('name="originalEndDate" value="2026-10-12T14:30:00+00:00"', $output);
            self::assertStringContainsString('document.getElementById("cp-screen-demo")', $output);
            $dom = new \DOMDocument();
            @$dom->loadHTML($output);
            $xpath = new \DOMXPath($dom);
            self::assertSame(3, $xpath->query('//dl[@class="request-summary"]/div')->length);
            self::assertSame('<script>Customer</script>', $xpath->query('//*[@class="request-review-customer"]/h2')->item(0)->textContent);
            self::assertSame(1, $xpath->query('//section[contains(@class, "request-review-notes")]')->length);
            self::assertSame(2, $xpath->query('//section[contains(@class, "request-review-fields")]//div[@class="flex-fields"]')->length);
            $alternative = $xpath->query('//button[@data-request-alternative]')->item(0);
            self::assertSame('cp-screen-demo-time-picker', $alternative->getAttribute('aria-controls'));
            self::assertSame($unavailable ? 'true' : 'false', $alternative->getAttribute('aria-expanded'));
            self::assertSame($unavailable ? '' : 'hidden', $xpath->query('//*[@data-request-time-picker]')->item(0)->getAttribute('class'));
        }
    }

    public function testEmptyQueueHasNoModerationControlsAndHidesZeroCount(): void
    {
        $variables = $this->variables();
        $variables['bookings'] = [];
        $variables['total'] = $variables['bookingRequestCount'] = 0;
        $output = $this->environment()->render('calendar/bookings/requests', $variables);
        self::assertStringContainsString('No booking requests found.', $output);
        self::assertStringNotContainsString('data-request-status="confirmed"', $output);
        self::assertStringContainsString('data-booking-request-count hidden', $output);
    }

    public function environment(): Environment
    {
        $root = __DIR__.'/../../../src/templates/';
        $templates = [];
        foreach (['requests', '_requests-list', '_requests-js', '_requests-css', '_request-review', '_calendar-picker', '_calendar-picker-js', '_calendar-picker-css', '_nav'] as $name) {
            $templates['calendar/bookings/'.$name] = str_replace(['{% js %}', '{% endjs %}', '{% css %}', '{% endcss %}'], ['{% block scripts %}', '{% endblock %}', '{% block styles %}', '{% endblock %}'], file_get_contents($root.'bookings/'.$name.'.twig'));
        }
        $templates['calendar/layouts/_bookings'] = file_get_contents($root.'layouts/_bookings.twig');
        $templates['calendar/layouts/_layoutWithoutSettings'] = '<aside>{% block sidebar %}{% endblock %}</aside>{% block toolbar %}{% endblock %}{% block main %}{% endblock %}<script>{% block scripts %}{% endblock %}</script><style>{% block styles %}{% endblock %}</style>';
        $templates['_includes/forms'] = <<<'TWIG'
            {% macro selectize(config) %}<select id="{{ config.id }}" name="{{ config.name }}">{% for option in config.options %}<option value="{{ option.value }}"{{ option.value == config.value ? ' selected' }}>{{ option.label }}</option>{% endfor %}</select>{% endmacro %}
            {% macro text(config) %}<input type="{{ config.type }}" name="{{ config.name }}" value="{{ config.value }}">{% endmacro %}
            {% macro textField(config) %}<label>{{ config.label }}<input type="{{ config.type }}" value="{{ config.value }}" data-request-date></label>{% endmacro %}
            {% macro checkbox(config) %}<input id="{{ config.id }}" type="checkbox"{{ config.checked ? ' checked' }}{% for name, value in config.inputAttributes.data %} data-{{ name }}="{{ value }}"{% endfor %}><label for="{{ config.id }}">{{ config.label }}</label>{% endmacro %}
            TWIG;
        $twig = new Environment(new ArrayLoader($templates), ['strict_variables' => true]);
        foreach ((new CalendarGlobalExtension())->getFilters() as $filter) {
            $twig->addFilter($filter);
        }
        $twig->addFilter(new TwigFilter('atom', static fn ($date) => $date->format('c')));
        $twig->addFilter(new TwigFilter('t', static fn ($text) => $text));
        $twig->addFilter(new TwigFilter('date', static fn ($date, $format = 'Y-m-d', $timezone = 'UTC') => (new \DateTimeImmutable($date instanceof \DateTimeInterface ? $date->format('c') : $date))->setTimezone(new \DateTimeZone($timezone))->format($format === 'medium' ? 'Y-m-d' : $format)));
        $twig->addFilter(new TwigFilter('time', static fn ($date, $format = '', $timezone = 'UTC') => $date->setTimezone(new \DateTimeZone($timezone))->format('g:i a')));
        $twig->addFunction(new TwigFunction('cpUrl', static fn ($path, $params = []) => $path.($params ? '?'.http_build_query($params) : '')));

        return $twig;
    }

    public function variables(): array
    {
        $bookings = [];
        foreach ([1, 2] as $id) {
            $bookings[] = (object) ['id' => $id, 'calendarId' => 7, 'customerName' => '<script>Customer</script>', 'customerEmail' => 'customer@example.test', 'startDate' => new \DateTimeImmutable('2026-10-12T14:00:00Z'), 'endDate' => new \DateTimeImmutable('2026-10-12T14:30:00Z'), 'dateCreated' => new \DateTimeImmutable('2026-10-11T01:00:00Z'), 'notes' => '', 'fieldLayout' => null, 'cpEditUrl' => 'calendar/bookings/'.$id];
        }

        return ['bookings' => $bookings, 'calendars' => [7 => ['id' => 7, 'name' => 'Studio', 'color' => '#2563eb', 'schedulingSettings' => ['timezone' => 'America/Winnipeg']]], 'calendarIds' => [7], 'calendarSelection' => 'all', 'availability' => 'all', 'search' => '', 'sort' => 'submitted-asc', 'page' => 1, 'total' => 2, 'bookingRequestCount' => 2, 'unavailableRequestIds' => [2 => true], 'bookingTimeFormat' => 'short', 'currentUser' => ['admin' => false], 'craft' => ['calendar' => ['bookingLabel' => 'Bookings'], 'app' => ['config' => ['general' => ['allowAdminChanges' => false]]]]];
    }
}
