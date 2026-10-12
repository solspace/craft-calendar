<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\web\Request;
use craft\web\Response;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\BookingsController;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Twig\Extensions\CalendarGlobalExtension;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;
use Twig\TwigFunction;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;

/** @coversNothing */
class BookingCalendarFilterTest extends TestCase
{
    public function testOccupiedSlotRequestsRequireAManageableCalendarAndCpRequest(): void
    {
        $previousApp = \Craft::$app;
        $previousPlugin = Calendar::getInstance();

        try {
            \Craft::$app = (object) ['loadedModules' => []];
            $calendar = new CalendarModel(['id' => 7, 'type' => CalendarModel::TYPE_SCHEDULING]);
            $service = $this->createMock(BookingsService::class);
            $service->method('getManageableCalendars')->willReturn([7 => $calendar]);
            $service->expects(self::exactly(4))->method('availableSlots')->willReturnCallback(static function ($resource, $date, $public, $except, $duration, $includeBooked) use ($calendar) {
                self::assertSame($calendar, $resource);
                self::assertSame('2026-10-12', $date);
                self::assertFalse($public);
                self::assertNull($except);
                self::assertNull($duration);

                return $includeBooked ? [['start' => '2026-10-12T08:00:00Z', 'end' => '2026-10-12T08:30:00Z', 'label' => '8am - 8:30am', 'available' => false]] : [];
            });
            $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
            $plugin->setComponents(['bookings' => $service]);
            Calendar::setInstance($plugin);
            foreach ([[true, 7, true], [true, 7, '1'], [true, 7, false], [true, 7, 'false'], [true, 9, true], [false, 7, true]] as [$cp, $id, $include]) {
                $request = $this->createMock(Request::class);
                $request->method('getIsCpRequest')->willReturn($cp);
                $request->method('getRequiredQueryParam')->willReturnCallback(static fn ($name) => 'calendarId' === $name ? $id : '2026-10-12');
                $request->method('getQueryParam')->willReturnCallback(static fn ($name, $default = null) => 'includeBooked' === $name ? $include : $default);
                $response = new Response(['charset' => 'UTF-8']);
                \Craft::$app = (object) ['request' => $request, 'response' => $response, 'loadedModules' => []];
                Calendar::setInstance($plugin);
                $controller = $this->getMockBuilder(BookingsController::class)->disableOriginalConstructor()->onlyMethods(['asJson'])->getMock();
                $controller->request = $request;
                $controller->method('asJson')->willReturnCallback(static function ($data) use ($response) {
                    $response->data = $data;

                    return $response;
                });
                if (!$cp || 9 === $id) {
                    try {
                        $controller->actionAvailableSlots();
                        self::fail('Exposed occupied slots outside a manageable CP calendar.');
                    } catch (BadRequestHttpException|ForbiddenHttpException $exception) {
                        self::assertInstanceOf($cp ? ForbiddenHttpException::class : BadRequestHttpException::class, $exception);
                    }
                } else {
                    $result = $controller->actionAvailableSlots();
                    self::assertCount(filter_var($include, \FILTER_VALIDATE_BOOLEAN) ? 1 : 0, $result->data['slots']);
                    self::assertSame('no-store', $response->headers->get('Cache-Control'));
                }
            }
        } finally {
            \Craft::$app = $previousApp;
            Calendar::setInstance($previousPlugin);
        }
    }

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

