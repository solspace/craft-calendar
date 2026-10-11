<?php

namespace Solspace\Calendar\Controllers;

use craft\helpers\Db;
use craft\helpers\StringHelper;
use craft\helpers\UrlHelper;
use Solspace\Calendar\Bundles\ProjectConfig\BookingFieldLayoutProjectConfig;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Scheduling\Availability;
use Solspace\Calendar\Models\CalendarModel;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use yii\web\TooManyRequestsHttpException;

class BookingsController extends BaseController
{
    protected array|bool|int $allowAnonymous = ['slots', 'request'];

    public function actionIndex(): Response
    {
        $calendars = $this->manageableCalendars();
        $request = \Craft::$app->request;
        $calendarId = $request->getQueryParam('calendarId');
        if ($calendarId && !isset($calendars[$calendarId])) {
            throw new ForbiddenHttpException();
        }
        $status = $request->getQueryParam('bookingStatus');
        if ($status && !isset(Booking::statusOptions()[$status])) {
            throw new BadRequestHttpException();
        }
        $query = Booking::find()->calendarId($calendarId ?: array_keys($calendars))->orderBy(['calendar_bookings.startDate' => \SORT_DESC]);
        if ($status) {
            $query->bookingStatus($status);
        }
        $search = trim((string) $request->getQueryParam('search', ''));
        if ($search) {
            $query->andWhere(['or', ['like', 'calendar_bookings.customerName', $search], ['like', 'calendar_bookings.customerEmail', $search]]);
        }
        $page = max(1, (int) $request->getQueryParam('page', 1));
        $total = (clone $query)->count();

        return $this->renderTemplate('calendar/bookings/index', $this->variables() + [
            'bookings' => $query->limit(50)->offset(($page - 1) * 50)->all(), 'total' => $total, 'page' => $page,
            'calendarId' => $calendarId, 'bookingStatus' => $status, 'search' => $search,
        ]);
    }

    public function actionEdit(?int $bookingId = null): Response
    {
        $calendars = $this->manageableCalendars();
        $booking = $bookingId ? Booking::find()->id($bookingId)->one() : new Booking();
        if (!$booking) {
            throw new NotFoundHttpException();
        }
        if ($bookingId && !isset($calendars[$booking->calendarId])) {
            throw new ForbiddenHttpException();
        }
        if (!$bookingId) {
            $calendarId = (int) \Craft::$app->request->getQueryParam('calendarId', array_key_first($calendars));
            if (!isset($calendars[$calendarId])) {
                throw new ForbiddenHttpException();
            }
            $booking->calendarId = $calendarId;
            $settings = $calendars[$calendarId]->getSchedulingSettings();
            $start = \Craft::$app->request->getQueryParam('start');
            if ($start) {
                $booking->startDate = $this->parseStart($start);
                $booking->startDate = $booking->startDate->setTimestamp($booking->startDate->getTimestamp() - (int) $booking->startDate->format('s'));
                $booking->endDate = $booking->startDate->setTimestamp($booking->startDate->getTimestamp() + $settings->duration * 60);
            } else {
                $slot = Calendar::getInstance()->bookings->nextAvailableSlot($calendars[$calendarId]);
                if ($slot) {
                    $booking->startDate = new \DateTimeImmutable($slot['start']);
                    $booking->endDate = new \DateTimeImmutable($slot['end']);
                } else {
                    $booking->addError('startDate', Calendar::t('No available booking times were found within this calendar’s booking window. Check its opening hours, exceptions, and existing bookings.'));
                }
            }
        }

        return $this->renderEdit($booking);
    }

    public function actionSave(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $calendars = $this->manageableCalendars();
        $request = \Craft::$app->request;
        $id = (int) $request->getBodyParam('bookingId');
        $booking = $id ? Booking::find()->id($id)->one() : new Booking();
        if (!$booking || ($id && !isset($calendars[$booking->calendarId]))) {
            throw new ForbiddenHttpException();
        }
        $calendarId = (int) $request->getRequiredBodyParam('calendarId');
        if (!isset($calendars[$calendarId])) {
            throw new ForbiddenHttpException();
        }
        $booking->calendarId = $calendarId;
        $zone = new \DateTimeZone($calendars[$calendarId]->getSchedulingSettings()->timezone);
        foreach (['startDate', 'endDate'] as $key) {
            $value = (string) $request->getRequiredBodyParam($key);
            if (preg_match('/(?:Z|[+-]\d{2}:\d{2})$/D', $value)) {
                $parsed = $this->parseStart($value);
            } else {
                $parsed = \DateTimeImmutable::createFromFormat('!Y-m-d\TH:i', $value, $zone);
                if (!$parsed || $parsed->format('Y-m-d\TH:i') !== $value) {
                    throw new BadRequestHttpException(Calendar::t('Choose valid booking dates and times.'));
                }
            }
            $booking->{$key} = $parsed;
        }
        foreach (['customerName', 'customerEmail', 'notes', 'bookingStatus'] as $key) {
            $booking->{$key} = trim((string) $request->getBodyParam($key, ''));
        }
        $booking->setScenario(Booking::SCENARIO_LIVE);
        $booking->setFieldValuesFromRequest('fields');
        if (Calendar::getInstance()->bookings->save($booking)) {
            \Craft::$app->session->setNotice(Calendar::t('Booking saved.'));

            return $this->redirectToPostedUrl($booking);
        }
        \Craft::$app->session->setError(Calendar::t('Could not save booking.'));

        return $this->renderEdit($booking);
    }

