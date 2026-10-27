<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use craft\i18n\Formatter;
use craft\i18n\Locale;
use craft\web\Application;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\SettingsService;
use yii\i18n\I18N;

/**
 * @internal
 *
 * @coversNothing
 */
class DateFormatHelperTest extends TestCase
{
    /** @dataProvider timeRangeDataProvider */
    public function testTimeRangesUseTheFormattingLocaleAndCalendarTimeSetting(string $localeId, string $timeFormat, string $expected): void
    {
        $previousApp = \Craft::$app;
        $previousYiiApp = \Yii::$app;
        $previousPlugin = Calendar::getInstance();
        $locale = new Locale($localeId);
        $i18n = $this->createMock(I18N::class);
        $i18n->method('translate')->willReturnCallback(
            static fn (string $category, string $message, array $params, string $language): string => $message
        );
        $app = $this->getMockBuilder(Application::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getFormattingLocale', 'getLocale', 'getI18n'])
            ->getMock()
        ;
        $app->method('getFormattingLocale')->willReturn($locale);
        $app->expects(self::never())->method('getLocale');
        $app->method('getI18n')->willReturn($i18n);
        $app->timeZone = 'UTC';
        $app->language = $localeId;
        \Craft::$app = $app;
        \Yii::$app = $app;
        $settings = $this->createMock(SettingsService::class);
        $model = new SettingsModel();
        $model->timeFormat = $timeFormat;
        $settings->method('getSettingsModel')->willReturn($model);
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->setComponents(['settings' => $settings]);
        Calendar::setInstance($plugin);

        try {
            $formatter = $locale->getFormatter();
            $originalTimezone = $formatter->timeZone;
            $start = new \DateTimeImmutable('2026-10-12T18:00:00+00:00');
            $end = new \DateTimeImmutable('2026-10-12T18:30:00+00:00');
            $label = DateFormatHelper::formatTimeRange($start, $end, 'America/Winnipeg');
            self::assertSame($expected, str_replace(["\u{202F}", "\u{00A0}"], ' ', $label));
            self::assertSame($originalTimezone, $formatter->timeZone);
            self::assertSame('2026-10-12T18:00:00+00:00', $start->format(\DATE_ATOM));
        } finally {
            \Craft::$app = $previousApp;
            \Yii::$app = $previousYiiApp;
            Calendar::setInstance($previousPlugin);
        }
    }

    public function timeRangeDataProvider(): array
    {
        return [
            ['en-US', SettingsModel::TIME_FORMAT_AUTO, '1:00pm - 1:30pm'],
            ['en-CA', SettingsModel::TIME_FORMAT_AUTO, '1:00pm - 1:30pm'],
            ['de-DE', SettingsModel::TIME_FORMAT_AUTO, '13:00 - 13:30'],
            ['de-DE', SettingsModel::TIME_FORMAT_12_HOUR, '1:00pm - 1:30pm'],
            ['en-US', SettingsModel::TIME_FORMAT_24_HOUR, '13:00 - 13:30'],
        ];
    }

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
