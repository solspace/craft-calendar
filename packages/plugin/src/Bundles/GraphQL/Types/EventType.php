<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types;

use craft\gql\GqlEntityRegistry;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\EventInterface;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\EventResolver;
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

    public static function resolveType(mixed $context = null): string
    {
        if ($context instanceof Event) {
            return GqlEntityRegistry::prefixTypeName($context->getGqlTypeName());
        }

        return parent::resolveType($context);
    }

    protected function resolve(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): mixed
    {
        if ('series' === $resolveInfo->fieldName && $source instanceof Event) {
            return EventResolver::applyCalendarPermissionsToValue($source->getSeries());
        }

        return parent::resolve($source, $arguments, $context, $resolveInfo);
    }
}
