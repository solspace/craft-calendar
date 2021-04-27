<?php

namespace Solspace\Calendar\Resources\Bundles;

class CalendarIndexBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        return ['js/scripts/calendars/index.js'];
    }

    public function getStylesheets(): array
    {
        return ['css/calendars/index.css'];
    }
}
