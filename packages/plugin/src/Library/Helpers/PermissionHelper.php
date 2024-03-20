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

        if (self::permissionsEnabled()) {
            if ($checkForNested) {
                if (!$user->getId()) {
                    return false;
                }

                $permissionList = \Craft::$app->userPermissions->getPermissionsByUserId($user->getId());
                foreach ($permissionList as $permission) {
                    if (str_starts_with($permission, $permissionName)) {
                        return true;
                    }
                }
            }

            return $user->checkPermission($permissionName);
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

        if (!$user->checkPermission($permissionName)) {
            throw new ForbiddenHttpException('User is not permitted to perform this action');
        }
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

            $permissionList = \Craft::$app->userPermissions->getPermissionsByUserId($user->getId());
            foreach ($permissionList as $permission) {
                if (str_starts_with($permission, $permissionName)) {
                    if (!str_contains($permission, ':')) {
                        continue;
                    }

                    [$name, $id] = explode(':', $permission);

                    $idList[] = $id;
                }
            }

            return $idList;
        }

        return self::isAdmin();
    }

    /**
     * Combines a nested permission with ID.
     */
    public static function prepareNestedPermission(string $permissionName, int $id): string
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
        if (!self::canEditCalendar($calendar)) {
            throw new HttpException(403);
        }
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
        return \Craft::Pro === \Craft::$app->getEdition();
    }
}
