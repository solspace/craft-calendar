<?php

namespace Solspace\Calendar\Bundles\Integrations\Plugins\Blitz;

use putyourlightson\blitz\Blitz;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use yii\base\Event;
use yii\base\ModelEvent;

class CalendarEventsBundle implements BundleInterface
{
    public function __construct()
    {
        $plugins = \Craft::$app->getPlugins();

        if (
            $plugins->isPluginInstalled('blitz')
            && $plugins->isPluginEnabled('blitz')
            && class_exists(Blitz::class)
        ) {
            $dummyPurgerClass = 'putyourlightson\blitz\drivers\purgers\DummyPurger';
            $purger = Blitz::$plugin->cachePurger;

            if (!$purger instanceof $dummyPurgerClass) {
                Event::on(
                    CalendarEvent::class,
                    CalendarEvent::EVENT_AFTER_SAVE,
                    function (ModelEvent $event) {
                        Blitz::$plugin->refreshCache->addElement($event->sender);
                        Blitz::$plugin->refreshCache->refresh();
                    }
                );

                Event::on(
                    CalendarEvent::class,
                    CalendarEvent::EVENT_AFTER_DELETE,
                    function (ModelEvent $event) {
                        Blitz::$plugin->refreshCache->addElement($event->sender);
                        Blitz::$plugin->refreshCache->refresh();
                    }
                );
            }
        }
    }
}
