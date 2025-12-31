<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use craft\events\ElementEvent;
use craft\services\Elements;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Records\OccurrenceRecord;
use yii\base\Event;

class OccurrencePersistence implements BundleInterface
{
    public function __construct()
    {
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_SAVE_ELEMENT,
            [$this, 'persistOccurrences']
        );
    }

    public function persistOccurrences(ElementEvent $event): void
    {
        $element = $event->element;
        if (!$element instanceof CalendarEvent) {
            return;
        }

        if ($element->propagating) {
            return;
        }

        $rrule = $element->getRRuleObject();
        if (!$rrule) {
            $record = new OccurrenceRecord();
            $record->eventId = $element->id;
            $record->calendarId = $element->calendarId;
            $record->startUtc = $element->startDate;
        }

        $occurrences = $rrule->getOccurrences(5);
        foreach ($occurrences as $occurrence) {
            $record = new OccurrenceRecord();
            $record->eventId = $element->id;
            $record->calendarId = $element->calendarId;
            $record->startUtc = $occurrence;
            //$record->save();
        }

        // magic here
    }
}
