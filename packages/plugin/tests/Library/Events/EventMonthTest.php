<?php

namespace Solspace\Tests\Unit\Calendar\Library\Events;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Library\Duration\DayDuration;
use Solspace\Calendar\Library\Events\EventMonth;
use Solspace\Calendar\Library\Exceptions\DurationException;

/**
 * @internal
 * @coversNothing
 */
class EventMonthTest extends TestCase
{
    public function dateRangeDataProvider(): array
    {
        return [
            [5, 5, 11, '2015-11-01', '2016-09-01'],
            [-10, -7, 18, '2015-06-01', '2016-11-01'],
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
        $targetDayDate = new Carbon('2016-04-01', 'UTC');

        $dayDuration = new DayDuration($targetDayDate);
        $day = new EventMonth($dayDuration, $this->createMock(EventQuery::class));

        $dateRange = $day->getDateRange($before, $after);

        $firstDate = reset($dateRange);
        $lastDate = end($dateRange);

        self::assertCount($total, $dateRange);
        self::assertEquals($expectedFirstDate, $firstDate->format('Y-m-d'));
        self::assertEquals($expectedLastDate, $lastDate->format('Y-m-d'));
    }
}
