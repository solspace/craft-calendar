<?php

namespace Solspace\Calendar\Bundles\GraphQL;

use craft\events\RegisterGqlMutationsEvent;
use craft\events\RegisterGqlQueriesEvent;
use craft\events\RegisterGqlSchemaComponentsEvent;
use craft\events\RegisterGqlTypesEvent;
use craft\services\Gql;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\CalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\DurationInterface;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\EventInterface;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\OccurrenceInterface;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\SolspaceCalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Mutations\CalendarMutation;
use Solspace\Calendar\Bundles\GraphQL\Mutations\EventMutation;
use Solspace\Calendar\Bundles\GraphQL\Queries\CalendarQuery;
use Solspace\Calendar\Bundles\GraphQL\Queries\SolspaceCalendarQuery;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Services\CalendarsService;
use yii\base\Event;

class GraphQLBundle implements BundleInterface
{
    public function __construct()
    {
        if (version_compare(\Craft::$app->version, '3.5.0', '<')) {
            return;
        }

        Event::on(
            Gql::class,
            Gql::EVENT_REGISTER_GQL_TYPES,
            static function (RegisterGqlTypesEvent $event) {
                $event->types[] = DurationInterface::class;
                $event->types[] = CalendarInterface::class;
                $event->types[] = EventInterface::class;
                $event->types[] = OccurrenceInterface::class;
                $event->types[] = SolspaceCalendarInterface::class;
            }
        );

        Event::on(
            Gql::class,
            Gql::EVENT_REGISTER_GQL_QUERIES,
            static function (RegisterGqlQueriesEvent $event) {
                $event->queries = array_merge(
                    $event->queries,
                    CalendarQuery::getQueries(),
                    SolspaceCalendarQuery::getQueries(),
                );
            }
        );

        Event::on(
            Gql::class,
            Gql::EVENT_REGISTER_GQL_MUTATIONS,
            static function (RegisterGqlMutationsEvent $event) {
                $event->mutations = array_merge(
                    $event->mutations,
                    CalendarMutation::getMutations(),
                    EventMutation::getMutations(),
                );
            }
        );

        Event::on(
            Gql::class,
            Gql::EVENT_REGISTER_GQL_SCHEMA_COMPONENTS,
            static function (RegisterGqlSchemaComponentsEvent $event) {
                $calendarInstance = Calendar::getInstance();
                $calendarCategory = GqlPermissions::CATEGORY_CALENDARS;
                $eventsCategory = GqlPermissions::CATEGORY_EVENTS;

                $queryPermissions = [
                    "{$calendarCategory}.all:read" => [
                        'label' => Calendar::t('View All Calendars'),
                    ],
                    "{$eventsCategory}.all:read" => [
                        'label' => Calendar::t('View Events in All Calendars'),
                    ],
                ];

                $mutationPermissions = [
                    "{$calendarCategory}.all:create" => [
                        'label' => Calendar::t('Create New Calendars'),
                    ],
                    "{$calendarCategory}.all:save" => [
                        'label' => Calendar::t('Manage All Calendars'),
                    ],
                    "{$eventsCategory}.all:create" => [
                        'label' => Calendar::t('Create Events in All Calendars'),
                    ],
                    "{$eventsCategory}.all:save" => [
                        'label' => Calendar::t('Manage All Events'),
                    ],
                ];

                $calendars = $calendarInstance->calendars->getAllCalendars();
                foreach ($calendars as $calendar) {
                    $uid = $calendar->uid;
                    $queryPermissions["{$calendarCategory}.{$uid}:read"] = [
                        'label' => Calendar::t(
                            'View "{calendar}" calendar',
                            ['calendar' => $calendar->name]
                        ),
                    ];
                    $queryPermissions["{$eventsCategory}.{$uid}:read"] = [
                        'label' => Calendar::t(
                            'View events in "{calendar}" calendar',
                            ['calendar' => $calendar->name]
                        ),
                    ];
                    $mutationPermissions["{$calendarCategory}.{$uid}:save"] = [
                        'label' => Calendar::t(
                            'Manage "{calendar}" calendar',
                            ['calendar' => $calendar->name]
                        ),
                    ];
                    $mutationPermissions["{$eventsCategory}.{$uid}:create"] = [
                        'label' => Calendar::t(
                            'Create events in "{calendar}" calendar',
                            ['calendar' => $calendar->name]
                        ),
                    ];
                    $mutationPermissions["{$eventsCategory}.{$uid}:save"] = [
                        'label' => Calendar::t(
                            'Manage events in "{calendar}" calendar',
                            ['calendar' => $calendar->name]
                        ),
                    ];
                }

                $event->queries[$calendarInstance->name] = $queryPermissions;
                $event->mutations[$calendarInstance->name] = $mutationPermissions;
            }
        );

        Event::on(
            CalendarsService::class,
            CalendarsService::EVENT_AFTER_SAVE,
            static function () {
                \Craft::$app->gql->flushCaches();
            }
        );

        Event::on(
            CalendarsService::class,
            CalendarsService::EVENT_AFTER_DELETE,
            static function () {
                \Craft::$app->gql->flushCaches();
            }
        );
    }
}
