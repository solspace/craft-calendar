<?php

namespace Solspace\Calendar\Bundles\GraphQL\Interfaces;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Arguments\CalendarArguments;
use Solspace\Calendar\Bundles\GraphQL\Arguments\EventArguments;
use Solspace\Calendar\Bundles\GraphQL\Arguments\OccurrenceArguments;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\CalendarResolver;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\EventResolver;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\OccurrenceResolver;
use Solspace\Calendar\Bundles\GraphQL\Types\CalendarGraphType;
use Solspace\Calendar\Bundles\GraphQL\Types\Generators\CalendarGraphGenerator;

class CalendarGraphInterface extends AbstractInterface
{
    public static function getName(): string
    {
        return 'CalendarGraphInterface';
    }

    public static function getTypeClass(): string
    {
        return CalendarGraphType::class;
    }

    public static function getGeneratorClass(): string
    {
        return CalendarGraphGenerator::class;
    }

    public static function getDescription(): string
    {
        return 'Calendar GraphQL root interface';
    }

    public static function getFieldDefinitions(): array
    {
        return [
            'calendars' => [
                'name' => 'calendars',
                'type' => Type::listOf(CalendarInterface::getType()),
                'resolve' => CalendarResolver::class.'::resolve',
                'args' => CalendarArguments::getArguments(),
                'description' => 'Query calendars',
            ],
            'calendar' => [
                'name' => 'calendar',
                'type' => CalendarInterface::getType(),
                'resolve' => CalendarResolver::class.'::resolveOne',
                'args' => CalendarArguments::getArguments(),
                'description' => 'Query a single calendar',
            ],
            'events' => [
                'name' => 'events',
                'type' => Type::listOf(EventInterface::getType()),
                'resolve' => EventResolver::class.'::resolve',
                'args' => EventArguments::getArguments(),
                'description' => 'Query calendar events',
            ],
            'event' => [
                'name' => 'event',
                'type' => EventInterface::getType(),
                'resolve' => EventResolver::class.'::resolveOne',
                'args' => EventArguments::getArguments(),
                'description' => 'Query a single calendar event',
            ],
            'eventCount' => [
                'name' => 'eventCount',
                'type' => Type::nonNull(Type::int()),
                'resolve' => EventResolver::class.'::resolveCount',
                'args' => EventArguments::getArguments(),
                'description' => 'Count calendar events',
            ],
            'occurrences' => [
                'name' => 'occurrences',
                'type' => Type::listOf(OccurrenceInterface::getType()),
                'resolve' => OccurrenceResolver::class.'::resolve',
                'args' => OccurrenceArguments::getArguments(),
                'description' => 'Query persisted occurrences',
            ],
            'occurrence' => [
                'name' => 'occurrence',
                'type' => OccurrenceInterface::getType(),
                'resolve' => OccurrenceResolver::class.'::resolveOne',
                'args' => OccurrenceArguments::getArguments(),
                'description' => 'Query a single persisted occurrence',
            ],
            'occurrenceCount' => [
                'name' => 'occurrenceCount',
                'type' => Type::nonNull(Type::int()),
                'resolve' => OccurrenceResolver::class.'::resolveCount',
                'args' => OccurrenceArguments::getArguments(),
                'description' => 'Count persisted occurrences',
            ],
        ];
    }
}
