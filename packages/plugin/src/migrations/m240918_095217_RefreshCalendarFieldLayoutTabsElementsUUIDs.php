<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Query;
use craft\helpers\StringHelper;

/**
 * m240918_095217_RefreshCalendarFieldLayoutTabsElementsUUIDs migration.
 */
class m240918_095217_RefreshCalendarFieldLayoutTabsElementsUUIDs extends Migration
{
    public function safeUp(): bool
    {
        $calendars = (new Query())
            ->select(['fieldLayoutId'])
            ->from('{{%calendar_calendars}}')
            ->all()
        ;

        $isCraft4 = version_compare(\Craft::$app->getVersion(), '5', '<');

        if ($isCraft4) {
            foreach ($calendars as $calendar) {
                $fieldLayoutTabsTable = '{{%fieldlayouttabs}}';

                $fieldLayoutTab = (new Query())
                    ->select(['id', 'elements'])
                    ->from($fieldLayoutTabsTable)
                    ->where(['layoutId' => $calendar['fieldLayoutId']])
                    ->one()
                ;

                if (!empty($fieldLayoutTab['elements'])) {
                    $elements = json_decode($fieldLayoutTab['elements']);

                    foreach ($elements as $element) {
                        $element->uid = StringHelper::UUID();
                    }

                    $this->update(
                        $fieldLayoutTabsTable,
                        ['elements' => json_encode($elements)],
                        ['id' => $fieldLayoutTab['id']],
                    );
                }
            }
        }

        if (!$isCraft4) {
            foreach ($calendars as $calendar) {
                $fieldLayoutsTable = '{{%fieldlayouts}}';

                $fieldLayout = (new Query())
                    ->select(['id', 'config'])
                    ->from($fieldLayoutsTable)
                    ->where(['id' => $calendar['fieldLayoutId']])
                    ->one()
                ;

                if (!empty($fieldLayout['config'])) {
                    $config = json_decode($fieldLayout['config']);

                    $tabs = $config->tabs ?? [];

                    foreach ($tabs as $tab) {
                        if (!empty($tab->elements)) {
                            foreach ($tab->elements as $element) {
                                $element->uid = StringHelper::UUID();
                            }
                        }
                    }

                    $config->tabs = $tabs;

                    $this->update(
                        $fieldLayoutsTable,
                        ['config' => $config],
                        ['id' => $fieldLayout['id']],
                    );
                }
            }
        }

        \Craft::$app->projectConfig->rebuild();

        return true;
    }

    public function safeDown(): bool
    {
        echo "m240918_095217_RefreshCalendarFieldLayoutTabsElementsUUIDs cannot be reverted.\n";

        return false;
    }
}
