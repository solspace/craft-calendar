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

    /**
     * @dataProvider datePickerFormatDataProvider
     */
    public function testToDatePickerFormat(string $phpFormat, string $expectedFormat): void
    {
        self::assertSame($expectedFormat, DateFormatHelper::toDatePickerFormat($phpFormat));
    }

    public function datePickerFormatDataProvider(): array
    {
        return [
            ['Y-m-d', 'yyyy-MM-dd'],
            ['n/j/y', 'M/d/yy'],
            ['l, F j, Y', 'EEEE, MMMM d, yyyy'],
            ['F jS, Y', 'MMMM do, yyyy'],
            ['g:i A', 'h:mm aa'],
            ['H:i:s', 'HH:mm:ss'],
            ['Y-m-d \a\t g:i A', "yyyy-MM-dd 'at' h:mm aa"],
        ];
    }
}
