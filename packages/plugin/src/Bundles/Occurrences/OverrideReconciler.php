<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use craft\db\Query;
use craft\db\Table;
use craft\helpers\Db;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Records\OccurrenceCodeRecord;
use Solspace\Calendar\Records\OccurrenceOverrideRecord;
use Solspace\Calendar\Records\OccurrenceRecord;

/**
 * Keeps an event's overrides on their occurrences when its schedule changes.
 *
 * When every occurrence moved the same distance, overrides and occurrence codes move with them.
 * Otherwise an override whose occurrence the schedule no longer produces is marked orphaned,
 * and un-marked again once the schedule brings the occurrence back.
 */
class OverrideReconciler
{
    public function __construct(
        private OccurrenceMaterializer $materializer = new OccurrenceMaterializer(),
    ) {}

    /**
     * Runs before the event's occurrence rows are regenerated, while they still describe its previous schedule.
     */
    public function reconcile(CalendarEvent $event): void
    {
        $overrides = $this->findOverrides((int) $event->id);
        if (!$overrides) {
            return;
        }

        $shift = $this->detectShift($event, (int) $event->id);
        if (null !== $shift) {
            $overrides = $this->shiftOverrides($overrides, $shift);
            $this->shiftCodes((int) $event->id, $shift);
        }

        foreach ($overrides as $override) {
            $orphaned = !$this->materializer->producesRecurrenceId($event, new Carbon($override['recurrenceId'], DateHelper::UTC));

            if ($orphaned !== (bool) $override['orphaned']) {
                Db::update(OccurrenceOverrideRecord::TABLE, ['orphaned' => $orphaned], ['id' => $override['id']]);
            }
        }
    }

    /**
     * What saving a changed schedule would do to an event's overrides, without saving anything.
     * Compares with the live event's occurrences, the same way saving (or applying a draft) does.
     *
     * @param string[] $recurrenceIds the overrides' recurrence IDs
     *
     * @return array{shift: ?int, orphaned: string[]} the seconds every occurrence would move by, and the
     *                                                recurrence IDs of the overrides that would be orphaned
     */
    public function preview(CalendarEvent $changed, int $liveEventId, array $recurrenceIds): array
    {
        $shift = $this->detectShift($changed, $liveEventId);
        $orphaned = [];

        foreach ($recurrenceIds as $recurrenceId) {
            $date = new Carbon($recurrenceId, DateHelper::UTC);
            if (null !== $shift) {
                $date->addSeconds($shift);
            }

            if (!$this->materializer->producesRecurrenceId($changed, $date)) {
                $orphaned[] = $recurrenceId;
            }
        }

        return ['shift' => $shift, 'orphaned' => $orphaned];
    }

    private function detectShift(CalendarEvent $event, int $liveEventId): ?int
    {
        $before = (new Query())
            ->select(['recurrenceId'])
            ->from(OccurrenceRecord::TABLE)
            ->where(['eventId' => $liveEventId])
            ->orderBy(['recurrenceId' => \SORT_ASC])
            ->column()
        ;

        if (!$before) {
            return null;
        }

        return ScheduleShift::detect(
            $before,
            $this->materializer->recurrenceIds($event, \count($before) + 1),
            $this->materializer->hasAllOccurrences($liveEventId),
        );
    }

    /**
     * @return array<int, array{id: int, recurrenceId: string, orphaned: bool|int|string}>
     */
    private function findOverrides(int $eventId): array
    {
        return (new Query())
            ->select(['overrides.id', 'overrides.recurrenceId', 'overrides.orphaned'])
            ->from(['overrides' => OccurrenceOverrideRecord::TABLE])
            ->innerJoin(['elements' => Table::ELEMENTS], '[[elements.id]] = [[overrides.id]]')
            ->where(['overrides.primaryOwnerId' => $eventId, 'elements.dateDeleted' => null])
            ->all()
        ;
    }

    private function shiftOverrides(array $overrides, int $seconds): array
    {
        foreach ($overrides as &$override) {
            $override['recurrenceId'] = (new Carbon($override['recurrenceId'], DateHelper::UTC))
                ->addSeconds($seconds)
                ->format(RecurrenceId::FORMAT)
            ;

            Db::update(OccurrenceOverrideRecord::TABLE, ['recurrenceId' => $override['recurrenceId']], ['id' => $override['id']]);
        }

        return $overrides;
    }

    /**
     * Codes are keyed by recurrence ID, and shifting them in place could collide with the next
     * occurrence's key, so they're deleted and written back shifted.
     */
    private function shiftCodes(int $eventId, int $seconds): void
    {
        $codes = (new Query())
            ->select(['recurrenceId', 'code', 'dateCreated', 'dateUpdated', 'uid'])
            ->from(OccurrenceCodeRecord::TABLE)
            ->where(['eventId' => $eventId])
            ->all()
        ;

        if (!$codes) {
            return;
        }

        $rows = array_map(static fn (array $code) => [
            $eventId,
            (new Carbon($code['recurrenceId'], DateHelper::UTC))->addSeconds($seconds)->format(RecurrenceId::FORMAT),
            $code['code'],
            $code['dateCreated'],
            $code['dateUpdated'],
            $code['uid'],
        ], $codes);

        Db::delete(OccurrenceCodeRecord::TABLE, ['eventId' => $eventId]);

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
