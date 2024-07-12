<?php

namespace Solspace\Calendar\Services;

use Carbon\Carbon;
use craft\base\Component;
use craft\base\Element;
use craft\base\ElementInterface;
use craft\base\Field;
use craft\db\Query;
use craft\db\Table;
use craft\elements\db\ElementQueryInterface;
use craft\elements\User;
use craft\errors\ElementNotFoundException;
use craft\errors\SiteNotFoundException;
use craft\events\DeleteElementEvent as CraftDeleteElementEvent;
use craft\events\SiteEvent;
use craft\fieldlayoutelements\CustomField;
use craft\helpers\ArrayHelper;
use craft\helpers\ElementHelper;
use craft\records\Element as ElementRecord;
use craft\records\Element_SiteSettings as ElementSiteSettingsRecord;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Events\DeleteElementEvent;
use Solspace\Calendar\Events\SaveElementEvent;
use Solspace\Calendar\Library\Exceptions\DateHelperException;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Library\Helpers\VersionHelper;
use Solspace\Calendar\Models\SelectDateModel;
use Solspace\Calendar\Records\CalendarRecord;
use yii\base\Exception;
use yii\web\HttpException;

class EventsService extends Component
{
    public const EVENT_BEFORE_SAVE = 'beforeSave';
    public const EVENT_AFTER_SAVE = 'afterSave';
    public const EVENT_BEFORE_DELETE = 'beforeDelete';
    public const EVENT_AFTER_DELETE = 'afterDelete';

    /**
     * Returns an event by its ID.
     */
    public function getEventById(int $eventId, ?int $siteId = null, bool $includeDisabled = false): null|ElementInterface|Event
    {
        $query = Event::find()
            ->setAllowedCalendarsOnly(false)
            ->status($includeDisabled ? null : Element::STATUS_ENABLED)
            ->id($eventId)
        ;

        if (null !== $siteId) {
            $query->siteId($siteId);
        }

        return $query->one();
    }

    /**
     * Returns an event by its slug.
     */
    public function getEventBySlug(string $slug, ?int $siteId = null, bool $includeDisabled = false): null|ElementInterface|Event
    {
        return Event::find()
            ->slug($slug)
            ->setAllowedCalendarsOnly(false)
            ->status($includeDisabled ? null : Element::STATUS_ENABLED)
            ->siteId($siteId)
            ->one()
        ;
    }

    /**
     * @return Event[]
     */
    public function getEventsByIds(array $eventIds, ?int $siteId = null): array
    {
        $query = Event::find()
            ->setAllowedCalendarsOnly(false)
            ->id($eventIds)
            ->status(null)
            ->limit(null)
            ->offset(null)
        ;

        if (null !== $siteId) {
            $query->siteId($siteId);
        }

        /** @var Event[] $events */
        $events = $query->all();

        $indexedById = [];
        foreach ($events as $event) {
            $indexedById[$event->id] = $event;
        }

        unset($events);

        return $indexedById;
    }

    public function getEventQuery(?array $criteria = null): ElementQueryInterface
    {
        return Event::buildQuery($criteria);
    }

