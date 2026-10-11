<?php

namespace Solspace\Calendar\Library\Scheduling;

/** Availability is calculated in local wall time; saved booking times are UTC. */
class Availability
{
    public static function configurationErrors(array $settings): array
    {
        $errors = [];
        foreach ($settings['hours'] ?? [] as $row) {
            if (!\is_array($row) || false === filter_var($row['day'] ?? null, \FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 7]]) || !self::validPeriod($row)) {
                $errors['hours'][] = 'Opening hours need a weekday and valid start and end times (HH:MM).';

                break;
            }
        }
        if (\count($settings['hours'] ?? []) > 100 || \count($settings['exceptions'] ?? []) > 100) {
            $errors['exceptions'][] = 'Use no more than 100 opening periods or exceptions.';
        }
        foreach ($settings['exceptions'] ?? [] as $row) {
            if (!\is_array($row) || !self::validDate($row['dateFrom'] ?? '') || !self::validDate($row['dateTo'] ?? '') || $row['dateTo'] < $row['dateFrom'] || !\in_array($row['type'] ?? '', ['closed', 'hours', 'block'], true) || ('closed' !== $row['type'] && !self::validPeriod($row))) {
                $errors['exceptions'][] = 'Exceptions need valid dates (YYYY-MM-DD), a type, and start and end times unless closed.';

                break;
            }
        }

        return $errors;
    }

    /** @return array<array{start: string, end: string, label: string}> */
    public static function slots(array $settings, string $date, array $busy = [], ?\DateTimeImmutable $now = null, bool $public = true, bool $firstOnly = false, ?\DateTimeImmutable $notBefore = null): array
    {
        if (!self::validDate($date) || self::configurationErrors($settings)) {
            return [];
        }
        $zone = new \DateTimeZone($settings['timezone']);
        $now ??= new \DateTimeImmutable('now', $zone);
        $localNow = $now->setTimezone($zone);
        if ($public && ($date < $localNow->format('Y-m-d') || $date > $localNow->modify('+'.(int) $settings['maximumAdvance'].' days')->format('Y-m-d'))) {
            return [];
        }
        $periods = array_filter($settings['hours'], static fn ($row) => (int) $row['day'] === (int) (new \DateTimeImmutable($date, $zone))->format('N'));
        $overrides = [];
        $blocks = [];
        foreach ($settings['exceptions'] as $row) {
            if ($date < $row['dateFrom'] || $date > $row['dateTo']) {
                continue;
            }
            if ('closed' === $row['type']) {
                return [];
            }
            if ('hours' === $row['type']) {
                $overrides[] = $row;
            } else {
                $blocks[] = ['start' => self::time($date, $row['start'], $zone), 'end' => self::time($date, $row['end'], $zone), 'buffer' => 0];
            }
        }
        if ($overrides) {
            $periods = $overrides;
        }
        $slots = [];
        $blocks = self::intervals($blocks);
        $busy = $settings['allowOverlap'] ? [] : self::intervals($busy);
        $increment = max(1, (int) $settings['increment']) * 60;
        $duration = max(1, (int) $settings['duration']) * 60;
        $buffer = max(0, (int) $settings['buffer']) * 60;
        $earliest = $now->getTimestamp() + (int) $settings['minimumNotice'] * 3600;
        if ($notBefore) {
            $earliest = $public ? max($earliest, $notBefore->getTimestamp()) : $notBefore->getTimestamp();
        }
        foreach ($periods as $row) {
            $opening = self::time($date, $row['start'], $zone);
            $closing = self::time($date, $row['end'], $zone);
            if (!$opening || !$closing) {
                continue;
            }
            for ($stamp = $opening->getTimestamp(); $stamp + $duration + $buffer <= $closing->getTimestamp(); $stamp += $increment) {
                if (($public || $notBefore) && $stamp < $earliest) {
                    continue;
                }
                $start = $opening->setTimestamp($stamp);
                $end = $start->setTimestamp($stamp + $duration);
                if (self::overlaps($stamp, $stamp + $duration + $buffer, $blocks) || self::overlaps($stamp, $stamp + $duration + $buffer, $busy)) {
                    continue;
                }
                $slots[$stamp] = ['start' => $start->format(\DATE_ATOM), 'end' => $end->format(\DATE_ATOM), 'label' => $start->format('H:i').'–'.$end->format('H:i')];
                if ($firstOnly) {
                    break;
                }
            }
        }
        ksort($slots);

        return array_values($firstOnly ? \array_slice($slots, 0, 1, true) : $slots);
    }

    public static function validDate(mixed $date): bool
    {
        if (!\is_string($date)) {
            return false;
        }
        $value = \DateTimeImmutable::createFromFormat('!Y-m-d', $date);

        return $value && $value->format('Y-m-d') === $date;
    }

    private static function validPeriod(array $row): bool
    {
        return \is_string($row['start'] ?? null) && \is_string($row['end'] ?? null)
            && preg_match('/^(?:[01]\d|2[0-3]):[0-5]\d$/D', $row['start'])
            && preg_match('/^(?:[01]\d|2[0-3]):[0-5]\d$/D', $row['end'])
            && $row['end'] > $row['start'];
    }

    private static function time(string $date, string $time, \DateTimeZone $zone): ?\DateTimeImmutable
    {
        $value = new \DateTimeImmutable($date.' '.$time, $zone);

        // PHP normalizes nonexistent local times during the spring DST transition.
        return $value->format('Y-m-d H:i') === $date.' '.$time ? $value : null;
    }

    /** Parse each busy row once and merge it into ordered, non-overlapping intervals. */
    private static function intervals(array $busy): array
    {
        $intervals = [];
        foreach ($busy as $row) {
            if (null === $row['start'] || null === $row['end']) {
                return [[\PHP_INT_MIN, \PHP_INT_MAX]];
            }
            $busyStart = $row['start'] instanceof \DateTimeInterface ? $row['start']->getTimestamp() : (new \DateTimeImmutable($row['start'], new \DateTimeZone('UTC')))->getTimestamp();
            $busyEnd = $row['end'] instanceof \DateTimeInterface ? $row['end']->getTimestamp() : (new \DateTimeImmutable($row['end'], new \DateTimeZone('UTC')))->getTimestamp();
            $intervals[] = [$busyStart, $busyEnd + (int) ($row['buffer'] ?? 0) * 60];
        }
        usort($intervals, static fn ($a, $b) => $a[0] <=> $b[0]);
        $merged = [];
        foreach ($intervals as [$start, $end]) {
            $last = \count($merged) - 1;
            if ($last >= 0 && $start <= $merged[$last][1]) {
                $merged[$last][1] = max($merged[$last][1], $end);
            } else {
                $merged[] = [$start, $end];
            }
        }

        return $merged;
    }

    private static function overlaps(int $start, int $end, array $intervals): bool
    {
        // Find the first occupied interval ending after the requested start.
        $low = 0;
        $high = \count($intervals);
        while ($low < $high) {
            $middle = intdiv($low + $high, 2);
            if ($intervals[$middle][1] <= $start) {
                $low = $middle + 1;
            } else {
                $high = $middle;
            }
        }

        return isset($intervals[$low]) && $intervals[$low][0] < $end;
    }
}
