<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveQuery;
use craft\db\ActiveRecord;
use Solspace\Calendar\Elements\Db\OccurrenceQuery;
use Solspace\Calendar\Elements\Event;

/**
 * @property int    $id
 * @property int    $eventId
 * @property int    $calendarId
 * @property string $startUtc
 * @property string $endUtc
 * @property bool   $allDay
 */
class OccurrenceRecord extends ActiveRecord
{
    public const TABLE = '{{%calendar_events_occurrences}}';
    public const TABLE_STD = 'calendar_events_occurrences';

    public static function tableName(): string
    {
        return self::TABLE;
    }

    public static function find(): ActiveQuery
    {
        return \Craft::createObject(OccurrenceQuery::class, [static::class]);
    }

    public function getCalendar(): ActiveQuery
    {
        return $this->hasOne(CalendarRecord::class, ['id' => 'calendarId']);
    }
}
