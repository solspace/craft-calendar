<?php

return [
    // App
    'calendar' => 'calendar/app',
    'calendar/<view:day|week|month>' => 'calendar/app',
    'calendar/<year:\d+>/<month:\d+>/<day:\d+>' => 'calendar/app',
    'calendar/<year:\d+>/<month:\d+>/<day:\d+>/<view:day|week|month>' => 'calendar/app',

    // Calendars
    'calendar/calendars' => 'calendar/calendars/calendars-index',
    'calendar/calendars/new' => 'calendar/calendars/create-calendar',
    'calendar/calendars/duplicate' => 'calendar/calendars/duplicate',
    'calendar/calendars/delete' => 'calendar/calendars/delete-calendar',
    'calendar/calendars/<handle:[\w\-]+>' => 'calendar/calendars/edit-calendar',

    // Events
    'calendar/events' => 'calendar/events/events-index',
    'calendar/events/delete' => 'elements/delete',
    'calendar/events/new' => 'calendar/events/create-event',
    'calendar/events/new/<handle:[\w\-]+>' => 'calendar/events/create-event',
    'calendar/events/<elementId:\d+>' => 'elements/edit',

    // API calls
    'GET calendar/api/calendars' => 'calendar/api/calendars',
    'GET calendar/api/events' => 'calendar/api/events',
    'POST calendar/api/events' => 'calendar/api/create-event',
    'POST calendar/api/events/save' => 'calendar/events-api/save',
    'POST calendar/api/events/delete' => 'calendar/events-api/delete',
    'POST calendar/api/events/move' => 'calendar/events-api/move',
    'POST calendar/api/events/resize' => 'calendar/events-api/resize',

    'calendar/events/api/first-occurrence-date' => 'calendar/events-api/first-occurrence-date',
    'calendar/events/api/create' => 'calendar/events-api/create',
    'calendar/events/api/attributes' => 'calendar/events-api/attributes',
    'calendar/events/api/custom-fields' => 'calendar/events-api/custom-fields',

    // Settings
    'calendar/settings/license' => 'calendar/settings/license',
    'calendar/settings/general' => 'calendar/settings/general',
    'calendar/settings/events' => 'calendar/settings/events',
    'calendar/settings/guest-access' => 'calendar/settings/guest-access',
    'calendar/settings/ics' => 'calendar/settings/ics',
    'calendar/settings/demo-templates' => 'calendar/code-pack/list-contents',
];
