<?php

namespace Solspace\Calendar\Bundles\GraphQL\Interfaces;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Arguments\EventArguments;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\EventResolver;
use Solspace\Calendar\Bundles\GraphQL\Types\CalendarType;
use Solspace\Calendar\Bundles\GraphQL\Types\Generators\CalendarGenerator;

class CalendarInterface extends AbstractInterface
{
    public static function getName(): string
    {
        return 'CalendarInterface';
    }

    public static function getTypeClass(): string
    {
        return CalendarType::class;
    }

    public static function getGeneratorClass(): string
    {
        return CalendarGenerator::class;
    }

    public static function getDescription(): string
    {
        return 'Calendar GraphQL Interface';
    }

    public static function getFieldDefinitions(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::int(),
                'description' => "The calendar's ID",
            ],
            'uid' => [
                'name' => 'uid',
                'type' => Type::string(),
                'description' => "The calendar's UID",
            ],
            'name' => [
                'name' => 'name',
                'type' => Type::string(),
                'description' => "The calendar's name",
            ],
            'handle' => [
                'name' => 'handle',
                'type' => Type::string(),
                'description' => "The calendar's handle",
            ],
            'description' => [
                'name' => 'description',
                'type' => Type::string(),
                'description' => "The calendar's description",
            ],
            'color' => [
                'name' => 'color',
                'type' => Type::string(),
                'description' => "The calendar's color",
            ],
            'lighterColor' => [
                'name' => 'lighterColor',
                'type' => Type::string(),
                'description' => "The calendar's color",
            ],
            'darkerColor' => [
                'name' => 'darkerColor',
                'type' => Type::string(),
                'description' => "The calendar's color",
            ],
            'descriptionFieldHandle' => [
                'name' => 'name',
                'type' => Type::string(),
                'description' => "The calendar's description field handle",
            ],
            'locationFieldHandle' => [
                'name' => 'name',
                'type' => Type::string(),
                'description' => "The calendar's location field handle",
            ],
            'icsHash' => [
                'name' => 'icsHash',
                'type' => Type::string(),
                'description' => "The calendar's ICS hash",
            ],
            'icsTimezone' => [
                'name' => 'name',
                'type' => Type::string(),
                'description' => "The calendar's ICS timezone",
            ],
            'allowRepeatingEvents' => [
                'name' => 'allowRepeatingEvents',
                'type' => Type::boolean(),
                'description' => 'Are repeating events allowed?',
            ],
            'events' => [
                'name' => 'events',
                'type' => Type::listOf(EventInterface::getType()),
                'resolve' => EventResolver::class.'::resolve',
                'args' => EventArguments::getArguments(),
                'description' => "The calendar's events",
            ],
        ];
    }
}
