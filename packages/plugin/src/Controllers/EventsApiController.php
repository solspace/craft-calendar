<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\base\Element;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Library\RRule\RecurringEventMutationHelper;
use Solspace\Calendar\Transformers\FullCalTransformer;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class EventsApiController extends BaseController
{
    public const EVENT_FIELD_NAME = 'calendarEvent';

    private const SCOPE_OCCURRENCE = 'occurrence';
    private const SCOPE_SERIES = 'series';

    public array|bool|int $allowAnonymous = true;

    public function actionSave(): ?Response
    {
        $this->requirePostRequest();

        $request = \Craft::$app->request;
        $eventId = (int) $request->getBodyParam('eventId');
        $siteId = $this->parseSiteId($request->getBodyParam('siteId'));
        $calendarId = (int) $request->getBodyParam('calendarId');

        if ($eventId) {
            $event = $this->getEventsService()->getEventById($eventId, $siteId, true);
            if (!$event) {
                throw new NotFoundHttpException(Calendar::t('Event could not be found'));
            }
        } else {
            $event = Event::create(
                $siteId ?? \Craft::$app->sites->currentSite->id,
                $calendarId ?: Calendar::getInstance()->calendars->getFirstCalendarId(),
            );
            $event->setScenario(Element::SCENARIO_LIVE);
        }

        if ($calendarId) {
            $event->calendarId = $calendarId;
        }

        PermissionHelper::requireCalendarEditPermissions($event->getCalendar());

        $event->title = (string) $request->getBodyParam('title', $event->title);
        $slug = $request->getBodyParam('slug');
        if (null !== $slug && '' !== $slug) {
            $event->slug = $slug;
        }
        $event->setFieldValuesFromRequest('fields');

        if (!$this->getEventsService()->saveEvent($event)) {
            $message = implode(' ', $event->getErrorSummary(true)) ?: Calendar::t('Could not save event');

            if ($request->getAcceptsJson()) {
                return $this->asFailure($message);
            }

            \Craft::$app->session->setError($message);
            \Craft::$app->urlManager->setRouteParams([
                'event' => $event,
                'errors' => $event->getErrors(),
            ]);

            return null;
        }

        if ($request->getAcceptsJson()) {
            $transformer = new FullCalTransformer();

            return $this->asJson([
                'success' => true,
                'event' => $transformer->fromElement($event),
            ]);
        }

        \Craft::$app->session->setNotice(Calendar::t('Event saved.'));
        \Craft::$app->session->setFlash('calendar_event_saved', true);

        return $this->redirectToPostedUrl($event);
    }

    public function actionMove(): Response
    {
        $this->requirePostRequest();

        $request = \Craft::$app->request;
        $eventId = (int) ($request->getBodyParam('eventId') ?? $request->getBodyParam('id'));
        if (!$eventId) {
            return $this->asFailure(Calendar::t('Event ID is required'));
        }

        $siteId = $this->parseSiteId($request->getBodyParam('siteId'));
        $event = $this->getEventsService()->getEventById($eventId, $siteId, true);
        if (!$event) {
            return $this->asFailure(Calendar::t('Event could not be found'));
        }

        PermissionHelper::requireCalendarEditPermissions($event->getCalendar());

        $scope = $this->parseScope($request->getBodyParam('scope'));
        $allDay = $this->parseBooleanBodyParam($request->getBodyParam('allDay', $event->isAllDay()));
        $start = $this->parseMoveDate($request->getBodyParam('start'), $allDay);
        $end = $this->parseMoveEndDate($request->getBodyParam('end'), $start, $allDay);

        if ($this->hasOccurrenceSchedule($event)) {
            $occurrenceDate = $this->parseRequiredOccurrenceDate(
                $request->getBodyParam('occurrenceDate'),
                $event->isAllDay(),
            );

            if (self::SCOPE_OCCURRENCE === $scope) {
                $this->getRecurringMutationHelper()->moveOccurrence($event, $occurrenceDate, $start, $allDay);
            } else {
                $this->getRecurringMutationHelper()->moveSeries($event, $occurrenceDate, $start, $allDay);
            }
        } else {
            $isEqualStart = $event->getStartDate()->equalTo($start);
            $isEqualEnd = $event->getEndDate()->equalTo($end);
            $isEqualAllDay = $event->isAllDay() === $allDay;

            if ($isEqualStart && $isEqualEnd && $isEqualAllDay) {
                return $this->asJson(['success' => true]);
            }

            $event->startDate = $start;
            $event->endDate = $end;
            $event->allDay = $allDay;
        }

        return $this->saveEventResponse($event, Calendar::t('Could not save event'));
    }

    public function actionDelete(): Response
    {
        $this->requirePostRequest();

        $request = \Craft::$app->request;
        $eventId = (int) ($request->getBodyParam('eventId') ?? $request->getBodyParam('id'));
        if (!$eventId) {
            return $this->asFailure(Calendar::t('Event ID is required'));
        }

        $siteId = $this->parseSiteId($request->getBodyParam('siteId'));
        $event = $this->getEventsService()->getEventById($eventId, $siteId, true);
        if (!$event) {
            return $this->asFailure(Calendar::t('Event could not be found'));
        }

        PermissionHelper::requireCalendarEditPermissions($event->getCalendar());

        $scope = $this->parseScope($request->getBodyParam('scope'));
        if ($this->hasOccurrenceSchedule($event) && self::SCOPE_OCCURRENCE === $scope) {
            $occurrenceDate = $this->parseRequiredOccurrenceDate(
                $request->getBodyParam('occurrenceDate'),
                $event->isAllDay(),
            );

            $this->getRecurringMutationHelper()->deleteOccurrence($event, $occurrenceDate);

            return $this->saveEventResponse($event, Calendar::t('Couldn’t delete event.'));
        }

        if ($this->getEventsService()->deleteEventById($eventId)) {
            return $this->asJson(['success' => true]);
        }

        return $this->asFailure(Calendar::t('Couldn’t delete event.'));
    }

    public function actionResize(): Response
    {
        $this->requirePostRequest();

        $request = \Craft::$app->request;
        $eventId = (int) ($request->getBodyParam('eventId') ?? $request->getBodyParam('id'));
        if (!$eventId) {
            return $this->asFailure(Calendar::t('Event ID is required'));
        }

        $siteId = $this->parseSiteId($request->getBodyParam('siteId'));
        $event = $this->getEventsService()->getEventById($eventId, $siteId, true);
        if (!$event) {
            return $this->asFailure(Calendar::t('Event could not be found'));
        }

        PermissionHelper::requireCalendarEditPermissions($event->getCalendar());

        $allDay = $this->parseBooleanBodyParam($request->getBodyParam('allDay', $event->isAllDay()));
        $start = $this->parseMoveDate($request->getBodyParam('start'), $allDay);
        $end = $this->parseMoveEndDate($request->getBodyParam('end'), $start, $allDay);
        $startDeltaSeconds = $this->parseDeltaSeconds(
            $request->getBodyParam('startDeltaSeconds'),
            $request->getBodyParam('oldStart'),
            $request->getBodyParam('start'),
            $allDay,
        );
        $endDeltaSeconds = $this->parseDeltaSeconds(
            $request->getBodyParam('endDeltaSeconds'),
            $request->getBodyParam('oldEnd'),
            $request->getBodyParam('end'),
            $allDay,
        );

        if ($this->hasOccurrenceSchedule($event)) {
            $this->getRecurringMutationHelper()->resizeSeries(
                $event,
                $allDay,
                $startDeltaSeconds ?? 0,
                $endDeltaSeconds ?? 0,
            );
        } else {
            $event->startDate = $start;
            $event->endDate = $end;
            $event->allDay = $allDay;
        }

        return $this->saveEventResponse($event, Calendar::t('Could not save event'));
    }

    private function saveEventResponse(Event $event, string $fallbackMessage): Response
    {
        $event->disableRequestSyncOnSave();

        if ($this->getEventsService()->saveEvent($event)) {
            return $this->asJson(['success' => true]);
        }

        $summary = implode(' ', $event->getErrorSummary(true));

        return $this->asFailure($summary ?: $fallbackMessage);
    }

    private function getRecurringMutationHelper(): RecurringEventMutationHelper
    {
        return new RecurringEventMutationHelper();
    }

    private function hasOccurrenceSchedule(Event $event): bool
    {
        return null !== $event->getRRuleRFCString();
    }

    private function parseRequiredOccurrenceDate(mixed $value, bool $allDay): Carbon
    {
        return $this->parseMoveDate($value, $allDay);
    }

    private function parseMoveDate(mixed $value, bool $allDay): Carbon
    {
        if (null === $value || '' === $value) {
            throw new BadRequestHttpException(Calendar::t('Date value is required'));
        }

        try {
            $date = new Carbon((string) $value, DateHelper::UTC);
        } catch (\Throwable) {
            throw new BadRequestHttpException(
                Calendar::t('Date value is invalid "{date}"', ['date' => $value])
            );
        }

        if ($allDay) {
            $date->startOfDay();
        }

        return $date;
    }

    private function parseMoveEndDate(mixed $value, Carbon $start, bool $allDay): Carbon
    {
        if (!$value) {
            if ($allDay) {
                return $start->copy()->addDay();
            }

            $value = $start->copy()->addHour();
        }

        return $this->parseMoveDate($value, $allDay);
    }

    private function parseBooleanBodyParam(mixed $value): bool
    {
        if (\is_bool($value)) {
            return $value;
        }

        if (\is_string($value)) {
            return filter_var($value, \FILTER_VALIDATE_BOOLEAN);
        }

        return (bool) $value;
    }

    private function parseScope(mixed $value): string
    {
        return self::SCOPE_OCCURRENCE === $value ? self::SCOPE_OCCURRENCE : self::SCOPE_SERIES;
    }

    private function parseSiteId(mixed $value): int
    {
        if (null === $value || '' === (string) $value) {
            return \Craft::$app->sites->currentSite->id;
        }

        return (int) $value;
    }

    private function parseDeltaSeconds(
        mixed $value,
        mixed $oldDateValue,
        mixed $newDateValue,
        bool $allDay,
    ): ?int {
        if (null !== $value && '' !== (string) $value) {
            return (int) $value;
        }

        if (!$oldDateValue || !$newDateValue) {
            return null;
        }

        $oldDate = $this->parseMoveDate($oldDateValue, $allDay);
        $newDate = $this->parseMoveDate($newDateValue, $allDay);

        return $newDate->getTimestamp() - $oldDate->getTimestamp();
    }
}
