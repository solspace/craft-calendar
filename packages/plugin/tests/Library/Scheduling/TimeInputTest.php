<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\i18n\Locale;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Scheduling\TimeInput;

/** @covers \Solspace\Calendar\Library\Scheduling\TimeInput */
class TimeInputTest extends TestCase
{
    private mixed $previousApp;
    private string $previousTimezone;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousTimezone = date_default_timezone_get();
        \Craft::$app = new class {
            public function getFormattingLocale(): Locale
            {
                return new Locale('en-US');
            }

            public function getI18n(): object
            {
                return new class {
                    public function getLocaleById(string $id): Locale
                    {
                        return new Locale($id);
                    }
                };
            }
        };
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        date_default_timezone_set($this->previousTimezone);
    }

    /** @dataProvider timeInputProvider */
    public function testNativeTimesKeepTheirWallClockValueAcrossSystemTimezones(array $input, string $expected): void
    {
        foreach (['UTC', 'America/Winnipeg', 'Pacific/Auckland'] as $timezone) {
            date_default_timezone_set($timezone);
            self::assertSame($expected, TimeInput::normalize($input));
            self::assertSame($timezone, date_default_timezone_get());
        }
    }

    public static function timeInputProvider(): array
    {
        return [
            'morning' => [['time' => '9:30 AM'], '09:30'],
            'afternoon' => [['time' => '5:00 PM'], '17:00'],
            'midnight' => [['time' => '12:00 AM'], '00:00'],
            'noon' => [['time' => '12:00 PM'], '12:00'],
            'compact period' => [['time' => '5:00pm'], '17:00'],
            'narrow space' => [['time' => "9:30\u{202F}AM"], '09:30'],
            'nonbreaking space' => [['time' => "9:30\u{00A0}AM"], '09:30'],
            '24 hour' => [['time' => '17:30'], '17:30'],
            '24 hour midnight' => [['time' => '00:00'], '00:00'],
            'seconds' => [['time' => '17:30:45'], '17:30'],
            'posted timezone is not a conversion' => [['time' => '9:30 AM', 'timezone' => 'Pacific/Auckland'], '09:30'],
            'posted German locale' => [['time' => '17:30', 'locale' => 'de-DE'], '17:30'],
            'posted Finnish locale' => [['time' => '17.30', 'locale' => 'fi-FI'], '17:30'],
            'localized period' => [['time' => '5:00 p. m.', 'locale' => 'es-CO'], '17:00'],
            'compact localized period' => [['time' => '5:00pm', 'locale' => 'es-CO'], '17:00'],
            'localized digits' => [['time' => '٩:٣٠ ص', 'locale' => 'ar-EG'], '09:30'],
            'empty input' => [['time' => ''], ''],
            'missing time' => [[], ''],
            'invalid type' => [['time' => []], ''],
            'invalid hour' => [['time' => '25:30'], ''],
            'invalid minute' => [['time' => '09:60'], ''],
            'invalid second' => [['time' => '09:30:60'], ''],
            'invalid 12 hour' => [['time' => '13:30 PM'], ''],
            'trailing input' => [['time' => '9:30 AM junk'], ''],
        ];
    }
}
