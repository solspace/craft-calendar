<?php

namespace Solspace\Calendar\migrations;

use Carbon\Carbon;
use craft\db\Migration;
use craft\db\Query;
use craft\db\Table;
use craft\fieldlayoutelements\TitleField;
use craft\helpers\Db as DbHelper;
use craft\helpers\StringHelper;
use craft\models\FieldLayout;
use craft\models\FieldLayoutTab;
use RRule\RRule;
use RRule\RRuleInterface;
use Solspace\Calendar\Bundles\FieldLayouts\Elements\EventFieldElement\EventFieldElement;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\RRule\RRuleStringNormalizer;
use Solspace\Calendar\Records\OccurrenceRecord;
use Solspace\Calendar\Records\OccurrenceWindowRecord;
use yii\db\Expression;

class m260603_000000_V5ToV6Bridge extends Migration
{
    private const OCCURRENCE_BATCH_INSERT_SIZE = 500;
    private const EVENT_QUERY_BATCH_SIZE = 100;

    public function safeUp(): bool
    {
        // ---------------------------------------------------------------------
        // m251231_090653_AddOccurrencesAndTimezones
        // ---------------------------------------------------------------------
        $this->upAddOccurrencesAndTimezones();

        // ---------------------------------------------------------------------
        // m260401_104918_ChangeRRuleToLongText
        // ---------------------------------------------------------------------
        $this->upChangeRRuleToLongText();

        // ---------------------------------------------------------------------
        // V5ToV6Bridge: Ensure calendar event field layout element
        // ---------------------------------------------------------------------
        $this->upEnsureEventFieldLayoutElements();

        // ---------------------------------------------------------------------
        // V5ToV6Bridge: Rewrite legacy recurrence data to RRULE/RSet strings
        // ---------------------------------------------------------------------
        $this->upRewriteLegacyRRules();

        // ---------------------------------------------------------------------
        // V5ToV6Bridge: Generate persisted event occurrences
        // ---------------------------------------------------------------------
        $this->upGenerateOccurrences();

        return true;
    }

    public function safeDown(): bool
    {
        // ---------------------------------------------------------------------
        // V5ToV6Bridge: Generate persisted event occurrences
        // ---------------------------------------------------------------------
        $this->downGenerateOccurrences();

        // ---------------------------------------------------------------------
        // V5ToV6Bridge: Rewrite legacy recurrence data to RRULE/RSet strings
        // ---------------------------------------------------------------------
        $this->downRewriteLegacyRRules();

        // ---------------------------------------------------------------------
        // V5ToV6Bridge: Ensure calendar event field layout element
        // ---------------------------------------------------------------------
        $this->downEnsureEventFieldLayoutElements();

        // ---------------------------------------------------------------------
        // m260401_104918_ChangeRRuleToLongText
        // ---------------------------------------------------------------------
        $this->downChangeRRuleToLongText();

        // ---------------------------------------------------------------------
        // m251231_090653_AddOccurrencesAndTimezones
        // ---------------------------------------------------------------------
        $this->downAddOccurrencesAndTimezones();

        return true;
    }

