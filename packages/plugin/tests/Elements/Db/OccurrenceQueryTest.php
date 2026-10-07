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
                ['recurrenceId' => '2026-04-07 00:00:00'],
            ],
            $condition,
        );
    }

    public function testBuildOccurrenceIdConditionReturnsNullForInvalidId(): void
    {
        $query = $this->makeQuery();

        self::assertNull($this->callBuildOccurrenceIdCondition($query, 'not-an-occurrence-id'));
        self::assertNull($this->callBuildOccurrenceIdCondition($query, '42-20260231000000'));
    }

    /**
     * @dataProvider \Solspace\Tests\Unit\Calendar\Elements\Db\OccurrenceQueryTest::recurrenceIdProvider
     */
    public function testNormalizeRecurrenceId(mixed $value, ?string $expected): void
    {
        $method = new \ReflectionMethod(OccurrenceQuery::class, 'normalizeRecurrenceId');

        self::assertSame($expected, $method->invoke($this->makeQuery(), $value));
    }

    public static function recurrenceIdProvider(): array
    {
        return [
            'occurrence ID form' => ['20261014100000', '2026-10-14 10:00:00'],
            'date and time' => ['2026-10-14 10:00:00', '2026-10-14 10:00:00'],
            'ISO date and time' => ['2026-10-14T10:00', '2026-10-14 10:00:00'],
            'offset is ignored, because recurrence IDs are floating' => ['2026-10-14T10:00:00+02:00', '2026-10-14 10:00:00'],
            'date only' => ['2026-10-14', '2026-10-14 00:00:00'],
            'date object' => [new Carbon('2026-10-14 10:00:00', 'UTC'), '2026-10-14 10:00:00'],
            'impossible date' => ['20261332100000', null],
            'not a date' => ['not a date', null],
            'unsupported type' => [20261014, null],
        ];
    }

    public function testBuildSlugCondition(): void
    {
        self::assertSame(
            [
                'and',
                ['code' => 'fq4yk'],
                ['>=', 'startDate', '2026-10-14 00:00:00'],
                ['<', 'startDate', '2026-10-15 00:00:00'],
            ],
            $this->callBuildSlugCondition('2026-10-14-fq4yk'),
        );
    }

    public function testBuildSlugConditionIsCaseInsensitive(): void
    {
        self::assertSame(
            $this->callBuildSlugCondition('2026-10-14-fq4yk'),
            $this->callBuildSlugCondition(' 2026-10-14-FQ4YK '),
        );
    }

    public function testBuildSlugConditionRejectsMalformedSlugs(): void
    {
        self::assertNull($this->callBuildSlugCondition('fq4yk'));
        self::assertNull($this->callBuildSlugCondition('2026-10-14-fq4y'));
        self::assertNull($this->callBuildSlugCondition('2026-10-14fq4yk'));
        self::assertNull($this->callBuildSlugCondition('2026-02-30-fq4yk'));
    }

    public function testCodeFilterIsLowercased(): void
    {
        $query = $this->makeQuery()->code(' FQ4YK ');
        $this->callApplyOccurrenceIdentityFilters($query);
        self::assertSame(['code' => 'fq4yk'], $query->where);

        $query = $this->makeQuery()->code(['FQ4YK', 'b7k2m']);
        $this->callApplyOccurrenceIdentityFilters($query);
        self::assertSame(['code' => ['fq4yk', 'b7k2m']], $query->where);
    }

    public function testCancelledFilter(): void
    {
        $all = $this->makeQuery();
        $this->callApplyOccurrenceIdentityFilters($all);
        self::assertNull($all->where);

        $notCancelled = $this->makeQuery()->cancelled(false);
        $this->callApplyOccurrenceIdentityFilters($notCancelled);
        self::assertSame(['cancelled' => false], $notCancelled->where);
    }

    public function testRecurrenceIdFilterSkipsValuesThatCantMatch(): void
    {
        $query = $this->makeQuery()->recurrenceId(['20261014100000', 'not a date']);

        $this->callApplyOccurrenceIdentityFilters($query);

        self::assertSame(['or', ['recurrenceId' => '2026-10-14 10:00:00']], $query->where);
    }

    public function testFiltersMatchNothingWhenNoValueCanMatch(): void
    {
        $recurrenceId = $this->makeQuery()->recurrenceId('not a date');
        $this->callApplyOccurrenceIdentityFilters($recurrenceId);
        self::assertSame('0=1', $recurrenceId->where);

        $slug = $this->makeQuery()->slug('not-a-slug');
        $this->callApplyOccurrenceIdentityFilters($slug);
        self::assertSame('0=1', $slug->where);
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

    private function callBuildSlugCondition(string $slug): ?array
    {
        $method = new \ReflectionMethod(OccurrenceQuery::class, 'buildSlugCondition');

        return $method->invoke($this->makeQuery(), $slug);
    }

    private function callApplyOccurrenceIdentityFilters(OccurrenceQuery $query): void
    {
        $method = new \ReflectionMethod(OccurrenceQuery::class, 'applyOccurrenceIdentityFilters');

        $method->invoke($query);
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