    public function getSingleEventMetadata(?array $ids = null, ?array $siteIds = null): array
    {
        $isCraft4 = VersionHelper::isCraft4();

        $ids = array_unique($ids);
        $siteIds = array_unique($siteIds);

        $subQuerySelect = [];
        $subQuerySelect[] = 'elements.[[id]] elementsId';
        $subQuerySelect[] = 'elements_sites.[[id]] elementsSitesId';

        if ($isCraft4) {
            $subQuerySelect[] = 'content.[[id]] contentId';
        }

        $subQuery = (new Query());
        $subQuery->select($subQuerySelect);
        $subQuery->from(ElementRecord::tableName().' elements');
        $subQuery->innerJoin(Event::tableName().' events', 'events.[[id]] = elements.[[id]]');
        $subQuery->innerJoin(CalendarRecord::tableName().' calendars', 'calendars.[[id]] = events.[[calendarId]]');
        $subQuery->innerJoin(ElementSiteSettingsRecord::tableName().' elements_sites', 'elements_sites.[[elementId]] = elements.[[id]]');

        if ($isCraft4) {
            $subQuery->innerJoin(Table::CONTENT.' content', '(content.[[elementId]] = elements.[[id]]) AND ([[content.siteId]] = elements_sites.[[siteId]])');
        }

        $subQuery->where([
            'and',
            'events.[[freq]] IS NULL',
            ['in', 'events.[[id]]', $ids],
            ['in', 'elements_sites.[[siteId]]', $siteIds],
        ]);

        $querySelect = [];
        $querySelect[] = 'events.[[id]]';
        $querySelect[] = 'events.[[startDate]]';
        $querySelect[] = 'elements_sites.[[siteId]]';
        $querySelect[] = 'events.[[id]]';

        if ($isCraft4) {
            $querySelect[] = 'content.[[title]]';
        } else {
            $querySelect[] = 'elements_sites.[[title]]';
        }

        $query = (new Query());
        $query->select($querySelect);
        $query->from(['subQuery' => $subQuery]);
        $query->innerJoin(ElementRecord::tableName().' elements', 'elements.[[id]] = [[subQuery]].[[elementsId]]');
        $query->innerJoin(ElementSiteSettingsRecord::tableName().' elements_sites', 'elements_sites.[[id]] = [[subQuery]].[[elementsSitesId]]');
        $query->innerJoin(Event::tableName().' events', 'events.[[id]] = [[subQuery]].[[elementsId]]');
        $query->innerJoin(CalendarRecord::tableName().' calendars', 'calendars.[[id]] = events.[[calendarId]]');

        if ($isCraft4) {
            $query->innerJoin(Table::CONTENT.' content', 'content.[[id]] = [[subQuery]].[[contentId]]');
        }

        return $query->all();
    }

    public function getRecurringEventMetadata(?array $ids = null, ?array $siteIds = null): array
    {
        $isCraft4 = VersionHelper::isCraft4();

        $ids = array_unique($ids);
        $siteIds = array_unique($siteIds);

        $subQuerySelect = [];
        $subQuerySelect[] = 'elements.[[id]] elementsId';
        $subQuerySelect[] = 'elements_sites.[[id]] elementsSitesId';

        if ($isCraft4) {
            $subQuerySelect[] = 'content.[[id]] contentId';
        }

        $subQuery = (new Query());
        $subQuery->select($subQuerySelect);
        $subQuery->from(ElementRecord::tableName().' elements');
        $subQuery->innerJoin(Event::tableName().' events', 'events.[[id]] = elements.[[id]]');
        $subQuery->innerJoin(CalendarRecord::tableName().' calendars', 'calendars.[[id]] = events.[[calendarId]]');
        $subQuery->innerJoin(ElementSiteSettingsRecord::tableName().' elements_sites', 'elements_sites.[[elementId]] = elements.[[id]]');

        if ($isCraft4) {
            $subQuery->innerJoin(Table::CONTENT.' content', '(content.[[elementId]] = elements.[[id]]) AND ([[content.siteId]] = elements_sites.[[siteId]])');
        }

        $subQuery->where([
            'and',
            'events.[[freq]] IS NOT NULL',
            ['in', 'events.[[id]]', $ids],
            ['in', 'elements_sites.[[siteId]]', $siteIds],
        ]);

        $querySelect = [];
        $querySelect[] = 'events.[[id]]';
        $querySelect[] = 'events.[[calendarId]]';
        $querySelect[] = 'events.[[startDate]]';
        $querySelect[] = 'events.[[endDate]]';
        $querySelect[] = 'events.[[freq]]';
        $querySelect[] = 'events.[[count]]';
        $querySelect[] = 'events.[[interval]]';
        $querySelect[] = 'events.[[byDay]]';
        $querySelect[] = 'events.[[byMonthDay]]';
        $querySelect[] = 'events.[[byMonth]]';
        $querySelect[] = 'events.[[byYearDay]]';
        $querySelect[] = 'events.[[until]]';
        $querySelect[] = 'calendars.[[allowRepeatingEvents]]';
        $querySelect[] = 'elements_sites.[[siteId]]';

        if ($isCraft4) {
            $querySelect[] = 'content.[[title]]';
        } else {
            $querySelect[] = 'elements_sites.[[title]]';
        }

        $query = (new Query());
        $query->select($querySelect);
        $query->from(['subQuery' => $subQuery]);
        $query->innerJoin(ElementRecord::tableName().' elements', 'elements.[[id]] = [[subQuery]].[[elementsId]]');
        $query->innerJoin(ElementSiteSettingsRecord::tableName().' elements_sites', 'elements_sites.[[id]] = [[subQuery]].[[elementsSitesId]]');
        $query->innerJoin(Event::tableName().' events', 'events.[[id]] = [[subQuery]].[[elementsId]]');
        $query->innerJoin(CalendarRecord::tableName().' calendars', 'calendars.[[id]] = events.[[calendarId]]');

        if ($isCraft4) {
            $query->innerJoin(Table::CONTENT.' content', 'content.[[id]] = [[subQuery]].[[contentId]]');
        }

        return $query->all();
    }

