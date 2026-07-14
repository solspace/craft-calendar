<?php

namespace Solspace\Calendar\Bundles\GraphQL\Queries;

use craft\gql\base\Query;
use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Arguments\CalendarArguments;
use Solspace\Calendar\Bundles\GraphQL\Arguments\EventArguments;
use Solspace\Calendar\Bundles\GraphQL\Arguments\OccurrenceArguments;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\CalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\EventInterface;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\OccurrenceInterface;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\CalendarResolver;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\EventResolver;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\OccurrenceResolver;

class CalendarQuery extends Query
{
    public static function getQueries(bool $checkToken = true): array
    {
        $queries = [];

        if (!$checkToken || GqlPermissions::canQueryCalendars()) {
            $queries['calendars'] = [
                'name' => 'calendars',
                'type' => Type::listOf(CalendarInterface::getType()),
                'args' => CalendarArguments::getArguments(),
                'resolve' => CalendarResolver::class.'::resolve',
                'description' => 'This query is used to query Calendars',
            ];
            $queries['calendar'] = [
                'name' => 'calendar',
                'type' => CalendarInterface::getType(),
                'args' => CalendarArguments::getArguments(),
                'resolve' => CalendarResolver::class.'::resolveOne',
                'description' => 'This query is used to query a single Calendar',
            ];
        }

        if (!$checkToken || GqlPermissions::canQueryEvents()) {
            $queries['events'] = [
                'name' => 'events',
                'type' => Type::listOf(EventInterface::getType()),
                'args' => EventArguments::getArguments(),
                'resolve' => EventResolver::class.'::resolve',
                'description' => 'This query is used to query Events',
            ];
            $queries['eventCount'] = [
                'name' => 'eventCount',
                'type' => Type::nonNull(Type::int()),
                'args' => EventArguments::getArguments(),
                'resolve' => EventResolver::class.'::resolveCount',
                'description' => 'This query is used to return the number of Events.',
            ];
            $queries['event'] = [
                'name' => 'event',
                'type' => EventInterface::getType(),
                'args' => EventArguments::getArguments(),
                'resolve' => EventResolver::class.'::resolveOne',
                'description' => 'This query is used to query a single Event',
            ];
            $queries['occurrences'] = [
                'name' => 'occurrences',
                'type' => Type::listOf(OccurrenceInterface::getType()),
                'args' => OccurrenceArguments::getArguments(),
                'resolve' => OccurrenceResolver::class.'::resolve',
                'description' => 'This query is used to query Occurrences',
            ];
            $queries['occurrenceCount'] = [
                'name' => 'occurrenceCount',
                'type' => Type::nonNull(Type::int()),
                'args' => OccurrenceArguments::getArguments(),
                'resolve' => OccurrenceResolver::class.'::resolveCount',
                'description' => 'This query is used to return the number of Occurrences',
            ];
            $queries['occurrence'] = [
                'name' => 'occurrence',
                'type' => OccurrenceInterface::getType(),
                'resolve' => OccurrenceResolver::class.'::resolveOne',
                'args' => OccurrenceArguments::getArguments(),
                'description' => 'This query is used to query a single Occurrence',
            ];
        }

        return $queries;
    }
}
