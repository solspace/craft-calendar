<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\helpers\ElementHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\CalendarPermissionHelper;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Records\SelectDateRecord;
use yii\web\HttpException;
use yii\web\Response;

class EventsApiController extends BaseController
{
    const EVENT_FIELD_NAME = 'calendarEvent';

    public $allowAnonymous = true;

    /**
     * Modifies an event.
     *
     * @throws HttpException
     * @throws \Solspace\Calendar\Library\Exceptions\DateHelperException
     * @throws \Throwable
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionModifyDate(): Response
    {
        $this->requirePostRequest();

        /**
         * @var Event $event
         * @var int   $deltaSeconds
         * @var bool  $isAllDay
         */
        list($event, $deltaSeconds, $isAllDay) = $this->validateAndReturnModificationData();

        $eventsService = $this->getEventsService();

        $wasAllDay = $event->allDay;
        $oldStartDate = $event->getStartDate()->copy();
        $startDate = $event->getStartDate();
        $startDate->addSeconds($deltaSeconds);

        $endDateDiff = $oldStartDate->diff($event->getEndDate());

        $endDate = $startDate->copy();
        $endDate->add($endDateDiff);

        $postedStartDateString = \Craft::$app->request->post('startDate');
        $postedStartDate = new Carbon($postedStartDateString, DateHelper::UTC);
        $originalOccurrenceDate = $postedStartDate->subSeconds($deltaSeconds);

        $isOriginalEvent = $originalOccurrenceDate->format('Y-m-d') === $event->getStartDate()->toDateString();

        // We update the event start and end dates ONLY if this isn' a "repeats on select dates" event
        // Or if it is and we're currently modifying the original event
        if ($isOriginalEvent || !$event->repeatsOnSelectDates()) {
            $event->startDate = $startDate;
            $event->endDate = $endDate;
            $event->allDay = $isAllDay;

            if ($wasAllDay && !$isAllDay) {
                $event->endDate = clone $startDate;
                $event->endDate->add(new \DateInterval('PT2H'));
            } elseif (!$wasAllDay && $isAllDay) {
                $event->startDate->setTime(0, 0, 0);
                $event->endDate = clone $event->startDate;
                $event->endDate->setTime(23, 59, 59);
            }
        } elseif (!$isOriginalEvent && $event->repeatsOnSelectDates()) {
            $event->startDate = $event->getStartDate();
            $event->startDate->setTime($startDate->format('H'), $startDate->format('i'), $startDate->format('s'));
            $event->endDate = $event->getStartDate()->copy();
            $event->endDate->add($endDateDiff);
        }

        if ($event->repeats()) {
            if ($event->repeatsOnSelectDates()) {
                if (!$isOriginalEvent) {
                    $selectDateRecords = SelectDateRecord::findAll(
                        [
                            'eventId' => $event->id,
                            'date' => $originalOccurrenceDate->format('Y-m-d'),
                        ]
                    );

                    foreach ($selectDateRecords as $selectDate) {
                        $date = new \DateTime($postedStartDateString);
                        $date->setTime(0, 0, 0);

                        $selectDate->date = $date;
                        $selectDate->save(false);
                    }
                }
            } else {
                $currentStartDate = $event->getStartDate();

                $diffInDays = DateHelper::carbonDiffInDays($oldStartDate, $currentStartDate);
                $diffInMonths = DateHelper::carbonDiffInMonths($oldStartDate, $currentStartDate);

                $daysInterval = new \DateInterval('P'.abs($diffInDays).'D');
                $daysInterval->invert = $diffInDays < 0 ? 1 : 0;

                if (0 !== $diffInDays) {
                    $untilDate = $event->getUntil();
                    if ($untilDate) {
                        $untilDate->add($daysInterval);
                        $event->until = $untilDate;
                    }

                    $eventsService->bumpRecurrenceRule($event, $diffInDays, $diffInMonths);

                    $exceptions = $this->getExceptionsService()->getExceptionsForEventId($event->id);
                    foreach ($exceptions as $exception) {
                        $date = new Carbon('today', DateHelper::UTC);
                        $date->setTimestamp($exception->date->getTimestamp());
                        $date->add($daysInterval);
                        $date->setTime(0, 0);

                        $this->getExceptionsService()->saveException($event, $date, $exception->id);
                    }
                }
            }
        }

        $eventsService->saveEvent($event);

