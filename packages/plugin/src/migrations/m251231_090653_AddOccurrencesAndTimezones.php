<?php

namespace Solspace\Calendar\migrations;

use Craft;
use craft\db\Migration;

class m251231_090653_AddOccurrencesAndTimezones extends Migration
{
    public function safeUp(): bool
    {
        if (!$this->db->columnExists('{{%calendar_calendars}}', 'defaultTimezone')) {
            $this->addColumn(
                '{{%calendar_calendars}}',
                'defaultTimezone',
                $this->string(200)->after('description')
            );
        }

        if (!$this->db->columnExists('{{%calendar_events}}', 'timezone')) {
            $this->addColumn(
                '{{%calendar_events}}',
                'timezone',
                $this->string(200)->after('authorId')
            );
        }

        if (!$this->db->tableExists('{{%calendar_events_occurrences}}')) {
            $this->createTable(
                '{{%calendar_events_occurrences}}',
                [
                    'id' => $this->primaryKey(),
                    'eventId' => $this->integer()->notNull(),
                    'calendarId' => $this->integer()->notNull(),
                    'startUtc' => $this->dateTime()->notNull(),
                    'endUtc' => $this->dateTime(),
                    'occurrenceKey' => $this->string()->notNull(),
                    'allDay' => $this->boolean(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                ]
            );

            $this->createIndex('occurrences_calendar_start_idx', '{{%calendar_events_occurrences}}', ['calendarId', 'startUtc']);
            $this->createIndex('occurrences_event_start_idx_unq', '{{%calendar_events_occurrences}}', ['eventId', 'startUtc'], true);
            $this->createIndex('occurrences_occurrence_key_idx_unq', '{{%calendar_events_occurrences}}', ['occurrenceKey'], true);
            $this->createIndex('occurrences_start_utc_idx', '{{%calendar_events_occurrences}}', ['startUtc']);
            $this->createIndex('occurrences_end_utc_idx', '{{%calendar_events_occurrences}}', ['endUtc']);

            $this->addForeignKey(
                'occurrences_event_id_fk',
                '{{%calendar_events_occurrences}}',
                'eventId',
                '{{%calendar_events}}',
                'id',
                'CASCADE',
            );

            $this->addForeignKey(
                'occurrences_calendar_id_fk',
                '{{%calendar_events_occurrences}}',
                'calendarId',
                '{{%calendar_calendars}}',
                'id',
                'CASCADE',
            );
        }

        return true;
    }

    public function safeDown(): bool
    {
        if ($this->db->tableExists('{{%calendar_events_occurrences}}')) {
            $this->dropForeignKeyIfExists('occurrences_event_id_fk', '{{%calendar_events_occurrences}}');
            $this->dropForeignKeyIfExists('occurrences_calendar_id_fk', '{{%calendar_events_occurrences}}');
            $this->dropTable('{{%calendar_events_occurrences}}');
        }

        if ($this->db->columnExists('{{%calendar_events}}', 'timezone')) {
            $this->dropColumn('{{%calendar_events}}', 'timezone');
        }

        if ($this->db->columnExists('{{%calendar_calendars}}', 'defaultTimezone')) {
            $this->dropColumn('{{%calendar_calendars}}', 'defaultTimezone');
        }

        return true;
    }
}
