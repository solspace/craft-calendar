<?php

namespace Solspace\Calendar\Library\Helpers;

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use yii\web\ForbiddenHttpException;
use yii\web\HttpException;

class PermissionHelper
{
    /**
     * Checks a given permission for the currently logged in user.
     */
    public static function checkPermission(string $permissionName, bool $checkForNested = false): bool
    {
        if (self::isAdmin()) {
            return true;
        }

        $user = \Craft::$app->getUser();
        $permissionName = strtolower($permissionName);
        $permissionNames = self::permissionAliases($permissionName);

        if (self::permissionsEnabled()) {
            if ($checkForNested) {
                if (!$user->getId()) {
                    return false;
                }

                $permissionList = \Craft::$app->userPermissions->getPermissionsByUserId($user->getId());
                foreach ($permissionList as $permission) {
                    foreach ($permissionNames as $name) {
                        if ($permission === $name || str_starts_with($permission, $name.':')) {
                            return true;
                        }
                    }
                }
            }

            foreach ($permissionNames as $name) {
                if ($user->checkPermission($name)) {
                    return true;
                }
            }

            return false;
        }

        return false;
    }

    public static function requirePermission(string $permissionName): void
    {
        if (self::isAdmin()) {
            return;
        }

        $user = \Craft::$app->getUser();
        $permissionName = strtolower($permissionName);

        foreach (self::permissionAliases($permissionName) as $name) {
            if ($user->checkPermission($name)) {
                return;
            }
        }

        throw new ForbiddenHttpException('User is not permitted to perform this action');
    }

    public static function getNestedPermissionIds(string $permissionName): array|bool
    {
        if (self::isAdmin()) {
            return true;
        }

        $user = \Craft::$app->getUser();
        $permissionName = strtolower($permissionName);
        $idList = [];

        if (self::permissionsEnabled()) {
            if (!$user->getId()) {
                return [];
            }

            $permissionNames = self::permissionAliases($permissionName);
            $permissionList = \Craft::$app->userPermissions->getPermissionsByUserId($user->getId());
            foreach ($permissionList as $permission) {
                foreach ($permissionNames as $name) {
                    if (!str_starts_with($permission, $name.':')) {
                        continue;
                    }

                    [, $id] = explode(':', $permission);
                    $idList[] = $id;
                }
            }

            return array_values(array_unique($idList));
        }

        return self::isAdmin();
    }

    /**
     * Combines a nested permission with ID.
     */
    public static function prepareNestedPermission(string $permissionName, int|string $id): string
    {
        return $permissionName.':'.$id;
    }

    /**
     * Returns true if the currently logged in user is an admin.
     */
    public static function isAdmin(): bool
    {
        if (self::isConsole()) {
            return true;
        }

        return \Craft::$app->getUser()->getIsAdmin();
    }

    public static function requireCalendarEditPermissions(CalendarModel $calendar): void
    {
        if (!self::canManageCalendar($calendar)) {
            throw new HttpException(403);
        }
    }

    public static function canAccessCalendars(): bool
    {
        return self::checkPermission(Calendar::PERMISSION_CALENDARS)
            || self::checkPermission(Calendar::PERMISSION_CREATE_CALENDARS)
            || self::checkPermission(Calendar::PERMISSION_DELETE_CALENDARS)
            || self::checkPermission(Calendar::PERMISSION_EDIT_CALENDARS)
            || self::checkPermission(Calendar::PERMISSION_EDIT_CALENDARS_INDIVIDUAL, true);
    }

    public static function canManageCalendar(?CalendarModel $calendar = null): bool
    {
        if (self::checkPermission(Calendar::PERMISSION_EDIT_CALENDARS)) {
            return true;
        }

        if (null === $calendar) {
            return false;
        }

        return self::checkPermission(
            self::prepareNestedPermission(
                Calendar::PERMISSION_EDIT_CALENDARS_INDIVIDUAL,
                $calendar->uid
            )
        );
    }

