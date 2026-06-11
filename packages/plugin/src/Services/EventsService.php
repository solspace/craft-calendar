<?php

namespace Solspace\Calendar\Services;

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
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Events\DeleteElementEvent;
use Solspace\Calendar\Events\SaveElementEvent;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
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
        return Event::find()
            ->setAllowedCalendarsOnly(false)
            ->status($includeDisabled ? null : Element::STATUS_ENABLED)
            ->id($eventId)
            ->siteId($siteId)
            ->one()
        ;
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
            ->indexBy('id')
        ;

        if (null !== $siteId) {
            $query->siteId($siteId);
        }

        return $query->all();
    }

    /**
     * @return ElementQueryInterface|EventQuery
     */
    public function getEventQuery(?array $criteria = null): ElementQueryInterface
    {
        return Event::buildQuery($criteria);
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

        $isCraft4 = version_compare(\Craft::$app->getVersion(), '5.0.0', '<');

        $elementRows = (new Query());
        $elementRows->select(['elements_sites.*']);
        $elementRows->from(Table::ELEMENTS_SITES.' elements_sites');
        $elementRows->innerJoin(Event::tableName().' e', 'elements_sites.[[elementId]] = e.[[id]]');
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
            $contentRows->innerJoin(Event::tableName().' calendar_events', 'content.[[elementId]] = calendar_events.[[id]]');
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
