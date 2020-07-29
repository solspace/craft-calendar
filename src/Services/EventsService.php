<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use craft\base\Element;
use craft\base\ElementInterface;
use craft\db\Query;
use craft\elements\User;
use craft\events\SiteEvent;
use craft\events\DeleteElementEvent as CraftDeleteElementEvent;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Events\DeleteElementEvent;
use Solspace\Calendar\Events\SaveElementEvent;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Commons\Helpers\PermissionHelper;
use yii\web\HttpException;

class EventsService extends Component
{
    const EVENT_BEFORE_SAVE   = 'beforeSave';
    const EVENT_AFTER_SAVE    = 'afterSave';
    const EVENT_BEFORE_DELETE = 'beforeDelete';
    const EVENT_AFTER_DELETE  = 'afterDelete';

    /**
     * Returns an event by its ID.
     *
     * @param int  $eventId
     * @param int  $siteId
     * @param bool $includeDisabled
     *
     * @return Event|ElementInterface|null
     */
    public function getEventById(int $eventId, int $siteId = null, bool $includeDisabled = false)
    {
        $query = Event::find()
            ->setAllowedCalendarsOnly(false)
            ->status($includeDisabled ? null : Element::STATUS_ENABLED)
            ->id($eventId);

        if (null !== $siteId) {
            $query->siteId($siteId);
        }

        return $query->one();
    }

    /**
     * Returns an event by its slug.
     *
     * @param string $slug
     * @param int    $siteId
     * @param bool   $includeDisabled
     *
     * @return Event|ElementInterface|null
     */
    public function getEventBySlug(string $slug, int $siteId = null, bool $includeDisabled = false)
    {
        return Event::find()
            ->slug($slug)
            ->setAllowedCalendarsOnly(false)
            ->status($includeDisabled ? null : Element::STATUS_ENABLED)
            ->siteId($siteId)
            ->one();
    }

