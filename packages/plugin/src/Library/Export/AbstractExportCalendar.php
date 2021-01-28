<?php

namespace Solspace\Calendar\Library\Export;

use Solspace\Calendar\Elements\Db\EventQuery;

abstract class AbstractExportCalendar implements ExportCalendarInterface
{
    /** @var EventQuery */
    private $eventQuery;

    /** @var array */
    private $options;

    final public function __construct(EventQuery $events, array $options = [])
    {
        $this->eventQuery = $events;
        $this->options = $options;
    }

    /**
     * Collects the exportable string and outputs it
     * Sets headers to file download and content-type to text/calendar.
     *
     * @return string
     */
    final public function export(bool $asFileUpload = true, bool $shouldExit = true)
    {
        $exportString = $this->prepareStringForExport();

        header('Content-Type: text/calendar; charset=utf-8');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: '.\strlen($exportString));

        if ($asFileUpload) {
            header('Content-Description: File Transfer');
            header('Content-Disposition: attachment; filename="'.time().'.ics"');
            header('Content-Transfer-Encoding: binary');
        }

        echo $exportString;

        if ($shouldExit) {
            exit();
        }
    }

    /**
     * Collects the exportable string and returns it.
     */
    final public function output(): string
    {
        return $this->prepareStringForExport();
    }

    /**
     * Collect events and parse them, and build a string
     * That will be exported to a file.
     */
    abstract protected function prepareStringForExport(): string;

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

    final protected function prepareString(string $string): string
    {
        $string = (string) preg_replace('/(\r\n|\r|\n)+/', ' ', $string);
        $string = (string) preg_replace('/([\,;])/', '\\\$1', $string);
        $string = (string) preg_replace('/^\h*\v+/m', '', $string);
        $string = chunk_split($string, 60, "\r\n ");

        return trim($string);
    }
}
