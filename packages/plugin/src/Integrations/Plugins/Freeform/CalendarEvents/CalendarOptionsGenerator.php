<?php

namespace Solspace\Calendar\Integrations\Plugins\Freeform\CalendarEvents;

use Solspace\Calendar\Calendar;
use Solspace\Freeform\Attributes\Property\Implementations\Options\OptionCollection;
use Solspace\Freeform\Attributes\Property\Implementations\Options\OptionsGeneratorInterface;
use Solspace\Freeform\Attributes\Property\Property;

class CalendarOptionsGenerator implements OptionsGeneratorInterface
{
    public function fetchOptions(?Property $property): OptionCollection
    {
        $options = new OptionCollection();

        $calendar = Calendar::getInstance();
        if ($calendar) {
            $calendars = $calendar->calendars->getCalendars();
            foreach ($calendars as $calendar) {
                $options->add($calendar->id, $calendar->name);
            }
        }

        return $options;
    }
}
