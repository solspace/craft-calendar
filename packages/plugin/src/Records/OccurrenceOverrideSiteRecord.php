<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveRecord;

/**
 * Per-site data of an occurrence override: which fields it overrides in that site.
 *
 * @property int         $id
 * @property int         $siteId
 * @property null|string $overriddenFields
 */
class OccurrenceOverrideSiteRecord extends ActiveRecord
{
    public const TABLE = '{{%calendar_occurrence_overrides_sites}}';
    public const TABLE_STD = 'calendar_occurrence_overrides_sites';

    public static function tableName(): string
    {
        return self::TABLE;
    }
}
