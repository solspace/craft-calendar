<?php

namespace Solspace\Calendar\Resources\Bundles;

class WidgetEventsBundle extends CalendarAssetBundle
{
    protected function getClientEntry(): ?string
    {
        return 'widget-event';
    }
}
