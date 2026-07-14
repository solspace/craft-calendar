<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers;

use craft\base\ElementInterface;
use craft\gql\base\ElementResolver;
use Illuminate\Support\Collection;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;

class EventResolver extends ElementResolver
{
    public static function prepareQuery(mixed $source, array $arguments, ?string $fieldName = null): mixed
    {
        $arguments = self::applyCalendarPermissions($arguments);

        if ($source instanceof CalendarModel) {
            if (false === $arguments) {
                return new Collection();
            }

            $arguments['calendarId'] = $source->id;
        } elseif ($source instanceof ElementInterface && null !== $fieldName) {
            return self::applyCalendarPermissionsToValue($source->{$fieldName});
        } elseif (false === $arguments) {
            return new Collection();
        }

        return Calendar::getInstance()->events->getEventQuery($arguments);
    }

    private static function applyCalendarPermissions(array $arguments): array|false
    {
        $calendarUids = GqlPermissions::allowedEventCalendarUids();

        if ([] === $calendarUids) {
            return false;
        }

        if (\is_array($calendarUids)) {
            $arguments['calendarUid'] = $calendarUids;
        }

        return $arguments;
    }

    private static function applyCalendarPermissionsToValue(mixed $value): mixed
    {
        $calendarUids = GqlPermissions::allowedEventCalendarUids();

        if ($value instanceof EventQuery) {
            if ([] === $calendarUids) {
                return new Collection();
            }

            if (\is_array($calendarUids)) {
                return $value->setCalendarUid($calendarUids);
            }

            return $value;
        }

        if ([] === $calendarUids) {
            return [];
        }

        if (\is_array($value) && \is_array($calendarUids)) {
            return array_values(array_filter(
                $value,
                static function ($event) use ($calendarUids) {
                    if (!$event instanceof Event) {
                        return false;
                    }

                    $calendar = $event->getCalendar();

                    return $calendar && \in_array($calendar->uid, $calendarUids, true);
                }
            ));
        }

        return $value;
    }
}
