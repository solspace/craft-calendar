<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use RRule\RRuleInterface;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Records\OccurrenceRecord;
use Solspace\Calendar\Records\OccurrenceWindowRecord;

class OccurrenceMaterializer
{
    private const BATCH_INSERT_SIZE = 500;

    public function regenerate(CalendarEvent $element, ?Carbon $generatedThrough = null): void
    {
        $this->delete($element);
        $this->materialize($element, $generatedThrough);
    }

    public function delete(CalendarEvent $element): void
    {
        OccurrenceWindowRecord::deleteAll(['eventId' => $element->id]);
        OccurrenceRecord::deleteAll(['eventId' => $element->id]);
    }

    public function materialize(CalendarEvent $element, ?Carbon $generatedThrough = null): void
    {
        $rrule = $element->getRRuleObject();
        if (null === $rrule) {
            $timeDelta = $element->startDate->diff($element->endDate);
            $this->insertOccurrenceRows([
                $this->createOccurrenceRow($element, $element->startDate, $timeDelta),
            ]);

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
        $rows = [];
        $seen = [];

        foreach ($this->getOccurrenceDates($rrule, $generatedThrough, $startsAfter) as $occurrence) {
            $key = $occurrence->format('Y-m-d H:i:s');
            if (isset($seen[$key])) {
                continue;
            }

            $seen[$key] = true;
            $rows[] = $this->createOccurrenceRow($element, $occurrence, $timeDelta);

            if (\count($rows) >= self::BATCH_INSERT_SIZE) {
                $this->insertOccurrenceRows($rows);
                $rows = [];
            }
        }

        if ($rows) {
            $this->insertOccurrenceRows($rows);
        }
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
        Carbon $startDate,
        \DateInterval $timeDelta,
    ): array {
        $endDate = $startDate->copy()->add($timeDelta);
        $now = Db::prepareDateForDb(new Carbon('now', DateHelper::UTC));

        return [
            (int) $element->id,
            (int) $element->calendarId,
            Db::prepareDateForDb($startDate),
            Db::prepareDateForDb($endDate),
            (bool) $element->allDay,
            $now,
            $now,
            StringHelper::UUID(),
        ];
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
                ['eventId', 'calendarId', 'startDate', 'endDate', 'allDay', 'dateCreated', 'dateUpdated', 'uid'],
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
