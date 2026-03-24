<?php

namespace Solspace\Calendar\Bundles\GraphQL\Queries;

use craft\gql\base\Query;
use Solspace\Calendar\Bundles\GraphQL\Arguments\CalendarGraphArguments;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\CalendarGraphInterface;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\CalendarGraphResolver;

class CalendarQuery extends Query
{
    public static function getQueries(bool $checkToken = true): array
    {
        if ($checkToken && !GqlPermissions::canQueryCalendars()) {
            return [];
        }

        return [
            'calendar' => [
                'type' => CalendarGraphInterface::getType(),
                'args' => CalendarGraphArguments::getArguments(),
                'resolve' => CalendarGraphResolver::class.'::resolve',
                'description' => 'This query is used to query Calendar events, calendars, and occurrences',
            ],
        ];
    }
}
