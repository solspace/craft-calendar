<?php

namespace Solspace\Calendar\Bundles\Occurrences;

/** Half-open floating-time intervals: an event ending when another starts is not a conflict. */
final class OverlapDetector
{
    public const DETAIL_LIMIT = 3;

    /**
     * @param array[] $targets    intervals with id, calendarId, start and end (timestamps)
     * @param array[] $candidates active intervals in the same site
     *
     * @return array<string, array{count: int, events: array}>
     */
    public function detect(array $targets, array $candidates, int $detailLimit = self::DETAIL_LIMIT): array
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
                if (\count($conflicts['events']) < $detailLimit) {
                    $conflicts['events'][] = $candidate;
                }
            }
            if ($conflicts['count']) {
                $result[$target['id']] = $conflicts;
            }
        }

        return $result;
    }

    /** Count each conflicting occurrence once across a schedule, before limiting its details. */
    public function summarize(array $targets, array $candidates): array
    {
        $matches = $this->detect($candidates, $targets, 0);
        $events = [];
        foreach ($candidates as $candidate) {
            if (isset($matches[$candidate['id']])) {
                $events[$candidate['id']] = $candidate;
            }
        }
        usort($events, static fn (array $a, array $b) => $a['start'] <=> $b['start']);

        return [
            'count' => \count($events),
            'events' => \array_slice($events, 0, self::DETAIL_LIMIT),
        ];
    }
}
