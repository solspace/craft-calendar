<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;

/**
 * @internal
 *
 * @coversNothing
 */
class DateFormatHelperTest extends TestCase
{
    /**
     * @dataProvider jsDateFormatDataProvider
     */
    public function testToJsDateFormat(string $phpFormat, array $expectedFormat): void
    {
        self::assertSame($expectedFormat, DateFormatHelper::toJsDateFormat($phpFormat));
    }

    public function jsDateFormatDataProvider(): array
    {
        return [
            [
                'Y-m-d',
                [
                    'year' => 'numeric',
                    'month' => '2-digit',
                    'day' => '2-digit',
                ],
            ],
            [
                'l, F j, Y',
                [
                    'weekday' => 'long',
                    'month' => 'long',
                    'day' => 'numeric',
                    'year' => 'numeric',
                ],
            ],
            [
                'g:i A',
                [
                    'hour' => 'numeric',
                    'hour12' => true,
                    'omitZeroMinute' => true,
                    'minute' => '2-digit',
                    'meridiem' => 'short',
                ],
            ],
            [
                'H:i:s',
                [
                    'hour' => '2-digit',
                    'hour12' => false,
                    'minute' => '2-digit',
                    'second' => '2-digit',
                ],
            ],
        ];
    }
}
