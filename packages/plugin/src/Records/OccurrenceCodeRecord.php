<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveRecord;

/**
 * Durable occurrence codes. Rows outlive occurrence regeneration and are
 * only removed together with their event.
 *
 * @property int    $eventId
 * @property string $recurrenceId
 * @property string $code
 */
class OccurrenceCodeRecord extends ActiveRecord
{
    public const TABLE = '{{%calendar_occurrence_codes}}';
    public const TABLE_STD = 'calendar_occurrence_codes';

    public static function tableName(): string
    {
        return self::TABLE;
    }
}
