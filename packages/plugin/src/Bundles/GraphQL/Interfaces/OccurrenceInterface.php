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
