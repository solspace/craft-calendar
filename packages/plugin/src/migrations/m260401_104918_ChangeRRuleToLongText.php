<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;

class m260401_104918_ChangeRRuleToLongText extends Migration
{
    public function safeUp(): bool
    {
        $this->alterColumn('{{%calendar_events}}', 'rrule', $this->longText());

        return true;
    }

    public function safeDown(): bool
    {
        $this->alterColumn('{{%calendar_events}}', 'rrule', $this->string());

        return true;
    }
}
