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
            'calendar/bookings/_nav' => file_get_contents($root.'bookings/_nav.twig'),
            'calendar/layouts/_layoutWithoutSettings' => "{{ view.getIsDeltaRegistrationActive() ? 'delta-active' : 'delta-inactive' }}{% block actionButton %}{% endblock %}{% block content %}{% endblock %}{% block scripts %}{% endblock %}{% block styles %}{% endblock %}",
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
                'calendar' => ['schedulingSettings' => ['timezone' => 'America/Winnipeg', 'increment' => 15]],
                'calendarId' => 7,
                'calendars' => [['id' => 7, 'name' => 'Meeting room']],
                'days' => [['date' => new \DateTimeImmutable('2026-10-12'), 'bookings' => [], 'lanes' => 1]],
                'date' => '2026-10-12',
                'previous' => '2026-10-05',
                'next' => '2026-10-19',
                'currentUser' => ['admin' => false],
            ]);

            self::assertStringContainsString('delta-active', $output);
            self::assertStringContainsString('<option value="'.$scheduleView.'" selected>', $output);
            self::assertStringContainsString('calendarId=7&amp;view='.$scheduleView.'&amp;date=2026-10-05', $output);
            self::assertStringContainsString('calendarId=7&amp;view='.$scheduleView.'&amp;date=2026-10-19', $output);
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
