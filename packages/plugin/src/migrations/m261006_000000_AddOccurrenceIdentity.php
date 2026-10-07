<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Query;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceCodeGenerator;
use yii\db\Expression;

/**
 * Gives every occurrence a permanent identity: the recurrence ID it was generated for,
 * and a durable code that's unique across the install.
 */
class m261006_000000_AddOccurrenceIdentity extends Migration
{
    private const EVENTS = '{{%calendar_events}}';
    private const OCCURRENCES = '{{%calendar_events_occurrences}}';
    private const CODES = '{{%calendar_occurrence_codes}}';

    private const BATCH_SIZE = 1000;

    public function safeUp(): bool
    {
        $this->addRecurrenceIds();
        $this->createCodesTable();
        $this->addCodes();
        $this->addOccurrenceStateColumns();
        $this->addSeriesId();

        return true;
    }

    public function safeDown(): bool
    {
        if ($this->db->columnExists(self::EVENTS, 'seriesId')) {
            $this->dropIndexIfExists(self::EVENTS, ['seriesId']);
            $this->dropColumn(self::EVENTS, 'seriesId');
        }

        foreach (['overrideId', 'cancelled'] as $column) {
            if ($this->db->columnExists(self::OCCURRENCES, $column)) {
                $this->dropColumn(self::OCCURRENCES, $column);
            }
        }

        if ($this->db->columnExists(self::OCCURRENCES, 'code')) {
            $this->dropIndexIfExists(self::OCCURRENCES, ['code'], true);
            $this->dropColumn(self::OCCURRENCES, 'code');
        }

        $this->dropTableIfExists(self::CODES);

        if ($this->db->columnExists(self::OCCURRENCES, 'recurrenceId')) {
            $this->replacePrimaryKey(self::OCCURRENCES, 'pk_calendar_events_occurrences', ['eventId', 'startDate']);
            $this->dropColumn(self::OCCURRENCES, 'recurrenceId');
        }

        return true;
    }

    /**
     * Until now an occurrence was identified by its start date, which is always
     * the start its schedule produced, so that's its recurrence ID.
     */
    private function addRecurrenceIds(): void
    {
        if (!$this->db->columnExists(self::OCCURRENCES, 'recurrenceId')) {
            $this->addColumn(self::OCCURRENCES, 'recurrenceId', $this->dateTime()->after('calendarId'));
            $this->update(self::OCCURRENCES, ['recurrenceId' => new Expression('[[startDate]]')], '', [], false);
            $this->alterColumn(self::OCCURRENCES, 'recurrenceId', $this->dateTime()->notNull());
        }

        $this->replacePrimaryKey(self::OCCURRENCES, 'pk_calendar_events_occurrences', ['eventId', 'recurrenceId']);
    }

    private function createCodesTable(): void
    {
        if ($this->db->tableExists(self::CODES)) {
            return;
        }

        $this->createTable(self::CODES, [
            'eventId' => $this->integer()->notNull(),
            'recurrenceId' => $this->dateTime()->notNull(),
            'code' => $this->string(OccurrenceCodeGenerator::LENGTH)->notNull(),
            'dateCreated' => $this->dateTime()->notNull(),
            'dateUpdated' => $this->dateTime()->notNull(),
            'uid' => $this->uid(),
        ]);

        $this->addPrimaryKey('pk_calendar_occurrence_codes', self::CODES, ['eventId', 'recurrenceId']);
        $this->createIndex('calendar_occurrence_codes_code_unq_idx', self::CODES, ['code'], true);
        $this->addForeignKey('occurrence_codes_event_id_fk', self::CODES, ['eventId'], self::EVENTS, ['id'], 'CASCADE');
    }

