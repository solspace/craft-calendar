<?php

namespace Solspace\Calendar\Library\Export;

use Solspace\Calendar\Elements\Db\EventQuery;

interface ExportCalendarInterface
{
    const DATE_TIME_FORMAT = 'Ymd\THis';
    const DATE_FORMAT      = 'Ymd';

    /**
     * ExportCalendarInterface constructor.
     *
     * Must pass an array of events that will be exported
     *
     * @param EventQuery $events
     */
    public function __construct(EventQuery $events);

    /**
     * @return string
     */
    public function export();

    /**
     * @return string
     */
    public function output();
}
