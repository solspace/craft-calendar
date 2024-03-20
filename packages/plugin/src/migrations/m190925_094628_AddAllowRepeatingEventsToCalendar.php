<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use Solspace\Calendar\Records\CalendarRecord;

/**
 * m190925_094628_AddAllowRepeatingEventsToCalendar migration.
 */
class m190925_094628_AddAllowRepeatingEventsToCalendar extends Migration
{
    public function safeUp(): bool
    {
        $calendarTable = CalendarRecord::tableName();
        $table = $this->getDb()->getTableSchema($calendarTable);
        if (!$table->getColumn('allowRepeatingEvents')) {
            $this->addColumn(
                $calendarTable,
                'allowRepeatingEvents',
                $this->boolean()->notNull()->defaultValue(true)
            );
        }

        return true;
    }

    public function safeDown(): bool
    {
        echo "m190925_094628_AddAllowRepeatingEventsToCalendar cannot be reverted.\n";

        return false;
    }
}
