<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use Solspace\Calendar\Elements\Event;
use yii\db\Expression;

/**
 * m200608_083342_AddPostDateToEvents migration.
 */
class m200608_083342_AddPostDateToEvents extends Migration
{
    public function safeUp(): bool
    {
        $eventTable = Event::tableName();
        $table = $this->getDb()->getTableSchema($eventTable);
        if (!$table->getColumn('postDate')) {
            $this->addColumn(
                $eventTable,
                'postDate',
                $this->dateTime()
            );

            $this->createIndex(null, $eventTable, 'postDate');

            $this->update($eventTable, ['postDate' => new Expression('[[dateCreated]]')]);
        }

        return true;
    }

    public function safeDown(): bool
    {
        $eventTable = Event::tableName();
        $table = $this->getDb()->getTableSchema($eventTable);
        if (!$table->getColumn('postDate')) {
            $this->dropIndex('calendar_events_postDate_idx', $eventTable);
            $this->dropColumn($eventTable, 'postDate');
        }

        return true;
    }
}
