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

        if (!$this->db->columnExists('{{%calendar_events}}', 'repeatType')) {
            $this->addColumn(
                '{{%calendar_events}}',
                'repeatType',
                $this->string(10)->after('rrule')->defaultValue('NEVER'),
            );

            $this->addColumn(
                '{{%calendar_events}}',
                'repeatEndType',
                $this->string(10)->after('rrule')->defaultValue('NEVER'),
            );
        }

        if (!$this->db->tableExists('{{%calendar_events_occurrences}}')) {
            $this->createTable(
                '{{%calendar_events_occurrences}}',
                [
                    'eventId' => $this->integer()->notNull(),
                    'calendarId' => $this->integer()->notNull(),
                    'startDate' => $this->dateTime()->notNull(),
                    'endDate' => $this->dateTime(),
                    'allDay' => $this->boolean(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                ]
            );

            $this->addPrimaryKey(
                'pk_calendar_events_occurrences',
                '{{%calendar_events_occurrences}}',
                ['eventId', 'startDate'],
            );

            $this->createIndex('occurrences_calendar_start_idx', '{{%calendar_events_occurrences}}', ['calendarId', 'startDate']);
            $this->createIndex('occurrences_calendar_end_idx', '{{%calendar_events_occurrences}}', ['calendarId', 'endDate']);
            $this->createIndex('occurrences_event_start_idx_unq', '{{%calendar_events_occurrences}}', ['eventId', 'startDate'], true);
            $this->createIndex('occurrences_event_end_idx', '{{%calendar_events_occurrences}}', ['eventId', 'endDate']);
            $this->createIndex('occurrences_start_utc_idx', '{{%calendar_events_occurrences}}', ['startDate']);
            $this->createIndex('occurrences_end_utc_idx', '{{%calendar_events_occurrences}}', ['endDate']);

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
            $this->dropForeignKeyIfExists('{{%calendar_events_occurrences}}', 'occurrences_event_id_fk');
            $this->dropForeignKeyIfExists('{{%calendar_events_occurrences}}', 'occurrences_calendar_id_fk');
            $this->dropTable('{{%calendar_events_occurrences}}');
        }

        if ($this->db->columnExists('{{%calendar_events}}', 'timezone')) {
            $this->dropColumn('{{%calendar_events}}', 'timezone');
        }

        if ($this->db->columnExists('{{%calendar_calendars}}', 'defaultTimezone')) {
            $this->dropColumn('{{%calendar_calendars}}', 'defaultTimezone');
        }

        if ($this->db->columnExists('{{%calendar_events}}', 'repeatType')) {
            $this->dropColumn('{{%calendar_events}}', 'repeatType');
            $this->dropColumn('{{%calendar_events}}', 'repeatEndType');
        }

        return true;
    }
}
