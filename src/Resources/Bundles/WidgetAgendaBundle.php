<?php

namespace Solspace\Calendar\Resources\Bundles;

class WidgetAgendaBundle extends CalendarAssetBundle
{
    /**
     * @return array
     */
    public function getScripts(): array
    {
        $scripts = [
            'js/lib/fullcalendar/lib/moment.min.js',
            'js/lib/fullcalendar/fullcalendar.min.js',
            'js/src/calendar-fullcalendar-methods.js',
            'js/src/widget/agenda.js',
        ];

        $calendarLocale   = \Craft::$app->locale->id;
        $calendarLocale   = str_replace('_', '-', strtolower($calendarLocale));
        $localeModulePath = __DIR__ . '/../js/lib/fullcalendar/locale/' . $calendarLocale . '.js';
        if (file_exists($localeModulePath)) {
            $scripts[] = 'js/lib/fullcalendar/locale/' . $calendarLocale . '.js';
        }

        return $scripts;
    }

    /**
     * @return array
     */
    public function getStylesheets(): array
    {
        return [
            'css/lib/fullcalendar/fullcalendar.min.css',
            'css/src/widget/agenda.css',
        ];
    }
}