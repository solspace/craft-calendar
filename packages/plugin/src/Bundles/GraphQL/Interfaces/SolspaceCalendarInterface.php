<?php

namespace Solspace\Calendar\Bundles\GraphQL\Interfaces;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Arguments\CalendarArguments;
use Solspace\Calendar\Bundles\GraphQL\Arguments\EventArguments;
use Solspace\Calendar\Bundles\GraphQL\Arguments\OccurrenceArguments;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\CalendarResolver;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\EventResolver;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\OccurrenceResolver;
use Solspace\Calendar\Bundles\GraphQL\Types\Generators\SolspaceCalendarGenerator;
use Solspace\Calendar\Bundles\GraphQL\Types\SolspaceCalendarType;

/**
 * @deprecated 6.0.0 Use the root-level Calendar queries instead.
 * Will be removed in 7.0.0.
 */
class SolspaceCalendarInterface extends CalendarInterface
{
    public static function getName(): string
    {
        return 'SolspaceCalendarInterface';
    }

    public static function getTypeClass(): string
    {
        return SolspaceCalendarType::class;
    }

    public static function getGeneratorClass(): string
    {
        return SolspaceCalendarGenerator::class;
    }

    public static function getDescription(): string
    {
        return 'Legacy Calendar GraphQL Interface. Will be removed in 7.0.0.';
    }

    public static function getFieldDefinitions(): array
    {
        return \Craft::$app->getGql()->prepareFieldDefinitions([
            'calendars' => [
                'name' => 'calendars',
                'type' => Type::listOf(CalendarInterface::getType()),
                'resolve' => CalendarResolver::class.'::resolve',
                'args' => CalendarArguments::getArguments(),
                'description' => 'Query calendars',
                'deprecationReason' => 'Use the root-level `calendars` query instead. Will be removed in 7.0.0.',
            ],
            'calendar' => [
                'name' => 'calendar',
                'type' => CalendarInterface::getType(),
                'resolve' => CalendarResolver::class.'::resolveOne',
                'args' => CalendarArguments::getArguments(),
                'description' => 'Query a single calendar',
                'deprecationReason' => 'Use the root-level `calendar` query instead. Will be removed in 7.0.0.',
            ],
            'events' => [
                'name' => 'events',
                'type' => Type::listOf(EventInterface::getType()),
                'resolve' => EventResolver::class.'::resolve',
                'args' => EventArguments::getArguments(),
                'description' => 'Query calendar events',
                'deprecationReason' => 'Use the root-level `events` query instead. Will be removed in 7.0.0.',
            ],
            'event' => [
                'name' => 'event',
                'type' => EventInterface::getType(),
                'resolve' => EventResolver::class.'::resolveOne',
                'args' => EventArguments::getArguments(),
                'description' => 'Query a single calendar event',
                'deprecationReason' => 'Use the root-level `event` query instead. Will be removed in 7.0.0.',
            ],
            'eventCount' => [
                'name' => 'eventCount',
                'type' => Type::nonNull(Type::int()),
                'resolve' => EventResolver::class.'::resolveCount',
                'args' => EventArguments::getArguments(),
                'description' => 'Count calendar events',
                'deprecationReason' => 'Use the root-level `eventCount` query instead. Will be removed in 7.0.0.',
            ],
            'occurrences' => [
                'name' => 'occurrences',
                'type' => Type::listOf(OccurrenceInterface::getType()),
                'resolve' => OccurrenceResolver::class.'::resolve',
                'args' => OccurrenceArguments::getArguments(),
                'description' => 'Query persisted occurrences',
                'deprecationReason' => 'Use the root-level `occurrences` query instead. Will be removed in 7.0.0.',
            ],
            'occurrence' => [
                'name' => 'occurrence',
                'type' => OccurrenceInterface::getType(),
                'resolve' => OccurrenceResolver::class.'::resolveOne',
                'args' => OccurrenceArguments::getArguments(),
                'description' => 'Query a single persisted occurrence',
                'deprecationReason' => 'Use the root-level `occurrence` query instead. Will be removed in 7.0.0.',
            ],
            'occurrenceCount' => [
                'name' => 'occurrenceCount',
                'type' => Type::nonNull(Type::int()),
                'resolve' => OccurrenceResolver::class.'::resolveCount',
                'args' => OccurrenceArguments::getArguments(),
                'description' => 'Count persisted occurrences',
                'deprecationReason' => 'Use the root-level `occurrenceCount` query instead. Will be removed in 7.0.0.',
            ],
        ], self::getName());
    }
}
