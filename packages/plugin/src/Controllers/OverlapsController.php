<?php

namespace Solspace\Calendar\Controllers;

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Services\OverlapService;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class OverlapsController extends BaseController
{
    public function actionPreview(): Response
    {
        $this->requireLogin();
        $this->requireCpRequest();
        $this->requirePostRequest();
        if (!$this->getSettingsService()->showOverlapWarnings()) {
            return $this->asJson(['count' => 0, 'events' => []]);
        }
        $request = \Craft::$app->getRequest();
        $siteId = $this->resolveEventSiteId($request->getBodyParam('siteId'));
        $site = \Craft::$app->getSites()->getSiteById($siteId);
        $user = static::currentUser();
        if (\Craft::$app->getIsMultiSite() && !$user->can("editSite:{$site->uid}")) {
            throw new ForbiddenHttpException('User not authorized to edit content for this site.');
        }
        $calendar = $this->resolveEventCalendar($request->getRequiredBodyParam('calendarId'), $siteId);
        $eventId = (int) $request->getBodyParam('eventId');
        if ($eventId) {
            $event = Event::find()->id($eventId)->siteId($siteId)->drafts(null)->provisionalDrafts(null)->status(null)->one();
            if (!$event) {
                throw new NotFoundHttpException(Calendar::t('Event could not be found'));
            }
            $this->getEventsService()->requireEventEditPermissions($event);
            if (($event->isProvisionalDraft && $event->creatorId !== $user->id) || !\Craft::$app->getElements()->canSave($event, $user)) {
                throw new ForbiddenHttpException('User not authorized to save this event.');
            }
            if ((int) $event->calendarId !== (int) $calendar->id) {
                $this->getEventsService()->requireEventCreatePermissions($calendar);
            }
            $event = clone $event;
            $event->calendarId = $calendar->id;
        } else {
            $this->getEventsService()->requireEventCreatePermissions($calendar);
            $event = Event::create($siteId, $calendar->id);
        }
        foreach (['start', 'end'] as $key) {
            $value = $request->getRequiredBodyParam($key);
            if (!\is_string($value) && !\is_int($value) && !\is_float($value)) {
                throw new BadRequestHttpException(Calendar::t('The event schedule could not be checked.'));
            }
        }
        if (null !== $request->getBodyParam('rrule') && !\is_string($request->getBodyParam('rrule'))) {
            throw new BadRequestHttpException(Calendar::t('The event schedule could not be checked.'));
        }

        try {
            $event->setScheduleFromRequest($request->getBodyParams());
            $event->startDate = DateHelper::parseFloatingCarbon($request->getRequiredBodyParam('start'));
            $event->endDate = DateHelper::parseFloatingCarbon($request->getRequiredBodyParam('end'));
            if (!$event->startDate || !$event->endDate || $event->endDate < $event->startDate || (!$event->allDay && $event->endDate == $event->startDate) || $event->startDate->diffInDays($event->endDate, true) > Event::SPAN_LIMIT_DAYS) {
                throw new \InvalidArgumentException();
            }
            $result = (new OverlapService())->forSchedule($event);
        } catch (\InvalidArgumentException $exception) {
            throw new BadRequestHttpException(Calendar::t('The event schedule could not be checked.'));
        }

        return $this->asJson($result);
    }
}
