<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use craft\db\Query;
use craft\db\Table;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use RRule\RRuleInterface;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Records\OccurrenceOverrideRecord;
use Solspace\Calendar\Records\OccurrenceRecord;
use Solspace\Calendar\Records\OccurrenceWindowRecord;

class OccurrenceMaterializer
{
    private const BATCH_INSERT_SIZE = 500;

    public function __construct(
        private OccurrenceCodes $codes = new OccurrenceCodes(),
    ) {}

    public function regenerate(CalendarEvent $element, ?Carbon $generatedThrough = null): void
    {
        $this->delete($element);
        $this->materialize($element, $generatedThrough);
    }

    /**
     * Occurrence codes are deliberately kept, so an occurrence that comes back gets its old code.
     */
    public function delete(CalendarEvent $element): void
    {
        OccurrenceWindowRecord::deleteAll(['eventId' => $element->id]);
        OccurrenceRecord::deleteAll(['eventId' => $element->id]);
    }

    public function materialize(CalendarEvent $element, ?Carbon $generatedThrough = null): void
    {
        $rrule = $element->getRRuleObject();
        if (null === $rrule) {
            $this->insertOccurrences(
                $element,
                [$element->startDate],
                $element->startDate->diff($element->endDate),
            );

            return;
        }

        $windowEnd = $rrule->isInfinite()
            ? ($generatedThrough ?? $this->defaultInfiniteGeneratedThrough())
            : null;

        $this->insertGeneratedOccurrences($element, $rrule, $windowEnd);

        if ($windowEnd) {
            $this->insertOccurrenceWindowRow($element, $windowEnd);
        }
    }

    /**
     * Updates one occurrence after its override changed, instead of regenerating the whole event.
     */
    public function refreshOccurrence(CalendarEvent $element, Carbon $recurrenceId): void
    {
        $key = Db::prepareDateForDb($recurrenceId);
        $condition = ['eventId' => $element->id, 'recurrenceId' => $key];

        if (!(new Query())->from(OccurrenceRecord::TABLE)->where($condition)->exists()) {
            return;
        }

        $occurrence = $this->resolveOccurrence(
            $element,
            $recurrenceId,
            $element->startDate->diff($element->endDate),
            $this->findOverrides((int) $element->id, [$key])[$key] ?? null,
        );

        Db::update(OccurrenceRecord::TABLE, $occurrence, $condition);
    }

    /**
     * Whether the event's schedule produces an occurrence with this recurrence ID.
     */
    public function producesRecurrenceId(CalendarEvent $element, Carbon $recurrenceId): bool
    {
        $key = Db::prepareDateForDb($recurrenceId);

        $rrule = $element->getRRuleObject();
        if (null === $rrule) {
            return Db::prepareDateForDb($element->startDate) === $key;
        }

        foreach ($this->getOccurrenceDates($rrule) as $date) {
            $current = Db::prepareDateForDb($date);
            if ($current >= $key) {
                return $current === $key;
            }
        }

        return false;
    }

    public function defaultInfiniteGeneratedThrough(): Carbon
    {
        return new Carbon('+2 years', DateHelper::UTC);
    }

    public function extend(CalendarEvent $element, Carbon $generatedThrough): void
    {
        $rrule = $element->getRRuleObject();
        if (null === $rrule || !$rrule->isInfinite()) {
            return;
        }

        $lockName = 'calendar-occurrences:'.$element->id;
        $mutex = \Craft::$app->getMutex();
        if (!$mutex->acquire($lockName, 15)) {
            return;
        }

        try {
            $currentWindow = $this->getGeneratedThrough($element);
            if ($currentWindow && $currentWindow >= $generatedThrough) {
                return;
            }

            if (!$currentWindow) {
                $this->regenerate($element, $generatedThrough);

                return;
            }

            $this->insertGeneratedOccurrences($element, $rrule, $generatedThrough, $currentWindow);
            $this->updateOccurrenceWindowRow($element, $generatedThrough);
        } finally {
            $mutex->release($lockName);
        }
    }

    private function insertGeneratedOccurrences(
        CalendarEvent $element,
        RRuleInterface $rrule,
        ?Carbon $generatedThrough = null,
        ?Carbon $startsAfter = null,
    ): void {
        $timeDelta = $element->startDate->diff($element->endDate);
        $recurrenceIds = [];
        $seen = [];

        foreach ($this->getOccurrenceDates($rrule, $generatedThrough, $startsAfter) as $recurrenceId) {
            $key = $recurrenceId->format('Y-m-d H:i:s');
            if (isset($seen[$key])) {
                continue;
            }

            $seen[$key] = true;
            $recurrenceIds[] = $recurrenceId;

            if (\count($recurrenceIds) >= self::BATCH_INSERT_SIZE) {
                $this->insertOccurrences($element, $recurrenceIds, $timeDelta);
                $recurrenceIds = [];
            }
        }

        if ($recurrenceIds) {
            $this->insertOccurrences($element, $recurrenceIds, $timeDelta);
        }
    }

    /**
     * @param Carbon[] $recurrenceIds
     */
    private function insertOccurrences(CalendarEvent $element, array $recurrenceIds, \DateInterval $timeDelta): void
    {
        $keys = array_map(static fn (Carbon $recurrenceId) => Db::prepareDateForDb($recurrenceId), $recurrenceIds);
        $codes = $this->codes->ensure((int) $element->id, $keys);
        $overrides = $this->findOverrides((int) $element->id, $keys);

        $rows = [];
        foreach ($recurrenceIds as $index => $recurrenceId) {
            $key = $keys[$index];
            $rows[] = $this->createOccurrenceRow($element, $recurrenceId, $codes[$key], $timeDelta, $overrides[$key] ?? null);
        }

        $this->insertOccurrenceRows($rows);
    }

