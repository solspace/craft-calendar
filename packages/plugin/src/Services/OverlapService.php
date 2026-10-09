<?php

namespace Solspace\Calendar\Services;

use Carbon\Carbon;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceMaterializer;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceProvider;
use Solspace\Calendar\Bundles\Occurrences\OverlapDetector;
use Solspace\Calendar\Bundles\Occurrences\RecurrenceId;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Models\OccurrenceModel;

/** Advisory checks use the same materialized occurrences, overrides and floating times as the CP. */
class OverlapService
{
    public const PREVIEW_LIMIT = 100;

    public function __construct(
        private OccurrenceProvider $provider = new OccurrenceProvider(),
        private OverlapDetector $detector = new OverlapDetector(),
        private ?OccurrencesService $occurrences = null,
    ) {}

    /** Search independently of the feed's text filter so hidden search matches still warn. */
    public function forFeed(array $occurrences, int $siteId): array
    {
        $targets = [];
        foreach ($occurrences as $occurrence) {
            if (!$occurrence->cancelled && Event::STATUS_LIVE === $occurrence->event->getStatus()) {
                $targets[] = $this->interval($occurrence);
            }
        }

        return $this->check($targets, $siteId);
    }

    /** Check a single occurrence's effective times, including unsaved changes in its slideout. */
    public function forOccurrence(Event $event, string $recurrenceId, array $times): array
    {
        $target = $this->times($times, $event->getCanonicalId().'-'.RecurrenceId::toCarbon($recurrenceId)->format('YmdHis'), (int) $event->calendarId);
        $matches = $this->check($times['cancelled'] || Event::STATUS_LIVE !== $event->getStatus() ? [] : [$target], (int) $event->siteId);

        return $matches[$target['id']] ?? ['count' => 0, 'events' => []];
    }

    /**
     * Recurring previews are bounded to the next year and 100 occurrences. Existing events start at
     * today (or the event's start, if later), with ongoing occurrences and moved overrides included.
     */
    public function forSchedule(Event $event): array
    {
        $materializer = new OccurrenceMaterializer();
        $rrule = $event->getRRuleObject();
        $from = max(DateHelper::parseFloatingCarbon($event->startDate), DateHelper::parseFloatingCarbon(Carbon::today(\Craft::$app->getTimeZone())));
        $through = $from->copy()->addYear();
        $duration = max(0, $event->endDate->timestamp - $event->startDate->timestamp);
        $dates = $rrule
            ? $rrule->getOccurrencesBetween($from->copy()->subSeconds($duration), $through, self::PREVIEW_LIMIT + 1)
            : [$event->startDate];
        $limited = \count($dates) > self::PREVIEW_LIMIT;
        $dates = \array_slice($dates, 0, self::PREVIEW_LIMIT);
        $overrides = [];
        if ($event->id) {
            foreach (($this->occurrences ?? Calendar::getInstance()->occurrences)->getOverrides($event) as $override) {
                $overrides[$override->recurrenceId->format(RecurrenceId::FORMAT)] = $override;
                // An override can move a date from outside the checked recurrence range into it.
                if ($override->hasOwnTimes() && $materializer->producesRecurrenceId($event, $override->recurrenceId)) {
                    $times = $materializer->describeOccurrence($event, $override->recurrenceId, $override);
                    if (!$times['cancelled'] && $times['startDate'] <= $through && $times['endDate'] >= $from) {
                        $dates[] = $override->recurrenceId;
                    }
                }
            }
        }
        $targets = [];
        foreach ($dates as $date) {
            $date = DateHelper::parseFloatingCarbon($date);
            $key = $date->format(RecurrenceId::FORMAT);
            $times = $materializer->describeOccurrence($event, $date, $overrides[$key] ?? null);
            if ($times['cancelled'] || ($rrule && ($times['endDate'] < $from || $times['startDate'] > $through))) {
                continue;
            }
            $targets[$key] = $this->times($times, 'preview-'.$key, (int) $event->calendarId) + [
                'title' => $event->title,
                'url' => $event->id ? $event->getCpEditUrl() : null,
                'allDay' => $times['allDay'],
            ];
        }
        usort($targets, static fn (array $a, array $b) => $a['start'] <=> $b['start']);
        $limited = $limited || \count($targets) > self::PREVIEW_LIMIT;
        $targets = \array_slice($targets, 0, self::PREVIEW_LIMIT);
        if (Event::STATUS_LIVE !== $event->getStatus()) {
            $targets = [];
        }
        $external = $this->detector->summarize($targets, $this->candidates($targets, (int) $event->siteId, (int) $event->getCanonicalId()));
        // An event whose duration exceeds its repeat interval can conflict with its own later occurrences.
        $internal = $this->detector->summarize($targets, $targets);

        return [
            'count' => $external['count'] + $internal['count'],
            'events' => \array_slice(array_merge($external['events'], $internal['events']), 0, OverlapDetector::DETAIL_LIMIT),
            'recurring' => null !== $rrule,
            'checked' => \count($targets),
            'through' => $through->format('Y-m-d'),
            'limited' => $limited,
        ];
    }

    /** @param array[] $targets */
    private function check(array $targets, int $siteId, int $excludeEventId = 0): array
    {
        return $this->detector->detect($targets, $this->candidates($targets, $siteId, $excludeEventId));
    }

    /** @param array[] $targets */
    private function candidates(array $targets, int $siteId, int $excludeEventId = 0): array
    {
        if (!$targets) {
            return [];
        }
        $query = $this->provider->createQuery([
            'calendarId' => array_values(array_unique(array_column($targets, 'calendarId'))),
            'siteId' => $siteId,
            'cancelled' => false,
            'rangeStart' => Carbon::createFromTimestampUTC(min(array_column($targets, 'start'))),
            'rangeEnd' => Carbon::createFromTimestampUTC(max(array_column($targets, 'end'))),
        ]);
        if ($excludeEventId) {
            $query->event(['not', $excludeEventId]);
        }

        return array_map($this->interval(...), $query->all());
    }

    private function interval(OccurrenceModel $occurrence): array
    {
        return $this->times([
            'startDate' => $occurrence->startDate,
            'endDate' => $occurrence->endDate,
            'allDay' => $occurrence->allDay,
        ], $occurrence->getOccurrenceKey(), (int) $occurrence->calendar->id) + [
            'title' => $occurrence->getContent()->getTitle(),
            'url' => $occurrence->event->getCpEditUrl(),
            'allDay' => $occurrence->allDay,
        ];
    }

    private function times(array $times, string $id, int $calendarId): array
    {
        $start = DateHelper::parseFloatingCarbon($times['startDate']);
        $end = DateHelper::parseFloatingCarbon($times['endDate']);

        return [
            'id' => $id,
            'calendarId' => $calendarId,
            'start' => ($times['allDay'] ? $start->startOfDay() : $start)->timestamp,
            'end' => ($times['allDay'] ? DateHelper::allDayExclusiveEnd($end) : $end)->timestamp,
        ];
    }
}
