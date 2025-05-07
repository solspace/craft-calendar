<?php

namespace Solspace\Calendar\Resources\Bundles;

class EventFieldTypeBundle extends CalendarAssetBundle
{
    /** @var null|string - worst hack ever made */
    public static ?string $locale = null;

    public function getScripts(): array
    {
        return [
            'js/event-field-type.js',
        ];
    }
}
