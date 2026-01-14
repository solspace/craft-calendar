<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers;

use craft\base\ElementInterface;
use craft\gql\base\ElementResolver;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\CalendarModel;

class EventResolver extends ElementResolver
{
    public static function prepareQuery(mixed $source, array $arguments, ?string $fieldName = null): mixed
    {
        $arguments = self::getArguments($arguments);

        if ($source instanceof CalendarModel) {
            $arguments['calendarId'] = $source->id;
        } elseif ($source instanceof ElementInterface && null !== $fieldName) {
            return $source->{$fieldName};
        }

        return Calendar::getInstance()->events->getEventQuery($arguments);
    }

    private static function getArguments(array $arguments): array
    {
        $calendarUids = GqlPermissions::allowedCalendarUids();
        if ($calendarUids) {
            $arguments['calendarUid'] = $calendarUids;
        }

        return $arguments;
    }
}
