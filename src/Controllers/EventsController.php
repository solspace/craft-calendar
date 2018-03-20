<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\elements\User;
use craft\events\ElementEvent;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\i18n\Locale;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\CalendarPermissionHelper;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Library\Exceptions\EventException;
use Solspace\Calendar\Library\RecurrenceHelper;
use Solspace\Calendar\Models\ExceptionModel;
use Solspace\Calendar\Models\SelectDateModel;
use Solspace\Calendar\Resources\Bundles\EventEditBundle;
use yii\helpers\FormatConverter;
use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use yii\web\ServerErrorHttpException;

class EventsController extends BaseController
{
    const EVENT_FIELD_NAME    = 'calendarEvent';
    const EVENT_PREVIEW_EVENT = 'previewEvent';

    protected $allowAnonymous = ['actionSaveEvent'];

    /**
     * @return Response
     */
    public function actionEventsIndex(): Response
    {
        $this->requireEventPermission();

        return $this->renderTemplate(
            'calendar/events/_index',
            [
                'calendars' => Calendar::getInstance()->calendars->getAllAllowedCalendars(),
            ]
        );
    }

    /**
     * @param string      $handle
     * @param string|null $siteHandle
     *
     * @return Response
     * @throws HttpException
     * @throws \craft\errors\SiteNotFoundException
     * @throws \yii\base\Exception
     * @throws \yii\base\InvalidConfigException
     */
    public function actionCreateEvent(string $handle, string $siteHandle = null): Response
    {
        $calendar = $this->getCalendarService()->getCalendarByHandle($handle);
        if (!$calendar) {
            throw new HttpException(
                404,
                Calendar::t('Calendar with a handle "{handle}" could not be found', ['handle' => $handle])
            );
        }

        if ($siteHandle) {
            $site = \Craft::$app->sites->getSiteByHandle($handle);
            if (!$site) {
                throw new HttpException(
                    404,
                    Calendar::t('Site "{site}" not found', ['site' => $siteHandle])
                );
            }
        } else {
            $site = \Craft::$app->sites->currentSite;
        }

        $event             = Event::create($site->id);
        $event->calendarId = $calendar->id;

        return $this->renderEditForm($event, Calendar::t('Create a new event'));
    }

