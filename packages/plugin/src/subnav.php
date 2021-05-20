<?php

use Solspace\Calendar\Calendar;
use Solspace\Commons\Helpers\PermissionHelper;

$subnav = [
    'month' => ['label' => Calendar::t('Month'), 'url' => 'calendar/view/month'],
    'week' => ['label' => Calendar::t('Week'), 'url' => 'calendar/view/week'],
    'day' => ['label' => Calendar::t('Day'), 'url' => 'calendar/view/day'],
];

if (PermissionHelper::checkPermission(Calendar::PERMISSION_EVENTS_FOR, true)) {
    $subnav['events'] = [
        'label' => Calendar::t('Events'),
        'url' => 'calendar/events',
    ];
}

$isAllowAdminChanges = true;
if (version_compare(Craft::$app->getVersion(), '3.1', '>=')) {
    $isAllowAdminChanges = Craft::$app->getConfig()->getGeneral()->allowAdminChanges;
}

if (PermissionHelper::checkPermission(Calendar::PERMISSION_CALENDARS) && $isAllowAdminChanges) {
    $subnav['calendars'] = [
        'label' => Calendar::t('Calendars'),
        'url' => 'calendar/calendars',
    ];
}

if (PermissionHelper::checkPermission(Calendar::PERMISSION_SETTINGS) && $isAllowAdminChanges) {
    $subnav['settings'] = [
        'label' => Calendar::t('Settings'),
        'url' => 'calendar/settings',
    ];
}

if (PermissionHelper::checkPermission(Calendar::PERMISSION_RESOURCES)) {
    $subnav['resources'] = ['label' => Calendar::t('Resources'), 'url' => 'calendar/resources'];
}

return $subnav;
