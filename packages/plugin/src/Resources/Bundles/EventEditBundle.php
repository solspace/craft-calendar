<?php

namespace Solspace\Calendar\Resources\Bundles;

class EventEditBundle extends CalendarAssetBundle
{
    /** @var null|string - worst hack ever made */
    public static ?string $locale = null;

    public function getScripts(): array
    {
        return [
            'js/scripts/events/edit.js',
            'js/event-builder/vendor.js',
            'js/event-builder/app.js',
        ];
    }
}