    /**
     * @param int         $id
     * @param string|null $siteHandle
     *
     * @return Response
     * @throws HttpException
     * @throws \craft\errors\SiteNotFoundException
     * @throws \yii\base\Exception
     * @throws \yii\base\InvalidConfigException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionEditEvent(int $id, string $siteHandle = null): Response
    {
        $siteId = null;
        if ($siteHandle) {
            $site = \Craft::$app->sites->getSiteByHandle($siteHandle);
            if (!$site) {
                throw new HttpException(
                    404,
                    Calendar::t('Cannot find site by handle {handle}', ['handle' => $siteHandle])
                );
            }

            $siteId = $site->id;
            $locale = $site->language;
            $locale = str_replace('_', '-', strtolower($locale));
            if (file_exists(__DIR__ . '/../Resources/js/lib/moment/locale/' . $locale . '.js')) {
                \Craft::$app->view->registerJsFile('calendar/js/lib/moment/locale/' . $locale . '.js');
            }
        }

        $event = $this->getEventsService()->getEventById($id, $siteId);

        if (!$event) {
            throw new HttpException(
                404,
                Calendar::t('Could not find an Event with ID {id}', ['id' => $id])
            );
        }

        $canManageAll = CalendarPermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR_ALL);
        if (!$canManageAll) {
            CalendarPermissionHelper::requirePermission(
                CalendarPermissionHelper::prepareNestedPermission(
                    Calendar::PERMISSION_EVENTS_FOR,
                    $event->getCalendar()->id
                )
            );
        }

        return $this->renderEditForm($event, $event->title);
    }

    /**
     * Saves an event.
     *
     * @return Response
     * @throws EventException
     * @throws HttpException
     * @throws \Throwable
     * @throws \craft\errors\SiteNotFoundException
     * @throws \yii\base\Exception
     * @throws \yii\base\InvalidConfigException
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionSaveEvent()
    {
        $this->requirePostRequest();

        $eventId = (int) \Craft::$app->request->post('eventId');
        $siteId  = (int) \Craft::$app->request->post('siteId') ?: \Craft::$app->sites->currentSite->id;
        $event   = $this->getExistingOrNewEvent($eventId, $siteId);

        $values = \Craft::$app->request->post(self::EVENT_FIELD_NAME);
        if (!$values) {
            throw new HttpException(404, 'No event data posted');
        }

        // Update authors only if Craft PRO is enabled
        // And if the author is posted.
        // If not - it stays the same
        // By default the Logged in user ID is used
        if (\Craft::$app->getEdition() === \Craft::Pro) {
            $authorList = \Craft::$app->request->post('author');
            if (\is_array($authorList) && !empty($authorList)) {
                $authorId        = (int) reset($authorList);
                $event->authorId = $authorId;
            }
        }

        $isEnabled      = (bool) \Craft::$app->request->post('enabled', $event->enabled);
        $event->enabled = $isEnabled;

        if (isset($values['calendarId'])) {
            $event->calendarId = $values['calendarId'];
        }

        $isCalendarPublic = $this->getCalendarService()->isCalendarPublic($event->getCalendar());

        $isNewAndPublic = !$event->id && !$isCalendarPublic;
        if ($eventId || $isNewAndPublic) {
            CalendarPermissionHelper::requireCalendarEditPermissions($event->getCalendar());
        }

        $dateFormat = \Craft::$app->locale->getDateFormat('short', Locale::FORMAT_PHP);
        $timeFormat = \Craft::$app->locale->getTimeFormat('short', Locale::FORMAT_PHP);
        $format     = "$dateFormat $timeFormat";

        if (isset($values['startDate'])) {
            $event->startDate = Carbon::createFromFormat(
                $format,
                $values['startDate']['date'] . ' ' . $values['startDate']['time'],
                DateHelper::UTC
            );
        }

        if (isset($values['endDate'])) {
            $event->endDate = Carbon::createFromFormat(
                $format,
                $values['endDate']['date'] . ' ' . $values['endDate']['time'],
                DateHelper::UTC
            );
        }

        if (isset($values['allDay'])) {
            $event->allDay = (bool) $values['allDay'];
        }

        if ($event->allDay && $event->startDate && $event->endDate) {
            $event->startDate->setTime(0, 0, 0);
            $event->endDate->setTime(23, 59, 59);
        }

        $startDateCarbon = $event->getStartDate();
        $endDateCarbon   = $event->getEndDate();

        if ($startDateCarbon && $endDateCarbon && $startDateCarbon->eq($endDateCarbon)) {
            $endDate = $endDateCarbon->addHour();
            $event->endDate->setTime(
                $endDate->hour,
                $endDate->minute,
                $endDate->second
            );
        }

        $this->handleRepeatRules($event, $values);

        $event->enabledForSite = (bool) \Craft::$app->request->post('enabledForSite', $event->enabledForSite);
        $event->title          = \Craft::$app->request->post('title', $event->title);
        $event->slug           = \Craft::$app->request->post('slug', $event->slug);
        $event->setFieldValuesFromRequest('fields');

        if ($this->getEventsService()->saveEvent($event)) {
            $exceptions = $values['exceptions'] ?? [];
            $this->getExceptionsService()->saveExceptions($event, $exceptions);

            $selectDates = [];
            if ($event->repeatsOnSelectDates()) {
                $selectDates = $values['selectDates'] ?? [];
            }
            Calendar::getInstance()->selectDates->saveDates($event, $selectDates);

            // Return JSON response if the request is an AJAX request
            if (\Craft::$app->request->isAjax) {
                return $this->asJson(['success' => true]);
            }

            \Craft::$app->session->setNotice(Calendar::t('Event saved.'));
            \Craft::$app->session->setFlash('calendar_event_saved');

            return $this->redirectToPostedUrl($event);
        }

        // Return JSON response if the request is an AJAX request
        if (\Craft::$app->request->isAjax) {
            return $this->asJson(['success' => false]);
        }

        \Craft::$app->session->setError(Calendar::t('Couldn’t save event.'));

        if (\Craft::$app->request->isCpRequest) {
            return $this->renderEditForm($event, $event->title ?? '');
        } else {
            \Craft::$app->urlManager->setRouteParams(['event' => $event, 'errors' => $event->getErrors()]);
        }
    }

    /**
     * Deletes an event.
     *
     * @throws \yii\web\BadRequestHttpException
     * @throws \Throwable
     */
    public function actionDeleteEvent()
    {
        $this->requireEventPermission();
        $this->requirePostRequest();

        $eventId         = \Craft::$app->request->post('eventId');
        $eventWasDeleted = $this->getEventsService()->deleteEventById($eventId);

        if ($eventWasDeleted) {
            // Return JSON response if the request is an AJAX request
            if (\Craft::$app->request->isAjax) {
                return $this->asJson(['success' => true]);
            }

            \Craft::$app->session->setNotice(Calendar::t('Event deleted.'));

            return $this->redirectToPostedUrl();
        }

        // Return JSON response if the request is an AJAX request
        if (\Craft::$app->request->isAjax) {
            return $this->asJson(['success' => false]);
        }

        \Craft::$app->session->setError(Calendar::t('Couldn’t delete event.'));
    }

