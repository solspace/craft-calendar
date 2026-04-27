<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use craft\base\Element;
use craft\events\ElementEvent;
use craft\helpers\ElementHelper;
use craft\services\Elements;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Library\Helpers\DateHelper;
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

        Event::on(
            CalendarEvent::class,
            Element::EVENT_AFTER_DELETE,
            [$this, 'deleteOccurrences']
        );

        Event::on(
            CalendarEvent::class,
            Element::EVENT_AFTER_RESTORE,
            [$this, 'restoreOccurrences']
        );
    }

    public function persistOccurrences(ElementEvent $event): void
    {
        $element = $event->element;
        if (!$element instanceof CalendarEvent) {
            return;
        }

        if (ElementHelper::isDraftOrRevision($element)) {
            return;
        }

        $this->persistEventOccurrences($element);
    }

    public function deleteOccurrences(Event $event): void
    {
        $element = $event->sender;
        if (!$element instanceof CalendarEvent) {
            return;
        }

        OccurrenceRecord::deleteAll(['eventId' => $element->id]);
    }

    public function restoreOccurrences(Event $event): void
    {
        $element = $event->sender;
        if (!$element instanceof CalendarEvent) {
            return;
        }

        $this->persistEventOccurrences($element);
    }

    private function persistEventOccurrences(CalendarEvent $element): void
    {
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
            $occurrences = $rrule->getOccurrencesBefore(new Carbon('+50 years', DateHelper::UTC));
        } else {
            $occurrences = $rrule->getOccurrences();
        }

        foreach ($occurrences as $occurrence) {
            $occurrence = new Carbon($occurrence->format('Y-m-d H:i:s'), DateHelper::UTC);

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
