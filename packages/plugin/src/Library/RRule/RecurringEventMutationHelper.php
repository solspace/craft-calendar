<?php

namespace Solspace\Calendar\Library\RRule;

use Carbon\Carbon;
use RRule\RRule;
use RRule\RSet;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;

class RecurringEventMutationHelper
{
    public function deleteOccurrence(Event $event, Carbon $occurrence): void
    {
        $event->rrule = $this->deleteOccurrenceRRule(
            $event->getRRuleRFCString(),
            $event->getStartDate(),
            $event->isAllDay(),
            $occurrence,
        );
    }

    public function moveSeries(Event $event, Carbon $occurrence, Carbon $newOccurrenceStart, bool $allDay): void
    {
        $originalStart = $this->normalizeDate($event->getStartDate(), $event->isAllDay());
        $originalEnd = $this->normalizeEndDate($event->getEndDate(), $event->isAllDay());
        $normalizedOccurrence = $this->normalizeDate($occurrence, $event->isAllDay());
        $normalizedNewOccurrence = $this->normalizeDate($newOccurrenceStart, $allDay);
        $deltaSeconds = $normalizedNewOccurrence->getTimestamp() - $normalizedOccurrence->getTimestamp();

        $event->startDate = $this->normalizeDate($originalStart->copy()->addSeconds($deltaSeconds), $allDay);
        $event->endDate = $this->normalizeEndDate($originalEnd->copy()->addSeconds($deltaSeconds), $allDay);
        $event->allDay = $allDay;
        $event->setScheduleShift($deltaSeconds);
        $event->rrule = $this->moveSeriesRRule(
            $event->getRRuleRFCString(),
            $originalStart,
            $event->getStartDate(),
            $deltaSeconds,
            $allDay,
        );
    }

    public function resizeSeries(
        Event $event,
        bool $allDay,
        int $startDeltaSeconds = 0,
        int $endDeltaSeconds = 0,
    ): void {
        $originalStart = $this->normalizeDate($event->getStartDate(), $event->isAllDay());
        $originalEnd = $this->normalizeEndDate($event->getEndDate(), $event->isAllDay());

        $event->startDate = $this->normalizeDate($originalStart->copy()->addSeconds($startDeltaSeconds), $allDay);
        $event->endDate = $this->normalizeEndDate($originalEnd->copy()->addSeconds($endDeltaSeconds), $allDay);
        $event->allDay = $allDay;
        $event->setScheduleShift($startDeltaSeconds);
        $event->rrule = $this->resizeSeriesRRule(
            $event->getRRuleRFCString(),
            $originalStart,
            $event->getStartDate(),
            $startDeltaSeconds,
            $allDay,
        );
    }

    public function deleteOccurrenceRRule(
        ?string $rruleString,
        Carbon $eventStart,
        bool $allDay,
        Carbon $occurrence,
    ): ?string {
        ['baseRule' => $baseRule, 'rdates' => $rdates, 'exdates' => $exdates] = $this->parseState(
            $rruleString,
            $allDay,
        );

        $normalizedOccurrence = $this->normalizeDate($occurrence, $allDay);

        $rdates = $this->removeDateFromList($rdates, $normalizedOccurrence, $allDay);
        $exdates = $this->appendDate($exdates, $normalizedOccurrence, $allDay);

        return $this->buildRRuleString($baseRule, $eventStart, $allDay, $rdates, $exdates);
    }

    public function moveSeriesRRule(
        ?string $rruleString,
        Carbon $originalEventStart,
        Carbon $newEventStart,
        int $deltaSeconds,
        bool $allDay,
    ): ?string {
        ['baseRule' => $baseRule, 'rdates' => $rdates, 'exdates' => $exdates] = $this->parseState(
            $rruleString,
            $allDay,
        );

        if ($baseRule) {
            $baseRule = $this->shiftBaseRule($baseRule, $originalEventStart, $newEventStart, $deltaSeconds, $allDay);
        }

        $rdates = $this->shiftDateList($rdates, $deltaSeconds, $allDay);
        $exdates = $this->shiftDateList($exdates, $deltaSeconds, $allDay);

        return $this->buildRRuleString($baseRule, $newEventStart, $allDay, $rdates, $exdates);
    }

