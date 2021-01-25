<?php

namespace Solspace\Calendar\Resources\Bundles;

class WidgetMonthBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        $scripts = [
            'external/js/fullcalendar/lib/moment.min.js',
            'external/js/fullcalendar/fullcalendar.min.js',
            'js/scripts/calendars/fullcalendar-methods.js',
            'js/scripts/widgets/month.js',
        ];

        $calendarLocale = \Craft::$app->locale->id;
        $calendarLocale = str_replace('_', '-', strtolower($calendarLocale));
        $localeModulePath = __DIR__.'/../external/js/fullcalendar/locale/'.$calendarLocale.'.js';
        if (file_exists($localeModulePath)) {
            $scripts[] = 'external/js/fullcalendar/locale/'.$calendarLocale.'.js';
        }

        return $scripts;
    }

    public function getStylesheets(): array
    {
        return [
            'external/css/fullcalendar/fullcalendar.min.css',
            'css/widgets/month.css',
        ];
    }
}
