<?php

namespace Solspace\Calendar\Services\SolspaceAi;

use craft\helpers\StringHelper;
use craft\helpers\UrlHelper;
use craft\models\FieldLayout;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\ColorHelper;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Services\CalendarsService;
use yii\base\Component;

class CalendarGenerationService extends Component
{
    private const PROMPT_MAX_LENGTH = 4000;

    /**
     * Generate calendar metadata from a prompt, save it, and return the edit URL.
     *
     * Field layout stays empty — authors finish Craft fields on the edit screen.
     *
     * @param list<array{handle: string, name: string}> $existingCalendars
     *
     * @return array{success: bool, url?: string, calendar?: array<string, mixed>, error?: string}
     */
    public function generateAndSave(string $prompt, array $existingCalendars = []): array
    {
        $prompt = trim($prompt);
        if ('' === $prompt) {
            return ['success' => false, 'error' => Calendar::t('Please describe the calendar you want to create.')];
        }

        if (mb_strlen($prompt) > self::PROMPT_MAX_LENGTH) {
            return [
                'success' => false,
                'error' => Calendar::t('Prompt must be at most {n} characters.', ['n' => self::PROMPT_MAX_LENGTH]),
            ];
        }

        $parsed = $this->generateFromPrompt($prompt, $existingCalendars);
        if (!$parsed['success']) {
            return $parsed;
        }

        /** @var array<string, mixed> $data */
        $data = $parsed['calendar'];
        $calendar = $this->buildCalendarModel($data);

        if (!$this->getCalendarsService()->saveCalendar($calendar)) {
            $errors = $calendar->getErrorSummary(true);

            return [
                'success' => false,
                'error' => $errors
                    ? implode(' ', $errors)
                    : Calendar::t('Couldn’t save calendar.'),
            ];
        }

        return [
            'success' => true,
            'url' => UrlHelper::cpUrl('calendar/calendars/'.$calendar->handle),
            'calendar' => [
                'id' => (int) $calendar->id,
                'name' => (string) $calendar->name,
                'handle' => (string) $calendar->handle,
                'description' => (string) $calendar->description,
                'color' => (string) $calendar->color,
            ],
        ];
    }

    /**
     * @param list<array{handle: string, name: string}> $existingCalendars
     *
     * @return array{success: bool, calendar?: array<string, mixed>, error?: string}
     */
    public function generateFromPrompt(string $prompt, array $existingCalendars = []): array
    {
        $existingList = $this->formatExistingCalendars($existingCalendars);
        $craftTimezone = (string) \Craft::$app->getTimeZone();

        $systemPrompt = <<<PROMPT
            You create Solspace Calendar "calendars" (event containers / channel settings), not individual events.
            Return ONLY valid JSON for one calendar object with this shape:
            {
              "name": "human display name",
              "handle": "camelCaseOrSnake handle, letters/numbers/underscores/hyphens, no spaces",
              "description": "short optional description",
              "color": "#RRGGBB hex color that fits the calendar theme",
              "hasTitleField": true,
              "titleLabel": "Title",
              "titleFormat": "",
              "allowRepeatingEvents": true,
              "icsTimezone": "floating or a valid IANA timezone like {$craftTimezone}"
            }

            Rules:
            - name is required and should be concise (e.g. "Staff Meetings", "Public Holidays").
            - handle must be unique among existing calendars; if a collision is likely, append a short suffix.
            - Prefer hasTitleField true with titleLabel "Title" unless the user asks for automatic titles.
            - When hasTitleField is false, titleFormat is required (e.g. "{slug}" or a simple Craft title format).
            - allowRepeatingEvents defaults to true unless the user wants single-occurrence only.
            - icsTimezone should be "floating" unless the user names a specific timezone.
            - Do not invent Craft custom fields or field layouts; those are configured after creation.
            - color must be #RRGGBB.

            Existing calendars (avoid duplicate names/handles):
            {$existingList}
            PROMPT;

        $result = $this->getSolspaceAi()->chatCompletion($systemPrompt, $prompt, [
            'temperature' => 0.2,
            'max_tokens' => 800,
            'timeout' => 60,
        ]);

        if (!$result['success']) {
            return ['success' => false, 'error' => $result['error'] ?? Calendar::t('AI request failed.')];
        }

        $content = trim((string) ($result['content'] ?? ''));
        if ('' === $content) {
            return ['success' => false, 'error' => Calendar::t('AI returned an empty response.')];
        }

        $json = $this->extractJsonObject($content);
        if (null === $json) {
            return ['success' => false, 'error' => Calendar::t('AI returned invalid JSON.')];
        }

        $calendar = $this->normalizeGeneratedCalendar($json, $existingCalendars);
        if (!$calendar['success']) {
            return $calendar;
        }

        return ['success' => true, 'calendar' => $calendar['calendar']];
    }

    /**
     * @param array<string, mixed> $data
     */
    private function buildCalendarModel(array $data): CalendarModel
    {
        $calendar = CalendarModel::create();
        // uid is assigned in CalendarsService::saveCalendar for new calendars.
        $calendar->name = (string) $data['name'];
        $calendar->handle = (string) $data['handle'];
        $calendar->description = (string) ($data['description'] ?? '');
        $calendar->color = (string) $data['color'];
        $calendar->hasTitleField = (bool) $data['hasTitleField'];
        $calendar->titleLabel = (string) ($data['titleLabel'] ?? 'Title');
        $calendar->titleFormat = (string) ($data['titleFormat'] ?? '');
        $calendar->allowRepeatingEvents = (bool) $data['allowRepeatingEvents'];
        $calendar->icsTimezone = (string) $data['icsTimezone'];
        $calendar->descriptionFieldHandle = null;
        $calendar->locationFieldHandle = null;

        $layout = new FieldLayout();
        $layout->type = Event::class;
        $layout->uid = StringHelper::UUID();
        $calendar->setFieldLayout($layout);

        $siteSettings = [];
        foreach (\Craft::$app->getSites()->getAllSites() as $site) {
            $settings = new CalendarSiteSettingsModel();
            $settings->uid = StringHelper::UUID();
            $settings->siteId = (int) $site->id;
            $settings->enabledByDefault = true;
            $settings->hasUrls = false;
            $settings->uriFormat = null;
            $settings->template = null;
            $siteSettings[] = $settings;
        }
        $calendar->setSiteSettings($siteSettings);

        return $calendar;
    }