    public function resizeSeriesRRule(
        ?string $rruleString,
        Carbon $originalEventStart,
        Carbon $newEventStart,
        int $startDeltaSeconds,
        bool $allDay,
    ): ?string {
        ['baseRule' => $baseRule, 'rdates' => $rdates, 'exdates' => $exdates] = $this->parseState(
            $rruleString,
            $allDay,
        );

        if ($baseRule) {
            $baseRule = $this->shiftBaseRule(
                $baseRule,
                $originalEventStart,
                $newEventStart,
                $startDeltaSeconds,
                $allDay,
            );
        }

        // Additional and excluded dates move with the start, the same way they do when the series is moved
        $rdates = $this->shiftDateList($rdates, $startDeltaSeconds, $allDay);
        $exdates = $this->shiftDateList($exdates, $startDeltaSeconds, $allDay);

        return $this->buildRRuleString($baseRule, $newEventStart, $allDay, $rdates, $exdates);
    }

    /**
     * Splits a schedule at one of its occurrences. The earlier part ends with the rule's last
     * occurrence before the split, and the later part starts at the rule's first occurrence from it,
     * with a count reduced by what the earlier part took. Additional and excluded dates go with the
     * part they fall in.
     *
     * The later part's DTSTART is always one of the rule's own occurrences, so a split at an additional
     * date starts the rule at its next occurrence instead; moving DTSTART anywhere else could change
     * the dates the rule produces. An earlier part left with only additional dates starts at the first one.
     *
     * @return array{
     *     before: ?string,
     *     beforeStart: Carbon,
     *     beforeUntil: ?Carbon,
     *     after: ?string,
     *     afterStart: Carbon,
     * } each part's rule string and start, and the earlier part's last rule occurrence (null when it has no rule)
     */
    public function splitRRule(?string $rruleString, Carbon $eventStart, bool $allDay, Carbon $splitAt): array
    {
        ['baseRule' => $baseRule, 'rdates' => $rdates, 'exdates' => $exdates] = $this->parseState(
            $rruleString,
            $allDay,
        );

        $split = $this->normalizeDate($splitAt, $allDay);
        $splitKey = $this->dateKey($split, $allDay);
        $isBefore = fn (Carbon $date) => $this->dateKey($date, $allDay) < $splitKey;

        $lastBefore = null;
        $firstAfter = null;
        $countBefore = 0;

        foreach ($baseRule ?? [] as $occurrence) {
            $date = $this->normalizeDate($occurrence, $allDay);
            if (!$isBefore($date)) {
                $firstAfter = $date;

                break;
            }

            $lastBefore = $date;
            ++$countBefore;
        }

        $beforeRule = null;
        if ($baseRule && $lastBefore) {
            $rule = $baseRule->getRule();
            $rule['DTSTART'] = $this->normalizeDate($rule['DTSTART'], $allDay);
            $rule['COUNT'] = null;
            $rule['UNTIL'] = $lastBefore;
            $beforeRule = new RRule($rule);
        }

        $afterRule = null;
        if ($baseRule && $firstAfter) {
            $rule = $baseRule->getRule();
            $rule['DTSTART'] = $firstAfter;

            if (null !== $rule['COUNT']) {
                $rule['COUNT'] -= $countBefore;
            }

            if ($rule['UNTIL'] instanceof \DateTimeInterface) {
                $rule['UNTIL'] = $this->normalizeDate($rule['UNTIL'], $allDay);
            }

            $afterRule = new RRule($rule);
        }

        $rdatesBefore = $this->uniqueDates(array_filter($rdates, $isBefore), $allDay);
        $beforeStart = $beforeRule ? $this->normalizeDate($eventStart, $allDay) : ($rdatesBefore[0] ?? $this->normalizeDate($eventStart, $allDay));
        $afterStart = $firstAfter ?? $split;

        return [
            'before' => $this->buildRRuleString(
                $beforeRule,
                $beforeStart,
                $allDay,
                $rdatesBefore,
                array_filter($exdates, $isBefore),
            ),
            'beforeStart' => $beforeStart,
            'beforeUntil' => $beforeRule ? $lastBefore : null,
            'after' => $this->buildRRuleString(
                $afterRule,
                $afterStart,
                $allDay,
                array_filter($rdates, static fn (Carbon $date) => !$isBefore($date)),
                array_filter($exdates, static fn (Carbon $date) => !$isBefore($date)),
            ),
            'afterStart' => $afterStart,
        ];
    }

