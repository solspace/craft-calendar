<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class CalendarIndexBundle extends CalendarAssetBundle
{
    /**
     * @return array
     */
    public function getScripts(): array
    {
        return ['js/src/calendar-index.js'];
    }
}
