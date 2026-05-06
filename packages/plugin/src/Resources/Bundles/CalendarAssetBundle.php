<?php

namespace Solspace\Calendar\Resources\Bundles;

abstract class CalendarAssetBundle extends CpAssetBundle
{
    protected function getSourcePath(): string
    {
        return '@Solspace/Calendar/Resources';
    }

    protected function getClientScript(string $clientPath, string $entry): string
    {
        return rtrim($clientPath, '/').'/'.$entry.'.js';
    }
}
