<?php

namespace Solspace\Calendar\Library\Export;

use Carbon\Carbon;
use RRule\RRule;
use RRule\RSet;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\RRule\RRuleParser;
use Solspace\Calendar\Models\OccurrenceContent;
use Solspace\Calendar\Records\OccurrenceOverrideRecord;

class ExportCalendarToIcs extends AbstractExportCalendar
{
    private ?Carbon $now = null;

    /**
     * Collect events and parse them, and build a string
     * That will be exported to a file.
     */
    protected function prepareStringForExport(): string
    {
        $events = $this->getEventQuery()->all();
        $overrides = $this->findOverrides($events);

        $exportString = "BEGIN:VCALENDAR\r\n";
        $exportString .= "PRODID:-//Solspace/Calendar//EN\r\n";
        $exportString .= "VERSION:2.0\r\n";
        $exportString .= "CALSCALE:GREGORIAN\r\n";

        $this->now = Carbon::now(DateHelper::UTC);

        /** @var Event $event */
        foreach ($events as $event) {
            $exportString .= $this->combineExportString($event, $overrides[$event->id.'-'.$event->siteId] ?? []);
        }

        return $exportString.'END:VCALENDAR';
    }

    /**
     * Builds the event's VEVENT, followed by one for each occurrence with its own changes, linked to it by UID
     * and RECURRENCE-ID. A one-off event's only occurrence is the event itself, so its changes go on that VEVENT.
     *
     * @param OccurrenceOverride[] $overrides
     */
    private function combineExportString(Event $event, array $overrides): string
    {
        $oneOff = null === $event->getRRuleRFCString();
        $exportString = $this->createEventLines($event, $oneOff ? array_shift($overrides) : null, false);

        foreach ($overrides as $override) {
            $exportString .= $this->createEventLines($event, $override, true);
        }

        return $exportString;
    }

    /**
     * One VEVENT: the event with its schedule, or one of its occurrences with its override applied.
     */
    private function createEventLines(Event $event, ?OccurrenceOverride $override, bool $isOccurrence): string
    {
        $timezone = $this->getOption('timezone', $event->getCalendar()->getIcsTimezone());
        $allDay = $event->isAllDay();
        $occurrence = $override
            ? Calendar::getInstance()->occurrences->describeOccurrence($event, $override->recurrenceId, $override)
            : ['startDate' => $event->getStartDate(), 'endDate' => $event->getEndDate(), 'allDay' => $allDay, 'cancelled' => false];
        $content = new OccurrenceContent($event, $override);

        $lines = "BEGIN:VEVENT\r\n";
        $lines .= $this->createLine('UID', $event->uid ?: $event->id.'@solspace.com');

        if ($isOccurrence) {
            $lines .= $this->createDateLine('RECURRENCE-ID', $override->recurrenceId, $allDay, $timezone);
            $lines .= $this->createStampLines($override->dateCreated, $override->dateUpdated);
        } else {
            $updated = $override?->dateUpdated > $event->dateUpdated ? $override->dateUpdated : $event->dateUpdated;
            $lines .= $this->createStampLines($event->dateCreated, $updated);
        }

        $lines .= $this->createContentLines($event, $content);
        $lines .= $this->createDateRangeLines($occurrence['startDate'], $occurrence['endDate'], $occurrence['allDay'], $timezone);

        if (!$isOccurrence) {
            $lines .= $this->createRecurrenceLines($event->getRRuleRFCString(), $allDay, $timezone);
        }

        if ($occurrence['cancelled']) {
            $lines .= $this->createLine('STATUS', 'CANCELLED');
        }

        $lines .= $this->createLine('SUMMARY', $this->prepareString((string) $content->getTitle()));

        return $lines."END:VEVENT\r\n";
    }

    /**
     * The overrides of the exported events whose occurrences are still on the schedule, by event and site.
     *
     * @param Event[] $events
     *
     * @return array<string, OccurrenceOverride[]>
     */
    private function findOverrides(array $events): array
    {
        if (!$events) {
            return [];
        }

        $overrides = OccurrenceOverride::find()
            ->primaryOwnerId(array_map(static fn (Event $event) => $event->id, $events))
            ->siteId(array_values(array_unique(array_map(static fn (Event $event) => $event->siteId, $events))))
            ->status(null)
            ->orphaned(false)
            ->orderBy([OccurrenceOverrideRecord::TABLE_STD.'.recurrenceId' => \SORT_ASC])
            ->all()
        ;

        $grouped = [];
        foreach ($overrides as $override) {
            $grouped[$override->getPrimaryOwnerId().'-'.$override->siteId][] = $override;
        }

        return $grouped;
    }

    private function createStampLines(?\DateTimeInterface $created, ?\DateTimeInterface $updated): string
    {
        return $this->createLine('DTSTAMP', $this->formatUtcDateTime($this->now))
            .$this->createLine('CREATED', $this->formatUtcDateTime($created))
            .$this->createLine('LAST-MODIFIED', $this->formatUtcDateTime($updated));
    }