    public function actionMove(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $request = \Craft::$app->request;
        $booking = Booking::find()->id((int) $request->getRequiredBodyParam('bookingId'))->one();
        if (!$booking || !Calendar::getInstance()->bookings->canManage($booking->getCalendar())) {
            throw new ForbiddenHttpException();
        }
        $date = (string) $request->getRequiredBodyParam('date');
        $minute = filter_var($request->getRequiredBodyParam('minute'), \FILTER_VALIDATE_INT);
        if (!Availability::validDate($date) || false === $minute || $minute < 0 || $minute >= 1440) {
            throw new BadRequestHttpException();
        }
        $settings = $booking->getCalendar()->getSchedulingSettings();
        $value = $date.' '.\sprintf('%02d:%02d', intdiv($minute, 60), $minute % 60);
        $start = new \DateTimeImmutable($value, new \DateTimeZone($settings->timezone));
        if ($start->format('Y-m-d H:i') !== $value) {
            throw new BadRequestHttpException();
        }
        $duration = $booking->endDate->getTimestamp() - $booking->startDate->getTimestamp();
        $booking->startDate = $start;
        $booking->endDate = $start->setTimestamp($start->getTimestamp() + $duration);
        if (!Calendar::getInstance()->bookings->save($booking)) {
            return $this->asJson(['success' => false, 'message' => implode(' ', $booking->getErrorSummary(true))]);
        }

        return $this->asJson(['success' => true]);
    }

    public function actionSlots(): Response
    {
        $calendar = $this->publicCalendar((int) \Craft::$app->request->getRequiredQueryParam('calendarId'));
        $date = (string) \Craft::$app->request->getRequiredQueryParam('date');
        if (!Availability::validDate($date)) {
            throw new BadRequestHttpException();
        }
        \Craft::$app->response->headers->set('Cache-Control', 'no-store');

        return $this->asJson(['slots' => Calendar::getInstance()->bookings->availableSlots($calendar, $date), 'timezone' => $calendar->getSchedulingSettings()->timezone]);
    }

    public function actionAvailableSlots(): Response
    {
        $calendars = $this->manageableCalendars();
        $request = \Craft::$app->request;
        $calendarId = (int) $request->getRequiredQueryParam('calendarId');
        if (!isset($calendars[$calendarId])) {
            throw new ForbiddenHttpException();
        }
        $date = (string) $request->getRequiredQueryParam('date');
        if (!Availability::validDate($date)) {
            throw new BadRequestHttpException();
        }
        $bookingId = (int) $request->getQueryParam('bookingId');
        $duration = null;
        if ($bookingId) {
            $booking = Booking::find()->id($bookingId)->one();
            if (!$booking || !isset($calendars[$booking->calendarId])) {
                throw new ForbiddenHttpException();
            }
            $duration = (int) (($booking->endDate->getTimestamp() - $booking->startDate->getTimestamp()) / 60);
        }
        \Craft::$app->response->headers->set('Cache-Control', 'no-store');

        return $this->asJson([
            'slots' => Calendar::getInstance()->bookings->availableSlots($calendars[$calendarId], $date, false, $bookingId ?: null, $duration),
            'timezone' => $calendars[$calendarId]->getSchedulingSettings()->timezone,
        ]);
    }

