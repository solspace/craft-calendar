<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;

/**
 * m240918_095217_RefreshCalendarFieldLayoutTabsElementsUUIDs migration.
 */
class m240918_095217_RefreshCalendarFieldLayoutTabsElementsUUIDs extends Migration
{
    public function safeUp(): bool
    {
        return true;
    }

    public function safeDown(): bool
    {
        echo "m240918_095217_RefreshCalendarFieldLayoutTabsElementsUUIDs cannot be reverted.\n";

        return false;
    }
}
