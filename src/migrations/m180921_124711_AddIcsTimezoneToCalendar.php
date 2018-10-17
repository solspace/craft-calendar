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
        $this->addColumn(
            '{{%calendar_calendars}}',
            'icsTimezone',
            $this->string(200)->null()
        );
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
