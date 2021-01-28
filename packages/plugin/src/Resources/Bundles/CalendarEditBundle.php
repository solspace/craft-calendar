<?php

namespace Solspace\Calendar\Resources\Bundles;

class CalendarEditBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        return ['js/scripts/calendars/edit.js'];
    }
}
