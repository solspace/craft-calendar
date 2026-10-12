<?php

namespace Solspace\Calendar\Services\SolspaceAi;

use Carbon\Carbon;
use craft\base\Component;
use craft\i18n\Locale;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Models\SettingsModel;

class EventGenerationService extends Component
{
    /**
     * @param array<int, array{id: int, handle: string, title: string}> $calendars
     * @param null|array<string, mixed>                                 $currentEvent existing event when updating in place
     *
     * @return array{success: bool, event?: array<string, mixed>, error?: string}
     */
    public function generateFromPrompt(
        string $prompt,
        array $calendars,
        ?string $timezone = null,
        ?array $currentEvent = null,
    ): array {
        $prompt = trim($prompt);
        if ('' === $prompt) {
            return ['success' => false, 'error' => Calendar::t('Please describe the event you want to create.')];
        }

        // Relative language ("tomorrow", "next Monday") follows the caller's clock when provided
        // (browser timezone from the CP). Event metadata still stores Craft's app timezone.
        $interpretationTimezone = $this->resolveTimezone($timezone);
        $craftTimezone = $this->resolveTimezone(\Craft::$app->getTimeZone());
        $now = Carbon::now($interpretationTimezone);
        $referenceFloating = DateHelper::parseFloatingCarbon($now->format('Y-m-d H:i:s'));
        $settings = Calendar::getInstance()->settings;
        $settingsModel = $settings->getSettingsModel();
        $weekStartDay = $settings->getFirstDayOfWeek();
        $weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $weekStartName = $weekdays[$weekStartDay] ?? 'Monday';
        $timeFormat = match ($settingsModel->timeFormat) {
            SettingsModel::TIME_FORMAT_12_HOUR => '12-hour',
            SettingsModel::TIME_FORMAT_24_HOUR => '24-hour',
            default => 'locale-default',
        };
        $shortDate = DateFormatHelper::get(DateFormatHelper::TYPE_DATE, Locale::FORMAT_ICU, 'short');
        $shortTime = DateFormatHelper::get(DateFormatHelper::TYPE_TIME, Locale::FORMAT_ICU, 'short');
        $eventDuration = $settings->getEventDuration();
        $calendarList = $this->formatCalendarList($calendars);
        $normalizedCurrent = $this->normalizeCurrentEvent($currentEvent, $calendars);
        $isUpdate = null !== $normalizedCurrent;
        $currentEventJson = $isUpdate
            ? json_encode($normalizedCurrent, \JSON_UNESCAPED_SLASHES | \JSON_UNESCAPED_UNICODE)
            : '';

        $updateInstructions = $isUpdate ? <<<UPDATE
            Mode: UPDATE an existing event (do not create a new one).
            Current event JSON (source of truth for unchanged fields):
            {$currentEventJson}

            Update rules:
            - Only change fields the user explicitly asks to change.
            - Copy every other field EXACTLY from the current event JSON above.
            - Include "changedFields": an array of field names you changed (subset of title, description, location, start, end, allDay, repeatType, rrule, calendarHandle, additionalDates, excludedDates).
            - If the user only changes time/date/repeat/extra dates, keep title/description/location/calendarHandle as-is.
            - Relative phrases like "make it tomorrow" or "move to 3pm" are relative to the current event and the user reference now.
            - "add an additional date Oct 24" / "also on Oct 24" → additionalDates: ["YYYY-MM-DD"] and changedFields includes "additionalDates".
            - "exclude Oct 24" / "skip Thanksgiving" / "off for …" → excludedDates: ["YYYY-MM-DD"] and changedFields includes "excludedDates".
            - Only list dates the user asked to add/exclude in this turn (server merges them into the existing set).
            UPDATE : '';

        $systemPrompt = <<<PROMPT
            You are an assistant that creates and updates calendar events for Craft CMS Calendar.
            Return ONLY valid JSON with no markdown fences or commentary.

            Use this schema:
            {
              "title": "string (required)",
              "description": "string or empty",
              "location": "string or empty",
              "start": "YYYY-MM-DDTHH:mm:ss wall-clock datetime with NO timezone offset and NO Z",
              "end": "YYYY-MM-DDTHH:mm:ss wall-clock datetime with NO timezone offset and NO Z",
              "allDay": boolean,
              "repeatType": "NEVER|DAILY|WEEKLY|MONTHLY|YEARLY|CUSTOM",
              "rrule": "RFC 5545 RRULE body without RRULE: prefix when repeating; empty when NEVER",
              "additionalDates": ["YYYY-MM-DD dates outside the recurring pattern (Additional Dates / RDATE)"],
              "excludedDates": ["YYYY-MM-DD dates removed from the recurring pattern (Excluded Dates / EXDATE)"],
              "calendarHandle": "handle from the allowed calendars list",
              "changedFields": ["optional array of changed field names when updating"]
            }

            Calendar context (same sources as Calendar Diagnostics):
            - User/browser timezone for relative language: {$interpretationTimezone}
            - Craft app timezone (stored on events): {$craftTimezone}
            - Reference now for the user: {$now->toDateTimeString()} ({$now->format('l')})
            - First day of week: {$weekStartName} (index {$weekStartDay})
            - Short date format (ICU): {$shortDate}
            - Short time format (ICU): {$shortTime}
            - Preferred time style: {$timeFormat}
            - Default timed event length when duration is omitted: {$eventDuration} minutes
            - Event dates are floating wall times (Diagnostics: "Local event time stored as UTC").
              "9:00" means 9:00 on the calendar for everyone. Never emit Z or ±offsets.

            Rules:
            - Interpret "today", "tomorrow", "next Tuesday", "Monday at 9am", "24 Oct", etc. from the user reference now above.
            - start/end must be naive ISO-like datetimes: 2026-10-11T09:00:00
            - For timed events, end must be after start. If duration is omitted, use {$eventDuration} minutes.
            - For all-day events: start at 00:00:00 on the first day; end at 00:00:00 on the day AFTER the last day (exclusive end).
            - repeatType must be one of NEVER, DAILY, WEEKLY, MONTHLY, YEARLY, CUSTOM.
            - When repeatType is WEEKLY and the user names a weekday, set rrule like FREQ=WEEKLY;BYDAY=MO (use that weekday).
            - When repeatType is DAILY/MONTHLY/YEARLY and rrule is empty, you may omit rrule (server will fill a simple rule).
            - For CUSTOM, rrule is required (e.g. FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE).
            - Do not put DTSTART, RDATE, or EXDATE in rrule; only the RRULE body (FREQ=...). Use additionalDates / excludedDates instead.
            - additionalDates = Calendar "Additional Dates" (extra occurrences outside the pattern).
            - excludedDates = Calendar "Excluded Dates" (skip occurrences from the pattern).
            - When the user limits recurrence ("for 4 weeks", "10 times", "until December 1"), include COUNT= or UNTIL= in the rrule body.
              UNTIL must be floating local time: all-day YYYYMMDD, timed YYYYMMDDTHHMMSS (no Z / offsets).
            - "every Friday for 8 weeks" / "for N weeks" of a weekly event means COUNT=N (N occurrences), not COUNT=2.
            - Prefer calendarHandle from the allowed list; if unsure, use the first calendar.
            - Single-day all-day events: start at 00:00:00 on that day; end at 00:00:00 on the NEXT day (exclusive).
            {$updateInstructions}

            Allowed calendars:
            {$calendarList}
            PROMPT;

        $result = $this->getSolspaceAi()->chatCompletion($systemPrompt, $prompt, [
            'temperature' => 0.1,
            'max_tokens' => 1200,
            'timeout' => 90,
        ]);

        if (!$result['success']) {
            return ['success' => false, 'error' => $result['error'] ?? Calendar::t('AI request failed.')];
        }

        $parsed = $this->parseEventJson((string) ($result['content'] ?? ''), $craftTimezone);
        if (!$parsed['success']) {
            return $parsed;
        }

        /** @var array<string, mixed> $event */
        $event = $parsed['event'];
        if ($isUpdate && $normalizedCurrent) {
            $event = $this->mergeUpdatedEvent($normalizedCurrent, $event, $parsed['changedFields'] ?? []);
        }

        try {
            $start = DateHelper::parseFloatingCarbon((string) $event['start']);
            $end = DateHelper::parseFloatingCarbon((string) $event['end']);
        } catch (\Throwable) {
            return ['success' => false, 'error' => Calendar::t('AI did not return valid start and end dates.')];
        }

        if ($event['allDay']) {
            [$start, $end] = $this->normalizeAllDayRange($start, $end);
        } elseif ($end->lte($start)) {
            $end = $start->copy()->addMinutes(max(1, $eventDuration));
        }

        if ($start->diffInDays($end, true) > Event::SPAN_LIMIT_DAYS) {
            return ['success' => false, 'error' => Calendar::t('The maximum time span of an event is 365 days.')];
        }

        if ([] === $calendars) {
            return ['success' => false, 'error' => Calendar::t('No calendars are available.')];
        }

        $handles = array_map(static fn (array $c) => $c['handle'], $calendars);
        if ('' === $event['calendarHandle'] || !\in_array($event['calendarHandle'], $handles, true)) {
            $event['calendarHandle'] = $calendars[0]['handle'];
        }

        $calendarId = null;
        foreach ($calendars as $calendar) {
            if ($calendar['handle'] === $event['calendarHandle']) {
                $calendarId = $calendar['id'];

                break;
            }
        }

        $event['calendarId'] = $calendarId;
        $event['timezone'] = $craftTimezone;
        $event['start'] = $start->format('Y-m-d\TH:i:s');
        $event['end'] = $end->format('Y-m-d\TH:i:s');
        $event['startTimestamp'] = $start->getTimestamp();
        $event['endTimestamp'] = $end->getTimestamp();

        $changedFields = $isUpdate
            ? array_values(array_unique(array_map(
                static fn ($field) => (string) $field,
                $parsed['changedFields'] ?? []
            )))
            : [];

        $baseRrule = $this->normalizeGeneratedRrule(
            (string) $event['repeatType'],
            (string) $event['rrule'],
            $start,
            (bool) $event['allDay'],
        );

        // Preserve existing RDATE/EXDATE from the current event unless this update replaces them.
        $existingRdates = [];
        $existingExdates = [];
        if ($isUpdate && $normalizedCurrent) {
            [$existingRdates, $existingExdates] = $this->extractFixedDateValues((string) ($normalizedCurrent['rrule'] ?? ''));
        }

        $addRdates = $this->normalizeDateList($event['additionalDates'] ?? []);
        $addExdates = $this->normalizeDateList($event['excludedDates'] ?? []);

        $rdates = $existingRdates;
        $exdates = $existingExdates;
        if (!$isUpdate || \in_array('additionalDates', $changedFields, true) || [] === $changedFields) {
            $rdates = $this->mergeUniqueDates($existingRdates, $addRdates);
        }
        if (!$isUpdate || \in_array('excludedDates', $changedFields, true) || [] === $changedFields) {
            $exdates = $this->mergeUniqueDates($existingExdates, $addExdates);
        }

        if (
            Event::REPEAT_NEVER === $event['repeatType']
            && [] === $rdates
            && [] === $exdates
        ) {
            $event['rrule'] = '';
        } else {
            $event['rrule'] = $this->attachFixedDatesToRrule(
                $baseRrule,
                $start,
                (bool) $event['allDay'],
                $rdates,
                $exdates,
            );
        }

        if (
            $isUpdate
            && (
                \in_array('additionalDates', $changedFields, true)
                || \in_array('excludedDates', $changedFields, true)
            )
            && !\in_array('rrule', $changedFields, true)
        ) {
            $changedFields[] = 'rrule';
        }

        [$repeatEndType, $untilTimestamp] = $this->inferRepeatEndFromRrule((string) $event['rrule']);
        $event['repeatEndType'] = $repeatEndType;
        $event['until'] = $untilTimestamp;
        $event['additionalDates'] = $rdates;
        $event['excludedDates'] = $exdates;
        $event['referenceNow'] = $referenceFloating->format('Y-m-d\TH:i:s');
        if ($isUpdate) {
            $event['changedFields'] = $changedFields;
        }

        return ['success' => true, 'event' => $event];
    }

