<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use craft\i18n\Formatter;
use craft\i18n\Locale;
use craft\web\Application;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;

/**
 * @internal
 *
 * @coversNothing
 */
class DateFormatHelperTest extends TestCase
{
    public function testDateFormatsUseTheFormattingLocaleInsteadOfTheInterfaceLanguage(): void
    {
        $previousApp = \Craft::$app;
        $dateFormat = 'd/M/yy';

        $formatter = $this->getMockBuilder(Formatter::class)
            ->disableOriginalConstructor()
            ->getMock()
        ;
        $formatter->dateFormat = 'short';
        $formatter->timeFormat = 'short';
        $formatter->dateTimeFormats = [
            'short' => [
                'date' => $dateFormat,
                'time' => 'h:mm a',
                'datetime' => 'd/M/yy, h:mm a',
            ],
        ];

        $locale = $this->createMock(Locale::class);
        $locale->method('getFormatter')->willReturn($formatter);
        $locale->method('getDateFormat')->with('short')->willReturn($dateFormat);

        $app = $this->createMock(Application::class);
        $app->expects(self::once())->method('getFormattingLocale')->willReturn($locale);
        $app->expects(self::never())->method('getLocale');
        \Craft::$app = $app;

        try {
            self::assertSame($dateFormat, DateFormatHelper::get(length: 'short'));
        } finally {
            \Craft::$app = $previousApp;
        }
    }

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
