<?php

namespace Solspace\Tests\Unit\Calendar\Elements\Db;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Db\OccurrenceQuery;

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
}
