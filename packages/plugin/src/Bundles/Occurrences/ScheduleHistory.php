<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use craft\db\Query;
use craft\db\Table;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Records\OccurrenceCodeRecord;
use Solspace\Calendar\Records\OccurrenceOverrideRecord;
use yii\web\Response;

/**
 * Short-lived, user-bound snapshots for undoing CP drags and resizes. Schedules and generated titles/URLs are restored;
 * custom field content stays on its Craft elements. Split parts and new overrides are kept in the
 * trash between undo and redo, so their IDs, fields and occurrence codes survive both directions.
 */
class ScheduleHistory
{
    private const TTL = 7200;
    private const EVENT_COLUMNS = ['id', 'startDate', 'endDate', 'until', 'timezone', 'allDay', 'rrule', 'repeatType', 'repeatEndType', 'seriesId'];
    private const OVERRIDE_COLUMNS = ['id', 'primaryOwnerId', 'recurrenceId', 'startDate', 'endDate', 'allDay', 'cancelled', 'orphaned'];

    public function __construct(private OccurrenceMaterializer $materializer = new OccurrenceMaterializer()) {}

    public function record(Event $event, callable $change): Response
    {
        return $this->locked((int) $event->id, function () use ($event, $change): Response {
            $partsBefore = Calendar::getInstance()->series->findParts($event)?->status(null)->ids() ?? [];
            $before = $this->capture([(int) $event->id]);
            $response = $change();
            if (true !== ($response->data['success'] ?? false)) {
                return $response;
            }

            $fresh = Calendar::getInstance()->events->getEventById((int) $event->id, $event->siteId, true);
            $partsAfter = Calendar::getInstance()->series->findParts($fresh)?->status(null)->ids() ?? [];
            $created = array_values(array_diff(array_map('intval', $partsAfter), array_map('intval', [...$partsBefore, $event->id])));
            $ids = [(int) $event->id, ...$created];
            $after = $this->capture($ids);
            if ($this->fingerprint($before) === $this->fingerprint($after)) {
                return $response;
            }

            $token = StringHelper::randomString(40);
            $entry = [
                'eventId' => (int) $event->id,
                'siteId' => (int) $event->siteId,
                'ids' => $ids,
                'before' => $before,
                'after' => $after,
                'direction' => 'undo',
            ];
            if (!\Craft::$app->getCache()->set($this->key($token), $entry, self::TTL)) {
                throw new \RuntimeException('Could not retain the event change for Undo.');
            }
            $response->data['historyToken'] = $token;

            return $response;
        });
    }

    public function replay(string $token, string $direction): void
    {
        $entry = \Craft::$app->getCache()->get($this->key($token));
        if (!\is_array($entry) || !\in_array($direction, ['undo', 'redo'], true)) {
            throw new \RuntimeException(Calendar::t('This change is no longer available. Reload the calendar to continue.'));
        }

        $this->locked($entry['eventId'], function () use ($token, $direction): void {
            // Read again after obtaining the lock: a double-click must not replay twice.
            $entry = \Craft::$app->getCache()->get($this->key($token));
            if (!\is_array($entry) || $entry['direction'] !== $direction) {
                throw new \RuntimeException(Calendar::t('This change is no longer available. Reload the calendar to continue.'));
            }
            foreach ($entry['ids'] as $id) {
                $element = $this->event($id, $entry['siteId']);
                Calendar::getInstance()->events->requireEventEditPermissions($element);
            }

            $expected = 'undo' === $direction ? $entry['after'] : $entry['before'];
            if ($this->fingerprint($this->capture($entry['ids'])) !== $this->fingerprint($expected)) {
                throw new \RuntimeException(Calendar::t('This event has changed since your last action. Reload the calendar to continue.'));
            }

            $target = 'undo' === $direction ? $entry['before'] : $entry['after'];
            $this->restore($target, $entry['ids'], $entry['siteId']);
            $entry['direction'] = 'undo' === $direction ? 'redo' : 'undo';
            if (!\Craft::$app->getCache()->set($this->key($token), $entry, self::TTL)) {
                throw new \RuntimeException(Calendar::t('Could not restore the event change.'));
            }
        }, $entry['ids']);
    }

    protected function event(int $id, int $siteId): Event
    {
        return Event::find()->setAllowedCalendarsOnly(false)->id($id)->siteId($siteId)->status(null)->trashed(null)->one()
            ?? throw new \RuntimeException(Calendar::t('Event could not be found'));
    }

    protected function override(int $id, int $siteId): ?OccurrenceOverride
    {
        return OccurrenceOverride::find()->id($id)->siteId($siteId)->status(null)->trashed(null)->one();
    }

