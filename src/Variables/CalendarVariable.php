<?php

namespace Solspace\Calendar\Variables;

use Carbon\Carbon;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Library\Events\EventDay;
use Solspace\Calendar\Library\Events\EventHour;
use Solspace\Calendar\Library\Events\EventMonth;
use Solspace\Calendar\Library\Events\EventWeek;
use Solspace\Calendar\Library\Export\ExportCalendarToIcs;
use Solspace\Calendar\Library\RecurrenceHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\SettingsService;

class CalendarVariable
{
    /**
     * @return bool
     */
    public function showDemoTemplateBanner(): bool
    {
        return !$this->settings()->isDemoBannerDisabled();
    }

    /**
     * @param int|Event $event
     *
     * @return bool
     */
    public function canEditEvent($event): bool
    {
        return Calendar::getInstance()->events->canEditEvent($event);
    }

    /**
     * @param array|null $attributes
     *
     * @return EventQuery
     */
    public function events($attributes = null): EventQuery
    {
        return Event::buildQuery($attributes);
    }

    /**
     * Get a single event
     *
     * @param int|string $id
     * @param array      $options - [occurrenceDate, occurrenceRangeStart, occurrenceRangeEnd, occurrenceLimit]
     *
     * @return Event|null
     * @throws \yii\base\Exception
     */
    public function event($id, array $options = [])
    {
        if ($id === 'new') {
            return Event::create(\Craft::$app->sites->currentSite->id);
        }

        $targetDate = null;
        if (isset($options['targetDate'])) {
            $targetDate = new Carbon($options['targetDate'], DateHelper::UTC);
        }

        $siteId = null;
        if (isset($options['site'])) {
            $siteHandle = $options['site'];
            $site       = \Craft::$app->sites->getSiteByHandle($siteHandle);
            if ($site) {
                $siteId = $site->id;
            }
        }

        if (isset($options['siteId'])) {
            $siteId = (int) $options['siteId'];
        }

        $eventsService = Calendar::getInstance()->events;

        $event = null;
        if (is_numeric($id)) {
            $event = $eventsService->getEventById($id, $siteId);
        } else if (\is_string($id)) {
            $event = $eventsService->getEventBySlug($id, $siteId);
        }

        if ($event) {
            if ($targetDate) {
                $event = $event->cloneForDate($targetDate);
            }

            return $event;
        }

        return null;
    }

    /**
     * @param EventQuery $events
     */
    public function export(EventQuery $events)
    {
        $exporter = new ExportCalendarToIcs($events);
        $exporter->export();
    }

    /**
     * @param array|null $attributes
     *
     * @return CalendarModel[]
     * @throws \Solspace\Calendar\Library\Exceptions\AttributeException
     */
    public function calendars(array $attributes = null): array
    {
        return Calendar::getInstance()->calendars->getCalendars($attributes);
    }

    /**
     * Returns a SHA-1 hash of the latest modification date and calendar count
     *
     * @return string
     */
    public function calendarsCacheKey(): string
    {
        $calendarService = Calendar::getInstance()->calendars;

        return sha1($calendarService->getLatestModificationDate() . $calendarService->getAllCalendarCount());
    }

    /**
     * Returns a SHA-1 hash of the latest modification date and event count
     *
     * @return string
     */
    public function eventsCacheKey(): string
    {
        $eventsService = Calendar::getInstance()->events;

        return sha1($eventsService->getLatestModificationDate() . $eventsService->getAllEventCount());
    }

    /**
     * @param array|null $attributes
     *
     * @return CalendarModel|null
     * @throws \Solspace\Calendar\Library\Exceptions\AttributeException
     */
    public function calendar(array $attributes = null)
    {
        $calendarService = Calendar::getInstance()->calendars;
        $calendarList    = $calendarService->getCalendars($attributes);

        return reset($calendarList);
    }

    /**
     * @return array
     */
    public function allowedCalendars(): array
    {
        $calendarService = Calendar::getInstance()->calendars;

        return $calendarService->getAllAllowedCalendars();
    }

    /**
     * @param array $attributes
     *
     * @return EventMonth
     */
    public function month(array $attributes = null): EventMonth
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getMonth($attributes);
    }

    /**
     * @param array $attributes
     *
     * @return EventWeek
     */
    public function week(array $attributes = null): EventWeek
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getWeek($attributes);
    }

    /**
     * @param array $attributes
     *
     * @return EventDay
     */
    public function day(array $attributes = null): EventDay
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getDay($attributes);
    }

    /**
     * @param array $attributes
     *
     * @return EventHour
     */
    public function hour(array $attributes = null): EventHour
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getHour($attributes);
    }

    /**
     * @return SettingsService
     */
    public function settings(): SettingsService
    {
        return Calendar::getInstance()->settings;
    }

    /**
     * @return array
     */
    public function frequencyOptions(): array
    {
        return RecurrenceHelper::getFrequencyOptions();
    }

    /**
     * @return array
     */
    public function repeatsByOptions(): array
    {
        return RecurrenceHelper::getRepeatsByOptions();
    }

    /**
     * @return array
     */
    public function weekDaysShort(): array
    {
        return DateHelper::getWeekDaysShort();
    }

    /**
     * @return array
     */
    public function monthDays(): array
    {
        return DateHelper::getMonthDays();
    }

    /**
     * @return array
     */
    public function monthNames(): array
    {
        return DateHelper::getMonthNames();
    }
}
