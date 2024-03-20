<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers;

use craft\gql\base\Resolver;
use GraphQL\Type\Definition\ResolveInfo;
use Solspace\Calendar\Calendar;

class SolspaceCalendarResolver extends Resolver
{
    public static function resolve(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): object
    {
        return (object) [
            'version' => Calendar::getInstance()->getVersion(),
        ];
    }
}
