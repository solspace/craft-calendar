<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers;

use craft\gql\base\Resolver;
use GraphQL\Type\Definition\ResolveInfo;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Calendar;

class CalendarResolver extends Resolver
{
    public static function resolve($source, array $arguments, $context, ResolveInfo $resolveInfo)
    {
        $arguments = self::getArguments($arguments);

        return Calendar::getInstance()->calendars->getResolvedCalendars($arguments);
    }

    public static function resolveOne($source, array $arguments, $context, ResolveInfo $resolveInfo)
    {
        $arguments = self::getArguments($arguments);
        $arguments['limit'] = 1;

        $calendars = Calendar::getInstance()->calendars->getResolvedCalendars($arguments);
        $calendar = reset($calendars);

        return $calendar ?: null;
    }

    private static function getArguments(array $arguments)
    {
        $calendarUids = GqlPermissions::allowedCalendarUids();
        if ($calendarUids) {
            $arguments['uid'] = $calendarUids;
        }

        return $arguments;
    }
}
