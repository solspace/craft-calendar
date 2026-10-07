<?php

namespace Solspace\Calendar\Bundles\GraphQL\Arguments;

use craft\gql\base\Arguments;
use craft\gql\types\QueryArgument;
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
                'recurrenceId' => [
                    'name' => 'recurrenceId',
                    'type' => Type::listOf(Type::string()),
                    'description' => "Filter occurrences by the start the event's schedule gives them, e.g. `2026-10-14 09:00` or `20261014T090000`. Combine with `event`; recurrence IDs are only unique within an event.",
                ],
                'code' => [
                    'name' => 'code',
                    'type' => Type::listOf(Type::string()),
                    'description' => 'Filter occurrences by code',
                ],
                'slug' => [
                    'name' => 'slug',
                    'type' => Type::listOf(Type::string()),
                    'description' => 'Filter occurrences by slug. A generated slug only matches while its date is the date the occurrence takes place on.',
                ],
                'cancelled' => [
                    'name' => 'cancelled',
                    'type' => Type::boolean(),
                    'description' => '`true` returns only cancelled occurrences, `false` leaves them out. Both are returned by default.',
                ],
                'search' => [
                    'name' => 'search',
                    'type' => Type::string(),
                    'description' => 'Filter occurrences whose event, or the occurrence itself, matches a search query',
                ],
                'relatedTo' => [
                    'name' => 'relatedTo',
                    'type' => Type::listOf(QueryArgument::getType()),
                    'description' => 'Filter occurrences whose event, or the occurrence itself, relates to the given element IDs',
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
