<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class EventEditBundle extends CalendarAssetBundle
{
    /** @var string - worst hack ever made */
    static public $locale;

    /**
     * @return array
     */
    public function getScripts(): array
    {
        return [
            'js/src/event-edit.js',
            'js/event-builder/app.js',
        ];
    }
}
