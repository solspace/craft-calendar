<?php

namespace Solspace\Calendar\Resources\Bundles;

class EventEditBundle extends CalendarAssetBundle
{
    protected function getClientEntry(): ?string
    {
        return 'event-builder';
    }
}
