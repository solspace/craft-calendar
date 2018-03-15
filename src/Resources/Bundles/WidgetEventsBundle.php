<?php

namespace Solspace\Calendar\Resources\Bundles;

class WidgetEventsBundle extends CalendarAssetBundle
{
    /**
     * @return array
     */
    public function getScripts(): array
    {
        return ['js/src/widget/event.js'];
    }

    /**
     * @return array
     */
    public function getStylesheets(): array
    {
        return ['css/src/widget/event.css'];
    }
}