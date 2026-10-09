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
    public function testCancelledEventsRemainVisibleByDefaultAndCanBeHidden(): void
    {
        self::assertTrue((new SettingsModel())->showCancelledEvents);
        self::assertFalse((new SettingsModel(['showCancelledEvents' => false]))->showCancelledEvents);
    }

    public function testOverviewDefaultsToMonth(): void
    {
        $settings = new SettingsModel();

        self::assertSame('month', $settings->getDefaultCalendarView());
        self::assertTrue($settings->validate(['defaultCalendarView']));
        self::assertSame(SettingsModel::CALENDAR_VIEWS, $settings->getEnabledCalendarViews());
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

    public function testVisibleTabsKeepDisplayOrderAndDefaultMustBeVisible(): void
    {
        $settings = new SettingsModel([
            'enabledCalendarViews' => ['agenda', 'week'],
            'defaultCalendarView' => 'agenda',
        ]);
        self::assertSame(['week', 'agenda'], $settings->getEnabledCalendarViews());
        self::assertTrue($settings->validate());

        $settings->defaultCalendarView = 'month';
        self::assertSame('week', $settings->getDefaultCalendarView());
        self::assertFalse($settings->validate());
        self::assertTrue($settings->hasErrors('defaultCalendarView'));
    }

    public function testEmptyAndUnknownViewsCannotBeSaved(): void
    {
        foreach (['', [], ['invalid'], ['month', 'invalid']] as $enabled) {
            $settings = new SettingsModel(['enabledCalendarViews' => $enabled]);
            self::assertFalse($settings->validate());
            self::assertTrue($settings->hasErrors('enabledCalendarViews'));
            self::assertNotEmpty($settings->getEnabledCalendarViews());
        }
    }

    public function testRemovedBannerSettingIsIgnoredWhenLoadingOldConfiguration(): void
    {
        $settings = new SettingsModel();
        $settings->setAttributes(['demoBannerDisabled' => true, 'defaultCalendarView' => 'agenda'], false);
        self::assertSame('agenda', $settings->getDefaultCalendarView());
        self::assertArrayNotHasKey('demoBannerDisabled', $settings->toArray());
    }
}
