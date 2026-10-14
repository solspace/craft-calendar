<?php

namespace Solspace\Calendar\Resources\Bundles;

class CalendarIndexBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        return ['js/scripts/calendars/index.js'];
    }

    protected function getClientEntry(): ?string
    {
        return 'calendars-ai';
    }
}
