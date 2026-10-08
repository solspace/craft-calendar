<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveRecord;
use craft\db\Query;
use craft\db\Table;

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

    /**
     * The event's own overrides, orphaned ones included and trashed ones not, as `overrides`.
     * Overrides a draft created belong to the draft until it's applied.
     */
    public static function findForEvent(int $eventId): Query
    {
        return (new Query())
            ->from(['overrides' => self::TABLE])
            ->innerJoin(['elements' => Table::ELEMENTS], '[[elements.id]] = [[overrides.id]]')
            ->where(['overrides.primaryOwnerId' => $eventId, 'elements.dateDeleted' => null])
        ;
    }
}
