<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use Solspace\Calendar\Elements\Event;

class m261009_000000_AddEventExpiryDate extends Migration
{
    public function safeUp(): bool
    {
        if (!$this->db->columnExists(Event::TABLE, 'expiryDate')) {
            $this->addColumn(Event::TABLE, 'expiryDate', $this->dateTime());
            $this->createIndex(null, Event::TABLE, ['expiryDate']);
        }

        return true;
    }

    public function safeDown(): bool
    {
        if ($this->db->columnExists(Event::TABLE, 'expiryDate')) {
            $this->dropColumn(Event::TABLE, 'expiryDate');
        }

        return true;
    }
}
