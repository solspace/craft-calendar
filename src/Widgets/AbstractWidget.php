<?php

namespace Solspace\Calendar\Widgets;

use craft\base\Widget;

class AbstractWidget extends Widget
{
    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title ?: static::displayName();
    }

    /**
     * @return string
     */
    public static function iconPath(): string
    {
        return __DIR__ . '/../icon-mask.svg';
    }
}