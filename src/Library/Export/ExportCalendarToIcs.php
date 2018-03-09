<?php

namespace Solspace\Calendar\Library\Export;

use Carbon\Carbon;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\DateHelper;

class ExportCalendarToIcs extends AbstractExportCalendar
{
    /** @var Carbon */
    private $now;

    /**
     * Collect events and parse them, and build a string
     * That will be exported to a file
     *
     * @return string
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
            $startDate    = $event->getStartDate();
            $exportString .= $this->combineExportString($event, $startDate);
            
            if ($event->getSelectDatesAsDates()) {
                foreach ($event->getSelectDatesAsDates() as $date) {
                    $dateCarbon = Carbon::createFromTimestampUTC($date->getTimestamp());
                    $dateCarbon->setTime(
                        $startDate->hour,
                        $startDate->minute,
                        $startDate->second
                    );
                    
                    $exportString .= $this->combineExportString($event, $dateCarbon);
                }
            }
        }

        return $exportString . 'END:VCALENDAR';
    }

    /**
     * Builds a VEVENT string and returns it
     *
     * @param Event  $event
     * @param Carbon $date
     *
     * @return string
     */
    private function combineExportString(Event $event, Carbon $date): string
    {
        $eventId      = $event->getId();
        $exportString = '';

        $dateDiff = $event->getStartDate()->diff($event->getEndDate());

        $startDate = $date->copy();
        $startDate->setTime(
            $event->getStartDate()->hour,
            $event->getStartDate()->minute,
            $event->getStartDate()->second
        );
        $endDate   = $startDate->copy()->add($dateDiff);

        $description = null;
        $descriptionFieldHandle = $event->getCalendar()->descriptionFieldHandle;
        if (isset($event->{$descriptionFieldHandle})) {
            $description = $event->{$descriptionFieldHandle};
        }

        $location = null;
        $locationFieldHandle = $event->getCalendar()->locationFieldHandle;
        if (isset($event->{$locationFieldHandle})) {
            $location = $event->{$locationFieldHandle};
        }
        $title   = $event->title;
        $uidHash = md5($eventId . $title . $description . $date->timestamp);

        $exportString .= "BEGIN:VEVENT\r\n";
        $exportString .= sprintf("UID:%s@solspace.com\r\n", $uidHash);
        $exportString .= sprintf("DTSTAMP:%s\r\n", $this->now->format(self::DATE_TIME_FORMAT));

        if ($description) {
            $exportString .= sprintf("DESCRIPTION:%s\r\n", $this->prepareString(strip_tags($description)));
        }
        if ($location) {
            $exportString .= sprintf("LOCATION:%s\r\n", $this->prepareString(strip_tags($location)));
        }

        if ($event->isAllDay()) {
            $exportString .= sprintf("DTSTART;VALUE=DATE:%s\r\n", $startDate->format(self::DATE_FORMAT));
            $exportString .= sprintf(
                "DTEND;VALUE=DATE:%s\r\n",
                $endDate->copy()->addDay()->format(self::DATE_FORMAT)
            );
        } else {
            $exportString .= sprintf("DTSTART:%s\r\n", $startDate->format(self::DATE_TIME_FORMAT));
            $exportString .= sprintf("DTEND:%s\r\n", $endDate->format(self::DATE_TIME_FORMAT));
        }

        $selectDates = $event->getSelectDates();
        if (empty($selectDates) && $event->isRepeating()) {
            $rrule = $event->getRRule();
            list ($dtstart, $rrule) = explode("\n", $rrule);

            $exportString .= sprintf("%s\r\n", $rrule);

            $exceptionDatesValues = array();
            foreach ($event->getExceptionDateStrings() as $exceptionDate) {
                $exceptionDate = new Carbon($exceptionDate, DateHelper::UTC);
                if ($event->isAllDay()) {
                    $exceptionDatesValues[] = $exceptionDate->format(self::DATE_FORMAT);
                } else {
                    $exceptionDate->setTime($startDate->hour, $startDate->minute, $startDate->second);
                    $exceptionDatesValues[] = $exceptionDate->format(self::DATE_TIME_FORMAT);
                }
            }

            $exceptionDates = implode(',', $exceptionDatesValues);
            if ($exceptionDates) {
                if ($event->isAllDay()) {
                    $exportString .= sprintf("EXDATE;VALUE=DATE:%s\r\n", $exceptionDates);
                } else {
                    $exportString .= sprintf("EXDATE:%s\r\n", $exceptionDates);
                }
            }
        }

        $exportString .= sprintf("SUMMARY:%s\r\n", $this->prepareString($title));

        return $exportString . "END:VEVENT\r\n";
    }
}
