<?php

namespace Solspace\Calendar\Resources\Bundles;

class WidgetUpcomingEventsBundle extends CalendarAssetBundle
{
    /**
     * @return array
     */
    public function getStylesheets(): array
    {
        return ['css/src/widget/upcoming-events.css'];
    }
}