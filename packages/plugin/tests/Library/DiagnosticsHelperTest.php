<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Helpers\DiagnosticsHelper;

/**
 * @internal
 *
 * @coversNothing
 */
class DiagnosticsHelperTest extends TestCase
{
    public function testRecurrenceDateCountsMatchTheBuildersFixedDateLists(): void
    {
        $rule = "DTSTART:20261005T100000\r\nRRULE:FREQ=DAILY\r\n"
            ."RDATE:20261006T100000,20261007T100000,\r\n 20261007T120000\r\n"
            ."RDATE;TZID=America/Winnipeg:20261008T100000\r\n"
            ."EXDATE:20261009T100000,20261010T100000\r\nEXDATE;VALUE=DATE:20261009";

        self::assertSame(['additional' => 3, 'excluded' => 2], DiagnosticsHelper::recurrenceDateCounts($rule, '2026-10-05 10:00:00'));
        self::assertSame(['additional' => 0, 'excluded' => 0], DiagnosticsHelper::recurrenceDateCounts(null, '2026-10-05 10:00:00'));
        self::assertSame(['additional' => 0, 'excluded' => 0], DiagnosticsHelper::recurrenceDateCounts("DTSTART:20261005T100000\nRRULE:FREQ=DAILY", '2026-10-05 10:00:00'));
    }

    public function testSelectedDateCountsDoNotIncludeTheInitialOccurrence(): void
    {
        $rule = "DTSTART;VALUE=DATE:20261005\nRDATE;VALUE=DATE:20261005,20261006,20261007\nEXDATE;VALUE=DATE:20261006";

        self::assertSame(['additional' => 2, 'excluded' => 1], DiagnosticsHelper::recurrenceDateCounts($rule, '2026-10-05 00:00:00'));
        self::assertSame(['additional' => 1, 'excluded' => 0], DiagnosticsHelper::recurrenceDateCounts('RDATE:20261005T100000Z,20261006T100000Z', '2026-10-05 10:00:00'));
    }

    public function testMemoryLimitThresholdsSupportPhpUnitsAndUnlimitedMemory(): void
    {
        foreach ([
            '128M' => 'error',
            '255M' => 'error',
            '268435455' => 'error',
            '256M' => 'warning',
            '511M' => 'warning',
            '536870911' => 'warning',
            '512M' => 'pass',
            '524288K' => 'pass',
            '1G' => 'pass',
            '-1' => 'pass',
        ] as $limit => $status) {
            self::assertSame($status, DiagnosticsHelper::memoryLimitStatus((string) $limit), (string) $limit);
        }
    }

    public function testTimezoneOffsetsIncludeDaylightSavingAndFractionalHours(): void
    {
        $winter = new \DateTimeImmutable('2026-01-15T12:00:00+00:00');
        $summer = new \DateTimeImmutable('2026-07-15T12:00:00+00:00');

        self::assertSame('-06:00', DiagnosticsHelper::timezone('America/Winnipeg', $winter)['offset']);
        self::assertFalse(DiagnosticsHelper::timezone('America/Winnipeg', $winter)['dst']);
        self::assertSame('-05:00', DiagnosticsHelper::timezone('America/Winnipeg', $summer)['offset']);
        self::assertTrue(DiagnosticsHelper::timezone('America/Winnipeg', $summer)['dst']);
        self::assertSame('+05:45', DiagnosticsHelper::timezone('Asia/Kathmandu', $winter)['offset']);
        self::assertSame('2026-01-15 17:45:00 +05:45', DiagnosticsHelper::timezone('Asia/Kathmandu', $winter)['clock']);
        self::assertSame('2026-01-15T12:00:00+00:00', $winter->format(\DateTimeInterface::ATOM));
    }

    public function testInvalidTimezoneDoesNotBreakDiagnosticsOrChangeTheRuntimeTimezone(): void
    {
        $runtimeTimezone = date_default_timezone_get();

        self::assertNull(DiagnosticsHelper::timezone('invalid/timezone', new \DateTimeImmutable()));
        self::assertSame($runtimeTimezone, date_default_timezone_get());
    }
}
