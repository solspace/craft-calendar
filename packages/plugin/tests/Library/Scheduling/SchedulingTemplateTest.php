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
                TWIG,
            'calendar/bookings/_schedule-js' => file_get_contents($root.'bookings/_schedule-js.twig'),
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

        foreach (['day', 'week'] as $scheduleView) {
            $output = $twig->render('schedule', [
                'view' => $view,
                'scheduleView' => $scheduleView,
                'bookingTimeFormat' => 'short',
                'calendar' => ['schedulingSettings' => ['timezone' => 'America/Winnipeg', 'increment' => 15, 'duration' => 30]],
                'calendarId' => 7,
                'calendars' => [['id' => 7, 'name' => 'Meeting room', 'color' => '#2563eb']],
                'days' => [['date' => new \DateTimeImmutable('2026-10-12'), 'bookings' => [], 'lanes' => 1, 'slots' => [480 => [['start' => '2026-10-12T08:00:00-05:00', 'label' => '8am - 8:30am', 'length' => 30]]]]],
                'date' => '2026-10-12',
                'previous' => '2026-10-05',
                'next' => '2026-10-19',
                'currentUser' => ['admin' => false, 'id' => 7],
            ]);

            self::assertStringContainsString('delta-active', $output);
            self::assertStringContainsString('<option value="'.$scheduleView.'" selected>', $output);
            self::assertStringContainsString('calendarId=7&amp;view='.$scheduleView.'&amp;date=2026-10-05', $output);
            self::assertStringContainsString('calendarId=7&amp;view='.$scheduleView.'&amp;date=2026-10-19', $output);
            self::assertStringContainsString('calendar/bookings/new?calendarId=7&amp;start=2026-10-12T08%3A00%3A00-05%3A00', $output);
            self::assertStringContainsString('top:384px;--slot-height:24px;height:12px;', $output);
            self::assertStringContainsString('class="sel" aria-current="page">Schedule', $output);
            self::assertStringNotContainsString('start=2026-10-12T07', $output);
            self::assertStringContainsString('data-booking-history="undo" disabled', $output);
            self::assertStringContainsString('data-booking-history="redo" disabled', $output);
            self::assertStringContainsString('M37 1 1 30l36 29V41', $output);
        }
    }

    public function testBookingSidebarRestrictsFieldConfigurationAndMarksTheCurrentPage(): void
    {
        $twig = new Environment(new ArrayLoader(['nav' => file_get_contents(__DIR__.'/../../../src/templates/bookings/_nav.twig')]), ['strict_variables' => true]);
        $twig->addFilter(new TwigFilter('t', static fn ($message) => $message));
        $twig->addFunction(new TwigFunction('cpUrl', static fn ($path) => $path));
        foreach ([[false, true], [true, false], [true, true]] as [$admin, $allowAdminChanges]) {
            $output = $twig->render('nav', ['bookingView' => 'fields', 'currentUser' => ['admin' => $admin], 'craft' => ['app' => ['config' => ['general' => ['allowAdminChanges' => $allowAdminChanges]]]]]);
            self::assertStringContainsString('<nav', $output);
            self::assertStringContainsString('calendar/bookings/schedule', $output);
            self::assertSame($admin && $allowAdminChanges, str_contains($output, 'class="sel" aria-current="page">Booking Fields'));
            self::assertSame($admin && $allowAdminChanges, str_contains($output, 'calendar/bookings/fields'));
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
            '_includes/forms' => <<<'TWIG'
                {% macro selectField(config) %}<timezone>{{ config.options|json_encode|raw }}</timezone>{% endmacro %}
                {% macro errorList(errors) %}{% endmacro %}
                {% macro editableTableField(config) %}{% endmacro %}
                {% macro textField(config) %}{% endmacro %}
                {% macro lightswitchField(config) %}{% endmacro %}
                TWIG,
        ]), ['strict_variables' => true]);
        $twig->addFilter(new TwigFilter('t', static fn ($message) => $message));

        foreach ([CalendarModel::TYPE_EVENTS, CalendarModel::TYPE_SCHEDULING] as $type) {
            $calendar = new CalendarModel(['id' => 1, 'type' => $type]);
            $output = $twig->render('scheduling', [
                'calendar' => $calendar,
                'scheduling' => $calendar->getSchedulingSettings(),
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
