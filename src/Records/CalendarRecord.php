<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveRecord;
use craft\records\FieldLayout;
use yii\db\ActiveQuery;

/**
 * @property int    $id
 * @property string $name
 * @property string $handle
 * @property string $description
 * @property string $color
 * @property int    $fieldLayoutId
 * @property string $titleFormat
 * @property string $titleLabel
 * @property string $hasTitleField
 * @property string $descriptionFieldHandle
 * @property string $locationFieldHandle
 * @property string $icsHash
 */
class CalendarRecord extends ActiveRecord
{
    const TABLE     = '{{%calendar_calendars}}';
    const TABLE_STD = 'calendar_calendars';

    /**
     * @return string
     */
    public static function tableName(): string
    {
        return self::TABLE;
    }

    /**
     * @return ActiveQuery|FieldLayout
     */
    public function getFieldLayout()
    {
        return $this->hasOne(FieldLayout::class, ['fieldLayoutId' => 'id']);
    }
}
