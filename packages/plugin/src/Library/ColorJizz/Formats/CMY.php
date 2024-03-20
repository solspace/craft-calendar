<?php

namespace Solspace\Calendar\Library\ColorJizz\Formats;

use Solspace\Calendar\Library\ColorJizz\ColorJizz;

/**
 * CMY represents the CMY color format.
 *
 * @author Mikee Franklin <mikeefranklin@gmail.com>
 */
class CMY extends ColorJizz
{
    /**
     * The cyan.
     */
    private ?float $cyan = null;

    /**
     * The magenta.
     */
    private ?float $magenta = null;

    /**
     * The yellow.
     */
    private ?float $yellow = null;

    /**
     * Create a new CIELab color.
     */
    public function __construct(float $cyan, float $magenta, float $yellow)
    {
        $this->toSelf = 'toCMY';
        $this->cyan = $cyan;
        $this->magenta = $magenta;
        $this->yellow = $yellow;
    }

    /**
     * A string representation of this color in the current format.
     *
     * @return string The color in format: $cyan,$magenta,$yellow
     */
    public function __toString(): string
    {
        return sprintf('%s,%s,%s', $this->cyan, $this->magenta, $this->yellow);
    }

    public static function create($cyan, $magenta, $yellow): self
    {
        return new self($cyan, $magenta, $yellow);
    }

    /**
     * Get the amount of Cyan.
     *
     * @return int The amount of cyan
     */
    public function getCyan(): int
    {
        return $this->cyan;
    }

    /**
     * Get the amount of Magenta.
     *
     * @return int The amount of magenta
     */
    public function getMagenta(): int
    {
        return $this->magenta;
    }

    /**
     * Get the amount of Yellow.
     *
     * @return int The amount of yellow
     */
    public function getYellow(): int
    {
        return $this->yellow;
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
        $red = (1 - $this->cyan) * 255;
        $green = (1 - $this->magenta) * 255;
        $blue = (1 - $this->yellow) * 255;

        return new RGB($red, $green, $blue);
    }

    /**
     * Convert the color to XYZ format.
     *
     * @return XYZ the color in XYZ format
     */
    public function toXYZ(): XYZ
    {
        return $this->toRGB()->toXYZ();
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
    public function toCMY(): self
    {
        return $this;
    }

    /**
     * Convert the color to CMYK format.
     *
     * @return CMYK the color in CMYK format
     */
    public function toCMYK(): CMYK
    {
        $var_K = 1;
        $cyan = $this->cyan;
        $magenta = $this->magenta;
        $yellow = $this->yellow;
        if ($cyan < $var_K) {
            $var_K = $cyan;
        }
        if ($magenta < $var_K) {
            $var_K = $magenta;
        }
        if ($yellow < $var_K) {
            $var_K = $yellow;
        }
        if (1 == $var_K) {
            $cyan = 0;
            $magenta = 0;
            $yellow = 0;
        } else {
            $cyan = ($cyan - $var_K) / (1 - $var_K);
            $magenta = ($magenta - $var_K) / (1 - $var_K);
            $yellow = ($yellow - $var_K) / (1 - $var_K);
        }

        $key = $var_K;

        return new CMYK($cyan, $magenta, $yellow, $key);
    }

    /**
     * Convert the color to CIELab format.
     *
     * @return CIELab the color in CIELab format
     */
    public function toCIELab(): CIELab
    {
        return $this->toRGB()->toCIELab();
    }

    /**
     * Convert the color to CIELCh format.
     *
     * @return CIELCh the color in CIELCh format
     */
    public function toCIELCh(): CIELCh
    {
        return $this->toCIELab()->toCIELCh();
    }
}
