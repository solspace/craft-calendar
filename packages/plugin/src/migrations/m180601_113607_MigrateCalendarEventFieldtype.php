<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use Solspace\Calendar\FieldTypes\EventFieldType;

/**
 * m180601_113607_MigrateCalendarEventFieldtype migration.
 */
class m180601_113607_MigrateCalendarEventFieldtype extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->update(
            '{{%fields}}',
            ['type' => EventFieldType::class],
            ['type' => 'Calendar_Event'],
            [],
            false
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->update(
            '{{%fields}}',
            ['type' => 'Calendar_Event'],
            ['type' => EventFieldType::class],
            [],
            false
        );
    }
}
