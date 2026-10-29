<?php

namespace Solspace\Tests\Unit\Calendar\Services;

use Carbon\Carbon;
use craft\console\Application;
use craft\db\Connection;
use craft\models\FieldLayout;
use craft\models\Site;
use craft\services\Elements;
use craft\services\Sites;
use craft\web\Request;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Services\EventsService;
use yii\db\Transaction;

/**
 * @internal
 *
 * @coversNothing
 */
class EventSaveTest extends TestCase
{
    private mixed $originalApp;
    private EventsService $service;
    private Elements $elements;
    private bool $consoleRequest = true;
    private array $supportedSites = [];

    protected function setUp(): void
    {
        $this->originalApp = \Craft::$app;
        $this->service = new EventsService();
        $this->elements = $this->createMock(Elements::class);

        $request = $this->createMock(Request::class);
        $request->method('getIsConsoleRequest')->willReturnCallback(fn () => $this->consoleRequest);

        $db = $this->createMock(Connection::class);
        $db->method('beginTransaction')->willReturn($this->createMock(Transaction::class));
        $sites = $this->createMock(Sites::class);
        $sites->method('getAllSites')->willReturnCallback(fn ($withDisabled = null) => $withDisabled ? $this->supportedSites : []);

        $app = $this->getMockBuilder(Application::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getRequest', 'getDb', 'getElements', 'getSites', 'getIsMultiSite'])
            ->getMock()
        ;
        $app->method('getRequest')->willReturn($request);
        $app->method('getDb')->willReturn($db);
        $app->method('getElements')->willReturn($this->elements);
        $app->method('getSites')->willReturn($sites);
        $app->method('getIsMultiSite')->willReturn(true);
        \Craft::$app = $app;

        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->set('events', $this->service);
        $app->loadedModules[Calendar::class] = $plugin;
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->originalApp;
    }

    /** @dataProvider requestContexts */
    public function testSaveQueriesReturnStoredDates(bool $consoleRequest): void
    {
        $this->consoleRequest = $consoleRequest;
        $event = $this->makeEvent();
        $event->startDate = new Carbon('2026-10-27 10:00:00', 'UTC');
        $event->endDate = new Carbon('2026-10-27 11:00:00', 'UTC');

        // Represents Craft's stored, localized element before occurrence expansion.
        $query = $this->getMockBuilder(EventQuery::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getCachedResult'])
            ->getMock()
        ;
        $query->elementType = Event::class;
        $query->method('getCachedResult')->willReturn([2 => $event]);
        $query->indexBy('siteId');

        $this->elements->expects($this->once())->method('saveElement')->willReturnCallback(
            function () use ($query, $event) {
                $this->assertSame([2 => $event], $query->all());
                $this->assertSame($event, $query->one());
                $this->assertSame(1, $query->count());
                $this->assertSame('2026-10-27 10:00:00', $event->startDate->toDateTimeString());
                $this->assertSame('2026-10-27 11:00:00', $event->endDate->toDateTimeString());

                return true;
            }
        );

        $this->assertTrue($this->service->saveEvent($event, false, true));
        $this->assertNormalQueriesLoadOccurrences();
    }

    public static function requestContexts(): array
    {
        return [
            'console' => [true],
            'front-end' => [false],
        ];
    }

    public function testFailedSaveRestoresOccurrenceQueries(): void
    {
        $this->elements->method('saveElement')->willReturn(false);

        $this->assertFalse($this->service->saveEvent($this->makeEvent(), false, true));
        $this->assertNormalQueriesLoadOccurrences();
    }

    public function testThrowingSaveRestoresOccurrenceQueries(): void
    {
        $this->elements->method('saveElement')->willThrowException(new \RuntimeException('Save failed'));

        try {
            $this->service->saveEvent($this->makeEvent(), false, true);
            $this->fail('The save should throw.');
        } catch (\RuntimeException $exception) {
            $this->assertSame('Save failed', $exception->getMessage());
        }

        $this->assertNormalQueriesLoadOccurrences();
    }

    public function testNestedSaveKeepsStoredElementQueriesUntilOuterSaveFinishes(): void
    {
        $calls = 0;
        $this->elements->method('saveElement')->willReturnCallback(function () use (&$calls) {
            $this->assertTrue($this->service->getIsSavingEvent());

            if (0 === $calls++) {
                $this->assertTrue($this->service->saveEvent($this->makeEvent(), false, true));
                $this->assertTrue($this->service->getIsSavingEvent());
            }

            return true;
        });

        $this->assertTrue($this->service->saveEvent($this->makeEvent(), false, true));
        $this->assertSame(2, $calls);
        $this->assertNormalQueriesLoadOccurrences();
    }

    public function testNonTranslatableFieldLookupDisablesOccurrences(): void
    {
        $this->supportedSites = [
            new Site(['id' => 1, 'uid' => 'first-site']),
            new Site(['id' => 2, 'uid' => 'second-site']),
        ];
        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getSupportedSites', 'getFieldLayout'])
            ->getMock()
        ;
        $event->id = 481;
        $event->siteId = 1;
        $event->method('getSupportedSites')->willReturn([1, 2]);
        $fieldLayout = $this->createMock(FieldLayout::class);
        $fieldLayout->method('getTabs')->willReturn([]);
        $event->method('getFieldLayout')->willReturn($fieldLayout);

        $service = $this->getMockBuilder(EventsService::class)
            ->onlyMethods(['getEventById'])
            ->getMock()
        ;
        $service->expects($this->once())->method('getEventById')
            ->with(481, 2, false, false)
            ->willReturn($this->makeEvent())
        ;

        $method = new \ReflectionMethod(EventsService::class, '_respectNonTranslatableFields');
        $method->setAccessible(true);
        $this->assertTrue($method->invoke($service, $event));
    }

    private function makeEvent(): Event
    {
        return $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['validate'])
            ->getMock()
        ;
    }

    private function assertNormalQueriesLoadOccurrences(): void
    {
        $this->assertFalse($this->service->getIsSavingEvent());
        $query = (new \ReflectionClass(EventQuery::class))->newInstanceWithoutConstructor();
        $method = new \ReflectionMethod(EventQuery::class, 'shouldBypassCachedQuery');
        $method->setAccessible(true);
        $this->assertFalse($method->invoke($query));
    }
}
