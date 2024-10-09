<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Query;
use craft\helpers\App;
use craft\migrations\BaseContentRefactorMigration;
use Solspace\Calendar\Elements\Event;

// m240319_132700_UpdateElements migration.
if (version_compare(\Craft::$app->getVersion(), '5.0.0', '<')) {
    class m240319_132700_UpdateElements extends Migration
    {
        public function safeUp(): bool
        {
            return true;
        }

        public function safeDown(): bool
        {
            echo "m240319_132700_UpdateElements cannot be reverted.\n";

            return false;
        }
    }
} else {
    class m240319_132700_UpdateElements extends BaseContentRefactorMigration
    {
        protected bool $preserveOldData = true;

        public function safeUp(): bool
        {
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
}
