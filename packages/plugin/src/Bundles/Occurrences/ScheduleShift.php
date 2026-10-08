<?php

namespace Solspace\Calendar\Bundles\Occurrences;

/**
 * Tells whether a schedule change moved every occurrence by the same distance, like changing the time
 * or the weekday of a weekly event does. The rule's text can change a lot in that case (DTSTART, BYDAY,
 * UNTIL, additional and excluded dates), so this compares the occurrences themselves.
 *
 * A change that keeps any of the old occurrences isn't a shift, even when the rest line up. Starting a
 * daily schedule three days later only drops its first three occurrences; the others stay where they are.
 * Dragging the whole series in the calendar is a shift however far it goes, and says so itself.
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
        $before = array_values($before);
        $after = array_values($after);

        $count = \count($before);
        if (0 === $count || \count($after) < $count) {
            return null;
        }

        if ($beforeComplete && \count($after) !== $count) {
            return null;
        }

        if (array_intersect($before, $after)) {
            return null;
        }

        $delta = null;
        foreach ($before as $index => $recurrenceId) {
            $offset = RecurrenceId::toCarbon($after[$index])->getTimestamp() - RecurrenceId::toCarbon($recurrenceId)->getTimestamp();
            $delta ??= $offset;

            if ($offset !== $delta) {
                return null;
            }
        }

        return $delta;
    }
}
