<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Table;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Records\CalendarRecord;

class m261011_000000_AddScheduling extends Migration
{
    public function safeUp(): bool
    {
        if (!$this->db->columnExists(CalendarRecord::TABLE, 'type')) {
            $this->addColumn(CalendarRecord::TABLE, 'type', $this->string(32)->notNull()->defaultValue('events'));
            $this->addColumn(CalendarRecord::TABLE, 'scheduling', $this->text());
        }
        if (!$this->db->tableExists(Booking::TABLE)) {
            $this->createTable(Booking::TABLE, [
                'id' => $this->integer()->notNull(),
                'calendarId' => $this->integer()->notNull(),
                'startDate' => $this->dateTime()->notNull(),
                'endDate' => $this->dateTime()->notNull(),
                'customerName' => $this->string()->notNull(),
                'customerEmail' => $this->string()->notNull(),
                'notes' => $this->text(),
                'bookingStatus' => $this->string(32)->notNull()->defaultValue('requested'),
                'buffer' => $this->integer()->notNull()->defaultValue(0),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
                'PRIMARY KEY ([[id]])',
            ]);
            $this->createIndex(null, Booking::TABLE, ['calendarId', 'bookingStatus', 'startDate']);
            $this->addForeignKey(null, Booking::TABLE, ['id'], Table::ELEMENTS, ['id'], 'CASCADE');
            $this->addForeignKey(null, Booking::TABLE, ['calendarId'], CalendarRecord::TABLE, ['id'], 'CASCADE');
        }

        return true;
    }

    public function safeDown(): bool
    {
        return false;
    }
}
