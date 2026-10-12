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
     *
     * @return array{success: bool, event?: array<string, mixed>, error?: string}
     */
    public function generateFromPrompt(string $prompt, array $calendars, ?string $timezone = null): array
    {
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

        $systemPrompt = <<<PROMPT
            You are an assistant that creates calendar events for Craft CMS Calendar.
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
              "calendarHandle": "handle from the allowed calendars list"
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
            - Interpret "today", "tomorrow", "next Tuesday", "Monday at 9am", etc. from the user reference now above.
            - start/end must be naive ISO-like datetimes: 2026-10-11T09:00:00
            - For timed events, end must be after start. If duration is omitted, use {$eventDuration} minutes.
            - For all-day events: start at 00:00:00 on the first day; end at 00:00:00 on the day AFTER the last day (exclusive end).
            - repeatType must be one of NEVER, DAILY, WEEKLY, MONTHLY, YEARLY, CUSTOM.
            - When repeatType is WEEKLY and the user names a weekday, set rrule like FREQ=WEEKLY;BYDAY=MO (use that weekday).
            - When repeatType is DAILY/MONTHLY/YEARLY and rrule is empty, you may omit rrule (server will fill a simple rule).
            - For CUSTOM, rrule is required (e.g. FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE).
            - Do not include DTSTART, RDATE, or EXDATE in rrule; only the RRULE body (FREQ=...).
            - When the user limits recurrence ("for 4 weeks", "10 times", "until December 1"), include COUNT= or UNTIL= in the rrule body.
              UNTIL must be floating local time: all-day YYYYMMDD, timed YYYYMMDDTHHMMSS (no Z / offsets).
            - Prefer calendarHandle from the allowed list; if unsure, use the first calendar.

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
        $event['rrule'] = $this->normalizeGeneratedRrule(
            (string) $event['repeatType'],
            (string) $event['rrule'],
            $start,
            (bool) $event['allDay'],
        );
        if (Event::REPEAT_NEVER === $event['repeatType']) {
            $event['rrule'] = '';
        }
        [$repeatEndType, $untilTimestamp] = $this->inferRepeatEndFromRrule((string) $event['rrule']);
        $event['repeatEndType'] = $repeatEndType;
        $event['until'] = $untilTimestamp;
        $event['referenceNow'] = $referenceFloating->format('Y-m-d\TH:i:s');

        return ['success' => true, 'event' => $event];
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
     * @return array{success: bool, event?: array<string, mixed>, error?: string}
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
        ];

        if ('' === $event['title']) {
            return ['success' => false, 'error' => Calendar::t('AI did not return an event title.')];
        }

        if ('' === $event['start'] || '' === $event['end']) {
            return ['success' => false, 'error' => Calendar::t('AI did not return valid start and end dates.')];
        }

        return ['success' => true, 'event' => $event];
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

    private function getSolspaceAi(): SolspaceAiService
    {
        return Calendar::getInstance()->solspaceAi;
    }
}
