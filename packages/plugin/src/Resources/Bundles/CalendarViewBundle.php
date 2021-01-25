<?php

namespace Solspace\Calendar\Resources\Bundles;

class CalendarViewBundle extends CalendarAssetBundle
{
    public function getScripts(): array
    {
        $scripts = [
            'external/js/json/jquery.json.js',
            'external/js/fullcalendar/lib/moment.min.js',
            'external/js/fullcalendar/fullcalendar.min.js',
            'external/js/qtip/jquery.qtip.min.js',
            'js/scripts/calendars/main.js',
            'js/scripts/calendars/popups.js',
            'js/scripts/calendars/fullcalendar-methods.js',
            'js/scripts/widgets/month.js',
        ];

        $locale = \Craft::$app->locale->id;
        $localeModulePath = __DIR__.'/../../Resources/external/js/fullcalendar/locale/'.$locale.'.js';
        if (file_exists($localeModulePath)) {
            $scripts[] = 'external/js/fullcalendar/locale/'.$locale.'.js';
        }

        return $scripts;
    }

    public function getStylesheets(): array
    {
        return [
            'external/css/fullcalendar/fullcalendar.min.css',
            'external/css/qtip/jquery.qtip.min.css',
            'css/calendars/calendar.css',
        ];
    }
}
