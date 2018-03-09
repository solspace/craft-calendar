<?php

namespace Solspace\Calendar\Records;

use craft\db\ActiveRecord;
use craft\records\Site;
use yii\db\ActiveQueryInterface;

/**
 * @property int            $id
 * @property int            $calendarId
 * @property int            $siteId
 * @property bool           $enabledByDefault
 * @property bool           $hasUrls
 * @property string         $uriFormat
 * @property string         $template
 * @property CalendarRecord $calendar
 * @property Site           $site
 */
class CalendarSiteSettingsRecord extends ActiveRecord
{
    const TABLE = '{{%calendar_calendar_sites}}';

    /**
     * @return string
     */
    public static function tableName(): string
    {
        return self::TABLE;
    }

    /**
     * Returns the associated section.
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getSection(): ActiveQueryInterface
    {
        return $this->hasOne(CalendarRecord::class, ['id' => 'calendarId']);
    }

    /**
     * Returns the associated site.
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getSite(): ActiveQueryInterface
    {
        return $this->hasOne(Site::class, ['id' => 'siteId']);
    }
}
