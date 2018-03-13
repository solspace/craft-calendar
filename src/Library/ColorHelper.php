<?php

namespace Solspace\Calendar\Library;

use Solspace\Calendar\Library\ColorJizz\Exceptions\InvalidArgumentException;
use Solspace\Calendar\Library\ColorJizz\Formats\Hex;

class ColorHelper extends \Solspace\Commons\Helpers\ColorHelper
{
    /**
     * Lightens/darkens a given colour (hex format), returning the altered colour in hex format.7
     *
     * @param string $hexString Colour as hexadecimal (with or without hash);
     * @param float  $percent   Decimal (0.2 = lighten by 20%, -0.4 = darken by 40%)
     *
     * @return string Lightened/Darkend colour as hexadecimal (with hash);
     * @throws InvalidArgumentException
     */
    public static function lightenDarkenColour($hexString, $percent): string
    {
        return '#' . Hex::fromString($hexString)->brightness($percent * 100);
    }
}
