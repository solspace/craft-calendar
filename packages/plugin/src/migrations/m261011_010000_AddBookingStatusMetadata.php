<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Table;
use Solspace\Calendar\Elements\Booking;

class m261011_010000_AddBookingStatusMetadata extends Migration
{
    public function safeUp(): bool
    {
        $columns = [
            'statusChangedAt' => $this->dateTime(),
            'statusChangedById' => $this->integer(),
            'statusChangedByName' => $this->string(),
            'statusChangeSource' => $this->string(32),
        ];
        foreach ($columns as $name => $definition) {
            if (!$this->db->columnExists(Booking::TABLE, $name)) {
                $this->addColumn(Booking::TABLE, $name, $definition);
                if ('statusChangedById' === $name) {
                    $this->addForeignKey(null, Booking::TABLE, [$name], Table::USERS, ['id'], 'SET NULL');
                }
            }
        }

        return true;
    }

    public function safeDown(): bool
    {
        return false;
    }
}