    private function createContentLines(Event $event, OccurrenceContent $content): string
    {
        $lines = '';
        $calendar = $event->getCalendar();

        foreach (['DESCRIPTION' => $calendar->descriptionFieldHandle, 'LOCATION' => $calendar->locationFieldHandle] as $property => $handle) {
            $value = $handle && isset($content->{$handle}) ? $content->{$handle} : null;
            if ($value) {
                $lines .= $this->createLine($property, $this->prepareString($this->htmlToText($value)));
            }
        }

        return $lines;
    }

    /**
     * All-day ends are stored as the end of the last day, while DTEND is the day after it.
     */
    private function createDateRangeLines(Carbon $startDate, Carbon $endDate, bool $allDay, string $timezone): string
    {
        return $this->createDateLine('DTSTART', $startDate, $allDay, $timezone)
            .$this->createDateLine('DTEND', $allDay ? DateHelper::allDayExclusiveEnd($endDate) : $endDate, $allDay, $timezone);
    }

    /**
     * The rule, additional dates and excluded dates, written the same way as DTSTART. An unreadable
     * rule is left out, so the rest of the export still works.
     */
    private function createRecurrenceLines(?string $rrule, bool $allDay, string $timezone): string
    {
        if (!$rrule) {
            return '';
        }

        try {
            $parsed = RRuleParser::parse($rrule);
        } catch (\Throwable) {
            return '';
        }

        $lines = '';
        $rule = $parsed instanceof RSet ? ($parsed->getRRules()[0] ?? null) : $parsed;

        foreach (preg_split('/\R/', $rrule) ?: [] as $line) {
            $line = trim($line);

            if ($rule instanceof RRule && str_starts_with($line, 'RRULE:')) {
                $lines .= $this->foldLine($this->formatUntil($line, $rule, $allDay, $timezone))."\r\n";
            }
        }

        if ($parsed instanceof RSet) {
            foreach (['RDATE' => $parsed->getDates(), 'EXDATE' => $parsed->getExDates()] as $property => $dates) {
                if ($dates) {
                    $lines .= $this->createDateLine($property, array_map(DateHelper::parseFloatingCarbon(...), $dates), $allDay, $timezone);
                }
            }
        }

        return $lines;
    }

    /**
     * @param Carbon|Carbon[] $dates
     */
    private function createDateLine(string $property, array|Carbon $dates, bool $allDay, string $timezone): string
    {
        $dates = \is_array($dates) ? $dates : [$dates];

        if ($allDay) {
            return $this->createLine(
                $property.';VALUE=DATE',
                implode(',', array_map(static fn (Carbon $date) => $date->format(self::DATE_FORMAT), $dates)),
            );
        }

        $values = implode(',', array_map(
            static fn (Carbon $date) => $date->format(self::DATE_TIME_FORMAT).('UTC' === $timezone ? 'Z' : ''),
            $dates,
        ));

        if ('UTC' === $timezone || DateHelper::FLOATING_TIMEZONE === $timezone) {
            return $this->createLine($property, $values);
        }

        return $this->createLine($property.';TZID='.$timezone, $values);
    }

    /**
     * UNTIL is a date for all-day events and floating with a floating DTSTART. Otherwise it has to be in UTC.
     */
    private function formatUntil(string $line, RRule $rule, bool $allDay, string $timezone): string
    {
        $until = $rule->getRule()['UNTIL'] ?? null;
        if (!$until instanceof \DateTimeInterface) {
            return $line;
        }

        $until = DateHelper::parseFloatingCarbon($until);

        if ($allDay) {
            $value = $until->format(self::DATE_FORMAT);
        } elseif (DateHelper::FLOATING_TIMEZONE === $timezone) {
            $value = $until->format(self::DATE_TIME_FORMAT);
        } else {
            $local = new Carbon($until->format('Y-m-d H:i:s'), 'UTC' === $timezone ? DateHelper::UTC : $timezone);
            $value = $local->setTimezone(DateHelper::UTC)->format(self::DATE_TIME_FORMAT).'Z';
        }

        return (string) preg_replace('/UNTIL=[0-9TZ]+/', 'UNTIL='.$value, $line);
    }

    private function createLine(string $property, int|string $value): string
    {
        return $this->foldLine($property.':'.$value)."\r\n";
    }

    private function formatUtcDateTime(?\DateTimeInterface $date): string
    {
        $date ??= $this->now;

        return Carbon::createFromInterface($date)
            ->setTimezone(DateHelper::UTC)
            ->format(self::DATE_TIME_FORMAT).'Z'
        ;
    }

    private function htmlToText(mixed $value): string
    {
        $value = (string) $value;
        $value = (string) preg_replace('/<\s*br\s*\/?>/i', "\n", $value);
        $value = (string) preg_replace('/<\s*\/(p|div|li|h[1-6])\s*>/i', "\n", $value);

        return html_entity_decode(strip_tags($value), \ENT_QUOTES | \ENT_HTML5, 'UTF-8');
    }
}
