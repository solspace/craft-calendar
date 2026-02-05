<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
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

        $timeDelta = $element->startDate->diff($element->endDate);

        OccurrenceRecord::deleteAll(['eventId' => $element->id]);

        $rrule = $element->getRRuleObject();
        if (!$rrule) {
            $record = new OccurrenceRecord();
            $record->eventId = $element->id;
            $record->calendarId = $element->calendarId;
            $record->startDate = $element->startDate;
            $record->endDate = $element->startDate->clone()->add($timeDelta);
            $record->allDay = $element->allDay;
            $record->save();

            return;
        }

        if ($rrule->isInfinite()) {
            $occurrences = $rrule->getOccurrencesBefore(new Carbon("+50 years"));
        } else {
            $occurrences = $rrule->getOccurrences();
        }

        foreach ($occurrences as $occurrence) {
            $record = new OccurrenceRecord();
            $record->eventId = $element->id;
            $record->calendarId = $element->calendarId;
            $record->startDate = $occurrence;
            $record->endDate = $occurrence->add($timeDelta);
            $record->allDay = $element->allDay;
            $record->save();
        }
    }
}
