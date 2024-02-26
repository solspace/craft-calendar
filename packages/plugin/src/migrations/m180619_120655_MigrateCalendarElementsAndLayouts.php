<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Query;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\FieldTypes\EventFieldType;

/**
 * m180619_120655_MigrateCalendarElementsAndLayouts migration.
 */
class m180619_120655_MigrateCalendarElementsAndLayouts extends Migration
{
    public function safeUp()
    {
        $this->update(
            '{{%elements}}',
            ['type' => Event::class],
            ['type' => 'Calendar_Event'],
            [],
            false
        );

        $this->update(
            '{{%fieldlayouts}}',
            ['type' => Event::class],
            ['type' => 'Calendar_Event'],
            [],
            false
        );

        $items = (new Query())
            ->select(['id', 'settings'])
            ->from('{{%fields}}')
            ->where(['type' => EventFieldType::class])
            ->all()
        ;

        foreach ($items as $item) {
            $id = $item['id'];
            $settings = $item['settings'];

            if (str_contains($settings, 'targetLocale')) {
                $settings = str_replace('targetLocale', 'targetSiteId', $settings);

                $this->update(
                    '{{%fields}}',
                    ['settings' => $settings],
                    ['id' => $id]
                );
            }
        }
    }

    public function safeDown()
    {
        $this->update(
            '{{%elements}}',
            ['type' => 'Calendar_Event'],
            ['type' => EventFieldType::class],
            [],
            false
        );

        $this->update(
            '{{%fieldlayouts}}',
            ['type' => 'Calendar_Event'],
            ['type' => EventFieldType::class],
            [],
            false
        );

        $items = (new Query())
            ->select(['id', 'settings'])
            ->from('{{%fields}}')
            ->where(['type' => EventFieldType::class])
            ->all()
        ;

        foreach ($items as $item) {
            $id = $item['id'];
            $settings = $item['settings'];

            if (str_contains($settings, 'targetSiteId')) {
                $settings = str_replace('targetSiteId', 'targetLocale', $settings);

                $this->update(
                    '{{%fields}}',
                    ['settings' => $settings],
                    ['id' => $id]
                );
            }
        }
    }
}
