<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use craft\i18n\Locale;
use craft\web\Application;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\SettingsService;

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
        $previousPlugin = Calendar::getInstance();
        $locale = new Locale($localeId);
        $app = $this->createMock(Application::class);
        $app->method('getFormattingLocale')->willReturn($locale);
        $app->expects(self::never())->method('getLocale');
        \Craft::$app = $app;
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
            Calendar::setInstance($previousPlugin);
        }
    }

    public function timeRangeDataProvider(): array
    {
        return [
            ['en-US', SettingsModel::TIME_FORMAT_AUTO, '1:00 PM–1:30 PM'],
            ['de-DE', SettingsModel::TIME_FORMAT_AUTO, '13:00–13:30'],
            ['de-DE', SettingsModel::TIME_FORMAT_12_HOUR, '1:00 PM–1:30 PM'],
            ['en-US', SettingsModel::TIME_FORMAT_24_HOUR, '13:00–13:30'],
        ];
    }

    public function testDateFormatsUseTheFormattingLocaleInsteadOfTheInterfaceLanguage(): void
    {
        $previousApp = \Craft::$app;
        $locale = new Locale('en-CA');
        $app = $this->createMock(Application::class);
        $app->expects(self::once())->method('getFormattingLocale')->willReturn($locale);
        $app->expects(self::never())->method('getLocale');
        \Craft::$app = $app;

        try {
            self::assertSame($locale->getDateFormat('short'), DateFormatHelper::get(length: 'short'));
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
