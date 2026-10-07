<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\base\Element;
use craft\errors\InvalidElementException;
use Solspace\Calendar\Bundles\Occurrences\RecurrenceId;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\RRule\RecurringEventMutationHelper;
use Solspace\Calendar\Services\OccurrencesService;
use Solspace\Calendar\Services\SeriesService;
use Solspace\Calendar\Transformers\FullCalTransformer;
use yii\base\InvalidArgumentException;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class EventsApiController extends BaseController
{
    public const EVENT_FIELD_NAME = 'calendarEvent';

    private const SCOPE_OCCURRENCE = 'occurrence';
    private const SCOPE_FOLLOWING = 'following';
    private const SCOPE_SERIES = 'series';

    public array|bool|int $allowAnonymous = true;

    public function actionSave(): ?Response
    {
        $this->requirePostRequest();

        $request = \Craft::$app->request;
        $eventId = (int) $request->getBodyParam('eventId');
        $siteId = $this->resolveEventSiteId($request->getBodyParam('siteId'));
        $calendarId = $request->getBodyParam('calendarId');

        if ($eventId) {
            $event = $this->getEventsService()->getEventById($eventId, $siteId, true);
            if (!$event) {
                throw new NotFoundHttpException(Calendar::t('Event could not be found'));
            }

            $this->getEventsService()->requireEventEditPermissions($event);

            if ($calendarId) {
                $calendar = $this->resolveEventCalendar($calendarId, $siteId);
                if ((int) $calendar->id !== (int) $event->calendarId) {
                    $this->getEventsService()->requireEventCreatePermissions($calendar);
                    $event->calendarId = $calendar->id;
                }
            }
        } else {
            $calendar = $this->resolveEventCalendar($calendarId, $siteId);
            $this->getEventsService()->requireEventCreatePermissions($calendar);

            $event = Event::create($siteId, $calendar->id);
            $event->setScenario(Element::SCENARIO_LIVE);
        }

        $event->title = (string) $request->getBodyParam('title', $event->title);
        $slug = $request->getBodyParam('slug');
        if (null !== $slug && '' !== $slug) {
            $event->slug = $slug;
        }
        $event->setScheduleFromRequest($request->getBodyParams());
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

        $event = $this->findEditableEvent();
        if ($event instanceof Response) {
            return $event;
        }

        $request = \Craft::$app->request;
        $scope = $this->parseScope($request->getBodyParam('scope'));
        $allDay = $this->parseBooleanBodyParam($request->getBodyParam('allDay', $event->isAllDay()));
        $start = $this->parseMoveDate($request->getBodyParam('start'), $allDay);
        $end = $this->parseMoveEndDate($request->getBodyParam('end'), $start, $allDay);

        if (!$this->hasOccurrenceSchedule($event)) {
            return $this->rescheduleEvent($event, $start, $end, $allDay);
        }

        $recurrenceId = $this->parseRequiredRecurrenceId();
        if (self::SCOPE_OCCURRENCE === $scope) {
            return $this->rescheduleOccurrence($event, $recurrenceId, $start, $end, $allDay);
        }

        // The series moves as far as the occurrence was dragged, which for one with its own times isn't from its recurrence ID
        $service = $this->getOccurrencesService();
        $draggedFrom = $service->describeOccurrence($event, $recurrenceId, $service->getOverride($event, $recurrenceId))['startDate'];

        return $this->changeSeriesResponse(
            $event,
            $scope,
            fn (Event $event) => $this->getRecurringMutationHelper()->moveSeries($event, $draggedFrom, $start, $allDay),
        );
    }

    public function actionDelete(): Response
    {
        $this->requirePostRequest();

        $event = $this->findEditableEvent();
        if ($event instanceof Response) {
            return $event;
        }

        $scope = $this->parseScope(\Craft::$app->request->getBodyParam('scope'));
        if ($this->hasOccurrenceSchedule($event) && self::SCOPE_SERIES !== $scope) {
            $recurrenceId = $this->parseRequiredRecurrenceId();

            return $this->occurrenceResponse(
                fn () => self::SCOPE_OCCURRENCE === $scope
                    ? $this->getOccurrencesService()->deleteOccurrence($event, $recurrenceId)
                    : $this->getSeriesService()->endAt($event, $recurrenceId),
                Calendar::t('Couldn’t delete event.'),
            );
        }

        if ($this->getEventsService()->deleteEventById($event->id)) {
            return $this->asJson(['success' => true]);
        }

        return $this->asFailure(Calendar::t('Couldn’t delete event.'));
    }

    public function actionResize(): Response
    {
        $this->requirePostRequest();

        $event = $this->findEditableEvent();
        if ($event instanceof Response) {
            return $event;
        }

        $request = \Craft::$app->request;
        $scope = $this->parseScope($request->getBodyParam('scope'));
        $allDay = $this->parseBooleanBodyParam($request->getBodyParam('allDay', $event->isAllDay()));
        $start = $this->parseMoveDate($request->getBodyParam('start'), $allDay);
        $end = $this->parseMoveEndDate($request->getBodyParam('end'), $start, $allDay);

        if (!$this->hasOccurrenceSchedule($event)) {
            return $this->rescheduleEvent($event, $start, $end, $allDay);
        }

        if (self::SCOPE_OCCURRENCE === $scope) {
            return $this->rescheduleOccurrence($event, $this->parseRequiredRecurrenceId(), $start, $end, $allDay);
        }

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

        return $this->changeSeriesResponse(
            $event,
            $scope,
            fn (Event $event) => $this->getRecurringMutationHelper()->resizeSeries(
                $event,
                $allDay,
                $startDeltaSeconds ?? 0,
                $endDeltaSeconds ?? 0,
            ),
        );
    }

    /**
     * Cancels one occurrence, or restores it when `cancelled` is false. Cancelled occurrences stay listed.
     */
    public function actionCancel(): Response
    {
        $this->requirePostRequest();

        $event = $this->findEditableEvent();
        if ($event instanceof Response) {
            return $event;
        }

        $recurrenceId = $this->parseRequiredRecurrenceId();
        $cancelled = $this->parseBooleanBodyParam(\Craft::$app->request->getBodyParam('cancelled', true));

        return $this->occurrenceResponse(
            fn () => $cancelled
                ? $this->getOccurrencesService()->cancel($event, $recurrenceId)
                : $this->getOccurrencesService()->uncancel($event, $recurrenceId),
            Calendar::t('Could not save event'),
        );
    }

    /**
     * Starts "Edit this and following": a draft of the event from the occurrence onward, which splits
     * the event there when it's applied. Responds with the URL to edit it at. From the first occurrence,
     * that's the event itself.
     */
    public function actionEditFollowing(): Response
    {
        $this->requirePostRequest();
        $this->requireLogin();

        $event = $this->findEditableEvent();
        if ($event instanceof Response) {
            return $event;
        }

        try {
            $draft = $this->getSeriesService()->createSplitDraft(
                $event,
                $this->parseRequiredRecurrenceId(),
                (int) \Craft::$app->getUser()->getId(),
            );
        } catch (InvalidArgumentException) {
            return $this->asFailure(Calendar::t('Occurrence could not be found'));
        }

        return $this->asJson(['success' => true, 'url' => ($draft ?? $event)->getCpEditUrl()]);
    }

    /**
     * The event the request is about, if the user may edit it, or the failure response to send.
     */
    private function findEditableEvent(): Event|Response
    {
        $request = \Craft::$app->request;
        $eventId = (int) ($request->getBodyParam('eventId') ?? $request->getBodyParam('id'));
        if (!$eventId) {
            return $this->asFailure(Calendar::t('Event ID is required'));
        }

        $siteId = $this->resolveEventSiteId($request->getBodyParam('siteId'));
        $event = $this->getEventsService()->getEventById($eventId, $siteId, true);
        if (!$event) {
            return $this->asFailure(Calendar::t('Event could not be found'));
        }

        $this->getEventsService()->requireEventEditPermissions($event);

        return $event;
    }

    private function rescheduleEvent(Event $event, Carbon $start, Carbon $end, bool $allDay): Response
    {
        if ($event->getStartDate()->equalTo($start) && $event->getEndDate()->equalTo($end) && $event->isAllDay() === $allDay) {
            return $this->asJson(['success' => true]);
        }

        $event->startDate = $start;
        $event->endDate = $end;
        $event->allDay = $allDay;

        return $this->saveEventResponse($event, Calendar::t('Could not save event'));
    }

    private function rescheduleOccurrence(Event $event, Carbon $recurrenceId, Carbon $start, Carbon $end, bool $allDay): Response
    {
        return $this->occurrenceResponse(
            fn () => $this->getOccurrencesService()->reschedule($event, $recurrenceId, $start, $end, $allDay),
            Calendar::t('Could not save event'),
        );
    }

    private function occurrenceResponse(callable $change, string $fallbackMessage): Response
    {
        try {
            $result = $change();
        } catch (InvalidElementException $exception) {
            return $this->asFailure($exception->getMessage() ?: $fallbackMessage);
        } catch (InvalidArgumentException) {
            return $this->asFailure(Calendar::t('Occurrence could not be found'));
        }

        return false === $result ? $this->asFailure($fallbackMessage) : $this->asJson(['success' => true]);
    }

    /**
     * Changes the whole series, or the event from the occurrence onward, splitting off the occurrences before it.
     *
     * @param callable(Event): void $change
     */
    private function changeSeriesResponse(Event $event, string $scope, callable $change): Response
    {
        if (self::SCOPE_FOLLOWING === $scope) {
            $recurrenceId = $this->parseRequiredRecurrenceId();

            return $this->occurrenceResponse(
                fn () => $this->getSeriesService()->split($event, $recurrenceId, $change),
                Calendar::t('Could not save event'),
            );
        }

        $change($event);

        return $this->saveEventResponse($event, Calendar::t('Could not save event'));
    }

    private function saveEventResponse(Event $event, string $fallbackMessage): Response
    {
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

    private function getOccurrencesService(): OccurrencesService
    {
        return Calendar::getInstance()->occurrences;
    }

    private function getSeriesService(): SeriesService
    {
        return Calendar::getInstance()->series;
    }

    private function hasOccurrenceSchedule(Event $event): bool
    {
        return null !== $event->getRRuleRFCString();
    }

    /**
     * `occurrenceDate` is the earlier name. Demo templates installed from 6.0 pre-releases still send it.
     */
    private function parseRequiredRecurrenceId(): Carbon
    {
        $request = \Craft::$app->request;
        $value = $request->getBodyParam('recurrenceId') ?? $request->getBodyParam('occurrenceDate');

        $recurrenceId = RecurrenceId::normalize($value);
        if (null === $recurrenceId) {
            throw new BadRequestHttpException(Calendar::t('Date value is invalid "{date}"', ['date' => \is_scalar($value) ? $value : '']));
        }

        return RecurrenceId::toCarbon($recurrenceId);
    }

    private function parseMoveDate(mixed $value, bool $allDay): Carbon
    {
        if (null === $value || '' === $value) {
            throw new BadRequestHttpException(Calendar::t('Date value is required'));
        }

        try {
            $date = DateHelper::parseFloatingCarbon($value);
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

    /**
     * FullCalendar sends all-day ends as the day after the last day, while events store the end of the last day.
     */
    private function parseMoveEndDate(mixed $value, Carbon $start, bool $allDay): Carbon
    {
        if (!$value) {
            return $allDay ? DateHelper::allDayEnd($start) : $start->copy()->addHour();
        }

        $end = $this->parseMoveDate($value, $allDay);

        return $allDay ? DateHelper::allDayEndFromExclusive($start, $end) : $end;
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
        return \in_array($value, [self::SCOPE_OCCURRENCE, self::SCOPE_FOLLOWING], true) ? $value : self::SCOPE_SERIES;
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
