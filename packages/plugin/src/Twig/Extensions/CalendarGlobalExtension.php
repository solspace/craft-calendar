<?php

namespace Solspace\Calendar\Twig\Extensions;

use Solspace\Calendar\Variables\CalendarVariable;
use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;

class CalendarGlobalExtension extends AbstractExtension implements GlobalsInterface
{
    public function getGlobals(): array
    {
        return ['calendar' => new CalendarVariable()];
    }
}
