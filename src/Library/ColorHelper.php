<?php

namespace Solspace\Calendar\Library;

use Solspace\Calendar\Library\ColorJizz\Formats\Hex;

class ColorHelper
{
    /**
     * Generates a random HEX color code
     *
     * @return string
     */
    public static function randomColor()
    {
        return sprintf('#%06X', mt_rand(0, 0xFFFFFF));
    }

    /**
     * Lightens/darkens a given colour (hex format), returning the altered colour in hex format.7
     *
     * @param string $hexString Colour as hexadecimal (with or without hash);
     * @param float  $percent   Decimal (0.2 = lighten by 20%, -0.4 = darken by 40%)
     *
     * @return string Lightened/Darkend colour as hexadecimal (with hash);
     */
    public static function lightenDarkenColour($hexString, $percent)
    {
        return '#' . Hex::fromString($hexString)->brightness($percent * 100);
    }

    /**
     * Determines if the contrasting color to be used based on a HEX color code
     *
     * @param string $hexColor
     *
     * @return string
     */
    public static function getContrastYIQ($hexColor)
    {
        $hexColor = str_replace('#', '', $hexColor);

        $r   = hexdec(substr($hexColor, 0, 2));
        $g   = hexdec(substr($hexColor, 2, 2));
        $b   = hexdec(substr($hexColor, 4, 2));
        $yiq = (($r * 299) + ($g * 587) + ($b * 114)) / 1000;

        return ($yiq >= 128) ? 'black' : 'white';
    }
}