    public function getLatestModificationDate(): string
    {
        return (new Query())
            ->select(['MAX([[dateUpdated]])'])
            ->from(Event::tableName())
            ->limit(1)
            ->scalar()
        ;
    }

    public function getAllEventCount(): int
    {
        return (int) (new Query())
            ->select(['COUNT([[id]])'])
            ->from(Event::tableName())
            ->scalar()
        ;
    }

    /**
     * @throws \Throwable
     * @throws Exception
     * @throws \yii\db\Exception
     */
    public function saveEvent(Event $event, bool $validateContent = true, bool $bypassTitleGenerator = false): bool
    {
        $isNewEvent = !$event->id;

        if (!$bypassTitleGenerator && !$event->getCalendar()->hasTitleField) {
            $event->title = \Craft::$app->view->renderObjectTemplate($event->getCalendar()->titleFormat, $event);
        }

        $saveEvent = new SaveElementEvent($event, $isNewEvent);
        $this->trigger(self::EVENT_BEFORE_SAVE, $saveEvent);

        $event->validate();

        if ($saveEvent->isValid) {
            $transaction = \Craft::$app->db->beginTransaction();

            try {
                $isSaved = \Craft::$app->elements->saveElement($event, $validateContent);
                if (!$isSaved) {
                    return false;
                }

                $isSaved = $this->_respectNonTranslatableFields($event);
                if (!$isSaved) {
                    return false;
                }

                $this->reindexSearchForAllSites($event);

                if (null !== $transaction) {
                    $transaction->commit();
                }

                $this->trigger(self::EVENT_AFTER_SAVE, new SaveElementEvent($event, $isNewEvent));

                return true;
            } catch (\Exception $e) {
                if (null !== $transaction) {
                    $transaction->rollBack();
                }

                throw $e;
            }
        }

        return false;
    }

    /**
     * @throws \Throwable
     */
    public function deleteEventById(int $eventId): bool
    {
        $event = $this->getEventById($eventId, null, true);

        if (!$event) {
            return false;
        }

        return $this->deleteEvent($event);
    }

    /**
     * @throws \Throwable
     */
    public function deleteEvent(Event $event): bool
    {
        $deleteEvent = new DeleteElementEvent($event);
        $this->trigger(self::EVENT_BEFORE_DELETE, $deleteEvent);

        $event->validate();

        if ($deleteEvent->isValid) {
            $transaction = \Craft::$app->db->beginTransaction();

            try {
                $isDeleted = \Craft::$app->elements->deleteElementById($event->id, Event::class);

                if ($isDeleted) {
                    if (null !== $transaction) {
                        $transaction->commit();
                    }

                    $this->trigger(self::EVENT_AFTER_DELETE, new DeleteElementEvent($event));

                    return true;
                }
            } catch (\Exception $e) {
                if (null !== $transaction) {
                    $transaction->rollBack();
                }

                throw $e;
            }
        }

        return false;
    }

    /**
     * Bumps all event recurrences by the given $amountOfDays
     * E.g. - if the event repeats weekly on Tue and Fri, and it gets bumped by -1 day
     *        the event would then repeat on Mon and Thu.
     *        Bumping by 8 days would set it to Wed and Sat.
     *
     * @throws DateHelperException
     */
    public function bumpRecurrenceRule(Event $event, int $amountOfDays, int $amountOfMonths): void
    {
        if (!$event->repeats()) {
            return;
        }

        $event->byDay = DateHelper::shiftByDays($event->byDay, $amountOfDays);
        $event->byMonthDay = DateHelper::shiftByMonthDay($event->byMonthDay, $amountOfDays);

        if ($amountOfMonths) {
            $event->byMonth = DateHelper::shiftByMonth($event->byMonth, $amountOfMonths);
        }
    }

