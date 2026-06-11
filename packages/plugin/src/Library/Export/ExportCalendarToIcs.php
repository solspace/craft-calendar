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
        $eventId = $event->getId();
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
        $uidHash = md5($eventId.$title.$description.$date->timestamp);

        $exportString .= "BEGIN:VEVENT\r\n";
        $exportString .= \sprintf("UID:%s@solspace.com\r\n", $uidHash);
        $exportString .= \sprintf("DTSTAMP:%s\r\n", $this->now->format(self::DATE_TIME_FORMAT));

        if ($description) {
            $exportString .= \sprintf("DESCRIPTION:%s\r\n", $this->prepareString($this->htmlToText($description)));
        }
        if ($location) {
            $exportString .= \sprintf("LOCATION:%s\r\n", $this->prepareString($this->htmlToText($location)));
        }

        if ($event->isAllDay()) {
            $exportString .= \sprintf("DTSTART;VALUE=DATE:%s\r\n", $startDate->format(self::DATE_FORMAT));
            $exportString .= \sprintf(
                "DTEND;VALUE=DATE:%s\r\n",
                $endDate->copy()->addDay()->format(self::DATE_FORMAT)
            );
        } elseif ('UTC' === $timezone) {
            $exportString .= \sprintf("DTSTART:%sZ\r\n", $startDate->format(self::DATE_TIME_FORMAT));
            $exportString .= \sprintf("DTEND:%sZ\r\n", $endDate->format(self::DATE_TIME_FORMAT));
        } elseif (DateHelper::FLOATING_TIMEZONE === $timezone) {
            $exportString .= \sprintf("DTSTART:%s\r\n", $startDate->format(self::DATE_TIME_FORMAT));
            $exportString .= \sprintf("DTEND:%s\r\n", $endDate->format(self::DATE_TIME_FORMAT));
        } else {
            $exportString .= \sprintf("DTSTART;TZID=%s:%s\r\n", $timezone, $startDate->format(self::DATE_TIME_FORMAT));
            $exportString .= \sprintf("DTEND;TZID=%s:%s\r\n", $timezone, $endDate->format(self::DATE_TIME_FORMAT));
        }

        $rrule = $event->getRRule();
        if ($rrule) {
            $rrule = preg_replace('/\r\n?/', "\n", $rrule);
            $lines = array_filter(
                explode("\n", $rrule),
                static fn (string $line) => !str_starts_with($line, 'DTSTART:')
            );

            foreach ($lines as $line) {
                $exportString .= \sprintf("%s\r\n", trim($line));
            }
        }

        $exportString .= \sprintf("SUMMARY:%s\r\n", $this->prepareString($title));

        return $exportString."END:VEVENT\r\n";
    }

    private function htmlToText(mixed $value): string
    {
        $value = (string) $value;
        $value = (string) preg_replace('/<\s*br\s*\/?>/i', "\n", $value);
        $value = (string) preg_replace('/<\s*\/(p|div|li|h[1-6])\s*>/i', "\n", $value);

        return html_entity_decode(strip_tags($value), \ENT_QUOTES | \ENT_HTML5, 'UTF-8');
    }
}
