<?php

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\PermissionHelper;

$subnav['overview'] = [
    'label' => Calendar::t('Overview'),
    'url' => 'calendar',
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

return $subnav;
