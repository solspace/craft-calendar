<?php

namespace Solspace\Calendar\Bundles\GraphQL\Queries;

use craft\gql\base\Query;
use Solspace\Calendar\Bundles\GraphQL\Arguments\SolspaceCalendarArguments;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\SolspaceCalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\SolspaceCalendarResolver;

class SolspaceCalendarQuery extends Query
{
    public static function getQueries($checkToken = true): array
    {
        if ($checkToken && !GqlPermissions::canQueryCalendars()) {
            return [];
        }

        return [
            'solspace_calendar' => [
                'type' => SolspaceCalendarInterface::getType(),
                'args' => SolspaceCalendarArguments::getArguments(),
                'resolve' => SolspaceCalendarResolver::class.'::resolve',
                'description' => 'This query is used to query Solspace Calendar for its calendars and their events',
            ],
        ];
    }
}
