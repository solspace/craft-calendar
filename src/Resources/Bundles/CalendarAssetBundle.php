<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\web\assets\cp\CpAsset;
use Solspace\Commons\Resources\CpAssetBundle;
use yii\web\AssetBundle;

abstract class CalendarAssetBundle extends CpAssetBundle
{
    /**
     * @return string
     */
    protected function getSourcePath(): string
    {
        return '@Solspace/Calendar/Resources';
    }
}
