<?php

namespace Solspace\Calendar\Resources\Bundles;

class EventIndexBundle extends CalendarAssetBundle
{
    /** @var string - worst hack ever made */
    public static $locale;

    public function getScripts(): array
    {
        return [
            'js/scripts/events/index.js',
        ];
    }
}
