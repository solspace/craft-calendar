<?php

namespace Solspace\Calendar\Resources\Bundles;

class CalendarAppBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        $scripts = [
            //'js/app/calendar-app.js',
        ];

        return $scripts;
    }

    public function getStylesheets(): array
    {
        return [];
    }
}
