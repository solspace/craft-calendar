<?php

namespace Solspace\Calendar\Services;

use Carbon\Carbon;
use craft\base\Component;
use craft\base\Element;
use craft\base\ElementInterface;
use craft\db\Query;
use craft\elements\User;
use craft\events\DeleteElementEvent as CraftDeleteElementEvent;
use craft\events\SiteEvent;
use craft\helpers\ArrayHelper;
use craft\helpers\ElementHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Events\DeleteElementEvent;
use Solspace\Calendar\Events\SaveElementEvent;
use Solspace\Calendar\Models\SelectDateModel;
use Solspace\Calendar\Library\CalendarPermissionHelper;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Records\CalendarRecord;
use yii\web\HttpException;

class EventsService extends Component
{
    const EVENT_BEFORE_SAVE = 'beforeSave';
    const EVENT_AFTER_SAVE = 'afterSave';
    const EVENT_BEFORE_DELETE = 'beforeDelete';
    const EVENT_AFTER_DELETE = 'afterDelete';

    /**
     * Returns an event by its ID.
     *
     * @param int $siteId
     *
     * @return null|ElementInterface|Event
     */
    public function getEventById(int $eventId, int $siteId = null, bool $includeDisabled = false)
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
     *
     * @param int $siteId
     *
     * @return null|ElementInterface|Event
     */
    public function getEventBySlug(string $slug, int $siteId = null, bool $includeDisabled = false)
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
     * @param int $siteId
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

    /**
     * @param mixed $criteria
     */
    public function getEventQuery(array $criteria = null): EventQuery
    {
        return Event::buildQuery($criteria);
    }

    /**
     * @param array $ids
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
            ->all()
        ;
    }

    /**
     * @param array $ids
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
            ->from(Event::TABLE.' event')
            ->innerJoin(CalendarRecord::TABLE.' calendar', 'calendar.[[id]] = event.[[calendarId]]')
            ->where(
                [
                    'and',
                    'event.freq IS NOT NULL',
                    ['in', 'event.id', $ids],
                ]
            )
            ->all()
        ;
    }

    public function getLatestModificationDate(): string
    {
        return (new Query())
            ->select(['MAX([[dateUpdated]])'])
            ->from(Event::TABLE)
            ->limit(1)
            ->scalar()
        ;
    }

    public function getAllEventCount(): int
    {
        return (int) (new Query())
            ->select(['COUNT([[id]])'])
            ->from(Event::TABLE)
            ->scalar()
        ;
    }

    /**
     * @param null|bool $validateContent
     *
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
                $isSaved = \Craft::$app->elements->saveElement($event, $validateContent, $isNewEvent);
	            if (! $isSaved) {
		            return false;
	            }

		        $isSaved = $this->_respectNonTranslatableFields($event);
		        if (! $isSaved) {
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
     * @throws \Solspace\Calendar\Library\Exceptions\DateHelperException
     */
    public function bumpRecurrenceRule(Event $event, int $amountOfDays, int $amountOfMonths)
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
        if (!$event->isNew) {
            return true;
        }

        $siteId = $event->site->id;
        $primarySiteId = \Craft::$app->sites->getPrimarySite()->id;

        $elementRows = (new Query())
            ->select(['ei18n.*'])
            ->from('{{%elements_sites}} ei18n')
            ->innerJoin(Event::TABLE.' e', 'ei18n.[[elementId]] = e.id')
            ->where(['ei18n.[[siteId]]' => $primarySiteId])
            ->all()
        ;

        $contentRows = (new Query())
            ->select(['c.*'])
            ->from('{{%content}} c')
            ->innerJoin(Event::TABLE.' e', 'c.[[elementId]] = e.id')
            ->where(['c.[[siteId]]' => $primarySiteId])
            ->all()
        ;

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
                ->execute()
            ;

            if (isset($contentDataById[$elementId])) {
                $content = $contentDataById[$elementId];

                $columns = array_keys($content);
                $values = array_values($content);

                $columns[] = 'siteId';
                $values[] = $siteId;

                \Craft::$app->db
                    ->createCommand()
                    ->batchInsert('{{%content}}', $columns, [$values])
                    ->execute()
                ;
            }
        }

        return true;
    }

    /**
     * @param Event|int $event
     */
    public function canEditEvent($event): bool
    {
        /** @var SettingsService $settings */
        $settings = Calendar::getInstance()->settings;
        $settingsModel = $settings->getSettingsModel();
        $guestAccess = $settingsModel->guestAccess;

        $eventModel = null;
        if ($event instanceof Event) {
            $eventModel = $event;
        } elseif (is_numeric($event) && (int) $event) {
            $eventModel = $this->getEventById($event);
        }

        if ((null === $eventModel || !$eventModel->id) && null !== $guestAccess) {
            return true;
        }

        return CalendarPermissionHelper::canEditEvent($event);
    }

    /**
     * @param Event|int $event
     *
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
     * Transfers one User's events to another upon User delete.
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
                ->execute()
            ;
        } else {
            $eventIds = (new Query())
                ->select(['id'])
                ->from(Event::TABLE)
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
	 *
	 * @param array $selectDates
	 * @return array
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
     * @throws \craft\errors\SiteNotFoundException
     */
    private function reindexSearchForAllSites(Event $event)
    {
        foreach (\Craft::$app->getSites()->getAllSites() as $site) {
            $event->siteId = $site->id;
            $searchService = \Craft::$app->getSearch();
            $searchService->indexElementAttributes($event);
        }
    }

	/**
	 * If we have an event with multi-site enabled and a non-translatable fields, we need to respect the non-translatable field values
	 *
	 * @param Event $event
	 * @return bool
	 * @throws \Throwable
	 * @throws \craft\errors\ElementNotFoundException
	 * @throws \yii\base\Exception
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

		    if (! empty($otherSiteIds)) {
		        foreach ($otherSiteIds as $otherSiteId) {
			        $otherSiteEvent = $this->getEventById($event->id, $otherSiteId);

			        if ($otherSiteEvent) {
				        $otherSiteEvents[] = $otherSiteEvent;
			        }
		        }
		    }

		    $fieldLayout = $event->getFieldLayout();

		    // If no field layout, there is nothing to process
		    if (! $fieldLayout) {
		        return true;
		    }

		    $fieldLayoutTabs = $fieldLayout->getTabs();

		    // If no field layout tabs (which shouldn't be possible if no fields), there is nothing to process
		    if (! $fieldLayoutTabs) {
		        return true;
		    }

		    foreach ($fieldLayoutTabs as $fieldLayoutTab) {
		        foreach ($fieldLayoutTab->getFields() as $element) {
			        if ($element->translationMethod === \craft\base\Field::TRANSLATION_METHOD_NONE) {
					    // We've found a field that is non-translatable in $event
					    $hasNonTranslatableFields = true;

					    // Lets grab the field handle and value
					    $fieldHandle = $element->handle;
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
				    if (! $isSaved) {
					    return false;
				    }
			    }
		    }
	    }

	    return true;
    }
}
