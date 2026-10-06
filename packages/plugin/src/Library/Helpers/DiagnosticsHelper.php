<?php

namespace Solspace\Calendar\Library\Helpers;

class DiagnosticsHelper
{
    public static function memoryLimitStatus(string $limit): string
    {
        $bytes = \ini_parse_quantity($limit);

        if (-1 === $bytes || $bytes >= 512 * 1024 * 1024) {
            return 'pass';
        }

        return $bytes >= 256 * 1024 * 1024 ? 'warning' : 'error';
    }

    /**
     * Inspect a timezone without changing the process timezone or event wall times.
     */
    public static function timezone(string $name, \DateTimeImmutable $instant): ?array
    {
        try {
            $zone = new \DateTimeZone($name);
        } catch (\Exception) {
            return null;
        }

        $local = $instant->setTimezone($zone);

        return [
            'name' => $zone->getName(),
            'offset' => $local->format('P'),
            'clock' => $local->format('Y-m-d H:i:s P'),
            'dst' => '1' === $local->format('I'),
        ];
    }
}
