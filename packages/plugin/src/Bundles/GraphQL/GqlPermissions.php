<?php

namespace Solspace\Calendar\Bundles\GraphQL;

use craft\helpers\Gql;

class GqlPermissions extends Gql
{
    const CATEGORY_CALENDARS = 'Calendars';

    public static function canQueryCalendars(): bool
    {
        return self::canSchema(self::CATEGORY_CALENDARS.'.all');
    }

    public static function allowedCalendarUids(): array
    {
        $calendarUids = self::extractAllowedEntitiesFromSchema('read')[self::CATEGORY_CALENDARS] ?? [];

        return array_filter(
            $calendarUids,
            function ($item) {
                return 'all' !== $item;
            }
        );
    }
}
