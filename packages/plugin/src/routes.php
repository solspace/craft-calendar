<?php

$datePattern = '<view:month|week|day>/<year:\d+>/<month:\d+>/<day:\d+>';

return [
    'calendar' => 'calendar/app',
    'calendar/calendars' => 'calendar/calendars/calendars-index',
    'calendar/calendars/new' => 'calendar/calendars/create-calendar',
    'calendar/calendars/duplicate' => 'calendar/calendars/duplicate',
    'calendar/calendars/delete' => 'calendar/calendars/delete-calendar',
    'calendar/calendars/<handle:[\w\-]+>' => 'calendar/calendars/edit-calendar',

    'calendar/events' => 'calendar/events/events-index',
    'calendar/events/delete' => 'elements/delete',
    'calendar/events/new' => 'calendar/events/create-event',
    'calendar/events/new/<handle:[\w\-]+>' => 'calendar/events/create-event',
    'calendar/events/<elementId:\d+>' => 'elements/edit',

    // API calls
    'calendar/events/api/first-occurrence-date' => 'calendar/events-api/first-occurrence-date',
    'calendar/events/api/modify-date' => 'calendar/events-api/modify-date',
    'calendar/events/api/modify-duration' => 'calendar/events-api/modify-duration',
    'calendar/events/api/create' => 'calendar/events-api/create',
    'calendar/events/api/delete' => 'calendar/events-api/delete',
    'calendar/events/api/delete-occurrence' => 'calendar/events-api/delete-occurrence',
    'calendar/events/api/attributes' => 'calendar/events-api/attributes',
    'calendar/events/api/custom-fields' => 'calendar/events-api/custom-fields',
    // Views
    'calendar/month' => 'calendar/view/month-data',
    'calendar/view/<view:month|week|day>' => 'calendar/view/target-time',
    'calendar/view/'.$datePattern => 'calendar/view/target-time',
    // Settings
    'calendar/settings/license' => 'calendar/settings/license',
    'calendar/settings/general' => 'calendar/settings/general',
    'calendar/settings/events' => 'calendar/settings/events',
    'calendar/settings/guest-access' => 'calendar/settings/guest-access',
    'calendar/settings/ics' => 'calendar/settings/ics',
    'calendar/settings/demo-templates' => 'calendar/codepack/list-contents',

    'calendar/api/events' => 'calendar/api/events',
];
