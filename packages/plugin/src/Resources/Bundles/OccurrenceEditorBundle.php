<?php

namespace Solspace\Calendar\Resources\Bundles;

class OccurrenceEditorBundle extends CalendarAssetBundle
{
    public function getStylesheets(): array
    {
        return ['css/occurrence-editor/occurrence-editor.css'];
    }

    public function getScripts(): array
    {
        return ['js/occurrence-editor.js'];
    }
}
