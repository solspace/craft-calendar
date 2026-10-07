<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use craft\db\Query;
use craft\helpers\Db;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Records\OccurrenceOverrideRecord;
use Solspace\Calendar\Records\OccurrenceRecord;

/**
 * Keeps an event's overrides and occurrence codes on their occurrences when its schedule changes.
 *
 * When the whole schedule moved by the same distance (see ScheduleShift), codes move with it, and so do the
 * overrides of the old schedule: those of its occurrences, and orphaned ones, which are kept for occurrences the
 * schedule may bring back. Other overrides were made for the new schedule, like the ones a draft with the new
 * schedule brings along when it's applied, so they stay where they are.
 *
 * Then an override whose occurrence the schedule no longer produces is marked orphaned, and un-marked
 * again once the schedule brings the occurrence back.
 */
class OverrideReconciler
{
    public function __construct(
        private OccurrenceMaterializer $materializer = new OccurrenceMaterializer(),
        private OccurrenceCodes $codes = new OccurrenceCodes(),
    ) {}

    /**
     * Runs before the event's occurrence rows are regenerated, while they still describe its previous schedule.
     *
     * @param null|int $shift seconds the whole schedule was moved by, when the change says so itself
     */
    public function reconcile(CalendarEvent $event, ?int $shift = null): void
    {
        $eventId = (int) $event->id;
        $previous = $this->findPreviousSchedule($eventId);
        $shift ??= $this->detectShift($event, $previous);

        if ($shift) {
            $this->codes->shift($eventId, $shift);
        }

        $overrides = OccurrenceOverrideRecord::findForEvent($eventId)
            ->select(['overrides.id', 'overrides.recurrenceId', 'overrides.orphaned'])
            ->all()
        ;

        foreach ($overrides as $override) {
            $changes = [];
            $recurrenceId = $override['recurrenceId'];

            if ($shift && $this->belongsToPreviousSchedule($override, $previous)) {
                $recurrenceId = $changes['recurrenceId'] = RecurrenceId::shift($recurrenceId, $shift);
            }

            $orphaned = !$this->materializer->producesRecurrenceId($event, RecurrenceId::toCarbon($recurrenceId));
            if ($orphaned !== (bool) $override['orphaned']) {
                $changes['orphaned'] = $orphaned;
            }

            if ($changes) {
                Db::update(OccurrenceOverrideRecord::TABLE, $changes, ['id' => $override['id']]);
            }
        }
    }

    /**
     * What saving a changed schedule would do to an event's overrides, without saving anything.
     * Compares with the live event's occurrences, the same way saving (or applying a draft) does.
     *
     * @param array<array{recurrenceId: string, orphaned: bool}> $overrides
     *
     * @return array{shift: ?int, orphaned: string[]} the seconds every occurrence would move by, and the
     *                                                recurrence IDs of the overrides that would be orphaned
     */
    public function preview(CalendarEvent $changed, int $liveEventId, array $overrides): array
    {
        $previous = $this->findPreviousSchedule($liveEventId);
        $shift = $this->detectShift($changed, $previous);
        $orphaned = [];

        foreach ($overrides as $override) {
            $recurrenceId = $shift && $this->belongsToPreviousSchedule($override, $previous)
                ? RecurrenceId::shift($override['recurrenceId'], $shift)
                : $override['recurrenceId'];

            if (!$this->materializer->producesRecurrenceId($changed, RecurrenceId::toCarbon($recurrenceId))) {
                $orphaned[] = $override['recurrenceId'];
            }
        }

        return ['shift' => $shift, 'orphaned' => $orphaned];
    }

    /**
     * The event's occurrences before the change: its rows, and how far ahead they go for an infinite schedule.
     *
     * @return array{recurrenceIds: array<string, string>, generatedThrough: ?string}
     */
    private function findPreviousSchedule(int $eventId): array
    {
        $recurrenceIds = (new Query())
            ->select(['recurrenceId'])
            ->from(OccurrenceRecord::TABLE)
            ->where(['eventId' => $eventId])
            ->orderBy(['recurrenceId' => \SORT_ASC])
            ->column()
        ;

        return [
            'recurrenceIds' => array_combine($recurrenceIds, $recurrenceIds),
            'generatedThrough' => $this->materializer->getGeneratedThrough($eventId)?->format(RecurrenceId::FORMAT),
        ];
    }

    private function detectShift(CalendarEvent $event, array $previous): ?int
    {
        if (!$previous['recurrenceIds']) {
            return null;
        }

        return ScheduleShift::detect(
            $previous['recurrenceIds'],
            $this->materializer->recurrenceIds($event, \count($previous['recurrenceIds']) + 1),
            null === $previous['generatedThrough'],
        );
    }

    /**
     * Past an infinite schedule's generated rows, an override is taken to be on the schedule.
     *
     * @param array{recurrenceId: string, orphaned: mixed} $override
     */
    private function belongsToPreviousSchedule(array $override, array $previous): bool
    {
        $recurrenceId = $override['recurrenceId'];

        return $override['orphaned']
            || isset($previous['recurrenceIds'][$recurrenceId])
            || (null !== $previous['generatedThrough'] && $recurrenceId > $previous['generatedThrough']);
    }
}
