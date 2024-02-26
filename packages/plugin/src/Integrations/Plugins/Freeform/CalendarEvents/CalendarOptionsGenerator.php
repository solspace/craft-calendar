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

        $plugins = \Craft::$app->getPlugins();
        if ($plugins->isPluginInstalled('calendar') && $plugins->isPluginEnabled('calendar')) {
            $calendars = Calendar::getInstance()->calendars->getCalendars();
            foreach ($calendars as $calendar) {
                $options->add($calendar->id, $calendar->name);
            }
        }

        return $options;
    }
}
