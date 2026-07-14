<?php

namespace Solspace\Calendar\Bundles\GraphQL;

use craft\helpers\Gql;

class GqlPermissions extends Gql
{
    public const CATEGORY_CALENDARS = 'Calendars';

    public const CATEGORY_EVENTS = 'Events';

    private const READ_ACTIONS = ['read'];

    private const CREATE_ACTIONS = ['create'];

    private const SAVE_ACTIONS = ['save'];

    private const MUTATE_ACTIONS = ['save', 'create'];

    private static ?array $readScopeCache = null;

    private static ?array $mutateScopeCache = null;

    public static function canQueryCalendars(): bool
    {
        return [] !== self::allowedCalendarUids();
    }

    public static function canQueryEvents(): bool
    {
        return [] !== self::allowedEventCalendarUids();
    }

    public static function canQueryAllCalendars(): bool
    {
        return self::canSchemaAny(self::CATEGORY_CALENDARS.'.all', self::READ_ACTIONS);
    }

    public static function canQueryCalendar(string $calendarUid): bool
    {
        return self::canSchemaAny(self::CATEGORY_CALENDARS.'.'.$calendarUid, self::READ_ACTIONS);
    }

    public static function canQueryAllEvents(): bool
    {
        return self::canSchemaAny(self::CATEGORY_EVENTS.'.all', self::READ_ACTIONS)
            || self::canQueryAllCalendars();
    }

    public static function canQueryEventsInCalendar(string $calendarUid): bool
    {
        return self::canSchemaAny(self::CATEGORY_EVENTS.'.'.$calendarUid, self::READ_ACTIONS)
            || self::canQueryCalendar($calendarUid);
    }

    public static function canSaveAllCalendars(): bool
    {
        return self::canSchemaAny(self::CATEGORY_CALENDARS.'.all', self::SAVE_ACTIONS);
    }

    public static function canSaveCalendar(string $calendarUid): bool
    {
        return self::canSchemaAny(self::CATEGORY_CALENDARS.'.'.$calendarUid, self::SAVE_ACTIONS);
    }

    public static function canCreateCalendars(): bool
    {
        return self::canSchemaAny(self::CATEGORY_CALENDARS.'.all', self::CREATE_ACTIONS);
    }

    public static function canSaveAllEvents(): bool
    {
        return self::canSchemaAny(self::CATEGORY_EVENTS.'.all', self::SAVE_ACTIONS);
    }

    public static function canSaveEventsInCalendar(string $calendarUid): bool
    {
        return self::canSchemaAny(self::CATEGORY_EVENTS.'.'.$calendarUid, self::SAVE_ACTIONS);
    }

    public static function canCreateAllEvents(): bool
    {
        return self::canSchemaAny(self::CATEGORY_EVENTS.'.all', self::CREATE_ACTIONS);
    }

    public static function canCreateEventsInCalendar(string $calendarUid): bool
    {
        return self::canSchemaAny(self::CATEGORY_EVENTS.'.'.$calendarUid, self::CREATE_ACTIONS);
    }

    /**
     * Returns:
     *   - null   => all calendars are allowed
     *   - []     => no calendars are allowed
     *   - [uids] => only these calendars are allowed
     */
    public static function allowedCalendarUids(): ?array
    {
        $scope = self::readScope();
        $calendarUids = $scope[self::CATEGORY_CALENDARS] ?? [];

        if (\in_array('all', $calendarUids, true)) {
            return null;
        }

        return array_values($calendarUids);
    }

    /**
     * Returns:
     *   - null   => events in all calendars are allowed
     *   - []     => no events are allowed
     *   - [uids] => only events in these calendars are allowed
     */
    public static function allowedEventCalendarUids(): ?array
    {
        $scope = self::readScope();
        $eventCalendarUids = $scope[self::CATEGORY_EVENTS] ?? [];

        if (\in_array('all', $eventCalendarUids, true)) {
            return null;
        }

        // Legacy compatibility: older Calendar schemas only had calendar read permissions.
        $calendarUids = self::allowedCalendarUids();
        if (null === $calendarUids) {
            return null;
        }

        return array_values(array_unique(array_merge($eventCalendarUids, $calendarUids)));
    }

    /**
     * Returns:
     *   - null   => all calendars are allowed for mutation
     *   - []     => no calendars are allowed for mutation
     *   - [uids] => only these calendars are allowed for mutation
     */
    public static function allowedCalendarMutationUids(): ?array
    {
        return self::allowedMutationUids(self::CATEGORY_CALENDARS);
    }

    /**
     * Returns:
     *   - null   => events in all calendars are allowed for mutation
     *   - []     => no events are allowed for mutation
     *   - [uids] => only events in these calendars are allowed for mutation
     */
    public static function allowedEventMutationCalendarUids(): ?array
    {
        return self::allowedMutationUids(self::CATEGORY_EVENTS);
    }

    private static function readScope(): array
    {
        if (null === self::$readScopeCache) {
            self::$readScopeCache = self::readScopeByActions(self::READ_ACTIONS);
        }

        return self::$readScopeCache;
    }

    private static function mutateScope(): array
    {
        if (null === self::$mutateScopeCache) {
            self::$mutateScopeCache = self::readScopeByActions(self::MUTATE_ACTIONS);
        }

        return self::$mutateScopeCache;
    }

    private static function allowedMutationUids(string $category): ?array
    {
        $scope = self::mutateScope();
        $uids = $scope[$category] ?? [];

        if (\in_array('all', $uids, true)) {
            return null;
        }

        return array_values($uids);
    }

    private static function readScopeByActions(array $actions): array
    {
        $scopes = [];

        foreach ($actions as $action) {
            $scope = self::extractAllowedEntitiesFromSchema($action);

            foreach ($scope as $category => $uids) {
                if (!isset($scopes[$category])) {
                    $scopes[$category] = [];
                }

                $scopes[$category] = array_values(array_unique(array_merge($scopes[$category], $uids)));
            }
        }

        return $scopes;
    }

    private static function canSchemaAny(string $scope, array $actions): bool
    {
        foreach ($actions as $action) {
            if (self::canSchema($scope, $action)) {
                return true;
            }
        }

        return false;
    }
}