    /**
     * @param null|array<string, mixed>                                 $current
     * @param array<int, array{id: int, handle: string, title: string}> $calendars
     *
     * @return null|array<string, mixed>
     */
    private function normalizeCurrentEvent(?array $current, array $calendars): ?array
    {
        if (!\is_array($current) || [] === $current) {
            return null;
        }

        $repeatType = strtoupper(trim((string) ($current['repeatType'] ?? Event::REPEAT_NEVER)));
        $allowedRepeatTypes = [
            Event::REPEAT_NEVER,
            Event::REPEAT_DAILY,
            Event::REPEAT_WEEKLY,
            Event::REPEAT_MONTHLY,
            Event::REPEAT_YEARLY,
            Event::REPEAT_CUSTOM,
        ];
        if (!\in_array($repeatType, $allowedRepeatTypes, true)) {
            $repeatType = Event::REPEAT_NEVER;
        }

        $calendarHandle = trim((string) ($current['calendarHandle'] ?? ''));
        if ('' === $calendarHandle && isset($current['calendarId'])) {
            $calendarId = (int) $current['calendarId'];
            foreach ($calendars as $calendar) {
                if ($calendar['id'] === $calendarId) {
                    $calendarHandle = $calendar['handle'];

                    break;
                }
            }
        }

        $rrule = trim((string) ($current['rrule'] ?? ''));
        if (str_contains($rrule, "\n") || str_starts_with(strtoupper($rrule), 'RRULE:')) {
            foreach (preg_split("/\r\n|\n|\r/", $rrule) ?: [] as $line) {
                $line = trim($line);
                if (str_starts_with(strtoupper($line), 'RRULE:')) {
                    $rrule = preg_replace('/^RRULE:/i', '', $line) ?? '';

                    break;
                }
                if (str_starts_with(strtoupper($line), 'FREQ=')) {
                    $rrule = $line;

                    break;
                }
            }
        }

        $start = trim((string) ($current['start'] ?? ''));
        $end = trim((string) ($current['end'] ?? ''));
        $title = trim((string) ($current['title'] ?? ''));
        if ('' === $title || '' === $start || '' === $end) {
            return null;
        }

        return [
            'title' => $title,
            'description' => trim((string) ($current['description'] ?? '')),
            'location' => trim((string) ($current['location'] ?? '')),
            'start' => $start,
            'end' => $end,
            'allDay' => (bool) ($current['allDay'] ?? false),
            'repeatType' => $repeatType,
            'rrule' => Event::REPEAT_NEVER === $repeatType ? '' : $rrule,
            'calendarHandle' => $calendarHandle,
        ];
    }

