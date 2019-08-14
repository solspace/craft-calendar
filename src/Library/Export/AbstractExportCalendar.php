<?php

namespace Solspace\Calendar\Library\Export;

use Solspace\Calendar\Elements\Db\EventQuery;

abstract class AbstractExportCalendar implements ExportCalendarInterface
{
    /** @var EventQuery */
    private $eventQuery;

    /** @var array */
    private $options;

    /**
     * @param EventQuery $events
     * @param array      $options
     */
    final public function __construct(EventQuery $events, array $options = [])
    {
        $this->eventQuery = $events;
        $this->options    = $options;
    }

    /**
     * Collects the exportable string and outputs it
     * Sets headers to file download and content-type to text/calendar
     *
     * @return string
     */
    final public function export()
    {
        $exportString = $this->prepareStringForExport();

        header('Content-Type: text/calendar; charset=utf-8');
        header('Content-Disposition: attachment; filename="' . time() . '.ics"');

        header('Content-Description: File Transfer');
        header('Content-Type: text/calendar; charset=utf-8');
        header('Content-Disposition: attachment; filename="' . time() . '.ics"');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . strlen($exportString));

        echo $exportString;
    }

    /**
     * Collects the exportable string and returns it
     *
     * @return string
     */
    final public function output(): string
    {
        return $this->prepareStringForExport();
    }

    /**
     * Collect events and parse them, and build a string
     * That will be exported to a file
     *
     * @return string
     */
    abstract protected function prepareStringForExport(): string;

    /**
     * @return EventQuery
     */
    final protected function getEventQuery(): EventQuery
    {
        return $this->eventQuery;
    }

    /**
     * @param string $key
     * @param mixed  $defaultValue
     *
     * @return mixed
     */
    final protected function getOption($key, $defaultValue = null)
    {
        return $this->options[$key] ?? $defaultValue;
    }

    /**
     * @param string $string
     *
     * @return string
     */
    final protected function prepareString(string $string): string
    {
        $string = (string) preg_replace('/(\r\n|\r|\n)+/', ' ', $string);
        $string = (string) preg_replace('/([\,;])/', '\\\$1', $string);
        $string = (string) preg_replace('/^\h*\v+/m', '', $string);
        $string = chunk_split($string, 60, "\r\n ");
        $string = trim($string);

        return $string;
    }
}
