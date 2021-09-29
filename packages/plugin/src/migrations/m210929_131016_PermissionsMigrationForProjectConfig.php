<?php

namespace Solspace\Calendar\migrations;

use Craft;
use craft\db\Migration;
use craft\db\Query;
use craft\db\Table;
use Solspace\Calendar\Calendar;

/**
 * m210929_131016_PermissionsMigrationForProjectConfig migration.
 */
class m210929_131016_PermissionsMigrationForProjectConfig extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        // Establish all the new permissions we should be looking for,
        // mapped to the old permissions users/groups must have to gain the new ones
        $permissions = [];
        $calendars = Calendar::getInstance()->calendars->getAllCalendars();
        foreach ($calendars as $calendar) {
            $permissions += [
                "calendar-manageeventsfor:{$calendar->id}" => "calendar-manageeventsfor:{$calendar->uid}",
            ];
        }

        // Now add the new permissions to existing users where applicable
        foreach ($permissions as $oldPermission => $newPermission) {
            $userIds = (new Query())
                ->select(['upu.userId'])
                ->from(['upu' => Table::USERPERMISSIONS_USERS])
                ->innerJoin(['up' => Table::USERPERMISSIONS], '[[up.id]] = [[upu.permissionId]]')
                ->where(['up.name' => $oldPermission])
                ->column($this->db)
            ;

            if (!empty($userIds)) {
                $this->insert(Table::USERPERMISSIONS, ['name' => $newPermission]);
                $newPermissionId = $this->db->getLastInsertID(Table::USERPERMISSIONS);

                $insert = [];
                foreach ($userIds as $userId) {
                    $insert[] = [$newPermissionId, $userId];
                }

                $this->batchInsert(Table::USERPERMISSIONS_USERS, ['permissionId', 'userId'], $insert);
            }
        }

        // Don't make the same config changes twice
        $projectConfig = Craft::$app->getProjectConfig();
        $schemaVersion = $projectConfig->get('plugins.calendar.schemaVersion', true);
        if (version_compare($schemaVersion, '3.3.1', '<')) {
            foreach ($projectConfig->get('users.groups') ?? [] as $uid => $group) {
                $changed = false;
                $groupPermissions = array_flip($group['permissions'] ?? []);
                foreach ($permissions as $oldPermission => $newPermission) {
                    if (isset($groupPermissions[$oldPermission])) {
                        unset($groupPermissions[$oldPermission]);
                        $groupPermissions[$newPermission] = true;
                        $changed = true;
                    }
                }

                if ($changed) {
                    $projectConfig->set("users.groups.{$uid}.permissions", array_keys($groupPermissions));
                }
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m210929_131016_PermissionsMigrationForProjectConfig cannot be reverted.\n";

        return false;
    }
}
