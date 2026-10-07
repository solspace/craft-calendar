<?php

namespace Solspace\Calendar\Bundles\GraphQL\Interfaces;

use craft\gql\types\DateTime;
use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Types\Generators\OccurrenceGenerator;
use Solspace\Calendar\Bundles\GraphQL\Types\OccurrenceType;

class OccurrenceInterface extends AbstractInterface
{
    public static function getName(): string
    {
        return 'CalendarOccurrenceInterface';
    }

    public static function getTypeClass(): string
    {
        return OccurrenceType::class;
    }

    public static function getGeneratorClass(): string
    {
        return OccurrenceGenerator::class;
    }

    public static function getDescription(): string
    {
        return 'Calendar occurrence GraphQL interface';
    }

    public static function getFieldDefinitions(): array
    {
        return \Craft::$app->getGql()->prepareFieldDefinitions(
            array_merge(
                parent::getFieldDefinitions(),
                [
                    'id' => [
                        'name' => 'id',
                        'type' => Type::string(),
                        'description' => 'The occurrence identifier',
                    ],
                    'uid' => [
                        'name' => 'uid',
                        'type' => Type::string(),
                        'description' => 'The occurrence UID',
                    ],
                    'recurrenceId' => [
                        'name' => 'recurrenceId',
                        'type' => DateTime::getType(),
                        'description' => "The start the event's schedule gives this occurrence. It stays the same when the occurrence is moved.",
                    ],
                    'code' => [
                        'name' => 'code',
                        'type' => Type::string(),
                        'description' => 'Short code that identifies the occurrence among all events',
                    ],
                    'slug' => [
                        'name' => 'slug',
                        'type' => Type::string(),
                        'description' => "The occurrence's custom slug, or its date followed by its code",
                    ],
                    'startDate' => [
                        'name' => 'startDate',
                        'type' => DateTime::getType(),
                        'description' => 'The occurrence start date',
                    ],
                    'startDateLocalized' => [
                        'name' => 'startDateLocalized',
                        'type' => DateTime::getType(),
                        'description' => 'The occurrence localized start date',
                    ],
                    'endDate' => [
                        'name' => 'endDate',
                        'type' => DateTime::getType(),
                        'description' => 'The occurrence end date',
                    ],
                    'endDateLocalized' => [
                        'name' => 'endDateLocalized',
                        'type' => DateTime::getType(),
                        'description' => 'The occurrence localized end date',
                    ],
                    'allDay' => [
                        'name' => 'allDay',
                        'type' => Type::boolean(),
                        'description' => 'Whether the occurrence is all day',
                    ],
                    'cancelled' => [
                        'name' => 'cancelled',
                        'type' => Type::boolean(),
                        'description' => 'Whether the occurrence is cancelled',
                    ],
                    'isEdited' => [
                        'name' => 'isEdited',
                        'type' => Type::boolean(),
                        'description' => 'Whether the occurrence has its own times or content, or is cancelled',
                    ],
                    'content' => [
                        'name' => 'content',
                        'type' => OccurrenceContentInterface::getType(),
                        'description' => "The occurrence's title and custom fields, with its own values where it overrides the event's",
                    ],
                    'event' => [
                        'name' => 'event',
                        'type' => EventInterface::getType(),
                        'description' => 'The parent event',
                    ],
                    'calendar' => [
                        'name' => 'calendar',
                        'type' => CalendarInterface::getType(),
                        'description' => 'The parent calendar',
                    ],
                ]
            ),
            self::getName(),
        );
    }
}