    private function parseState(?string $rruleString, bool $allDay): array
    {
        if (!$rruleString) {
            return [
                'baseRule' => null,
                'rdates' => [],
                'exdates' => [],
            ];
        }

        $parsed = RRuleParser::parse($rruleString);

        if ($parsed instanceof RSet) {
            return [
                'baseRule' => $parsed->getRRules()[0] ?? null,
                'rdates' => array_map(fn (\DateTimeInterface $date) => $this->toCarbon($date, $allDay), $parsed->getDates()),
                'exdates' => array_map(fn (\DateTimeInterface $date) => $this->toCarbon($date, $allDay), $parsed->getExDates()),
            ];
        }

        return [
            'baseRule' => $parsed,
            'rdates' => [],
            'exdates' => [],
        ];
    }

    private function shiftBaseRule(
        RRule $baseRule,
        Carbon $originalEventStart,
        Carbon $newEventStart,
        int $deltaSeconds,
        bool $allDay,
    ): RRule {
        $rule = $baseRule->getRule();
        $dayDelta = $originalEventStart->copy()->startOfDay()->diffInDays($newEventStart->copy()->startOfDay(), false);
        $monthDelta = (($newEventStart->year - $originalEventStart->year) * 12)
            + ($newEventStart->month - $originalEventStart->month);

        $rule['DTSTART'] = $this->normalizeDate($newEventStart, $allDay);

        if ($rule['UNTIL'] instanceof \DateTimeInterface) {
            $rule['UNTIL'] = $this->normalizeDate(
                $this->toCarbon($rule['UNTIL'], $allDay)->addSeconds($deltaSeconds),
                $allDay,
            );
        }

        if (!empty($rule['BYDAY']) && 0 !== $dayDelta) {
            $rule['BYDAY'] = DateHelper::shiftByDays((string) $rule['BYDAY'], $dayDelta);
        }

        if (!empty($rule['BYMONTHDAY']) && 0 !== $dayDelta) {
            $rule['BYMONTHDAY'] = DateHelper::shiftByMonthDay((string) $rule['BYMONTHDAY'], $dayDelta);
        }

        if (!empty($rule['BYYEARDAY']) && 0 !== $dayDelta) {
            $rule['BYYEARDAY'] = $this->shiftByYearDay((string) $rule['BYYEARDAY'], $dayDelta);
        }

        if (!empty($rule['BYMONTH']) && 0 !== $monthDelta) {
            $rule['BYMONTH'] = DateHelper::shiftByMonth((string) $rule['BYMONTH'], $monthDelta);
        }

        $this->syncRuleTimeParts($rule, $newEventStart, $allDay);

        return new RRule($rule);
    }

    private function syncRuleTimeParts(array &$rule, Carbon $eventStart, bool $allDay): void
    {
        if ($allDay) {
            $rule['BYSECOND'] = null;
            $rule['BYMINUTE'] = null;
            $rule['BYHOUR'] = null;

            return;
        }

        if (null !== $rule['BYSECOND']) {
            $rule['BYSECOND'] = $eventStart->format('s');
        }

        if (null !== $rule['BYMINUTE']) {
            $rule['BYMINUTE'] = $eventStart->format('i');
        }

        if (null !== $rule['BYHOUR']) {
            $rule['BYHOUR'] = $eventStart->format('H');
        }
    }

    private function buildRRuleString(
        ?RRule $baseRule,
        Carbon $eventStart,
        bool $allDay,
        array $rdates,
        array $exdates,
    ): ?string {
        $rdates = $this->uniqueDates($rdates, $allDay);
        $exdates = $this->uniqueDates($exdates, $allDay);

        if (!$baseRule && [] === $rdates && [] === $exdates) {
            return null;
        }

        $lines = $baseRule
            ? explode("\n", $this->serializeBaseRule($baseRule, $allDay))
            : [$this->formatStartDateLine($eventStart, $allDay)];

        if ([] !== $rdates) {
            $lines[] = $this->formatDateValueLine('RDATE', $rdates, $allDay);
        }

        if ([] !== $exdates) {
            $lines[] = $this->formatDateValueLine('EXDATE', $exdates, $allDay);
        }

        return implode("\n", array_filter($lines));
    }

    private function serializeBaseRule(RRule $baseRule, bool $allDay): string
    {
        $lines = explode("\n", $baseRule->rfcString(false));

        return implode(
            "\n",
            array_map(
                static fn (string $line) => RRuleStringNormalizer::normalizeLine($line, $allDay),
                $lines,
            ),
        );
    }

