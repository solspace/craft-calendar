<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use craft\i18n\Locale;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\SettingsModel;
use yii\helpers\FormatConverter;

class FormatsService extends Component
{
    public function getDateFormat($length = null, string $format = Locale::FORMAT_ICU): string
    {
        $length = $length ?? \Craft::$app->locale->getFormatter()->dateFormat;

        $dateTimeFormats = \Craft::$app->locale->getFormatter()->dateTimeFormats;
        $dateFormat = $dateTimeFormats[$length]['date'];

        if (Locale::FORMAT_PHP === $format) {
            return FormatConverter::convertDateIcuToPhp($dateFormat);
        }

        return $dateFormat;
    }

    public function getTimeFormat(string $length = null, string $format = Locale::FORMAT_ICU): string
    {
        $timeFormat = $this->getSettingsTimeFormat($length);

        if (Locale::FORMAT_PHP === $format) {
            return FormatConverter::convertDateIcuToPhp($timeFormat, 'time');
        }

        return $timeFormat;
    }

    public function getDateTimeFormat(): string
    {
        return $this->getDateFormat().' '.$this->getTimeFormat();
    }

    private function getSettingsTimeFormat(string $length = null)
    {
        $length = $length ?? \Craft::$app->locale->getFormatter()->timeFormat;

        switch (Calendar::getInstance()->settings->getSettingsModel()->timeFormat) {
            case SettingsModel::TIME_FORMAT_12_HOUR:
                $dateTimeFormats = [
                    'short' => 'h:mm a',
                    'medium' => 'h:mm:ss a',
                    'long' => 'h:mm:ss a z',
                    'full' => 'h:mm:ss a zzzz',
                ];

                return $dateTimeFormats[$length];

            case SettingsModel::TIME_FORMAT_24_HOUR:
                $dateTimeFormats = [
                    'short' => 'HH:mm',
                    'medium' => 'HH:mm:ss',
                    'long' => 'HH:mm:ss z',
                    'full' => 'HH:mm:ss zzzz',
                ];

                return $dateTimeFormats[$length];

            case SettingsModel::TIME_FORMAT_AUTO:
            default:
                $dateTimeFormats = \Craft::$app->locale->getFormatter()->dateTimeFormats;

                return $dateTimeFormats[$length]['time'];
        }
    }
}
