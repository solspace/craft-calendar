<?php

namespace Solspace\Tests\Unit\Calendar\Library\Duration;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Duration\DayDuration;

/**
 * @internal
 * @coversNothing
 */
class DayDurationTest extends TestCase
{
    /** @var DayDuration */
    private $duration;

    protected function setUp(): void
    {
        $this->duration = new DayDuration(new Carbon('2019-01-01'));
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
