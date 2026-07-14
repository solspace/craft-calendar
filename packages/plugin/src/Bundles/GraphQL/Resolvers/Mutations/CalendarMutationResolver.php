<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers\Mutations;

use craft\gql\base\MutationResolver;
use craft\helpers\StringHelper;
use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;

class CalendarMutationResolver extends MutationResolver
{
    public function saveCalendar(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): CalendarModel
    {
        $calendar = $this->resolveCalendar($arguments);
        $isNew = !$calendar->id;

        if ($isNew && !GqlPermissions::canCreateCalendars()) {
            throw new UserError('Unable to create Calendar calendars.');
        }

        if (!$isNew && !GqlPermissions::canSaveAllCalendars() && !GqlPermissions::canSaveCalendar($calendar->uid)) {
            throw new UserError('Unable to save Calendar calendars.');
        }

        foreach ($arguments as $name => $value) {
            if (\in_array($name, ['id', 'uid'], true)) {
                continue;
            }

            if ($calendar->canSetProperty($name)) {
                $calendar->{$name} = $value;
            }
        }

        if ($calendar->color) {
            $calendar->color = preg_replace('/^([a-z0-9]{6})$/i', '#$1', $calendar->color);
        }

        if ($isNew && !$calendar->getSiteSettings()) {
            $calendar->setSiteSettings($this->createDefaultSiteSettings($calendar));
        }

        if (!Calendar::getInstance()->calendars->saveCalendar($calendar)) {
            throw new UserError(implode("\n", $calendar->getFirstErrors()));
        }

        return $calendar;
    }

    private function resolveCalendar(array $arguments): CalendarModel
    {
        $calendarService = Calendar::getInstance()->calendars;

        if (!empty($arguments['id'])) {
            $calendar = $calendarService->getCalendarById((int) $arguments['id']);
            if (!$calendar) {
                throw new UserError('Calendar not found.');
            }

            return $calendar;
        }

        if (!empty($arguments['uid'])) {
            $calendar = $calendarService->getCalendarByUid($arguments['uid']);
            if (!$calendar) {
                throw new UserError('Calendar not found.');
            }

            return $calendar;
        }

        $calendar = CalendarModel::create();
        $calendar->uid = StringHelper::UUID();

        return $calendar;
    }

    /**
     * @return CalendarSiteSettingsModel[]
     */
    private function createDefaultSiteSettings(CalendarModel $calendar): array
    {
        $siteSettings = [];
        foreach (\Craft::$app->sites->getAllSites() as $site) {
            $siteSettings[] = (new CalendarSiteSettingsModel([
                'uid' => StringHelper::UUID(),
                'siteId' => $site->id,
                'enabledByDefault' => true,
                'hasUrls' => false,
            ]))->setCalendar($calendar);
        }

        return $siteSettings;
    }
}