    /**
     * @param array<string, mixed> $current
     * @param array<string, mixed> $incoming
     * @param list<string>         $changedFields
     *
     * @return array<string, mixed>
     */
    private function mergeUpdatedEvent(array $current, array $incoming, array $changedFields): array
    {
        $allowed = [
            'title',
            'description',
            'location',
            'start',
            'end',
            'allDay',
            'repeatType',
            'rrule',
            'calendarHandle',
            'additionalDates',
            'excludedDates',
        ];
        $changed = array_values(array_intersect(
            array_map(static fn ($field) => (string) $field, $changedFields),
            $allowed
        ));

        // If the model forgot changedFields, keep its full payload (still instructed to preserve values).
        if ([] === $changed) {
            return $incoming;
        }

        $merged = $current;
        foreach ($changed as $field) {
            if (\array_key_exists($field, $incoming)) {
                $merged[$field] = $incoming[$field];
            }
        }

        // Changing start/allDay without end often needs the companion date fields from the model.
        if (\in_array('start', $changed, true) || \in_array('allDay', $changed, true)) {
            if (\array_key_exists('end', $incoming)) {
                $merged['end'] = $incoming['end'];
            }
            if (\array_key_exists('allDay', $incoming)) {
                $merged['allDay'] = $incoming['allDay'];
            }
        }

        if (\in_array('repeatType', $changed, true) || \in_array('rrule', $changed, true)) {
            if (\array_key_exists('repeatType', $incoming)) {
                $merged['repeatType'] = $incoming['repeatType'];
            }
            if (\array_key_exists('rrule', $incoming)) {
                $merged['rrule'] = $incoming['rrule'];
            }
        }

        return $merged;
    }

