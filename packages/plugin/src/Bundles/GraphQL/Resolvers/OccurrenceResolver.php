<?php

namespace Solspace\Calendar\Bundles\GraphQL\Resolvers;

use craft\base\EagerLoadingFieldInterface;
use craft\helpers\Gql as GqlHelper;
use GraphQL\Error\UserError;
use GraphQL\Language\AST\FieldNode;
use GraphQL\Language\AST\FragmentSpreadNode;
use GraphQL\Language\AST\InlineFragmentNode;
use GraphQL\Language\AST\SelectionSetNode;
use GraphQL\Type\Definition\ResolveInfo;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceProvider;
use Solspace\Calendar\Elements\Db\OccurrenceQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use yii\base\InvalidArgumentException;

class OccurrenceResolver
{
    public static function resolve(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): mixed
    {
        $query = self::prepareQuery($source, $arguments);
        if (false === $query) {
            return [];
        }

        $value = $query->with(self::getEagerLoadingPaths($resolveInfo))->all();

        return GqlHelper::applyDirectives($source, $resolveInfo, $value);
    }

    public static function resolveOne(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): mixed
    {
        $query = self::prepareQuery($source, $arguments);
        if (false === $query) {
            return null;
        }

        $value = $query->with(self::getEagerLoadingPaths($resolveInfo))->one();

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

    /**
     * Eager-loads the fields read through each occurrence's `content` and `event`, like Craft does for its own
     * elements. A field that takes arguments, or is read more than once, still loads per occurrence, so that
     * its arguments apply.
     *
     * @return string[] paths like `content.speakers`
     */
    private static function getEagerLoadingPaths(ResolveInfo $resolveInfo): array
    {
        $fields = \Craft::$app->getFields();
        $paths = [];

        foreach ($resolveInfo->fieldNodes as $fieldNode) {
            foreach (self::getFieldNodes($fieldNode->selectionSet, $resolveInfo) as $selection) {
                if (!\in_array($selection->name->value, ['content', 'event'], true)) {
                    continue;
                }

                $reads = [];
                foreach (self::getFieldNodes($selection->selectionSet, $resolveInfo) as $child) {
                    if ($child->selectionSet) {
                        $reads[$child->name->value][] = $child;
                    }
                }

                foreach ($reads as $handle => $nodes) {
                    if (1 === \count($nodes) && 0 === \count($nodes[0]->arguments) && $fields->getFieldByHandle($handle) instanceof EagerLoadingFieldInterface) {
                        $paths[] = $selection->name->value.'.'.$handle;
                    }
                }
            }
        }

        return array_values(array_unique($paths));
    }

    /**
     * The fields a selection reads, including those in fragments. Custom fields are always read in a fragment.
     *
     * @return FieldNode[]
     */
    private static function getFieldNodes(?SelectionSetNode $selectionSet, ResolveInfo $resolveInfo): array
    {
        $nodes = [];

        foreach ($selectionSet?->selections ?? [] as $selection) {
            if ($selection instanceof FieldNode) {
                $nodes[] = $selection;
            } elseif ($selection instanceof InlineFragmentNode) {
                array_push($nodes, ...self::getFieldNodes($selection->selectionSet, $resolveInfo));
            } elseif ($selection instanceof FragmentSpreadNode && isset($resolveInfo->fragments[$selection->name->value])) {
                array_push($nodes, ...self::getFieldNodes($resolveInfo->fragments[$selection->name->value]->selectionSet, $resolveInfo));
            }
        }

        return $nodes;
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

        if (isset($arguments['recurrenceId'])) {
            $query->recurrenceId($arguments['recurrenceId']);
        }

        if (isset($arguments['code'])) {
            $query->code($arguments['code']);
        }

        if (isset($arguments['slug'])) {
            $query->slug($arguments['slug']);
        }

        if (isset($arguments['cancelled'])) {
            $query->cancelled($arguments['cancelled']);
        }

        if (isset($arguments['search'])) {
            $query->search($arguments['search']);
        }

        if (isset($arguments['relatedTo'])) {
            $query->relatedTo($arguments['relatedTo']);
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
            try {
                $query->orderBy($arguments['orderBy']);
            } catch (InvalidArgumentException $exception) {
                throw new UserError($exception->getMessage());
            }
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
