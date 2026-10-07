<?php

namespace Solspace\Calendar\Bundles\GraphQL\Interfaces;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Types\Generators\OccurrenceContentGenerator;
use Solspace\Calendar\Bundles\GraphQL\Types\OccurrenceContentType;

class OccurrenceContentInterface extends AbstractInterface
{
    public static function getName(): string
    {
        return 'CalendarOccurrenceContentInterface';
    }

    public static function getTypeClass(): string
    {
        return OccurrenceContentType::class;
    }

    public static function getGeneratorClass(): string
    {
        return OccurrenceContentGenerator::class;
    }

    public static function getDescription(): string
    {
        return "Calendar occurrence content GraphQL interface. Each field has the occurrence's own value if it overrides that field, and the event's value otherwise.";
    }

    public static function getFieldDefinitions(): array
    {
        return \Craft::$app->getGql()->prepareFieldDefinitions(
            [
                'title' => [
                    'name' => 'title',
                    'type' => Type::string(),
                    'description' => "The occurrence's title",
                ],
                'overriddenFields' => [
                    'name' => 'overriddenFields',
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(Type::string()))),
                    'description' => '`title` and the handles of the custom fields the occurrence overrides',
                ],
            ],
            self::getName(),
        );
    }
}
