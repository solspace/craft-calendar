<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class MainAssetBundle extends CalendarAssetBundle
{
    /**
     * @return array
     */
    public function getStylesheets(): array
    {
        return ['css/src/main.css'];
    }
}
