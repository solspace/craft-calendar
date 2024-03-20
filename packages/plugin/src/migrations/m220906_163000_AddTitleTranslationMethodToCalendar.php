<?php

namespace Solspace\Calendar\migrations;

use craft\base\Field;
use craft\db\Migration;
use Solspace\Calendar\Records\CalendarRecord;

class m220906_163000_AddTitleTranslationMethodToCalendar extends Migration
{
    public function safeUp(): bool
    {
        $calendarTable = CalendarRecord::tableName();

        $this->addColumn($calendarTable, 'titleTranslationMethod', $this->string()->notNull()->defaultValue(Field::TRANSLATION_METHOD_SITE)->after('hasTitleField'));
        $this->addColumn($calendarTable, 'titleTranslationKeyFormat', $this->text()->after('titleTranslationMethod'));

        return true;
    }

    public function safeDown(): bool
    {
        echo "m220906_163000_AddTitleTranslationMethodToCalendar cannot be reverted.\n";

        return false;
    }
}
