<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types\Generators;

use craft\gql\GqlEntityRegistry;
use craft\gql\TypeManager;
use craft\helpers\Gql;
use Solspace\Calendar\Bundles\GraphQL\Arguments\EventArguments;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\EventInterface;
use Solspace\Calendar\Bundles\GraphQL\Types\EventType;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;

class EventGenerator extends AbstractGenerator
{
    public static function getTypeClass(): string
    {
        return EventType::class;
    }

    public static function getArgumentsClass(): string
    {
        return EventArguments::class;
    }

    public static function getInterfaceClass(): string
    {
        return EventInterface::class;
    }

    public static function getDescription(): string
    {
        return 'The Calendar Event entity';
    }

    public static function generateTypes($context = null): array
    {
        $calendars = Calendar::getInstance()->calendars->getAllCalendars();
        $gqlTypes = [];

        foreach ($calendars as $calendar) {
            $requiredContexts = Event::gqlScopesByContext($calendar);

            if (!Gql::isSchemaAwareOf($requiredContexts)) {
                continue;
            }

            // Generate a type for each volume
            $type = static::generateType($calendar);
            $gqlTypes[$type->name] = $type;
        }

        return array_merge($gqlTypes, parent::generateTypes($context));
    }

    public static function generateType(CalendarModel $context)
    {
        $typeName = Event::gqlTypeNameByContext($context);
        $contentFieldGqlTypes = self::getContentFields($context);

        $eventFields = TypeManager::prepareFieldDefinitions(
            array_merge(
                EventInterface::getFieldDefinitions(),
                $contentFieldGqlTypes
            ),
            $typeName
        );

        return GqlEntityRegistry::getEntity($typeName) ?: GqlEntityRegistry::createEntity($typeName, new EventType([
            'name' => $typeName,
            'fields' => function () use ($eventFields) {
                return $eventFields;
            },
        ]));
    }
}
