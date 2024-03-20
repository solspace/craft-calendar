<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Query;
use craft\db\Table;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\FieldTypes\EventFieldType;

/**
 * m180619_120655_MigrateCalendarElementsAndLayouts migration.
 */
class m180619_120655_MigrateCalendarElementsAndLayouts extends Migration
{
    public function safeUp(): void
    {
        $this->update(
            Table::ELEMENTS,
            ['type' => Event::class],
            ['type' => 'Calendar_Event'],
            [],
            false
        );

        $this->update(
            Table::FIELDLAYOUTS,
            ['type' => Event::class],
            ['type' => 'Calendar_Event'],
            [],
            false
        );

        $items = (new Query())
            ->select(['id', 'settings'])
            ->from(Table::FIELDS)
            ->where(['type' => EventFieldType::class])
            ->all()
        ;

        foreach ($items as $item) {
            $id = $item['id'];
            $settings = $item['settings'];

            if (str_contains($settings, 'targetLocale')) {
                $settings = str_replace('targetLocale', 'targetSiteId', $settings);

                $this->update(
                    Table::FIELDS,
                    ['settings' => $settings],
                    ['id' => $id]
                );
            }
        }
    }

    public function safeDown(): void
    {
        $this->update(
            Table::ELEMENTS,
            ['type' => 'Calendar_Event'],
            ['type' => EventFieldType::class],
            [],
            false
        );

        $this->update(
            Table::FIELDLAYOUTS,
            ['type' => 'Calendar_Event'],
            ['type' => EventFieldType::class],
            [],
            false
        );

        $items = (new Query())
            ->select(['id', 'settings'])
            ->from(Table::FIELDS)
            ->where(['type' => EventFieldType::class])
            ->all()
        ;

        foreach ($items as $item) {
            $id = $item['id'];
            $settings = $item['settings'];

            if (str_contains($settings, 'targetSiteId')) {
                $settings = str_replace('targetSiteId', 'targetLocale', $settings);

                $this->update(
                    Table::FIELDS,
                    ['settings' => $settings],
                    ['id' => $id]
                );
            }
        }
    }
}
