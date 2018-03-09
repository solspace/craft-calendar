<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class EventEditBundle extends CalendarAssetBundle
{
    /**
     * @return array
     */
    public function getScripts(): array
    {
        return [
            'js/lib/fullcalendar/lib/moment.min.js',
            'js/src/event-edit.js',
        ];
    }

    /**
     * @return array
     */
    public function getStylesheets(): array
    {
        return ['css/src/event-edit.css'];
    }
}
