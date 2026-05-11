<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\helpers\App;

class WidgetEventsBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        $clientPath = App::env('CAL_CLIENT_PATH') ?? null;
        if ($clientPath) {
            return [$this->getClientScript($clientPath, 'widget-event')];
        }

        return [
            'js/app/vendor.js',
            'js/app/widget-event.js',
        ];
    }
}