    /**
     * @param array $eventIds
     * @param int   $siteId
     *
     * @return Event[]
     */
    public function getEventsByIds(array $eventIds, int $siteId = null): array
    {
        $query = Event::find()
            ->setAllowedCalendarsOnly(false)
            ->id($eventIds)
            ->status(null)
            ->limit(null)
            ->offset(null);

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

    /**
     * @param mixed $criteria
     *
     * @return EventQuery
     */
    public function getEventQuery(array $criteria = null): EventQuery
    {
        return Event::buildQuery($criteria);
    }

    /**
     * @param array $ids
     *
     * @return array
     */
    public function getSingleEventMetadata(array $ids = null): array
    {
        return (new Query())
            ->select(['id', 'startDate'])
            ->from(Event::TABLE)
            ->where(
                [
                    'and',
                    'freq IS NULL',
                    ['in', 'id', $ids],
                ]
            )
            ->all();
    }

    /**
     * @param array $ids
     *
     * @return array
     */
    public function getRecurringEventMetadata(array $ids = null): array
    {
        return (new Query())
            ->select(
                [
                    'event.[[id]]',
                    'event.[[calendarId]]',
                    'event.[[startDate]]',
                    'event.[[endDate]]',
                    'event.[[freq]]',
                    'event.[[count]]',
                    'event.[[interval]]',
                    'event.[[byDay]]',
                    'event.[[byMonthDay]]',
                    'event.[[byMonth]]',
                    'event.[[byYearDay]]',
                    'event.[[until]]',
                    'calendar.[[allowRepeatingEvents]]',
                ]
            )
            ->from(Event::TABLE . ' event')
            ->innerJoin(CalendarRecord::TABLE . ' calendar', 'calendar.[[id]] = event.[[calendarId]]')
            ->where(
                [
                    'and',
                    'event.freq IS NOT NULL',
                    ['in', 'event.id', $ids],
                ]
            )
            ->all();
    }

    /**
     * @return string
     */
    public function getLatestModificationDate(): string
    {
        return (new Query())
            ->select(['MAX([[dateUpdated]])'])
            ->from(Event::TABLE)
            ->limit(1)
            ->scalar();
    }

    /**
     * @return int
     */
    public function getAllEventCount(): int
    {
        return (int) (new Query())
            ->select(['COUNT([[id]])'])
            ->from(Event::TABLE)
            ->scalar();
    }

    /**
     * @param Event     $event
     * @param bool|null $validateContent
     *
     * @param bool      $bypassTitleGenerator
     *
     * @return bool
     * @throws \Throwable
     * @throws \yii\base\Exception
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
                if ($isSaved) {

                    $this->reindexSearchForAllSites($event);

                    if ($transaction !== null) {
                        $transaction->commit();
                    }

                    $this->trigger(self::EVENT_AFTER_SAVE, new SaveElementEvent($event, $isNewEvent));

                    return true;
                }
            } catch (\Exception $e) {
                if ($transaction !== null) {
                    $transaction->rollBack();
                }

                throw $e;
            }
        }

        return false;
    }

    /**
     * @param int $eventId
     *
     * @return bool
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
     * @param Event $event
     *
     * @return bool
     * @throws \Throwable
     */
    public function deleteEvent(Event $event): bool
    {
        $deleteEvent = new DeleteElementEvent($event);
        $this->trigger(self::EVENT_BEFORE_DELETE, $deleteEvent);

        if ($deleteEvent->isValid && \Craft::$app->elements->deleteElementById($event->getId())) {
            $this->trigger(self::EVENT_AFTER_DELETE, new DeleteElementEvent($event));

            return true;
        }

        return false;
    }

    /**
     * Bumps all event recurrences by the given $amountOfDays
     * E.g. - if the event repeats weekly on Tue and Fri, and it gets bumped by -1 day
     *        the event would then repeat on Mon and Thu.
     *        Bumping by 8 days would set it to Wed and Sat
     *
     * @param Event $event
     * @param int   $amountOfDays
     * @param int   $amountOfMonths
     *
     * @throws \Solspace\Calendar\Library\Exceptions\DateHelperException
     */
    public function bumpRecurrenceRule(Event $event, int $amountOfDays, int $amountOfMonths)
    {
        if (!$event->repeats()) {
            return;
        }

        $event->byDay      = DateHelper::shiftByDays($event->byDay, $amountOfDays);
        $event->byMonthDay = DateHelper::shiftByMonthDay($event->byMonthDay, $amountOfDays);

        if ($amountOfMonths) {
            $event->byMonth = DateHelper::shiftByMonth($event->byMonth, $amountOfMonths);
        }
    }

    /**
     * @param SiteEvent $event
     *
     * @return bool
     * @throws \yii\db\Exception
     */
    public function addSiteHandler(SiteEvent $event): bool
    {
        if (!$event->isNew) {
            return true;
        }

        $siteId        = $event->site->id;
        $primarySiteId = \Craft::$app->sites->getPrimarySite()->id;

        $elementRows = (new Query())
            ->select(['ei18n.*'])
            ->from('{{%elements_sites}} ei18n')
            ->innerJoin(Event::TABLE . ' e', 'ei18n.[[elementId]] = e.id')
            ->where(['ei18n.[[siteId]]' => $primarySiteId])
            ->all();

        $contentRows = (new Query())
            ->select(['c.*'])
            ->from('{{%content}} c')
            ->innerJoin(Event::TABLE . ' e', 'c.[[elementId]] = e.id')
            ->where(['c.[[siteId]]' => $primarySiteId])
            ->all();

        $elementDataById = [];
        foreach ($elementRows as $elementData) {
            $elementDataById[$elementData['elementId']] = $elementData;
        }

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

        foreach ($elementDataById as $elementId => $elementData) {
            $elementId = $elementData['elementId'];

            \Craft::$app->db
                ->createCommand()
                ->batchInsert(
                    '{{%elements_sites}}',
                    ['elementId', 'siteId', 'slug', 'enabled'],
                    [[$elementId, $siteId, $elementData['slug'], true]]
                )
                ->execute();

            if (isset($contentDataById[$elementId])) {
                $content = $contentDataById[$elementId];

                $columns = array_keys($content);
                $values  = array_values($content);

                $columns[] = 'siteId';
                $values[]  = $siteId;

                \Craft::$app->db
                    ->createCommand()
                    ->batchInsert('{{%content}}', $columns, [$values])
                    ->execute();
            }
        }

        return true;
    }

    /**
     * @param int|Event $event
     *
     * @return bool
     */
    public function canEditEvent($event): bool
    {
        /** @var SettingsService $settings */
        $settings      = Calendar::getInstance()->settings;
        $settingsModel = $settings->getSettingsModel();
        $guestAccess   = $settingsModel->guestAccess;

        $eventModel = null;
        if ($event instanceof Event) {
            $eventModel = $event;
        } else if (is_numeric($event) && (int) $event) {
            $eventModel = $this->getEventById($event);
        }

        if ((null === $eventModel || !$eventModel->id) && null !== $guestAccess) {
            return true;
        }

        return PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS, true);
    }

    /**
     * @param int|Event $event
     *
     * @return bool
     * @throws HttpException
     */
    public function requireEventEditPermissions($event): bool
    {
        if (!$this->canEditEvent($event)) {
            throw new HttpException(404);
        }

        return true;
    }

    /**
     * Transfers one User's events to another upon User delete
     *
     * @param CraftDeleteElementEvent $event
     *
     * @throws \Throwable
     * @throws \yii\db\Exception
     */
    public function transferUserEvents(CraftDeleteElementEvent $event)
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
                    Event::TABLE,
                    ['authorId' => $user->inheritorOnDelete->id],
                    ['authorId' => $user->id],
                    [],
                    false
                )
                ->execute();
        } else {
            $eventIds = (new Query())
                ->select(['id'])
                ->from(Event::TABLE)
                ->where(['authorId' => $user->id])
                ->column();

            foreach ($eventIds as $id) {
                \Craft::$app->elements->deleteElementById($id, Event::class);
            }
        }
    }

    /**
     * @param Event $event
     *
     * @throws \craft\errors\SiteNotFoundException
     */
    private function reindexSearchForAllSites(Event $event)
    {

        foreach (\Craft::$app->getSites()->getAllSites() as $site) {
            $event->siteId = $site->id;
            $searchService = \Craft::$app->getSearch();
            $searchService->indexElementAttributes($event);
        }

        return;
    }
}
