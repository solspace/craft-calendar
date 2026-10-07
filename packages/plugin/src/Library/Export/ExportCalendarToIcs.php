<?php

namespace Solspace\Calendar\Library\Export;

use Carbon\Carbon;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Library\Helpers\DateHelper;
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
     * Builds the event's VEVENT, followed by one for each occurrence with its own changes,
     * linked to it by UID and RECURRENCE-ID.
     *
     * @param OccurrenceOverride[] $overrides
     */
    private function combineExportString(Event $event, array $overrides): string
    {
        $timezone = $this->getOption('timezone', $event->getCalendar()->getIcsTimezone());
        $allDay = $event->isAllDay();
        $uid = $event->uid ?: $event->id.'@solspace.com';

        $exportString = "BEGIN:VEVENT\r\n";
        $exportString .= $this->createLine('UID', $uid);
        $exportString .= $this->createStampLines($event->dateCreated, $event->dateUpdated);
        $exportString .= $this->createContentLines($event, new OccurrenceContent($event));
        $exportString .= $this->createDateRangeLines($event->getStartDate(), $event->getEndDate(), $allDay, $timezone);
        $exportString .= $this->createRecurrenceLines($event->getRRuleRFCString(), $allDay, $timezone);
        $exportString .= $this->createLine('SUMMARY', $this->prepareString((string) $event->title));
        $exportString .= "END:VEVENT\r\n";

        foreach ($overrides as $override) {
            $occurrence = Calendar::getInstance()->occurrences->describeOccurrence($event, $override->recurrenceId, $override);
            $content = new OccurrenceContent($event, $override);

            $exportString .= "BEGIN:VEVENT\r\n";
            $exportString .= $this->createLine('UID', $uid);
            $exportString .= $this->createDateLine('RECURRENCE-ID', $override->recurrenceId, $allDay, $timezone);
            $exportString .= $this->createStampLines($override->dateCreated, $override->dateUpdated);
            $exportString .= $this->createContentLines($event, $content);
            $exportString .= $this->createDateRangeLines($occurrence['startDate'], $occurrence['endDate'], $occurrence['allDay'], $timezone);

            if ($occurrence['cancelled']) {
                $exportString .= $this->createLine('STATUS', 'CANCELLED');
            }

            $exportString .= $this->createLine('SUMMARY', $this->prepareString((string) $content->getTitle()));
            $exportString .= "END:VEVENT\r\n";
        }

        return $exportString;
    }

    /**
     * The overrides of the exported repeating events whose occurrences are still on the schedule,
     * by event and site.
     *
     * @param Event[] $events
     *
     * @return array<string, OccurrenceOverride[]>
     */
    private function findOverrides(array $events): array
    {
        $repeating = array_filter($events, static fn (Event $event) => null !== $event->getRRuleRFCString());
        if (!$repeating) {
            return [];
        }

        $overrides = OccurrenceOverride::find()
            ->primaryOwnerId(array_map(static fn (Event $event) => $event->id, $repeating))
            ->siteId(array_values(array_unique(array_map(static fn (Event $event) => $event->siteId, $repeating))))
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
     * The rule, additional dates and excluded dates, written the same way as DTSTART.
     */
    private function createRecurrenceLines(?string $rrule, bool $allDay, string $timezone): string
    {
        if (!$rrule) {
            return '';
        }

        $lines = '';
        $dates = ['RDATE' => [], 'EXDATE' => []];

        foreach (preg_split('/\R/', $rrule) ?: [] as $line) {
            $line = trim($line);

            if (preg_match('/^(RDATE|EXDATE)(?:;[^:]*)?:(.*)$/', $line, $matches)) {
                foreach (explode(',', $matches[2]) as $value) {
                    $date = $this->parseDateValue($value);
                    if ($date) {
                        $dates[$matches[1]][] = $date;
                    }
                }

                continue;
            }

            if (str_starts_with($line, 'RRULE:')) {
                $lines .= $this->foldLine($this->formatUntil($line, $allDay, $timezone))."\r\n";
            }
        }

        foreach ($dates as $property => $values) {
            if ($values) {
                $lines .= $this->createDateLine($property, $values, $allDay, $timezone);
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
    private function formatUntil(string $line, bool $allDay, string $timezone): string
    {
        return (string) preg_replace_callback(
            '/UNTIL=([0-9T]+)Z?/',
            function (array $matches) use ($allDay, $timezone) {
                $until = $this->parseDateValue($matches[1]);
                if (!$until) {
                    return $matches[0];
                }

                if ($allDay) {
                    return 'UNTIL='.$until->format(self::DATE_FORMAT);
                }

                if (DateHelper::FLOATING_TIMEZONE === $timezone) {
                    return 'UNTIL='.$until->format(self::DATE_TIME_FORMAT);
                }

                $local = new Carbon($until->format('Y-m-d H:i:s'), 'UTC' === $timezone ? DateHelper::UTC : $timezone);

                return 'UNTIL='.$local->setTimezone(DateHelper::UTC)->format(self::DATE_TIME_FORMAT).'Z';
            },
            $line,
        );
    }

    /**
     * Reads a stored date or date-time value as the floating date-time it stands for.
     */
    private function parseDateValue(string $value): ?Carbon
    {
        $value = rtrim(trim($value), 'Z');

        $date = 8 === \strlen($value)
            ? Carbon::createFromFormat('!'.self::DATE_FORMAT, $value, DateHelper::UTC)
            : Carbon::createFromFormat(self::DATE_TIME_FORMAT, $value, DateHelper::UTC);

        return $date ?: null;
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
