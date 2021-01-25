<?php

namespace Solspace\Calendar\Resources\Bundles;

class CodePackBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        return [
            'js/scripts/code-packs/index.js',
        ];
    }

    public function getStylesheets(): array
    {
        return [
            'css/code-packs/code-pack.css',
        ];
    }
}
