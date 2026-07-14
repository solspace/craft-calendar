<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers;

use craft\helpers\Gql as GqlHelper;
use GraphQL\Type\Definition\ResolveInfo;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceProvider;
use Solspace\Calendar\Elements\Db\OccurrenceQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;

class OccurrenceResolver
{
    public static function resolve(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): mixed
    {
        $query = self::prepareQuery($source, $arguments);
        if (false === $query) {
            return [];
        }

        $value = $query->all();

        return GqlHelper::applyDirectives($source, $resolveInfo, $value);
    }

    public static function resolveOne(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): mixed
    {
        $query = self::prepareQuery($source, $arguments);
        if (false === $query) {
            return null;
        }

        $value = $query->one();

        return GqlHelper::applyDirectives($source, $resolveInfo, $value);
    }

    public static function resolveCount(mixed $source, array $arguments, ?array $context, ResolveInfo $resolveInfo): int
    {
        $query = self::prepareQuery($source, $arguments);
        if (false === $query) {
            return 0;
        }

        return (int) $query->count();
    }

    private static function prepareQuery(mixed $source, array $arguments): false|OccurrenceQuery
    {
        if ($source instanceof CalendarModel) {
            $arguments['calendarId'] = [$source->id];
        } elseif ($source instanceof Event) {
            $arguments['event'] = [$source->id];
        }

        $calendarUids = GqlPermissions::allowedEventCalendarUids();
        if ([] === $calendarUids) {
            return false;
        }
        if (\is_array($calendarUids)) {
            $arguments['calendarUid'] = $calendarUids;
        }

        /** @var OccurrenceProvider $provider */
        $provider = \Craft::$container->get(OccurrenceProvider::class);
        $query = $provider->createQuery();

        if (isset($arguments['id'])) {
            $query->id($arguments['id']);
        }

        if (isset($arguments['uid'])) {
            $query->uid($arguments['uid']);
        }

        if (isset($arguments['event'])) {
            $query->event($arguments['event']);
        }

        if (isset($arguments['calendarId'])) {
            $query->setCalendarId($arguments['calendarId']);
        }

        if (isset($arguments['calendarUid'])) {
            $query->setCalendarUid($arguments['calendarUid']);
        }

        if (isset($arguments['calendar'])) {
            $query->calendar($arguments['calendar']);
        }

        if (isset($arguments['site'])) {
            $query->site($arguments['site']);
        }

        if (isset($arguments['siteId'])) {
            $query->setSiteId($arguments['siteId']);
        }

        if (isset($arguments['status'])) {
            $query->status($arguments['status']);
        }

        if (isset($arguments['rangeStart'])) {
            $query->rangeStart($arguments['rangeStart']);
        }

        if (isset($arguments['rangeEnd'])) {
            $query->rangeEnd($arguments['rangeEnd']);
        }

        if (isset($arguments['startsBefore'])) {
            $query->startsBefore($arguments['startsBefore']);
        }

        if (isset($arguments['startsBeforeOrAt'])) {
            $query->setStartsBeforeOrAt($arguments['startsBeforeOrAt']);
        }

        if (isset($arguments['startsAfter'])) {
            $query->startsAfter($arguments['startsAfter']);
        }

        if (isset($arguments['startsAfterOrAt'])) {
            $query->setStartsAfterOrAt($arguments['startsAfterOrAt']);
        }

        if (isset($arguments['endsBefore'])) {
            $query->endsBefore($arguments['endsBefore']);
        }

        if (isset($arguments['endsBeforeOrAt'])) {
            $query->endsBeforeOrAt($arguments['endsBeforeOrAt']);
        }

        if (isset($arguments['endsAfter'])) {
            $query->endsAfter($arguments['endsAfter']);
        }

        if (isset($arguments['endsAfterOrAt'])) {
            $query->endsAfterOrAt($arguments['endsAfterOrAt']);
        }

        if (isset($arguments['orderBy'])) {
            $query->orderBy($arguments['orderBy']);
        }

        if (isset($arguments['offset'])) {
            $query->offset($arguments['offset']);
        }

        if (isset($arguments['limit'])) {
            $query->limit($arguments['limit']);
        }

        return $query;
    }
}
