<?php

namespace Solspace\Calendar\Bundles\GraphQL\Queries;

use craft\gql\base\Query;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\SolspaceCalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\SolspaceCalendarResolver;

/**
 * @deprecated 6.0.0 Use the root-level Calendar queries instead.
 * Will be removed in 7.0.0.
 */
class SolspaceCalendarQuery extends Query
{
    public static function getQueries(bool $checkToken = true): array
    {
        if ($checkToken && !GqlPermissions::canQueryCalendars() && !GqlPermissions::canQueryEvents()) {
            return [];
        }

        return [
            'solspace_calendar' => [
                'name' => 'solspace_calendar',
                'type' => SolspaceCalendarInterface::getType(),
                'resolve' => SolspaceCalendarResolver::class.'::resolve',
                'description' => 'Legacy Calendar GraphQL query namespace.',
                'deprecationReason' => 'Use the root-level `calendars`, `calendar`, `events`, `eventCount`, `event`, `occurrences`, `occurrenceCount`, and `occurrence` queries instead. Will be removed in 7.0.0.',
            ],
        ];
    }
}
