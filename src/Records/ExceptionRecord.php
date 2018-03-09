<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveRecord;

/**
 * @property int    $id
 * @property string $date
 * @property int    $eventId
 */
class ExceptionRecord extends ActiveRecord
{
    const TABLE = '{{%calendar_exceptions}}';

    /**
     * @return string
     */
    public static function tableName(): string
    {
        return self::TABLE;
    }
}
