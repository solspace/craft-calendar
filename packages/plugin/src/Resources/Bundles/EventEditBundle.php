<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\helpers\App;

class EventEditBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        $clientPath = App::env('CAL_CLIENT_PATH') ?? null;
        if ($clientPath) {
            return [$clientPath.'/event-builder.js'];
        }

        return [
            'js/event-builder/vendor.js',
            'js/event-builder/event-builder.js',
        ];
    }
}
