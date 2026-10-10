<?php

namespace Solspace\Calendar\Resources\Bundles;

class CalendarViewBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        return [
            'js/scripts/calendars/main.js',
            'js/scripts/widgets/month.js',
        ];
    }
}
