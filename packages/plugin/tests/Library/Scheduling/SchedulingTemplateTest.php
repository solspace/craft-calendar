<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Twig\Extensions\CalendarGlobalExtension;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;
use Twig\TwigFunction;

/** @coversNothing */
class SchedulingTemplateTest extends TestCase
{
    public function testCalendarTypePickerLocksBothTypesAndKeepsTheSavedTypeInTheForm(): void
    {
        $twig = new Environment(new ArrayLoader([
            'picker' => file_get_contents(__DIR__.'/../../../src/templates/calendars/_type-picker.twig'),
            '_includes/forms' => '{% macro errorList(errors) %}{% endmacro %}',
        ]), ['strict_variables' => true]);
        $twig->addFilter(new TwigFilter('t', static fn ($message) => $message));

        foreach ([CalendarModel::TYPE_EVENTS, CalendarModel::TYPE_SCHEDULING] as $type) {
            foreach ([[null, false], [1, false], [1, true]] as [$id, $locked]) {
                $calendar = new CalendarModel(['id' => $id, 'type' => $type]);
                $output = $twig->render('picker', ['calendar' => $calendar, 'calendarTypeLocked' => $locked]);
                $dom = new \DOMDocument();
                @$dom->loadHTML($output);
                $xpath = new \DOMXPath($dom);
                self::assertSame($locked ? 2 : 0, $xpath->query('//input[@type="radio"][@disabled]')->length);
                self::assertSame($type, $xpath->query('//input[@type="radio"][@checked]')->item(0)->getAttribute('value'));
                $hidden = $xpath->query('//input[@type="hidden"][@name="type"]');
                self::assertSame($locked ? 1 : 0, $hidden->length);
                if ($locked) {
                    self::assertSame($type, $hidden->item(0)->getAttribute('value'));
                    self::assertStringContainsString('including items in Trash', $output);
                } elseif ($id) {
                    self::assertStringContainsString('while this calendar is empty', $output);
                }
            }
        }
    }

