<?php

namespace Solspace\Calendar\Bundles\GraphQL\Interfaces;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Types\DurationType;
use Solspace\Calendar\Bundles\GraphQL\Types\Generators\DurationGenerator;

class DurationInterface extends AbstractInterface
{
    public static function getName(): string
    {
        return 'DurationInterface';
    }

    public static function getTypeClass(): string
    {
        return DurationType::class;
    }

    public static function getGeneratorClass(): string
    {
        return DurationGenerator::class;
    }

    public static function getDescription(): string
    {
        return 'Event Duration Interface';
    }

    public static function getFieldDefinitions(): array
    {
        return [
            'humanReadable' => [
                'name' => 'humanReadable',
                'type' => Type::string(),
                'description' => 'A human readable string of the duration',
            ],
            'years' => [
                'name' => 'years',
                'type' => Type::int(),
                'description' => 'The amount of years for the duration',
            ],
            'months' => [
                'name' => 'months',
                'type' => Type::int(),
                'description' => 'The amount of months for the duration',
            ],
            'days' => [
                'name' => 'days',
                'type' => Type::int(),
                'description' => 'The amount of days for the duration',
            ],
            'hours' => [
                'name' => 'hours',
                'type' => Type::int(),
                'description' => 'The amount of hours for the duration',
            ],
            'minutes' => [
                'name' => 'minutes',
                'type' => Type::int(),
                'description' => 'The amount of minutes for the duration',
            ],
            'seconds' => [
                'name' => 'seconds',
                'type' => Type::int(),
                'description' => 'The amount of seconds for the duration',
            ],
        ];
    }
}
