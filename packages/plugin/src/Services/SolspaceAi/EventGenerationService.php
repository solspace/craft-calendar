<?php

namespace Solspace\Calendar\Services\SolspaceAi;

use Carbon\Carbon;
use craft\base\Component;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;

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

        $timezone = trim((string) ($timezone ?: \Craft::$app->getTimeZone()));
        if ('' === $timezone) {
            $timezone = 'UTC';
        }

        $now = Carbon::now($timezone);
        $calendarList = $this->formatCalendarList($calendars);

        $systemPrompt = <<<PROMPT
            You are an assistant that creates calendar events for Craft CMS. Return ONLY valid JSON with no markdown fences or commentary.

            Use this schema:
            {
              "title": "string (required)",
              "description": "string or empty",
              "location": "string or empty",
              "start": "ISO 8601 datetime in the event timezone",
              "end": "ISO 8601 datetime in the event timezone",
              "timezone": "IANA timezone string",
              "allDay": boolean,
              "repeatType": "NEVER|DAILY|WEEKLY|MONTHLY|YEARLY|CUSTOM",
              "rrule": "RFC 5545 RRULE string without RRULE: prefix, or empty when repeatType is NEVER",
              "calendarHandle": "handle from the allowed calendars list"
            }

            Rules:
            - repeatType must be one of: NEVER, DAILY, WEEKLY, MONTHLY, YEARLY, CUSTOM.
            - For CUSTOM repeats, provide a valid RRULE in rrule.
            - End must be after start. Maximum event span is 365 days.
            - Prefer calendarHandle from the allowed list; if unsure, use the first calendar.
            - Interpret relative dates (e.g. "next Tuesday") from reference datetime {$now->toIso8601String()} ({$timezone}).

            Allowed calendars:
            {$calendarList}
            PROMPT;

        $result = $this->getSolspaceAi()->chatCompletion($systemPrompt, $prompt, [
            'temperature' => 0.2,
            'max_tokens' => 1200,
            'timeout' => 90,
        ]);

        if (!$result['success']) {
            return ['success' => false, 'error' => $result['error'] ?? Calendar::t('AI request failed.')];
        }

        $parsed = $this->parseEventJson((string) ($result['content'] ?? ''));
        if (!$parsed['success']) {
            return $parsed;
        }

        /** @var array<string, mixed> $event */
        $event = $parsed['event'];

        $validationError = $this->validateEventPayload($event, $calendars);
        if (null !== $validationError) {
            return ['success' => false, 'error' => $validationError];
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

        $event['startTimestamp'] = $this->isoToUnixTimestamp((string) $event['start'], (string) $event['timezone']);
        $event['endTimestamp'] = $this->isoToUnixTimestamp((string) $event['end'], (string) $event['timezone']);

        if ($event['endTimestamp'] <= $event['startTimestamp']) {
            return ['success' => false, 'error' => Calendar::t('AI returned an invalid date range.')];
        }

        return ['success' => true, 'event' => $event];
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
    private function parseEventJson(string $content): array
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
            'timezone' => trim((string) ($data['timezone'] ?? \Craft::$app->getTimeZone())),
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
     * @param array<string, mixed>                                      $event
     * @param array<int, array{id: int, handle: string, title: string}> $calendars
     */
    private function validateEventPayload(array $event, array $calendars): ?string
    {
        if ([] === $calendars) {
            return Calendar::t('No calendars are available.');
        }

        $start = Carbon::parse((string) $event['start'], (string) $event['timezone']);
        $end = Carbon::parse((string) $event['end'], (string) $event['timezone']);

        if ($start->diffInDays($end, true) > Event::SPAN_LIMIT_DAYS) {
            return Calendar::t('The maximum time span of an event is 365 days.');
        }

        return null;
    }

    private function isoToUnixTimestamp(string $iso, string $timezone): int
    {
        return Carbon::parse($iso, $timezone)->getTimestamp();
    }

    private function getSolspaceAi(): SolspaceAiService
    {
        return Calendar::getInstance()->solspaceAi;
    }
}
