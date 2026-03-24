<?php

namespace Solspace\Calendar\Bundles\GraphQL\Arguments;

use craft\gql\base\Arguments;
use GraphQL\Type\Definition\Type;

class OccurrenceArguments extends Arguments
{
    public static function getArguments(): array
    {
        return array_merge(
            parent::getArguments(),
            [
                'id' => [
                    'name' => 'id',
                    'type' => Type::listOf(Type::string()),
                    'description' => 'Filter occurrences by occurrence ID',
                ],
                'uid' => [
                    'name' => 'uid',
                    'type' => Type::listOf(Type::string()),
                    'description' => 'Filter occurrences by occurrence UID',
                ],
                'event' => [
                    'name' => 'event',
                    'type' => Type::listOf(Type::int()),
                    'description' => 'Filter occurrences by parent event ID',
                ],
                'calendarId' => [
                    'name' => 'calendarId',
                    'type' => Type::listOf(Type::int()),
                    'description' => 'Filter occurrences by calendar ID',
                ],
                'calendarUid' => [
                    'name' => 'calendarUid',
                    'type' => Type::listOf(Type::string()),
                    'description' => 'Filter occurrences by calendar UID',
                ],
                'calendar' => [
                    'name' => 'calendar',
                    'type' => Type::listOf(Type::string()),
                    'description' => 'Filter occurrences by calendar handle',
                ],
                'site' => [
                    'name' => 'site',
                    'type' => Type::listOf(Type::string()),
                    'description' => 'Filter occurrences by site handle',
                ],
                'siteId' => [
                    'name' => 'siteId',
                    'type' => Type::listOf(Type::int()),
                    'description' => 'Filter occurrences by site ID',
                ],
                'status' => [
                    'name' => 'status',
                    'type' => Type::string(),
                    'description' => 'Filter occurrences by parent event status',
                ],
                'rangeStart' => [
                    'name' => 'rangeStart',
                    'type' => Type::string(),
                    'description' => 'Occurrences overlapping this range start',
                ],
                'rangeEnd' => [
                    'name' => 'rangeEnd',
                    'type' => Type::string(),
                    'description' => 'Occurrences overlapping this range end',
                ],
                'startsBefore' => [
                    'name' => 'startsBefore',
                    'type' => Type::string(),
                    'description' => 'Occurrences that start before the given date',
                ],
                'startsBeforeOrAt' => [
                    'name' => 'startsBeforeOrAt',
                    'type' => Type::string(),
                    'description' => 'Occurrences that start before or at the given date',
                ],
                'startsAfter' => [
                    'name' => 'startsAfter',
                    'type' => Type::string(),
                    'description' => 'Occurrences that start after the given date',
                ],
                'startsAfterOrAt' => [
                    'name' => 'startsAfterOrAt',
                    'type' => Type::string(),
                    'description' => 'Occurrences that start after or at the given date',
                ],
                'endsBefore' => [
                    'name' => 'endsBefore',
                    'type' => Type::string(),
                    'description' => 'Occurrences that end before the given date',
                ],
                'endsBeforeOrAt' => [
                    'name' => 'endsBeforeOrAt',
                    'type' => Type::string(),
                    'description' => 'Occurrences that end before or at the given date',
                ],
                'endsAfter' => [
                    'name' => 'endsAfter',
                    'type' => Type::string(),
                    'description' => 'Occurrences that end after the given date',
                ],
                'endsAfterOrAt' => [
                    'name' => 'endsAfterOrAt',
                    'type' => Type::string(),
                    'description' => 'Occurrences that end after or at the given date',
                ],
                'limit' => [
                    'name' => 'limit',
                    'type' => Type::int(),
                    'description' => 'Limit the number of returned occurrences',
                ],
                'offset' => [
                    'name' => 'offset',
                    'type' => Type::int(),
                    'description' => 'Offset the returned occurrences',
                ],
                'orderBy' => [
                    'name' => 'orderBy',
                    'type' => Type::string(),
                    'description' => 'Order occurrences by a query expression',
                ],
            ]
        );
    }
}
