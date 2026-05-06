<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\helpers\App;

class WidgetMiniBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        $clientPath = App::env('CAL_CLIENT_PATH') ?? null;
        if ($clientPath) {
            return [$this->getClientScript($clientPath, 'widget-mini')];
        }

        return [
            'js/app/vendor.js',
            'js/app/widget-mini.js',
        ];
    }
}
