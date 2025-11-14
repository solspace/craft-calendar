<?php

namespace Solspace\Calendar\Integrations\Plugins\Freeform\CalendarEvents;

use Solspace\Calendar\Calendar;
use Solspace\Freeform\Attributes\Property\Implementations\Options\Option;
use Solspace\Freeform\Attributes\Property\Implementations\Options\OptionCollection;
use Solspace\Freeform\Attributes\Property\Implementations\Options\OptionsGeneratorInterface;
use Solspace\Freeform\Attributes\Property\Property;

class CalendarOptionsGenerator implements OptionsGeneratorInterface
{
    public function fetchOptions(?Property $property): OptionCollection
    {
        $options = new OptionCollection();

        $calendarPlugin = Calendar::getInstance();
        if ($calendarPlugin) {
            $calendars = $calendarPlugin->calendars->getCalendars();
            foreach ($calendars as $calendar) {
                $options->add(
                    new Option(
                        value: (string) $calendar->id,
                        label: $calendar->name
                    )
                );
            }
        }

        return $options;
    }
}
