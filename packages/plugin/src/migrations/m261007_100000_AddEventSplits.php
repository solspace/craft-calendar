<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;

/**
 * Adds the table that marks a draft as continuing its event from one occurrence onward ("Edit this and following").
 */
class m261007_100000_AddEventSplits extends Migration
{
    private const SPLITS = '{{%calendar_event_splits}}';
    private const EVENTS = '{{%calendar_events}}';

    public function safeUp(): bool
    {
        if ($this->db->tableExists(self::SPLITS)) {
            return true;
        }

        $this->createTable(self::SPLITS, [
            'eventId' => $this->integer()->notNull(),
            'splitAt' => $this->dateTime()->notNull(),
            'dateCreated' => $this->dateTime()->notNull(),
            'dateUpdated' => $this->dateTime()->notNull(),
            'uid' => $this->uid(),
        ]);

        $this->addPrimaryKey('pk_calendar_event_splits', self::SPLITS, ['eventId']);
        $this->addForeignKey('event_splits_event_id_fk', self::SPLITS, ['eventId'], self::EVENTS, ['id'], 'CASCADE');

        return true;
    }

    public function safeDown(): bool
    {
        $this->dropTableIfExists(self::SPLITS);

        return true;
    }
}