    private function capture(array $eventIds): array
    {
        $events = (new Query())->select(array_map(static fn ($name) => 'schedule.'.$name, self::EVENT_COLUMNS))
            ->from(['schedule' => Event::TABLE])->innerJoin(['element' => Table::ELEMENTS], '[[element.id]] = [[schedule.id]]')
            ->where(['schedule.id' => $eventIds, 'element.dateDeleted' => null])->orderBy(['schedule.id' => \SORT_ASC])->all()
        ;
        $liveIds = array_column($events, 'id');
        $overrides = (new Query())->select(array_map(static fn ($name) => 'override.'.$name, self::OVERRIDE_COLUMNS))
            ->from(['override' => OccurrenceOverrideRecord::TABLE])->innerJoin(['element' => Table::ELEMENTS], '[[element.id]] = [[override.id]]')
            ->where(['override.primaryOwnerId' => $liveIds, 'element.dateDeleted' => null])->orderBy(['override.id' => \SORT_ASC])->all()
        ;
        $overrideIds = array_column($overrides, 'id');

        return [
            'events' => $events,
            'overrides' => $overrides,
            'owners' => (new Query())->select(['elementId', 'ownerId', 'sortOrder'])->from(Table::ELEMENTS_OWNERS)
                ->where(['elementId' => $overrideIds])->orderBy(['elementId' => \SORT_ASC, 'ownerId' => \SORT_ASC])->all(),
            // A later edit to the earlier split part must prevent undo from hiding those changes.
            'content' => (new Query())->select(['elementId', 'siteId', 'title', 'slug', 'uri', 'content', 'enabled'])->from(Table::ELEMENTS_SITES)
                ->where(['elementId' => [...$liveIds, ...$overrideIds]])->orderBy(['elementId' => \SORT_ASC, 'siteId' => \SORT_ASC])->all(),
            'codes' => (new Query())->from(OccurrenceCodeRecord::TABLE)->where(['eventId' => $liveIds])->orderBy(['eventId' => \SORT_ASC, 'recurrenceId' => \SORT_ASC])->all(),
        ];
    }

    private function restore(array $snapshot, array $eventIds, int $siteId): void
    {
        $elements = \Craft::$app->getElements();
        $materializer = $this->materializer;
        $current = $this->capture($eventIds);
        $targetIds = array_map('intval', array_column($snapshot['events'], 'id'));
        $targetOverrideIds = array_map('intval', array_column($snapshot['overrides'], 'id'));

        // Drop occurrence rows before moving codes between series parts; their codes are unique too.
        foreach ($eventIds as $id) {
            $materializer->delete($this->event($id, $siteId));
        }
        foreach ($snapshot['events'] as $row) {
            $id = $row['id'];
            unset($row['id']);
            Db::update(Event::TABLE, $row, ['id' => $id]);
        }
        Db::update(Table::ELEMENTS, [
            'dateUpdated' => Db::prepareDateForDb(new \DateTime('now', new \DateTimeZone('UTC'))),
        ], ['id' => [...$targetIds, ...$targetOverrideIds]]);
        // Date-based title and URI formats may have changed these during the original save.
        foreach ($snapshot['content'] as $row) {
            Db::update(Table::ELEMENTS_SITES, [
                'title' => $row['title'],
                'slug' => $row['slug'],
                'uri' => $row['uri'],
            ], ['elementId' => $row['elementId'], 'siteId' => $row['siteId']]);
        }
        foreach ($snapshot['overrides'] as $row) {
            $id = $row['id'];
            unset($row['id']);
            Db::update(OccurrenceOverrideRecord::TABLE, $row, ['id' => $id]);
        }
        // Transfer ownership before trashing the split part, so its overrides aren't deleted with it.
        $overrideIds = array_unique([...array_column($current['overrides'], 'id'), ...$targetOverrideIds]);
        Db::delete(Table::ELEMENTS_OWNERS, ['elementId' => $overrideIds]);
        foreach ($snapshot['owners'] as $owner) {
            Db::insert(Table::ELEMENTS_OWNERS, $owner);
        }
        foreach (array_diff(array_column($current['overrides'], 'id'), $targetOverrideIds) as $id) {
            $override = $this->override((int) $id, $siteId);
            if ($override && !$elements->deleteElement($override)) {
                throw new \RuntimeException(Calendar::t('Could not restore the event change.'));
            }
        }
        foreach (array_diff($eventIds, $targetIds) as $id) {
            $event = $this->event($id, $siteId);
            if (!$event->trashed && !$elements->deleteElement($event)) {
                throw new \RuntimeException(Calendar::t('Could not restore the event change.'));
            }
        }

        // Restore captured mappings, preserving codes allocated by browsing other date ranges.
        $codes = array_column($snapshot['codes'], 'code');
        Db::delete(OccurrenceCodeRecord::TABLE, ['code' => $codes]);
        foreach ($snapshot['codes'] as $row) {
            Db::delete(OccurrenceCodeRecord::TABLE, ['eventId' => $row['eventId'], 'recurrenceId' => $row['recurrenceId']]);
            Db::insert(OccurrenceCodeRecord::TABLE, $row);
        }
        foreach ($targetOverrideIds as $id) {
            $override = $this->override((int) $id, $siteId);
            if (!$override || ($override->trashed && !$elements->restoreElement($override))) {
                throw new \RuntimeException(Calendar::t('Could not restore the event change.'));
            }
            foreach ($snapshot['content'] as $siteRow) {
                if ((int) $siteRow['elementId'] === $id) {
                    \Craft::$app->getSearch()->indexElementAttributes($this->override($id, (int) $siteRow['siteId']));
                }
            }
            $elements->invalidateCachesForElement($override);
        }
        foreach ($targetIds as $id) {
            $event = $this->event($id, $siteId);
            $event->setScheduleShift(0);
            if ($event->trashed && !$elements->restoreElement($event)) {
                throw new \RuntimeException(Calendar::t('Could not restore the event change.'));
            }
            $materializer->regenerate($event);
            foreach ($snapshot['content'] as $siteRow) {
                if ((int) $siteRow['elementId'] === $id) {
                    \Craft::$app->getSearch()->indexElementAttributes($this->event($id, (int) $siteRow['siteId']));
                }
            }
            $elements->invalidateCachesForElement($event);
        }
    }

