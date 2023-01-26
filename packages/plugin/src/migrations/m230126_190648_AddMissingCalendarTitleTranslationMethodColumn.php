<?php

namespace Solspace\Calendar\migrations;

use craft\base\Field;
use craft\db\Migration;

/**
 * m230126_190648_AddMissingCalendarTitleTranslationMethodColumn migration.
 */
class m230126_190648_AddMissingCalendarTitleTranslationMethodColumn extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp(): bool
    {
        $table = $this->getDb()->getTableSchema('{{%calendar_calendars}}');

        if (!$table->getColumn('titleTranslationMethod')) {
            $this->addColumn('{{%calendar_calendars}}', 'titleTranslationMethod', $this->string()->notNull()->defaultValue(Field::TRANSLATION_METHOD_SITE)->after('hasTitleField'));
        }

        if (!$table->getColumn('titleTranslationKeyFormat')) {
            $this->addColumn('{{%calendar_calendars}}', 'titleTranslationKeyFormat', $this->text()->after('titleTranslationMethod'));
        }

        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown(): bool
    {
        echo "m230126_190648_AddMissingCalendarTitleTranslationMethodColumn cannot be reverted.\n";

        return false;
    }
}
