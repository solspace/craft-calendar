<?php

namespace Solspace\Calendar\Controllers;

use craft\helpers\Db;
use craft\helpers\StringHelper;
use craft\helpers\UrlHelper;
use craft\web\View;
use Solspace\Calendar\Bundles\ProjectConfig\BookingFieldLayoutProjectConfig;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Library\Scheduling\Availability;
use Solspace\Calendar\Library\Scheduling\BookingConflictException;
use Solspace\Calendar\Library\Scheduling\BookingHistory;
use Solspace\Calendar\Library\Scheduling\BookingRateLimit;
use Solspace\Calendar\Library\Scheduling\Schedule;
use Solspace\Calendar\Library\SpamProtection\Captcha;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Records\CalendarRecord;
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
        $selection = $request->getQueryParam('calendarIds', $request->getQueryParam('calendarId') ?: 'all');

        try {
            $calendarIds = Schedule::calendarIds($calendars, $selection);
        } catch (\OutOfBoundsException) {
            throw new ForbiddenHttpException();
        } catch (\InvalidArgumentException) {
            throw new BadRequestHttpException();
        }
        $calendarSelection = \count($calendarIds) === \count($calendars) ? 'all' : implode(',', $calendarIds);
        $status = $request->getQueryParam('bookingStatus');
        if ($status && !isset(Booking::statusOptions()[$status])) {
            throw new BadRequestHttpException();
        }
        $bookingListView = $request->getQueryParam('view', 'active');
        if (!\in_array($bookingListView, ['active', 'trash'], true)) {
            throw new BadRequestHttpException();
        }
        $trashed = 'trash' === $bookingListView;
        $sortOptions = [
            'date-desc' => Calendar::t('Booking time: newest first'),
            'date-asc' => Calendar::t('Booking time: oldest first'),
            'submitted-desc' => Calendar::t('Submitted: newest first'),
            'submitted-asc' => Calendar::t('Submitted: oldest first'),
            'updated-desc' => Calendar::t('Last updated: newest first'),
            'updated-asc' => Calendar::t('Last updated: oldest first'),
            'customer-asc' => Calendar::t('Customer: A–Z'),
            'customer-desc' => Calendar::t('Customer: Z–A'),
            'calendar-asc' => Calendar::t('Calendar: A–Z'),
            'calendar-desc' => Calendar::t('Calendar: Z–A'),
            'status-asc' => Calendar::t('Status: A–Z'),
            'status-desc' => Calendar::t('Status: Z–A'),
        ];
        $sort = $request->getQueryParam('sort', 'date-desc');
        if (!\is_string($sort) || !isset($sortOptions[$sort])) {
            $sort = 'date-desc';
        }
        [$sortField, $sortDirection] = explode('-', $sort);
        $sortColumns = ['date' => 'calendar_bookings.startDate', 'submitted' => 'elements.dateCreated', 'updated' => 'elements.dateUpdated', 'customer' => 'calendar_bookings.customerName', 'calendar' => 'booking_calendar.name', 'status' => 'calendar_bookings.bookingStatus'];
        $query = Booking::find()->calendarId($calendarIds)->status(null)->trashed($trashed);
        if ('calendar' === $sortField) {
            $query->leftJoin(['booking_calendar' => CalendarRecord::TABLE], '[[booking_calendar.id]] = [[calendar_bookings.calendarId]]');
        }
        // A unique tie-breaker keeps bookings with matching values stable across pages.
        $query->orderBy([$sortColumns[$sortField] => 'asc' === $sortDirection ? \SORT_ASC : \SORT_DESC, 'calendar_bookings.id' => \SORT_DESC]);
        if ($status) {
            $query->bookingStatus($status);
        }
        $search = trim((string) $request->getQueryParam('search', ''));
        if ($search) {
            $query->andWhere(['or', ['like', 'calendar_bookings.customerName', $search], ['like', 'calendar_bookings.customerEmail', $search]]);
        }
        $page = max(1, (int) $request->getQueryParam('page', 1));
        $total = (clone $query)->count();

        $variables = $this->variables() + [
            'bookings' => $query->limit(50)->offset(($page - 1) * 50)->all(), 'total' => $total, 'page' => $page,
            'calendarIds' => $calendarIds, 'calendarSelection' => $calendarSelection, 'bookingStatus' => $status, 'search' => $search, 'sort' => $sort, 'sortOptions' => $sortOptions, 'bookingListView' => $bookingListView, 'trashed' => $trashed,
        ];
        if ($request->getAcceptsJson()) {
            $view = \Craft::$app->getView();
            $html = $view->renderTemplate('calendar/bookings/_list', $variables, View::TEMPLATE_MODE_CP);

            return $this->asJson(['html' => $html, 'headHtml' => $view->getHeadHtml(), 'bodyHtml' => $view->getBodyHtml()]);
        }

        return $this->renderTemplate('calendar/bookings/index', $variables);
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
                $available = Calendar::getInstance()->bookings->availableSlots($calendars[$calendarId], $booking->startDate->setTimezone(new \DateTimeZone($settings->timezone))->format('Y-m-d'), false);
                if (!array_filter($available, static fn ($slot) => (new \DateTimeImmutable($slot['start']))->getTimestamp() === $booking->startDate->getTimestamp())) {
                    $booking->addError('startDate', Calendar::t('This time is unavailable. Check opening hours, exceptions, and existing bookings.'));
                }
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

    public function actionSetStatus(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $request = \Craft::$app->request;
        $booking = \Craft::$app->getElements()->getElementById((int) $request->getRequiredBodyParam('bookingId'), Booking::class);
        $service = Calendar::getInstance()->bookings;
        if (!$booking instanceof Booking || !$service->canManage($booking->getCalendar())) {
            throw new ForbiddenHttpException();
        }
        $status = $request->getRequiredBodyParam('bookingStatus');
        if (!\is_string($status) || !isset(Booking::statusOptions()[$status])) {
            throw new BadRequestHttpException(Calendar::t('Choose a valid booking status.'));
        }
        if ($booking->bookingStatus !== $status) {
            $booking->bookingStatus = $status;
            if (!$service->save($booking)) {
                return $this->asJson(['success' => false, 'message' => implode(' ', $booking->getErrorSummary(true)) ?: Calendar::t('Could not save booking status.')]);
            }
        }

        $data = ['success' => true, 'bookingStatus' => $booking->bookingStatus];
        if ($booking->dateUpdated) {
            $formatter = \Craft::$app->getFormatter();
            $data['updated'] = [
                'iso' => $booking->dateUpdated->format(\DATE_ATOM),
                'date' => $formatter->asDate($booking->dateUpdated->getTimestamp(), 'medium'),
                'time' => DateFormatHelper::compactTimeLabel($formatter->asTime($booking->dateUpdated->getTimestamp(), DateFormatHelper::get(DateFormatHelper::TYPE_TIME, length: 'short'))),
            ];
        }

        return $this->asJson($data);
    }

    public function actionDelete(): Response
    {
        $booking = $this->lifecycleBooking(false);
        if (!\Craft::$app->getElements()->deleteElement($booking, false)) {
            return $this->asJson(['success' => false, 'message' => Calendar::t('Could not delete booking.')]);
        }

        return $this->asJson(['success' => true]);
    }

    public function actionRestore(): Response
    {
        $booking = $this->lifecycleBooking(true);

        try {
            $success = \Craft::$app->getElements()->restoreElement($booking);
        } catch (BookingConflictException $exception) {
            return $this->asJson(['success' => false, 'message' => $exception->getMessage()]);
        }
        if (!$success) {
            return $this->asJson(['success' => false, 'message' => implode(' ', $booking->getErrorSummary(true)) ?: Calendar::t('Could not restore booking.')]);
        }

        return $this->asJson(['success' => true]);
    }

    public function actionDeleteSelected(): Response
    {
        return $this->changeSelectedBookings(false);
    }

    public function actionSetStatusSelected(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $status = \Craft::$app->request->getRequiredBodyParam('bookingStatus');
        if (!\is_string($status) || !isset(Booking::statusOptions()[$status])) {
            throw new BadRequestHttpException(Calendar::t('Choose a valid booking status.'));
        }
        $bookings = $this->selectedLifecycleBookings(false);
        $service = Calendar::getInstance()->bookings;
        $completedIds = [];
        $errors = [];
        foreach ($bookings as $booking) {
            $previous = $booking->bookingStatus;
            if ($previous === $status) {
                $completedIds[] = $booking->id;

                continue;
            }
            $booking->bookingStatus = $status;
            if ($service->save($booking)) {
                $completedIds[] = $booking->id;
            } else {
                $booking->bookingStatus = $previous;
                $errors[] = ['bookingId' => $booking->id, 'customer' => $booking->customerName, 'message' => implode(' ', $booking->getErrorSummary(true)) ?: Calendar::t('Could not save booking status.')];
            }
        }

        return $this->asJson(['success' => !$errors, 'completedIds' => $completedIds, 'errors' => $errors]);
    }

    public function actionRestoreSelected(): Response
    {
        return $this->changeSelectedBookings(true);
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
        if ((int) $request->getBodyParam('calendarId', $booking->calendarId) !== (int) $booking->calendarId) {
            throw new BadRequestHttpException();
        }

        try {
            $start = Schedule::moveStart(
                (string) $request->getRequiredBodyParam('date'),
                $request->getRequiredBodyParam('minute'),
                $request->getBodyParam('timezone', $booking->getCalendar()->getSchedulingSettings()->timezone),
            );
        } catch (\InvalidArgumentException) {
            throw new BadRequestHttpException();
        }

        try {
            $token = (new BookingHistory(Calendar::getInstance()->bookings))->move((int) $booking->id, $start);
        } catch (\RuntimeException $exception) {
            return $this->asJson(['success' => false, 'message' => $exception->getMessage()]);
        }

        return $this->asJson(['success' => true, 'historyToken' => $token]);
    }

    public function actionHistory(): Response
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $request = \Craft::$app->request;

        try {
            (new BookingHistory(Calendar::getInstance()->bookings))->replay((string) $request->getRequiredBodyParam('token'), (string) $request->getRequiredBodyParam('direction'));
        } catch (\RuntimeException $exception) {
            return $this->asJson(['success' => false, 'message' => $exception->getMessage()]);
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
        if ($request->getBodyParam('bookingWebsite') || !(new BookingRateLimit())->consume((string) $request->getUserIP())) {
            throw new TooManyRequestsHttpException(Calendar::t('Please try again later.'));
        }
        $booking = new Booking();
        $booking->calendarId = $calendar->id;
        $booking->startDate = $this->parseStart((string) $request->getRequiredBodyParam('start'));
        $booking->endDate = $booking->startDate->setTimestamp($booking->startDate->getTimestamp() + $settings->duration * 60);
        $booking->bookingStatus = $settings->requireApproval ? Booking::REQUESTED : Booking::CONFIRMED;
        foreach (['customerName', 'customerEmail', 'notes'] as $key) {
            $booking->{$key} = trim((string) $request->getBodyParam($key, ''));
        }
        $captcha = new Captcha();
        $spamSettings = Calendar::getInstance()->settings->getSettingsModel();
        $captchaConfig = $captcha->getClientConfig($spamSettings);
        $token = $request->getBodyParam('captchaToken', $request->getBodyParam('bookingCaptchaToken', $captchaConfig ? $request->getBodyParam($captchaConfig['responseField']) : null));
        if (!$captcha->verify($spamSettings, $token, $request->getUserIP())) {
            $booking->addError('bookingCaptchaToken', Calendar::t('Please complete the spam protection check and try again.'));
        }
        $postedFields = (array) $request->getBodyParam('fields', []);
        foreach (Calendar::getInstance()->bookings->getPublicFields() as $element) {
            $handle = $element->getField()->handle;
            $booking->setFieldValue($handle, $postedFields[$handle] ?? null);
            if ($element->required && $element->getField()->isValueEmpty($booking->getFieldValue($handle), $booking)) {
                $booking->addError('field:'.$handle, Calendar::t('{field} is required.', ['field' => $element->getField()->name]));
            }
        }
        if ($booking->hasErrors('bookingCaptchaToken')) {
            return $this->asFailure(Calendar::t('Could not submit booking.'), ['errors' => $booking->getErrors()], ['booking' => $booking]);
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
        $request = \Craft::$app->request;
        $selection = $request->getQueryParam('calendarIds', $request->getQueryParam('calendarId', 'all'));

        try {
            $calendarIds = Schedule::calendarIds($calendars, $selection);
        } catch (\OutOfBoundsException) {
            throw new ForbiddenHttpException();
        } catch (\InvalidArgumentException) {
            throw new BadRequestHttpException();
        }
        $calendarId = $calendarIds[0];
        $calendar = $calendars[$calendarId];
        $calendarSelection = \count($calendarIds) === \count($calendars) ? 'all' : implode(',', $calendarIds);
        $zone = new \DateTimeZone(\count($calendarIds) === 1 ? $calendar->getSchedulingSettings()->timezone : \Craft::$app->getFormatter()->timeZone);
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
        $bookings = Booking::find()->calendarId($calendarIds)->bookingStatus([Booking::REQUESTED, Booking::CONFIRMED])
            ->andWhere(['>', 'calendar_bookings.endDate', Db::prepareDateForDb($start)])
            ->andWhere(['<', 'calendar_bookings.startDate', Db::prepareDateForDb($end)])
            ->orderBy(['calendar_bookings.startDate' => \SORT_ASC])->all()
        ;
        $days = [];
        $slotCache = [];
        $availableSlots = static function (CalendarModel $resource, string $localDate) use (&$slotCache): array {
            return $slotCache[$resource->id][$localDate] ??= Calendar::getInstance()->bookings->availableSlots($resource, $localDate, false);
        };
        for ($day = $start; $day < $end; $day = $day->modify('+1 day')) {
            $columns = [];
            foreach ($calendarIds as $id) {
                $columns[] = Schedule::column($calendars[$id], $day, $bookings, $availableSlots);
            }
            $days[] = ['date' => $day, 'columns' => $columns];
        }

        return $this->renderTemplate('calendar/bookings/schedule', $this->variables() + [
            'calendar' => $calendar, 'calendarId' => $calendarId, 'calendarIds' => $calendarIds, 'calendarSelection' => $calendarSelection, 'displayTimezone' => $zone->getName(), 'days' => $days, 'date' => $date, 'scheduleView' => $scheduleView,
            'previous' => $start->modify('day' === $scheduleView ? '-1 day' : '-7 days')->format('Y-m-d'), 'next' => $end->format('Y-m-d'),
        ]);
    }

    private function renderEdit(Booking $booking): Response
    {
        return $this->renderTemplate('calendar/bookings/edit', $this->variables() + ['booking' => $booking, 'fieldLayout' => $booking->getFieldLayout()]);
    }

    private function variables(): array
    {
        return ['calendars' => $this->manageableCalendars(), 'statusOptions' => Booking::statusOptions(), 'bookingTimeFormat' => 'icu:'.DateFormatHelper::get(DateFormatHelper::TYPE_TIME, length: 'short'), 'crumbs' => [['label' => Calendar::getInstance()->name, 'url' => UrlHelper::cpUrl('calendar')], ['label' => Calendar::getInstance()->settings->getSettingsModel()->getBookingLabel(), 'url' => UrlHelper::cpUrl(Calendar::getInstance()->settings->getSettingsModel()->getBookingDefaultPath())]]];
    }

    private function lifecycleBooking(bool $trashed): Booking
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $id = filter_var(\Craft::$app->request->getRequiredBodyParam('bookingId'), \FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
        if (false === $id) {
            throw new BadRequestHttpException();
        }

        return $this->findLifecycleBooking($id, $trashed);
    }

    private function findLifecycleBooking(int $id, bool $trashed): Booking
    {
        $booking = \Craft::$app->getElements()->getElementById($id, Booking::class, \Craft::$app->getSites()->getPrimarySite()->id, ['trashed' => $trashed]);
        if (!$booking instanceof Booking || !Calendar::getInstance()->bookings->canManage($booking->getCalendar())) {
            throw new ForbiddenHttpException();
        }

        return $booking;
    }

    private function selectedLifecycleBookings(bool $trashed): array
    {
        $this->requireCpRequest();
        $this->requirePostRequest();
        $ids = \Craft::$app->request->getRequiredBodyParam('bookingIds');
        if (!\is_array($ids) || !$ids || \count($ids) > 50) {
            throw new BadRequestHttpException();
        }
        $validatedIds = [];
        foreach ($ids as $id) {
            $id = filter_var($id, \FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
            if (false === $id) {
                throw new BadRequestHttpException();
            }
            $validatedIds[$id] = $id;
        }

        // Authorize the entire selection before changing any elements.
        return array_map(fn (int $id) => $this->findLifecycleBooking($id, $trashed), array_values($validatedIds));
    }

    private function changeSelectedBookings(bool $restore): Response
    {
        $bookings = $this->selectedLifecycleBookings($restore);
        $elements = \Craft::$app->getElements();
        $completedIds = [];
        $errors = [];
        foreach ($bookings as $booking) {
            try {
                $success = $restore ? $elements->restoreElement($booking) : $elements->deleteElement($booking, false);
                $message = $success ? '' : (implode(' ', $booking->getErrorSummary(true)) ?: Calendar::t($restore ? 'Could not restore booking.' : 'Could not delete booking.'));
            } catch (BookingConflictException $exception) {
                $success = false;
                $message = $exception->getMessage();
            }
            if ($success) {
                $completedIds[] = $booking->id;
            } else {
                $errors[] = ['bookingId' => $booking->id, 'customer' => $booking->customerName, 'message' => $message];
            }
        }

        return $this->asJson(['success' => !$errors, 'completedIds' => $completedIds, 'errors' => $errors]);
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