    /**
     * @param Event  $event
     * @param string $title
     *
     * @return Response
     * @throws \craft\errors\SiteNotFoundException
     * @throws \yii\base\Exception
     * @throws \yii\base\InvalidConfigException
     */
    private function renderEditForm(Event $event, string $title): Response
    {
        $this->requireEventPermission();

        $calendar        = $event->getCalendar();
        $calendarOptions = $this->getCalendarService()->getAllAllowedCalendarTitles();

        $exceptions = $this->getExceptionsService()->getExceptionsForEvent($event);

        \Craft::$app->view->registerAssetBundle(EventEditBundle::class);

        $dateTimeFormats = \Craft::$app->locale->getFormatter()->dateTimeFormats;
        $dateFormat      = $dateTimeFormats[\Craft::$app->locale->getFormatter()->dateFormat]['date'];
        $timeFormat      = $dateTimeFormats[\Craft::$app->locale->getFormatter()->timeFormat]['time'];

        $dateFormat = FormatConverter::convertDateIcuToPhp($dateFormat);
        $timeFormat = FormatConverter::convertDateIcuToPhp($timeFormat, 'time');


        $enabledSiteIds = null;
        if (\Craft::$app->getIsMultiSite()) {
            if ($event->id !== null) {
                $enabledSiteIds = \Craft::$app->getElements()->getEnabledSiteIdsForElement($event->id);
            } else {
                // Set defaults based on the section settings
                $enabledSiteIds = [];

                foreach ($calendar->getSiteSettings() as $siteSettings) {
                    if ($siteSettings->enabledByDefault) {
                        $enabledSiteIds[] = $siteSettings->siteId;
                    }
                }
            }
        }

        if (\Craft::$app->getIsMultiSite()) {
            $sectionSiteIds  = array_keys($calendar->getSiteSettings());
            $editableSiteIds = \Craft::$app->getSites()->getEditableSiteIds();
            $siteIds         = array_merge(array_intersect($sectionSiteIds, $editableSiteIds));
        } else {
            $siteIds = [\Craft::$app->getSites()->getPrimarySite()->id];
        }

        // Enable Live Preview?
        $showPreviewButton = false;
        if (!\Craft::$app->getRequest()->isMobileBrowser(true) && $this->getCalendarService()->isEventTemplateValid($calendar, $event->siteId)) {
            $this->getView()->registerJs('Craft.LivePreview.init(' . Json::encode([
                    'fields'        => '#title-field, #fields .calendar-event-wrapper > .field, #fields > .field > .field',
                    'extraFields'   => '#settings',
                    'previewUrl'    => $event->getUrl(),
                    'previewAction' => 'calendar/events/preview',
                    'previewParams' => [
                        'eventId'    => $event->id,
                        'siteId'     => $event->siteId,
                        'calendarId' => $event->calendarId,
                    ],
                ]) . ');');

            $showPreviewButton = true;
        }

        $variables = [
            'name'               => self::EVENT_FIELD_NAME,
            'event'              => $event,
            'title'              => $title,
            'calendar'           => $calendar,
            'calendarOptions'    => $calendarOptions,
            'enabledSiteIds'     => $enabledSiteIds,
            'siteIds'            => $siteIds,
            'showSites'          => \Craft::$app->getIsMultiSite() && \count($calendar->getSiteSettings()) > 1,
            'userElementType'    => User::class,
            'frequencyOptions'   => RecurrenceHelper::getFrequencyOptions(),
            'repeatsByOptions'   => RecurrenceHelper::getRepeatsByOptions(),
            'weekDays'           => DateHelper::getWeekDaysShort(0, 2, true),
            'monthDays'          => DateHelper::getMonthDays(),
            'monthNames'         => DateHelper::getMonthNames(true),
            'continueEditingUrl' => 'calendar/events/{id}/{site.handle}',
            'exceptions'         => $exceptions,
            'dateFormat'         => $dateFormat,
            'timeFormat'         => $timeFormat,
            'showPreviewBtn'     => $showPreviewButton,
            'shareUrl'           => $event->getUrl() ?: null,
            'crumbs'             => [
                ['label' => Calendar::t('calendar'), 'url' => UrlHelper::cpUrl('calendar')],
                ['label' => Calendar::t('Events'), 'url' => UrlHelper::cpUrl('calendar/events')],
                [
                    'label' => $title,
                    'url'   => UrlHelper::cpUrl(
                        'calendar/events/' . ($event->id ?: 'new/' . $calendar->handle)
                    ),
                ],
            ],
        ];

        return $this->renderTemplate('calendar/events/_edit', $variables);
    }

