<?php

namespace Solspace\Calendar\Bundles\Integrations\Plugins\Freeform;

use Solspace\Calendar\Integrations\Plugins\Freeform\CalendarEvents\CalendarEvents;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use yii\base\Event;

class CalendarEventsBundle implements BundleInterface
{
    public function __construct()
    {
        $plugins = \Craft::$app->getPlugins();
        $freeform = $plugins->getStoredPluginInfo('freeform');

        $integrationsServiceClass = 'Solspace\Freeform\Services\Integrations\IntegrationsService';
        $registerIntegrationTypesEventClass = 'Solspace\Freeform\Events\Integrations\RegisterIntegrationTypesEvent';

        if (
            $plugins->isPluginInstalled('freeform')
            && $plugins->isPluginEnabled('freeform')
            && class_exists($integrationsServiceClass)
            && class_exists($registerIntegrationTypesEventClass)
            && $freeform
            && $freeform['version'] >= '5.0.0'
        ) {
            Event::on(
                $integrationsServiceClass,
                \constant("{$integrationsServiceClass}::EVENT_REGISTER_INTEGRATION_TYPES"),
                static function ($event) {
                    $event->addType(CalendarEvents::class);
                }
            );
        }
    }
}
