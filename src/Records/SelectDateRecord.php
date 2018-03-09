<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveRecord;
use Solspace\Calendar\Elements\Event;

/**
 * @property int       $id
 * @property \DateTime $date
 * @property int       $eventId
 * @property Event     $event
 */
class SelectDateRecord extends ActiveRecord
{
    const TABLE = '{{%calendar_select_dates}}';

    /**
     * @return string
     */
    public static function tableName(): string
    {
        return self::TABLE;
    }

    /**
     * @return array
     */
    public function defineIndexes()
    {
        return [
            ['columns' => ['eventId', 'date']],
        ];
    }

    /**
     * @return array
     */
    protected function defineAttributes()
    {
        return [
            'date' => AttributeType::DateTime,
        ];
    }
}
