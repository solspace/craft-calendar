<?php

namespace Solspace\Calendar\Library\Helpers;

class TimezoneHelper
{
    /** A generic name stays accurate while browsing dates on either side of DST. */
    public static function name(string $timezone, ?string $locale = null): string
    {
        $zone = new \DateTimeZone($timezone);
        if (\in_array($zone->getName(), ['UTC', 'Etc/UTC', 'GMT', 'Etc/GMT'], true)) {
            return 'UTC';
        }
        if (class_exists(\IntlTimeZone::class)) {
            $internationalZone = \IntlTimeZone::createTimeZone($timezone);
            if ('Etc/Unknown' !== $internationalZone->getID()) {
                $label = $internationalZone->getDisplayName(false, \IntlTimeZone::DISPLAY_LONG_GENERIC, $locale ?? (\Craft::$app->language ?? 'en'));
                if ($label) {
                    return $label;
                }
            }
        }

        return str_replace('_', ' ', $timezone);
    }

    /** ICU provides localized abbreviations, or an offset where no familiar abbreviation exists. */
    public static function abbreviation(\DateTimeInterface|string $date, string $timezone, ?string $locale = null): string
    {
        $zone = new \DateTimeZone($timezone);
        $local = ($date instanceof \DateTimeInterface ? \DateTimeImmutable::createFromInterface($date) : new \DateTimeImmutable($date, $zone))->setTimezone($zone);
        if (class_exists(\IntlDateFormatter::class)) {
            // Schedule slots share a small set of zones; reuse the ICU formatter.
            static $formatters = [];
            $locale ??= \Craft::$app->language ?? 'en';
            $formatter = $formatters[$locale."\0".$timezone] ??= new \IntlDateFormatter($locale, \IntlDateFormatter::NONE, \IntlDateFormatter::NONE, $timezone, null, 'z');
            $label = $formatter->format($local);
            if ($label) {
                return $label;
            }
        }

        return 0 === $local->getOffset() ? 'UTC' : 'UTC'.$local->format('P');
    }
}
