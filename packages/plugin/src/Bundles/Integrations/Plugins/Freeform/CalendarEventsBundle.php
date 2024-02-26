<?php

namespace Solspace\Calendar\Bundles\Integrations\Plugins\Freeform;

use Solspace\Calendar\Integrations\Plugins\Freeform\CalendarEvents\CalendarEvents;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Freeform\Events\Integrations\RegisterIntegrationTypesEvent;
use Solspace\Freeform\Services\Integrations\IntegrationsService;
use yii\base\Event;

class CalendarEventsBundle implements BundleInterface
{
    public function __construct()
    {
        Event::on(
            IntegrationsService::class,
            IntegrationsService::EVENT_REGISTER_INTEGRATION_TYPES,
            function (RegisterIntegrationTypesEvent $event) {
                $plugins = \Craft::$app->getPlugins();
                if ($plugins->isPluginInstalled('freeform') && $plugins->isPluginEnabled('freeform')) {
                    $event->addType(CalendarEvents::class);
                }
            }
        );
    }
}
