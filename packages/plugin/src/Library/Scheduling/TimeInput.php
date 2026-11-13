<?php

namespace Solspace\Calendar\Library\Scheduling;

use craft\i18n\Locale;

class TimeInput
{
    /** Opening hours are wall times, so parsing must not convert between timezones. */
    public static function normalize(array $value): string
    {
        if (!\is_string($value['time'] ?? null)) {
            return '';
        }
        $time = trim(str_replace(["\u{202F}", "\u{00A0}"], ' ', $value['time']));
        if (preg_match('/^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/D', $time)) {
            return substr($time, 0, 5);
        }

        $locale = \Craft::$app->getFormattingLocale();
        if (!empty($value['locale']) && $value['locale'] !== $locale->id) {
            $locale = \Craft::$app->getI18n()->getLocaleById($value['locale']);
        }
        $pattern = str_replace(["\u{202F}", "\u{00A0}"], ' ', $locale->getTimeFormat(Locale::LENGTH_SHORT));
        $formatter = new \IntlDateFormatter($locale->id, \IntlDateFormatter::NONE, \IntlDateFormatter::NONE, 'UTC', \IntlDateFormatter::GREGORIAN, 'a');

        // Native timepickers can remove spaces and dots from localized AM/PM names.
        // Derive the names in UTC so differing PHP and ICU timezone data cannot swap them.
        if (str_contains($pattern, 'a')) {
            foreach ([0, 43200] as $timestamp) {
                $period = $formatter->format($timestamp);
                $plain = str_replace(["\u{202F}", "\u{00A0}"], ' ', $period);
                $compact = preg_replace('/[\s.]/u', '', $plain);
                $suffix = '/\s*(?:'.preg_quote($plain, '/').'|'.preg_quote($compact, '/').')$/iu';
                if (preg_match($suffix, $time)) {
                    $time = preg_replace($suffix, ' '.$period, $time);

                    break;
                }
            }
        }

        $formatter->setPattern($pattern);
        $formatter->setLenient(false);
        $position = 0;
        $timestamp = $formatter->parse($time, $position);

        return false !== $timestamp && $position === \strlen($time) ? gmdate('H:i', (int) $timestamp) : '';
    }
}
