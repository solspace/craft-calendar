<?php

namespace Solspace\Calendar\Library\Export;

use Carbon\Carbon;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;

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

        $exportString = "BEGIN:VCALENDAR\r\n";
        $exportString .= "PRODID:-//Solspace/Calendar//EN\r\n";
        $exportString .= "VERSION:2.0\r\n";
        $exportString .= "CALSCALE:GREGORIAN\r\n";

        $this->now = Carbon::now(DateHelper::UTC);

        /** @var Event $event */
        foreach ($events as $event) {
            $startDate = $event->getStartDate();
            $exportString .= $this->combineExportString($event, $startDate);
        }

        return $exportString.'END:VCALENDAR';
    }

    /**
     * Builds a VEVENT string and returns it.
     */
    private function combineExportString(Event $event, Carbon $date): string
    {
        $exportString = '';

        $timezone = $this->getOption('timezone', $event->getCalendar()->getIcsTimezone());
        $dateDiff = $event->getStartDate()->diff($event->getEndDate());

        $startDate = $date->copy();
        $startDate->setTime(
            $event->getStartDate()->hour,
            $event->getStartDate()->minute,
            $event->getStartDate()->second
        );
        $endDate = $startDate->copy()->add($dateDiff);

        $description = null;
        $descriptionFieldHandle = $event->getCalendar()->descriptionFieldHandle;
        if ($descriptionFieldHandle && isset($event->{$descriptionFieldHandle})) {
            $description = $event->{$descriptionFieldHandle};
        }

        $location = null;
        $locationFieldHandle = $event->getCalendar()->locationFieldHandle;
        if ($locationFieldHandle && isset($event->{$locationFieldHandle})) {
            $location = $event->{$locationFieldHandle};
        }
        $title = $event->title;

        $uid = $event->uid ?: $event->id.'@solspace.com';

        $exportString .= "BEGIN:VEVENT\r\n";
        $exportString .= $this->createLine('UID', $uid);
        $exportString .= $this->createLine('DTSTAMP', $this->formatUtcDateTime($this->now));
        $exportString .= $this->createLine('CREATED', $this->formatUtcDateTime($event->dateCreated));
        $exportString .= $this->createLine('LAST-MODIFIED', $this->formatUtcDateTime($event->dateUpdated));

        if ($description) {
            $exportString .= $this->createLine('DESCRIPTION', $this->prepareString($this->htmlToText($description)));
        }
        if ($location) {
            $exportString .= $this->createLine('LOCATION', $this->prepareString($this->htmlToText($location)));
        }

        $this->appendDateRange($exportString, $event, $startDate, $endDate, $timezone);

        $rdateStarts = [];
        $rrule = $event->getRRule();
        if ($rrule) {
            $rrule = preg_replace('/\r\n?/', "\n", $rrule);
            $lines = array_filter(
                explode("\n", $rrule),
                static fn (string $line) => !preg_match('/^DTSTART(?:[:;])/', $line)
            );

            foreach ($lines as $line) {
                $line = trim($line);

                if (str_starts_with($line, 'RDATE')) {
                    $rdateStarts = array_merge($rdateStarts, $this->parseRDateStarts($line, $event->isAllDay(), $timezone));

                    continue;
                }

                $exportString .= $this->foldLine($line)."\r\n";
            }
        }

        $exportString .= $this->createLine('SUMMARY', $this->prepareString($title));
        $exportString .= "END:VEVENT\r\n";

        foreach ($rdateStarts as $rdateStart) {
            if ($rdateStart->equalTo($startDate)) {
                continue;
            }

            $rdateEnd = $rdateStart->copy()->add($dateDiff);
            $exportString .= "BEGIN:VEVENT\r\n";
            $exportString .= $this->createLine('UID', $uid.'-rdate-'.$rdateStart->format(self::DATE_TIME_FORMAT));
            $exportString .= $this->createLine('DTSTAMP', $this->formatUtcDateTime($this->now));
            $exportString .= $this->createLine('CREATED', $this->formatUtcDateTime($event->dateCreated));
            $exportString .= $this->createLine('LAST-MODIFIED', $this->formatUtcDateTime($event->dateUpdated));

            if ($description) {
                $exportString .= $this->createLine('DESCRIPTION', $this->prepareString($this->htmlToText($description)));
            }
            if ($location) {
                $exportString .= $this->createLine('LOCATION', $this->prepareString($this->htmlToText($location)));
            }

            $this->appendDateRange($exportString, $event, $rdateStart, $rdateEnd, $timezone);
            $exportString .= $this->createLine('SUMMARY', $this->prepareString($title));
            $exportString .= "END:VEVENT\r\n";
        }

        return $exportString;
    }

    private function appendDateRange(string &$exportString, Event $event, Carbon $startDate, Carbon $endDate, string $timezone): void
    {
        if ($event->isAllDay()) {
            $exportString .= $this->createLine('DTSTART;VALUE=DATE', $startDate->format(self::DATE_FORMAT));
            $exportString .= $this->createLine('DTEND;VALUE=DATE', $endDate->format(self::DATE_FORMAT));
        } elseif ('UTC' === $timezone) {
            $exportString .= $this->createLine('DTSTART', $startDate->format(self::DATE_TIME_FORMAT).'Z');
            $exportString .= $this->createLine('DTEND', $endDate->format(self::DATE_TIME_FORMAT).'Z');
        } elseif (DateHelper::FLOATING_TIMEZONE === $timezone) {
            $exportString .= $this->createLine('DTSTART', $startDate->format(self::DATE_TIME_FORMAT));
            $exportString .= $this->createLine('DTEND', $endDate->format(self::DATE_TIME_FORMAT));
        } else {
            $exportString .= $this->createLine('DTSTART;TZID='.$timezone, $startDate->format(self::DATE_TIME_FORMAT));
            $exportString .= $this->createLine('DTEND;TZID='.$timezone, $endDate->format(self::DATE_TIME_FORMAT));
        }
    }

    private function parseRDateStarts(string $line, bool $allDay, string $timezone): array
    {
        [, $valueList] = array_pad(explode(':', $line, 2), 2, '');

        return array_values(
            array_filter(
                array_map(
                    fn (string $value) => $this->parseRDateStart(trim($value), $allDay, $timezone),
                    explode(',', $valueList),
                ),
            ),
        );
    }

    private function parseRDateStart(string $value, bool $allDay, string $timezone): ?Carbon
    {
        if ($allDay) {
            return Carbon::createFromFormat('Ymd', substr($value, 0, 8), DateHelper::UTC) ?: null;
        }

        $value = rtrim($value, 'Z');
        $timezone = DateHelper::FLOATING_TIMEZONE === $timezone ? DateHelper::UTC : $timezone;

        return Carbon::createFromFormat(self::DATE_TIME_FORMAT, $value, $timezone) ?: null;
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
