<?php

namespace Solspace\Calendar\Resources\Bundles;

class ResourcesBundle extends CalendarAssetBundle
{
    /**
     * @inheritDoc
     */
    public function getStylesheets(): array
    {
        return ['css/src/controllers/resources/resources.css'];
    }
}
