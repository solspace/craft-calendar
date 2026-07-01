<?php

namespace Solspace\Calendar\Library\RRule;

class RRuleStringNormalizer
{
    public static function normalizeLine(string $line, bool $allDay): string
    {
        if (preg_match('/^(DTSTART|RDATE|EXDATE)(?:;[^:]*)?:(.*)$/', $line, $matches)) {
            return self::normalizeDateValueLine($matches[1], $matches[2], $allDay);
        }

        if (str_starts_with($line, 'RRULE:')) {
            return self::normalizeRRuleLine($line, $allDay);
        }

        if (!$allDay) {
            return preg_replace('/UNTIL=(\d{8}T\d{6})Z?/', 'UNTIL=$1', $line) ?? $line;
        }

        return preg_replace('/UNTIL=(\d{8})T\d{6}Z?/', 'UNTIL=$1', $line) ?? $line;
    }

    public static function normalizeAllDayRRule(string $rrule): string
    {
        $lines = array_map('trim', preg_split('/\R/', $rrule) ?: []);
        $lines = array_filter($lines, static fn (string $line) => '' !== $line);

        return implode(
            "\n",
            array_map(
                static fn (string $line) => self::normalizeLine($line, true),
                $lines,
            ),
        );
    }

    public static function normalizeAllDayLine(string $line): string
    {
        return self::normalizeLine($line, true);
    }

    private static function normalizeDateValueLine(string $property, string $valueList, bool $allDay): string
    {
        $values = self::extractDateValues($valueList, $allDay);

        if ('DTSTART' === $property) {
            return $property.':'.($values[0] ?? '');
        }

        if ($allDay) {
            return $property.';VALUE=DATE:'.implode(',', $values);
        }

        return $property.':'.implode(',', $values);
    }

    private static function normalizeRRuleLine(string $line, bool $allDay): string
    {
        $value = substr($line, 6);
        $parts = array_values(
            array_filter(
                explode(';', $value),
                static fn (string $part) => '' !== trim($part),
            ),
        );

        foreach ($parts as &$part) {
            if ($allDay) {
                $part = preg_replace('/^UNTIL=(\d{8})T\d{6}Z?$/', 'UNTIL=$1', $part) ?? $part;
            } else {
                $part = preg_replace('/^UNTIL=(\d{8}T\d{6})Z?$/', 'UNTIL=$1', $part) ?? $part;
            }
        }
        unset($part);

        usort(
            $parts,
            static function (string $a, string $b): int {
                $aIsFreq = str_starts_with($a, 'FREQ=');
                $bIsFreq = str_starts_with($b, 'FREQ=');

                return $aIsFreq === $bIsFreq ? 0 : ($aIsFreq ? -1 : 1);
            },
        );

        return 'RRULE:'.implode(';', $parts);
    }

    private static function extractDateValues(string $valueList, bool $allDay): array
    {
        $values = array_filter(
            array_map(
                static fn (string $value) => self::normalizeDateValue($value, $allDay),
                explode(',', $valueList),
            ),
            static fn (string $value) => '' !== $value,
        );

        return array_values(array_unique($values));
    }

    private static function normalizeDateValue(string $value, bool $allDay): string
    {
        $value = trim($value);

        if ($allDay) {
            $value = substr($value, 0, 8);

            return preg_match('/^\d{8}$/', $value) ? $value : '';
        }

        if (preg_match('/^(\d{8}T\d{6})Z?$/', $value, $matches)) {
            return $matches[1];
        }

        return $value;
    }
}
