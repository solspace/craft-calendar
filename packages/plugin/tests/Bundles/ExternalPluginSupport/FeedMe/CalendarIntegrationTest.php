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
use Solspace\Calendar\Bundles\ExternalPluginSupport\FeedMe\CalendarIntegration;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Services\SettingsService;
use yii\base\Component;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Bundles\ExternalPluginSupport\FeedMe\CalendarIntegration
 */
class CalendarIntegrationTest extends TestCase
{
    private mixed $previousApp;
    private mixed $previousYiiApp;
    private ?Plugin $previousFeedMe = null;
    private ?Calendar $previousCalendar = null;

    protected function setUp(): void
    {
        if (!class_exists(Element::class)) {
            self::markTestSkipped('Install craftcms/feed-me to run Feed Me integration tests.');
        }

        $this->previousApp = \Craft::$app;
        $this->previousYiiApp = \Yii::$app;
        $this->previousFeedMe = Plugin::$plugin ?? null;
        $this->previousCalendar = Calendar::getInstance();
        \Craft::$app = new class extends Component {
            public array $loadedModules = [];

            public mixed $user;

            public function getIsInstalled(): bool
            {
                return false;
            }

            public function getTimeZone(): string
            {
                return 'America/Winnipeg';
            }
        };
        \Yii::$app = \Craft::$app;
        \Craft::$app->user = $this->getMockBuilder(User::class)->disableOriginalConstructor()->onlyMethods(['getId'])->getMock();
        if (!class_exists(CustomFieldBehavior::class, false)) {
            $elementPath = \dirname((new \ReflectionClass(\craft\base\Element::class))->getFileName());

            require $elementPath.'/../behaviors/CustomFieldBehavior.php.template';
        }
        $settings = $this->createMock(SettingsService::class);
        $settings->method('isAllDayDefault')->willReturn(false);
        $settings->method('getEventDuration')->willReturn(60);
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->set('settings', $settings);
        Calendar::setInstance($plugin);
        $service = $this->createMock(Service::class);
        $service->method('getConfig')->willReturnCallback(static fn ($key) => 'dataDelimiter' === $key ? '|' : null);
        Plugin::$plugin = (new \ReflectionClass(Plugin::class))->newInstanceWithoutConstructor();
        Plugin::$plugin->set('service', $service);
    }

    protected function tearDown(): void
    {
        if (class_exists(Element::class)) {
            \Craft::$app = $this->previousApp;
            \Yii::$app = $this->previousYiiApp;
            Calendar::setInstance($this->previousCalendar);
            if ($this->previousFeedMe) {
                Plugin::$plugin = $this->previousFeedMe;
            }
        }
    }

    public function testSelectedDatesAreImportedUsingTheirMappedDateFormat(): void
    {
        $integration = $this->integration();
        $integration->parseAttribute(['dates' => '30/10/2026'], 'selectDates', ['node' => 'dates', 'options' => ['match' => 'world']]);
        $integration->parseAttribute(['frequency' => 'SELECT_DATES'], 'freq', ['node' => 'frequency']);
        $integration->parseAttribute(['rule' => null], 'rrule', ['node' => 'rule']);
        $event = $this->event();
        $debug = $this->save($integration, $event);

        self::assertStringContainsString('20261030T093000', $event->rrule);
        self::assertSame($event->rrule, $debug->contentData['rrule']);
        self::assertSame('NEVER', $event->repeatType);
    }

    public function testRecurrenceDataCannotLeakBetweenImportedItems(): void
    {
        $integration = $this->integration();
        $integration->parseAttribute(['rule' => 'FREQ=WEEKLY;INTERVAL=3;UNTIL=20261231T235959'], 'rrule', ['node' => 'rule']);
        $this->save($integration, $this->event());
        $integration->parseAttribute(['rule' => 'FREQ=DAILY;COUNT=2'], 'rrule', ['node' => 'rule']);
        $event = $this->event();
        $this->save($integration, $event);

        self::assertStringNotContainsString('UNTIL', $event->rrule);
        self::assertStringNotContainsString('INTERVAL=3', $event->rrule);
        self::assertSame('AFTER', $event->repeatEndType);
    }

    public function testStartingTheNextItemDiscardsUnfinishedDatesAndRules(): void
    {
        $integration = $this->integration();
        $integration->parseAttribute(['dates' => '2026-10-30'], 'selectDates', ['node' => 'dates']);
        $integration->parseAttribute(['rule' => 'FREQ=DAILY;COUNT=2'], 'rrule', ['node' => 'rule']);
        $integration->setModel(['siteId' => null, 'elementGroup' => [Event::class => 1]]);
        $event = $this->event();
        $this->save($integration, $event);

        self::assertNull($event->rrule);
    }

    public function testMissingMappedDatesClearExistingDatesWithoutWarnings(): void
    {
        $integration = $this->integration();
        $integration->parseAttribute([], 'selectDates', ['node' => 'dates']);
        $event = $this->event();
        $event->rrule = "DTSTART:20261029T093000\nRDATE:20261103T093000";
        $this->save($integration, $event);

        self::assertStringNotContainsString('20261103', $event->rrule);
    }

    private function integration(): CalendarIntegration
    {
        return (new \ReflectionClass(CalendarIntegration::class))->newInstanceWithoutConstructor();
    }

    private function event(): Event
    {
        $event = $this->getMockBuilder(Event::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
        $event->startDate = new Carbon('2026-10-29 09:30:00', 'UTC');
        $event->endDate = new Carbon('2026-10-29 10:30:00', 'UTC');
        $event->allDay = false;

        return $event;
    }

    private function save(CalendarIntegration $integration, Event $element): FeedProcessEvent
    {
        $event = new FeedProcessEvent(['element' => $element, 'contentData' => []]);
        (new \ReflectionMethod(CalendarIntegration::class, '_onBeforeElementSave'))->invoke($integration, $event);

        return $event;
    }
}
