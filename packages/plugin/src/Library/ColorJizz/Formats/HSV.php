<?php

namespace Solspace\Calendar\Library\ColorJizz\Formats;

use Solspace\Calendar\Library\ColorJizz\ColorJizz;

/**
 * HSV represents the HSV color format.
 *
 * @author Mikee Franklin <mikeefranklin@gmail.com>
 */
class HSV extends ColorJizz
{
    /**
     * The hue.
     */
    public ?float $hue = null;

    /**
     * The saturation.
     */
    public ?float $saturation = null;

    /**
     * The value.
     */
    public ?float $value = null;

    /**
     * Create a new HSV color.
     */
    public function __construct(float $hue, float $saturation, float $value)
    {
        $this->toSelf = 'toHSV';
        $this->hue = $hue;
        $this->saturation = $saturation;
        $this->value = $value;
    }

    /**
     * A string representation of this color in the current format.
     * The color in format: $hue,$saturation,$value.
     */
    public function __toString(): string
    {
        return sprintf('%s,%s,%s', $this->hue, $this->saturation, $this->value);
    }

    /**
     * Convert the color to Hex format.
     */
    public function toHex(): Hex
    {
        return $this->toRGB()->toHex();
    }

    /**
     * Convert the color to RGB format.
     */
    public function toRGB(): RGB
    {
        $hue = $this->hue / 360;
        $saturation = $this->saturation / 100;
        $value = $this->value / 100;
        if (0 == $saturation) {
            $red = $value * 255;
            $green = $value * 255;
            $blue = $value * 255;
        } else {
            $var_h = $hue * 6;
            $var_i = floor($var_h);
            $var_1 = $value * (1 - $saturation);
            $var_2 = $value * (1 - $saturation * ($var_h - $var_i));
            $var_3 = $value * (1 - $saturation * (1 - ($var_h - $var_i)));

            if (0 == $var_i) {
                $var_r = $value;
                $var_g = $var_3;
                $var_b = $var_1;
            } elseif (1 == $var_i) {
                $var_r = $var_2;
                $var_g = $value;
                $var_b = $var_1;
            } elseif (2 == $var_i) {
                $var_r = $var_1;
                $var_g = $value;
                $var_b = $var_3;
            } elseif (3 == $var_i) {
                $var_r = $var_1;
                $var_g = $var_2;
                $var_b = $value;
            } else {
                if (4 == $var_i) {
                    $var_r = $var_3;
                    $var_g = $var_1;
                    $var_b = $value;
                } else {
                    $var_r = $value;
                    $var_g = $var_1;
                    $var_b = $var_2;
                }
            }

            $red = $var_r * 255;
            $green = $var_g * 255;
            $blue = $var_b * 255;
        }

        return new RGB($red, $green, $blue);
    }

    /**
     * Convert the color to XYZ format.
     */
    public function toXYZ(): XYZ
    {
        return $this->toRGB()->toXYZ();
    }

    /**
     * Convert the color to Yxy format.
     */
    public function toYxy(): Yxy
    {
        return $this->toXYZ()->toYxy();
    }

    /**
     * Convert the color to HSV format.
     */
    public function toHSV(): self
    {
        return $this;
    }

    /**
     * Convert the color to CMY format.
     */
    public function toCMY(): CMY
    {
        return $this->toRGB()->toCMY();
    }

    /**
     * Convert the color to CMYK format.
     */
    public function toCMYK(): CMYK
    {
        return $this->toCMY()->toCMYK();
    }

    /**
     * Convert the color to CIELab format.
     */
    public function toCIELab(): CIELab
    {
        return $this->toRGB()->toCIELab();
    }

    /**
     * Convert the color to CIELCh format.
     */
    public function toCIELCh(): CIELCh
    {
        return $this->toCIELab()->toCIELCh();
    }
}
