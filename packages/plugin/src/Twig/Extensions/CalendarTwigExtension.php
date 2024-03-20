<?php

namespace Solspace\Calendar\Twig\Extensions;

use Twig\Extension\AbstractExtension;

class CalendarTwigExtension extends AbstractExtension
{
    public function getTokenParsers(): array
    {
        return [
            new RequireEventEditPermissions_TokenParser(),
        ];
    }
}
