<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class CodePackBundle extends CalendarAssetBundle
{
    /**
     * @return array
     */
    public function getScripts(): array
    {
        return [
            'js/src/code-pack.js',
        ];
    }

    /**
     * @return array
     */
    public function getStylesheets(): array
    {
        return [
            'css/src/code-pack.css',
        ];
    }
}
