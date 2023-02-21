<?php

namespace Solspace\Calendar\Controllers;

use Carbon\Carbon;
use craft\base\Element;
use craft\db\Query;
use craft\elements\User;
use craft\events\ElementEvent;
use craft\helpers\DateTimeHelper;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\i18n\Locale;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\CalendarPermissionHelper;
use Solspace\Calendar\Library\Exceptions\EventException;
use Solspace\Calendar\Library\Transformers\EventToUiDataTransformer;
use Solspace\Calendar\Library\Transformers\UiDataToEventTransformer;
use Solspace\Calendar\Resources\Bundles\EventEditBundle;
use Solspace\Calendar\Resources\Bundles\EventIndexBundle;
use yii\db\Exception;
use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use yii\web\ServerErrorHttpException;

class EventsController extends BaseController
{
    const EVENT_FIELD_NAME = 'calendarEvent';
    const EVENT_PREVIEW_EVENT = 'previewEvent';

    protected $allowAnonymous = ['save-event', 'view-shared-event'];

    public function actionEventsIndex(): Response
    {
        $this->requireEventPermission();

        \Craft::$app->view->registerAssetBundle(EventIndexBundle::class);

        return $this->renderTemplate(
            'calendar/events/_index',
            [
                'calendars' => Calendar::getInstance()->calendars->getAllAllowedCalendars(),
            ]
        );
    }

    /**
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
            $site = \Craft::$app->sites->getSiteByHandle($siteHandle);
            if (!$site) {
                throw new HttpException(
                    404,
                    Calendar::t('Site "{site}" not found', ['site' => $siteHandle])
                );
            }
        } else {
            // Set defaults based on the section settings
            $enabledSiteIds = [];
            foreach ($calendar->getSiteSettings() as $siteSettings) {
                if ($siteSettings->enabledByDefault) {
                    $enabledSiteIds[] = $siteSettings->siteId;
                }
            }

            if ($enabledSiteIds) {
                $siteId = reset($enabledSiteIds);
                $site = \Craft::$app->sites->getSiteById($siteId);
            } else {
                $site = \Craft::$app->sites->currentSite;
            }
        }

        $locale = $site->language;
        $locale = str_replace('_', '-', strtolower($locale));

        EventEditBundle::$locale = $locale;

        $event = Event::create($site->id);
        $event->calendarId = $calendar->id;

        if (!\Craft::$app->getIsMultiSite()) {
            $enabledSiteIds = [];
            foreach ($calendar->getSiteSettings() as $siteSettings) {
                if ($siteSettings->enabledByDefault) {
                    $enabledSiteIds[] = $siteSettings->siteId;
                }
            }

            $event->enabled = \in_array(\Craft::$app->sites->currentSite->id, $enabledSiteIds, false);
        }

        return $this->renderEditForm($event, Calendar::t('Create a new event'));
    }

    /**
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

            EventEditBundle::$locale = $locale;
        }

        $event = $this->getEventsService()->getEventById($id, $siteId, true);

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
                    $event->getCalendar()->uid
                )
            );
        }

        return $this->renderEditForm($event, $event->title);
    }

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
        $postDate = \Craft::$app->request->post('postDate');
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

        $enabledForSite = (bool) \Craft::$app->request->post('enabledForSite', $event->enabledForSite);

        $event->enabledForSite = $enabledForSite ? '1' : '0';
        $event->title = \Craft::$app->request->post('title', $event->title);
        $event->slug = \Craft::$app->request->post('slug', $event->slug);
        $event->setFieldValuesFromRequest('fields');
        $event->setEvent_builder_data(\Craft::$app->request->post('event_builder_data', '[]'));

        if ($postDate) {
            $date = $postDate['date'];
            $time = $postDate['time'];

            if ($date) {
                $event->postDate = DateTimeHelper::toDateTime(['date' => $date, 'time' => $time], true);
            } else {
                $event->postDate = new Carbon();
            }
        }

        // Save the entry (finally!)
        if ($event->enabled && $event->enabledForSite) {
            $event->setScenario(Element::SCENARIO_LIVE);
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
     * Deletes an event.
     *
     * @throws \yii\web\BadRequestHttpException
     * @throws \Throwable
     */
    public function actionDeleteEvent()
    {
        $this->requireEventPermission();
        $this->requirePostRequest();

        $eventId = \Craft::$app->request->post('eventId');

        $event = $this->getEventsService()->getEventById($eventId, null, true);

        if (!$event) {
            return false;
        }

        $eventWasDeleted = $this->getEventsService()->deleteEvent($event);

        if ($eventWasDeleted) {
            // Return JSON response if the request is an AJAX request
            if (\Craft::$app->request->isAjax) {
                return $this->asJson(['success' => true]);
            }

            \Craft::$app->session->setNotice(Calendar::t('Event deleted.'));

            return $this->redirectToPostedUrl($event);
        }

        // Return JSON response if the request is an AJAX request
        if (\Craft::$app->request->isAjax) {
            return $this->asJson(['success' => false]);
        }

        \Craft::$app->session->setError(Calendar::t('Couldn’t delete event.'));

        return false;
    }