    /**
     * @return array{0: string, 1: null|int}
     */
    private function inferRepeatEndFromRrule(string $rrule): array
    {
        if ('' === trim($rrule)) {
            return [Event::REPEAT_END_NEVER, null];
        }

        if (preg_match('/(?:^|;)COUNT=(\d+)/i', $rrule, $countMatch) && (int) $countMatch[1] > 0) {
            return [Event::REPEAT_END_AFTER, null];
        }

        if (preg_match('/(?:^|;)UNTIL=([0-9T]+)/i', $rrule, $untilMatch)) {
            $raw = $untilMatch[1];

            try {
                if (preg_match('/^\d{8}$/', $raw)) {
                    $until = DateHelper::parseFloatingCarbon(substr($raw, 0, 4).'-'.substr($raw, 4, 2).'-'.substr($raw, 6, 2).'T00:00:00');
                } elseif (preg_match('/^\d{8}T\d{6}$/', $raw)) {
                    $until = DateHelper::parseFloatingCarbon(
                        substr($raw, 0, 4).'-'.substr($raw, 4, 2).'-'.substr($raw, 6, 2).'T'
                        .substr($raw, 9, 2).':'.substr($raw, 11, 2).':'.substr($raw, 13, 2)
                    );
                } else {
                    return [Event::REPEAT_END_NEVER, null];
                }

                return [Event::REPEAT_END_ON_DATE, $until->getTimestamp()];
            } catch (\Throwable) {
                return [Event::REPEAT_END_NEVER, null];
            }
        }

        return [Event::REPEAT_END_NEVER, null];
    }

