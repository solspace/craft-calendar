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
 * Keeps one durable code per event and recurrence ID. A code is created the first time its occurrence is
 * generated and stays with that occurrence: regenerating the event's occurrences keeps it, a schedule shift
 * re-keys it to the occurrence's new recurrence ID, and a split moves it to the part the occurrence ends up in.
 * An occurrence that leaves the schedule and comes back gets its old code back.
 */
class OccurrenceCodes
{
    private const MAX_INSERT_ATTEMPTS = 3;
    private const BATCH_INSERT_SIZE = 500;
    private const COLUMNS = ['eventId', 'recurrenceId', 'code', 'dateCreated', 'dateUpdated', 'uid'];

    public function __construct(
        private OccurrenceCodeGenerator $generator = new OccurrenceCodeGenerator(),
    ) {}

    /**
     * @param string[] $recurrenceIds
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
            $codes = $this->findAll($eventId, $recurrenceIds);
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

    public function find(int $eventId, string $recurrenceId): ?string
    {
        return $this->findAll($eventId, [$recurrenceId])[$recurrenceId] ?? null;
    }

    /**
     * Re-keys every code of the event when its whole schedule moved by the same distance. Codes are
     * deleted and written back, because moving them in place can collide with the next occurrence's key.
     */
    public function shift(int $eventId, int $seconds): void
    {
        $codes = (new Query())
            ->select(self::COLUMNS)
            ->from(OccurrenceCodeRecord::TABLE)
            ->where(['eventId' => $eventId])
            ->all()
        ;

        if (!$codes) {
            return;
        }

        Db::delete(OccurrenceCodeRecord::TABLE, ['eventId' => $eventId]);

        foreach (array_chunk($codes, self::BATCH_INSERT_SIZE) as $chunk) {
            $this->insertRows(array_map(static fn (array $code) => [
                $eventId,
                RecurrenceId::shift($code['recurrenceId'], $seconds),
                $code['code'],
                $code['dateCreated'],
                $code['dateUpdated'],
                $code['uid'],
            ], $chunk));
        }
    }

    /**
     * Gives the occurrences before a recurrence ID their codes on the event they move to in a split,
     * replacing any codes that event was given when it was created.
     */
    public function moveBefore(int $fromEventId, int $toEventId, string $recurrenceId): void
    {
        Db::delete(OccurrenceCodeRecord::TABLE, ['eventId' => $toEventId]);
        Db::update(
            OccurrenceCodeRecord::TABLE,
            ['eventId' => $toEventId],
            ['and', ['eventId' => $fromEventId], ['<', 'recurrenceId', $recurrenceId]],
        );
    }

    /**
     * @param string[] $recurrenceIds
     *
     * @return array<string, string> recurrence ID => code
     */
    private function findAll(int $eventId, array $recurrenceIds): array
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

        $this->insertRows($rows);
    }

    private function insertRows(array $rows): void
    {
        \Craft::$app->getDb()
            ->createCommand()
            ->batchInsert(OccurrenceCodeRecord::TABLE, self::COLUMNS, $rows)
            ->execute()
        ;
    }
}
