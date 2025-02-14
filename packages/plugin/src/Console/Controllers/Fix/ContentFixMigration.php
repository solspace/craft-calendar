<?php

namespace Solspace\Calendar\Console\Controllers\Fix;

use craft\db\Query;
use craft\helpers\App;
use craft\migrations\BaseContentRefactorMigration;
use Solspace\Calendar\Elements\Event;

class ContentFixMigration extends BaseContentRefactorMigration
{
    protected bool $preserveOldData = true;

    public function run(): void
    {
        App::maxPowerCaptain();

        $this->updateElements(
            (new Query())->from(Event::tableName()),
            \Craft::$app->getFields()->getLayoutByType(Event::class),
        );
    }
}
