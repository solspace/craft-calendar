<?php

namespace Solspace\Tests\Unit\Calendar\Models;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Models\SettingsModel;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Models\SettingsModel
 */
class SettingsModelTest extends TestCase
{
    public function testOverviewDefaultsToMonth(): void
    {
        $settings = new SettingsModel();

        self::assertSame('month', $settings->getDefaultCalendarView());
        self::assertTrue($settings->validate(['defaultCalendarView']));
    }

    public function testConfiguredTabsAreRetainedAndValidated(): void
    {
        foreach (['day', 'week', 'month', 'year', 'agenda'] as $tab) {
            $settings = new SettingsModel(['defaultCalendarView' => $tab]);

            self::assertSame($tab, $settings->getDefaultCalendarView());
            self::assertTrue($settings->validate(['defaultCalendarView']));
        }
    }

    public function testInvalidTabsFallBackToMonthAndCannotBeSaved(): void
    {
        foreach (['invalid', ''] as $tab) {
            $settings = new SettingsModel(['defaultCalendarView' => $tab]);

            self::assertSame('month', $settings->getDefaultCalendarView());
            self::assertFalse($settings->validate(['defaultCalendarView']));
            self::assertTrue($settings->hasErrors('defaultCalendarView'));
        }
    }
}
