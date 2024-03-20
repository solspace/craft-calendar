<?php

namespace Solspace\Calendar\Library\Helpers;

use Solspace\Calendar\Library\ColorJizz\Formats\Hex;

class ColorHelper
{
    /**
     * Lightens/darkens a given colour (hex format), returning the altered colour in hex format.7.
     * Colour as hexadecimal (with or without hash);
     * Decimal (0.2 = lighten by 20%, -0.4 = darken by 40%).
     */
    public static function lightenDarkenColour(string $hexString, float $percent): string
    {
        return '#'.Hex::fromString($hexString)->brightness($percent * 100);
    }

    /**
     * Generates a random HEX color code.
     */
    public static function randomColor(): string
    {
        return sprintf('#%06X', mt_rand(0, 0xFFFFFF));
    }

    /**
     * Determines if the contrasting color to be used based on a HEX color code.
     */
    public static function getContrastYIQ(string $hexColor): string
    {
        $hexColor = str_replace('#', '', $hexColor);

        $r = hexdec(substr($hexColor, 0, 2));
        $g = hexdec(substr($hexColor, 2, 2));
        $b = hexdec(substr($hexColor, 4, 2));
        $yiq = (($r * 299) + ($g * 587) + ($b * 114)) / 1000;

        return ($yiq >= 128) ? 'black' : 'white';
    }

    /**
     * Generates an RGB color based on $id int or hex string.
     */
    public static function getRGBColor(int|string $id): array
    {
        if (str_starts_with($id, '#')) {
            $hash = substr($id, 1, 6);
        } else {
            $hash = md5($id); // modify 'color' to get a different palette
        }

        return [
            hexdec(substr($hash, 0, 2)), // r
            hexdec(substr($hash, 2, 2)), // g
            hexdec(substr($hash, 4, 2)), // b
        ];
    }
}
