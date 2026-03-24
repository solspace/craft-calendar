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

    public function moveOccurrence(Event $event, Carbon $occurrence, Carbon $newOccurrenceStart, bool $allDay): void
    {
        $event->allDay = $allDay;
        $event->rrule = $this->moveOccurrenceRRule(
            $event->getRRuleRFCString(),
            $event->getStartDate(),
            $allDay,
            $occurrence,
            $newOccurrenceStart,
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

    public function moveOccurrenceRRule(
        ?string $rruleString,
        Carbon $eventStart,
        bool $allDay,
        Carbon $occurrence,
        Carbon $newOccurrenceStart,
    ): ?string {
        ['baseRule' => $baseRule, 'rdates' => $rdates, 'exdates' => $exdates] = $this->parseState(
            $rruleString,
            $allDay,
        );

        $normalizedOccurrence = $this->normalizeDate($occurrence, $allDay);
        $normalizedNewOccurrence = $this->normalizeDate($newOccurrenceStart, $allDay);

        if ($this->hasDate($rdates, $normalizedOccurrence, $allDay)) {
            $rdates = $this->replaceDateInList($rdates, $normalizedOccurrence, $normalizedNewOccurrence, $allDay);
            $exdates = $this->removeDateFromList($exdates, $normalizedNewOccurrence, $allDay);

            return $this->buildRRuleString($baseRule, $eventStart, $allDay, $rdates, $exdates);
        }

        $rdates = $this->appendDate($rdates, $normalizedNewOccurrence, $allDay);
        $exdates = $this->appendDate($exdates, $normalizedOccurrence, $allDay);
        $exdates = $this->removeDateFromList($exdates, $normalizedNewOccurrence, $allDay);

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

        return $this->buildRRuleString($baseRule, $newEventStart, $allDay, $rdates, $exdates);
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

        $parsed = RRule::createFromRfcString($rruleString, true);

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

        if (!$baseRule) {
            $rdates = $this->appendDate($rdates, $eventStart, $allDay);
        }

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
                fn (string $line) => $this->normalizeRfcLine($line, $allDay),
                $lines,
            ),
        );
    }

    private function normalizeRfcLine(string $line, bool $allDay): string
    {
        if (str_starts_with($line, 'DTSTART')) {
            $property = explode(':', $line, 2)[1] ?? '';

            return $this->formatStartDateLine(Carbon::createFromFormat('Ymd\THis', $property, DateHelper::UTC), $allDay);
        }

        if (!str_starts_with($line, 'RRULE:')) {
            return $line;
        }

        if (!$allDay) {
            return $line;
        }

        return preg_replace('/UNTIL=(\d{8})T\d{6}Z?/', 'UNTIL=$1', $line) ?? $line;
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

    private function replaceDateInList(array $dates, Carbon $from, Carbon $to, bool $allDay): array
    {
        $updated = [];
        $fromKey = $this->dateKey($from, $allDay);

        foreach ($dates as $date) {
            if ($this->dateKey($date, $allDay) === $fromKey) {
                $updated[] = $this->normalizeDate($to, $allDay);

                continue;
            }

            $updated[] = $this->normalizeDate($date, $allDay);
        }

        return $this->uniqueDates($updated, $allDay);
    }

    private function hasDate(array $dates, Carbon $date, bool $allDay): bool
    {
        $dateKey = $this->dateKey($date, $allDay);

        foreach ($dates as $value) {
            if ($this->dateKey($value, $allDay) === $dateKey) {
                return true;
            }
        }

        return false;
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

    private function normalizeEndDate(Carbon|\DateTimeInterface $date, bool $allDay): Carbon
    {
        $normalized = $this->toCarbon($date, $allDay);

        if ($allDay) {
            return $normalized->startOfDay();
        }

        return $normalized;
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