    /**
     * Previews an entry.
     *
     * @return Response
     * @throws \yii\web\BadRequestHttpException
     * @throws ServerErrorHttpException
     * @throws NotFoundHttpException
     */
    public function actionPreview(): Response
    {
        $this->requirePostRequest();

        $event = $this->getEventModel();

        // Set the language to the user's preferred language so DateFormatter returns the right format
        \Craft::$app->updateTargetLanguage(true);

        $this->populateEventModel($event);

        // Fire a 'previewEntry' event
        if ($this->hasEventHandlers(self::EVENT_PREVIEW_EVENT)) {
            $this->trigger(self::EVENT_PREVIEW_EVENT, new ElementEvent(['element' => $event]));
        }

        return $this->showEvent($event);
    }

    /**
     * Fetches or creates an Entry.
     *
     * @return Event
     * @throws NotFoundHttpException
     */
    private function getEventModel(): Event
    {
        $eventId    = \Craft::$app->getRequest()->getBodyParam('eventId');
        $siteId     = \Craft::$app->getRequest()->getBodyParam('siteId');
        $calendarId = \Craft::$app->getRequest()->getBodyParam('calendarId');

        if ($eventId) {
            $entry = $this->getEventsService()->getEventById($eventId, $siteId);

            if (!$eventId) {
                throw new NotFoundHttpException('Event not found');
            }
        } else {
            $entry = Event::create($siteId, $calendarId);
        }

        return $entry;
    }

    /**
     * Populates an Entry with post data.
     *
     * @param Event $event
     */
    private function populateEventModel(Event $event)
    {
        $request = \Craft::$app->request;

        $eventId = $event->id;
        $values  = $request->getBodyParam(self::EVENT_FIELD_NAME);
        if (null === $values) {
            throw new HttpException('No event data posted');
        }

        $event->slug           = $request->getBodyParam('slug', $event->slug);
        $event->enabled        = (bool) $request->getBodyParam('enabled', $event->enabled);
        $event->enabledForSite = (bool) $request->getBodyParam('enabledForSite', $event->enabledForSite);
        $event->title          = $request->getBodyParam('title', $event->title);

        $event->fieldLayoutId = null;
        $fieldsLocation       = $request->getParam('fieldsLocation', 'fields');
        $event->setFieldValuesFromRequest($fieldsLocation);

        $authorId = \Craft::$app->getRequest()->getBodyParam('author', ($event->authorId ?: \Craft::$app->getUser()->getIdentity()->id));
        if (\is_array($authorId)) {
            $authorId        = $authorId[0] ?? null;
            $event->authorId = $authorId;
        }

        $event->enabled = (bool) $request->post('enabled', $event->enabled);

        if (isset($values['calendarId'])) {
            $event->calendarId = $values['calendarId'];
        }

        $isCalendarPublic = Calendar::getInstance()->calendars->isCalendarPublic($event->getCalendar());

        $isNewAndPublic = !$event->id && !$isCalendarPublic;
        if ($eventId || $isNewAndPublic) {
            CalendarPermissionHelper::requireCalendarEditPermissions($event->getCalendar());
        }

        if (isset($values['startDate'])) {
            $event->startDate = new Carbon($values['startDate']['date'] . ' ' . $values['startDate']['time'], DateHelper::UTC);
        }

        if (isset($values['endDate'])) {
            $event->endDate = new Carbon($values['endDate']['date'] . ' ' . $values['endDate']['time'], DateHelper::UTC);
        }

        if (isset($values['allDay'])) {
            $event->allDay = (bool) $values['allDay'];
        }

        if ($event->allDay && $event->startDate && $event->endDate) {
            $event->startDate->setTime(0, 0, 0);
            $event->endDate->setTime(23, 59, 59);
        }

        $startDate = $event->getStartDate();
        $endDate   = $event->getEndDate();

        if ($startDate && $endDate && $startDate->eq($endDate)) {
            $endDate = $endDate->addHour();
            $event->endDate->setTime(
                $endDate->hour,
                $endDate->minute,
                $endDate->second
            );
        }

        $this->handleRepeatRules($event, $values);

        if (isset($values['exceptions'])) {
            foreach ($values['exceptions'] as $date) {
                $exception          = new ExceptionModel();
                $exception->eventId = $event->id;
                $exception->date    = new Carbon($date, DateHelper::UTC);

                $event->addException($exception);
            }
        }

        if (isset($values['selectDates'])) {
            foreach ($values['selectDates'] as $date) {
                $selectDate          = new SelectDateModel();
                $selectDate->eventId = $event->id;
                $selectDate->date    = new Carbon($date, DateHelper::UTC);

                $event->addSelectDate($selectDate);
            }
        }
    }