    private function resolveTimezone(?string $timezone): string
    {
        $timezone = trim((string) ($timezone ?: \Craft::$app->getTimeZone()));
        if ('' === $timezone || DateHelper::FLOATING_TIMEZONE === strtolower($timezone)) {
            $timezone = (string) \Craft::$app->getTimeZone();
        }

        try {
            new \DateTimeZone($timezone);
        } catch (\Throwable) {
            $timezone = 'UTC';
        }

        return $timezone ?: 'UTC';
    }

    /**
     * @param array<int, array{id: int, handle: string, title: string}> $calendars
     */
    private function formatCalendarList(array $calendars): string
    {
        if ([] === $calendars) {
            return '- (none configured)';
        }

        $lines = [];
        foreach ($calendars as $calendar) {
            $lines[] = \sprintf(
                '- %s (handle: %s, id: %d)',
                $calendar['title'],
                $calendar['handle'],
                $calendar['id']
            );
        }

        return implode("\n", $lines);
    }

    /**
     * @return array{success: bool, event?: array<string, mixed>, changedFields?: list<string>, error?: string}
     */
    private function parseEventJson(string $content, string $timezone): array
    {
        $content = trim($content);
        if ('' === $content) {
            return ['success' => false, 'error' => Calendar::t('AI returned an empty response.')];
        }

        if (preg_match('/```(?:json)?\s*([\s\S]*?)```/i', $content, $matches)) {
            $content = trim($matches[1]);
        }

        $data = json_decode($content, true);
        if (!\is_array($data)) {
            return ['success' => false, 'error' => Calendar::t('AI returned invalid JSON.')];
        }

        $repeatType = strtoupper(trim((string) ($data['repeatType'] ?? Event::REPEAT_NEVER)));
        $allowedRepeatTypes = [
            Event::REPEAT_NEVER,
            Event::REPEAT_DAILY,
            Event::REPEAT_WEEKLY,
            Event::REPEAT_MONTHLY,
            Event::REPEAT_YEARLY,
            Event::REPEAT_CUSTOM,
        ];
        if (!\in_array($repeatType, $allowedRepeatTypes, true)) {
            $repeatType = Event::REPEAT_NEVER;
        }

        $changedFields = [];
        if (isset($data['changedFields']) && \is_array($data['changedFields'])) {
            foreach ($data['changedFields'] as $field) {
                if (\is_string($field) && '' !== trim($field)) {
                    $changedFields[] = trim($field);
                }
            }
        }

        $event = [
            'title' => trim((string) ($data['title'] ?? '')),
            'description' => trim((string) ($data['description'] ?? '')),
            'location' => trim((string) ($data['location'] ?? '')),
            'start' => trim((string) ($data['start'] ?? '')),
            'end' => trim((string) ($data['end'] ?? '')),
            'timezone' => $timezone,
            'allDay' => (bool) ($data['allDay'] ?? false),
            'repeatType' => $repeatType,
            'rrule' => trim((string) ($data['rrule'] ?? '')),
            'calendarHandle' => trim((string) ($data['calendarHandle'] ?? '')),
            'additionalDates' => $this->normalizeDateList($data['additionalDates'] ?? []),
            'excludedDates' => $this->normalizeDateList($data['excludedDates'] ?? []),
        ];

        if ('' === $event['title']) {
            return ['success' => false, 'error' => Calendar::t('AI did not return an event title.')];
        }

        if ('' === $event['start'] || '' === $event['end']) {
            return ['success' => false, 'error' => Calendar::t('AI did not return valid start and end dates.')];
        }

        return ['success' => true, 'event' => $event, 'changedFields' => $changedFields];
    }

