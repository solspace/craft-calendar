<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\helpers\App;

class CalendarAppBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        $clientPath = App::env('CAL_CLIENT_PATH') ?? null;
        if ($clientPath) {
            return [$clientPath];
        }

        return [
            'js/app/vendor.js',
            'js/app/app.js',
        ];
    }

    public function getStylesheets(): array
    {
        return [
            'https://kit.fontawesome.com/0e31cd79e9.css',
        ];
    }
}