    public function actionRequest(): ?Response
    {
        $this->requireSiteRequest();
        $this->requirePostRequest();
        $request = \Craft::$app->request;
        $calendar = $this->publicCalendar((int) $request->getRequiredBodyParam('calendarId'));
        $settings = $calendar->getSchedulingSettings();
        $cache = \Craft::$app->getCache();
        $key = ['calendar-booking-rate', hash('sha256', (string) $request->getUserIP()), (int) floor(time() / 3600)];
        $attempts = (int) $cache->get($key);
        if ($attempts >= 20 || $request->getBodyParam('bookingWebsite')) {
            throw new TooManyRequestsHttpException(Calendar::t('Please try again later.'));
        }
        $cache->set($key, $attempts + 1, 3600);
        $booking = new Booking();
        $booking->calendarId = $calendar->id;
        $booking->startDate = $this->parseStart((string) $request->getRequiredBodyParam('start'));
        $booking->endDate = $booking->startDate->setTimestamp($booking->startDate->getTimestamp() + $settings->duration * 60);
        $booking->bookingStatus = $settings->requireApproval ? Booking::REQUESTED : Booking::CONFIRMED;
        foreach (['customerName', 'customerEmail', 'notes'] as $key) {
            $booking->{$key} = trim((string) $request->getBodyParam($key, ''));
        }
        $postedFields = (array) $request->getBodyParam('fields', []);
        foreach (Calendar::getInstance()->bookings->getPublicFields() as $element) {
            $handle = $element->getField()->handle;
            $booking->setFieldValue($handle, $postedFields[$handle] ?? null);
            if ($element->required && $element->getField()->isValueEmpty($booking->getFieldValue($handle), $booking)) {
                $booking->addError('field:'.$handle, Calendar::t('{field} is required.', ['field' => $element->getField()->name]));
            }
        }
        $date = $booking->startDate->setTimezone(new \DateTimeZone($settings->timezone))->format('Y-m-d');
        $available = false;
        foreach (Calendar::getInstance()->bookings->availableSlots($calendar, $date) as $slot) {
            if ((new \DateTimeImmutable($slot['start']))->getTimestamp() === $booking->startDate->getTimestamp()) {
                $available = true;

                break;
            }
        }
        if (!$available) {
            $booking->addError('startDate', Calendar::t('This time is no longer available. Please choose another time.'));
        }
        if (!$available || $booking->hasErrors() || !Calendar::getInstance()->bookings->save($booking)) {
            return $this->asFailure(Calendar::t('Could not submit booking.'), ['errors' => $booking->getErrors()], ['booking' => $booking]);
        }

        return $this->asSuccess($settings->requireApproval ? Calendar::t('Your booking request has been received. Your time is reserved only after confirmation.') : Calendar::t('Your booking is confirmed.'), ['confirmed' => !$settings->requireApproval]);
    }

    public function actionFields(): Response
    {
        $this->requireCpRequest();
        $this->requireAdmin();
        $this->requireSchedulingAdminChanges();

        return $this->renderTemplate('calendar/bookings/fields', $this->variables() + ['fieldLayout' => Calendar::getInstance()->bookings->getFieldLayout(), 'availablePublicFields' => Calendar::getInstance()->bookings->getAvailablePublicFields(), 'publicFieldUids' => array_keys(Calendar::getInstance()->bookings->getPublicFields())]);
    }

    public function actionSaveFields(): Response
    {
        $this->requireCpRequest();
        $this->requireAdmin();
        $this->requireSchedulingAdminChanges();
        $this->requirePostRequest();
        $layout = \Craft::$app->fields->assembleLayoutFromPost();
        $layout->type = Booking::class;
        $layout->uid = Calendar::getInstance()->bookings->getFieldLayout()->uid ?: StringHelper::UUID();
        \Craft::$app->projectConfig->set(BookingFieldLayoutProjectConfig::PATH, ['uid' => $layout->uid] + ($layout->getConfig() ?? ['tabs' => []]));
        $publicUids = array_values(array_intersect((array) \Craft::$app->request->getBodyParam('publicFields', []), array_keys(Calendar::getInstance()->bookings->getAvailablePublicFields())));
        \Craft::$app->projectConfig->set('solspace.calendar.bookingPublicFields', $publicUids);
        \Craft::$app->session->setNotice(Calendar::t('Booking fields saved.'));

        return $this->redirect(UrlHelper::cpUrl('calendar/bookings/fields'));
    }

