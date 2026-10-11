<?php

namespace Solspace\Calendar\Twig\Extensions;

use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Variables\CalendarVariable;
use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;
use Twig\TwigFilter;

class CalendarGlobalExtension extends AbstractExtension implements GlobalsInterface
{
    public function getFilters(): array
    {
        return [new TwigFilter('calendarTimeLabel', [DateFormatHelper::class, 'compactTimeLabel'])];
    }

    public function getGlobals(): array
    {
        return ['calendar' => new CalendarVariable()];
    }
}
