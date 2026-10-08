<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\helpers\Db;

/**
 * Indexes which override each occurrence row uses, for slug and relation lookups.
 */
class m261007_200000_IndexOccurrenceOverrides extends Migration
{
    private const OCCURRENCES = '{{%calendar_events_occurrences}}';

    public function safeUp(): bool
    {
        if (!Db::findIndex(self::OCCURRENCES, ['overrideId'], false, $this->db)) {
            $this->createIndex('occurrences_override_idx', self::OCCURRENCES, ['overrideId']);
        }

        return true;
    }

    public function safeDown(): bool
    {
        $this->dropIndexIfExists(self::OCCURRENCES, ['overrideId']);

        return true;
    }
}
