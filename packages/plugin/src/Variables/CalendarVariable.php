<?php

namespace Solspace\Calendar\Variables;

use Carbon\Carbon;
use craft\elements\db\ElementQueryInterface;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Events\EventDay;
use Solspace\Calendar\Library\Events\EventHour;
use Solspace\Calendar\Library\Events\EventMonth;
use Solspace\Calendar\Library\Events\EventWeek;
use Solspace\Calendar\Library\Exceptions\AttributeException;
use Solspace\Calendar\Library\Export\ExportCalendarToIcs;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\RecurrenceHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\CalendarSitesService;
use Solspace\Calendar\Services\FormatsService;
use Solspace\Calendar\Services\SettingsService;
use yii\base\Exception;
use yii\base\ExitException;

class CalendarVariable
{
    public function showDemoTemplateBanner(): bool
    {
        if (!$this->settings()->isAdminChangesAllowed()) {
            return false;
        }

        return !$this->settings()->isDemoBannerDisabled();
    }

    public function canEditEvent(Event|int $event): bool
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

    public function events(?array $attributes = null): ElementQueryInterface
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
     * @param array $options - [occurrenceDate, occurrenceRangeStart, occurrenceRangeEnd, occurrenceLimit]
     *
     * @throws Exception
     */
    public function event(int|string $id, array $options = []): ?Event
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

    public function export(EventQuery $events, array $options = []): void
    {
        Calendar::getInstance()->requirePro();

        $exporter = new ExportCalendarToIcs($events, $options);
        $exporter->export(true, false);
    }

    /**
     * @return CalendarModel[]
     *
     * @throws AttributeException
     */
    public function calendars(?array $attributes = null): array
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
     * @throws AttributeException
     */
    public function calendar(?array $attributes = null): ?CalendarModel
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

    public function month(?array $attributes = null): EventMonth
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getMonth($attributes);
    }

    public function week(?array $attributes = null): EventWeek
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getWeek($attributes);
    }

    public function day(?array $attributes = null): EventDay
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getDay($attributes);
    }

    public function hour(?array $attributes = null): EventHour
    {
        $viewDataService = Calendar::getInstance()->viewData;

        return $viewDataService->getHour($attributes);
    }

    public function settings(): SettingsService
    {
        return Calendar::getInstance()->settings;
    }

    public function calendarSites(): CalendarSitesService
    {
        return Calendar::getInstance()->calendarSites;
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

    public function getHumanReadableDateFormat(?string $format = null): string
    {
        if (null === $format) {
            $format = \Craft::$app->locale->getDateFormat('short', 'php');
        }

        return $this->getHumanReadableDateTimeFormat($format);
    }

    public function getHumanReadableTimeFormat(?string $format = null): string
    {
        if (null === $format) {
            $format = \Craft::$app->locale->getTimeFormat('short', 'php');
        }

        return $this->getHumanReadableDateTimeFormat($format);
    }

    public function getHumanReadableDateTimeFormat(?string $format = null): string
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
     * @throws ExitException
     */
    public function addFirstOccurrenceDate(Event $event): Event
    {
        $event->selectDates = Calendar::getInstance()->events->addFirstOccurrenceDate($event->selectDates);

        return $event;
    }
}
