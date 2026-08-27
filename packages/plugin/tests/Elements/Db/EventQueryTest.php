<?php

namespace Solspace\Tests\Unit\Calendar\Elements\Db;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;

/**
 * @internal
 *
 * @coversNothing
 */
class EventQueryTest extends TestCase
{
    public function testCarbon(): void
    {
        $query = $this->makeQuery();

        $output = $this->callExtract($query, Carbon::create(2024, 9, 12, 7, 55, 25, 'UTC'));

        $this->assertSame('2024-09-12 07:55:25', $output);
    }

    public function testNestedArray(): void
    {
        $query = $this->makeQuery();

        $input = [
            'and',
            ['or', new \DateTime('2024-09-01 00:00:00', new \DateTimeZone('UTC')), '< 2024-09-15 00:00:00'],
        ];

        $this->assertSame(
            ['and', ['or', '2024-09-01 00:00:00', '< 2024-09-15 00:00:00']],
            $this->callExtract($query, $input),
        );
    }

    public function testInvalidTypeThrows(): void
    {
        $query = $this->makeQuery();

        $this->expectException(\InvalidArgumentException::class);

        $this->callExtract($query, new \stdClass());
    }

    #[DataProvider('stringFormatProvider')]
    /** @dataProvider \Solspace\Tests\Unit\Calendar\Elements\Db\EventQueryTest::stringFormatProvider */
    public function testStringFormatsNormalizeToUtc(string $input, string $expected): void
    {
        $query = $this->makeQuery();

        $output = $this->callExtract($query, $input);

        $this->assertSame($expected, $output, "Input: {$input}");
    }

    public static function stringFormatProvider(): array
    {
        return [
            // ISO / RFC
            ['2024-09-12T07:55:25Z', '2024-09-12 07:55:25'],
            ['2024-09-12T07:55:25+00:00', '2024-09-12 07:55:25'],
            ['2024-09-12T07:55:25+01:00', '2024-09-12 06:55:25'], // offset -> UTC

            // SQL-ish / ISO-ish without TZ (assumed default TZ -> UTC)
            ['2024-09-12 07:55:25', '2024-09-12 07:55:25'],
            ['2024-09-12 07:55', '2024-09-12 07:55:00'],
            ['2024-09-12', '2024-09-12 00:00:00'],

            // UK/EU DMY
            ['12/09/2024 07:55', '2024-09-12 07:55:00'],
            ['12-09-2024', '2024-09-12 00:00:00'],
            ['12.09.2024 07:55:25', '2024-09-12 07:55:25'],

            // US MDY — only matched if format list includes MDY after DMY.
            // For '09/12/2024', DMY interprets as 9 Dec 2024.
            ['09/12/2024 07:55', '2024-12-09 07:55:00'],
            ['09-12-2024 07:55', '2024-12-09 07:55:00'],
            ['09.12.2024 07:55', '2024-12-09 07:55:00'],

            // Operator + date (date-only promoted to midnight)
            ['>= 2024-09-12', '>= 2024-09-12 00:00:00'],
            ['<= 12/09/2024 07:55', '<= 2024-09-12 07:55:00'],
            ['<> 2024-09-12T07:55:25+01:00', '<> 2024-09-12 06:55:25'],

            // Numeric Unix timestamp as STRING
            ['1727740800', '2024-10-01 00:00:00'],

            // Whitespace around operator/date
            ['   >=    2024-09-12   ', '>= 2024-09-12 00:00:00'],
        ];
    }

    public function testArrayOfMixedFormatsNormalizesRecursivelyWhenSupported(): void
    {
        $query = $this->makeQuery();

        $input = [
            'and',
            '>= 12/09/2024 07:00',           // DMY with operator
            '<= 2024-09-13T00:00:00Z',       // ISO Z
            '2024-09-12 07:55',              // SQL-like
        ];

        $expected = [
            'and',
            '>= 2024-09-12 07:00:00',
            '<= 2024-09-13 00:00:00',
            '2024-09-12 07:55:00',
        ];

        $this->assertSame($expected, $this->callExtract($query, $input));
    }

    public function testNumericUnixTimestampIntIfSupported(): void
    {
        $query = $this->makeQuery();

        $timestamp = 1727740800; // 2024-10-01 00:00:00 UTC

        $this->assertSame('2024-10-01 00:00:00', $this->callExtract($query, $timestamp));
    }