    /**
     * @throws \yii\db\Exception
     */
    public function addSiteHandler(SiteEvent $event): bool
    {
        if (false === \Craft::$app->getPlugins()->isPluginEnabled('calendar')) {
            return true;
        }

        if (!$event->isNew) {
            return true;
        }

        $siteId = $event->site->id;
        $primarySiteId = \Craft::$app->sites->getPrimarySite()->id;

        $isCraft4 = VersionHelper::isCraft4();

        $elementRows = (new Query());
        $elementRows->select(['elements_sites.*']);
        $elementRows->from(Table::ELEMENTS_SITES.' elements_sites');
        $elementRows->innerJoin(Event::tableName().' e', 'elements_sites.[[elementId]] = e.id');
        $elementRows->where(['elements_sites.[[siteId]]' => $primarySiteId]);
        $elementRows->all();

        $elementDataById = [];
        foreach ($elementRows as $elementData) {
            $elementDataById[$elementData['elementId']] = $elementData;
        }

        if ($isCraft4) {
            $contentRows = (new Query());
            $contentRows->select(['content.*']);
            $contentRows->from(Table::CONTENT.' content');
            $contentRows->innerJoin(Event::tableName().' calendar_events', 'content.[[elementId]] = calendar_events.id');
            $contentRows->where(['content.[[siteId]]' => $primarySiteId]);
            $contentRows->all();

            $contentDataById = [];
            foreach ($contentRows as $content) {
                unset(
                    $content['siteId'],
                    $content['id'],
                    $content['dateCreated'],
                    $content['dateUpdated'],
                    $content['uid']
                );

                $contentDataById[$content['elementId']] = $content;
            }
        }

        foreach ($elementDataById as $elementId => $elementData) {
            $elementId = $elementData['elementId'];

            \Craft::$app->db
                ->createCommand()
                ->batchInsert(
                    Table::ELEMENTS_SITES,
                    ['elementId', 'siteId', 'slug', 'enabled'],
                    [[$elementId, $siteId, $elementData['slug'], true]]
                )
                ->execute()
            ;

            if ($isCraft4 && isset($contentDataById[$elementId])) {
                $content = $contentDataById[$elementId];

                $columns = array_keys($content);
                $values = array_values($content);

                $columns[] = 'siteId';
                $values[] = $siteId;

                \Craft::$app->db
                    ->createCommand()
                    ->batchInsert(Table::CONTENT, $columns, [$values])
                    ->execute()
                ;
            }
        }

        return true;
    }

    public function canEditEvent(Event|int $event): bool
    {
        /** @var SettingsService $settings */
        $settings = Calendar::getInstance()->settings;
        $settingsModel = $settings->getSettingsModel();
        $guestAccess = $settingsModel->guestAccess;

        $eventModel = null;
        if ($event instanceof Event) {
            $eventModel = $event;
        } elseif (is_numeric($event)) {
            $eventModel = $this->getEventById($event);
        }

        if ((null === $eventModel || !$eventModel->id) && null !== $guestAccess) {
            return true;
        }

        return PermissionHelper::canEditEvent($event);
    }

    /**
     * @throws HttpException
     */
    public function requireEventEditPermissions(Event|int $event): bool
    {
        if (!$this->canEditEvent($event)) {
            throw new HttpException(404);
        }

        return true;
    }

    /**
     * Transfers one User's events to another upon User delete.
     *
     * @throws \Throwable
     * @throws \yii\db\Exception
     */
    public function transferUserEvents(CraftDeleteElementEvent $event): void
    {
        /** @var User $user */
        $user = $event->element;
        if (!$user instanceof User) {
            return;
        }

        if ($user->inheritorOnDelete) {
            \Craft::$app->db
                ->createCommand()
                ->update(
                    Event::tableName(),
                    ['authorId' => $user->inheritorOnDelete->id],
                    ['authorId' => $user->id],
                    [],
                    false
                )
                ->execute()
            ;
        } else {
            $eventIds = (new Query())
                ->select(['id'])
                ->from(Event::tableName())
                ->where(['authorId' => $user->id])
                ->column()
            ;

            foreach ($eventIds as $id) {
                \Craft::$app->elements->deleteElementById($id, Event::class);
            }
        }
    }

