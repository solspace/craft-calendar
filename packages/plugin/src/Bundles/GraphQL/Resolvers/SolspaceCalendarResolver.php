<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers;

use craft\gql\base\Resolver;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * @deprecated 6.0.0 Use the root-level CalendarResolver instead.
 * Will be removed in 7.0.0.
 */
class SolspaceCalendarResolver extends Resolver
{
    public static function resolve(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): object
    {
        return (object) [];
    }
}
