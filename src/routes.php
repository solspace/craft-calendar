<?php

$datePattern = '<view:month|week|day>/<year:\d+>/<month:\d+>/<day:\d+>';

return [
    'calendar'                                          => 'calendar/settings/default-view',
    'calendar/calendars'                                => 'calendar/calendars/calendars-index',
    'calendar/calendars/new'                            => 'calendar/calendars/create-calendar',
    'calendar/calendars/<handle:\w+>'                   => 'calendar/calendars/edit-calendar',
    'calendar/calendars/delete'                         => 'calendar/calendars/delete-calendar',
    'calendar/events'                                   => 'calendar/events/events-index',
    'calendar/events/delete-event'                      => 'calendar/events/delete-event',
    'calendar/events/new'                               => 'calendar/events/create-event',
    'calendar/events/new/<handle:\w+>/<siteHandle:\w+>' => 'calendar/events/create-event',
    'calendar/events/new/<handle:\w+>'                  => 'calendar/events/create-event',
    'calendar/events/<id:\d+>'                          => 'calendar/events/edit-event',
    'calendar/events/<id:\d+>/<siteHandle:\w+>'         => 'calendar/events/edit-event',
    // API calls
    'calendar/events/api/modify-date'                   => 'calendar/events-api/modify-date',
    'calendar/events/api/modify-duration'               => 'calendar/events-api/modify-duration',
    'calendar/events/api/create'                        => 'calendar/events-api/create',
    'calendar/events/api/delete'                        => 'calendar/events-api/delete',
    'calendar/events/api/delete-occurrence'             => 'calendar/events-api/delete-occurrence',
    // Views
    'calendar/month'                                    => 'calendar/view/month-data',
    'calendar/view/<view:month|week|day>'               => 'calendar/view/target-time',
    'calendar/view/' . $datePattern                     => 'calendar/view/target-time',
    // Settings
    'calendar/settings/license'                         => 'calendar/settings/license',
    'calendar/settings/general'                         => 'calendar/settings/general',
    'calendar/settings/events'                          => 'calendar/settings/events',
    'calendar/settings/guest-access'                    => 'calendar/settings/guest-access',
    'calendar/settings/ics'                             => 'calendar/settings/ics',
    'calendar/settings/demo-templates'                  => 'calendar/codepack/list-contents',
];