    /**
     * @return array{0: Carbon, 1: Carbon}
     */
    private function normalizeAllDayRange(Carbon $start, Carbon $end): array
    {
        $startDay = $start->copy()->startOfDay();
        $endDay = $end->copy()->startOfDay();

        // Exclusive end at midnight. If AI sent an inclusive same-day/end-of-day value, bump one day.
        if ($end->equalTo($endDay) && $endDay->gt($startDay)) {
            return [$startDay, $endDay];
        }

        $inclusiveEnd = $endDay->lt($startDay) ? $startDay : $endDay;

        return [$startDay, $inclusiveEnd->copy()->addDay()];
    }

    private function normalizeGeneratedRrule(
        string $repeatType,
        string $rrule,
        Carbon $start,
        bool $allDay,
    ): string {
        if (Event::REPEAT_NEVER === $repeatType) {
            return '';
        }

        $rrule = preg_replace('/^RRULE:/i', '', trim($rrule)) ?? '';
        $rrule = trim(str_replace(["\r\n", "\r"], "\n", $rrule));

        // Keep only RRULE body lines if the model returned a full set.
        if (str_contains($rrule, "\n")) {
            foreach (explode("\n", $rrule) as $line) {
                $line = trim($line);
                if (str_starts_with(strtoupper($line), 'RRULE:')) {
                    $rrule = preg_replace('/^RRULE:/i', '', $line) ?? '';

                    break;
                }
                if (str_starts_with(strtoupper($line), 'FREQ=')) {
                    $rrule = $line;

                    break;
                }
            }
        }

        if ('' === $rrule || Event::REPEAT_CUSTOM !== $repeatType && !str_contains(strtoupper($rrule), 'FREQ=')) {
            $rrule = match ($repeatType) {
                Event::REPEAT_DAILY => 'FREQ=DAILY',
                Event::REPEAT_WEEKLY => 'FREQ=WEEKLY;BYDAY='.DateHelper::getCurrentWeekDay($start),
                Event::REPEAT_MONTHLY => 'FREQ=MONTHLY;BYMONTHDAY='.$start->day,
                Event::REPEAT_YEARLY => 'FREQ=YEARLY;BYMONTH='.$start->month.';BYMONTHDAY='.$start->day,
                default => $rrule,
            };
        }

        if ('' === $rrule) {
            return '';
        }

        $dtstart = $allDay ? $start->format('Ymd') : $start->format('Ymd\THis');

        return "DTSTART:{$dtstart}\nRRULE:{$rrule}";
    }

