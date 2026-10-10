<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\helpers\App;

class SolspaceAiAssetBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        $clientPath = App::env('CAL_CLIENT_PATH') ?? null;
        if ($clientPath) {
            return [$this->getClientScript($clientPath, 'solspaceai')];
        }

        return [
            'js/app/vendor.js',
            'js/app/solspaceai.js',
        ];
    }

    public function getStylesheets(): array
    {
        return [
            'css/solspaceai/solspaceai.css',
        ];
    }
}
