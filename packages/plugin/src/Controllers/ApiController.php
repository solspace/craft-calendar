<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\base\Element;
use craft\helpers\UrlHelper;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceProvider;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Export\ExportCalendarToIcs;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Services\OverlapService;
use Solspace\Calendar\Transformers\FullCalTransformer;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class ApiController extends BaseController
{
    /**
     * Filters a feed request can add to its own range, calendars and site.
     */
    private const FEED_CRITERIA = ['cancelled', 'search', 'relatedTo'];

    protected array|bool|int $allowAnonymous = ['ics'];

    public function __construct(
        $id,
        $module,
        $config,
        private OccurrenceProvider $occurrenceProvider,
    ) {
        parent::__construct($id, $module, $config);
    }

    public function actionCalendars(): Response
    {
        $calendars = array_map(
            static fn ($calendar) => [
                'id' => (int) $calendar->id,
                'title' => $calendar->name ?? '',
                'color' => [
                    'base' => $calendar->color ?? '',
                    'light' => $calendar->getLighterColor(),
                    'dark' => $calendar->getDarkerColor(),
                    'contrast' => $calendar->getContrastColor(),
                ],
                'description' => $calendar->description ?? '',
            ],
            $this->getCalendarService()->getAllAllowedCalendars(),
        );

        return $this->asJson(array_values($calendars));
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
        $criteria = \is_array($criteria) ? array_intersect_key($criteria, array_flip(self::FEED_CRITERIA)) : [];
        if (isset($criteria['cancelled'])) {
            $criteria['cancelled'] = filter_var($criteria['cancelled'], \FILTER_VALIDATE_BOOLEAN, \FILTER_NULL_ON_FAILURE);
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

        if ($request->getIsCpRequest()) {
            if (!$this->getSettingsService()->showCancelledEvents()) {
                $criteria['cancelled'] = false;
            }

            $allowed = array_keys($this->getCalendarService()->getAllAllowedCalendarTitles($siteId ?: \Craft::$app->sites->currentSite->id));
            $requested = $criteria['calendarId'] ?? $allowed;
            $criteria['calendarId'] = array_values(array_intersect($allowed, (array) $requested)) ?: -1;
        }

        $query = $this->occurrenceProvider->createQuery($criteria);
        $occurrences = $this->occurrenceProvider->getOccurrences($query);

        $transformer = new FullCalTransformer();

        $data = $transformer->fromList($occurrences);
        if ($this->getSettingsService()->showOverlapWarnings() && $request->getIsCpRequest()) {
            $conflicts = (new OverlapService())->forFeed($occurrences->getOccurrences(), $this->resolveEventSiteId($siteId));
            foreach ($data as &$item) {
                $item['overlaps'] = $conflicts[$item['id']] ?? ['count' => 0, 'events' => []];
            }
            unset($item);
        }

        return $this->asJson($data);
    }

    public function actionCreateEvent(): Response
    {
        return $this->createEvent();
    }

    public function actionPrepareEvent(): Response
    {
        $this->requirePostRequest();

        return $this->createEvent(asDraft: true);
    }

    public function actionIcs(): void
    {
        Calendar::getInstance()->requirePro();

        $site = \Craft::$app->request->get('site', null);
        $icsHash = \Craft::$app->request->get('hash', '');
        $icsHash = str_replace('.ics', '', $icsHash);

        $calendar = Calendar::getInstance()->calendars->getCalendarByIcsHash($icsHash);
        if (!$calendar) {
            throw new NotFoundHttpException(Calendar::t('Page does not exist'));
        }

        $eventQuery = Event::find()
            ->setCalendarId($calendar->id)
            ->site($site)
        ;

        $exporter = new ExportCalendarToIcs($eventQuery);
        $exportString = $exporter->output();

        header('Content-type: text/calendar; charset=utf-8');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: '.\strlen($exportString));
        header('Content-Disposition: attachment; filename="'.$calendar->handle.'-'.time().'.ics"');

        echo $exportString;

        exit;
    }

    private function createEvent(bool $asDraft = false): Response
    {
        $request = \Craft::$app->getRequest();

        $scenario = $asDraft ? Element::SCENARIO_ESSENTIALS : match ($request->headers->get('X-Scenario')) {
            'live' => Element::SCENARIO_LIVE,
            default => Element::SCENARIO_ESSENTIALS,
        };

        $siteId = $this->resolveEventSiteId($request->post('siteId'));
        $calendar = $this->resolveEventCalendar($request->post('calendarId'), $siteId);
        $refDate = new Carbon('now');

        $this->getEventsService()->requireEventCreatePermissions($calendar);

        $event = Event::create($siteId, $calendar->id);
        $event->setScenario($scenario);

        $start = $request->post('start');
        $end = $request->post('end');

        $event->startDate = Carbon::createFromTimestampUTC((int) $start);
        $event->endDate = Carbon::createFromTimestampUTC((int) $end);
        $event->timezone = $refDate?->timezone?->getName() ?? DateHelper::UTC;
        $event->title = $request->post('title');
        $event->allDay = (bool) $request->post('allDay');

        if ($event->allDay) {
            $event->endDate = DateHelper::allDayEndFromExclusive($event->startDate, $event->endDate);
        }

        $this->applyQuickCreateRecurrence($event, $request->getBodyParams());

        $details = $request->post('details');
        $validDetails = true;
        if (null !== $details) {
            if (!\is_array($details)) {
                throw new BadRequestHttpException(Calendar::t('Invalid event details.'));
            }

            // Resolve handles on the server; only the selected calendar's mapped text fields are writable.
            $mappedHandles = $calendar->getQuickCreateFieldHandles();
            foreach ($mappedHandles as $key => $handle) {
                if (!\array_key_exists($key, $details)) {
                    continue;
                }
                if (!\is_string($details[$key])) {
                    throw new BadRequestHttpException(Calendar::t('Invalid event details.'));
                }
                $event->setFieldValueFromRequest($handle, $details[$key]);
            }

            if ($mappedHandles && !$asDraft) {
                // Validate the popup fields fully without requiring unrelated fields in the full editor.
                $event->setScenario(Element::SCENARIO_LIVE);
                $validDetails = $event->validate(array_map(static fn ($handle) => 'field:'.$handle, array_values($mappedHandles)));
                $event->setScenario($scenario);
            }
        }

        // Draft handoff must enforce the same recurrence and calendar restrictions as creation.
        $validRecurrence = $event->validate(['rrule'], false);
        $success = $validDetails && $validRecurrence && ($asDraft
            ? \Craft::$app->getDrafts()->saveElementAsDraft(
                $event,
                \Craft::$app->getUser()->getIdentity()->id,
                markAsSaved: false,
            )
            : \Craft::$app->getElements()->saveElement($event));

        if (!$success) {
            $this->response->setStatusCode(400);

            return $this->asJson([
                'message' => Calendar::t('Could not save event'),
                'errors' => $event->getErrorSummary(true),
            ]);
        }

        if ($asDraft) {
            return $this->asJson(['url' => UrlHelper::urlWithParams($event->getCpEditUrl(), ['fresh' => 1])]);
        }

        $transformer = new FullCalTransformer();

        return $this->asJson($transformer->fromElement($event));
    }

    private function applyQuickCreateRecurrence(Event $event, array $values): void
    {
        $schedule = array_intersect_key($values, array_flip(['repeatType', 'repeatEndType', 'rrule', 'until']));
        foreach (['repeatType', 'repeatEndType', 'rrule'] as $key) {
            if (\array_key_exists($key, $schedule) && !\is_string($schedule[$key])) {
                throw new BadRequestHttpException(Calendar::t('Invalid repeating event settings.'));
            }
        }

        if (isset($schedule['until']) && !is_numeric($schedule['until'])) {
            throw new BadRequestHttpException(Calendar::t('Invalid repeating event settings.'));
        }

        $event->setScheduleFromRequest($schedule);
    }
}
