<?php

namespace Solspace\Calendar\Resources\Bundles;

class WidgetMiniBundle extends CalendarAssetBundle
{
    protected function getClientEntry(): ?string
    {
        return 'widget-mini';
    }
}
