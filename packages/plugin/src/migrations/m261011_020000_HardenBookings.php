<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Scheduling\BookingRateLimit;

class m261011_020000_HardenBookings extends Migration
{
    public function safeUp(): bool
    {
        if (!$this->db->columnExists(Booking::TABLE, 'notificationUid')) {
            $this->addColumn(Booking::TABLE, 'notificationUid', $this->string(40));
        }
        if (!$this->db->tableExists(BookingRateLimit::TABLE)) {
            $this->createTable(BookingRateLimit::TABLE, [
                'id' => $this->string(64)->notNull(),
                'attempts' => $this->integer()->notNull()->defaultValue(0),
                'expiresAt' => $this->dateTime()->notNull(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
                'PRIMARY KEY ([[id]])',
            ]);
            $this->createIndex(null, BookingRateLimit::TABLE, ['expiresAt']);
        }

        return true;
    }

    public function safeDown(): bool
    {
        return false;
    }
}
