<?php

namespace Solspace\Calendar\Controllers;

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\DataObjects\EventListOptions;
use Solspace\Calendar\Library\Events\EventList;
use Solspace\Calendar\Library\Export\ExportCalendarToIcs;

class ApiController extends BaseController
{
    protected $allowAnonymous = true;

    /**
     * @return null
     */
    public function actionIcs()
    {
        $icsHash = \Craft::$app->request->getSegment(5);
        $icsHash = str_replace('.ics', '', $icsHash);

        $calendarService = Calendar::getInstance()->calendars;
        $eventsService   = Calendar::getInstance()->events;

        $calendar = $calendarService->getCalendarByIcsHash($icsHash);

        if (!$calendar) {
            $eventQuery = Event::find();
            $eventQuery->setLoadOccurrences(false);
        } else {
            $eventQuery = $eventsService->getEventQuery(
                [
                    'calendarId'      => $calendar->id,
                    'loadOccurrences' => false,
                ]
            );
        }

        $exporter = new ExportCalendarToIcs($eventQuery);

        header('Content-type: text/calendar; charset=utf-8');

        echo $exporter->output();
        exit();
    }
}