    /**
     * @throws NotFoundHttpException
     */
    public function actionShareEvent(int $eventId, int $siteId): Response
    {
        $event = $this->getEventsService()->getEventById($eventId, $siteId, true);
        if (!$event) {
            throw new NotFoundHttpException('Entry not found');
        }

        $params = ['eventId' => $eventId, 'siteId' => $siteId];

        // Create the token and redirect to the entry URL with the token in place
        $token = \Craft::$app->getTokens()->createToken(['calendar/events/view-shared-event', $params]);

        if (false === $token) {
            throw new Exception('There was a problem generating the token.');
        }

        $url = UrlHelper::urlWithToken($event->getUrl(), $token);

        return \Craft::$app->getResponse()->redirect($url);
    }

    /**
     * @throws NotFoundHttpException
     * @throws ServerErrorHttpException
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionViewSharedEvent(int $eventId = null, int $siteId = null): Response
    {
        $this->requireToken();

        $event = $this->getEventsService()->getEventById($eventId, $siteId, true);
        if (!$event) {
            throw new NotFoundHttpException('Event not found');
        }

        return $this->showEvent($event);
    }

    /**
     * Previews an entry.
     *
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
     * @throws \craft\errors\SiteNotFoundException
     * @throws \yii\base\Exception
     * @throws \yii\base\InvalidConfigException
     */
    private function renderEditForm(Event $event, string $title): Response
    {
        $this->requireEventPermission();

        $calendar = $event->getCalendar();
        $calendarOptions = $this->getCalendarService()->getAllAllowedCalendarTitles();

        \Craft::$app->view->registerAssetBundle(EventEditBundle::class);

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
        if (!\Craft::$app->getRequest()->isMobileBrowser(true) && $this->getCalendarService()->isEventTemplateValid($calendar, $event->siteId) && null !== $event->id) {
            $previewUrl = $event->getUrl();
            $this->getView()->registerJs('Craft.LivePreview.init('.Json::encode([
                'fields' => '#title-field, #event-builder-data, #event-builder, #fields .calendar-event-wrapper > .field, #fields > .field > .field, #fields > .flex-fields > .field',
                'extraFields' => '#settings',
                'previewUrl' => $previewUrl,
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

        if (\Craft::$app->request->getIsCpRequest()) {
            \Craft::$app->view->registerTranslations(
                Calendar::TRANSLATION_CATEGORY,
                [
                    'On the following days',
                    'On the First',
                    'On the Second',
                    'On the Third',
                    'On the Fourth',
                    'On the Last',
                    'On the same day',
                    'End Repeat',
                    'Except On',
                    'Date',
                    'Today',
                    'All Day',
                    'Multi-Day',
                    'Day(s)',
                    'Week(s)',
                    'Month(s)',
                    'Year(s)',
                    'Select dates',
                    'Never',
                    'On Date',
                    'After',
                    'Times',
                    'Repeats',
                    'Every',
                    'On',
                ]
            );
        }

        $template = 'calendar/events/_edit';
        if (version_compare(\Craft::$app->getVersion(), '3.5', '<')) {
            $template = 'calendar/events/_edit_legacy';
        }

        return $this->renderTemplate(
            $template,
            [
                'name' => self::EVENT_FIELD_NAME,
                'event' => $event,
                'title' => $title,
                'calendar' => $calendar,
                'calendarOptions' => $calendarOptions,
                'enabledSiteIds' => $enabledSiteIds,
                'siteIds' => $siteIds,
                'showSites' => \Craft::$app->getIsMultiSite() && \count($calendar->getSiteSettings()) > 1,
                'userElementType' => User::class,
                'continueEditingUrl' => 'calendar/events/{id}/{site.handle}',
                'showPreviewBtn' => $showPreviewButton,
                'shareUrl' => $shareUrl,
                'site' => $event->getSite(),
                'eventData' => (new EventToUiDataTransformer($event))->transform(),
                'eventConfig' => [
                    'timeFormat' => Calendar::getInstance()->formats->getTimeFormat(Locale::LENGTH_SHORT),
                    'dateFormat' => Calendar::getInstance()->formats->getDateFormat(Locale::LENGTH_SHORT),
                    'timeInterval' => Calendar::getInstance()->settings->getTimeInterval(),
                    'eventDuration' => Calendar::getInstance()->settings->getEventDuration(),
                    'locale' => \Craft::$app->getSites()->getCurrentSite()->language,
                    'firstDayOfWeek' => $this->getSettingsService()->getFirstDayOfWeek(),
                    'isNewEvent' => !$event->id,
                ],
            ]
        );
    }

    /**
     * Fetches or creates an Entry.
     *
     * @throws NotFoundHttpException
     */
    private function getEventModel(): Event
    {
        $eventId = \Craft::$app->getRequest()->getBodyParam('eventId');
        $siteId = \Craft::$app->getRequest()->getBodyParam('siteId');
        $calendarId = \Craft::$app->getRequest()->getBodyParam('calendarId');

        if ($eventId) {
            $entry = $this->getEventsService()->getEventById($eventId, $siteId, true);

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
     */
    private function populateEventModel(Event $event)
    {
        $request = \Craft::$app->request;

        $eventId = $event->id;

        $event->slug = $request->getBodyParam('slug', $event->slug);
        $event->enabled = (bool) $request->getBodyParam('enabled', $event->enabled);
        $event->enabledForSite = (bool) $request->getBodyParam('enabledForSite', $event->enabledForSite);
        $event->title = $request->getBodyParam('title', $event->title);
        $event->calendarId = $request->getBodyParam('calendarId', $event->calendarId);

        $event->fieldLayoutId = null;
        $fieldsLocation = $request->getParam('fieldsLocation', 'fields');
        $event->setFieldValuesFromRequest($fieldsLocation);

        $authorId = \Craft::$app->getRequest()->getBodyParam('author', ($event->authorId ?: \Craft::$app->getUser()->getIdentity()->id));
        if (\is_array($authorId)) {
            $authorId = $authorId[0] ?? null;
            $event->authorId = $authorId;
        }

        $event->enabled = (bool) $request->post('enabled', $event->enabled);

        $isCalendarPublic = Calendar::getInstance()->calendars->isCalendarPublic($event->getCalendar());

        $isNewAndPublic = !$event->id && !$isCalendarPublic;
        if ($eventId || $isNewAndPublic) {
            CalendarPermissionHelper::requireCalendarEditPermissions($event->getCalendar());
        }

        $eventBuilderData = \GuzzleHttp\json_decode(
            \Craft::$app->request->post('event_builder_data', '[]'),
            true
        );

        $transformer = new UiDataToEventTransformer($event, $eventBuilderData);
        $transformer->transform();
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
     * Triggers a 404 if there are no event edit permissions for the current user.
     */
    private function requireEventPermission()
    {
        $hasPermission = CalendarPermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR, true);

        if (!$hasPermission) {
            CalendarPermissionHelper::requirePermission('trigger-calendar-event-access-denied');
        }
    }
}