    public function testRequestWarningRefreshRejectsMalformedAndOversizedIdLists(): void
    {
        $previousApp = \Craft::$app;
        $previousPlugin = Calendar::getInstance();

        try {
            \Craft::$app = (object) ['loadedModules' => []];
            $service = $this->createMock(BookingsService::class);
            $service->method('getManageableCalendars')->willReturn([7 => new CalendarModel(['id' => 7])]);
            $service->expects(self::never())->method('unavailableRequestIds');
            $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
            $plugin->setComponents(['bookings' => $service]);
            Calendar::setInstance($plugin);
            foreach ([[], '7', [0], [-1], ['oops'], [[7]], range(1, 51)] as $ids) {
                $request = $this->createMock(Request::class);
                $request->method('getIsCpRequest')->willReturn(true);
                $request->method('getRequiredQueryParam')->with('bookingIds')->willReturn($ids);
                \Craft::$app = (object) ['request' => $request, 'loadedModules' => []];
                Calendar::setInstance($plugin);
                $controller = $this->getMockBuilder(BookingsController::class)->disableOriginalConstructor()->onlyMethods(['asJson'])->getMock();
                $controller->request = $request;
                $controller->expects(self::never())->method('asJson');

                try {
                    $controller->actionRequestWarnings();
                    self::fail('Accepted an invalid booking ID list.');
                } catch (BadRequestHttpException) {
                    self::assertTrue(true);
                }
            }
        } finally {
            \Craft::$app = $previousApp;
            Calendar::setInstance($previousPlugin);
        }
    }

    public function testListWarningsLinkToTheEditorAndNeverAppearInTrash(): void
    {
        $root = __DIR__.'/../../src/templates/bookings/';
        $twig = new Environment(new ArrayLoader([
            'list' => str_replace(['{% js %}', '{% endjs %}'], ['<script>', '</script>'], file_get_contents($root.'_list.twig')),
            'calendar/bookings/_request-warning' => file_get_contents($root.'_request-warning.twig'),
            '_includes/forms' => '{% macro checkbox(config) %}{% endmacro %}{% macro selectize(config) %}{% endmacro %}',
        ]), ['strict_variables' => true]);
        $twig->addFilter(new TwigFilter('t', static fn ($message) => $message));
        foreach (['date', 'time', 'calendarTimeLabel', 'calendarTimezoneAbbreviation', 'calendarTimezoneName', 'atom'] as $filter) {
            $twig->addFilter(new TwigFilter($filter, static fn ($value) => $value instanceof \DateTimeInterface ? $value->format('Y-m-d H:i') : $value));
        }
        $twig->addFunction(new TwigFunction('cpUrl', static fn ($path, $params = []) => $path.'?'.http_build_query($params)));
        $bookings = [];
        foreach ([1 => 'requested', 2 => 'confirmed', 3 => 'requested'] as $id => $status) {
            $bookings[] = (object) ['id' => $id, 'calendarId' => 7, 'bookingStatus' => $status, 'customerName' => 'Customer '.$id, 'customerEmail' => 'customer@example.test', 'cpEditUrl' => 'calendar/bookings/'.$id, 'startDate' => new \DateTimeImmutable('2026-10-12T14:00:00Z'), 'endDate' => new \DateTimeImmutable('2026-10-12T15:00:00Z'), 'dateCreated' => null, 'dateUpdated' => null];
        }
        foreach ([false, true] as $trashed) {
            $output = $twig->render('list', [
                'bookings' => $bookings, 'calendars' => [7 => ['name' => 'Room', 'color' => '#2563eb', 'schedulingSettings' => ['timezone' => 'America/Winnipeg']]],
                'unavailableRequestIds' => [1 => true], 'statusOptions' => ['requested' => 'Requested', 'confirmed' => 'Confirmed'],
                'trashed' => $trashed, 'sort' => 'date-desc', 'calendarSelection' => '7', 'bookingStatus' => '', 'search' => '', 'bookingListView' => $trashed ? 'trash' : 'active', 'bookingTimeFormat' => 'short', 'page' => 1, 'total' => 3, 'craft' => ['calendar' => ['bookingLabel' => 'Bookings', 'bookingResourceLabels' => (new SettingsModel())->getBookingResourceLabels()]],
            ]);
            $dom = new \DOMDocument();
            @$dom->loadHTML($output);
            $xpath = new \DOMXPath($dom);
            $warnings = $xpath->query('//a[@data-booking-request-warning][not(@hidden)]');
            self::assertSame($trashed ? 0 : 1, $warnings->length);
            self::assertSame($trashed ? 0 : 1, $xpath->query('//tr[contains(@class, "booking-request-unavailable")]')->length);
            if (!$trashed) {
                self::assertSame('1', $xpath->query('//tr[contains(@class, "booking-request-unavailable")]')->item(0)->getAttribute('data-booking-row'));
                self::assertSame(1, $xpath->query('//span[@class="booking-date-heading"]/a[@data-booking-request-warning][not(@hidden)]')->length);
                self::assertSame('calendar/bookings/1', $warnings->item(0)->getAttribute('href'));
                self::assertSame('The requested time is no longer available.', $warnings->item(0)->getAttribute('title'));
                self::assertSame(2, $xpath->query('//a[@data-booking-request-warning][@hidden]')->length);
            }
        }
    }

