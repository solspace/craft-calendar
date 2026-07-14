<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers;

use craft\elements\Entry;
use craft\gql\base\Resolver;
use GraphQL\Type\Definition\ResolveInfo;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\CalendarModel;

class CalendarResolver extends Resolver
{
    public static function resolve(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): array
    {
        // If this field is being resolved on an Entry, use the entry's actual field value.
        if ($source instanceof Entry) {
            if ([] === GqlPermissions::allowedCalendarUids()) {
                return [];
            }

            $value = $source->getFieldValue($resolveInfo->fieldName);

            if (empty($value)) {
                return [];
            }

            $calendars = Calendar::getInstance()->calendars;

            $resolvedCalendars = array_map(static function ($item) use ($calendars) {
                if ($item instanceof CalendarModel) {
                    return $item;
                }

                $id = \is_array($item) && isset($item['id']) ? (int) $item['id'] : (int) $item;

                return $id ? $calendars->getCalendarById($id) : null;
            }, (array) $value);

            return array_values(array_filter(
                $resolvedCalendars,
                static fn (?CalendarModel $calendar) => self::isCalendarAllowed($calendar)
            ));
        }

        // Original behavior for top-level calendar queries
        $arguments = self::applyCalendarPermissions($arguments);
        if (false === $arguments) {
            return []; // NONE allowed
        }

        return Calendar::getInstance()->calendars->getResolvedCalendars($arguments);
    }

    public static function resolveOne($source, array $arguments, $context, ResolveInfo $resolveInfo)
    {
        // If this field is being resolved on an Entry, use the entry's actual field value.
        if ($source instanceof Entry) {
            if ([] === GqlPermissions::allowedCalendarUids()) {
                return null;
            }

            $value = $source->getFieldValue($resolveInfo->fieldName);

            // Normalize a few possible shapes to a single CalendarModel (or null)
            if ($value instanceof CalendarModel) {
                return self::isCalendarAllowed($value) ? $value : null;
            }

            if (\is_array($value) && !empty($value)) {
                $first = reset($value);

                if ($first instanceof CalendarModel) {
                    return self::isCalendarAllowed($first) ? $first : null;
                }

                // If stored as ids, load the first one
                $id = \is_array($first) && isset($first['id']) ? (int) $first['id'] : (int) $first;

                $calendar = Calendar::getInstance()->calendars->getCalendarById($id);

                return self::isCalendarAllowed($calendar) ? $calendar : null;
            }

            return null;
        }

        // Fallback for top-level queries where there's no Entry $source
        $arguments = self::applyCalendarPermissions($arguments);
        if (false === $arguments) {
            return null; // NONE allowed
        }

        $arguments['limit'] = 1;

        $calendars = Calendar::getInstance()->calendars->getResolvedCalendars($arguments);
        $calendar = reset($calendars);

        return $calendar ?: null;
    }

    public static function applyCalendarPermissions(array $arguments): array|false
    {
        $calendarUids = GqlPermissions::allowedCalendarUids();

        if ([] === $calendarUids) {
            return false;
        }

        if (\is_array($calendarUids)) {
            $arguments['uid'] = $calendarUids;
        }

        return $arguments;
    }

    private static function isCalendarAllowed(?CalendarModel $calendar): bool
    {
        if (!$calendar) {
            return false;
        }

        $calendarUids = GqlPermissions::allowedCalendarUids();

        if (null === $calendarUids) {
            return true;
        }

        if ([] === $calendarUids) {
            return false;
        }

        return \in_array($calendar->uid, $calendarUids, true);
    }
}
