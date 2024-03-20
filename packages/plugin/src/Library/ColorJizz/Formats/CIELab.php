<?php

namespace Solspace\Calendar\Library\ColorJizz\Formats;

use Solspace\Calendar\Library\ColorJizz\ColorJizz;

/**
 * CIELab represents the CIELab color format.
 *
 * @author Mikee Franklin <mikeefranklin@gmail.com>
 */
class CIELab extends ColorJizz
{
    /**
     * The lightness.
     */
    public ?float $lightness = null;

    /**
     * The a dimension.
     */
    public ?float $a_dimension = null;

    /**
     * The b dimension.
     */
    public ?float $b_dimension = null;

    /**
     * Create a new CIELab color.
     */
    public function __construct(float $lightness, float $a_dimension, float $b_dimension)
    {
        $this->toSelf = 'toCIELab';
        $this->lightness = $lightness; // $this->roundDec($l, 3);
        $this->a_dimension = $a_dimension; // $this->roundDec($a, 3);
        $this->b_dimension = $b_dimension; // $this->roundDec($b, 3);
    }

    /**
     * A string representation of this color in the current format.
     *
     * @return string The color in format: $lightness,$a_dimension,$b_dimension
     */
    public function __toString(): string
    {
        return sprintf('%s,%s,%s', $this->lightness, $this->a_dimension, $this->b_dimension);
    }

    public static function create($lightness, $a_dimension, $b_dimension): self
    {
        return new self($lightness, $a_dimension, $b_dimension);
    }

    /**
     * Convert the color to Hex format.
     *
     * @return Hex the color in Hex format
     */
    public function toHex(): Hex
    {
        return $this->toRGB()->toHex();
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
        $ref_X = 95.047;
        $ref_Y = 100.000;
        $ref_Z = 108.883;

        $var_Y = ($this->lightness + 16) / 116;
        $var_X = $this->a_dimension / 500 + $var_Y;
        $var_Z = $var_Y - $this->b_dimension / 200;

        if ($var_Y ** 3 > 0.008856) {
            $var_Y = $var_Y ** 3;
        } else {
            $var_Y = ($var_Y - 16 / 116) / 7.787;
        }
        if ($var_X ** 3 > 0.008856) {
            $var_X = $var_X ** 3;
        } else {
            $var_X = ($var_X - 16 / 116) / 7.787;
        }
        if ($var_Z ** 3 > 0.008856) {
            $var_Z = $var_Z ** 3;
        } else {
            $var_Z = ($var_Z - 16 / 116) / 7.787;
        }
        $position_x = $ref_X * $var_X;
        $position_y = $ref_Y * $var_Y;
        $position_z = $ref_Z * $var_Z;

        return new XYZ($position_x, $position_y, $position_z);
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
        return $this->toRGB()->toHSV();
    }

    /**
     * Convert the color to CMY format.
     *
     * @return CMY the color in CMY format
     */
    public function toCMY(): CMY
    {
        return $this->toRGB()->toCMY();
    }

    /**
     * Convert the color to CMYK format.
     *
     * @return CMYK the color in CMYK format
     */
    public function toCMYK(): CMYK
    {
        return $this->toCMY()->toCMYK();
    }

    /**
     * Convert the color to CIELab format.
     *
     * @return CIELab the color in CIELab format
     */
    public function toCIELab(): self
    {
        return $this;
    }

    /**
     * Convert the color to CIELCh format.
     *
     * @return CIELCh the color in CIELCh format
     */
    public function toCIELCh(): CIELCh
    {
        $var_H = atan2($this->b_dimension, $this->a_dimension);

        if ($var_H > 0) {
            $var_H = ($var_H / \M_PI) * 180;
        } else {
            $var_H = 360 - (abs($var_H) / \M_PI) * 180;
        }

        $lightness = $this->lightness;
        $chroma = sqrt($this->a_dimension ** 2 + $this->b_dimension ** 2);
        $hue = $var_H;

        return new CIELCh($lightness, $chroma, $hue);
    }
}
