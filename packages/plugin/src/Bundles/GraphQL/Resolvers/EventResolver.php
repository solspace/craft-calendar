<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers;

use craft\base\ElementInterface;
use craft\gql\base\Resolver;
use GraphQL\Type\Definition\ResolveInfo;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\CalendarModel;

class EventResolver extends Resolver
{
    public static function resolve($source, array $arguments, $context, ResolveInfo $resolveInfo)
    {
        $arguments = self::getArguments($arguments);
        if ($source instanceof CalendarModel) {
            $arguments['calendarId'] = $source->id;
        } elseif ($source instanceof ElementInterface) {
            $fieldName = $resolveInfo->fieldName;

            return $source->{$fieldName};
        }

        return Calendar::getInstance()->events->getEventQuery($arguments)->all();
    }

    public static function resolveOne($source, array $arguments, $context, ResolveInfo $resolveInfo)
    {
        $arguments = self::getArguments($arguments);

        return Calendar::getInstance()->events->getEventQuery($arguments)->one();
    }

    private static function getArguments(array $arguments)
    {
        $calendarUids = GqlPermissions::allowedCalendarUids();
        if ($calendarUids) {
            $arguments['calendarUid'] = $calendarUids;
        }

        return $arguments;
    }
}
