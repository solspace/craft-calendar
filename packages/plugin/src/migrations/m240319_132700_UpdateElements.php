<?php

namespace Solspace\Calendar\migrations;

use craft\db\Query;
use craft\helpers\App;
use craft\migrations\BaseContentRefactorMigration;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\VersionHelper;

/**
 * m240319_132700_UpdateElements migration.
 */
class m240319_132700_UpdateElements extends BaseContentRefactorMigration
{
    protected bool $preserveOldData = true;

    public function safeUp(): bool
    {
        if (VersionHelper::isCraft4()) {
            return true;
        }

        App::maxPowerCaptain();

        $this->updateElements(
            (new Query())->from(Event::tableName()),
            \Craft::$app->getFields()->getLayoutByType(Event::class),
        );

        return true;
    }

    public function safeDown(): bool
    {
        echo "m240319_132700_UpdateElements cannot be reverted.\n";

        return false;
    }
}
