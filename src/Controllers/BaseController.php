<?php

namespace Solspace\Calendar\Controllers;

use craft\web\Controller;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Services\CalendarsService;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\ExceptionsService;
use Solspace\Calendar\Services\SettingsService;

class BaseController extends Controller
{
    /**
     * @return CalendarsService
     */
    protected function getCalendarService(): CalendarsService
    {
        return Calendar::getInstance()->calendars;
    }

    /**
     * @return EventsService
     */
    protected function getEventsService(): EventsService
    {
        return Calendar::getInstance()->events;
    }

    /**
     * @return ExceptionsService
     */
    protected function getExceptionsService(): ExceptionsService
    {
        return Calendar::getInstance()->exceptions;
    }

    /**
     * @return SettingsService
     */
    protected function getSettingsService(): SettingsService
    {
        return Calendar::getInstance()->settings;
    }
}
