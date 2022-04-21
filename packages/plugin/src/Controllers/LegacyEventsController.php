<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\base\Element;
use craft\db\Query;
use craft\elements\User;
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
use yii\web\Response;
use yii\web\ServerErrorHttpException;

class LegacyEventsController extends EventsController
{
    /**
     * Saves an event.
     *
     * @throws EventException
     * @throws HttpException
     * @throws \Throwable
     * @throws \craft\errors\SiteNotFoundException
     * @throws \yii\base\Exception
     * @throws \yii\base\InvalidConfigException
     * @throws \yii\web\BadRequestHttpException
     *
     * @return Response
     */
    public function actionSaveEvent()
    {
        $this->requirePostRequest();

        $eventId = (int) \Craft::$app->request->post('eventId');
        $siteId = (int) \Craft::$app->request->post('siteId') ?: \Craft::$app->sites->currentSite->id;
        $event = $this->getExistingOrNewEvent($eventId, $siteId);

        $values = \Craft::$app->request->post(self::EVENT_FIELD_NAME);
        if (!$values) {
            throw new HttpException(404, 'No event data posted');
        }

        // Update authors only if Craft PRO is enabled
        // And if the author is posted.
        // If not - it stays the same
        // By default the Logged in user ID is used
        if (\Craft::Pro === \Craft::$app->getEdition()) {
            $authorList = \Craft::$app->request->post('author');
            if (\is_array($authorList) && !empty($authorList)) {
                $authorId = (int) reset($authorList);
                $event->authorId = $authorId;
            }
        }

        if (!$event->authorId) {
            $event->authorId = (int) (new Query())
                ->select('id')
                ->from('{{%users}}')
                ->where(['admin' => 1])
                ->limit(1)
                ->orderBy(['id' => \SORT_ASC])
                ->scalar()
            ;
        }

        $isEnabled = (bool) \Craft::$app->request->post('enabled', $event->enabled);
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
        $format = "{$dateFormat} {$timeFormat}";

        if (isset($values['startDate'])) {
            try {
                $event->startDate = Carbon::createFromFormat(
                    $format,
                    $values['startDate']['date'].' '.$values['startDate']['time'],
                    DateHelper::UTC
                );
            } catch (\InvalidArgumentException $exception) {
                $event->startDate = null;
            }
        }

        if (isset($values['endDate'])) {
            try {
                $event->endDate = Carbon::createFromFormat(
                    $format,
                    $values['endDate']['date'].' '.$values['endDate']['time'],
                    DateHelper::UTC
                );
            } catch (\InvalidArgumentException $e) {
                $event->endDate = null;
            }
        }

        if (isset($values['allDay'])) {
            $event->allDay = (bool) $values['allDay'];
        }

        if ($event->allDay && $event->startDate && $event->endDate) {
            $event->startDate->setTime(0, 0, 0);
            $event->endDate->setTime(23, 59, 59);
        }

        if (empty($values['multiDay'])) {
            $event->endDate->setDate($event->startDate->year, $event->startDate->month, $event->startDate->day);
        }

        $startDateCarbon = $event->getStartDate();
        $endDateCarbon = $event->getEndDate();

        if ($startDateCarbon && $endDateCarbon && $startDateCarbon->eq($endDateCarbon)) {
            $endDate = $endDateCarbon->addHour();
            $event->endDate->setTime(
                $endDate->hour,
                $endDate->minute,
                $endDate->second
            );
        }

        if ($event->getStartDate()) {
            $event->startDateLocalized = new Carbon($event->getStartDate()->toDateTimeString());
            $event->initialStartDate = $event->getStartDate()->copy();
        }

        if ($event->getEndDate()) {
            $event->endDateLocalized = new Carbon($event->getEndDate()->toDateTimeString());
            $event->initialEndDate = $event->getEndDate()->copy();
        }

        $this->handleRepeatRules($event, $values);

        $enabledForSite = (bool) \Craft::$app->request->post('enabledForSite', $event->enabledForSite);

        $event->enabledForSite = $enabledForSite ? '1' : '0';
        $event->title = \Craft::$app->request->post('title', $event->title);
        $event->slug = \Craft::$app->request->post('slug', $event->slug);
        $event->setFieldValuesFromRequest('fields');

        // Save the entry (finally!)
        if ($event->enabled && $event->enabledForSite) {
            $event->setScenario(Element::SCENARIO_LIVE);
        }

        if ($event->repeatsOnSelectDates()) {
            $event->setSelectDates($values['selectDates'] ?? []);
            $event->setExceptions([]);
        } else {
            $event->setExceptions($values['exceptions'] ?? []);
        }

        if ($this->getEventsService()->saveEvent($event)) {
            $event->siteId = $siteId;

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
        }

        \Craft::$app->urlManager->setRouteParams(['event' => $event, 'errors' => $event->getErrors()]);
    }

