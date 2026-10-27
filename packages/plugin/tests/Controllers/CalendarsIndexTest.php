<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\config\GeneralConfig;
use craft\web\Request;
use craft\web\Response;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\CalendarsController;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\CalendarsService;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;
use Twig\TwigFunction;

/** @coversNothing */
class CalendarsIndexTest extends TestCase
{
    public function testColumnSortingIsNaturalStableWhitelistedAndPreservedWhenFiltering(): void
    {
        $previousApp = \Craft::$app;
        $previousPlugin = Calendar::getInstance();

        try {
            $request = $this->createMock(Request::class);
            $request->method('getIsConsoleRequest')->willReturn(true);
            $params = [];
            $request->method('getQueryParam')->willReturnCallback(static function ($name, $default = null) use (&$params) {
                return $params[$name] ?? $default;
            });
            \Craft::$app = new class($request) {
                public array $loadedModules = [];
                public string $language = 'en-US';
                public object $view;

                public function __construct(public Request $request)
                {
                    $this->view = new class {
                        public function registerAssetBundle($bundle): void {}
                    };
                }

                public function getRequest(): Request
                {
                    return $this->request;
                }

                public function getIsInitialized(): bool
                {
                    return false;
                }

                public function getI18n(): object
                {
                    return new class {
                        public function translate($category, $message, $params, $language): string
                        {
                            return $message;
                        }
                    };
                }

                public function getConfig(): object
                {
                    return new class {
                        public function getLoadingConfigFile(): ?string
                        {
                            return null;
                        }

                        public function getGeneral(): GeneralConfig
                        {
                            return new GeneralConfig(['baseCpUrl' => 'https://example.test', 'cpTrigger' => 'admin', 'omitScriptNameInUrls' => true]);
                        }
                    };
                }
            };
            $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
            $plugin->name = 'Calendar';
            Calendar::setInstance($plugin);
            $calendars = [
                3 => new CalendarModel(['id' => 3, 'name' => 'Calendar 10', 'handle' => 'zebra', 'description' => null, 'icsHash' => 'shared']),
                1 => new CalendarModel(['id' => 1, 'name' => 'Calendar 2', 'handle' => 'beta', 'description' => 'Alpha', 'type' => CalendarModel::TYPE_SCHEDULING]),
                2 => new CalendarModel(['id' => 2, 'name' => 'alpha', 'handle' => 'alpha', 'description' => 'Zebra']),
                4 => new CalendarModel(['id' => 4, 'name' => 'Calendar 2', 'handle' => 'beta', 'description' => 'Alpha', 'type' => CalendarModel::TYPE_SCHEDULING]),
            ];
            $service = $this->createMock(CalendarsService::class);
            $service->method('getAllCalendars')->willReturn($calendars);
            $controller = $this->getMockBuilder(CalendarsController::class)->disableOriginalConstructor()->onlyMethods(['getCalendarService', 'renderTemplate'])->getMock();
            $controller->method('getCalendarService')->willReturn($service);
            $captured = [];
            $controller->method('renderTemplate')->willReturnCallback(static function ($template, $variables) use (&$captured) {
                self::assertSame('calendar/calendars', $template);
                $captured = $variables;

                return new Response(['charset' => 'UTF-8']);
            });
            foreach ([
                ['name-asc', 'all', [2, 1, 4, 3]], ['name-desc', 'all', [3, 1, 4, 2]],
                ['type-asc', 'all', [2, 3, 1, 4]], ['type-desc', 'all', [1, 4, 2, 3]],
                ['handle-asc', 'all', [2, 1, 4, 3]], ['handle-desc', 'all', [3, 1, 4, 2]],
                ['description-asc', 'all', [3, 1, 4, 2]], ['description-desc', 'all', [2, 1, 4, 3]],
                ['sharing-asc', 'all', [2, 1, 4, 3]], ['sharing-desc', 'all', [3, 2, 1, 4]],
                ['name-desc', 'scheduling', [1, 4]], ['handle-desc', 'events', [3, 2]],
                ['name; DROP TABLE calendars', 'all', [2, 1, 4, 3]], [['name-desc'], 'invalid', [2, 1, 4, 3]],
            ] as [$sort, $type, $expected]) {
                $params = ['sort' => $sort, 'type' => $type];
                $controller->actionCalendarsIndex();
                self::assertSame($expected, array_keys($captured['calendars']));
                self::assertSame(\is_string($sort) && str_contains($sort, ';') === false ? $sort : 'name-asc', $captured['sort']);
                self::assertSame('invalid' === $type ? 'all' : $type, $captured['calendarType']);
                self::assertSame([3, 1, 2, 4], array_keys($service->getAllCalendars()));
            }
        } finally {
            \Craft::$app = $previousApp;
            Calendar::setInstance($previousPlugin);
        }
    }