    /**
     * Displays an entry.
     *
     * @param Event $event
     *
     * @return Response
     * @throws ServerErrorHttpException
     */
    private function showEvent(Event $event): Response
    {
        $siteSettings = $event->getCalendar()->getSiteSettingsForSite($event->siteId);

        if (!$siteSettings || !$siteSettings->hasUrls) {
            throw new ServerErrorHttpException('The event ' . $event->id . ' doesn’t have a URL for the site ' . $event->siteId . '.');
        }

        $site = \Craft::$app->getSites()->getSiteById($event->siteId);

        if (!$site) {
            throw new ServerErrorHttpException('Invalid site ID: ' . $event->siteId);
        }

        \Craft::$app->language = $site->language;

        // Have this entry override any freshly queried entries with the same ID/site ID
        \Craft::$app->getElements()->setPlaceholderElement($event);
        $this->getView()->getTwig()->disableStrictVariables();

        return $this->renderTemplate($siteSettings->template, ['event' => $event]);
    }

    /**
     * @param int $eventId
     * @param int $siteId
     *
     * @return Event
     * @throws \Exception
     */
    private function getExistingOrNewEvent(int $eventId = null, int $siteId = null): Event
    {
        if ($eventId) {
            $event = $this->getEventsService()->getEventById($eventId, $siteId);

            if (!$event) {
                throw new HttpException(
                    404,
                    Calendar::t('Could not find an Event with ID {id}', ['id' => $eventId])
                );
            }
        } else {
            $event = Event::create($siteId);
        }

        return $event;
    }

