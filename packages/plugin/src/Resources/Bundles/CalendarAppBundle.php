<?php

namespace Solspace\Calendar\Resources\Bundles;

class CalendarAppBundle extends CalendarAssetBundle
{
    public function getStylesheets(): array
    {
        return [
            'css/app/app.css',
            'https://kit.fontawesome.com/0e31cd79e9.css',
        ];
    }

    protected function getClientEntry(): ?string
    {
        return 'app';
    }
}
