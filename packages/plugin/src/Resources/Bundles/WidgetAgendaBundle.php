<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\helpers\App;

class WidgetAgendaBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        $clientPath = App::env('CAL_CLIENT_PATH') ?? null;
        if ($clientPath) {
            return [$this->getClientScript($clientPath)];
        }

        return [
            'js/app/vendor.js',
            'js/app/widget-agenda.js',
        ];
    }

    private function getClientScript(string $clientPath): array|string
    {
        $clientPath = rtrim($clientPath, '/');

        if (preg_match('/\.(?:m?js|tsx?)(?:\?.*)?$/', $clientPath)) {
            return [$clientPath, ['type' => 'module']];
        }

        return $clientPath.'/widget-agenda.js';
    }
}
