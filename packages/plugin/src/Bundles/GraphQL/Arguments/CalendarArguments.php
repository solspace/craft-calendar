<?php

namespace Solspace\Calendar\Bundles\GraphQL\Arguments;

use craft\gql\base\Arguments;
use GraphQL\Type\Definition\Type;

class CalendarArguments extends Arguments
{
    public static function getArguments(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::listOf(Type::int()),
                'description' => "Filter calendars by their ID's",
            ],
            'uid' => [
                'name' => 'uid',
                'type' => Type::listOf(Type::string()),
                'description' => "Filter calendars by their UUID's",
            ],
            'handle' => [
                'name' => 'handle',
                'type' => Type::listOf(Type::string()),
                'description' => 'Filter calendars by their handles',
            ],
            'limit' => [
                'name' => 'limit',
                'type' => Type::int(),
                'description' => 'Limit the amount of returned calendars',
            ],
            'offset' => [
                'name' => 'offset',
                'type' => Type::int(),
                'description' => 'Offset the returned calendars',
            ],
            'orderBy' => [
                'name' => 'orderBy',
                'type' => Type::string(),
                'description' => 'Order calendars by a specific property',
            ],
            'sort' => [
                'name' => 'sort',
                'type' => Type::string(),
                'description' => 'Sort the calendars by `asc` or `desc` order',
            ],
        ];
    }
}
