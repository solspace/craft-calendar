<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Models\CalendarModel;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;

/** @coversNothing */
class SchedulingTemplateTest extends TestCase
{
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
