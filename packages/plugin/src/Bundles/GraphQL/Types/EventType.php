<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\EventInterface;

class EventType extends AbstractObjectType
{
    public static function getName(): string
    {
        return 'CalendarEventType';
    }

    public static function getTypeDefinition(): Type
    {
        return EventInterface::getType();
    }
}
