<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceProvider;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Export\ExportCalendarToIcs;
use Solspace\Calendar\Transformers\FullCalTransformer;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class ApiController extends BaseController
{
    protected array|bool|int $allowAnonymous = ['ics'];

    public function __construct(
        $id,
        $module,
        $config,
        private OccurrenceProvider $occurrenceProvider,
    ) {
        parent::__construct($id, $module, $config);
    }

    public function actionEvents(): Response
    {
        $rangeStart = \Craft::$app->request->getQueryParam('start');
        $rangeStart = $rangeStart ? new Carbon($rangeStart) : null;

        $rangeEnd = \Craft::$app->request->getQueryParam('end');
        $rangeEnd = $rangeEnd ? new Carbon($rangeEnd) : null;

        $calendars = \Craft::$app->request->post('calendars');
        $siteId = \Craft::$app->request->post('siteId');
        $criteria = \Craft::$app->request->post('criteria', []);

        $criteria = array_merge([
            'rangeStart' => $rangeStart,
            'rangeEnd' => $rangeEnd,
        ], $criteria);

        if ($calendars) {
            // calendars may be form array or comma-separated values
            if (\is_array($calendars)) {
                $criteria['calendarId'] = $calendars;
            } elseif ('*' !== $calendars) {
                $criteria['calendarId'] = explode(',', $calendars);
            }
        } elseif (null !== $calendars) {
            $criteria['calendarId'] = -1;
        }

        if (\Craft::$app->getIsMultiSite()) {
            $criteria['siteId'] = $siteId ?: \Craft::$app->sites->currentSite->id;
        }

        // Check settings if disabled events should be shown
        if ($this->getSettingsService()->showDisabledEvents()) {
            $criteria['status'] = null;
        }

        $query = $this->occurrenceProvider->createQuery($criteria);
        $occurrences = $this->occurrenceProvider->getOccurrences($query);

        $transformer = new FullCalTransformer();

        return $this->asJson(array_map([$transformer, 'fromModel'], $occurrences));
    }

    /**
     * @throws NotFoundHttpException
     */
    public function actionIcs(): void
    {
        Calendar::getInstance()->requirePro();

        $site = \Craft::$app->request->get('site', null);
        $icsHash = \Craft::$app->request->get('hash', '');
        $icsHash = str_replace('.ics', '', $icsHash);

        $calendar = Calendar::getInstance()->calendars->getCalendarByIcsHash($icsHash);
        if (!$calendar) {
            throw new NotFoundHttpException('Page does not exist');
        }

        $eventQuery = Event::find()
            ->setCalendarId($calendar->id)
            ->status(null)
            ->site($site)
        ;

        $exporter = new ExportCalendarToIcs($eventQuery);
        $exportString = $exporter->output();

        header('Content-type: text/calendar; charset=utf-8');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: '.\strlen($exportString));

        echo $exportString;

        exit;
    }
}
