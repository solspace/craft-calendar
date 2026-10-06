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
