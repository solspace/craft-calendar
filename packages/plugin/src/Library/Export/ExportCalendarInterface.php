<?php

namespace Solspace\Calendar\Library\Export;

use Solspace\Calendar\Elements\Db\EventQuery;

interface ExportCalendarInterface
{
    public const DATE_TIME_FORMAT = 'Ymd\THis';
    public const DATE_FORMAT = 'Ymd';

    /**
     * ExportCalendarInterface constructor.
     *
     * Must pass an array of events that will be exported
     */
    public function __construct(EventQuery $events);

    public function export(): void;

    public function output(): string;
}
