<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers;

use craft\gql\base\Resolver;
use GraphQL\Type\Definition\ResolveInfo;
use Solspace\Calendar\Calendar;

class SolspaceCalendarResolver extends Resolver
{
    public static function resolve($source, array $arguments, $context, ResolveInfo $resolveInfo)
    {
        return (object) [
            'version' => Calendar::getInstance()->getVersion(),
        ];
    }
}
