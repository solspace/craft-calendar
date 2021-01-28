<?php

namespace Solspace\Calendar\Resources\Bundles;

use Solspace\Commons\Resources\CpAssetBundle;

abstract class CalendarAssetBundle extends CpAssetBundle
{
    protected function getSourcePath(): string
    {
        return '@Solspace/Calendar/Resources';
    }
}
