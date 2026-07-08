<?php

namespace Solspace\Tests\Unit\Calendar\Elements\Db;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Db\OccurrenceQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\OccurrenceModel;

/**
 * @internal
 *
 * @coversNothing
 */
class OccurrenceQueryTest extends TestCase
{
    public function testBuildOccurrenceIdCondition(): void
    {
        $query = $this->makeQuery();

        $condition = $this->callBuildOccurrenceIdCondition($query, '42-20260407000000');

        self::assertSame(
            [
                'and',
                ['eventId' => 42],
                ['startDate' => '2026-04-07 00:00:00'],
            ],
            $condition,
        );
    }

    public function testBuildOccurrenceIdConditionReturnsNullForInvalidId(): void
    {
        $query = $this->makeQuery();

        self::assertNull($this->callBuildOccurrenceIdCondition($query, 'not-an-occurrence-id'));
    }

    #[DataProvider('orderByCustomFieldProvider')]
    /** @dataProvider \Solspace\Tests\Unit\Calendar\Elements\Db\OccurrenceQueryTest::orderByCustomFieldProvider */
    public function testOrderByCustomField(?array $orderBy, bool $expected): void
    {
        $query = $this->makeQuery();
        $query->orderBy = $orderBy;

        self::assertSame($expected, $this->callOrderByCustomField($query));
    }

    public function testSortByOrderCriteriaSortsByNativeFieldsInOrder(): void
    {
        $query = $this->makeQuery();

        $modelA = $this->makeOccurrenceModel(eventId: 1, calendarId: 1, startDate: '2026-08-01 00:00:00');
        $modelB = $this->makeOccurrenceModel(eventId: 2, calendarId: 1, startDate: '2026-07-01 00:00:00');
        $modelC = $this->makeOccurrenceModel(eventId: 3, calendarId: 1, startDate: '2026-09-01 00:00:00');

        $models = [$modelA, $modelB, $modelC];

        $this->callSortByOrderCriteria($query, $models, ['startDate' => \SORT_ASC]);

        self::assertSame([$modelB, $modelA, $modelC], $models);
    }

    public function testSortByOrderCriteriaBreaksTiesUsingSecondCriterion(): void
    {
        $query = $this->makeQuery();

        // All share the same startDate, so ordering must fall through to eventId ASC.
        $modelA = $this->makeOccurrenceModel(eventId: 3, calendarId: 1, startDate: '2026-08-01 00:00:00');
        $modelB = $this->makeOccurrenceModel(eventId: 1, calendarId: 1, startDate: '2026-08-01 00:00:00');
        $modelC = $this->makeOccurrenceModel(eventId: 2, calendarId: 1, startDate: '2026-08-01 00:00:00');

        $models = [$modelA, $modelB, $modelC];

        $this->callSortByOrderCriteria($query, $models, ['startDate' => \SORT_ASC, 'eventId' => \SORT_ASC]);

        self::assertSame([$modelB, $modelC, $modelA], $models);
    }

    private function callBuildOccurrenceIdCondition(OccurrenceQuery $query, string $value): ?array
    {
        $method = new \ReflectionMethod(OccurrenceQuery::class, 'buildOccurrenceIdCondition');

        return $method->invoke($query, $value);
    }

    private function makeQuery(): OccurrenceQuery
    {
        return $this->getMockBuilder(OccurrenceQuery::class)
            ->disableOriginalConstructor()
            ->onlyMethods([])
            ->getMock()
        ;
    }

    private static function orderByCustomFieldProvider(): array
    {
        return [
            'null orderBy' => [
                null,
                false,
            ],
            'empty orderBy' => [
                [],
                false,
            ],
            'native columns only' => [
                [
                    'startDate' => \SORT_ASC,
                    'endDate' => \SORT_ASC,
                ],
                false,
            ],
            'all native columns' => [
                [
                    'eventId' => \SORT_ASC,
                    'calendarId' => \SORT_ASC,
                    'startDate' => \SORT_ASC,
                    'endDate' => \SORT_ASC,
                    'allDay' => \SORT_ASC,
                    'uid' => \SORT_ASC,
                    'dateCreated' => \SORT_ASC,
                    'dateUpdated' => \SORT_ASC,
                ],
                false,
            ],
            'custom field alone' => [
                [
                    'isToday' => \SORT_DESC,
                ],
                true,
            ],
            'custom field mixed with native' => [
                [
                    'isToday' => \SORT_DESC,
                    'startDate' => \SORT_ASC,
                ],
                true,
            ],
        ];
    }

    private function callOrderByCustomField(OccurrenceQuery $query): bool
    {
        $method = new \ReflectionMethod(OccurrenceQuery::class, 'orderByCustomField');

        return $method->invoke($query);
    }

    private function callSortByOrderCriteria(OccurrenceQuery $query, array &$models, array $orderBy): void
    {
        $method = new \ReflectionMethod(OccurrenceQuery::class, 'sortByOrderCriteria');

        $method->invokeArgs($query, [&$models, $orderBy]);
    }

    private function makeOccurrenceModel(int $eventId, int $calendarId, string $startDate): OccurrenceModel
    {
        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods([])
            ->getMock()
        ;
        $event->id = $eventId;

        $calendar = $this->getMockBuilder(CalendarModel::class)
            ->disableOriginalConstructor()
            ->onlyMethods([])
            ->getMock()
        ;
        $calendar->id = $calendarId;

        $model = new OccurrenceModel();
        $model->event = $event;
        $model->calendar = $calendar;
        $model->startDate = new Carbon($startDate, 'UTC');
        $model->endDate = new Carbon($startDate, 'UTC');

        return $model;
    }
}
