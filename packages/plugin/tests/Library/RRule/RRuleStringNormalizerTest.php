<?php

namespace Solspace\Tests\Unit\Calendar\Library\RRule;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\RRule\RRuleStringNormalizer;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Library\RRule\RRuleStringNormalizer
 */
class RRuleStringNormalizerTest extends TestCase
{
    public function testNormalizeAllDayRRuleConvertsTimedDateValues(): void
    {
        $rrule = implode(
            "\n",
            [
                'DTSTART:20260611T110000Z',
                'RRULE:INTERVAL=1;UNTIL=20260730T110000Z;FREQ=WEEKLY;BYDAY=TH,TU,SA',
                'RDATE:20260608T110000,20260701T110000',
                'EXDATE;TZID=America/New_York:20260623T110000,20260630T110000',
            ],
        );

        self::assertSame(
            implode(
                "\n",
                [
                    'DTSTART:20260611',
                    'RRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=20260730;BYDAY=TH,TU,SA',
                    'RDATE;VALUE=DATE:20260608,20260701',
                    'EXDATE;VALUE=DATE:20260623,20260630',
                ],
            ),
            RRuleStringNormalizer::normalizeAllDayRRule($rrule),
        );
    }

    public function testNormalizeAllDayLineDeduplicatesDateValues(): void
    {
        self::assertSame(
            'RDATE;VALUE=DATE:20260608,20260701',
            RRuleStringNormalizer::normalizeAllDayLine('RDATE:20260608T110000,20260608T150000,20260701T110000'),
        );
    }

    public function testNormalizeTimedLineStripsZuluSuffixOnly(): void
    {
        self::assertSame(
            'RDATE:20260608T110000,20260701T110000',
            RRuleStringNormalizer::normalizeLine('RDATE:20260608T110000Z,20260701T110000Z', false),
        );
    }

    public function testNormalizeRRuleLineMovesFrequencyFirst(): void
    {
        self::assertSame(
            'RRULE:FREQ=WEEKLY;INTERVAL=1;COUNT=20;BYDAY=TH,TU,SA',
            RRuleStringNormalizer::normalizeLine('RRULE:INTERVAL=1;COUNT=20;FREQ=WEEKLY;BYDAY=TH,TU,SA', true),
        );
    }
}