    private function addCodes(): void
    {
        if (!$this->db->columnExists(self::OCCURRENCES, 'code')) {
            $this->addColumn(
                self::OCCURRENCES,
                'code',
                $this->string(OccurrenceCodeGenerator::LENGTH)->after('recurrenceId'),
            );
        }

        $this->createMissingCodes();

        $this->update(
            self::OCCURRENCES,
            [
                'code' => new Expression(
                    '(SELECT [[c.code]] FROM '.self::CODES.' [[c]] '
                    .'WHERE [[c.eventId]] = '.self::OCCURRENCES.'.[[eventId]] '
                    .'AND [[c.recurrenceId]] = '.self::OCCURRENCES.'.[[recurrenceId]])'
                ),
            ],
            ['code' => null],
            [],
            false,
        );

        $this->alterColumn(self::OCCURRENCES, 'code', $this->string(OccurrenceCodeGenerator::LENGTH)->notNull());
        $this->createIndex('calendar_events_occurrences_code_unq_idx', self::OCCURRENCES, ['code'], true);
    }

    /**
     * Works in batches, so memory use doesn't grow with the number of occurrences.
     */
    private function createMissingCodes(): void
    {
        // Rows drop out of this query once their codes are inserted, so it can simply be re-run
        $missing = (new Query())
            ->select(['o.eventId', 'o.recurrenceId'])
            ->from(['o' => self::OCCURRENCES])
            ->leftJoin(['c' => self::CODES], '[[c.eventId]] = [[o.eventId]] AND [[c.recurrenceId]] = [[o.recurrenceId]]')
            ->where(['c.code' => null])
            ->orderBy(['o.eventId' => \SORT_ASC, 'o.recurrenceId' => \SORT_ASC])
            ->limit(self::BATCH_SIZE)
        ;

        $generator = new OccurrenceCodeGenerator();
        $now = Db::prepareDateForDb(new \DateTime());

        while ($occurrences = $missing->all($this->db)) {
            $codes = $generator->generateUnique(
                \count($occurrences),
                fn (array $candidates) => (new Query())
                    ->select(['code'])
                    ->from(self::CODES)
                    ->where(['code' => $candidates])
                    ->column($this->db),
            );

            $rows = [];
            foreach ($occurrences as $index => $occurrence) {
                $rows[] = [
                    (int) $occurrence['eventId'],
                    $occurrence['recurrenceId'],
                    $codes[$index],
                    $now,
                    $now,
                    StringHelper::UUID(),
                ];
            }

            $this->batchInsert(
                self::CODES,
                ['eventId', 'recurrenceId', 'code', 'dateCreated', 'dateUpdated', 'uid'],
                $rows,
            );
        }
    }

    private function addOccurrenceStateColumns(): void
    {
        if (!$this->db->columnExists(self::OCCURRENCES, 'cancelled')) {
            $this->addColumn(
                self::OCCURRENCES,
                'cancelled',
                $this->boolean()->notNull()->defaultValue(false)->after('allDay'),
            );
        }

        if (!$this->db->columnExists(self::OCCURRENCES, 'overrideId')) {
            $this->addColumn(self::OCCURRENCES, 'overrideId', $this->integer()->after('cancelled'));
        }
    }

    private function addSeriesId(): void
    {
        if ($this->db->columnExists(self::EVENTS, 'seriesId')) {
            return;
        }

        $this->addColumn(self::EVENTS, 'seriesId', $this->integer()->after('calendarId'));
        $this->createIndex('calendar_events_seriesId_idx', self::EVENTS, ['seriesId']);
    }

    private function replacePrimaryKey(string $table, string $name, array $columns): void
    {
        $primaryKey = $this->db->getSchema()->getTablePrimaryKey($table, true);
        if ($primaryKey && $primaryKey->columnNames === $columns) {
            return;
        }

        if ($this->db->getIsMysql()) {
            // One statement, so the event foreign key never loses the index it relies on
            $columnList = implode(', ', array_map(fn (string $column) => $this->db->quoteColumnName($column), $columns));
            $dropPrimaryKey = $primaryKey ? 'DROP PRIMARY KEY, ' : '';

            $this->execute(\sprintf(
                'ALTER TABLE %s %sADD PRIMARY KEY (%s)',
                $this->db->quoteTableName($table),
                $dropPrimaryKey,
                $columnList,
            ));

            return;
        }

        if ($primaryKey) {
            $this->dropPrimaryKey($primaryKey->name, $table);
        }

        $this->addPrimaryKey($name, $table, $columns);
    }
}
