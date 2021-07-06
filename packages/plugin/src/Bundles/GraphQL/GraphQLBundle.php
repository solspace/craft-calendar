<?php

namespace Solspace\Calendar\Bundles\GraphQL;

use craft\events\RegisterGqlQueriesEvent;
use craft\events\RegisterGqlSchemaComponentsEvent;
use craft\events\RegisterGqlTypesEvent;
use craft\services\Gql;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\CalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\DurationInterface;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\EventInterface;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\SolspaceCalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Queries\SolspaceCalendarQuery;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Bundles\BundleInterface;
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
            function (RegisterGqlTypesEvent $event) {
                $event->types[] = DurationInterface::class;
                $event->types[] = SolspaceCalendarInterface::class;
                $event->types[] = CalendarInterface::class;
                $event->types[] = EventInterface::class;
            }
        );

        Event::on(
            Gql::class,
            Gql::EVENT_REGISTER_GQL_QUERIES,
            function (RegisterGqlQueriesEvent $event) {
                $event->queries = array_merge(
                    $event->queries,
                    SolspaceCalendarQuery::getQueries()
                );
            }
        );

        Event::on(
            Gql::class,
            Gql::EVENT_REGISTER_GQL_SCHEMA_COMPONENTS,
            function (RegisterGqlSchemaComponentsEvent $event) {
                $calendarInstance = Calendar::getInstance();
                $calendarCategory = GqlPermissions::CATEGORY_CALENDARS;

                $nestedCalendarPermissions = [];
                $calendars = $calendarInstance->calendars->getAllCalendars();
                foreach ($calendars as $calendar) {
                    $uid = $calendar->uid;
                    $nestedCalendarPermissions["{$calendarCategory}.{$uid}:read"] = [
                        'label' => Calendar::t(
                            'View "{calendar}" calendar',
                            ['calendar' => $calendar->name]
                        ),
                    ];
                }

                $permissions = [
                    "{$calendarCategory}.all:read" => [
                        'label' => Calendar::t('View All Calendars'),
                        'nested' => $nestedCalendarPermissions,
                    ],
                ];

                $event->queries[$calendarInstance->name] = $permissions;
            }
        );
    }
}
