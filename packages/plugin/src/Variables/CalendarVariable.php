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
use Solspace\Calendar\Services\FormatsService;
use Solspace\Calendar\Services\SettingsService;

class CalendarVariable
{
    public function showDemoTemplateBanner(): bool
    {
        if (!$this->settings()->isAdminChangesAllowed()) {
            return false;
        }

        return !$this->settings()->isDemoBannerDisabled();
    }

    /**
     * @param Event|int $event
     */
    public function canEditEvent($event): bool
    {
        return Calendar::getInstance()->events->canEditEvent($event);
    }

    public function isPro(): bool
    {
        return Calendar::getInstance()->isPro();
    }

    public function isLite(): bool
    {
        return Calendar::getInstance()->isLite();
    }

    public function name(): string
    {
        return Calendar::getInstance()->name;
    }

    /**
     * @param null|array $attributes
     */
    public function events($attributes = null): EventQuery
    {
        return Event::buildQuery($attributes);
    }

    public function formats(): FormatsService
    {
        return Calendar::getInstance()->formats;
    }

    /**
     * Get a single event.
     *
     * @param int|string $id
     * @param array      $options - [occurrenceDate, occurrenceRangeStart, occurrenceRangeEnd, occurrenceLimit]
     *
     * @throws \yii\base\Exception
     *
     * @return null|Event
     */
    public function event($id, array $options = [])
    {
        if ('new' === $id) {
            return Event::create(\Craft::$app->sites->currentSite->id);
        }

        $targetDate = null;
        if (isset($options['targetDate'])) {
            $targetDate = new Carbon($options['targetDate'], DateHelper::UTC);
        } elseif (isset($options['occurrenceDate'])) {
            $targetDate = new Carbon($options['occurrenceDate'], DateHelper::UTC);
        }

        $siteId = null;
        if (isset($options['site'])) {
            $siteHandle = $options['site'];
            $site = \Craft::$app->sites->getSiteByHandle($siteHandle);
            if ($site) {
                $siteId = $site->id;
            }
        }

        if (isset($options['siteId'])) {
            $siteId = (int) $options['siteId'];
        }

        $eventsService = Calendar::getInstance()->events;
        $includeDisabled = \array_key_exists('status', $options) && null === $options['status'];

        $event = null;
        if (is_numeric($id)) {
            $event = $eventsService->getEventById($id, $siteId, $includeDisabled);
        } elseif (\is_string($id)) {
            $event = $eventsService->getEventBySlug($id, $siteId, $includeDisabled);
        }

        if ($event) {
            if ($targetDate) {
                $event = $event->cloneForDate($targetDate);
            }

            return $event;
        }

        return null;
    }

    public function isExportEnabled(): bool
    {
        return Calendar::getInstance()->isPro();
    }

    /**
     * @return string
     */
    public function export(EventQuery $events, array $options = [])
    {
        Calendar::getInstance()->requirePro();

        $exporter = new ExportCalendarToIcs($events, $options);
        $exporter->export(true, false);
    }

    /**
     * @throws \Solspace\Calendar\Library\Exceptions\AttributeException
     *
     * @return CalendarModel[]
     */
    public function calendars(array $attributes = null): array
    {
        return Calendar::getInstance()->calendars->getCalendars($attributes);
    }

    /**
     * Returns a SHA-1 hash of the latest modification date and calendar count.
     */
    public function calendarsCacheKey(): string
    {
        $calendarService = Calendar::getInstance()->calendars;

        return sha1($calendarService->getLatestModificationDate().$calendarService->getAllCalendarCount());
    }

    /**
     * Returns a SHA-1 hash of the latest modification date and event count.
     */
    public function eventsCacheKey(): string
    {
        $eventsService = Calendar::getInstance()->events;

        return sha1($eventsService->getLatestModificationDate().$eventsService->getAllEventCount());
    }

    /**
     * @throws \Solspace\Calendar\Library\Exceptions\AttributeException
     *
     * @return null|CalendarModel
     */
    public function calendar(array $attributes = null)
    {
        $calendarService = Calendar::getInstance()->calendars;
        $calendarList = $calendarService->getCalendars($attributes);

        return reset($calendarList);
    }

    public function allowedCalendars(): array
    {
        $calendarService = Calendar::getInstance()->calendars;

        return $calendarService->getAllAllowedCalendars();
    }

    /**
     * @param array $attributes
     */
    public function month(array $attributes = null): EventMonth
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getMonth($attributes);
    }

    /**
     * @param array $attributes
     */
    public function week(array $attributes = null): EventWeek
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getWeek($attributes);
    }

    /**
     * @param array $attributes
     */
    public function day(array $attributes = null): EventDay
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getDay($attributes);
    }

    /**
     * @param array $attributes
     */
    public function hour(array $attributes = null): EventHour
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getHour($attributes);
    }

    public function settings(): SettingsService
    {
        return Calendar::getInstance()->settings;
    }

    public function frequencyOptions(): array
    {
        return RecurrenceHelper::getFrequencyOptions();
    }

    public function repeatsByOptions(): array
    {
        return RecurrenceHelper::getRepeatsByOptions();
    }

    public function weekDaysShort(): array
    {
        return DateHelper::getWeekDaysShort($this->settings()->getFirstDayOfWeek());
    }

    public function monthDays(): array
    {
        return DateHelper::getMonthDays();
    }

    public function monthNames(): array
    {
        return DateHelper::getMonthNames();
    }

    public function getHumanReadableDateFormat(string $format = null): string
    {
        if (null === $format) {
            $format = \Craft::$app->locale->getDateFormat('short', 'php');
        }

        return $this->getHumanReadableDateTimeFormat($format);
    }

    public function getHumanReadableTimeFormat(string $format = null): string
    {
        if (null === $format) {
            $format = \Craft::$app->locale->getTimeFormat('short', 'php');
        }

        return $this->getHumanReadableDateTimeFormat($format);
    }

    public function getHumanReadableDateTimeFormat(string $format = null): string
    {
        if (null === $format) {
            $format = \Craft::$app->locale->getDateTimeFormat('short', 'php');
        }

        $replacements = [
            'n' => 'M',
            'm' => 'M',
            'j' => 'D',
            'd' => 'D',
            'g' => 'H',
            'h' => 'H',
            'G' => 'H',
            'i' => 'MM',
            'A' => 'T',
            'a' => 'T',
        ];

        return str_replace(array_keys($replacements), $replacements, $format);
    }

	/**
	 * https://github.com/solspace/craft-calendar/issues/122.
	 *
	 * Adds the first occurrence date to the list of select dates
	 *
	 * @param Event $event
	 * @return Event $event
	 * @throws \yii\base\ExitException
	 */
    public function addFirstOccurrenceDate(Event $event): Event
    {
		$event->selectDates = Calendar::getInstance()->events->addFirstOccurrenceDate($event->selectDates);

	    return $event;
    }
}
