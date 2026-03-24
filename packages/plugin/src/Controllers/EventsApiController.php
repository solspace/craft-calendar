<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Library\RRule\RecurringEventMutationHelper;
use yii\web\BadRequestHttpException;
use yii\web\Response;

class EventsApiController extends BaseController
{
    public const EVENT_FIELD_NAME = 'calendarEvent';

    public array|bool|int $allowAnonymous = true;

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

        if ($event->isRepeating()) {
            $occurrenceDate = $this->parseRequiredOccurrenceDate(
                $request->getBodyParam('occurrenceDate'),
                $event->isAllDay(),
            );

            if ('occurrence' === $scope) {
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
        if ($event->isRepeating() && 'occurrence' === $scope) {
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

        if ($event->isRepeating()) {
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
        return 'occurrence' === $value ? 'occurrence' : 'series';
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
