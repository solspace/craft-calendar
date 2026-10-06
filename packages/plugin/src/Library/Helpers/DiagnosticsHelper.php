<?php

namespace Solspace\Calendar\Library\Helpers;

class DiagnosticsHelper
{
    /**
     * Count the fixed dates shown by the builder, without expanding recurring occurrences.
     *
     * @return array{additional: int, excluded: int}
     */
    public static function recurrenceDateCounts(?string $rrule, string $startDate): array
    {
        $dates = ['RDATE' => [], 'EXDATE' => []];
        $hasRule = false;
        $start = str_replace('-', '', substr($startDate, 0, 10));
        // Unfold RFC content lines before inspecting their properties.
        $rrule = preg_replace('/\r?\n[ \t]/', '', $rrule ?? '');
        foreach (preg_split('/\R/', $rrule) ?: [] as $line) {
            if (!preg_match('/^(DTSTART|RRULE|RDATE|EXDATE)(?:;[^:]*)?:(.*)$/i', trim($line), $matches)) {
                continue;
            }
            $property = strtoupper($matches[1]);
            if ('RRULE' === $property) {
                $hasRule = true;

                continue;
            }
            foreach (explode(',', $matches[2]) as $value) {
                if (!preg_match('/^(\d{8})(?:T\d{6}Z?)?$/i', trim($value), $date)) {
                    continue;
                }
                if ('DTSTART' === $property) {
                    $start = $date[1];
                } else {
                    // The builder presents one entry per calendar date.
                    $dates[$property][$date[1]] = true;
                }
            }
        }
        // Sets without an RRULE include the initial occurrence as an RDATE, not an additional date.
        if (!$hasRule) {
            unset($dates['RDATE'][$start]);
        }

        return ['additional' => \count($dates['RDATE']), 'excluded' => \count($dates['EXDATE'])];
    }

    public static function memoryLimitStatus(string $limit): string
    {
        $bytes = \ini_parse_quantity($limit);

        if (-1 === $bytes || $bytes >= 512 * 1024 * 1024) {
            return 'pass';
        }

        return $bytes >= 256 * 1024 * 1024 ? 'warning' : 'error';
    }

    /**
     * Inspect a timezone without changing the process timezone or event wall times.
     */
    public static function timezone(string $name, \DateTimeImmutable $instant): ?array
    {
        try {
            $zone = new \DateTimeZone($name);
        } catch (\Exception) {
            return null;
        }

        $local = $instant->setTimezone($zone);

        return [
            'name' => $zone->getName(),
            'offset' => $local->format('P'),
            'clock' => $local->format('Y-m-d H:i:s P'),
            'dst' => '1' === $local->format('I'),
        ];
    }
}
