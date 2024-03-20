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
 * @property string $titleTranslationMethod
 * @property string $titleTranslationKeyFormat
 * @property string $descriptionFieldHandle
 * @property string $locationFieldHandle
 * @property string $icsHash
 * @property string $icsTimezone
 * @property bool   $allowRepeatingEvents;
 */
class CalendarRecord extends ActiveRecord
{
    public const TABLE = '{{%calendar_calendars}}';
    public const TABLE_STD = 'calendar_calendars';

    public static function tableName(): string
    {
        return self::TABLE;
    }

    public function getFieldLayout(): ActiveQuery|FieldLayout
    {
        return $this->hasOne(FieldLayout::class, ['id' => 'fieldLayoutId']);
    }
}
