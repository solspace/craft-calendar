<?php

namespace Solspace\Tests\Unit\Calendar\Widgets;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Widgets\AgendaWidget;
use Solspace\Calendar\Widgets\EventWidget;

/** @coversNothing */
class WidgetSettingsTest extends TestCase
{
    public function testLegacyAgendaWidgetsKeepAllModesAndTheirSavedView(): void
    {
        $widget = new AgendaWidget(['view' => 'week']);
        self::assertSame(AgendaWidget::VIEWS, $widget->getEnabledViews());
        self::assertSame('week', $widget->getDefaultView());
    }

    public function testEnabledViewsAndDefaultSurviveSavingSettings(): void
    {
        $widget = new AgendaWidget(['view' => 'agenda', 'enabledViews' => ['agenda', 'week']]);
        self::assertTrue($widget->validate());
        $loaded = new AgendaWidget($widget->getSettings());
        self::assertSame(['week', 'agenda'], $loaded->getEnabledViews());
        self::assertSame('agenda', $loaded->getDefaultView());
        $loaded->view = 'month';
        self::assertSame('week', $loaded->getDefaultView());
        self::assertFalse($loaded->validate());
        self::assertTrue($loaded->hasErrors('view'));
    }

    public function testEmptyAndUnknownModesAreRejectedWithSafeRenderingFallbacks(): void
    {
        foreach (['', [], ['invalid'], ['day', 'invalid']] as $enabled) {
            $widget = new AgendaWidget(['view' => 'day', 'enabledViews' => $enabled]);
            self::assertFalse($widget->validate());
            self::assertTrue($widget->hasErrors('enabledViews'));
            self::assertNotEmpty($widget->getEnabledViews());
        }
    }

    public function testEventWidgetTitleCalendarSelectionAndFeatureSettingsRoundTrip(): void
    {
        $widget = new EventWidget([
            'title' => 'Team quick create', 'calendars' => ['1', '3'], 'siteId' => 2,
            'showRepeating' => false, 'showDetails' => false,
            'showOverlapWarnings' => false, 'showMoreDetails' => false,
        ]);
        self::assertTrue($widget->validate());
        $loaded = new EventWidget($widget->getSettings());
        self::assertSame('Team quick create', $loaded->getTitle());
        self::assertSame(['1', '3'], $loaded->calendars);
        self::assertSame(2, $loaded->siteId);
        self::assertFalse($loaded->showRepeating);
        self::assertFalse($loaded->showDetails);
        self::assertFalse($loaded->showOverlapWarnings);
        self::assertFalse($loaded->showMoreDetails);
        $loaded->calendars = [];
        self::assertFalse($loaded->validate());
    }
}
