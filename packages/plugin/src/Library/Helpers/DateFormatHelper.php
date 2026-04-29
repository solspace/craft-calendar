<?php

namespace Solspace\Calendar\Library\Helpers;

use craft\i18n\Locale;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\SettingsModel;
use yii\helpers\FormatConverter;

class DateFormatHelper
{
    public const TYPE_DATE = 'date';
    public const TYPE_TIME = 'time';
    public const TYPE_DATETIME = 'datetime';

    public static function get(
        string $type = self::TYPE_DATE,
        string $format = Locale::FORMAT_ICU,
        ?string $length = null,
    ): string {
        $locale = \Craft::$app->locale;
        $formatter = $locale->getFormatter();
        $length ??= self::TYPE_TIME === $type ? $formatter->timeFormat : $formatter->dateFormat;

        if (self::TYPE_TIME === $type) {
            $timeFormat = self::getSettingsTimeFormat($length);

            return match ($format) {
                Locale::FORMAT_ICU => $timeFormat,
                Locale::FORMAT_PHP => FormatConverter::convertDateIcuToPhp($timeFormat, 'time'),
                Locale::FORMAT_JUI => FormatConverter::convertDateIcuToJui($timeFormat, 'time'),
                default => throw new \InvalidArgumentException("Invalid format: {$format}. Available formats: icu, php, jui"),
            };
        }

        if (self::TYPE_DATETIME === $type && !self::isAutoTimeFormat()) {
            return self::get(self::TYPE_DATE, $format, $length).' '.self::get(self::TYPE_TIME, $format, $length);
        }

        $type = match ($type) {
            self::TYPE_DATE => 'date',
            self::TYPE_DATETIME => 'datetime',
            default => throw new \InvalidArgumentException("Invalid type: {$type}"),
        };

        $dateFormats = $formatter->dateTimeFormats;
        $dateFormat = $dateFormats[$length][$type];

        return match ($format) {
            Locale::FORMAT_ICU => $dateFormat,
            Locale::FORMAT_PHP => FormatConverter::convertDateIcuToPhp($dateFormat),
            Locale::FORMAT_JUI => FormatConverter::convertDateIcuToJui($dateFormat),
            default => throw new \InvalidArgumentException("Invalid format: {$format}. Available formats: icu, php, jui"),
        };
    }

    public static function toJsDateFormat(string $phpFormat): array
    {
        $format = [];

        foreach (str_split($phpFormat) as $character) {
            switch ($character) {
                case 'Y':
                    $format['year'] = 'numeric';

                    break;

                case 'y':
                    $format['year'] = '2-digit';

                    break;

                case 'F':
                    $format['month'] = 'long';

                    break;

                case 'M':
                    $format['month'] = 'short';

                    break;

                case 'm':
                    $format['month'] = '2-digit';

                    break;

                case 'n':
                    $format['month'] = 'numeric';

                    break;

                case 'd':
                    $format['day'] = '2-digit';

                    break;

                case 'j':
                    $format['day'] = 'numeric';

                    break;

                case 'l':
                    $format['weekday'] = 'long';

                    break;

                case 'D':
                    $format['weekday'] = 'short';

                    break;

                case 'H':
                    $format['hour'] = '2-digit';
                    $format['hour12'] = false;

                    break;

                case 'G':
                    $format['hour'] = 'numeric';
                    $format['hour12'] = false;
                    $format['omitZeroMinute'] = true;

                    break;

                case 'h':
                    $format['hour'] = '2-digit';
                    $format['hour12'] = true;

                    break;

                case 'g':
                    $format['hour'] = 'numeric';
                    $format['hour12'] = true;
                    $format['omitZeroMinute'] = true;

                    break;

                case 'i':
                    $format['minute'] = '2-digit';

                    break;

                case 's':
                    $format['second'] = '2-digit';

                    break;

                case 'A':
                    $format['meridiem'] = 'short';

                    break;

                case 'a':
                    $format['meridiem'] = 'lowercase';

                    break;
            }
        }

        return $format;
    }

    public static function toConfig(): array
    {
        $formatFn = static function (string $type, string $length): array {
            $icu = self::get($type, Locale::FORMAT_ICU, $length);
            $php = self::get($type, Locale::FORMAT_PHP, $length);
            $js = self::toJsDateFormat($php);

            return ['php' => $php, 'js' => $js, 'icu' => $icu];
        };

        $generatorFn = static function (string $type) use ($formatFn): array {
            return [
                'short' => $formatFn($type, 'short'),
                'medium' => $formatFn($type, 'medium'),
                'long' => $formatFn($type, 'long'),
            ];
        };

        return [
            'date' => $generatorFn(self::TYPE_DATE),
            'time' => $generatorFn(self::TYPE_TIME),
            'datetime' => $generatorFn(self::TYPE_DATETIME),
        ];
    }

    private static function getSettingsTimeFormat(string $length): string
    {
        $timeFormat = Calendar::getInstance()->settings->getSettingsModel()->timeFormat;

        return match ($timeFormat) {
            SettingsModel::TIME_FORMAT_12_HOUR => match ($length) {
                'short' => 'h:mm a',
                'medium' => 'h:mm:ss a',
                'long' => 'h:mm:ss a z',
                'full' => 'h:mm:ss a zzzz',
            },
            SettingsModel::TIME_FORMAT_24_HOUR => match ($length) {
                'short' => 'HH:mm',
                'medium' => 'HH:mm:ss',
                'long' => 'HH:mm:ss z',
                'full' => 'HH:mm:ss zzzz',
            },
            default => \Craft::$app->locale->getFormatter()->dateTimeFormats[$length]['time'],
        };
    }

    private static function isAutoTimeFormat(): bool
    {
        return SettingsModel::TIME_FORMAT_AUTO === Calendar::getInstance()->settings->getSettingsModel()->timeFormat;
    }
}