    private function formatStartDateLine(Carbon $date, bool $allDay): string
    {
        $normalized = $this->normalizeDate($date, $allDay);

        if ($allDay) {
            return 'DTSTART:'.$normalized->format('Ymd');
        }

        return 'DTSTART:'.$normalized->format('Ymd\THis');
    }

    private function formatDateValueLine(string $property, array $dates, bool $allDay): string
    {
        $formattedDates = array_map(
            static fn (Carbon $date) => $allDay ? $date->format('Ymd') : $date->format('Ymd\THis'),
            $this->uniqueDates($dates, $allDay),
        );

        if ($allDay) {
            return $property.';VALUE=DATE:'.implode(',', $formattedDates);
        }

        return $property.':'.implode(',', $formattedDates);
    }

    private function appendDate(array $dates, Carbon $date, bool $allDay): array
    {
        $dates[] = $this->normalizeDate($date, $allDay);

        return $this->uniqueDates($dates, $allDay);
    }

    private function removeDateFromList(array $dates, Carbon $date, bool $allDay): array
    {
        $dateKey = $this->dateKey($date, $allDay);

        return array_values(
            array_filter(
                $dates,
                fn (Carbon $value) => $this->dateKey($value, $allDay) !== $dateKey,
            ),
        );
    }

    private function uniqueDates(array $dates, bool $allDay): array
    {
        $unique = [];

        foreach ($dates as $date) {
            $normalized = $this->normalizeDate($date, $allDay);
            $unique[$this->dateKey($normalized, $allDay)] = $normalized;
        }

        uasort(
            $unique,
            static fn (Carbon $left, Carbon $right) => $left <=> $right,
        );

        return array_values($unique);
    }

    private function shiftDateList(array $dates, int $deltaSeconds, bool $allDay): array
    {
        return array_map(
            fn (Carbon $date) => $this->normalizeDate($date->copy()->addSeconds($deltaSeconds), $allDay),
            $dates,
        );
    }

    private function shiftByYearDay(string $yearDayList, int $shiftAmount): string
    {
        $daysInYear = 366;
        $shiftAmount %= $daysInYear;

        if (0 === $shiftAmount || '' === $yearDayList) {
            return $yearDayList;
        }

        $modified = [];
        foreach (explode(',', $yearDayList) as $day) {
            $day = (int) $day;
            $isNegative = $day < 0;
            $value = abs($day) + $shiftAmount;

            if ($value > $daysInYear) {
                $value %= $daysInYear;
            } elseif ($value < 0) {
                $value = $daysInYear - abs($value);
            }

            if (0 === $value) {
                $value = $daysInYear;
            }

            $modified[] = (string) ($value * ($isNegative ? -1 : 1));
        }

        return implode(',', $modified);
    }

    private function normalizeDate(Carbon|\DateTimeInterface $date, bool $allDay): Carbon
    {
        $normalized = $this->toCarbon($date, $allDay);

        if ($allDay) {
            return $normalized->startOfDay();
        }

        return $normalized;
    }

    /**
     * All-day ends are kept at the end of the last day, the way the event builder stores them.
     */
    private function normalizeEndDate(Carbon|\DateTimeInterface $date, bool $allDay): Carbon
    {
        $normalized = $this->toCarbon($date, $allDay);

        return $allDay ? DateHelper::allDayEnd($normalized) : $normalized;
    }

    private function dateKey(Carbon|\DateTimeInterface $date, bool $allDay): string
    {
        $normalized = $this->normalizeDate($date, $allDay);

        return $allDay ? $normalized->format('Ymd') : $normalized->format('YmdHis');
    }

    private function toCarbon(Carbon|\DateTimeInterface $date, bool $allDay = false): Carbon
    {
        if ($allDay) {
            return Carbon::create(
                (int) $date->format('Y'),
                (int) $date->format('m'),
                (int) $date->format('d'),
                0,
                0,
                0,
                DateHelper::UTC,
            );
        }

        return Carbon::create(
            (int) $date->format('Y'),
            (int) $date->format('m'),
            (int) $date->format('d'),
            (int) $date->format('H'),
            (int) $date->format('i'),
            (int) $date->format('s'),
            DateHelper::UTC,
        );
    }
}
