<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use craft\base\Element;
use craft\events\ModelEvent;
use craft\helpers\ElementHelper;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use yii\base\Event;

class OccurrencePersistence implements BundleInterface
{
    private OccurrenceMaterializer $materializer;

    public function __construct(?OccurrenceMaterializer $materializer = null)
    {
        $this->materializer = $materializer ?? new OccurrenceMaterializer();

        // After propagation rather than after save: duplicating an event (which is also how a draft
        // is published) only carries its occurrence overrides over once it's fully propagated
        Event::on(
            CalendarEvent::class,
            Element::EVENT_AFTER_PROPAGATE,
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

    public function persistOccurrences(ModelEvent $event): void
    {
        $element = $event->sender;
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
