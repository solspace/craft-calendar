<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\web\Request;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\BookingsController;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\BookingsService;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;
use Twig\TwigFunction;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;

/** @coversNothing */
class BookingCalendarFilterTest extends TestCase
{
    public function testListRejectsMalformedAndUnauthorizedCalendarSelectionsBeforeQueryingBookings(): void
    {
        $previousApp = \Craft::$app;
        $previousPlugin = Calendar::getInstance();

        try {
            \Craft::$app = (object) ['loadedModules' => []];
            $service = $this->createMock(BookingsService::class);
            $service->method('getManageableCalendars')->willReturn([7 => new CalendarModel(['id' => 7]), 8 => new CalendarModel(['id' => 8])]);
            $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
            $plugin->setComponents(['bookings' => $service]);
            Calendar::setInstance($plugin);
            foreach ([['7,9', ForbiddenHttpException::class], ['9', ForbiddenHttpException::class], [[], BadRequestHttpException::class], ['', BadRequestHttpException::class], ['7,', BadRequestHttpException::class], ['0', BadRequestHttpException::class]] as [$selection, $exceptionClass]) {
                $request = $this->createMock(Request::class);
                $request->method('getIsCpRequest')->willReturn(true);
                $request->method('getQueryParam')->willReturnCallback(static fn ($name, $default = null) => 'calendarIds' === $name ? $selection : $default);
                \Craft::$app = (object) ['request' => $request, 'loadedModules' => []];
                Calendar::setInstance($plugin);
                $controller = $this->getMockBuilder(BookingsController::class)->disableOriginalConstructor()->onlyMethods(['renderTemplate'])->getMock();
                $controller->request = $request;
                $controller->expects(self::never())->method('renderTemplate');

                try {
                    $controller->actionIndex();
                    self::fail('Accepted an invalid calendar selection.');
                } catch (BadRequestHttpException|ForbiddenHttpException $exception) {
                    self::assertInstanceOf($exceptionClass, $exception);
                }
            }
        } finally {
            \Craft::$app = $previousApp;
            Calendar::setInstance($previousPlugin);
        }
    }

    public function testCalendarPickerAndListLinksPreserveSelectionsWithEmptyResultsAndTrash(): void
    {
        $root = __DIR__.'/../../src/templates/';
        $templates = [];
        foreach (['index', '_list', '_nav', '_filters-js', '_confirm-delete-js', '_confirm-delete-css', '_calendar-picker', '_calendar-picker-css', '_calendar-picker-js'] as $name) {
            $templates['calendar/bookings/'.$name] = str_replace(['{% js %}', '{% endjs %}', '{% css %}', '{% endcss %}'], ['{% block scripts %}', '{% endblock %}', '{% block styles %}', '{% endblock %}'], file_get_contents($root.'bookings/'.$name.'.twig'));
        }
        $templates['calendar/layouts/_bookings'] = file_get_contents($root.'layouts/_bookings.twig');
        $templates['calendar/layouts/_layoutWithoutSettings'] = '{% block sidebar %}{% endblock %}{% block actionButton %}{% endblock %}{% block content %}{% endblock %}{% block scripts %}{% endblock %}{% block styles %}{% endblock %}';
        $templates['_includes/forms'] = <<<'TWIG'
            {% macro selectize(config) %}<select id="{{ config.id }}" name="{{ config.name }}">{% for key, option in config.options %}<option value="{{ option.value ?? key }}">{{ option.label ?? option }}</option>{% endfor %}</select>{% endmacro %}
            {% macro text(config) %}<input id="{{ config.id }}" type="{{ config.type }}" name="{{ config.name }}" value="{{ config.value }}">{% endmacro %}
            {% macro checkbox(config) %}<input id="{{ config.id }}" type="checkbox"{% if config.checked ?? false %} checked{% endif %}{% for name, value in config.inputAttributes.data %} data-{{ name }}="{{ value }}"{% endfor %}><label for="{{ config.id }}">{{ config.label ?? '' }}</label>{% endmacro %}
            TWIG;
        $twig = new Environment(new ArrayLoader($templates), ['strict_variables' => true]);
        foreach (['time', 'calendarTimeLabel', 'atom'] as $filter) {
            $twig->addFilter(new TwigFilter($filter, static fn ($value) => $value));
        }
        $twig->addFilter(new TwigFilter('t', static function ($message, $category, $params = []) {
            foreach ($params as $key => $value) {
                $message = str_replace('{'.$key.'}', $value, $message);
            }

            return $message;
        }));
        $twig->addFunction(new TwigFunction('cpUrl', static fn ($path, $params = []) => $path.'?'.http_build_query($params)));
        $calendars = [7 => ['id' => 7, 'name' => 'Meeting room', 'color' => '#2563eb'], 8 => ['id' => 8, 'name' => 'Studio', 'color' => '#008a5b'], 9 => ['id' => 9, 'name' => 'Office', 'color' => '#ad2255']];
        foreach ([['all', [7, 8, 9], 'All Calendars'], ['7,9', [7, 9], '2 Calendars'], ['8', [8], 'Studio']] as [$selection, $ids, $label]) {
            foreach (['active', 'trash'] as $view) {
                $output = $twig->render('calendar/bookings/index', [
                    'calendars' => $calendars, 'calendarSelection' => $selection, 'calendarIds' => $ids,
                    'bookings' => [], 'total' => 151, 'page' => 2, 'trashed' => 'trash' === $view, 'bookingListView' => $view,
                    'statusOptions' => ['requested' => 'Requested'], 'bookingStatus' => '', 'search' => '',
                    'sort' => 'date-desc', 'sortOptions' => ['date-desc' => 'Newest first'],
                    'craft' => ['calendar' => ['bookingLabel' => 'Bookings']], 'currentUser' => ['admin' => false],
                ]);
                $dom = new \DOMDocument();
                @$dom->loadHTML($output);
                $xpath = new \DOMXPath($dom);
                self::assertSame($selection, $xpath->query('//input[@name="calendarIds"]')->item(0)->getAttribute('value'));
                self::assertSame(\count($ids), $xpath->query('//input[@data-calendar-choice][@checked]')->length);
                self::assertSame($label, $xpath->query('//*[@data-calendar-label]')->item(0)->textContent);
                self::assertStringContainsString('No bookings found.', $output);
                $links = $xpath->query('//a[@data-booking-sort] | //a[contains(@class, "page-link")]');
                self::assertSame(8, $links->length);
                foreach ($links as $link) {
                    parse_str(parse_url($link->getAttribute('href'), \PHP_URL_QUERY), $params);
                    self::assertSame($selection, $params['calendarIds']);
                    self::assertSame($view, $params['view']);
                    self::assertArrayNotHasKey('calendarId', $params);
                }
                $clear = $xpath->query('//a[@data-booking-filter-clear]')->item(0);
                self::assertSame('all' === $selection, str_contains($clear->getAttribute('class'), 'hidden'));
            }
        }
    }
}
