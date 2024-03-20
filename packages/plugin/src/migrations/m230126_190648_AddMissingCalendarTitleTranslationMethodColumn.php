<?php

namespace Solspace\Calendar\migrations;

use craft\base\Field;
use craft\db\Migration;
use Solspace\Calendar\Records\CalendarRecord;

/**
 * m230126_190648_AddMissingCalendarTitleTranslationMethodColumn migration.
 */
class m230126_190648_AddMissingCalendarTitleTranslationMethodColumn extends Migration
{
    public function safeUp(): bool
    {
        $calendarTable = CalendarRecord::tableName();
        $table = $this->getDb()->getTableSchema($calendarTable);

        if (!$table->getColumn('titleTranslationMethod')) {
            $this->addColumn($calendarTable, 'titleTranslationMethod', $this->string()->notNull()->defaultValue(Field::TRANSLATION_METHOD_SITE)->after('hasTitleField'));
        }

        if (!$table->getColumn('titleTranslationKeyFormat')) {
            $this->addColumn($calendarTable, 'titleTranslationKeyFormat', $this->text()->after('titleTranslationMethod'));
        }

        return true;
    }

    public function safeDown(): bool
    {
        echo "m230126_190648_AddMissingCalendarTitleTranslationMethodColumn cannot be reverted.\n";

        return false;
    }
}