    /**
     * https://github.com/solspace/craft-calendar/issues/122.
     *
     * Adds the first occurrence date to the list of select dates
     */
    public function addFirstOccurrenceDate(array $selectDates): array
    {
        if (\array_key_exists(0, $selectDates) && !empty($selectDates[0]) && !empty($selectDates[0]->eventId)) {
            $event = $this->getEventById($selectDates[0]->eventId, null, true);

            if ($event) {
                $firstOccurrenceDate = new SelectDateModel();
                $firstOccurrenceDate->id = (int) $event->getId();
                $firstOccurrenceDate->eventId = (int) $event->getId();
                $firstOccurrenceDate->date = new Carbon($event->getStartDate(), DateHelper::UTC);

                array_unshift($selectDates, $firstOccurrenceDate);
            }
        }

        return $selectDates;
    }

    /**
     * @throws SiteNotFoundException
     */
    private function reindexSearchForAllSites(Event $event): void
    {
        foreach (\Craft::$app->getSites()->getAllSites() as $site) {
            $event->siteId = $site->id;
            $searchService = \Craft::$app->getSearch();
            $searchService->indexElementAttributes($event);
        }
    }

    /**
     * If we have an event with multi-site enabled and a non-translatable fields, we need to respect the non-translatable field values.
     *
     * @throws \Throwable
     * @throws ElementNotFoundException
     * @throws Exception
     */
    private function _respectNonTranslatableFields(Event $event): bool
    {
        if ($event->id && $event::isLocalized() && \Craft::$app->getIsMultiSite()) {
            $otherSiteEvents = [];

            $hasNonTranslatableFields = false;

            // Grab the other sites ids using the supported site ids for $event.
            // So if $event siteId is 1 and $event supports site ids in 1, 2 and 3, we want to grab 2 and 3...
            $supportedSites = ArrayHelper::index(ElementHelper::supportedSitesForElement($event), 'siteId');
            $otherSiteIds = ArrayHelper::withoutValue(array_keys($supportedSites), $event->siteId);

            if (!empty($otherSiteIds)) {
                foreach ($otherSiteIds as $otherSiteId) {
                    $otherSiteEvent = $this->getEventById($event->id, $otherSiteId);

                    if ($otherSiteEvent) {
                        $otherSiteEvents[] = $otherSiteEvent;
                    }
                }
            }

            $fieldLayout = $event->getFieldLayout();

            // If no field layout, there is nothing to process
            if (!$fieldLayout) {
                return true;
            }

            $fieldLayoutTabs = $fieldLayout->getTabs();

            // If no field layout tabs (which shouldn't be possible if no fields), there is nothing to process
            if (!$fieldLayoutTabs) {
                return true;
            }

            foreach ($fieldLayoutTabs as $fieldLayoutTab) {
                foreach ($fieldLayoutTab->getElements() as $element) {
                    if ($element instanceof CustomField && Field::TRANSLATION_METHOD_NONE === $element->getField()->translationMethod) {
                        // We've found a field that is non-translatable in $event
                        $hasNonTranslatableFields = true;

                        // Lets grab the field handle and value
                        $fieldHandle = $element->getField()->handle;
                        $fieldValue = $event->getFieldValue($fieldHandle);

                        // Loop over the same event in the other site ids and update the non-translatable field value
                        foreach ($otherSiteEvents as $otherSiteEvent) {
                            $otherSiteEvent->setFieldValue($fieldHandle, $fieldValue);
                        }
                    }
                }
            }

            // Save the same event in the other sites
            if ($hasNonTranslatableFields) {
                foreach ($otherSiteEvents as $otherSiteEvent) {
                    $isSaved = \Craft::$app->elements->saveElement($otherSiteEvent, false, false, false);

                    // If any of the other site events didn't save, we want to bail out and throw an error
                    if (!$isSaved) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}