    /**
     * @throws \craft\errors\SiteNotFoundException
     * @throws \yii\base\Exception
     * @throws \yii\base\InvalidConfigException
     */
    private function renderEditForm(Event $event, string $title): Response
    {
        $this->requireEventPermission();

        $calendar = $event->getCalendar();
        $calendarOptions = $this->getCalendarService()->getAllAllowedCalendarTitles();

        $exceptions = $this->getExceptionsService()->getExceptionsForEvent($event);

        \Craft::$app->view->registerAssetBundle(EventEditBundle::class);

        $dateTimeFormats = \Craft::$app->locale->getFormatter()->dateTimeFormats;
        $dateFormat = $dateTimeFormats[\Craft::$app->locale->getFormatter()->dateFormat]['date'];
        $timeFormat = $dateTimeFormats[\Craft::$app->locale->getFormatter()->timeFormat]['time'];

        $dateFormat = FormatConverter::convertDateIcuToPhp($dateFormat);
        $timeFormat = FormatConverter::convertDateIcuToPhp($timeFormat, 'time');

        $enabledSiteIds = null;
        if (\Craft::$app->getIsMultiSite()) {
            if (null !== $event->id) {
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
            $sectionSiteIds = array_keys($calendar->getSiteSettings());
            $editableSiteIds = \Craft::$app->getSites()->getEditableSiteIds();
            $siteIds = array_merge(array_intersect($sectionSiteIds, $editableSiteIds));
        } else {
            $siteIds = [\Craft::$app->getSites()->getPrimarySite()->id];
        }

        if (!$event->enabled) {
            $enabledSiteIds = [];
        }

        $previewActionUrl = 'calendar/events/preview';
        if (version_compare(\Craft::$app->getVersion(), '3.1', '>=')) {
            $previewActionUrl = \Craft::$app->getSecurity()->hashData($previewActionUrl);
        }

        // Enable Live Preview?
        $showPreviewButton = false;
        if (!\Craft::$app->getRequest()->isMobileBrowser(true) && $this->getCalendarService()->isEventTemplateValid($calendar, $event->siteId)) {
            $this->getView()->registerJs('Craft.LivePreview.init('.Json::encode([
                'fields' => '#title-field, #fields .calendar-event-wrapper > .field, #fields > .field > .field',
                'extraFields' => '#settings',
                'previewUrl' => $event->getUrl(),
                'previewAction' => $previewActionUrl,
                'previewParams' => [
                    'eventId' => $event->id,
                    'siteId' => $event->siteId,
                    'calendarId' => $event->calendarId,
                ],
            ]).');');

            $showPreviewButton = true;
        }

        $shareUrl = null;
        if ($event->enabled) {
            $shareUrl = $event->getUrl();
        } else {
            $shareUrl = UrlHelper::actionUrl(
                'calendar/events/share-event',
                [
                    'eventId' => $event->getId(),
                    'siteId' => $event->siteId,
                ]
            );
        }

        $weekStartDay = $this->getSettingsService()->getFirstDayOfWeek();
        $variables = [
            'name' => self::EVENT_FIELD_NAME,
            'event' => $event,
            'title' => $title,
            'calendar' => $calendar,
            'calendarOptions' => $calendarOptions,
            'enabledSiteIds' => $enabledSiteIds,
            'siteIds' => $siteIds,
            'showSites' => \Craft::$app->getIsMultiSite() && \count($calendar->getSiteSettings()) > 1,
            'userElementType' => User::class,
            'frequencyOptions' => RecurrenceHelper::getFrequencyOptions(),
            'repeatsByOptions' => RecurrenceHelper::getRepeatsByOptions(),
            'weekDays' => DateHelper::getWeekDaysShort($weekStartDay, 2, true),
            'monthDays' => DateHelper::getMonthDays(),
            'monthNames' => DateHelper::getMonthNames(true),
            'weekStartDay' => $weekStartDay,
            'continueEditingUrl' => 'calendar/events/{id}/{site.handle}',
            'exceptions' => $exceptions,
            'dateFormat' => $dateFormat,
            'timeFormat' => $timeFormat,
            'showPreviewBtn' => $showPreviewButton,
            'shareUrl' => $shareUrl,
            'site' => $event->getSite(),
        ];

        return $this->renderTemplate('calendar/events/_edit', $variables);
    }

    /**
     * Populates an Entry with post data.
     */
    private function populateEventModel(Event $event)
    {
        $request = \Craft::$app->request;

        $eventId = $event->id;
        $values = $request->getBodyParam(self::EVENT_FIELD_NAME);
        if (null === $values) {
            throw new HttpException('No event data posted');
        }

        $event->slug = $request->getBodyParam('slug', $event->slug);
        $event->enabled = (bool) $request->getBodyParam('enabled', $event->enabled);
        $event->enabledForSite = (bool) $request->getBodyParam('enabledForSite', $event->enabledForSite);
        $event->title = $request->getBodyParam('title', $event->title);

        $event->fieldLayoutId = null;
        $fieldsLocation = $request->getParam('fieldsLocation', 'fields');
        $event->setFieldValuesFromRequest($fieldsLocation);

        $authorId = \Craft::$app->getRequest()->getBodyParam('author', ($event->authorId ?: \Craft::$app->getUser()->getIdentity()->id));
        if (\is_array($authorId)) {
            $authorId = $authorId[0] ?? null;
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

        $dateFormat = \Craft::$app->locale->getDateFormat('short', Locale::FORMAT_PHP);
        $timeFormat = \Craft::$app->locale->getTimeFormat('short', Locale::FORMAT_PHP);
        $format = "{$dateFormat} {$timeFormat}";

        if (isset($values['startDate'])) {
            try {
                $event->startDate = Carbon::createFromFormat(
                    $format,
                    $values['startDate']['date'].' '.$values['startDate']['time'],
                    DateHelper::UTC
                );
            } catch (\InvalidArgumentException $exception) {
                $event->startDate = null;
            }
        }

        if (isset($values['endDate'])) {
            try {
                $event->endDate = Carbon::createFromFormat(
                    $format,
                    $values['endDate']['date'].' '.$values['endDate']['time'],
                    DateHelper::UTC
                );
            } catch (\InvalidArgumentException $e) {
                $event->endDate = null;
            }
        }

        if (isset($values['allDay'])) {
            $event->allDay = (bool) $values['allDay'];
        }

        if ($event->allDay && $event->startDate && $event->endDate) {
            $event->startDate->setTime(0, 0, 0);
            $event->endDate->setTime(23, 59, 59);
        }

        $startDate = $event->getStartDate();
        $endDate = $event->getEndDate();

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
            $existingExceptions = $event->getExceptionDateStrings();
            foreach ($values['exceptions'] as $date) {
                if (\in_array($date, $existingExceptions, true)) {
                    continue;
                }

                $exception = new ExceptionModel();
                $exception->eventId = $event->id;
                $exception->date = Carbon::createFromTimestampUTC(strtotime($date));

                $event->addException($exception);
            }
        }

        if (isset($values['selectDates'])) {
            $existingSelectDates = $event->getSelectDatesAsString();
            foreach ($values['selectDates'] as $date) {
                if (\in_array($date, $existingSelectDates, true)) {
                    continue;
                }

                $selectDate = new SelectDateModel();
                $selectDate->eventId = $event->id;
                $selectDate->date = Carbon::createFromTimestampUTC(strtotime($date));

                $event->addSelectDate($selectDate);
            }
        }
    }

    /**
     * Displays an entry.
     *
     * @throws ServerErrorHttpException
     */
    private function showEvent(Event $event): Response
    {
        $siteSettings = $event->getCalendar()->getSiteSettingsForSite($event->siteId);

        if (!$siteSettings || !$siteSettings->hasUrls) {
            throw new ServerErrorHttpException('The event '.$event->id.' doesn’t have a URL for the site '.$event->siteId.'.');
        }

        $site = \Craft::$app->getSites()->getSiteById($event->siteId);

        if (!$site) {
            throw new ServerErrorHttpException('Invalid site ID: '.$event->siteId);
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
     * @throws \Exception
     */
    private function getExistingOrNewEvent(int $eventId = null, int $siteId = null): Event
    {
        if ($eventId) {
            $event = $this->getEventsService()->getEventById($eventId, $siteId, true);

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
     * Updates the $event model.
     *
     * @throws EventException
     */
    private function handleRepeatRules(Event $event, array $postedValues)
    {
        if (!isset($postedValues['repeats'])) {
            return;
        }

        $event->rrule = null;
        $event->freq = null;
        $event->interval = null;
        $event->until = null;
        $event->count = null;
        $event->byDay = null;
        $event->byMonth = null;
        $event->byMonthDay = null;
        $event->byYearDay = null;

        if (!$postedValues['repeats']) {
            return;
        }

        $selectedFrequency = $postedValues['frequency'];
        $selectedInterval = abs((int) $postedValues['interval']);

        if ($selectedInterval < 1) {
            $event->addError('interval', Calendar::t('Event interval must be a positive number'));

            return;
        }

        $event->freq = $selectedFrequency;

        if (RecurrenceHelper::SELECT_DATES === $selectedFrequency) {
            return;
        }

        $event->interval = $selectedInterval;

        $untilType = $postedValues['untilType'] ?? Event::UNTIL_TYPE_FOREVER;
        if (Event::UNTIL_TYPE_UNTIL === $untilType) {
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
        } elseif (Event::UNTIL_TYPE_AFTER === $untilType) {
            $count = isset($postedValues['count']) ? (int) $postedValues['count'] : 0;
            if ($count) {
                $event->count = $count;
            } else {
                $event->addError('untilType', Calendar::t('End repeat count must be specified'));
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
                $event->byDay = !empty($repeatsByWeekDay) ? implode(',', $repeatsByWeekDay) : null;

                break;

            case RecurrenceHelper::MONTHLY:
                $repeatsBy = $postedValues['monthly']['repeatsBy'];

                if ('byDay' === $repeatsBy) {
                    if (!isset($postedValues['monthly']['repeatsByWeekDay'], $postedValues['monthly']['repeatsByDayInterval'])) {
                        $event->addError('byDay', Calendar::t('Event repeat rules not specified'));

                        return;
                    }
                    $repeatsByWeekDay = $postedValues['monthly']['repeatsByWeekDay'];
                    $repeatsByDayInterval = (int) $postedValues['monthly']['repeatsByDayInterval'];

                    $repeatsByWeekDay = array_map(
                        function ($value) use ($repeatsByDayInterval) {
                            return sprintf('%d%s', $repeatsByDayInterval, $value);
                        },
                        $repeatsByWeekDay
                    );

                    $event->byDay = !empty($repeatsByWeekDay) ? implode(',', $repeatsByWeekDay) : null;
                } elseif ('byMonthDay' === $repeatsBy) {
                    $repeatsByMonthDay = $postedValues['monthly']['repeatsByMonthDay'];
                    $event->byMonthDay = !empty($repeatsByMonthDay) ? implode(',', $repeatsByMonthDay) : null;
                }

                break;

            case RecurrenceHelper::YEARLY:
                $repeatsByDay = isset($postedValues['yearly']['repeatsBy']) && 'byDay' === $postedValues['yearly']['repeatsBy'];

                if ($repeatsByDay) {
                    if (!isset($postedValues['yearly']['repeatsByWeekDay'], $postedValues['yearly']['repeatsByMonth'])) {
                        $event->addError('byDay', Calendar::t('Event repeat rules not specified'));

                        return;
                    }

                    $repeatsByDayInterval = (int) $postedValues['yearly']['repeatsByDayInterval'];
                    $repeatsByWeekDay = $postedValues['yearly']['repeatsByWeekDay'];
                    $repeatsByMonth = $postedValues['yearly']['repeatsByMonth'];

                    if (\is_array($repeatsByWeekDay)) {
                        $repeatsByWeekDay = array_map(
                            function ($value) use ($repeatsByDayInterval) {
                                return sprintf('%d%s', $repeatsByDayInterval, $value);
                            },
                            $repeatsByWeekDay
                        );
                    }

                    $event->byDay = !empty($repeatsByWeekDay) ? implode(',', $repeatsByWeekDay) : null;
                    $event->byMonth = !empty($repeatsByMonth) ? implode(',', $repeatsByMonth) : null;
                }

                break;

            default:
                throw new EventException(sprintf("Frequency type '%s' not recognized", $event->freq));
        }

        $event->rrule = $event->getRRuleRFCString();
    }
}
