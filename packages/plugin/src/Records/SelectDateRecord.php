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
    public const TABLE = '{{%calendar_select_dates}}';

    public static function tableName(): string
    {
        return self::TABLE;
    }

    public function defineIndexes(): array
    {
        return [
            ['columns' => ['eventId', 'date']],
        ];
    }
}
