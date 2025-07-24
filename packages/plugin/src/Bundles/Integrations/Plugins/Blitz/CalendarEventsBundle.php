<?php

namespace Solspace\Calendar\Bundles\Integrations\Plugins\Blitz;

use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use yii\base\Event;
use yii\base\ModelEvent;

class CalendarEventsBundle implements BundleInterface
{
    public function __construct()
    {
        $plugins = \Craft::$app->getPlugins();

        $blitzClass = 'putyourlightson\blitz\Blitz';
        $dummyPurgerClass = 'putyourlightson\blitz\drivers\purgers\DummyPurger';

        if (
            $plugins->isPluginInstalled('blitz')
            && $plugins->isPluginEnabled('blitz')
            && class_exists($blitzClass)
            && class_exists($dummyPurgerClass)
        ) {
            $purger = $blitzClass::$plugin->cachePurger;

            if (!$purger instanceof $dummyPurgerClass) {
                Event::on(
                    CalendarEvent::class,
                    CalendarEvent::EVENT_AFTER_SAVE,
                    function (ModelEvent $event) use ($purger) {
                        $purger->purgeElement($event->sender);
                    }
                );

                Event::on(
                    CalendarEvent::class,
                    CalendarEvent::EVENT_AFTER_DELETE,
                    function (ModelEvent $event) use ($purger) {
                        $purger->purgeElement($event->sender);
                    }
                );
            }
        }
    }
}