    private function upAddOccurrencesAndTimezones(): void
    {
        $serverTimezone = \Craft::$app->getTimeZone();

        if (!$this->db->columnExists('{{%calendar_calendars}}', 'defaultTimezone')) {
            $this->addColumn(
                '{{%calendar_calendars}}',
                'defaultTimezone',
                $this->string(200)->after('description')
            );
        }

        if (!$this->db->columnExists('{{%calendar_events}}', 'timezone')) {
            $this->addColumn(
                '{{%calendar_events}}',
                'timezone',
                $this->string(200)->after('authorId')
            );
        }

        $this->update(
            '{{%calendar_events}}',
            ['timezone' => $serverTimezone],
            ['or', ['timezone' => null], ['timezone' => '']],
        );

        if (!$this->db->columnExists('{{%calendar_events}}', 'repeatType')) {
            $this->addColumn(
                '{{%calendar_events}}',
                'repeatType',
                $this->string(10)->after('rrule')->defaultValue('NEVER'),
            );

            $this->addColumn(
                '{{%calendar_events}}',
                'repeatEndType',
                $this->string(10)->after('rrule')->defaultValue('NEVER'),
            );
        }

        if (!$this->db->tableExists('{{%calendar_events_occurrences}}')) {
            $this->createTable(
                '{{%calendar_events_occurrences}}',
                [
                    'eventId' => $this->integer()->notNull(),
                    'calendarId' => $this->integer()->notNull(),
                    'startDate' => $this->dateTime()->notNull(),
                    'endDate' => $this->dateTime(),
                    'allDay' => $this->boolean(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                ]
            );

            $this->addPrimaryKey(
                'pk_calendar_events_occurrences',
                '{{%calendar_events_occurrences}}',
                ['eventId', 'startDate'],
            );

            $this->createIndex('occurrences_calendar_start_idx', '{{%calendar_events_occurrences}}', ['calendarId', 'startDate']);
            $this->createIndex('occurrences_calendar_end_idx', '{{%calendar_events_occurrences}}', ['calendarId', 'endDate']);
            $this->createIndex('occurrences_calendar_start_end_idx', '{{%calendar_events_occurrences}}', ['calendarId', 'startDate', 'endDate']);
            $this->createIndex('occurrences_calendar_end_start_idx', '{{%calendar_events_occurrences}}', ['calendarId', 'endDate', 'startDate']);
            $this->createIndex('occurrences_event_end_idx', '{{%calendar_events_occurrences}}', ['eventId', 'endDate']);
            $this->createIndex('occurrences_start_utc_idx', '{{%calendar_events_occurrences}}', ['startDate']);
            $this->createIndex('occurrences_end_utc_idx', '{{%calendar_events_occurrences}}', ['endDate']);
            $this->createIndex('occurrences_start_end_idx', '{{%calendar_events_occurrences}}', ['startDate', 'endDate']);
            $this->createIndex('occurrences_end_start_idx', '{{%calendar_events_occurrences}}', ['endDate', 'startDate']);

            $this->addForeignKey(
                'occurrences_event_id_fk',
                '{{%calendar_events_occurrences}}',
                'eventId',
                '{{%calendar_events}}',
                'id',
                'CASCADE',
            );

            $this->addForeignKey(
                'occurrences_calendar_id_fk',
                '{{%calendar_events_occurrences}}',
                'calendarId',
                '{{%calendar_calendars}}',
                'id',
                'CASCADE',
            );
        }

        if (!$this->db->tableExists(OccurrenceWindowRecord::TABLE)) {
            $this->createTable(
                OccurrenceWindowRecord::TABLE,
                [
                    'eventId' => $this->integer()->notNull(),
                    'generatedThrough' => $this->dateTime()->notNull(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                ]
            );

            $this->addPrimaryKey(
                'pk_calendar_events_occurrence_windows',
                OccurrenceWindowRecord::TABLE,
                ['eventId'],
            );

            $this->createIndex('occurrence_windows_generated_through_idx', OccurrenceWindowRecord::TABLE, ['generatedThrough']);

            $this->addForeignKey(
                'occurrence_windows_event_id_fk',
                OccurrenceWindowRecord::TABLE,
                'eventId',
                '{{%calendar_events}}',
                'id',
                'CASCADE',
            );
        }
    }

    private function upChangeRRuleToLongText(): void
    {
        $this->alterColumn('{{%calendar_events}}', 'rrule', $this->longText());
    }

    private function downChangeRRuleToLongText(): void
    {
        $this->alterColumn('{{%calendar_events}}', 'rrule', $this->string());
    }

    private function downAddOccurrencesAndTimezones(): void
    {
        if ($this->db->tableExists(OccurrenceWindowRecord::TABLE)) {
            $this->dropForeignKeyIfExists(OccurrenceWindowRecord::TABLE, 'occurrence_windows_event_id_fk');
            $this->dropTable(OccurrenceWindowRecord::TABLE);
        }

        if ($this->db->tableExists('{{%calendar_events_occurrences}}')) {
            $this->dropForeignKeyIfExists('{{%calendar_events_occurrences}}', 'occurrences_event_id_fk');
            $this->dropForeignKeyIfExists('{{%calendar_events_occurrences}}', 'occurrences_calendar_id_fk');
            $this->dropTable('{{%calendar_events_occurrences}}');
        }

        if ($this->db->columnExists('{{%calendar_events}}', 'timezone')) {
            $this->dropColumn('{{%calendar_events}}', 'timezone');
        }

        if ($this->db->columnExists('{{%calendar_calendars}}', 'defaultTimezone')) {
            $this->dropColumn('{{%calendar_calendars}}', 'defaultTimezone');
        }

        if ($this->db->columnExists('{{%calendar_events}}', 'repeatType')) {
            $this->dropColumn('{{%calendar_events}}', 'repeatType');
            $this->dropColumn('{{%calendar_events}}', 'repeatEndType');
        }
    }

    private function upEnsureEventFieldLayoutElements(): void
    {
        foreach ($this->getCalendarLayoutRows() as $calendar) {
            $layout = $this->getOrCreateFieldLayout($calendar);
            $tabs = $layout->getTabs();
            if (!$tabs) {
                $tabs = [$this->createDefaultFieldLayoutTab($layout)];
            }

            $element = $this->extractFirstEventFieldElement($tabs) ?? new EventFieldElement();
            $element->uid ??= StringHelper::UUID();

            [$tabIndex, $elementIndex] = $this->getEventFieldInsertPosition($tabs, (bool) $calendar['hasTitleField'], (string) ($calendar['titleLabel'] ?? ''));

            $elements = $tabs[$tabIndex]->getElements();
            array_splice($elements, $elementIndex, 0, [$element]);
            $tabs[$tabIndex]->setElements($elements);

            $layout->setTabs($tabs);
            $this->saveCalendarFieldLayout((int) $calendar['id'], (string) $calendar['uid'], $layout);
        }
    }

    private function downEnsureEventFieldLayoutElements(): void
    {
        foreach ($this->getCalendarLayoutRows() as $calendar) {
            if (!$calendar['fieldLayoutId']) {
                continue;
            }

            $layout = \Craft::$app->getFields()->getLayoutById((int) $calendar['fieldLayoutId']);
            if (!$layout) {
                continue;
            }

            $modified = false;
            $tabs = $layout->getTabs();
            foreach ($tabs as $tab) {
                $elements = array_values(
                    array_filter(
                        $tab->getElements(),
                        static fn ($element) => !$element instanceof EventFieldElement,
                    )
                );

                if (\count($elements) !== \count($tab->getElements())) {
                    $tab->setElements($elements);
                    $modified = true;
                }
            }

            if ($modified) {
                $layout->setTabs($tabs);
                \Craft::$app->getFields()->saveLayout($layout);

                $this->syncFieldLayoutToProjectConfig((string) $calendar['uid'], $layout);
            }
        }
    }

    private function getCalendarLayoutRows(): array
    {
        return (new Query())
            ->select(['id', 'uid', 'fieldLayoutId', 'hasTitleField', 'titleLabel'])
            ->from('{{%calendar_calendars}}')
            ->orderBy(['id' => \SORT_ASC])
            ->all()
        ;
    }

    private function getOrCreateFieldLayout(array $calendar): FieldLayout
    {
        $layout = null;
        if ($calendar['fieldLayoutId']) {
            $layout = \Craft::$app->getFields()->getLayoutById((int) $calendar['fieldLayoutId']);
        }

        if (!$layout) {
            $layout = new FieldLayout();
            $layout->uid = StringHelper::UUID();
        }

        $layout->type = Event::class;

        return $layout;
    }

    private function createDefaultFieldLayoutTab(FieldLayout $layout): FieldLayoutTab
    {
        $tab = new FieldLayoutTab();
        $tab->name = 'Content';
        $tab->uid = StringHelper::UUID();
        $tab->sortOrder = 1;
        $tab->setLayout($layout);
        $tab->setElements([]);

        return $tab;
    }

    private function extractFirstEventFieldElement(array $tabs): ?EventFieldElement
    {
        $eventFieldElement = null;

        foreach ($tabs as $tab) {
            $elements = [];
            foreach ($tab->getElements() as $element) {
                if ($element instanceof EventFieldElement) {
                    $eventFieldElement ??= $element;

                    continue;
                }

                $elements[] = $element;
            }

            $tab->setElements($elements);
        }

        return $eventFieldElement;
    }

    /**
     * @param FieldLayoutTab[] $tabs
     *
     * @return array{0: int, 1: int}
     */
    private function getEventFieldInsertPosition(array &$tabs, bool $hasTitleField, string $titleLabel): array
    {
        if (!$hasTitleField) {
            return [0, 0];
        }

        foreach ($tabs as $tabIndex => $tab) {
            foreach ($tab->getElements() as $elementIndex => $element) {
                if ($element instanceof TitleField) {
                    return [$tabIndex, $elementIndex + 1];
                }
            }
        }

        $titleField = new TitleField();
        $titleField->uid = StringHelper::UUID();

        if ('' !== $titleLabel) {
            $titleField->label = $titleLabel;
        }

        $elements = $tabs[0]->getElements();
        array_unshift($elements, $titleField);
        $tabs[0]->setElements($elements);

        return [0, 1];
    }

    private function saveCalendarFieldLayout(int $calendarId, string $calendarUid, FieldLayout $layout): void
    {
        \Craft::$app->getFields()->saveLayout($layout);

        if (!$layout->id) {
            return;
        }

        $this->update(
            '{{%calendar_calendars}}',
            ['fieldLayoutId' => $layout->id],
            ['id' => $calendarId],
        );

        $this->syncFieldLayoutToProjectConfig($calendarUid, $layout);
    }

    private function upRewriteLegacyRRules(): void
    {
        $selectDatesByEventId = $this->getLegacyDatesByEventId('{{%calendar_select_dates}}');
        $exceptionsByEventId = $this->getLegacyDatesByEventId('{{%calendar_exceptions}}');

        foreach ($this->getCanonicalEventRows() as $event) {
            $eventId = (int) $event['id'];
            $selectDates = $selectDatesByEventId[$eventId] ?? [];
            $exceptions = $exceptionsByEventId[$eventId] ?? [];

            $rrule = $selectDates
                ? $this->buildRDateOnlyRRule($event, $selectDates, $exceptions)
                : $this->buildRecurringRRule($event, $exceptions);

            [$repeatType, $repeatEndType] = $this->resolveRepeatTypes($event, (bool) $selectDates, $rrule);

            $this->update(
                Event::TABLE,
                [
                    'rrule' => $rrule,
                    'repeatType' => $repeatType,
                    'repeatEndType' => $repeatEndType,
                ],
                ['id' => $eventId],
            );
        }
    }

    /**
     * Derives the v6 ``repeatType`` / ``repeatEndType`` values for a legacy v5 event row.
     *
     * v5 stores recurrence as ``freq`` + ``count`` + ``until`` + ``by*``. v6 splits this into:
     *   - ``repeatType``: NEVER | DAILY | WEEKLY | MONTHLY | YEARLY | CUSTOM
     *     - "CUSTOM" is required whenever any BY* part is present, since the simple
     *       templates in the event-builder UI don't expose BYDAY / BYMONTHDAY / etc.
     *   - ``repeatEndType``: NEVER | AFTER (uses ``count``) | ON_DATE (uses ``until``)
     *
     * @return array{0: string, 1: string}
     */
    private function resolveRepeatTypes(array $event, bool $hasSelectDates, ?string $rrule): array
    {
        // SELECT_DATES rows are stored as RDATE-only rrules with no traditional recurrence.
        if ($hasSelectDates) {
            return [Event::REPEAT_NEVER, Event::REPEAT_NEVER];
        }

        $frequency = strtoupper((string) ($event['freq'] ?? ''));

        // If the existing repeatType column is already populated (e.g. a partial re-run, or
        // the row was created by the new event builder), preserve it.
        $existingRepeatType = strtoupper((string) ($event['repeatType'] ?? ''));
        if ('' !== $existingRepeatType && Event::REPEAT_NEVER !== $existingRepeatType) {
            $existingRepeatEndType = (string) ($event['repeatEndType'] ?? '');
            if ('' === $existingRepeatEndType) {
                $existingRepeatEndType = $this->resolveRepeatEndType($event);
            }

            return [$existingRepeatType, $existingRepeatEndType];
        }

        // Non-recurring or unrecognised frequency.
        if (!$this->isValidFrequency($frequency)) {
            return [Event::REPEAT_NEVER, Event::REPEAT_NEVER];
        }

        // Defensive: if we somehow couldn't build a recurrence rule string, treat as non-repeating.
        if (null === $rrule) {
            return [Event::REPEAT_NEVER, Event::REPEAT_NEVER];
        }

        $repeatType = $this->hasLegacyByParts($event) ? Event::REPEAT_CUSTOM : $frequency;
        $repeatEndType = $this->resolveRepeatEndType($event);

        return [$repeatType, $repeatEndType];
    }

    private function resolveRepeatEndType(array $event): string
    {
        // A count of 0 means "no count", not "repeat zero times".
        $count = $this->normalizeRulePartValue($event['count'] ?? null);
        if (null !== $count && (int) $count > 0) {
            return Event::REPEAT_END_AFTER;
        }

        if (!empty($event['until'])) {
            return Event::REPEAT_END_ON_DATE;
        }

        return Event::REPEAT_END_NEVER;
    }

    private function hasLegacyByParts(array $event): bool
    {
        foreach (['byDay', 'byMonthDay', 'byMonth', 'byYearDay'] as $column) {
            if (null !== $this->normalizeRulePartValue($event[$column] ?? null)) {
                return true;
            }
        }

        return false;
    }

    private function downRewriteLegacyRRules(): void
    {
        echo "m260603_000000_V5ToV6Bridge recurrence rewrite cannot be reverted.\n";
    }

    private function getCanonicalEventRows(): array
    {
        return $this->getCanonicalEventRowsQuery()->all();
    }

    private function getCanonicalEventRowsQuery(): Query
    {
        $query = (new Query())
            ->select([
                'events.id',
                'events.calendarId',
                'events.startDate',
                'events.endDate',
                'events.allDay',
                'events.rrule',
                'events.repeatType',
                'events.repeatEndType',
                'events.freq',
                'events.interval',
                'events.count',
                'events.until',
                'events.byMonth',
                'events.byYearDay',
                'events.byMonthDay',
                'events.byDay',
            ])
            ->from(['events' => Event::TABLE])
            ->innerJoin(['elements' => Table::ELEMENTS], '[[elements]].[[id]] = [[events]].[[id]]')
            ->orderBy(['events.id' => \SORT_ASC])
        ;

        $elementSchema = $this->db->getTableSchema(Table::ELEMENTS);
        if ($elementSchema?->getColumn('dateDeleted')) {
            $query->andWhere(['elements.dateDeleted' => null]);
        }

        if ($elementSchema?->getColumn('canonicalId')) {
            $query->andWhere([
                'or',
                ['elements.canonicalId' => null],
                new Expression('[[elements]].[[id]] = [[elements]].[[canonicalId]]'),
            ]);
        }

        return $query;
    }

    private function getLegacyDatesByEventId(string $table): array
    {
        if (!$this->db->tableExists($table)) {
            return [];
        }

        $rows = (new Query())
            ->select(['eventId', 'date'])
            ->from($table)
            ->orderBy(['eventId' => \SORT_ASC, 'date' => \SORT_ASC])
            ->all()
        ;

        $dates = [];
        foreach ($rows as $row) {
            $eventId = (int) $row['eventId'];
            $dates[$eventId][] = (string) $row['date'];
        }

        return $dates;
    }

    private function buildRDateOnlyRRule(array $event, array $selectDates, array $exceptions): string
    {
        $allDay = (bool) $event['allDay'];
        $startDate = new Carbon($event['startDate'], DateHelper::UTC);
        $rdates = [$startDate];

        foreach ($selectDates as $date) {
            $rdates[] = $this->normalizeLegacyDateWithEventStartTime($date, $startDate, $allDay);
        }

        $lines = [
            $this->formatDateLine('DTSTART', $startDate, $allDay),
            $this->formatDateListLine('RDATE', $rdates, $allDay),
        ];

        $exdateLine = $this->buildExDateLine($event, $exceptions);
        if ($exdateLine) {
            $lines[] = $exdateLine;
        }

        return implode("\n", array_filter($lines));
    }

    private function buildRecurringRRule(array $event, array $exceptions): ?string
    {
        $existing = $this->normalizeExistingRRule(
            $event,
            $this->removeDateValueLines((string) ($event['rrule'] ?? ''), 'EXDATE'),
        );

        if ($this->hasRecurrenceLines($existing)) {
            $lines = [$existing];
            $exdateLine = $this->buildExDateLine($event, $exceptions);
            if ($exdateLine) {
                $lines[] = $exdateLine;
            }

            return implode("\n", array_filter($lines));
        }

        $baseRule = $this->buildLegacyBaseRule($event);
        if (!$baseRule) {
            return null;
        }

        $allDay = (bool) $event['allDay'];
        $startDate = new Carbon($event['startDate'], DateHelper::UTC);
        $lines = [
            $this->formatDateLine('DTSTART', $startDate, $allDay),
            $baseRule,
        ];

        $exdateLine = $this->buildExDateLine($event, $exceptions);
        if ($exdateLine) {
            $lines[] = $exdateLine;
        }

        return implode("\n", array_filter($lines));
    }

    private function normalizeExistingRRule(array $event, string $rrule): string
    {
        $lines = array_values(
            array_filter(
                array_map('trim', preg_split('/\R/', $rrule) ?: []),
                static fn (string $line) => '' !== $line,
            )
        );

        if (!$lines) {
            return '';
        }

        $allDay = (bool) $event['allDay'];
        $startLine = $this->formatDateLine('DTSTART', new Carbon($event['startDate'], DateHelper::UTC), $allDay);
        $hasStart = false;
        foreach ($lines as &$line) {
            if (str_starts_with($line, 'DTSTART')) {
                $hasStart = true;
                $line = $startLine;
            }

            if (str_starts_with($line, 'FREQ=')) {
                $line = 'RRULE:'.$line;
            }

            $line = RRuleStringNormalizer::normalizeLine($line, $allDay);
        }
        unset($line);

        if (!$hasStart) {
            array_unshift($lines, $startLine);
        }

        return implode("\n", $lines);
    }

    private function hasRecurrenceLines(string $rrule): bool
    {
        foreach (preg_split('/\R/', $rrule) ?: [] as $line) {
            if (str_starts_with($line, 'RRULE') || str_starts_with($line, 'RDATE')) {
                return true;
            }
        }

        return false;
    }

    private function buildLegacyBaseRule(array $event): ?string
    {
        $frequency = $this->resolveLegacyFrequency($event);
        if (!$frequency) {
            return null;
        }

        $parts = ['FREQ='.$frequency];
        foreach (
            [
                'interval' => 'INTERVAL',
                'count' => 'COUNT',
                'byMonth' => 'BYMONTH',
                'byYearDay' => 'BYYEARDAY',
                'byMonthDay' => 'BYMONTHDAY',
                'byDay' => 'BYDAY',
            ] as $column => $property
        ) {
            $value = $this->normalizeRulePartValue($event[$column] ?? null);
            if (null === $value) {
                continue;
            }

            // COUNT=0 is not a valid rule part, and a count of 0 means "no count".
            if ('count' === $column && (int) $value <= 0) {
                continue;
            }

            $parts[] = $property.'='.$value;
        }

        if (!empty($event['until'])) {
            $parts[] = 'UNTIL='.$this->formatDateValue(
                new Carbon($event['until'], DateHelper::UTC),
                (bool) $event['allDay'],
            );
        }

        return 'RRULE:'.implode(';', $parts);
    }

    private function resolveLegacyFrequency(array $event): ?string
    {
        $repeatType = strtoupper((string) ($event['repeatType'] ?? ''));

        // For pure v5 rows the new repeatType column has its default ('NEVER') or is empty,
        // so fall back to the legacy ``freq`` column.
        if ('' === $repeatType || Event::REPEAT_NEVER === $repeatType) {
            $frequency = strtoupper((string) ($event['freq'] ?? ''));

            return $this->isValidFrequency($frequency) ? $frequency : null;
        }

        if (Event::REPEAT_CUSTOM === $repeatType) {
            $frequency = strtoupper((string) ($event['freq'] ?? ''));

            return $this->isValidFrequency($frequency) ? $frequency : null;
        }

        return $this->isValidFrequency($repeatType) ? $repeatType : null;
    }

    private function isValidFrequency(string $frequency): bool
    {
        return \in_array($frequency, [
            Event::REPEAT_DAILY,
            Event::REPEAT_WEEKLY,
            Event::REPEAT_MONTHLY,
            Event::REPEAT_YEARLY,
        ], true);
    }

    private function normalizeRulePartValue(mixed $value): ?string
    {
        if (null === $value || '' === $value) {
            return null;
        }

        if (\is_numeric($value)) {
            return (string) (int) $value;
        }

        $value = trim((string) $value);

        return '' === $value ? null : $value;
    }

    private function buildExDateLine(array $event, array $exceptions): ?string
    {
        if (!$exceptions) {
            return null;
        }

        $allDay = (bool) $event['allDay'];
        $startDate = new Carbon($event['startDate'], DateHelper::UTC);
        $dates = [];

        foreach ($exceptions as $date) {
            $dates[] = $this->normalizeLegacyDateWithEventStartTime($date, $startDate, $allDay);
        }

        return $this->formatDateListLine('EXDATE', $dates, $allDay);
    }

    private function removeDateValueLines(string $rrule, string $property): string
    {
        $lines = array_filter(
            array_map('trim', preg_split('/\R/', $rrule) ?: []),
            static fn (string $line) => '' !== $line && !str_starts_with($line, $property),
        );

        return implode("\n", $lines);
    }

    private function normalizeLegacyDateWithEventStartTime(string $date, Carbon $eventStart, bool $allDay): Carbon
    {
        $legacyDate = new Carbon($date, DateHelper::UTC);

        return Carbon::create(
            (int) $legacyDate->format('Y'),
            (int) $legacyDate->format('m'),
            (int) $legacyDate->format('d'),
            $allDay ? 0 : (int) $eventStart->format('H'),
            $allDay ? 0 : (int) $eventStart->format('i'),
            $allDay ? 0 : (int) $eventStart->format('s'),
            DateHelper::UTC,
        );
    }

    private function formatDateLine(string $property, Carbon $date, bool $allDay): string
    {
        return $property.':'.$this->formatDateValue($date, $allDay);
    }

    private function formatDateListLine(string $property, array $dates, bool $allDay): ?string
    {
        $values = [];
        foreach ($dates as $date) {
            $normalized = $allDay ? $date->copy()->startOfDay() : $date;
            $value = $this->formatDateValue($normalized, $allDay);
            $values[$value] = $value;
        }

        ksort($values);
        if (!$values) {
            return null;
        }

        if ($allDay) {
            return $property.';VALUE=DATE:'.implode(',', $values);
        }

        return $property.':'.implode(',', $values);
    }

    private function formatDateValue(Carbon $date, bool $allDay): string
    {
        if ($allDay) {
            return $date->copy()->startOfDay()->format('Ymd');
        }

        return $date->format('Ymd\THis');
    }

    private function upGenerateOccurrences(): void
    {
        $this->delete(OccurrenceRecord::TABLE);
        $this->delete(OccurrenceWindowRecord::TABLE);

        foreach ($this->getCanonicalEventRowsQuery()->batch(self::EVENT_QUERY_BATCH_SIZE, $this->db) as $events) {
            $rows = [];
            $windowRows = [];

            foreach ($events as $event) {
                $generatedThrough = null;
                foreach ($this->buildOccurrenceRows($event, $generatedThrough) as $row) {
                    $rows[] = $row;

                    if (\count($rows) >= self::OCCURRENCE_BATCH_INSERT_SIZE) {
                        $this->insertOccurrenceRows($rows);
                        $rows = [];
                    }
                }

                if ($generatedThrough) {
                    $windowRows[] = $this->createOccurrenceWindowRow((int) $event['id'], $generatedThrough);
                }
            }

            if ($rows) {
                $this->insertOccurrenceRows($rows);
            }

            if ($windowRows) {
                $this->insertOccurrenceWindowRows($windowRows);
            }
        }
    }

    private function downGenerateOccurrences(): void
    {
        $this->delete(OccurrenceWindowRecord::TABLE);
        $this->delete(OccurrenceRecord::TABLE);
    }

    private function buildOccurrenceRows(array $event, ?Carbon &$generatedThrough = null): iterable
    {
        $startDate = new Carbon($event['startDate'], DateHelper::UTC);
        $endDate = new Carbon($event['endDate'], DateHelper::UTC);
        $timeDelta = $startDate->diff($endDate);
        $seen = [];

        $rrule = $this->createRRuleObject((string) ($event['rrule'] ?? ''));
        if (null === $rrule) {
            yield $this->createOccurrenceRow($event, $startDate, $timeDelta);

            return;
        }

        $generatedThrough = $rrule->isInfinite() ? new Carbon('+2 years', DateHelper::UTC) : null;

        foreach ($this->getOccurrenceDates($rrule, $generatedThrough) as $occurrence) {
            $key = $occurrence->format('Y-m-d H:i:s');
            if (isset($seen[$key])) {
                continue;
            }

            $seen[$key] = true;

            yield $this->createOccurrenceRow($event, $occurrence, $timeDelta);
        }
    }

    private function createRRuleObject(string $rrule): ?RRuleInterface
    {
        $rrule = trim($rrule);
        if ('' === $rrule) {
            return null;
        }

        try {
            return RRule::createFromRfcString($rrule, true);
        } catch (\Throwable $exception) {
            \Craft::warning(
                'Could not parse migrated Calendar RRULE during occurrence generation: '.$exception->getMessage(),
                __METHOD__,
            );

            return null;
        }
    }

    private function getOccurrenceDates(RRuleInterface $rrule, ?Carbon $generatedThrough = null): iterable
    {
        foreach ($rrule as $occurrence) {
            $occurrence = new Carbon($occurrence->format('Y-m-d H:i:s'), DateHelper::UTC);

            if ($generatedThrough && $occurrence > $generatedThrough) {
                break;
            }

            yield $occurrence;
        }
    }

    private function createOccurrenceRow(array $event, Carbon $startDate, \DateInterval $timeDelta): array
    {
        $endDate = $startDate->copy()->add($timeDelta);
        $now = DbHelper::prepareDateForDb(new Carbon('now', DateHelper::UTC));

        return [
            (int) $event['id'],
            (int) $event['calendarId'],
            DbHelper::prepareDateForDb($startDate),
            DbHelper::prepareDateForDb($endDate),
            (bool) $event['allDay'],
            $now,
            $now,
            StringHelper::UUID(),
        ];
    }

    private function createOccurrenceWindowRow(int $eventId, Carbon $generatedThrough): array
    {
        $now = DbHelper::prepareDateForDb(new Carbon('now', DateHelper::UTC));

        return [
            $eventId,
            DbHelper::prepareDateForDb($generatedThrough),
            $now,
            $now,
            StringHelper::UUID(),
        ];
    }

    private function insertOccurrenceRows(array $rows): void
    {
        if (!$rows) {
            return;
        }

        $this->batchInsert(
            OccurrenceRecord::TABLE,
            ['eventId', 'calendarId', 'startDate', 'endDate', 'allDay', 'dateCreated', 'dateUpdated', 'uid'],
            $rows,
        );
    }

    private function insertOccurrenceWindowRows(array $rows): void
    {
        if (!$rows) {
            return;
        }

        $this->batchInsert(
            OccurrenceWindowRecord::TABLE,
            ['eventId', 'generatedThrough', 'dateCreated', 'dateUpdated', 'uid'],
            $rows,
        );
    }

    /**
     * Calendars are stored in project config, so any layout saved in the DB
     * would be wiped again the next time the project config is applied via the CP.
     * Keep the two in sync.
     */
    private function syncFieldLayoutToProjectConfig(string $calendarUid, ?FieldLayout $layout): void
    {
        $projectConfig = \Craft::$app->getProjectConfig();
        if ($projectConfig->readOnly) {
            return;
        }

        $path = Calendar::CONFIG_CALENDAR_PATH.'.'.$calendarUid;
        if (null === $projectConfig->get($path)) {
            return;
        }

        $config = null;
        if ($layout && $layout->getConfig()) {
            $config = array_merge(['uid' => $layout->uid], $layout->getConfig());
        }

        $projectConfig->set($path.'.fieldLayout', $config);
    }
}
