<?php

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\PermissionHelper;

$subnav['overview'] = [
    'label' => Calendar::t('Events'),
    'url' => 'calendar/overview',
];

if (PermissionHelper::canAccessEvents()) {
    $subnav['events'] = [
        'label' => Calendar::t('Event List'),
        'url' => 'calendar/events',
    ];
}

if (Calendar::getInstance()->bookings->getManageableCalendars()) {
    $subnav['bookings'] = ['label' => Calendar::getInstance()->settings->getSettingsModel()->getBookingLabel(), 'url' => 'calendar/bookings'];
}

$isAllowAdminChanges = true;
if (version_compare(Craft::$app->getVersion(), '3.1', '>=')) {
    $isAllowAdminChanges = Craft::$app->getConfig()->getGeneral()->allowAdminChanges;
}

if (PermissionHelper::canAccessCalendars() && $isAllowAdminChanges) {
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

if (PermissionHelper::checkPermission(Calendar::PERMISSION_SETTINGS) && !$isAllowAdminChanges) {
    $subnav['settings'] = [
        'label' => Calendar::t('Diagnostics'),
        'url' => 'calendar/settings/diagnostics',
    ];
}

return $subnav;