    /**
     * Parses the $postedValues and extracts recurrence rules if there are any
     * Updates the $event model
     *
     * @param Event $event
     * @param array $postedValues
     *
     * @throws EventException
     */
    private function handleRepeatRules(Event $event, array $postedValues)
    {
        if (!isset($postedValues['repeats'])) {
            return;
        }

        $event->rrule      = null;
        $event->freq       = null;
        $event->interval   = null;
        $event->until      = null;
        $event->count      = null;
        $event->byDay      = null;
        $event->byMonth    = null;
        $event->byMonthDay = null;
        $event->byYearDay  = null;

        if (!$postedValues['repeats']) {
            return;
        }

        $selectedFrequency = $postedValues['frequency'];
        $selectedInterval  = abs((int) $postedValues['interval']);

        if ($selectedInterval < 1) {
            $event->addError('interval', Calendar::t('Event interval must be a positive number'));

            return;
        }

        $event->freq = $selectedFrequency;

        if ($selectedFrequency === RecurrenceHelper::SELECT_DATES) {
            return;
        }

        $event->interval = $selectedInterval;

        $untilType = $postedValues['untilType'] ?? Event::UNTIL_TYPE_FOREVER;
        if ($untilType === Event::UNTIL_TYPE_UNTIL) {
            $until = null;
            if (isset($postedValues['untilDate']['date']) && $postedValues['untilDate']['date']) {
                $until = Carbon::createFromFormat(
                    \Craft::$app->locale->getDateFormat('short', Locale::FORMAT_PHP),
                    $postedValues['untilDate']['date'],
                    DateHelper::UTC
                );
                $until->setTime(23, 59, 59);
                $event->until = $until;
            } else {
                $event->addError('untilType', Calendar::t('End repeat date must be specified'));
            }
        } else {
            if ($untilType === Event::UNTIL_TYPE_COUNT) {
                $count = isset($postedValues['count']) ? (int) $postedValues['count'] : 0;
                if ($count) {
                    $event->count = $count;
                } else {
                    $event->addError('untilType', Calendar::t('End repeat count must be specified'));
                }
            }
        }


        switch ($event->freq) {
            case RecurrenceHelper::DAILY:
                break;

            case RecurrenceHelper::WEEKLY:
                if (!isset($postedValues['weekly']['repeatsByWeekDay'])) {
                    $event->addError('byDay', Calendar::t('Event repeat rules not specified'));

                    return;
                }

                $repeatsByWeekDay = $postedValues['weekly']['repeatsByWeekDay'];
                $event->byDay     = !empty($repeatsByWeekDay) ? implode(',', $repeatsByWeekDay) : null;
                break;

            case RecurrenceHelper::MONTHLY:
                $repeatsBy = $postedValues['monthly']['repeatsBy'];

                if ($repeatsBy === 'byDay') {
                    if (!isset($postedValues['monthly']['repeatsByWeekDay'], $postedValues['monthly']['repeatsByDayInterval'])) {
                        $event->addError('byDay', Calendar::t('Event repeat rules not specified'));

                        return;
                    }
                    $repeatsByWeekDay     = $postedValues['monthly']['repeatsByWeekDay'];
                    $repeatsByDayInterval = (int) $postedValues['monthly']['repeatsByDayInterval'];

                    $repeatsByWeekDay = array_map(
                        function ($value) use ($repeatsByDayInterval) {
                            return sprintf('%d%s', $repeatsByDayInterval, $value);
                        },
                        $repeatsByWeekDay
                    );

                    $event->byDay = !empty($repeatsByWeekDay) ? implode(',', $repeatsByWeekDay) : null;
                } else {
                    if ($repeatsBy === 'byMonthDay') {
                        $repeatsByMonthDay = $postedValues['monthly']['repeatsByMonthDay'];
                        $event->byMonthDay = !empty($repeatsByMonthDay) ? implode(',', $repeatsByMonthDay) : null;
                    }
                }

                break;

            case RecurrenceHelper::YEARLY:
                $repeatsByDay = isset($postedValues['yearly']['repeatsBy']) && $postedValues['yearly']['repeatsBy'] === 'byDay';

                if ($repeatsByDay) {
                    if (!isset($postedValues['yearly']['repeatsByWeekDay'], $postedValues['yearly']['repeatsByMonth'])) {
                        $event->addError('byDay', Calendar::t('Event repeat rules not specified'));

                        return;
                    }

                    $repeatsByDayInterval = (int) $postedValues['yearly']['repeatsByDayInterval'];
                    $repeatsByWeekDay     = $postedValues['yearly']['repeatsByWeekDay'];
                    $repeatsByMonth       = $postedValues['yearly']['repeatsByMonth'];

                    if (\is_array($repeatsByWeekDay)) {
                        $repeatsByWeekDay = array_map(
                            function ($value) use ($repeatsByDayInterval) {
                                return sprintf('%d%s', $repeatsByDayInterval, $value);
                            },
                            $repeatsByWeekDay
                        );
                    }

                    $event->byDay   = !empty($repeatsByWeekDay) ? implode(',', $repeatsByWeekDay) : null;
                    $event->byMonth = !empty($repeatsByMonth) ? implode(',', $repeatsByMonth) : null;
                }

                break;

            default:
                throw new EventException(sprintf("Frequency type '%s' not recognized", $event->freq));
        }

        $event->rrule = $event->getRRuleRFCString();
    }

    /**
     * Triggers a 404 if there are no event edit permissions for the current user
     */
    private function requireEventPermission()
    {
        $hasPermission = CalendarPermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR, true);

        if (!$hasPermission) {
            CalendarPermissionHelper::requirePermission('trigger-calendar-event-access-denied');
        }
    }
}
