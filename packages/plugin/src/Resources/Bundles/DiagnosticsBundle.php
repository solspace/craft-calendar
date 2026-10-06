<?php

namespace Solspace\Calendar\Resources\Bundles;

class DiagnosticsBundle extends CalendarAssetBundle
{
    public function getStylesheets(): array
    {
        return ['css/diagnostics/diagnostics.css'];
    }

    public function getScripts(): array
    {
        return ['js/diagnostics.js'];
    }
}