        return $this->asJson('success');
    }

    /**
     * Modifies the duration of an event.
     *
     * @throws HttpException
     * @throws \Throwable
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionModifyDuration(): Response
    {
        $this->requirePostRequest();

        /**
         * @var Event         $event
         * @var \DateInterval $interval
         */
        list($event, $deltaSeconds) = $this->validateAndReturnModificationData();

        $event->getEndDate()->addSeconds($deltaSeconds);

        $this->getEventsService()->saveEvent($event);

        return $this->asJson('success');
    }

    /**
     * Quick-creates an event based on title and calendarID alone.
     *
     * @throws HttpException
     * @throws \Throwable
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionCreate(): Response
    {
        $this->requirePostRequest();

        $eventData = \Craft::$app->request->post('event');
        $startDate = \Craft::$app->request->post('startDate');
        $endDate = \Craft::$app->request->post('endDate');
        $isAllDay = \Craft::$app->request->post('allDay', false);
        $siteId = \Craft::$app->request->post('siteId', \Craft::$app->sites->currentSite->id);

        if (!isset($eventData['title']) || empty($eventData['title'])) {
            return $this->asErrorJson(Calendar::t('Event title is required'));
        }

        if (!isset($eventData['calendarId']) || empty($eventData['calendarId'])) {
            return $this->asErrorJson(Calendar::t('Calendar not specified'));
        }

        $calendar = Calendar::getInstance()->calendars->getCalendarById($eventData['calendarId']);

        if (!$calendar) {
            return $this->asErrorJson(Calendar::t('The specified calendar does not exist'));
        }

        // Check permissions for the calendar
        CalendarPermissionHelper::requireCalendarEditPermissions($calendar);

        $startDate = new Carbon($startDate, DateHelper::UTC);
        $endDate = new Carbon($endDate, DateHelper::UTC);

        if (!$startDate) {
            return $this->asErrorJson(Calendar::t('Event start date is required'));
        }

        if (!$endDate) {
            return $this->asErrorJson(Calendar::t('Event end date is required'));
        }

        if ($isAllDay) {
            $startDate->setTime(0, 0, 0);
            $endDate->setTime(23, 59, 59);
        }

        $event = Event::create($siteId, $calendar->id);
        $event->title = $eventData['title'];
        $event->slug = ElementHelper::createSlug($event->title ?? '');
        $event->enabled = true;
        $event->authorId = \Craft::$app->user->id;
        $event->postDate = new \DateTime();

        $event->startDate = $startDate;
        $event->endDate = $endDate;
        $event->allDay = $isAllDay;

        if (Calendar::getInstance()->events->saveEvent($event, false, true)) {
            return $this->asJson(['event' => $event]);
        }

        return $this->asErrorJson(Calendar::t('Could not save event'));
    }

    /**
     * Deletes an event.
     *
     * @throws HttpException
     * @throws \Throwable
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionDelete(): Response
    {
        $this->requirePostRequest();

        $eventId = \Craft::$app->request->post('eventId');
        $event = $this->getEventsService()->getEventById($eventId, null, true);

        if (!$event) {
            return $this->asErrorJson(Calendar::t('Event could not be found'));
        }

        CalendarPermissionHelper::requireCalendarEditPermissions($event->getCalendar());

        if (Calendar::getInstance()->events->deleteEventById($eventId)) {
            return $this->asJson('success');
        }

        return $this->asErrorJson(Calendar::t('Couldn’t delete event.'));
    }

    /**
     * Adds an exception to a recurring event.
     *
     * @throws HttpException
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionDeleteOccurrence(): Response
    {
        $this->requirePostRequest();

        $eventId = \Craft::$app->request->post('eventId');
        $date = \Craft::$app->request->post('date');

        $event = Calendar::getInstance()->events->getEventById($eventId);

        if (!$event) {
            return $this->asErrorJson(Calendar::t('Event could not be found'));
        }

        CalendarPermissionHelper::requireCalendarEditPermissions($event->getCalendar());

		$date = Carbon::parse($date, 'UTC');
	    $date = $date->startOfDay();

        if ($event->repeatsOnSelectDates()) {
            Calendar::getInstance()->selectDates->removeDate($event, $date);
        } else {
            Calendar::getInstance()->exceptions->saveException($event, $date);
        }

        return $this->asJson('success');
    }

	/**
	 * https://github.com/solspace/craft-calendar/issues/122.
	 *
	 * Adds the first occurrence date to the list of select dates
	 *
	 * @return Response
	 */
    public function actionFirstOccurrenceDate(): Response
    {
	    $this->requirePostRequest();

	    $eventId = \Craft::$app->request->post('eventId');

	    $event = Calendar::getInstance()->events->getEventById($eventId, null, true);

	    if (! $event) {
		    return $this->asErrorJson([
			    'success' => false,
			    'event' => Calendar::t('Event could not be found'),
		    ]);
	    }

	    $event->selectDates = Calendar::getInstance()->events->addFirstOccurrenceDate($event->selectDates);

	    return $this->asJson([
	        'success' => true,
	        'event' => $event,
	    ]);
    }

    /**
     * @throws HttpException
     */
    private function validateAndReturnModificationData(): array
    {
        $eventId = (int) \Craft::$app->request->post('eventId');
        $siteId = (int) \Craft::$app->request->post('siteId');
        $isAllDay = 'true' === \Craft::$app->request->post('isAllDay');
        $deltaSeconds = \Craft::$app->request->post('deltaSeconds');

        $event = $this->getEventsService()->getEventById($eventId, $siteId, true);

        if ($event) {
            CalendarPermissionHelper::requireCalendarEditPermissions($event->getCalendar());

            return [$event, $deltaSeconds, $isAllDay];
        }

        throw new HttpException(sprintf('No event with ID [%d] found', $eventId));
    }
}
