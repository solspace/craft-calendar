<?php

namespace Solspace\Calendar\Services;

use craft\base\Element;
use craft\base\ElementInterface;
use craft\errors\InvalidElementException;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Library\Events\CalendarFieldMapper;
use Solspace\Calendar\Models\CalendarModel;
use yii\base\InvalidArgumentException;

/** Moves a draft and its localized occurrence content as one transaction. */
class EventCalendarTransfer
{
    public function blockers(Event $event, CalendarModel $target): array
    {
        $messages = [];
        if ($event->rrule && !$target->allowRepeatingEvents) {
            $messages[] = Calendar::t('This calendar does not allow repeating events.');
        }
        $sourceSites = array_keys($event->getCalendar()->getSiteSettings());
        $targetSites = array_keys($target->getSiteSettings());
        sort($sourceSites);
        sort($targetSites);
        if ($sourceSites !== $targetSites) {
            $messages[] = Calendar::t('Choose a calendar with the same enabled sites to preserve this event’s localized content.');
        }

        return $messages;
    }

    public function transfer(Event $event, CalendarModel $target, array $mapping): void
    {
        if (!$event->getIsDraft() || $event->getIsRevision() || $event->calendarId === $target->id || $this->blockers($event, $target)) {
            throw new InvalidArgumentException('This event cannot be moved to the selected calendar.');
        }
        $mapper = new CalendarFieldMapper();
        $sourceLayout = $event->getFieldLayout();
        $targetLayout = $target->getFieldLayout();
        $mapping = $mapper->validate($mapping, $sourceLayout, $targetLayout);
        $sourceFields = $mapper->fields($sourceLayout);
        $targetFields = $mapper->fields($targetLayout);
        $occurrences = Calendar::getInstance()->occurrences;
        $elements = \Craft::$app->getElements();
        $transaction = \Craft::$app->getDb()->beginTransaction();

        try {
            // Fetch every localization before changing the shared calendar ID.
            $localized = Event::find()->id($event->id)->siteId(array_keys($target->getSiteSettings()))
                ->drafts(null)->provisionalDrafts(null)->status(null)->setAllowedCalendarsOnly(false)->all()
            ;
            $snapshots = [];
            foreach ($localized as $siteEvent) {
                $snapshots[] = [$siteEvent, $this->values($siteEvent, $mapping, $sourceFields)];
            }

            // A draft must get its own overrides before changing their layouts or values.
            foreach ($occurrences->getOverrides($event) as $override) {
                $occurrences->forOwner($override, $event);
            }
            $overrideSnapshots = [];
            foreach ($localized as $siteEvent) {
                foreach ($occurrences->getOverrides($siteEvent) as $override) {
                    $overridden = $override->getOverriddenFieldHandles();
                    $activeMapping = array_filter($mapping, static fn (string $uid) => \in_array($sourceFields[$uid]->handle, $overridden, true));
                    $overrideSnapshots[] = [$override, $siteEvent, $activeMapping, $this->values($override, $activeMapping, $sourceFields), \in_array(OccurrenceOverride::TITLE, $overridden, true)];
                }
            }

            foreach ($snapshots as [$siteEvent, $values]) {
                $siteEvent->calendarId = $target->id;
                $siteEvent->fieldLayoutId = $targetLayout?->id;
                $this->applyValues($siteEvent, $targetFields, $values);
                $siteEvent->setScenario(Element::SCENARIO_ESSENTIALS);
                // Required destination fields are filled in the refreshed event editor before publishing.
                if (!$elements->saveElement($siteEvent, propagate: false, saveContent: true)) {
                    throw new InvalidElementException($siteEvent);
                }
            }
            foreach ($overrideSnapshots as [$override, $siteEvent, $activeMapping, $values, $ownTitle]) {
                $override->setOwner($siteEvent);
                $override->fieldLayoutId = $targetLayout?->id;
                $override->overriddenFields = $ownTitle ? [OccurrenceOverride::TITLE] : [];
                $this->applyValues($override, $targetFields, $values);
                foreach ($activeMapping as $targetUid => $sourceUid) {
                    $override->overriddenFields[] = $targetUid;
                }
                $override->setScenario(Element::SCENARIO_ESSENTIALS);
                if (!$elements->saveElement($override, propagate: false, saveContent: true)) {
                    throw new InvalidElementException($override);
                }
            }
            $transaction->commit();
        } catch (\Throwable $exception) {
            $transaction->rollBack();

            throw $exception;
        }
        $event->calendarId = $target->id;
    }

    private function values(ElementInterface $element, array $mapping, array $sourceFields): array
    {
        $values = [];
        foreach ($mapping as $targetUid => $sourceUid) {
            $field = $sourceFields[$sourceUid];
            $values[$targetUid] = $field->serializeValue($element->getFieldValue($field->handle), $element);
        }

        return $values;
    }

    private function applyValues(ElementInterface $element, array $targetFields, array $values): void
    {
        foreach ($targetFields as $uid => $field) {
            $element->setFieldValue($field->handle, $values[$uid] ?? null);
        }
    }
}
