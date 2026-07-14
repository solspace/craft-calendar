<?php

namespace Solspace\Calendar\Bundles\GraphQL\Mutations;

use craft\base\GqlInlineFragmentFieldInterface;
use craft\gql\base\ElementMutationResolver;
use craft\gql\base\Mutation;
use craft\gql\base\MutationResolver;
use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\GqlPermissions;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\EventInterface;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\Mutations\EventMutationResolver;
use Solspace\Calendar\Bundles\GraphQL\Types\Generators\EventGenerator;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;

class EventMutation extends Mutation
{
    public static function getMutations(): array
    {
        $mutations = [];
        $publishDraftMutations = false;

        foreach (Calendar::getInstance()->calendars->getAllCalendars() as $calendar) {
            $canSaveEvents = GqlPermissions::canSaveAllEvents() || GqlPermissions::canSaveEventsInCalendar($calendar->uid);

            if (
                !GqlPermissions::canCreateAllEvents()
                && !GqlPermissions::canCreateEventsInCalendar($calendar->uid)
                && !$canSaveEvents
            ) {
                continue;
            }

            if (!$publishDraftMutations && $canSaveEvents) {
                $publishDraftMutations = true;
            }

            $mutationResolver = \Craft::createObject(EventMutationResolver::class);
            $mutationResolver->setResolutionData('calendar', $calendar);
            self::prepareResolver($mutationResolver, EventGenerator::getMutationContentFields($calendar));

            $mutations[] = [
                'name' => Event::gqlMutationNameByContext($calendar),
                'type' => EventGenerator::generateType($calendar),
                'args' => array_merge(
                    self::getArguments(),
                    $mutationResolver->getResolutionData(ElementMutationResolver::CONTENT_FIELD_KEY) ?? []
                ),
                'resolve' => [$mutationResolver, 'saveEvent'],
                'description' => Calendar::t('Save an event in the "{calendar}" calendar.', [
                    'calendar' => $calendar->name,
                ]),
            ];

            if ($canSaveEvents) {
                $draftMutationResolver = \Craft::createObject(EventMutationResolver::class);
                $draftMutationResolver->setResolutionData('calendar', $calendar);
                $draftMutationResolver->setResolutionData('draftMutation', true);
                self::prepareResolver($draftMutationResolver, EventGenerator::getMutationContentFields($calendar));

                $mutations[] = [
                    'name' => Event::gqlDraftMutationNameByContext($calendar),
                    'type' => EventGenerator::generateType($calendar),
                    'args' => array_merge(
                        self::getDraftArguments(),
                        $draftMutationResolver->getResolutionData(ElementMutationResolver::CONTENT_FIELD_KEY) ?? []
                    ),
                    'resolve' => [$draftMutationResolver, 'saveEvent'],
                    'description' => Calendar::t('Save an event draft in the "{calendar}" calendar.', [
                        'calendar' => $calendar->name,
                    ]),
                ];
            }
        }

        if ($publishDraftMutations) {
            $mutationResolver = \Craft::createObject(EventMutationResolver::class);

            $mutations[] = [
                'name' => 'publishEventDraft',
                'type' => Type::id(),
                'args' => self::getPublishDraftArguments(),
                'resolve' => [$mutationResolver, 'publishDraft'],
                'description' => Calendar::t('Publish a Calendar event draft and return the event ID.'),
            ];
        }

        return $mutations;
    }

    protected static function prepareResolver(MutationResolver $resolver, array $contentFields): void
    {
        $fieldList = [];

        foreach ($contentFields as $contentField) {
            if ($contentField instanceof GqlInlineFragmentFieldInterface) {
                continue;
            }

            $contentFieldType = $contentField->getContentGqlMutationArgumentType();
            if (!$contentFieldType) {
                continue;
            }

            $handle = $contentField->handle;
            $fieldList[$handle] = $contentFieldType instanceof Type ? ['type' => $contentFieldType] : $contentFieldType;
            $configArray = \is_array($contentFieldType) ? $contentFieldType : $contentFieldType->config;

            if (\is_array($configArray) && !empty($configArray['normalizeValue'])) {
                $resolver->setValueNormalizer($handle, $configArray['normalizeValue']);
            }
        }

        $resolver->setResolutionData(ElementMutationResolver::CONTENT_FIELD_KEY, $fieldList);
    }

    private static function getArguments(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::int(),
                'description' => 'The event ID to update.',
            ],
            'siteId' => [
                'name' => 'siteId',
                'type' => Type::int(),
                'description' => 'The site ID to save the event in.',
            ],
            'calendarId' => [
                'name' => 'calendarId',
                'type' => Type::int(),
                'description' => 'The calendar ID to move the event to.',
            ],
            'title' => [
                'name' => 'title',
                'type' => Type::string(),
                'description' => 'The event title.',
            ],
            'slug' => [
                'name' => 'slug',
                'type' => Type::string(),
                'description' => 'The event slug.',
            ],
            'authorId' => [
                'name' => 'authorId',
                'type' => Type::int(),
                'description' => 'The event author ID.',
            ],
            'postDate' => [
                'name' => 'postDate',
                'type' => Type::string(),
                'description' => 'The event post date.',
            ],
            'startDate' => [
                'name' => 'startDate',
                'type' => Type::string(),
                'description' => 'The event start date.',
            ],
            'endDate' => [
                'name' => 'endDate',
                'type' => Type::string(),
                'description' => 'The event end date.',
            ],
            'until' => [
                'name' => 'until',
                'type' => Type::string(),
                'description' => 'The repeat-until date.',
            ],
            'timezone' => [
                'name' => 'timezone',
                'type' => Type::string(),
                'description' => 'The event timezone.',
            ],
            'allDay' => [
                'name' => 'allDay',
                'type' => Type::boolean(),
                'description' => 'Whether the event is all-day.',
            ],
            'rrule' => [
                'name' => 'rrule',
                'type' => Type::string(),
                'description' => EventInterface::RRULE_DESCRIPTION,
            ],
        ];
    }

    private static function getDraftArguments(): array
    {
        $arguments = self::getArguments();
        unset($arguments['id'], $arguments['calendarId']);

        return array_merge(
            $arguments,
            [
                'draftId' => [
                    'name' => 'draftId',
                    'type' => Type::id(),
                    'description' => Calendar::t('The ID of the draft to update. Omit it to create a new draft event.'),
                ],
                'provisional' => [
                    'name' => 'provisional',
                    'type' => Type::boolean(),
                    'description' => Calendar::t('Whether a provisional draft should be looked up.'),
                ],
                'draftName' => [
                    'name' => 'draftName',
                    'type' => Type::string(),
                    'description' => Calendar::t('The name of the draft.'),
                ],
                'draftNotes' => [
                    'name' => 'draftNotes',
                    'type' => Type::string(),
                    'description' => Calendar::t('Notes for the draft.'),
                ],
                'creatorId' => [
                    'name' => 'creatorId',
                    'type' => Type::int(),
                    'description' => Calendar::t('The ID of the draft creator.'),
                ],
            ]
        );
    }

    private static function getPublishDraftArguments(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::id()),
                'description' => Calendar::t('The ID of the draft to publish.'),
            ],
            'siteId' => [
                'name' => 'siteId',
                'type' => Type::int(),
                'description' => Calendar::t('The site ID to publish the draft in.'),
            ],
            'provisional' => [
                'name' => 'provisional',
                'type' => Type::boolean(),
                'description' => Calendar::t('Whether the draft is provisional.'),
            ],
        ];
    }
}
