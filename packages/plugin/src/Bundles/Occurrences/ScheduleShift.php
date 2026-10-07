<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use Solspace\Calendar\Library\Helpers\DateHelper;

/**
 * Tells whether a schedule change moved every occurrence by the same distance, like dragging
 * a whole series does. The rule's text can change a lot in that case (DTSTART, BYDAY, UNTIL,
 * additional and excluded dates), so this compares the occurrences themselves.
 */
final class ScheduleShift
{
    /**
     * @param string[] $before         the old schedule's recurrence IDs (`Y-m-d H:i:s`), in order
     * @param string[] $after          the new schedule's first recurrence IDs, in order. Pass one more
     *                                 than `$before` holds, so an added occurrence is noticed.
     * @param bool     $beforeComplete whether `$before` is the whole old schedule. Infinite schedules
     *                                 are only generated so far ahead, so only their start is compared.
     *
     * @return null|int seconds every occurrence moved by, or null when they didn't all move the same distance
     */
    public static function detect(array $before, array $after, bool $beforeComplete): ?int
    {
        $count = \count($before);
        if (0 === $count || \count($after) < $count) {
            return null;
        }

        if ($beforeComplete && \count($after) !== $count) {
            return null;
        }

        $delta = null;
        foreach (array_values($before) as $index => $recurrenceId) {
            $offset = self::timestamp($after[$index]) - self::timestamp($recurrenceId);
            $delta ??= $offset;

            if ($offset !== $delta) {
                return null;
            }
        }

        return 0 === $delta ? null : $delta;
    }

    private static function timestamp(string $recurrenceId): int
    {
        return (new Carbon($recurrenceId, DateHelper::UTC))->getTimestamp();
    }
}