    public function testCalendarPickerAndListLinksPreserveSelectionsWithEmptyResultsAndTrash(): void
    {
        $root = __DIR__.'/../../src/templates/';
        $templates = [];
        foreach (['index', '_list', '_nav', '_filters-js', '_confirm-delete-js', '_confirm-delete-css', '_calendar-picker', '_calendar-picker-css', '_calendar-picker-js', '_request-warning', '_request-warning-css'] as $name) {
            $templates['calendar/bookings/'.$name] = str_replace(['{% js %}', '{% endjs %}', '{% css %}', '{% endcss %}'], ['{% block scripts %}', '{% endblock %}', '{% block styles %}', '{% endblock %}'], file_get_contents($root.'bookings/'.$name.'.twig'));
        }
        $templates['calendar/layouts/_bookings'] = file_get_contents($root.'layouts/_bookings.twig');
        $templates['calendar/layouts/_layoutWithoutSettings'] = '{% block sidebar %}{% endblock %}{% block toolbar %}{% endblock %}{% block actionButton %}{% endblock %}{% block main %}{% block content %}{% endblock %}{% endblock %}{% block scripts %}{% endblock %}{% block styles %}{% endblock %}';
        $templates['_includes/forms'] = <<<'TWIG'
            {% macro selectize(config) %}<select id="{{ config.id }}" name="{{ config.name }}">{% for key, option in config.options %}<option value="{{ option.value ?? key }}">{{ option.label ?? option }}</option>{% endfor %}</select>{% endmacro %}
            {% macro text(config) %}<input id="{{ config.id }}" type="{{ config.type }}" name="{{ config.name }}" value="{{ config.value }}">{% endmacro %}
            {% macro checkbox(config) %}<input id="{{ config.id }}" type="checkbox"{% if config.checked ?? false %} checked{% endif %}{% for name, value in config.inputAttributes.data %} data-{{ name }}="{{ value }}"{% endfor %}><label for="{{ config.id }}">{{ config.label ?? '' }}</label>{% endmacro %}
            TWIG;
        $twig = new Environment(new ArrayLoader($templates), ['strict_variables' => true]);
        foreach ((new CalendarGlobalExtension())->getFilters() as $filter) {
            $twig->addFilter($filter);
        }
        foreach (['time', 'atom'] as $filter) {
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
                    'craft' => ['calendar' => ['bookingLabel' => 'Bookings', 'bookingResourceLabels' => (new SettingsModel())->getBookingResourceLabels()]], 'currentUser' => ['admin' => false],
                ]);
                $dom = new \DOMDocument();
                @$dom->loadHTML($output);
                $xpath = new \DOMXPath($dom);
                self::assertSame($selection, $xpath->query('//input[@name="calendarIds"]')->item(0)->getAttribute('value'));
                self::assertSame(\count($ids), $xpath->query('//input[@data-calendar-choice][@checked]')->length);
                self::assertSame($label, $xpath->query('//*[@data-calendar-label]')->item(0)->textContent);
                self::assertStringContainsString('No bookings found.', $output);
                self::assertSame('date-desc', $xpath->query('//input[@id="booking-sort"][@type="hidden"]')->item(0)->getAttribute('value'));
                self::assertSame(0, $xpath->query('//select[@name="sort"]')->length);
                self::assertSame(6, $xpath->query('//th[contains(@class, "orderable")]/button[@data-booking-sort]')->length);
                $links = $xpath->query('//a[contains(@class, "page-link")]');
                self::assertSame(2, $links->length);
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
