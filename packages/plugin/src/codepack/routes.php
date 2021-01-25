<?php

/**
 * Dynamic routes for the craft/config/routes.php file.
 */

return [
    'demo/mini_cal/(?P<year>\d{4})/(?P<month>\d{2})' => 'demo/mini_cal',
    'demo/month/(?P<year>\d{4})/(?P<month>\d{2})' => 'demo/month',
    'demo/month/calendar/(?P<slug>[^\/]+)' => 'demo/month',
    'demo/month/calendar/(?P<slug>[^\/]+)/(?P<year>\d{4})/(?P<month>\d{2})' => 'demo/month',
    'demo/week/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/week',
    'demo/week/calendar/(?P<slug>[^\/]+)' => 'demo/week',
    'demo/week/calendar/(?P<slug>[^\/]+)/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/week',
    'demo/day/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/day',
    'demo/day/calendar/(?P<slug>[^\/]+)' => 'demo/day',
    'demo/day/calendar/(?P<slug>[^\/]+)/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/day',
    'demo/calendars/(?P<slug>[^\/]+)' => 'demo/calendars',
    'demo/event/(?P<id>\d+)' => 'demo/event',
    'demo/event/(?P<id>\d+)/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/event',
    'demo/events/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/events',
    'demo/export/event/(?P<id>\d+)' => 'demo/export',
    'demo/edit/event/(?P<id>\d+)' => 'demo/edit',
    'demo/edit/event/new' => 'demo/edit',
    'demo/export/calendar/(?P<id>\d+)' => 'demo/export',
    'demo/fullcalendar/(?P<slug>[^\/]+)/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/fullcalendar',
    'demo/resources/event_data/(?P<id>\d+)' => 'demo/resources/event_data',
];
