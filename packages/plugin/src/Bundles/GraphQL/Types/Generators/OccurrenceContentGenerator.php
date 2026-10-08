<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types\Generators;

use craft\gql\base\Generator;
use craft\gql\base\GeneratorInterface;
use craft\gql\GqlEntityRegistry;
use craft\helpers\Gql;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\OccurrenceContentInterface;
use Solspace\Calendar\Bundles\GraphQL\Types\OccurrenceContentType;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;

/**
 * One content type per calendar, with the custom fields of the calendar's event field layout.
 */
class OccurrenceContentGenerator extends Generator implements GeneratorInterface
{
    public static function getTypeName(CalendarModel $calendar): string
    {
        return $calendar->handle.'_OccurrenceContent';
    }

    public static function generateTypes(mixed $context = null): array
    {
        $gqlTypes = [];

        foreach (Calendar::getInstance()->calendars->getAllCalendars() as $calendar) {
            if (!Gql::isSchemaAwareOf(Event::gqlScopesByContext($calendar))) {
                continue;
            }

            $type = static::generateType($calendar);
            $gqlTypes[$type->name] = $type;
        }

        // Used for content that has no calendar specific type
        $typeName = OccurrenceContentType::getName();
        $gqlTypes[$typeName] = GqlEntityRegistry::getEntity($typeName) ?: GqlEntityRegistry::createEntity($typeName, new OccurrenceContentType([
            'name' => $typeName,
            'description' => 'The Calendar occurrence content entity',
            'fields' => OccurrenceContentInterface::class.'::getFieldDefinitions',
        ]));

        return $gqlTypes;
    }

    public static function generateType(CalendarModel $context): OccurrenceContentType
    {
        $typeName = self::getTypeName($context);
        $contentFieldGqlTypes = self::getContentFields($context);

        $contentFields = \Craft::$app->getGql()->prepareFieldDefinitions(
            array_merge(
                OccurrenceContentInterface::getFieldDefinitions(),
                $contentFieldGqlTypes
            ),
            $typeName
        );

        return GqlEntityRegistry::getEntity($typeName) ?: GqlEntityRegistry::createEntity($typeName, new OccurrenceContentType([
            'name' => $typeName,
            'fields' => static function () use ($contentFields) {
                return $contentFields;
            },
        ]));
    }
}
