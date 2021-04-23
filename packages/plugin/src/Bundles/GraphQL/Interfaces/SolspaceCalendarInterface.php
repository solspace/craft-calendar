<?php

namespace Solspace\Calendar\Bundles\GraphQL\Interfaces;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Arguments\CalendarArguments;
use Solspace\Calendar\Bundles\GraphQL\Arguments\EventArguments;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\CalendarResolver;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\EventResolver;
use Solspace\Calendar\Bundles\GraphQL\Types\Generators\SolspaceCalendarGenerator;
use Solspace\Calendar\Bundles\GraphQL\Types\SolspaceCalendarType;

class SolspaceCalendarInterface extends AbstractInterface
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
        return 'Solspace Calendar GraphQL Interface';
    }

    public static function getFieldDefinitions(): array
    {
        return [
            'version' => [
                'name' => 'version',
                'type' => Type::string(),
                'description' => 'Solspace Calendar version',
            ],
            'calendars' => [
                'name' => 'calendars',
                'type' => Type::listOf(CalendarInterface::getType()),
                'resolve' => CalendarResolver::class.'::resolve',
                'args' => CalendarArguments::getArguments(),
                'description' => 'Solspace Calendar calendars',
            ],
            'calendar' => [
                'name' => 'calendar',
                'type' => CalendarInterface::getType(),
                'resolve' => CalendarResolver::class.'::resolveOne',
                'args' => CalendarArguments::getArguments(),
                'description' => 'Solspace Calendar calendar',
            ],
            'events' => [
                'name' => 'events',
                'type' => Type::listOf(EventInterface::getType()),
                'resolve' => EventResolver::class.'::resolve',
                'args' => EventArguments::getArguments(),
                'description' => 'Solspace Calendar events',
            ],
            'event' => [
                'name' => 'event',
                'type' => EventInterface::getType(),
                'resolve' => EventResolver::class.'::resolveOne',
                'args' => EventArguments::getArguments(),
                'description' => 'Solspace Calendar event',
            ],
        ];
    }
}
