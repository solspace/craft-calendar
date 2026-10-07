<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Table;
use Solspace\Calendar\Elements\OccurrenceOverride;

/**
 * Adds the tables behind occurrence overrides: the changes made to a single occurrence of an event.
 */
class m261007_000000_AddOccurrenceOverrides extends Migration
{
    private const OVERRIDES = '{{%calendar_occurrence_overrides}}';
    private const OVERRIDES_SITES = '{{%calendar_occurrence_overrides_sites}}';

    public function safeUp(): bool
    {
        if (!$this->db->tableExists(self::OVERRIDES)) {
            $this->createTable(self::OVERRIDES, [
                'id' => $this->integer()->notNull(),
                'primaryOwnerId' => $this->integer()->notNull(),
                'recurrenceId' => $this->dateTime()->notNull(),
                'startDate' => $this->dateTime(),
                'endDate' => $this->dateTime(),
                'allDay' => $this->boolean(),
                'cancelled' => $this->boolean()->notNull()->defaultValue(false),
                'orphaned' => $this->boolean()->notNull()->defaultValue(false),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]);

            $this->addPrimaryKey('pk_calendar_occurrence_overrides', self::OVERRIDES, ['id']);
            $this->createIndex(
                'calendar_occurrence_overrides_owner_recurrence_idx',
                self::OVERRIDES,
                ['primaryOwnerId', 'recurrenceId'],
            );
            $this->addForeignKey('occurrence_overrides_id_fk', self::OVERRIDES, ['id'], Table::ELEMENTS, ['id'], 'CASCADE');
            $this->addForeignKey(
                'occurrence_overrides_owner_fk',
                self::OVERRIDES,
                ['primaryOwnerId'],
                Table::ELEMENTS,
                ['id'],
                'CASCADE',
            );
        }

        if (!$this->db->tableExists(self::OVERRIDES_SITES)) {
            $this->createTable(self::OVERRIDES_SITES, [
                'id' => $this->integer()->notNull(),
                'siteId' => $this->integer()->notNull(),
                'overriddenFields' => $this->json(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]);

            $this->addPrimaryKey('pk_calendar_occurrence_overrides_sites', self::OVERRIDES_SITES, ['id', 'siteId']);
            $this->addForeignKey(
                'occurrence_overrides_sites_id_fk',
                self::OVERRIDES_SITES,
                ['id'],
                Table::ELEMENTS,
                ['id'],
                'CASCADE',
            );
            $this->addForeignKey(
                'occurrence_overrides_sites_site_fk',
                self::OVERRIDES_SITES,
                ['siteId'],
                Table::SITES,
                ['id'],
                'CASCADE',
            );
        }

        return true;
    }

    public function safeDown(): bool
    {
        $this->delete(Table::ELEMENTS, ['type' => OccurrenceOverride::class]);
        $this->dropTableIfExists(self::OVERRIDES_SITES);
        $this->dropTableIfExists(self::OVERRIDES);

        return true;
    }
}
