<?php

namespace Solspace\Calendar\Controllers;

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Export\ExportCalendarToIcs;
use yii\web\NotFoundHttpException;

class ApiController extends BaseController
{
    protected $allowAnonymous = ['ics'];

    /**
     * @throws NotFoundHttpException
     */
    public function actionIcs()
    {
        Calendar::getInstance()->requirePro();

        $site = \Craft::$app->request->get('site', '');
        $icsHash = \Craft::$app->request->get('hash', '');
        $icsHash = str_replace('.ics', '', $icsHash);

        $calendar = Calendar::getInstance()->calendars->getCalendarByIcsHash($icsHash);
        if (!$calendar) {
            throw new NotFoundHttpException('Page does not exist');
        }

        $eventQuery = Event::find()
            ->setLoadOccurrences(false)
            ->setCalendarId($calendar->id)
        ;

        if ($site) {
            $eventQuery->site($site);
        }

        $exporter = new ExportCalendarToIcs($eventQuery);
        $exportString = $exporter->output();

        header('Content-type: text/calendar; charset=utf-8');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: '.\strlen($exportString));

        echo $exportString;

        exit();
    }
}
