<?php

namespace Solspace\Calendar\Resources\Bundles;

use Solspace\Calendar\Calendar;

abstract class CalendarAssetBundle extends CpAssetBundle
{
    public function registerAssetFiles($view): void
    {
        $entryName = $this->getClientEntry();

        if (null !== $entryName) {
            $this->publish($view->getAssetManager());
        }

        parent::registerAssetFiles($view);

        if (null !== $entryName) {
            Calendar::getInstance()->clientAssets->registerEntryAssets(
                $view,
                $this->baseUrl,
                $this->sourcePath,
                $entryName
            );
        }
    }

    protected function getSourcePath(): string
    {
        return '@Solspace/Calendar/Resources';
    }

    protected function getClientEntry(): ?string
    {
        return null;
    }
}
