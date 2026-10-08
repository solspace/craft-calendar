<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveRecord;

/**
 * Marks a draft made with "Edit this and following". Applying the draft splits its event at `splitAt`.
 * The row goes when the draft does.
 *
 * @property int    $eventId the draft's ID
 * @property string $splitAt the recurrence ID the draft continues the event from
 */
class EventSplitRecord extends ActiveRecord
{
    public const TABLE = '{{%calendar_event_splits}}';
    public const TABLE_STD = 'calendar_event_splits';

    public static function tableName(): string
    {
        return self::TABLE;
    }
}
