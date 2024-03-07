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
        $plugins = \Craft::$app->getPlugins();
        $freeform = $plugins->getStoredPluginInfo('freeform');
        if ($plugins->isPluginInstalled('freeform') && $plugins->isPluginEnabled('freeform') && $freeform && $freeform['version'] >= '5.0.0') {
            Event::on(
                IntegrationsService::class,
                IntegrationsService::EVENT_REGISTER_INTEGRATION_TYPES,
                function (RegisterIntegrationTypesEvent $event) {
                    $event->addType(CalendarEvents::class);
                }
            );
        }
    }
}
