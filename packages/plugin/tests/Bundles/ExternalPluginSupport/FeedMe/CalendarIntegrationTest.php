<?php

namespace Solspace\Tests\Unit\Calendar\Bundles\ExternalPluginSupport\FeedMe;

use Carbon\Carbon;
use craft\behaviors\CustomFieldBehavior;
use craft\feedme\base\Element;
use craft\feedme\events\FeedProcessEvent;
use craft\feedme\Plugin;
use craft\feedme\services\Service;
use craft\web\User;
use PHPUnit\Framework\TestCase;
use RRule\RfcParser;
use Solspace\Calendar\Bundles\ExternalPluginSupport\FeedMe\CalendarIntegration;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\RecurrenceHelper;
use Solspace\Calendar\Services\SettingsService;
use yii\base\Component;

/**
 * Requires the optional craftcms/feed-me dependency (5.x on Craft 4, 6.x on Craft 5).
 *
 * @internal
 *
 * @coversNothing
 */
class CalendarIntegrationTest extends TestCase
{
    private $previousApp;

    private ?Plugin $previousPlugin = null;

    protected function setUp(): void
    {
        if (!class_exists(Element::class)) {
            $this->markTestSkipped('Install craftcms/feed-me to run the Feed Me integration tests.');
        }

        if (!class_exists(\Yii::class)) {
            require \dirname((new \ReflectionClass(Component::class))->getFileName()).'/../Yii.php';
        }

        if (!class_exists(\Craft::class)) {
            require \dirname((new \ReflectionClass(\craft\base\Component::class))->getFileName()).'/../Craft.php';
        }

        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Plugin::$plugin ?? null;

        // Event::create() only needs default settings and the current user's ID.
        \Craft::$app = new class extends Component {
            public array $loadedModules = [];

            public $user;

            public function getIsInstalled(): bool
            {
                return false;
            }

            public function getTimeZone(): string
            {
                return 'America/Winnipeg';
            }
        };
        \Craft::$app->user = $this->getMockBuilder(User::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getId'])
            ->getMock()
        ;

        // Craft normally generates this class from its template during bootstrap.
        if (!class_exists(CustomFieldBehavior::class, false)) {
            $elementPath = \dirname((new \ReflectionClass(\craft\base\Element::class))->getFileName());

            require $elementPath.'/../behaviors/CustomFieldBehavior.php.template';
        }

        $settings = $this->createMock(SettingsService::class);
        $settings->method('isAllDayDefault')->willReturn(false);
        $settings->method('getEventDuration')->willReturn(60);
        $calendar = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $calendar->set('settings', $settings);
        \Craft::$app->loadedModules[Calendar::class] = $calendar;

        $service = $this->createMock(Service::class);
        $service->method('getConfig')->willReturnCallback(static fn ($key) => 'dataDelimiter' === $key ? '|' : null);
        Plugin::$plugin = (new \ReflectionClass(Plugin::class))->newInstanceWithoutConstructor();
        Plugin::$plugin->set('service', $service);
    }

    protected function tearDown(): void
    {
        if (class_exists(Element::class)) {
            \Craft::$app = $this->previousApp;
            if ($this->previousPlugin) {
                Plugin::$plugin = $this->previousPlugin;
            }
        }
    }

    public function testSelectDatesAreSetBeforeAnEmptyRruleReturns(): void
    {
        $integration = $this->makeIntegration();
        $element = $this->makeEvent(RecurrenceHelper::SELECT_DATES);
        $integration->parseAttribute(['dates/0' => '2026-03-31', 'dates/1' => '2026-04-07'], 'selectDates', ['node' => 'dates']);
        $integration->parseAttribute(['rule' => null], 'rrule', ['node' => 'rule']);

        $event = $this->beforeSave($integration, $element);

        self::assertSame(['2026-03-31', '2026-04-07'], $element->getSelectDatesAsString());
        self::assertSame(['2026-03-31', '2026-04-07'], $event->contentData['selectDates']);
        self::assertNull($element->rrule);
        self::assertSame(0, $element->getSelectDatesAsDates()[0]->getOffset());
    }

    public function testSelectDatesUseTheMappedDateFormat(): void
    {
        $integration = $this->makeIntegration();
        $element = $this->makeEvent(RecurrenceHelper::SELECT_DATES);
        $integration->parseAttribute(['dates' => '07/04/2026'], 'selectDates', ['node' => 'dates', 'options' => ['match' => 'world']]);

        $this->beforeSave($integration, $element);

        self::assertSame(['2026-04-07'], $element->getSelectDatesAsString());
    }

    public function testMissingMappedDatesClearTheDatesWithoutWarnings(): void
    {
        $integration = $this->makeIntegration();
        $element = $this->makeEvent(RecurrenceHelper::SELECT_DATES);
        $element->setSelectDates([new Carbon('2026-04-07', 'UTC')]);
        $integration->parseAttribute([], 'selectDates', ['node' => 'dates']);

        $this->beforeSave($integration, $element);

        self::assertSame([], $element->getSelectDatesAsString());
    }

    public function testUnmappedDatesArePreservedAndNoRruleIsBuilt(): void
    {
        $integration = $this->makeIntegration();
        $element = $this->makeEvent(RecurrenceHelper::SELECT_DATES);
        $element->setSelectDates([new Carbon('2026-04-07', 'UTC')]);

        $event = $this->beforeSave($integration, $element);

        self::assertSame(['2026-04-07'], $element->getSelectDatesAsString());
        self::assertArrayNotHasKey('selectDates', $event->contentData);
        self::assertNull($element->rrule);
    }

    public function testBlankMappedDatesClearTheDates(): void
    {
        $integration = $this->makeIntegration();
        $element = $this->makeEvent(RecurrenceHelper::SELECT_DATES);
        $element->setSelectDates([new Carbon('2026-04-07', 'UTC')]);
        $integration->parseAttribute(['dates' => ''], 'selectDates', ['node' => 'dates']);

        $this->beforeSave($integration, $element);

        self::assertSame([], $element->getSelectDatesAsString());
    }

    public function testDatesFromAnUnfinishedItemCannotAffectTheNextItem(): void
    {
        $integration = $this->makeIntegration();
        $integration->parseAttribute(['dates' => '2026-03-31'], 'selectDates', ['node' => 'dates']);

        // The previous item failed during field parsing, before the save event.
        $integration->setModel($this->settings());
        $element = $this->makeEvent(RecurrenceHelper::SELECT_DATES);
        $element->setSelectDates([new Carbon('2026-04-07', 'UTC')]);

        $this->beforeSave($integration, $element);

        self::assertSame(['2026-04-07'], $element->getSelectDatesAsString());
    }

    public function testRulesCannotLeakBetweenRecurringItems(): void
    {
        $integration = $this->makeIntegration();
        $integration->setModel($this->settings());
        $integration->parseAttribute(['rule' => 'FREQ=DAILY;UNTIL=20261231T235959Z;INTERVAL=7'], 'rrule', ['node' => 'rule']);
        $this->beforeSave($integration, $this->makeEvent());

        $integration->setModel($this->settings());
        $integration->parseAttribute(['rule' => 'FREQ=YEARLY'], 'rrule', ['node' => 'rule']);
        $element = $this->makeEvent();
        $this->beforeSave($integration, $element);

        self::assertSame('YEARLY', $element->freq);
        self::assertSame(1, $element->interval);
        self::assertNull($element->until);
        self::assertStringNotContainsString('UNTIL', $element->rrule);
    }

    public function testAnEmptyRuleCannotClearTheNextUnmappedRule(): void
    {
        $integration = $this->makeIntegration();
        $integration->parseAttribute(['rule' => ''], 'rrule', ['node' => 'rule']);

        $integration->setModel($this->settings());
        $element = $this->makeEvent('WEEKLY');
        $element->interval = 2;
        $element->byDay = 'TU';
        $this->beforeSave($integration, $element);

        self::assertSame('WEEKLY', $element->freq);
        self::assertSame(2, $element->interval);
        self::assertSame('TU', $element->byDay);
        self::assertSame('WEEKLY', RfcParser::parseRRule($element->rrule)['FREQ']);
    }

    public function testUpdatingAnEventWithANewRuleReplacesItsOldModifiers(): void
    {
        $integration = $this->makeIntegration();
        $element = $this->makeEvent('WEEKLY');
        $element->interval = 7;
        $element->until = new Carbon('2026-12-31', 'UTC');
        $element->byDay = 'TU';
        $integration->parseAttribute(['rule' => 'FREQ=YEARLY'], 'rrule', ['node' => 'rule']);

        $this->beforeSave($integration, $element);

        self::assertSame('YEARLY', $element->freq);
        self::assertSame(1, $element->interval);
        self::assertNull($element->until);
        self::assertNull($element->byDay);
        self::assertStringNotContainsString('UNTIL', $element->rrule);
        self::assertStringNotContainsString('BYDAY', $element->rrule);
    }

    public function testACountedRuleReplacesAnExistingUntilDate(): void
    {
        $integration = $this->makeIntegration();
        $element = $this->makeEvent('WEEKLY');
        $element->until = new Carbon('2026-12-31', 'UTC');
        $integration->parseAttribute(['rule' => 'FREQ=DAILY;COUNT=3'], 'rrule', ['node' => 'rule']);

        $this->beforeSave($integration, $element);

        self::assertNull($element->until);
        self::assertSame(3, $element->count);
        self::assertStringContainsString('COUNT=3', $element->rrule);
    }

    private function makeIntegration(): CalendarIntegration
    {
        return (new \ReflectionClass(CalendarIntegration::class))->newInstanceWithoutConstructor();
    }

    private function makeEvent(?string $frequency = null): Event
    {
        $element = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods([])
            ->getMock()
        ;
        $element->id = 1;
        $element->freq = $frequency;
        $element->startDate = new Carbon('2026-03-31 09:00:00', 'UTC');

        return $element;
    }

    private function beforeSave(CalendarIntegration $integration, Event $element): FeedProcessEvent
    {
        $event = new FeedProcessEvent(['element' => $element, 'contentData' => []]);
        $method = new \ReflectionMethod(CalendarIntegration::class, '_onBeforeElementSave');
        if (\PHP_VERSION_ID < 80100) {
            $method->setAccessible(true);
        }

        $method->invoke($integration, $event);

        return $event;
    }

    private function settings(): array
    {
        return ['siteId' => null, 'elementGroup' => [Event::class => 1]];
    }
}
