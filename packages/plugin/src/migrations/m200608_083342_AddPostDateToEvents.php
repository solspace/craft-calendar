<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use yii\db\Expression;

/**
 * m200608_083342_AddPostDateToEvents migration.
 */
class m200608_083342_AddPostDateToEvents extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table = $this->getDb()->getTableSchema('{{%calendar_events}}');
        if (!$table->getColumn('postDate')) {
            $this->addColumn(
                '{{%calendar_events}}',
                'postDate',
                $this->dateTime()
            );

            $this->createIndex(null, '{{%calendar_events}}', 'postDate');

            $this->update('{{%calendar_events}}', ['postDate' => new Expression('[[dateCreated]]')]);
        }

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $table = $this->getDb()->getTableSchema('{{%calendar_events}}');
        if (!$table->getColumn('postDate')) {
            $this->dropIndex('calendar_events_postDate_idx', '{{%calendar_events}}');
            $this->dropColumn('{{%calendar_events}}', 'postDate');
        }

        return true;
    }
}
