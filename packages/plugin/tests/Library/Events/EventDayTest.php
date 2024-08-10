<?php

namespace Solspace\Tests\Unit\Calendar\Library\Events;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Library\Configurations\DurationConfiguration;
use Solspace\Calendar\Library\Duration\DayDuration;
use Solspace\Calendar\Library\Events\EventDay;
use Solspace\Calendar\Library\Exceptions\DurationException;

/**
 * @internal
 *
 * @coversNothing
 */
class EventDayTest extends TestCase
{
    public function testTimezones()
    {
        $config = $this->createMock(DurationConfiguration::class);
        $targetDayDate = new Carbon('2016-01-01', 'America/Winnipeg');

        $dayDuration = new DayDuration($targetDayDate, [], $config);
        $day = new EventDay($dayDuration, $this->createMock(EventQuery::class));

        self::assertEquals(
            '2016-01-01',
            $day->getStartDate()->format('Y-m-d')
        );

        self::assertEquals('UTC', $day->getStartDate()->getTimezone()->getName());
    }

    public function dateRangeDataProvider(): array
    {
        return [
            [5, 5, 11, '2015-12-27', '2016-01-06'],
            [-10, -7, 18, '2015-12-22', '2016-01-08'],
        ];
    }

    /**
     * @dataProvider dateRangeDataProvider
     *
     * @throws DurationException
     */
    public function testDateRange(
        int $before,
        int $after,
        int $total,
        string $expectedFirstDate,
        string $expectedLastDate
    ): void {
        $config = $this->createMock(DurationConfiguration::class);
        $targetDayDate = new Carbon('2016-01-01', 'UTC');

        $dayDuration = new DayDuration($targetDayDate, [], $config);
        $day = new EventDay($dayDuration, $this->createMock(EventQuery::class));

        $dateRange = $day->getDateRange($before, $after);

        $firstDate = reset($dateRange);
        $lastDate = end($dateRange);

        self::assertCount($total, $dateRange);
        self::assertEquals($expectedFirstDate, $firstDate->format('Y-m-d'));
        self::assertEquals($expectedLastDate, $lastDate->format('Y-m-d'));
    }
}
