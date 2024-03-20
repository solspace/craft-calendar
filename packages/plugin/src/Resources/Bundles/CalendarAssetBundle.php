<?php

namespace Solspace\Calendar\Resources\Bundles;

abstract class CalendarAssetBundle extends CpAssetBundle
{
    protected function getSourcePath(): string
    {
        return '@Solspace/Calendar/Resources';
    }
}
