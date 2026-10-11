<?php

namespace Solspace\Calendar\Variables;

use craft\elements\db\ElementQueryInterface;
use craft\helpers\StringHelper;
use craft\web\View;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceProvider;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Db\OccurrenceQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Events\EventDay;
use Solspace\Calendar\Library\Events\EventHour;
use Solspace\Calendar\Library\Events\EventMonth;
use Solspace\Calendar\Library\Events\EventWeek;
use Solspace\Calendar\Library\Exceptions\AttributeException;
use Solspace\Calendar\Library\Export\ExportCalendarToIcs;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\RecurrenceHelper;
use Solspace\Calendar\Library\Scheduling\Availability;
use Solspace\Calendar\Library\Scheduling\BookingCaptcha;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\CalendarSitesService;
use Solspace\Calendar\Services\FormatsService;
use Solspace\Calendar\Services\SettingsService;
use Solspace\Calendar\Services\ViewDataService;
use Twig\Markup;
use yii\base\Exception;

class CalendarVariable
{
    private ViewDataService $viewService;
    private OccurrenceProvider $occurrenceProvider;

    public function __construct()
    {
        $this->viewService = Calendar::getInstance()->viewData;
        $this->occurrenceProvider = \Craft::$container->get(OccurrenceProvider::class);
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

    public function occurrences(array $criteria = []): OccurrenceQuery
    {
        return $this->occurrenceProvider->createQuery($criteria);
    }

    public function schedulingCalendars(): array
    {
        return Calendar::getInstance()->bookings->getPublicCalendars();
    }

    public function availableSlots(int|string $calendar, string $date): array
    {
        $model = is_numeric($calendar) ? Calendar::getInstance()->calendars->getCalendarById((int) $calendar) : Calendar::getInstance()->calendars->getCalendarByHandle($calendar);

        return $model ? Calendar::getInstance()->bookings->availableSlots($model, $date) : [];
    }

    public function bookingForm(int|string $calendar, array $options = []): Markup
    {
        $service = Calendar::getInstance()->bookings;
        $model = is_numeric($calendar) ? Calendar::getInstance()->calendars->getCalendarById((int) $calendar) : Calendar::getInstance()->calendars->getCalendarByHandle($calendar);
        if (!$model || !isset($service->getPublicCalendars()[$model->id])) {
            return new Markup('', 'UTF-8');
        }
        $booking = $options['booking'] ?? new Booking();
        $settings = $model->getSchedulingSettings();
        $today = new \DateTimeImmutable('now', new \DateTimeZone($settings->timezone));
        $minDate = $today->format('Y-m-d');
        $maxDate = $today->modify('+'.$settings->maximumAdvance.' days')->format('Y-m-d');
        $date = $options['date'] ?? $booking->startDate?->setTimezone($today->getTimezone())->format('Y-m-d') ?? $minDate;
        if (!\is_string($date) || !Availability::validDate($date) || $date < $minDate || $date > $maxDate) {
            $date = $minDate;
        }
        $framework = $options['framework'] ?? 'default';
        $theme = $options['theme'] ?? 'auto';
        if (!\in_array($framework, ['default', 'bootstrap', 'tailwind'], true) || !\in_array($theme, ['auto', 'light', 'dark'], true)) {
            throw new \InvalidArgumentException('Choose a supported booking form framework (default, bootstrap, tailwind) and theme (auto, light, dark).');
        }
        $html = \Craft::$app->view->renderTemplate('calendar/bookings/_form', [
            'calendar' => $model, 'settings' => $settings,
            'formId' => 'calendar-booking-'.StringHelper::randomString(12),
            'booking' => $booking,
            'publicFields' => $service->getPublicFormFields($booking),
            'minDate' => $minDate, 'maxDate' => $maxDate, 'date' => $date,
            'framework' => $framework, 'theme' => $theme,
            'captcha' => $this->bookingCaptcha(),
        ], View::TEMPLATE_MODE_CP);

        return new Markup($html, 'UTF-8');
    }

    public function bookingCaptcha(): ?array
    {
        return (new BookingCaptcha())->getClientConfig(Calendar::getInstance()->getSettings());
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
     * @deprecated use `::events()` event query to fetch events instead
     *
     * @throws Exception
     */
    public function event(int|string $id, array $options = []): ?Event
    {
        if ('new' === $id) {
            return $this->createEvent();
        }

        return null;
    }

    public function createEvent(?int $siteId = null, ?int $calendarId = null): Event
    {
        if (!$siteId) {
            $siteId = \Craft::$app->sites->currentSite->id;
        }

        return Event::create($siteId, $calendarId);
    }

    public function isExportEnabled(): bool
    {
        return $this->isPro();
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

        if (empty($calendarList)) {
            return null;
        }

        return reset($calendarList);
    }

    public function allowedCalendars(): array
    {
        $calendarService = Calendar::getInstance()->calendars;

        return $calendarService->getAllAllowedCalendars();
    }

    public function month(?array $attributes = null): EventMonth
    {
        return $this->viewService->getMonth($attributes);
    }

    public function week(?array $attributes = null): EventWeek
    {
        return $this->viewService->getWeek($attributes);
    }

    public function day(?array $attributes = null): EventDay
    {
        return $this->viewService->getDay($attributes);
    }

    public function hour(?array $attributes = null): EventHour
    {
        return $this->viewService->getHour($attributes);
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
}
