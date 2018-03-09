<?php

/**
 * Dynamic routes for the craft/config/routes.php file
 */

return array(
    'demo/mini_cal/(?P<year>\d{4})/(?P<month>\d{2})' => 'demo/mini_cal.html',
    'demo/month/(?P<year>\d{4})/(?P<month>\d{2})' => 'demo/month.html',
    'demo/month/calendar/(?P<slug>[^\/]+)' => 'demo/month.html',
    'demo/month/calendar/(?P<slug>[^\/]+)/(?P<year>\d{4})/(?P<month>\d{2})' => 'demo/month.html',
    'demo/week/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/week.html',
    'demo/week/calendar/(?P<slug>[^\/]+)' => 'demo/week.html',
    'demo/week/calendar/(?P<slug>[^\/]+)/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/week.html',
    'demo/day/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/day.html',
    'demo/day/calendar/(?P<slug>[^\/]+)' => 'demo/day.html',
    'demo/day/calendar/(?P<slug>[^\/]+)/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/day.html',
    'demo/calendars/(?P<slug>[^\/]+)' => 'demo/calendars.html',
    'demo/event/(?P<id>\d+)' => 'demo/event.html',
    'demo/event/(?P<id>\d+)/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/event.html',
    'demo/events/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/events.html',
    'demo/export/event/(?P<id>\d+)' => 'demo/export.html',
    'demo/edit/event/(?P<id>\d+)' => 'demo/edit.html',
    'demo/edit/event/new' => 'demo/edit.html',
    'demo/export/calendar/(?P<id>\d+)' => 'demo/export.html',
    'demo/fullcalendar/(?P<slug>[^\/]+)/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})' => 'demo/fullcalendar.html',
    'demo/resources/event_data/(?P<id>\d+)' => 'demo/resources/event_data.html',
);
