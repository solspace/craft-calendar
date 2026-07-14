<?php

namespace Solspace\Calendar\Bundles\GraphQL\Mutations;

use craft\gql\base\Mutation;
use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\Mutations\CalendarMutationResolver;
use Solspace\Calendar\Bundles\GraphQL\Types\Generators\CalendarGenerator;
use Solspace\Calendar\Calendar;

class CalendarMutation extends Mutation
{
    public static function getMutations(): array
    {
        if (!self::canMutateCalendars()) {
            return [];
        }

        $mutationResolver = \Craft::createObject(CalendarMutationResolver::class);

        return [
            [
                'name' => 'saveCalendar',
                'type' => CalendarGenerator::generateTypes()[CalendarGenerator::getName()],
                'args' => [
                    'id' => [
                        'name' => 'id',
                        'type' => Type::int(),
                        'description' => 'The calendar ID to update.',
                    ],
                    'uid' => [
                        'name' => 'uid',
                        'type' => Type::string(),
                        'description' => 'The calendar UID to update.',
                    ],
                    'name' => [
                        'name' => 'name',
                        'type' => Type::string(),
                        'description' => 'The calendar name.',
                    ],
                    'handle' => [
                        'name' => 'handle',
                        'type' => Type::string(),
                        'description' => 'The calendar handle.',
                    ],
                    'description' => [
                        'name' => 'description',
                        'type' => Type::string(),
                        'description' => 'The calendar description.',
                    ],
                    'color' => [
                        'name' => 'color',
                        'type' => Type::string(),
                        'description' => 'The calendar color.',
                    ],
                    'titleFormat' => [
                        'name' => 'titleFormat',
                        'type' => Type::string(),
                        'description' => 'The event title format when the calendar does not have a title field.',
                    ],
                    'titleLabel' => [
                        'name' => 'titleLabel',
                        'type' => Type::string(),
                        'description' => 'The event title field label.',
                    ],
                    'hasTitleField' => [
                        'name' => 'hasTitleField',
                        'type' => Type::boolean(),
                        'description' => 'Whether the calendar has a title field.',
                    ],
                    'titleTranslationMethod' => [
                        'name' => 'titleTranslationMethod',
                        'type' => Type::string(),
                        'description' => 'The event title translation method.',
                    ],
                    'titleTranslationKeyFormat' => [
                        'name' => 'titleTranslationKeyFormat',
                        'type' => Type::string(),
                        'description' => 'The event title translation key format.',
                    ],
                    'descriptionFieldHandle' => [
                        'name' => 'descriptionFieldHandle',
                        'type' => Type::string(),
                        'description' => 'The field handle used for event descriptions.',
                    ],
                    'locationFieldHandle' => [
                        'name' => 'locationFieldHandle',
                        'type' => Type::string(),
                        'description' => 'The field handle used for event locations.',
                    ],
                    'icsTimezone' => [
                        'name' => 'icsTimezone',
                        'type' => Type::string(),
                        'description' => 'The calendar ICS timezone.',
                    ],
                    'allowRepeatingEvents' => [
                        'name' => 'allowRepeatingEvents',
                        'type' => Type::boolean(),
                        'description' => 'Whether repeating events are allowed.',
                    ],
                ],
                'resolve' => [$mutationResolver, 'saveCalendar'],
                'description' => Calendar::t('Save a calendar.'),
            ],
        ];
    }

    private static function canMutateCalendars(): bool
    {
        if (GqlPermissions::canCreateCalendars() || GqlPermissions::canSaveAllCalendars()) {
            return true;
        }

        foreach (Calendar::getInstance()->calendars->getAllCalendars() as $calendar) {
            if (GqlPermissions::canSaveCalendar($calendar->uid)) {
                return true;
            }
        }

        return false;
    }
}
