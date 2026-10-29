<?php

namespace Solspace\Calendar\Bundles\Events;

use craft\events\ModelEvent;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use yii\base\Event;

class EventsBundle implements BundleInterface
{
    public function __construct()
    {
        Event::on(
            CalendarEvent::class,
            CalendarEvent::EVENT_AFTER_SAVE,
            static function (ModelEvent $event) {
                \Craft::$app->getElements()->invalidateCachesForElement($event->sender);
            }
        );

        Event::on(
            CalendarEvent::class,
            CalendarEvent::EVENT_AFTER_DELETE,
            static function (Event $event) {
                $element = $event->sender;

                if ($element instanceof CalendarEvent) {
                    \Craft::$app->getElements()->invalidateCachesForElement($element);
                }
            }
        );
    }
}
