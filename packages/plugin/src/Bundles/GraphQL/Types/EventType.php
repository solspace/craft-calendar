<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types;

use craft\gql\GqlEntityRegistry;
use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\EventInterface;
use Solspace\Calendar\Elements\Event;

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

    public static function resolveType($element = null): string
    {
        if ($element instanceof Event) {
            return GqlEntityRegistry::prefixTypeName($element->getGqlTypeName());
        }

        return static::resolveType($element);
    }
}
