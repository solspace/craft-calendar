<?php

namespace Solspace\Tests\Unit\Calendar\Console\Controllers;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Console\Controllers\EventsController;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\CalendarsService;
use yii\base\Component;
use yii\console\ExitCode;

/**
 * @internal
 *
 * @coversNothing
 */
class EventsControllerTest extends TestCase
{
    private $previousApp;

    private CalendarsService $calendars;

    protected function setUp(): void
    {
        if (!class_exists(\Yii::class)) {
            require \dirname((new \ReflectionClass(Component::class))->getFileName()).'/../Yii.php';
        }

        $this->previousApp = \Yii::$app;
        \Yii::$app = new \stdClass();
        \Yii::$app->loadedModules = [];

        $this->calendars = $this->createMock(CalendarsService::class);
        $calendar = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $calendar->set('calendars', $this->calendars);
        \Yii::$app->loadedModules[Calendar::class] = $calendar;
    }

    protected function tearDown(): void
    {
        \Yii::$app = $this->previousApp;
    }

    public function testCalendarOptionIsOnlyAvailableForResave(): void
    {
        $controller = $this->makeController();

        self::assertContains('calendar', $controller->options('resave'));
        self::assertNotContains('calendar', $controller->options('fix-titles'));
        self::assertNotContains('calendar', $controller->options('fix-contents'));
    }

    /**
     * @dataProvider calendarProvider
     */
    public function testResaveCanBeLimitedToACalendar(int|string $value, string $lookup, int|string $expected): void
    {
        $controller = $this->makeController();
        $controller->calendar = $value;
        $calendar = new CalendarModel();
        $calendar->id = 17;
        $this->calendars->expects(self::once())->method($lookup)->with($expected)->willReturn($calendar);
        $otherLookup = 'getCalendarById' === $lookup ? 'getCalendarByHandle' : 'getCalendarById';
        $this->calendars->expects(self::never())->method($otherLookup);
        $query = $this->makeQuery();
        $query->expects(self::once())->method('setCalendarId')->with(17)->willReturnSelf();
        $query->expects(self::once())->method('count')->willReturn(0);

        self::assertSame(ExitCode::OK, $this->saveElements($controller, $query));
    }

    public static function calendarProvider(): array
    {
        return [
            'handle' => ['holidays', 'getCalendarByHandle', 'holidays'],
            'CLI ID' => ['17', 'getCalendarById', 17],
            'integer ID' => [17, 'getCalendarById', 17],
        ];
    }

    /**
     * @dataProvider invalidCalendarProvider
     */
    public function testInvalidCalendarsStopBeforeEventsAreQueried(string $value): void
    {
        $controller = $this->makeController();
        $controller->calendar = $value;
        $controller->expects(self::once())->method('stderr')->with(self::stringContains('Calendar "'.$value.'" was not found.'));
        $query = $this->makeQuery();
        $query->expects(self::never())->method('setCalendarId');
        $query->expects(self::never())->method('count');

        self::assertSame(ExitCode::USAGE, $this->saveElements($controller, $query));
    }

    public static function invalidCalendarProvider(): array
    {
        return [['missing'], ['9999'], [''], ['0']];
    }

    public function testOmittingCalendarKeepsTheExistingBehavior(): void
    {
        $controller = $this->makeController();
        $this->calendars->expects(self::never())->method('getCalendarById');
        $this->calendars->expects(self::never())->method('getCalendarByHandle');
        $query = $this->makeQuery();
        $query->expects(self::never())->method('setCalendarId');
        $query->expects(self::once())->method('count')->willReturn(0);

        self::assertSame(ExitCode::OK, $this->saveElements($controller, $query));
    }

    public function testCalendarFilteringCanBeCombinedWithExistingFilters(): void
    {
        $controller = $this->makeController();
        $controller->calendar = 'holidays';
        $controller->elementId = '12,34';
        $controller->site = 'english';
        $controller->status = 'live,pending';
        $controller->offset = 2;
        $controller->limit = 5;
        $calendar = new CalendarModel();
        $calendar->id = 17;
        $this->calendars->method('getCalendarByHandle')->willReturn($calendar);
        $query = $this->makeQuery();
        $query->expects(self::once())->method('setCalendarId')->with(17)->willReturnSelf();
        $query->expects(self::once())->method('site')->with('english')->willReturnSelf();
        $query->method('count')->willReturn(0);

        self::assertSame(ExitCode::OK, $this->saveElements($controller, $query));
        self::assertSame(['12', '34'], $query->id);
        self::assertSame(['live', 'pending'], $query->status);
        self::assertSame(2, $query->offset);
        self::assertSame(5, $query->limit);
    }

    private function makeController(): EventsController
    {
        return $this->getMockBuilder(EventsController::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['stdout', 'stderr'])
            ->getMock()
        ;
    }

    private function makeQuery(): EventQuery
    {
        $query = $this->getMockBuilder(EventQuery::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['setCalendarId', 'count', 'site'])
            ->getMock()
        ;
        $query->elementType = ResaveTestEvent::class;

        return $query;
    }

    private function saveElements(EventsController $controller, EventQuery $query): int
    {
        $method = new \ReflectionMethod(EventsController::class, 'saveElements');
        if (\PHP_VERSION_ID < 80100) {
            $method->setAccessible(true);
        }

        return $method->invoke($controller, $query);
    }
}

class ResaveTestEvent extends Event
{
    public static function pluralLowerDisplayName(): string
    {
        return 'events';
    }
}
