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

    public function testResourceNamesRoundTripRemainLiteralAndFallBackWhenBlank(): void
    {
        $settings = new SettingsModel(['bookingResourceLabelSingular' => '  Dining Hall  ', 'bookingResourceLabelPlural' => 'Dining Halls']);
        self::assertTrue($settings->validate(['bookingResourceLabelSingular', 'bookingResourceLabelPlural']));
        $loaded = new SettingsModel($settings->toArray());
        self::assertSame('Dining Hall', $loaded->getBookingResourceLabels()['singular']);
        self::assertSame('All Dining Halls', $loaded->getBookingResourceLabels()['all']);
        self::assertSame('By Dining Hall', $loaded->getBookingResourceLabels()['by']);
        self::assertSame('Choose Dining Hall', $loaded->getBookingResourceLabels()['choose']);
        $loaded->bookingResourceLabelSingular = '{{ customer }}';
        self::assertSame('{{ customer }}', $loaded->getBookingResourceLabels()['singular']);
        self::assertSame('Choose {{ customer }}', $loaded->getBookingResourceLabels()['choose']);
        $loaded->bookingResourceLabelSingular = ' ';
        $loaded->bookingResourceLabelPlural = null;
        self::assertSame((new SettingsModel())->getBookingResourceLabels(), $loaded->getBookingResourceLabels());
        $loaded->bookingResourceLabelPlural = str_repeat('x', 101);
        self::assertFalse($loaded->validate(['bookingResourceLabelPlural']));
    }

    public function testBookingSubpageDefaultsAndValidation(): void
    {
        $settings = new SettingsModel();
        self::assertSame('bookings', $settings->defaultBookingView);
        self::assertSame('calendar/bookings', $settings->getBookingDefaultPath());
        self::assertTrue($settings->validate(['defaultBookingView']));
        $settings->setAttributes(['defaultBookingView' => 'schedule']);
        self::assertSame('schedule', $settings->toArray()['defaultBookingView']);
        self::assertSame('calendar/bookings/schedule', $settings->getBookingDefaultPath());
        self::assertTrue($settings->validate(['defaultBookingView']));
        $settings->setAttributes(['defaultBookingView' => 'requests']);
        self::assertSame('requests', $settings->toArray()['defaultBookingView']);
        self::assertSame('calendar/bookings/requests', $settings->getBookingDefaultPath());
        self::assertTrue($settings->validate(['defaultBookingView']));
        foreach (['invalid', ''] as $value) {
            $settings->defaultBookingView = $value;
            self::assertFalse($settings->validate(['defaultBookingView']));
            self::assertTrue($settings->hasErrors('defaultBookingView'));
            self::assertSame('calendar/bookings', $settings->getBookingDefaultPath());
        }
    }

    public function testBookingScheduleLayoutDefaultsAndConfigurationRoundTrip(): void
    {
        $settings = new SettingsModel();
        self::assertSame('combined', $settings->defaultBookingScheduleLayout);
        self::assertSame('combined', $settings->getBookingScheduleLayout());
        self::assertTrue($settings->validate(['defaultBookingScheduleLayout']));
        $settings->setAttributes(['defaultBookingScheduleLayout' => 'calendars']);
        self::assertSame('calendars', $settings->toArray()['defaultBookingScheduleLayout']);
        $loaded = new SettingsModel($settings->toArray());
        self::assertSame('calendars', $loaded->getBookingScheduleLayout());
        self::assertTrue($loaded->validate(['defaultBookingScheduleLayout']));
        foreach (['invalid', ''] as $value) {
            $loaded->defaultBookingScheduleLayout = $value;
            self::assertFalse($loaded->validate(['defaultBookingScheduleLayout']));
            self::assertTrue($loaded->hasErrors('defaultBookingScheduleLayout'));
            self::assertSame('combined', $loaded->getBookingScheduleLayout());
        }
    }

    public function testExplicitScheduleLayoutsOverrideTheDefaultAndInvalidSelectionsFallBack(): void
    {
        foreach (['combined', 'calendars'] as $default) {
            $settings = new SettingsModel(['defaultBookingScheduleLayout' => $default]);
            foreach (['combined', 'calendars'] as $selection) {
                self::assertSame($selection, $settings->getBookingScheduleLayout($selection));
            }
            foreach ([null, '', 'invalid', ['calendars']] as $selection) {
                self::assertSame($default, $settings->getBookingScheduleLayout($selection));
            }
        }
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