    public function testDayAndWeekSchedulesPreserveTheControlPanelViewObject(): void
    {
        $root = __DIR__.'/../../../src/templates/';
        $source = str_replace(
            ['{% js %}', '{% endjs %}', '{% css %}', '{% endcss %}'],
            ['{% block scripts %}', '{% endblock %}', '{% block styles %}', '{% endblock %}'],
            file_get_contents($root.'bookings/schedule.twig'),
        );
        $twig = new Environment(new ArrayLoader([
            'schedule' => $source,
            '_includes/forms' => <<<'TWIG'
                {% macro selectize(config) %}<select id="{{ config.id }}">{% for option in config.options %}<option value="{{ option.value }}"{% if option.value == config.value %} selected{% endif %}>{{ option.label }}</option>{% endfor %}</select>{% endmacro %}
                {% macro text(config) %}<input type="{{ config.type }}" value="{{ config.value }}">{% endmacro %}
                {% macro checkbox(config) %}<input id="{{ config.id }}" type="checkbox"{% if config.checked %} checked{% endif %}{% for name, value in config.inputAttributes.data %} data-{{ name }}="{{ value }}"{% endfor %}><label for="{{ config.id }}">{{ config.label }}</label>{% endmacro %}
                TWIG,
            'calendar/bookings/_schedule-js' => file_get_contents($root.'bookings/_schedule-js.twig'),
            'calendar/bookings/_calendar-picker' => file_get_contents($root.'bookings/_calendar-picker.twig'),
            'calendar/bookings/_calendar-picker-js' => file_get_contents($root.'bookings/_calendar-picker-js.twig'),
            'calendar/bookings/_calendar-picker-css' => file_get_contents($root.'bookings/_calendar-picker-css.twig'),
            'calendar/bookings/_nav' => file_get_contents($root.'bookings/_nav.twig'),
            'calendar/layouts/_bookings' => file_get_contents($root.'layouts/_bookings.twig'),
            'calendar/layouts/_layoutWithoutSettings' => "{{ view.getIsDeltaRegistrationActive() ? 'delta-active' : 'delta-inactive' }}{% block sidebar %}{% endblock %}{% block actionButton %}{% endblock %}{% block content %}{% endblock %}{% block scripts %}{% endblock %}{% block styles %}{% endblock %}",
        ]), ['strict_variables' => true]);
        foreach ((new CalendarGlobalExtension())->getFilters() as $filter) {
            $twig->addFilter($filter);
        }
        $twig->addFilter(new TwigFilter('t', static fn ($message) => $message));
        $twig->addFilter(new TwigFilter('time', static fn ($date) => (new \DateTimeImmutable($date))->format('H:i')));
        $twig->addFunction(new TwigFunction('cpUrl', static fn ($path, $params = []) => $path.'?'.http_build_query($params)));
        $view = new class {
            public function getIsDeltaRegistrationActive(): bool
            {
                return true;
            }
        };

        $twig->addGlobal('craft', ['calendar' => ['bookingLabel' => 'Bookings']]);
        foreach (['day', 'week'] as $scheduleView) {
            foreach ([[7], [7, 8]] as $calendarIds) {
                $calendarSelection = \count($calendarIds) === 2 ? 'all' : '7';
                $calendars = [7 => ['id' => 7, 'name' => 'Meeting room', 'color' => '#2563eb', 'schedulingSettings' => ['timezone' => 'America/Winnipeg', 'increment' => 15, 'duration' => 30]], 8 => ['id' => 8, 'name' => 'Studio', 'color' => '#008a5b', 'schedulingSettings' => ['timezone' => 'Asia/Tokyo', 'increment' => 30, 'duration' => 30]]];
                $columns = array_map(static fn ($id) => ['calendar' => $calendars[$id], 'bookings' => [], 'lanes' => 1, 'slots' => [480 => [['start' => '2026-10-12T08:00:00-05:00', 'label' => '8am - 8:30am', 'length' => 30]]]], $calendarIds);
                $output = $twig->render('schedule', [
                    'view' => $view,
                    'scheduleView' => $scheduleView,
                    'bookingTimeFormat' => 'short',
                    'calendar' => $calendars[7],
                    'calendarId' => 7,
                    'calendarIds' => $calendarIds,
                    'calendarSelection' => $calendarSelection,
                    'displayTimezone' => 'America/Winnipeg',
                    'calendars' => $calendars,
                    'days' => [['date' => new \DateTimeImmutable('2026-10-12T00:00:00-05:00'), 'columns' => $columns]],
                    'date' => '2026-10-12',
                    'previous' => '2026-10-05',
                    'next' => '2026-10-19',
                    'currentUser' => ['admin' => false, 'id' => 7],
                    'craft' => ['calendar' => ['bookingLabel' => 'Bookings']],
                ]);

                self::assertStringContainsString('delta-active', $output);
                self::assertStringContainsString('<option value="'.$scheduleView.'" selected>', $output);
                self::assertStringContainsString('calendarIds='.$calendarSelection.'&amp;view='.$scheduleView.'&amp;date=2026-10-05', $output);
                self::assertStringContainsString('calendarIds='.$calendarSelection.'&amp;view='.$scheduleView.'&amp;date=2026-10-19', $output);
                self::assertStringContainsString('calendar/bookings/new?calendarId=7&amp;start=2026-10-12T08%3A00%3A00-05%3A00', $output);
                self::assertStringContainsString('top:384px;--slot-height:24px;height:12px;', $output);
                self::assertStringContainsString('class="sel" aria-current="page">Schedule', $output);
                self::assertStringNotContainsString('start=2026-10-12T07', $output);
                self::assertStringContainsString('data-booking-history="undo" disabled', $output);
                self::assertStringContainsString('data-booking-history="redo" disabled', $output);
                self::assertStringContainsString('M37 1 1 30l36 29V41', $output);
                $dom = new \DOMDocument();
                @$dom->loadHTML($output);
                $xpath = new \DOMXPath($dom);
                self::assertSame(\count($calendarIds), $xpath->query('//*[@class="booking-day-body"]')->length);
                self::assertSame(\count($calendarIds), $xpath->query('//input[@data-calendar-choice][@checked]')->length);
                self::assertSame('2026-10-12', $xpath->query('//*[@class="booking-day-body"]')->item(0)->getAttribute('data-date'));
                if (\count($calendarIds) > 1) {
                    self::assertStringContainsString('calendar/bookings/new?calendarId=8&amp;start=', $output);
                    self::assertStringContainsString('booking-grid-multiple', $output);
                    self::assertSame(2, $xpath->query('//*[@class="booking-resource-heading"]')->length);
                }
            }
        }
    }