    /**
     * @param array<string, mixed>                      $json
     * @param list<array{handle: string, name: string}> $existingCalendars
     *
     * @return array{success: bool, calendar?: array<string, mixed>, error?: string}
     */
    private function normalizeGeneratedCalendar(array $json, array $existingCalendars): array
    {
        $name = trim((string) ($json['name'] ?? ''));
        if ('' === $name) {
            return ['success' => false, 'error' => Calendar::t('AI did not return a calendar name.')];
        }

        $handle = trim((string) ($json['handle'] ?? ''));
        if ('' === $handle) {
            $handle = StringHelper::toHandle($name);
        }
        $handle = preg_replace('/[^a-zA-Z0-9_\-]/', '', $handle) ?? '';
        if ('' === $handle || 'title' === strtolower($handle)) {
            $handle = 'calendar';
        }

        $handle = $this->ensureUniqueHandle($handle, $existingCalendars);
        $name = $this->ensureUniqueName($name, $existingCalendars);

        $color = trim((string) ($json['color'] ?? ''));
        $color = preg_replace('/^([a-z0-9]{6})$/i', '#$1', $color) ?? '';
        if (!preg_match('/^#[a-fA-F0-9]{6}$/', $color)) {
            $color = ColorHelper::randomColor();
        }

        $hasTitleField = \array_key_exists('hasTitleField', $json)
            ? (bool) $json['hasTitleField']
            : true;
        $titleLabel = trim((string) ($json['titleLabel'] ?? 'Title')) ?: 'Title';
        $titleFormat = trim((string) ($json['titleFormat'] ?? ''));
        if (!$hasTitleField && '' === $titleFormat) {
            $titleFormat = '{slug}';
        }

        $icsTimezone = trim((string) ($json['icsTimezone'] ?? DateHelper::FLOATING_TIMEZONE));
        if ('' === $icsTimezone) {
            $icsTimezone = DateHelper::FLOATING_TIMEZONE;
        }
        if (DateHelper::FLOATING_TIMEZONE !== strtolower($icsTimezone)) {
            try {
                new \DateTimeZone($icsTimezone);
            } catch (\Throwable) {
                $icsTimezone = DateHelper::FLOATING_TIMEZONE;
            }
        } else {
            $icsTimezone = DateHelper::FLOATING_TIMEZONE;
        }

        return [
            'success' => true,
            'calendar' => [
                'name' => $name,
                'handle' => $handle,
                'description' => trim((string) ($json['description'] ?? '')),
                'color' => $color,
                'hasTitleField' => $hasTitleField,
                'titleLabel' => $titleLabel,
                'titleFormat' => $titleFormat,
                'allowRepeatingEvents' => \array_key_exists('allowRepeatingEvents', $json)
                    ? (bool) $json['allowRepeatingEvents']
                    : true,
                'icsTimezone' => $icsTimezone,
            ],
        ];
    }

    /**
     * @param list<array{handle: string, name: string}> $existing
     */
    private function ensureUniqueHandle(string $handle, array $existing): string
    {
        $taken = [];
        foreach ($existing as $calendar) {
            $taken[strtolower((string) $calendar['handle'])] = true;
        }

        $base = $handle;
        $suffix = 1;
        while (isset($taken[strtolower($handle)])) {
            $handle = $base.$suffix;
            ++$suffix;
        }

        return $handle;
    }

    /**
     * @param list<array{handle: string, name: string}> $existing
     */
    private function ensureUniqueName(string $name, array $existing): string
    {
        $taken = [];
        foreach ($existing as $calendar) {
            $taken[strtolower((string) $calendar['name'])] = true;
        }

        $base = $name;
        $suffix = 1;
        while (isset($taken[strtolower($name)])) {
            $name = $base.' '.$suffix;
            ++$suffix;
        }

        return $name;
    }

    /**
     * @param list<array{handle: string, name: string}> $calendars
     */
    private function formatExistingCalendars(array $calendars): string
    {
        if ([] === $calendars) {
            return '- (none yet)';
        }

        $lines = [];
        foreach ($calendars as $calendar) {
            $lines[] = \sprintf('- %s (handle: %s)', $calendar['name'], $calendar['handle']);
        }

        return implode("\n", $lines);
    }

    /**
     * @return null|array<string, mixed>
     */
    private function extractJsonObject(string $content): ?array
    {
        $content = trim($content);
        if (preg_match('/```(?:json)?\s*([\s\S]*?)```/i', $content, $matches)) {
            $content = trim($matches[1]);
        }

        $decoded = json_decode($content, true);
        if (\is_array($decoded)) {
            return $decoded;
        }

        if (preg_match('/\{[\s\S]*\}/', $content, $match)) {
            $decoded = json_decode($match[0], true);

            return \is_array($decoded) ? $decoded : null;
        }

        return null;
    }

    private function getSolspaceAi(): SolspaceAiService
    {
        return Calendar::getInstance()->solspaceAi;
    }

    private function getCalendarsService(): CalendarsService
    {
        return Calendar::getInstance()->calendars;
    }
}
