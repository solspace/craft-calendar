<?php

namespace Solspace\Calendar\Resources\Bundles;

class OverviewBundle extends CalendarAssetBundle
{
    public function getStylesheets(): array
    {
        return [
            'css/overview/overview.css',
            'https://kit.fontawesome.com/0e31cd79e9.css',
        ];
    }

    protected function getClientEntry(): ?string
    {
        return 'overview';
    }
}
