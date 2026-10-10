<?php

namespace Solspace\Calendar\Resources\Bundles;

class SolspaceAiAssetBundle extends CalendarAssetBundle
{
    public function getStylesheets(): array
    {
        return [
            'css/solspaceai/solspaceai.css',
        ];
    }

    protected function getClientEntry(): ?string
    {
        return 'solspaceai';
    }
}
