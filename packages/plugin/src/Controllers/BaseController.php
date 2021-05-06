<?php

namespace Solspace\Calendar\Controllers;

use craft\web\Controller;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Services\CalendarSitesService;
use Solspace\Calendar\Services\CalendarsService;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\ExceptionsService;
use Solspace\Calendar\Services\SettingsService;

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
}
