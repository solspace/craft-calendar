<?php

namespace Solspace\Calendar\Library\ColorJizz\Formats;

use Solspace\Calendar\Library\ColorJizz\ColorJizz;

/**
 * CIELCh represents the CIELCh color format.
 *
 * @author Mikee Franklin <mikeefranklin@gmail.com>
 */
class CIELCh extends ColorJizz
{
    /**
     * The lightness.
     */
    public ?float $lightness = null;

    /**
     * The chroma.
     */
    public ?float $chroma = null;

    /**
     * The hue.
     */
    public ?float $hue = null;

    /**
     * Create a new CIELCh color.
     */
    public function __construct(float $lightness, float $chroma, float $hue)
    {
        $this->toSelf = 'toCIELCh';
        $this->lightness = $lightness;
        $this->chroma = $chroma;
        $this->hue = fmod($hue, 360);
        if ($this->hue < 0) {
            $this->hue += 360;
        }
    }

    /**
     * A string representation of this color in the current format.
     *
     * @return string The color in format: $lightness,$chroma,$hue
     */
    public function __toString(): string
    {
        return sprintf('%s,%s,%s', $this->lightness, $this->chroma, $this->hue);
    }

    /**
     * Convert the color to Hex format.
     *
     * @return Hex the color in Hex format
     */
    public function toHex(): Hex
    {
        return $this->toCIELab()->toHex();
    }

    /**
     * Convert the color to RGB format.
     *
     * @return RGB the color in RGB format
     */
    public function toRGB(): RGB
    {
        return $this->toCIELab()->toRGB();
    }

    /**
     * Convert the color to XYZ format.
     *
     * @return XYZ the color in XYZ format
     */
    public function toXYZ(): XYZ
    {
        return $this->toCIELab()->toXYZ();
    }

    /**
     * Convert the color to Yxy format.
     *
     * @return Yxy the color in Yxy format
     */
    public function toYxy(): Yxy
    {
        return $this->toXYZ()->toYxy();
    }

    /**
     * Convert the color to HSV format.
     *
     * @return HSV the color in HSV format
     */
    public function toHSV(): HSV
    {
        return $this->toCIELab()->toHSV();
    }

    /**
     * Convert the color to CMY format.
     *
     * @return CMY the color in CMY format
     */
    public function toCMY(): CMY
    {
        return $this->toCIELab()->toCMY();
    }

    /**
     * Convert the color to CMYK format.
     *
     * @return CMYK the color in CMYK format
     */
    public function toCMYK(): CMYK
    {
        return $this->toCIELab()->toCMYK();
    }

    /**
     * Convert the color to CIELab format.
     *
     * @return CIELab the color in CIELab format
     */
    public function toCIELab(): CIELab
    {
        $hradi = $this->hue * (\M_PI / 180);
        $a_dimension = cos($hradi) * $this->chroma;
        $b_dimension = sin($hradi) * $this->chroma;

        return new CIELab($this->lightness, $a_dimension, $b_dimension);
    }

    /**
     * Convert the color to CIELCh format.
     *
     * @return CIELCh the color in CIELCh format
     */
    public function toCIELCh(): self
    {
        return $this;
    }
}
