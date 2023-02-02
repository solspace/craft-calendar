<?php

namespace Solspace\Calendar\migrations;

use craft\base\Field;
use craft\db\Migration;

class m220906_163000_AddTitleTranslationMethodToCalendar extends Migration
{
    public function safeUp()
    {
        $this->addColumn('{{%calendar_calendars}}', 'titleTranslationMethod', $this->string()->notNull()->defaultValue(Field::TRANSLATION_METHOD_SITE)->after('hasTitleField'));
        $this->addColumn('{{%calendar_calendars}}', 'titleTranslationKeyFormat', $this->text()->after('titleTranslationMethod'));

        return true;
    }

    public function safeDown()
    {
        echo "m220906_163000_AddTitleTranslationMethodToCalendar cannot be reverted.\n";

        return false;
    }
}
