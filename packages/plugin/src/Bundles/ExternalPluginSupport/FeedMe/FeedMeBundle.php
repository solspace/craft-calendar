<?php

namespace Solspace\Calendar\Bundles\ExternalPluginSupport\FeedMe;

use craft\feedme\events\RegisterFeedMeElementsEvent;
use craft\feedme\services\Elements;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use yii\base\Event;

class FeedMeBundle implements BundleInterface
{
    public function __construct()
    {
        if (class_exists('craft\feedme\Plugin')) {
            Event::on(
                Elements::class,
                Elements::EVENT_REGISTER_FEED_ME_ELEMENTS,
                function (RegisterFeedMeElementsEvent $event) {
                    $event->elements[] = CalendarIntegration::class;
                }
            );
        }
    }
}
