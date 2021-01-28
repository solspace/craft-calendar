<?php

namespace Solspace\Tests\Unit\Calendar\Library\RRule;

use PHPUnit\Framework\TestCase;
use RRule\RRule;

/**
 * @internal
 * @coversNothing
 */
class RRuleTest extends TestCase
{
    public function testRRule(): void
    {
        $rrule = new RRule(
            [
                'FREQ' => 'WEEKLY',
                'INTERVAL' => 1,
                'DTSTART' => '2015-06-01',
                'COUNT' => 6,
            ]
        );

        self::assertCount(6, $rrule);
        self::assertEquals(new \DateTime('2015-06-08'), $rrule[1]);
        self::assertEquals(
            'weekly, starting from 2015-06-01 00:00:00, 6 times',
            $rrule->humanReadable(
                [
                    'date_formatter' => function ($date) {
                        return $date->format('Y-m-d H:i:s');
                    },
                ]
            )
        );
    }
}
