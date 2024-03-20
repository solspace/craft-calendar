<?php

namespace Solspace\Calendar\Library\ColorJizz\Formats;

use Solspace\Calendar\Library\ColorJizz\ColorJizz;

/**
 * Yxy represents the Yxy color format.
 *
 * @author Mikee Franklin <mikeefranklin@gmail.com>
 */
class Yxy extends ColorJizz
{
    /**
     * The Y.
     */
    public ?float $Y = null;

    /**
     * The x.
     */
    public ?float $x = null;

    /**
     * The y.
     */
    public ?float $y = null;

    /**
     * Create a new Yxy color.
     */
    public function __construct(float $Y, float $x, float $y)
    {
        $this->toSelf = 'toYxy';
        $this->Y = $Y;
        $this->x = $x;
        $this->y = $y;
    }

    /**
     * A string representation of this color in the current format.
     *
     * @return string The color in format: $Y,$x,$y
     */
    public function __toString(): string
    {
        return sprintf('%s,%s,%s', $this->Y, $this->x, $this->y);
    }

    /**
     * Convert the color to Hex format.
     *
     * @return Hex the color in Hex format
     */
    public function toHex(): Hex
    {
        return $this->toXYZ()->toYxy();
    }

    /**
     * Convert the color to RGB format.
     *
     * @return RGB the color in RGB format
     */
    public function toRGB(): RGB
    {
        return $this->toXYZ()->toRGB();
    }

    /**
     * Convert the color to XYZ format.
     *
     * @return XYZ the color in XYZ format
     */
    public function toXYZ(): XYZ
    {
        $X = $this->x * ($this->Y / $this->y);
        $Y = $this->Y;
        $Z = (1 - $this->x - $this->y) * ($this->Y / $this->y);

        return new XYZ($X, $Y, $Z);
    }

    /**
     * Convert the color to Yxy format.
     *
     * @return Yxy the color in Yxy format
     */
    public function toYxy(): self
    {
        return $this;
    }

    /**
     * Convert the color to HSV format.
     *
     * @return HSV the color in HSV format
     */
    public function toHSV(): HSV
    {
        return $this->toXYZ()->toHSV();
    }

    /**
     * Convert the color to CMY format.
     *
     * @return CMY the color in CMY format
     */
    public function toCMY(): CMY
    {
        return $this->toXYZ()->toCMY();
    }

    /**
     * Convert the color to CMYK format.
     *
     * @return CMYK the color in CMYK format
     */
    public function toCMYK(): CMYK
    {
        return $this->toXYZ()->toCMYK();
    }

    /**
     * Convert the color to CIELab format.
     *
     * @return CIELab the color in CIELab format
     */
    public function toCIELab(): CIELab
    {
        return $this->toXYZ()->toCIELab();
    }

    /**
     * Convert the color to CIELCh format.
     *
     * @return CIELCh the color in CIELCh format
     */
    public function toCIELCh(): CIELCh
    {
        return $this->toXYZ()->toCIELCh();
    }
}
