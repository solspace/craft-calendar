<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use craft\db\Query;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Records\OccurrenceCodeRecord;
use yii\db\IntegrityException;

/**
 * Keeps one durable code per event and recurrence ID. A code is created the
 * first time its occurrence is generated and never changes, so occurrence
 * regeneration can freely delete and re-insert occurrence rows.
 */
class OccurrenceCodes
{
    private const MAX_INSERT_ATTEMPTS = 3;

    public function __construct(
        private OccurrenceCodeGenerator $generator = new OccurrenceCodeGenerator(),
    ) {}

    /**
     * @param string[] $recurrenceIds DB-formatted recurrence IDs
     *
     * @return array<string, string> recurrence ID => code
     */
    public function ensure(int $eventId, array $recurrenceIds): array
    {
        $recurrenceIds = array_values(array_unique($recurrenceIds));
        if (!$recurrenceIds) {
            return [];
        }

        for ($attempt = 1;; ++$attempt) {
            $codes = $this->find($eventId, $recurrenceIds);
            $missing = array_values(array_diff($recurrenceIds, array_keys($codes)));
            if (!$missing) {
                return $codes;
            }

            $newCodes = $this->generator->generateUnique(
                \count($missing),
                fn (array $candidates) => $this->findTaken($candidates),
            );

            // Savepoint, so a failed insert doesn't abort an outer transaction on PostgreSQL
            $transaction = \Craft::$app->getDb()->beginTransaction();

            try {
                $this->insert($eventId, $missing, $newCodes);
                $transaction->commit();
            } catch (IntegrityException $exception) {
                // A concurrent request took one of the codes, or already created codes for these occurrences
                $transaction->rollBack();

                if ($attempt >= self::MAX_INSERT_ATTEMPTS) {
                    throw $exception;
                }

                continue;
            }

            return $codes + array_combine($missing, $newCodes);
        }
    }

    /**
     * @param string[] $recurrenceIds
     *
     * @return array<string, string> recurrence ID => code
     */
    private function find(int $eventId, array $recurrenceIds): array
    {
        return (new Query())
            ->select(['recurrenceId', 'code'])
            ->from(OccurrenceCodeRecord::TABLE)
            ->where(['eventId' => $eventId, 'recurrenceId' => $recurrenceIds])
            ->pairs()
        ;
    }

    /**
     * @param string[] $codes
     *
     * @return string[]
     */
    private function findTaken(array $codes): array
    {
        return (new Query())
            ->select(['code'])
            ->from(OccurrenceCodeRecord::TABLE)
            ->where(['code' => $codes])
            ->column()
        ;
    }

    /**
     * @param string[] $recurrenceIds
     * @param string[] $codes
     */
    private function insert(int $eventId, array $recurrenceIds, array $codes): void
    {
        $now = Db::prepareDateForDb(new Carbon('now', DateHelper::UTC));

        $rows = [];
        foreach ($recurrenceIds as $index => $recurrenceId) {
            $rows[] = [$eventId, $recurrenceId, $codes[$index], $now, $now, StringHelper::UUID()];
        }

        \Craft::$app->getDb()
            ->createCommand()
            ->batchInsert(
                OccurrenceCodeRecord::TABLE,
                ['eventId', 'recurrenceId', 'code', 'dateCreated', 'dateUpdated', 'uid'],
                $rows,
            )
            ->execute()
        ;
    }
}