    public function actionSchedule(): Response
    {
        $calendars = $this->manageableCalendars();
        $calendarId = (int) \Craft::$app->request->getQueryParam('calendarId', array_key_first($calendars));
        if (!isset($calendars[$calendarId])) {
            throw new ForbiddenHttpException();
        }
        $calendar = $calendars[$calendarId];
        $zone = new \DateTimeZone($calendar->getSchedulingSettings()->timezone);
        $date = (string) \Craft::$app->request->getQueryParam('date', (new \DateTimeImmutable('now', $zone))->format('Y-m-d'));
        if (!Availability::validDate($date)) {
            throw new BadRequestHttpException();
        }
        $scheduleView = 'day' === \Craft::$app->request->getQueryParam('view') ? 'day' : 'week';
        $start = new \DateTimeImmutable($date, $zone);
        if ('week' === $scheduleView) {
            $start = $start->modify('-'.((int) $start->format('N') - 1).' days');
        }
        $end = $start->modify('day' === $scheduleView ? '+1 day' : '+7 days');
        $bookings = Booking::find()->calendarId($calendarId)->bookingStatus([Booking::REQUESTED, Booking::CONFIRMED])
            ->andWhere(['>=', 'calendar_bookings.startDate', Db::prepareDateForDb($start)])
            ->andWhere(['<', 'calendar_bookings.startDate', Db::prepareDateForDb($end)])
            ->orderBy(['calendar_bookings.startDate' => \SORT_ASC])->all()
        ;
        $days = [];
        for ($day = $start; $day < $end; $day = $day->modify('+1 day')) {
            $dayBookings = [];
            foreach ($bookings as $booking) {
                $localStart = $booking->startDate->setTimezone($zone);
                $localEnd = $booking->endDate->setTimezone($zone);
                if ($localStart->format('Y-m-d') === $day->format('Y-m-d')) {
                    $minute = (int) $localStart->format('G') * 60 + (int) $localStart->format('i');
                    $finish = $localEnd->format('Y-m-d') === $day->format('Y-m-d') ? (int) $localEnd->format('G') * 60 + (int) $localEnd->format('i') : 1440;
                    $dayBookings[] = ['booking' => $booking, 'minute' => $minute, 'length' => max(15, $finish - $minute), 'label' => $localStart->format('H:i').'–'.$localEnd->format('H:i')];
                }
            }
            $lanes = [];
            foreach ($dayBookings as &$item) {
                $lane = 0;
                while (isset($lanes[$lane]) && $lanes[$lane] > $item['minute']) {
                    ++$lane;
                }
                $lanes[$lane] = $item['minute'] + $item['length'];
                $item['lane'] = $lane;
            }
            unset($item);
            $days[] = ['date' => $day, 'bookings' => $dayBookings, 'lanes' => max(1, \count($lanes))];
        }

        return $this->renderTemplate('calendar/bookings/schedule', $this->variables() + [
            'calendar' => $calendar, 'calendarId' => $calendarId, 'days' => $days, 'date' => $date, 'scheduleView' => $scheduleView,
            'previous' => $start->modify('day' === $scheduleView ? '-1 day' : '-7 days')->format('Y-m-d'), 'next' => $end->format('Y-m-d'),
        ]);
    }

    private function renderEdit(Booking $booking): Response
    {
        return $this->renderTemplate('calendar/bookings/edit', $this->variables() + ['booking' => $booking, 'fieldLayout' => $booking->getFieldLayout()]);
    }

    private function variables(): array
    {
        return ['calendars' => $this->manageableCalendars(), 'statusOptions' => Booking::statusOptions(), 'crumbs' => [['label' => Calendar::getInstance()->name, 'url' => UrlHelper::cpUrl('calendar')], ['label' => Calendar::t('Bookings'), 'url' => UrlHelper::cpUrl('calendar/bookings')]]];
    }

    private function manageableCalendars(): array
    {
        $this->requireCpRequest();
        $calendars = Calendar::getInstance()->bookings->getManageableCalendars();
        if (!$calendars) {
            throw new ForbiddenHttpException();
        }

        return $calendars;
    }

    private function publicCalendar(int $id): CalendarModel
    {
        return Calendar::getInstance()->bookings->getPublicCalendars()[$id] ?? throw new NotFoundHttpException();
    }

    private function requireSchedulingAdminChanges(): void
    {
        if (!\Craft::$app->getConfig()->getGeneral()->allowAdminChanges) {
            throw new ForbiddenHttpException();
        }
    }

    private function parseStart(string $value): \DateTimeImmutable
    {
        if (!preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/D', $value)) {
            throw new BadRequestHttpException(Calendar::t('Choose a valid timeslot.'));
        }

        try {
            $date = new \DateTimeImmutable($value);
            if ($date->format('Y-m-d\TH:i:s') !== substr($value, 0, 19)) {
                throw new \InvalidArgumentException();
            }

            return $date;
        } catch (\Throwable) {
            throw new BadRequestHttpException(Calendar::t('Choose a valid timeslot.'));
        }
    }
}
