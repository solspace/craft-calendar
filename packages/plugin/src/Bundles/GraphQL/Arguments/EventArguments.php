<?php

namespace Solspace\Calendar\Bundles\GraphQL\Arguments;

use craft\gql\base\ElementArguments;
use craft\gql\types\QueryArgument;
use GraphQL\Type\Definition\Type;

class EventArguments extends ElementArguments
{
    public static function getArguments(): array
    {
        return array_merge(
            parent::getArguments(),
            self::getContentArguments(),
            [
                'id' => [
                    'name' => 'id',
                    'type' => Type::listOf(Type::int()),
                    'description' => "Filter events by their ID's",
                ],
                'loadOccurrences' => [
                    'name' => 'loadOccurrences',
                    'type' => QueryArgument::getType(),
                    'description' => 'Should occurrences be loaded',
                ],
                'calendarId' => [
                    'name' => 'calendarId',
                    'type' => Type::listOf(Type::int()),
                    'description' => 'Load events specific to a calendar',
                ],
                'authorId' => [
                    'name' => 'authorId',
                    'type' => Type::listOf(Type::int()),
                    'description' => 'Load events specific to an author',
                ],
                'allDay' => [
                    'name' => 'allDay',
                    'type' => Type::boolean(),
                    'description' => 'Load all-day events',
                ],
                'rangeStart' => [
                    'name' => 'rangeStart',
                    'type' => Type::string(),
                    'description' => 'Specify start range',
                ],
                'rangeEnd' => [
                    'name' => 'rangeEnd',
                    'type' => Type::string(),
                    'description' => 'Specify end range',
                ],
                'startDate' => [
                    'name' => 'startDate',
                    'type' => Type::string(),
                    'description' => 'Specify start date',
                ],
                'startsBefore' => [
                    'name' => 'startsBefore',
                    'type' => Type::string(),
                    'description' => 'Events that start before given date',
                ],
                'startsBeforeOrAt' => [
                    'name' => 'startsBeforeOrAt',
                    'type' => Type::string(),
                    'description' => 'Events that start before or at the given date',
                ],
                'startsAfter' => [
                    'name' => 'startsAfter',
                    'type' => Type::string(),
                    'description' => 'Events that start after given date',
                ],
                'startsAfterOrAt' => [
                    'name' => 'startsAfterOrAt',
                    'type' => Type::string(),
                    'description' => 'Events that start after or at the given date',
                ],
                'endsBefore' => [
                    'name' => 'endsBefore',
                    'type' => Type::string(),
                    'description' => 'Events that ends before given date',
                ],
                'endsBeforeOrAt' => [
                    'name' => 'endsBeforeOrAt',
                    'type' => Type::string(),
                    'description' => 'Events that ends before or at the given date',
                ],
                'endsAfter' => [
                    'name' => 'endsAfter',
                    'type' => Type::string(),
                    'description' => 'Events that ends after given date',
                ],
                'endsAfterOrAt' => [
                    'name' => 'endsAfterOrAt',
                    'type' => Type::string(),
                    'description' => 'Events that ends after or at the given date',
                ],
                'endDate' => [
                    'name' => 'endDate',
                    'type' => Type::string(),
                    'description' => 'Specify end date',
                ],
            ]
        );
    }
}