    public function testCalendarHeadingsUseNativeSortingAndKeepTheToolbarOutsideThePane(): void
    {
        $root = __DIR__.'/../../src/templates/';
        $source = str_replace(['{% js %}', '{% endjs %}', '{% css %}', '{% endcss %}'], ['{% block scripts %}', '{% endblock %}', '{% block styles %}', '{% endblock %}'], file_get_contents($root.'calendars/index.twig'));
        $twig = new Environment(new ArrayLoader([
            'index' => $source,
            'calendar/layouts/_calendarsLayout' => preg_replace('/{% css %}.*?{% endcss %}/s', '', str_replace('{% hook "calendar.prepareCpTemplate" %}', '', file_get_contents($root.'layouts/_calendarsLayout.twig'))),
            '_layouts/cp' => '<header><div id="toolbar">{% block toolbar %}{% endblock %}</div>{% block actionButton %}{% endblock %}</header>{% block main %}{% block content %}{% endblock %}{% endblock %}{% block scripts %}{% endblock %}{% block styles %}{% endblock %}',
            '_includes/forms' => '{% macro selectize(config) %}<select id="{{ config.id }}" name="{{ config.name }}">{% for option in config.options %}<option value="{{ option.value }}">{{ option.label }}</option>{% endfor %}</select>{% endmacro %}',
        ]), ['strict_variables' => true]);
        $twig->addGlobal('view', new class {
            public function registerTranslations(string $category, array $messages): void {}
        });
        $twig->addFilter(new TwigFilter('t', static fn ($message) => $message));
        $twig->addFunction(new TwigFunction('cpUrl', static fn ($path) => $path));
        $twig->addFunction(new TwigFunction('url', static fn ($path) => $path));
        $user = new class {
            public function can($permission): bool
            {
                return true;
            }
        };
        $calendar = new class {
            public int $id = 7;
            public string $name = 'Room';
            public string $handle = 'room';
            public string $color = '#2563eb';
            public string $type = 'events';
            public bool $isScheduling = false;
            public ?string $description = null;
            public ?string $icsHash = null;

            public function typeOptions(): array
            {
                return ['events' => 'Events', 'scheduling' => 'Scheduling'];
            }
        };
        foreach ([true, false] as $pro) {
            foreach (['name-asc', 'type-desc', 'handle-asc', 'description-desc'] as $sort) {
                $output = $twig->render('index', ['craft' => ['calendar' => ['pro' => $pro]], 'currentUser' => $user, 'calendars' => [$calendar], 'calendarType' => 'scheduling', 'sort' => $sort]);
                $dom = new \DOMDocument();
                @$dom->loadHTML($output);
                $xpath = new \DOMXPath($dom);
                self::assertSame($sort, $xpath->query('//form[@id="calendar-index-filters"]/input[@name="sort"]')->item(0)->getAttribute('value'));
                self::assertSame(1, $xpath->query('//*[@id="toolbar"]//form[@id="calendar-index-filters"]')->length);
                self::assertSame(0, $xpath->query('//*[@id="content"]//form')->length);
                self::assertSame(0, $xpath->query('//*[@id="content"][contains(@class, "content-pane")]')->length);
                self::assertSame($pro ? 5 : 4, $xpath->query('//th[contains(@class, "orderable")]/button[@data-calendar-sort]')->length);
                [$field, $direction] = explode('-', $sort);
                $ordered = $xpath->query('//th[contains(@class, "ordered")]')->item(0);
                self::assertSame('asc' === $direction ? 'ascending' : 'descending', $ordered->getAttribute('aria-sort'));
                self::assertSame($field.('asc' === $direction ? '-desc' : '-asc'), $xpath->query('button', $ordered)->item(0)->getAttribute('data-calendar-sort'));
            }
        }
    }
}
