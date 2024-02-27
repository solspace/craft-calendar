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
                $event->addType(CalendarEvents::class);
            }
        );
    }
}
