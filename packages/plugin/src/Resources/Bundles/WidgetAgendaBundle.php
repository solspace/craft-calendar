<?php

namespace Solspace\Calendar\Resources\Bundles;

class WidgetAgendaBundle extends CalendarAssetBundle
{
    protected function getClientEntry(): ?string
    {
        return 'widget-agenda';
    }
}
