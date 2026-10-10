<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use craft\base\Element;
use craft\events\DraftEvent;
use craft\helpers\ElementHelper;
use craft\services\Drafts;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use yii\base\Event;

class OccurrencePersistence implements BundleInterface
{
    private OccurrenceMaterializer $materializer;
    private OverrideReconciler $reconciler;

    public function __construct(?OccurrenceMaterializer $materializer = null)
    {
        $this->materializer = $materializer ?? new OccurrenceMaterializer();
        $this->reconciler = new OverrideReconciler($this->materializer);

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
            [$this, 'persistOccurrences']
        );

        Event::on(
            Drafts::class,
            Drafts::EVENT_BEFORE_APPLY_DRAFT,
            [$this, 'keepNewerLiveOverrides']
        );
    }

    public function persistOccurrences(Event $event): void
    {
        $element = $event->sender;
        if (!$element instanceof CalendarEvent || ElementHelper::isDraftOrRevision($element) || $element->propagating) {
            return;
        }

        $eventId = (int) $element->id;
        $locked = $this->materializer->acquireLock($eventId);

        try {
            // Before regenerating, while the occurrence rows still describe the previous schedule
            $this->reconciler->reconcile($element, $element->getScheduleShift());
            $element->setScheduleShift(null);

            $this->materializer->regenerate($element);
        } finally {
            if ($locked) {
                $this->materializer->releaseLock($eventId);
            }
        }
    }

    public function keepNewerLiveOverrides(DraftEvent $event): void
    {
        if ($event->draft instanceof CalendarEvent) {
            Calendar::getInstance()->occurrences->adoptNewerLiveOverrides($event->draft);
        }
    }

    public function deleteOccurrences(Event $event): void
    {
        $element = $event->sender;
        if (!$element instanceof CalendarEvent || ElementHelper::isDraftOrRevision($element)) {
            return;
        }

        $this->materializer->delete($element);
    }
}
