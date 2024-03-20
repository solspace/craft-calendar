<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Table;
use Solspace\Calendar\FieldTypes\EventFieldType;

/**
 * m180601_113607_MigrateCalendarEventFieldtype migration.
 */
class m180601_113607_MigrateCalendarEventFieldtype extends Migration
{
    public function safeUp(): void
    {
        $this->update(
            Table::FIELDS,
            ['type' => EventFieldType::class],
            ['type' => 'Calendar_Event'],
            [],
            false
        );
    }

    public function safeDown(): void
    {
        $this->update(
            Table::FIELDS,
            ['type' => 'Calendar_Event'],
            ['type' => EventFieldType::class],
            [],
            false
        );
    }
}