    private function getOccurrenceDates(
        RRuleInterface $rrule,
        ?Carbon $generatedThrough = null,
        ?Carbon $startsAfter = null,
    ): iterable {
        foreach ($rrule as $occurrence) {
            $occurrence = new Carbon($occurrence->format('Y-m-d H:i:s'), DateHelper::UTC);

            if ($startsAfter && $occurrence <= $startsAfter) {
                continue;
            }

            if ($generatedThrough && $occurrence > $generatedThrough) {
                break;
            }

            yield $occurrence;
        }
    }

    private function createOccurrenceRow(
        CalendarEvent $element,
        Carbon $recurrenceId,
        string $code,
        \DateInterval $timeDelta,
        ?array $override,
    ): array {
        $occurrence = $this->resolveOccurrence($element, $recurrenceId, $timeDelta, $override);
        $now = Db::prepareDateForDb(new Carbon('now', DateHelper::UTC));

        return [
            (int) $element->id,
            (int) $element->calendarId,
            Db::prepareDateForDb($recurrenceId),
            $code,
            $occurrence['startDate'],
            $occurrence['endDate'],
            $occurrence['allDay'],
            $occurrence['cancelled'],
            $occurrence['overrideId'],
            $now,
            $now,
            StringHelper::UUID(),
        ];
    }

    /**
     * An occurrence starts at its recurrence ID and lasts as long as the event,
     * unless its override gives it its own times.
     *
     * @return array{startDate: string, endDate: string, allDay: bool, cancelled: bool, overrideId: ?int}
     */
    private function resolveOccurrence(
        CalendarEvent $element,
        Carbon $recurrenceId,
        \DateInterval $timeDelta,
        ?array $override,
    ): array {
        $startDate = $recurrenceId;
        $allDay = (bool) $element->allDay;
        $endDate = null;

        if (null !== ($override['startDate'] ?? null)) {
            $startDate = new Carbon($override['startDate'], DateHelper::UTC);
            $endDate = null !== $override['endDate'] ? new Carbon($override['endDate'], DateHelper::UTC) : null;
            $allDay = null !== $override['allDay'] ? (bool) $override['allDay'] : $allDay;
        }

        $endDate ??= $startDate->copy()->add($timeDelta);

        return [
            'startDate' => Db::prepareDateForDb($startDate),
            'endDate' => Db::prepareDateForDb($endDate),
            'allDay' => $allDay,
            'cancelled' => (bool) ($override['cancelled'] ?? false),
            'overrideId' => isset($override['id']) ? (int) $override['id'] : null,
        ];
    }

    /**
     * @param string[] $recurrenceIds
     *
     * @return array<string, array> the event's live overrides, by recurrence ID
     */
    private function findOverrides(int $eventId, array $recurrenceIds): array
    {
        return (new Query())
            ->select([
                'overrides.id',
                'overrides.recurrenceId',
                'overrides.startDate',
                'overrides.endDate',
                'overrides.allDay',
                'overrides.cancelled',
            ])
            ->from(['overrides' => OccurrenceOverrideRecord::TABLE])
            ->innerJoin(['elements' => Table::ELEMENTS], '[[elements.id]] = [[overrides.id]]')
            ->where([
                'overrides.primaryOwnerId' => $eventId,
                'overrides.recurrenceId' => $recurrenceIds,
                'elements.dateDeleted' => null,
            ])
            // If there are ever two for one occurrence, the oldest one wins
            ->orderBy(['overrides.id' => \SORT_DESC])
            ->indexBy('recurrenceId')
            ->all()
        ;
    }

    private function insertOccurrenceRows(array $rows): void
    {
        if (!$rows) {
            return;
        }

        \Craft::$app->db
            ->createCommand()
            ->batchInsert(
                OccurrenceRecord::TABLE,
                [
                    'eventId',
                    'calendarId',
                    'recurrenceId',
                    'code',
                    'startDate',
                    'endDate',
                    'allDay',
                    'cancelled',
                    'overrideId',
                    'dateCreated',
                    'dateUpdated',
                    'uid',
                ],
                $rows,
            )
            ->execute()
        ;
    }

    private function getGeneratedThrough(CalendarEvent $element): ?Carbon
    {
        $generatedThrough = OccurrenceWindowRecord::find()
            ->select(['generatedThrough'])
            ->where(['eventId' => $element->id])
            ->scalar()
        ;

        return $generatedThrough ? new Carbon($generatedThrough, DateHelper::UTC) : null;
    }

    private function insertOccurrenceWindowRow(CalendarEvent $element, Carbon $generatedThrough): void
    {
        $now = Db::prepareDateForDb(new Carbon('now', DateHelper::UTC));

        \Craft::$app->db
            ->createCommand()
            ->insert(
                OccurrenceWindowRecord::TABLE,
                [
                    'eventId' => (int) $element->id,
                    'generatedThrough' => Db::prepareDateForDb($generatedThrough),
                    'dateCreated' => $now,
                    'dateUpdated' => $now,
                    'uid' => StringHelper::UUID(),
                ],
            )
            ->execute()
        ;
    }

    private function updateOccurrenceWindowRow(CalendarEvent $element, Carbon $generatedThrough): void
    {
        \Craft::$app->db
            ->createCommand()
            ->update(
                OccurrenceWindowRecord::TABLE,
                [
                    'generatedThrough' => Db::prepareDateForDb($generatedThrough),
                    'dateUpdated' => Db::prepareDateForDb(new Carbon('now', DateHelper::UTC)),
                ],
                ['eventId' => $element->id],
            )
            ->execute()
        ;
    }
}
