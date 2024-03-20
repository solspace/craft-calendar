<?php

namespace Solspace\Calendar\Resources\Bundles;

class EventIndexBundle extends CalendarAssetBundle
{
    /** @var null|string - worst hack ever made */
    public static ?string $locale = null;

    public function getScripts(): array
    {
        return [
            'js/scripts/events/index.js',
        ];
    }
}