    public function testArrayInputCustomerCase(): void
    {
        $query = $this->makeQuery();

        // customer input: operator array with a DateTime inside
        $input = [
            'and',
            '>= 2024-09-01 00:00:00',
            new \DateTime('2024-10-01 00:00:00', new \DateTimeZone('UTC')),
        ];

        $this->assertSame(
            ['and', '>= 2024-09-01 00:00:00', '2024-10-01 00:00:00'],
            $this->callExtract($query, $input),
        );
    }

    public function testArrayWithNestedInvalidValue(): void
    {
        $query = $this->makeQuery();

        // Bad nested value (what if user code slipped in a non-date object?)
        $input = [
            'and',
            '>= 2024-09-01 00:00:00',
            new \stdClass(), // invalid
        ];

        $this->expectException(\InvalidArgumentException::class);

        $this->callExtract($query, $input);
    }

    #[DataProvider('orderByNeedsEventDataProvider')]
    /** @dataProvider \Solspace\Tests\Unit\Calendar\Elements\Db\EventQueryTest::orderByNeedsEventDataProvider */
    public function testOrderByNeedsEventData(array|string|null $orderBy, bool $shuffle, bool $expected): void
    {
        $query = $this->makeQuery();
        $query->orderBy = $orderBy;
        $query->setShuffle($shuffle);

        $this->assertSame($expected, $this->callOrderByNeedsEventData($query));
    }

    public function testOrderByMultipleCriteriaBreaksTiesUsingSecondCriterion(): void
    {
        $query = $this->makeQuery();

        // All share the same startDate, so ordering must fall through to id ASC.
        $eventA = $this->makeEvent(id: 3, startDate: '2026-08-01 00:00:00');
        $eventB = $this->makeEvent(id: 1, startDate: '2026-08-01 00:00:00');
        $eventC = $this->makeEvent(id: 2, startDate: '2026-08-01 00:00:00');

        $query->orderBy = ['startDate' => \SORT_ASC, 'id' => \SORT_ASC];

        $events = [$eventA, $eventB, $eventC];
        $this->callOrderByMultipleCriteria($query, $events);

        $this->assertSame([$eventB, $eventC, $eventA], $events);
    }

    private function makeEvent(int $id, string $startDate): Event
    {
        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods([])
            ->getMock()
        ;
        $event->id = $id;
        $event->startDate = new Carbon($startDate, 'UTC');

        return $event;
    }

    private function callOrderByMultipleCriteria(EventQuery $q, array &$events): void
    {
        $method = new \ReflectionMethod(EventQuery::class, 'orderByMultipleCriteria');
        $method->setAccessible(true);

        $method->invokeArgs($q, [&$events]);
    }

    private function callExtract(EventQuery $q, mixed $value): array|string
    {
        $method = new \ReflectionMethod(EventQuery::class, 'extractDateAsFormattedString');
        $method->setAccessible(true);

        // @var array|string $response
        return $method->invoke($q, $value);
    }

    private function makeQuery(): EventQuery
    {
        // Private method doesn’t need a fully-initialized object; mocking avoids constructor.
        return $this->getMockBuilder(EventQuery::class)
            ->disableOriginalConstructor()
            ->onlyMethods([])
            ->getMock()
        ;
    }

    private static function orderByNeedsEventDataProvider(): array
    {
        return [
            'default startDate only' => [
                null,
                false,
                false,
            ],
            'string startDate' => [
                'startDate',
                false,
                false,
            ],
            'string endDate' => [
                'endDate',
                false,
                false,
            ],
            'string RAND()' => [
                'RAND()',
                false,
                false,
            ],
            'string custom field' => [
                'isToday DESC',
                false,
                true,
            ],
            'array startDate only' => [
                [
                    'startDate' => \SORT_ASC,
                ],
                false,
                false,
            ],
            'array startDate and endDate' => [
                [
                    'startDate' => \SORT_ASC,
                    'endDate' => \SORT_ASC,
                ],
                false,
                false,
            ],
            'array RAND()' => [
                [
                    'RAND()' => \SORT_ASC,
                ],
                false,
                false,
            ],
            'array custom field alone' => [
                [
                    'isToday' => \SORT_DESC,
                ],
                false,
                true,
            ],
            'array custom field plus startDate' => [
                [
                    'isToday' => \SORT_DESC,
                    'startDate' => \SORT_ASC,
                ],
                false,
                true,
            ],
            'custom field with shuffle enabled' => [
                [
                    'isToday' => \SORT_DESC,
                    'startDate' => \SORT_ASC,
                ],
                true,
                false,
            ],
        ];
    }

    private function callOrderByNeedsEventData(EventQuery $q): bool
    {
        $method = new \ReflectionMethod(EventQuery::class, 'orderByNeedsEventData');
        $method->setAccessible(true);

        return $method->invoke($q);
    }
}
