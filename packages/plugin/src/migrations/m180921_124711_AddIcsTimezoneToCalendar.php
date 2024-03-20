<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use Solspace\Calendar\Records\CalendarRecord;

/**
 * m180628_091905_MigrateSelectDates migration.
 */
class m180921_124711_AddIcsTimezoneToCalendar extends Migration
{
    public function safeUp(): bool
    {
        $calendarTable = CalendarRecord::tableName();

        $table = $this->getDb()->getTableSchema($calendarTable);
        if (!$table->getColumn('icsTimezone')) {
            $this->addColumn(
                $calendarTable,
                'icsTimezone',
                $this->string(200)->null()
            );
        }

        return true;
    }

    public function safeDown(): bool
    {
        echo "m180628_091905_MigrateSelectDates cannot be reverted.\n";

        return false;
    }
}
