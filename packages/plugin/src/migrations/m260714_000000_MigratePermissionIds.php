<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Query;
use craft\db\Table;
use Solspace\Calendar\Calendar;

class m260714_000000_MigratePermissionIds extends Migration
{
    public function safeUp(): bool
    {
        $permissions = $this->getPermissionMap();

        foreach ($permissions as $oldPermission => $newPermission) {
            $this->migrateUserPermission($oldPermission, $newPermission);
        }

        $projectConfig = \Craft::$app->getProjectConfig();
        foreach ($projectConfig->get('users.groups') ?? [] as $uid => $group) {
            $changed = false;
            $groupPermissions = [];

            foreach ($group['permissions'] ?? [] as $permission) {
                $permission = strtolower($permission);
                if (isset($permissions[$permission])) {
                    $groupPermissions[$permissions[$permission]] = true;
                    $changed = true;
                } else {
                    $groupPermissions[$permission] = true;
                }
            }

            if ($changed) {
                $projectConfig->set("users.groups.{$uid}.permissions", array_keys($groupPermissions));
            }
        }

        return true;
    }

    public function safeDown(): bool
    {
        echo "m260714_000000_MigratePermissionIds cannot be reverted.\n";

        return false;
    }

    private function migrateUserPermission(string $oldPermission, string $newPermission): void
    {
        $userIds = (new Query())
            ->select(['userpermissions_users.userId'])
            ->from(['userpermissions_users' => Table::USERPERMISSIONS_USERS])
            ->innerJoin(['up' => Table::USERPERMISSIONS], '[[up.id]] = [[userpermissions_users.permissionId]]')
            ->where(['up.name' => $oldPermission])
            ->column($this->db)
        ;

        if (empty($userIds)) {
            return;
        }

        $newPermissionId = $this->ensurePermissionId($newPermission);
        $assignedUserIds = (new Query())
            ->select(['userId'])
            ->from(Table::USERPERMISSIONS_USERS)
            ->where(['permissionId' => $newPermissionId])
            ->column($this->db)
        ;

        $insert = [];
        foreach (array_diff($userIds, $assignedUserIds) as $userId) {
            $insert[] = [$newPermissionId, $userId];
        }

        if ($insert) {
            $this->batchInsert(Table::USERPERMISSIONS_USERS, ['permissionId', 'userId'], $insert);
        }
    }

    private function ensurePermissionId(string $permission): int
    {
        $permissionId = (new Query())
            ->select(['id'])
            ->from(Table::USERPERMISSIONS)
            ->where(['name' => $permission])
            ->scalar($this->db)
        ;

        if ($permissionId) {
            return (int) $permissionId;
        }

        $this->insert(Table::USERPERMISSIONS, ['name' => $permission]);

        return (int) $this->db->getLastInsertID(Table::USERPERMISSIONS);
    }

    private function getPermissionMap(): array
    {
        $permissions = [
            strtolower(Calendar::LEGACY_PERMISSION_CALENDARS) => strtolower(Calendar::PERMISSION_CALENDARS_ACCESS),
            strtolower(Calendar::LEGACY_PERMISSION_CREATE_CALENDARS) => strtolower(Calendar::PERMISSION_CALENDARS_CREATE),
            strtolower(Calendar::LEGACY_PERMISSION_DELETE_CALENDARS) => strtolower(Calendar::PERMISSION_CALENDARS_DELETE),
            strtolower(Calendar::LEGACY_PERMISSION_EDIT_CALENDARS) => strtolower(Calendar::PERMISSION_CALENDARS_MANAGE),
            strtolower(Calendar::LEGACY_PERMISSION_EDIT_CALENDARS_INDIVIDUAL) => strtolower(Calendar::PERMISSION_CALENDARS_MANAGE_INDIVIDUAL),
            strtolower(Calendar::LEGACY_PERMISSION_EVENTS) => strtolower(Calendar::PERMISSION_EVENTS_ACCESS),
            strtolower(Calendar::LEGACY_PERMISSION_EVENTS_READ) => strtolower(Calendar::PERMISSION_EVENTS_READ),
            strtolower(Calendar::LEGACY_PERMISSION_EVENTS_READ_INDIVIDUAL) => strtolower(Calendar::PERMISSION_EVENTS_READ_INDIVIDUAL),
            strtolower(Calendar::LEGACY_PERMISSION_EVENTS_FOR) => strtolower(Calendar::PERMISSION_EVENTS_MANAGE_INDIVIDUAL),
            strtolower(Calendar::LEGACY_PERMISSION_EVENTS_FOR_ALL) => strtolower(Calendar::PERMISSION_EVENTS_MANAGE),
        ];

        foreach (Calendar::getInstance()->calendars->getAllCalendars() as $calendar) {
            $permissions += [
                strtolower(Calendar::LEGACY_PERMISSION_EDIT_CALENDARS_INDIVIDUAL.':'.$calendar->uid) => strtolower(Calendar::PERMISSION_CALENDARS_MANAGE_INDIVIDUAL.':'.$calendar->uid),
                strtolower(Calendar::LEGACY_PERMISSION_EVENTS_READ_INDIVIDUAL.':'.$calendar->uid) => strtolower(Calendar::PERMISSION_EVENTS_READ_INDIVIDUAL.':'.$calendar->uid),
                strtolower(Calendar::LEGACY_PERMISSION_EVENTS_FOR.':'.$calendar->uid) => strtolower(Calendar::PERMISSION_EVENTS_MANAGE_INDIVIDUAL.':'.$calendar->uid),
                strtolower(Calendar::LEGACY_PERMISSION_EVENTS_FOR.':'.$calendar->id) => strtolower(Calendar::PERMISSION_EVENTS_MANAGE_INDIVIDUAL.':'.$calendar->uid),
            ];
        }

        return $permissions;
    }
}
