<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use craft\base\Element;
use craft\events\ElementEvent;
use craft\helpers\ElementHelper;
use craft\services\Elements;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use yii\base\Event;

class OccurrencePersistence implements BundleInterface
{
    private OccurrenceMaterializer $materializer;

    public function __construct(?OccurrenceMaterializer $materializer = null)
    {
        $this->materializer = $materializer ?? new OccurrenceMaterializer();

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

        $this->materializer->delete($element);
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

        $this->materializer->regenerate($element);
    }
}