    public static function canAccessEvents(?CalendarModel $calendar = null): bool
    {
        if (
            self::checkPermission(Calendar::PERMISSION_EVENTS)
            || self::checkPermission(Calendar::PERMISSION_EVENTS_READ)
            || self::checkPermission(Calendar::PERMISSION_EVENTS_FOR_ALL)
        ) {
            return true;
        }

        if (null === $calendar) {
            return self::checkPermission(Calendar::PERMISSION_EVENTS_READ_INDIVIDUAL, true)
                || self::checkPermission(Calendar::PERMISSION_EVENTS_FOR, true);
        }

        return self::checkPermission(
            self::prepareNestedPermission(
                Calendar::PERMISSION_EVENTS_READ_INDIVIDUAL,
                $calendar->uid
            )
        ) || self::canEditCalendar($calendar);
    }

    public static function canEditCalendar(?CalendarModel $calendar = null): bool
    {
        $canManageAll = self::checkPermission(Calendar::PERMISSION_EVENTS_FOR_ALL);

        if ($canManageAll) {
            return true;
        }

        if (null === $calendar) {
            return false;
        }

        return self::checkPermission(
            self::prepareNestedPermission(
                Calendar::PERMISSION_EVENTS_FOR,
                $calendar->uid
            )
        );
    }

    public static function canEditEvent(Event $event): bool
    {
        $canEditCalendar = self::canEditCalendar($event->getCalendar());

        if (self::isAdmin() || !Calendar::getInstance()->settings->isAuthoredEventEditOnly()) {
            return $canEditCalendar;
        }

        return $canEditCalendar && (int) $event->authorId === (int) \Craft::$app->getUser()->id;
    }

    private static function isConsole(): bool
    {
        return \Craft::$app->request->getIsConsoleRequest();
    }

    private static function permissionsEnabled(): bool
    {
        return \Craft::Solo !== \Craft::$app->getEdition();
    }

    private static function permissionAliases(string $permissionName): array
    {
        $permissionName = strtolower($permissionName);
        $suffix = '';
        $basePermissionName = $permissionName;
        if (str_contains($permissionName, ':')) {
            [$basePermissionName, $suffix] = explode(':', $permissionName, 2);
            $suffix = ':'.$suffix;
        }

        $aliases = [
            strtolower(Calendar::PERMISSION_CALENDARS_ACCESS) => Calendar::LEGACY_PERMISSION_CALENDARS,
            strtolower(Calendar::PERMISSION_CALENDARS_CREATE) => Calendar::LEGACY_PERMISSION_CREATE_CALENDARS,
            strtolower(Calendar::PERMISSION_CALENDARS_DELETE) => Calendar::LEGACY_PERMISSION_DELETE_CALENDARS,
            strtolower(Calendar::PERMISSION_CALENDARS_MANAGE) => Calendar::LEGACY_PERMISSION_EDIT_CALENDARS,
            strtolower(Calendar::PERMISSION_CALENDARS_MANAGE_INDIVIDUAL) => Calendar::LEGACY_PERMISSION_EDIT_CALENDARS_INDIVIDUAL,
            strtolower(Calendar::PERMISSION_EVENTS_ACCESS) => Calendar::LEGACY_PERMISSION_EVENTS,
            strtolower(Calendar::PERMISSION_EVENTS_READ) => Calendar::LEGACY_PERMISSION_EVENTS_READ,
            strtolower(Calendar::PERMISSION_EVENTS_READ_INDIVIDUAL) => Calendar::LEGACY_PERMISSION_EVENTS_READ_INDIVIDUAL,
            strtolower(Calendar::PERMISSION_EVENTS_MANAGE) => Calendar::LEGACY_PERMISSION_EVENTS_FOR_ALL,
            strtolower(Calendar::PERMISSION_EVENTS_MANAGE_INDIVIDUAL) => Calendar::LEGACY_PERMISSION_EVENTS_FOR,
        ];

        $permissionNames = [$permissionName];
        if (isset($aliases[$basePermissionName])) {
            $permissionNames[] = strtolower($aliases[$basePermissionName].$suffix);
        }

        return array_values(array_unique($permissionNames));
    }
}
