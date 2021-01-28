<?php

namespace Solspace\Calendar\Resources\Bundles;

class WidgetEventsBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        return ['js/scripts/widgets/event.js'];
    }

    public function getStylesheets(): array
    {
        return ['css/widgets/event.css'];
    }
}
