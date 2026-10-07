<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use Solspace\Calendar\Library\Helpers\DateHelper;

/**
 * Recurrence IDs are floating date-times: the start an event's schedule produced
 * for an occurrence, stored without a timezone as `Y-m-d H:i:s`.
 */
class RecurrenceId
{
    public const FORMAT = 'Y-m-d H:i:s';

    /**
     * Accepts dates, date-time strings and the compact `YmdHis` form used in occurrence IDs.
     * Returns null for anything that isn't a valid date-time.
     */
    public static function normalize(mixed $value): ?string
    {
        if (\is_string($value) && preg_match('/^\d{14}$/', $value)) {
            $date = Carbon::createFromFormat('!YmdHis', $value, DateHelper::UTC);

            return $date instanceof Carbon && $date->format('YmdHis') === $value
                ? $date->format(self::FORMAT)
                : null;
        }

        if (!$value instanceof \DateTimeInterface && !\is_string($value)) {
            return null;
        }

        try {
            return DateHelper::parseFloatingCarbon($value)->format(self::FORMAT);
        } catch (\Throwable) {
            return null;
        }
    }

    public static function toCarbon(string $recurrenceId): Carbon
    {
        return new Carbon($recurrenceId, DateHelper::UTC);
    }

    public static function shift(string $recurrenceId, int $seconds): string
    {
        return self::toCarbon($recurrenceId)->addSeconds($seconds)->format(self::FORMAT);
    }
}
