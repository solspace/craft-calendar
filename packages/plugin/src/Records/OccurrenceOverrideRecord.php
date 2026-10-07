<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveRecord;

/**
 * Site-independent data of an occurrence override: which occurrence it belongs to,
 * its own times and whether it's cancelled.
 *
 * @property int         $id
 * @property int         $primaryOwnerId
 * @property string      $recurrenceId
 * @property null|string $startDate
 * @property null|string $endDate
 * @property null|bool   $allDay
 * @property bool        $cancelled
 * @property bool        $orphaned
 */
class OccurrenceOverrideRecord extends ActiveRecord
{
    public const TABLE = '{{%calendar_occurrence_overrides}}';
    public const TABLE_STD = 'calendar_occurrence_overrides';

    public static function tableName(): string
    {
        return self::TABLE;
    }
}
