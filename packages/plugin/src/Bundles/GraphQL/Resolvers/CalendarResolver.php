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
            $value = $source->getFieldValue($resolveInfo->fieldName);

            if (empty($value)) {
                return [];
            }

            $calendars = Calendar::getInstance()->calendars;

            return array_values(array_filter(array_map(static function ($item) use ($calendars) {
                if ($item instanceof CalendarModel) {
                    return $item;
                }

                $id = \is_array($item) && isset($item['id']) ? (int) $item['id'] : (int) $item;

                return $id ? $calendars->getCalendarById($id) : null;
            }, (array) $value)));
        }

        // Original behavior for top-level calendar queries
        $arguments = self::getArguments($arguments);

        return Calendar::getInstance()->calendars->getResolvedCalendars($arguments);
    }

    public static function resolveOne($source, array $arguments, $context, ResolveInfo $resolveInfo)
    {
        // If this field is being resolved on an Entry, use the entry's actual field value.
        if ($source instanceof Entry) {
            $value = $source->getFieldValue($resolveInfo->fieldName);

            // Normalize a few possible shapes to a single CalendarModel (or null)
            if ($value instanceof CalendarModel) {
                return $value;
            }

            if (\is_array($value) && !empty($value)) {
                $first = reset($value);

                if ($first instanceof CalendarModel) {
                    return $first;
                }

                // If stored as ids, load the first one
                $id = \is_array($first) && isset($first['id']) ? (int) $first['id'] : (int) $first;

                return Calendar::getInstance()->calendars->getCalendarById($id);
            }

            return null;
        }

        // Fallback for top-level queries where there's no Entry $source
        $arguments = self::getArguments($arguments);
        $arguments['limit'] = 1;

        $calendars = Calendar::getInstance()->calendars->getResolvedCalendars($arguments);
        $calendar = reset($calendars);

        return $calendar ?: null;
    }

    private static function getArguments(array $arguments): array
    {
        $calendarUids = GqlPermissions::allowedCalendarUids();
        if ($calendarUids) {
            $arguments['uid'] = $calendarUids;
        }

        return $arguments;
    }
}
