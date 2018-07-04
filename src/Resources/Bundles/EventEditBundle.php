<?php

namespace Solspace\Calendar\Resources\Bundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class EventEditBundle extends CalendarAssetBundle
{
    /** @var string - worst hack ever made */
    static public $locale;

    /**
     * @return array
     */
    public function getScripts(): array
    {
        $scripts = [
            'js/lib/fullcalendar/lib/moment.min.js',
            'js/src/event-edit.js',
        ];

        if (self::$locale) {
            $locale = self::$locale;

            $localeJsPath = __DIR__ . '/../Resources/js/lib/moment/locale/' . $locale . '.js';
            if (file_exists($localeJsPath)) {
                $scripts[] = 'js/lib/moment/locale/' . $locale . '.js';
            }
        }

        return $scripts;
    }

    /**
     * @return array
     */
    public function getStylesheets(): array
    {
        return ['css/src/event-edit.css'];
    }
}
