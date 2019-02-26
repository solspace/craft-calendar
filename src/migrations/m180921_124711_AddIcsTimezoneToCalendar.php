<?php

namespace Solspace\Calendar\migrations;

use Carbon\Carbon;
use Craft;
use craft\db\Migration;
use craft\db\Query;
use Solspace\Calendar\Library\DateHelper;

/**
 * m180628_091905_MigrateSelectDates migration.
 */
class m180921_124711_AddIcsTimezoneToCalendar extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $table = $this->getDb()->getTableSchema('{{%calendar_calendars}}');
        if (!$table->getColumn('icsTimezone')) {
            $this->addColumn(
                '{{%calendar_calendars}}',
                'icsTimezone',
                $this->string(200)->null()
            );
        }

        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m180628_091905_MigrateSelectDates cannot be reverted.\n";
        return false;
    }
}
