<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class CalendarViewBundle extends CalendarAssetBundle
{
    /**
     * @return array
     */
    public function getScripts(): array
    {
        $scripts = [
            'js/lib/json/jquery.json.js',
            'js/lib/fullcalendar/lib/moment.min.js',
            'js/lib/fullcalendar/fullcalendar.min.js',
            'js/lib/qtip/jquery.qtip.min.js',
            'js/src/calendar.js',
            'js/src/calendar-popups.js',
            'js/src/calendar-fullcalendar-methods.js',
            'js/src/widget/month.js',
        ];

        $locale = \Craft::$app->locale->id;
        $localeModulePath = __DIR__ . '/../../Resources/js/lib/fullcalendar/locale/' . $locale . '.js';
        if (file_exists($localeModulePath)) {
            $scripts[] = 'js/lib/fullcalendar/locale/' . $locale . '.js';
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
            'css/lib/qtip/jquery.qtip.min.css',
            'css/src/calendar.css',
        ];
    }
}