    public function testBookingSidebarRestrictsFieldConfigurationAndMarksTheCurrentPage(): void
    {
        $twig = new Environment(new ArrayLoader(['nav' => file_get_contents(__DIR__.'/../../../src/templates/bookings/_nav.twig')]), ['strict_variables' => true]);
        $twig->addFilter(new TwigFilter('t', static fn ($message) => $message));
        $twig->addFunction(new TwigFunction('cpUrl', static fn ($path) => $path));
        foreach ([[false, true], [true, false], [true, true]] as [$admin, $allowAdminChanges]) {
            $output = $twig->render('nav', ['bookingView' => 'fields', 'currentUser' => ['admin' => $admin], 'craft' => ['calendar' => ['bookingLabel' => 'Appointments'], 'app' => ['config' => ['general' => ['allowAdminChanges' => $allowAdminChanges]]]]]);
            self::assertStringContainsString('<nav', $output);
            self::assertStringContainsString('calendar/bookings/schedule', $output);
            self::assertSame($admin && $allowAdminChanges, str_contains($output, 'class="sel" aria-current="page">Booking Fields'));
            self::assertSame($admin && $allowAdminChanges, str_contains($output, 'calendar/bookings/fields'));
            self::assertSame($admin && $allowAdminChanges, str_contains($output, 'calendar/bookings/notifications'));
            self::assertStringContainsString('Appointments', $output);
        }
    }

    public function testTimezoneOptionsRenderForExistingEventAndSchedulingCalendars(): void
    {
        $app = \Craft::$app;

        try {
            \Craft::$app = null;
            $options = DateHelper::getTimezoneOptions();
        } finally {
            \Craft::$app = $app;
        }

        $source = file_get_contents(__DIR__.'/../../../src/templates/calendars/_scheduling.twig');
        $twig = new Environment(new ArrayLoader([
            'scheduling' => $source,
            'calendar/calendars/_weekly-hours' => file_get_contents(__DIR__.'/../../../src/templates/calendars/_weekly-hours.twig'),
            'calendar/calendars/_booking-rules' => file_get_contents(__DIR__.'/../../../src/templates/calendars/_booking-rules.twig'),
            '_includes/forms' => <<<'TWIG'
                {% macro selectField(config) %}<timezone>{{ config.options|json_encode|raw }}</timezone>{% endmacro %}
                {% macro errorList(errors) %}{% endmacro %}
                {% macro editableTableField(config) %}{% endmacro %}
                {% macro textField(config) %}{% endmacro %}
                {% macro lightswitchField(config) %}{% endmacro %}
                {% macro dateField(config) %}{% endmacro %}
                TWIG,
        ]), ['strict_variables' => true]);
        $twig->addFilter(new TwigFilter('t', static fn ($message) => $message));

        foreach ([CalendarModel::TYPE_EVENTS, CalendarModel::TYPE_SCHEDULING] as $type) {
            $calendar = new CalendarModel(['id' => 1, 'type' => $type]);
            $output = $twig->render('scheduling', [
                'calendar' => $calendar,
                'scheduling' => $calendar->getSchedulingSettings(),
                'schedulingDates' => ['availableFrom' => null, 'availableUntil' => null],
                'schedulingHours' => [],
                'schedulingExceptions' => [],
                'timezoneOptions' => $options,
                'craft' => ['app' => ['timeZone' => 'America/Winnipeg']],
            ]);

            self::assertSame(1, preg_match('/<timezone>(.*?)<\/timezone>/s', $output, $matches));
            $rendered = json_decode($matches[1], true, 512, \JSON_THROW_ON_ERROR);
            $expected = $options;
            unset($expected[DateHelper::FLOATING_TIMEZONE]);
            self::assertSame($expected, $rendered);
            self::assertContains('America/Winnipeg', array_column($rendered, 'value'));
        }
    }
}