    /**
     * @param list<string> $rdates  Y-m-d
     * @param list<string> $exdates Y-m-d
     */
    private function attachFixedDatesToRrule(
        string $baseRrule,
        Carbon $start,
        bool $allDay,
        array $rdates,
        array $exdates,
    ): string {
        $lines = [];
        $baseRrule = trim(str_replace(["\r\n", "\r"], "\n", $baseRrule));
        if ('' !== $baseRrule) {
            foreach (explode("\n", $baseRrule) as $line) {
                $line = trim($line);
                if ('' === $line) {
                    continue;
                }
                $upper = strtoupper($line);
                if (str_starts_with($upper, 'RDATE') || str_starts_with($upper, 'EXDATE')) {
                    continue;
                }
                $lines[] = $line;
            }
        }

        if ([] === $lines) {
            $dtstart = $allDay ? $start->format('Ymd') : $start->format('Ymd\THis');
            $lines[] = 'DTSTART:'.$dtstart;
        }

        $rdates = array_values(array_unique($rdates));
        $exdates = array_values(array_unique($exdates));
        sort($rdates);
        sort($exdates);

        if ([] !== $rdates) {
            $lines[] = $this->formatFixedDateLine('RDATE', $rdates, $start, $allDay);
        }
        if ([] !== $exdates) {
            $lines[] = $this->formatFixedDateLine('EXDATE', $exdates, $start, $allDay);
        }

        return implode("\n", $lines);
    }

    /**
     * @param list<string> $dates Y-m-d
     */
    private function formatFixedDateLine(string $property, array $dates, Carbon $start, bool $allDay): string
    {
        if ($allDay) {
            $values = array_map(
                static fn (string $date) => str_replace('-', '', $date),
                $dates
            );

            return $property.';VALUE=DATE:'.implode(',', $values);
        }

        $time = $start->format('His');
        $values = array_map(
            static fn (string $date) => str_replace('-', '', $date).'T'.$time,
            $dates
        );

        return $property.':'.implode(',', $values);
    }

    /**
     * @return array{0: list<string>, 1: list<string>} Y-m-d lists
     */
    private function extractFixedDateValues(string $rrule): array
    {
        $rdates = [];
        $exdates = [];
        $rrule = trim(str_replace(["\r\n", "\r"], "\n", $rrule));
        if ('' === $rrule) {
            return [[], []];
        }

        foreach (explode("\n", $rrule) as $line) {
            $line = trim($line);
            if ('' === $line) {
                continue;
            }
            $upper = strtoupper($line);
            $target = null;
            if (str_starts_with($upper, 'RDATE')) {
                $target = &$rdates;
            } elseif (str_starts_with($upper, 'EXDATE')) {
                $target = &$exdates;
            } else {
                continue;
            }

            $raw = '';
            if (str_contains($line, ':')) {
                $raw = substr($line, strpos($line, ':') + 1);
            }
            foreach (explode(',', $raw) as $value) {
                $value = trim($value);
                if ('' === $value) {
                    continue;
                }
                // 20261024 or 20261024T090000 → Y-m-d
                if (preg_match('/^(\d{4})(\d{2})(\d{2})/', $value, $match)) {
                    $target[] = $match[1].'-'.$match[2].'-'.$match[3];
                }
            }
            unset($target);
        }

        return [
            array_values(array_unique($rdates)),
            array_values(array_unique($exdates)),
        ];
    }

    /**
     * @return list<string> Y-m-d
     */
    private function normalizeDateList(mixed $value): array
    {
        if (!\is_array($value)) {
            return [];
        }

        $dates = [];
        foreach ($value as $item) {
            if (!\is_string($item) && !\is_numeric($item)) {
                continue;
            }
            $raw = trim((string) $item);
            if ('' === $raw) {
                continue;
            }

            try {
                if (preg_match('/^\d{4}-\d{2}-\d{2}/', $raw)) {
                    $dates[] = DateHelper::parseFloatingCarbon(substr($raw, 0, 10).'T00:00:00')->format('Y-m-d');
                } elseif (preg_match('/^\d{8}/', $raw)) {
                    $dates[] = DateHelper::parseFloatingCarbon(
                        substr($raw, 0, 4).'-'.substr($raw, 4, 2).'-'.substr($raw, 6, 2).'T00:00:00'
                    )->format('Y-m-d');
                }
            } catch (\Throwable) {
                continue;
            }
        }

        return array_values(array_unique($dates));
    }

    /**
     * @param list<string> $existing
     * @param list<string> $incoming
     *
     * @return list<string>
     */
    private function mergeUniqueDates(array $existing, array $incoming): array
    {
        return array_values(array_unique([...$existing, ...$incoming]));
    }

    private function getSolspaceAi(): SolspaceAiService
    {
        return Calendar::getInstance()->solspaceAi;
    }
}
