<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\base\Element;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceProvider;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Export\ExportCalendarToIcs;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Transformers\FullCalTransformer;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use yii\web\ServerErrorHttpException;

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
        $request = \Craft::$app->request;

        $rangeStart = $request->getQueryParam('start');
        if ($rangeStart) {
            $rangeStart = new Carbon($rangeStart, DateHelper::UTC);
        }

        $rangeEnd = $request->getQueryParam('end');
        if ($rangeEnd) {
            $rangeEnd = new Carbon($rangeEnd, DateHelper::UTC);
        }

        $calendars = $request->getParam('calendars');
        $siteId = $request->getParam('siteId');
        $criteria = $request->getParam('criteria', []);
        if (!\is_array($criteria)) {
            $criteria = [];
        }

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

        return $this->asJson($transformer->fromList($occurrences));
    }

    public function actionCreateEvent(): Response
    {
        $request = \Craft::$app->getRequest();

        $siteId = \Craft::$app->sites->currentSite->id;
        $calendarId = Calendar::getInstance()->calendars->getFirstCalendarId();

        $event = Event::create($siteId, $calendarId);
        $event->setScenario(Element::SCENARIO_ESSENTIALS);

        PermissionHelper::requireCalendarEditPermissions($event->getCalendar());

        $start = $request->post('start');
        $end = $request->post('end');

        $event->startDate = Carbon::createFromTimestampUTC((int) $start);
        $event->endDate = Carbon::createFromTimestampUTC((int) $end);
        $event->timezone = DateHelper::UTC;
        $event->title = $request->post('title');
        $event->allDay = (bool) $request->post('allDay');

        $success = \Craft::$app->getElements()->saveElement($event);

        if (!$success) {
            throw new ServerErrorHttpException(Calendar::t('Couldn’t create event.'));
        }

        $transformer = new FullCalTransformer();

        return $this->asJson($transformer->fromElement($event));
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
