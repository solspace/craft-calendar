<?php

namespace Solspace\Calendar\Controllers;

use craft\web\Controller;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\CalendarSitesService;
use Solspace\Calendar\Services\CalendarsService;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\ExceptionsService;
use Solspace\Calendar\Services\SettingsService;
use yii\web\BadRequestHttpException;

class BaseController extends Controller
{
    protected function getCalendarService(): CalendarsService
    {
        return Calendar::getInstance()->calendars;
    }

    protected function getCalendarSitesService(): CalendarSitesService
    {
        return Calendar::getInstance()->calendarSites;
    }

    protected function getEventsService(): EventsService
    {
        return Calendar::getInstance()->events;
    }

    protected function getExceptionsService(): ExceptionsService
    {
        return Calendar::getInstance()->exceptions;
    }

    protected function getSettingsService(): SettingsService
    {
        return Calendar::getInstance()->settings;
    }

    protected function resolveEventSiteId(mixed $siteId): int
    {
        if (!$siteId) {
            return \Craft::$app->sites->currentSite->id;
        }

        $siteId = filter_var($siteId, \FILTER_VALIDATE_INT, [
            'options' => ['min_range' => 1],
        ]);

        if (false === $siteId) {
            throw new BadRequestHttpException(Calendar::t('Site ID is invalid'));
        }

        if (!\Craft::$app->sites->getSiteById($siteId)) {
            throw new BadRequestHttpException(Calendar::t(
                'Site with ID "{id}" could not be found',
                ['id' => $siteId],
            ));
        }

        return $siteId;
    }

    protected function resolveEventCalendar(mixed $calendarId, int $siteId): CalendarModel
    {
        if (!$calendarId) {
            foreach ($this->getCalendarService()->getAllAllowedCalendars() as $calendar) {
                if ($calendar->getSiteSettingsForSite($siteId)) {
                    return $calendar;
                }
            }

            throw new BadRequestHttpException(Calendar::t('No calendars are available for the selected site'));
        }

        $calendarId = filter_var($calendarId, \FILTER_VALIDATE_INT, [
            'options' => ['min_range' => 1],
        ]);

        if (false === $calendarId) {
            throw new BadRequestHttpException(Calendar::t('Calendar ID is invalid'));
        }

        $calendar = $this->getCalendarService()->getCalendarById($calendarId);
        if (!$calendar) {
            throw new BadRequestHttpException(Calendar::t(
                'Calendar with ID "{id}" could not be found',
                ['id' => $calendarId],
            ));
        }

        if (!$calendar->getSiteSettingsForSite($siteId)) {
            throw new BadRequestHttpException(Calendar::t(
                'Calendar "{calendar}" does not support the selected site',
                ['calendar' => $calendar->name],
            ));
        }

        return $calendar;
    }
}
