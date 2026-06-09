<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveRecord;

/**
 * @property int    $eventId
 * @property string $generatedThrough
 */
class OccurrenceWindowRecord extends ActiveRecord
{
    public const TABLE = '{{%calendar_events_occurrence_windows}}';
    public const TABLE_STD = 'calendar_events_occurrence_windows';

    public static function tableName(): string
    {
        return self::TABLE;
    }
}
