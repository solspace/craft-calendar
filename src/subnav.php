<?php

use Solspace\Calendar\Calendar;
use Solspace\Commons\Helpers\PermissionHelper;

$subnav = [
    'month' => ['label' => Calendar::t('Month'), 'url' => 'calendar/view/month'],
    'week'  => ['label' => Calendar::t('Week'), 'url' => 'calendar/view/week'],
    'day'   => ['label' => Calendar::t('Day'), 'url' => 'calendar/view/day'],
];

if (PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR, true)) {
    $subnav['events'] = [
        'label' => Calendar::t('Events'),
        'url'   => 'calendar/events',
    ];
}

if (PermissionHelper::checkPermission(Calendar::PERMISSION_CALENDARS)) {
    $subnav['calendars'] = [
        'label' => Calendar::t('Calendars'),
        'url'   => 'calendar/calendars',
    ];
}

if (PermissionHelper::checkPermission(Calendar::PERMISSION_SETTINGS)) {
    $subnav['settings'] = [
        'label' => Calendar::t('Settings'),
        'url'   => 'calendar/settings',
    ];
}

return $subnav;
