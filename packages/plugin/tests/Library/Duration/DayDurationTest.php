<?php

namespace Solspace\Tests\Unit\Calendar\Library\Duration;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Configurations\DurationConfiguration;
use Solspace\Calendar\Library\Duration\DayDuration;

/**
 * @internal
 *
 * @coversNothing
 */
class DayDurationTest extends TestCase
{
    private ?DayDuration $duration = null;

    protected function setUp(): void
    {
        $config = $this->createMock(DurationConfiguration::class);

        $this->duration = new DayDuration(new Carbon('2019-01-01'), $config);
    }

    public function testContainsADateInToday(): void
    {
        self::assertTrue($this->duration->containsDate(new Carbon('2019-01-01 13:00:00')));
    }

    public function testContainsADateStartingInTheMidnight(): void
    {
        self::assertTrue($this->duration->containsDate(new Carbon('2019-01-01 00:00:00')));
    }
}
