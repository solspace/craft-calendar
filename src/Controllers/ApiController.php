<?php

namespace Solspace\Calendar\Controllers;

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Export\ExportCalendarToIcs;
use yii\web\NotFoundHttpException;

class ApiController extends BaseController
{
    protected $allowAnonymous = ['actionIcs'];

    /**
     * @return null
     * @throws NotFoundHttpException
     */
    public function actionIcs()
    {
        $icsHash = \Craft::$app->request->get('hash', '');
        $icsHash = str_replace('.ics', '', $icsHash);

        $calendar = Calendar::getInstance()->calendars->getCalendarByIcsHash($icsHash);
        if (!$calendar) {
            throw new NotFoundHttpException('Page does not exist');
        }

        $eventQuery = Event::find()
            ->setLoadOccurrences(false)
            ->setCalendarId($calendar->id);

        $exporter = new ExportCalendarToIcs($eventQuery);

        header('Content-type: text/calendar; charset=utf-8');

        echo $exporter->output();
        exit();
    }
}
