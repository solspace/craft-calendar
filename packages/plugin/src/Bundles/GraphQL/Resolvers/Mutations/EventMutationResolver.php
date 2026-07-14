<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers\Mutations;

use Carbon\Carbon;
use craft\base\Element;
use craft\gql\base\ElementMutationResolver;
use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;

class EventMutationResolver extends ElementMutationResolver
{
    protected array $immutableAttributes = ['id', 'uid', 'draftId', 'calendar'];

    public function saveEvent(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): Event
    {
        $calendar = $this->resolveMutationCalendar($arguments);
        $event = $this->resolveEvent($arguments, $calendar);
        $isNew = !$event->id;

        $isDraftMutation = (bool) $this->getResolutionData('draftMutation');
        $isDraft = $isDraftMutation || !empty($arguments['draftId']);

        if ($isNew && !$isDraft && !GqlPermissions::canCreateAllEvents() && !GqlPermissions::canCreateEventsInCalendar($calendar->uid)) {
            throw new UserError('Unable to create Calendar events.');
        }

        if ($isNew && $isDraftMutation && !GqlPermissions::canCreateAllEvents() && !GqlPermissions::canCreateEventsInCalendar($calendar->uid)) {
            throw new UserError('Unable to create Calendar event drafts.');
        }

        if (!$isNew) {
            $currentCalendar = $event->getCalendar();
            if (!GqlPermissions::canSaveAllEvents() && !GqlPermissions::canSaveEventsInCalendar($currentCalendar->uid)) {
                throw new UserError('Unable to save Calendar events.');
            }

            if ((int) $event->calendarId !== (int) $calendar->id) {
                if (!GqlPermissions::canCreateAllEvents() && !GqlPermissions::canCreateEventsInCalendar($calendar->uid)) {
                    throw new UserError('Unable to move Calendar events into this calendar.');
                }

                $event->calendarId = $calendar->id;
            }
        }

        if ($isDraft) {
            $event->setScenario(Element::SCENARIO_ESSENTIALS);
        }

        $draftName = $arguments['draftName'] ?? null;
        $draftNotes = $arguments['draftNotes'] ?? null;
        $creatorId = $arguments['creatorId'] ?? $event->authorId ?? \Craft::$app->getUser()->getId();
        $arguments = $this->normalizeDateArguments($arguments);
        unset($arguments['calendarId'], $arguments['siteId'], $arguments['provisional'], $arguments['draftName'], $arguments['draftNotes'], $arguments['creatorId']);

        $event = $this->populateElementWithData($event, $arguments, $resolveInfo);

        if ($isDraftMutation && !$event->draftId) {
            if (!\Craft::$app->getDrafts()->saveElementAsDraft($event, $creatorId, $draftName, $draftNotes)) {
                throw new UserError(implode("\n", $event->getErrorSummary(true)));
            }
        } else {
            if (!Calendar::getInstance()->events->saveEvent($event)) {
                throw new UserError(implode("\n", $event->getErrorSummary(true)));
            }
        }

        return $event;
    }

    public function publishDraft(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): int
    {
        $siteId = $arguments['siteId'] ?? \Craft::$app->sites->currentSite->id;
        $draft = Event::find()
            ->setAllowedCalendarsOnly(false)
            ->status(null)
            ->siteId((int) $siteId)
            ->provisionalDrafts($arguments['provisional'] ?? false)
            ->draftId((int) $arguments['id'])
            ->one()
        ;

        if (!$draft) {
            throw new UserError('Event draft not found.');
        }

        $calendar = $draft->getCalendar();
        if (!GqlPermissions::canSaveAllEvents() && !GqlPermissions::canSaveEventsInCalendar($calendar->uid)) {
            throw new UserError('Unable to publish Calendar event drafts.');
        }

        $event = \Craft::$app->getDrafts()->applyDraft($draft);

        return (int) $event->id;
    }

    private function resolveEvent(array $arguments, CalendarModel $calendar): Event
    {
        $siteId = $arguments['siteId'] ?? \Craft::$app->sites->currentSite->id;

        if (!empty($arguments['draftId'])) {
            $event = Event::find()
                ->setAllowedCalendarsOnly(false)
                ->status(null)
                ->siteId((int) $siteId)
                ->provisionalDrafts($arguments['provisional'] ?? false)
                ->draftId((int) $arguments['draftId'])
                ->one()
            ;

            if (!$event) {
                throw new UserError('Event draft not found.');
            }

            return $event;
        }

        if (!empty($arguments['id'])) {
            $event = Calendar::getInstance()->events->getEventById((int) $arguments['id'], (int) $siteId, true);
            if (!$event) {
                throw new UserError('Event not found.');
            }

            return $event;
        }

        $event = Event::create((int) $siteId, $calendar->id);
        $event->setScenario(Element::SCENARIO_LIVE);

        return $event;
    }

    private function resolveMutationCalendar(array $arguments): CalendarModel
    {
        if (!empty($arguments['calendarId'])) {
            $calendar = Calendar::getInstance()->calendars->getCalendarById((int) $arguments['calendarId']);
            if (!$calendar) {
                throw new UserError('Calendar not found.');
            }

            return $calendar;
        }

        return $this->getResolutionData('calendar');
    }

    private function normalizeDateArguments(array $arguments): array
    {
        foreach (['postDate', 'startDate', 'endDate', 'until'] as $name) {
            if (!empty($arguments[$name]) && \is_string($arguments[$name])) {
                $arguments[$name] = new Carbon($arguments[$name]);
            }
        }

        return $arguments;
    }
}
