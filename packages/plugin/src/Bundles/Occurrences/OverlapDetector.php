<?php

namespace Solspace\Calendar\Bundles\Occurrences;

/** Half-open floating-time intervals: an event ending when another starts is not a conflict. */
final class OverlapDetector
{
    public const DETAIL_LIMIT = 5;

    /**
     * @param array[] $targets   intervals with id, calendarId, start and end (timestamps)
     * @param array[] $candidates active intervals in the same site
     *
     * @return array<string, array{count: int, events: array}>
     */
    public function detect(array $targets, array $candidates): array
    {
        $calendars = [];
        foreach ($candidates as $candidate) {
            if ($candidate['end'] > $candidate['start']) {
                $calendars[$candidate['calendarId']][] = $candidate;
            }
        }
        foreach ($calendars as &$intervals) {
            usort($intervals, static fn (array $a, array $b) => $a['start'] <=> $b['start']);
        }
        unset($intervals);

        $result = [];
        foreach ($targets as $target) {
            $conflicts = ['count' => 0, 'events' => []];
            if ($target['end'] <= $target['start']) {
                continue;
            }
            foreach ($calendars[$target['calendarId']] ?? [] as $candidate) {
                if ($candidate['start'] >= $target['end']) {
                    break;
                }
                if ($candidate['end'] <= $target['start'] || $candidate['id'] === $target['id']) {
                    continue;
                }
                ++$conflicts['count'];
                if (\count($conflicts['events']) < self::DETAIL_LIMIT) {
                    $conflicts['events'][] = $candidate;
                }
            }
            if ($conflicts['count']) {
                $result[$target['id']] = $conflicts;
            }
        }

        return $result;
    }
}
