<?php

namespace Solspace\Tests\Unit\Calendar\Elements;

use Carbon\Carbon;
use craft\i18n\Locale;
use craft\web\Application;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\SettingsService;
use yii\i18n\I18N;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Elements\Event
 */
class EventDateColumnsTest extends TestCase
{
    /** @dataProvider dateColumnsProvider */
    public function testDateColumnsRespectLocaleAllDayAndFloatingTime(string $localeId, bool $allDay, string $expected): void
    {
        $previousApp = \Craft::$app;
        $previousYiiApp = \Yii::$app;
        $previousCalendar = Calendar::getInstance();
        $locale = new Locale($localeId);
        $app = $this->getMockBuilder(Application::class)->disableOriginalConstructor()->onlyMethods(['getFormattingLocale', 'getI18n'])->getMock();
        $app->method('getFormattingLocale')->willReturn($locale);
        $i18n = $this->createMock(I18N::class);
        $i18n->method('translate')->willReturnCallback(static fn ($category, $message) => $message);
        $app->method('getI18n')->willReturn($i18n);
        $app->timeZone = 'Pacific/Tahiti';
        $app->language = 'en-US';
        \Craft::$app = $app;
        \Yii::$app = $app;
        $formatter = $locale->getFormatter();
        $formatter->timeZone = 'Pacific/Tahiti';
        $settings = $this->createMock(SettingsService::class);
        $settings->method('getSettingsModel')->willReturn(new SettingsModel(['timeFormat' => SettingsModel::TIME_FORMAT_AUTO]));
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->set('settings', $settings);
        Calendar::setInstance($plugin);

        try {
            $event = $this->getMockBuilder(Event::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
            $event->startDate = new Carbon('2026-10-29 00:30:00', 'UTC');
            $event->endDate = $event->startDate->copy();
            $event->allDay = $allDay;

            foreach (['attributeHtml', 'tableAttributeHtml'] as $method) {
                foreach (['startDate', 'endDate'] as $attribute) {
                    $actual = (new \ReflectionMethod(Event::class, $method))->invoke($event, $attribute);
                    self::assertSame($expected, str_replace(["\u{202F}", "\u{00A0}"], ' ', $actual));
                }
            }
            self::assertSame('Pacific/Tahiti', $formatter->timeZone);
            self::assertSame('2026-10-29 00:30:00', $event->startDate->toDateTimeString());
        } finally {
            \Craft::$app = $previousApp;
            \Yii::$app = $previousYiiApp;
            Calendar::setInstance($previousCalendar);
        }
    }

    public static function dateColumnsProvider(): array
    {
        return [
            ['en-US', true, '10/29/2026'],
            ['en-US', false, '10/29/2026, 12:30 AM'],
            ['de-DE', true, '29.10.2026'],
            ['de-DE', false, '29.10.2026, 00:30'],
        ];
    }
}
