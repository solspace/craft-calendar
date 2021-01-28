<?php

namespace Solspace\Calendar\Widgets;

use craft\base\Widget;

class AbstractWidget extends Widget
{
    public function getTitle(): string
    {
        return $this->title ?: static::displayName();
    }

    public static function iconPath(): string
    {
        return __DIR__.'/../icon-mask.svg';
    }
}
