<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use Solspace\Calendar\Elements\Event;

class m211001_063936_AddPrimaryKeyForEventsTable extends Migration
{
    public function safeUp(): bool
    {
        $eventTable = Event::tableName();
        $table = $this->getDb()->getTableSchema($eventTable);

        $idColumn = $table->getColumn('id');
        if ($idColumn->isPrimaryKey) {
            return true;
        }

        if (!$table->getColumn('internalId')) {
            $this->addColumn($eventTable, 'internalId', $this->primaryKey());
        }

        return true;
    }

    public function safeDown(): bool
    {
        $eventTable = Event::tableName();
        $table = $this->getDb()->getTableSchema($eventTable);
        if ($table->getColumn('internalId')) {
            $this->dropColumn($eventTable, 'internalId');
        }

        return true;
    }
}
