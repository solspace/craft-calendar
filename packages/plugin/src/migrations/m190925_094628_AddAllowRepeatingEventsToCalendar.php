<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;

/**
 * m190925_094628_AddAllowRepeatingEventsToCalendar migration.
 */
class m190925_094628_AddAllowRepeatingEventsToCalendar extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table = $this->getDb()->getTableSchema('{{%calendar_calendars}}');
        if (!$table->getColumn('allowRepeatingEvents')) {
            $this->addColumn(
                '{{%calendar_calendars}}',
                'allowRepeatingEvents',
                $this->boolean()->notNull()->defaultValue(true)
            );
        }

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m190925_094628_AddAllowRepeatingEventsToCalendar cannot be reverted.\n";

        return false;
    }
}
