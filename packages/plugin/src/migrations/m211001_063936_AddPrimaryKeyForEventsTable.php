<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;

class m211001_063936_AddPrimaryKeyForEventsTable extends Migration
{
    public function safeUp()
    {
        $table = $this->getDb()->getTableSchema('{{%calendar_events}}');

        $idColumn = $table->getColumn('id');
        if ($idColumn->isPrimaryKey) {
            return true;
        }

        if (!$table->getColumn('internalId')) {
            $this->addColumn('{{%calendar_events}}', 'internalId', $this->primaryKey());
        }

        return true;
    }

    public function safeDown()
    {
        $table = $this->getDb()->getTableSchema('{{%calendar_events}}');
        if ($table->getColumn('internalId')) {
            $this->dropColumn('{{%calendar_events}}', 'internalId');
        }

        return true;
    }
}