    private function fingerprint(array $snapshot): string
    {
        // Expanding an infinite schedule's materialization window doesn't edit its schedule.
        unset($snapshot['codes']);

        return hash('sha256', json_encode($snapshot, \JSON_THROW_ON_ERROR));
    }

    private function key(string $token): string
    {
        return 'calendar:schedule-history:'.\Craft::$app->getUser()->getId().':'.$token;
    }

    /** Lock the same rows normal Craft saves write, so an edit can't land between the check and replay. */
    private function lockRows(array $eventIds): void
    {
        $db = \Craft::$app->getDb();
        if (!\in_array($db->getDriverName(), ['mysql', 'pgsql'], true)) {
            return;
        }
        $parents = (new Query())->select(['id'])->from(Table::ELEMENTS)->where(['id' => $eventIds])->orderBy(['id' => \SORT_ASC])->createCommand();
        $db->createCommand($parents->getSql().' FOR UPDATE', $parents->params)->queryAll();
        $overrideIds = (new Query())->select(['id'])->from(OccurrenceOverrideRecord::TABLE)
            ->where(['primaryOwnerId' => $eventIds])->column()
        ;
        $elementIds = array_unique([...$eventIds, ...$overrideIds]);
        sort($elementIds, \SORT_NUMERIC);
        foreach ([
            [Table::ELEMENTS, 'id', $elementIds],
            [Event::TABLE, 'id', $eventIds],
            [OccurrenceOverrideRecord::TABLE, 'id', $overrideIds],
            [Table::ELEMENTS_SITES, 'elementId', $elementIds],
            [Table::ELEMENTS_OWNERS, 'elementId', $overrideIds],
        ] as [$table, $column, $ids]) {
            if (!$ids) {
                continue;
            }
            $command = (new Query())->select([$column])->from($table)->where([$column => $ids])->orderBy([$column => \SORT_ASC])->createCommand();
            $db->createCommand($command->getSql().' FOR UPDATE', $command->params)->queryAll();
        }
    }

    private function locked(int $eventId, callable $action, array $relatedIds = []): mixed
    {
        $name = 'calendar:schedule-history:event:'.$eventId;
        if (!\Craft::$app->getMutex()->acquire($name, 15)) {
            throw new \RuntimeException(Calendar::t('This event is being changed. Try again.'));
        }
        $transaction = \Craft::$app->getDb()->beginTransaction();

        try {
            $this->lockRows($relatedIds ?: [$eventId]);
            $result = $action();
            $transaction->commit();

            return $result;
        } catch (\Throwable $exception) {
            $transaction->rollBack();

            throw $exception;
        } finally {
            \Craft::$app->getMutex()->release($name);
        }
    }
}
