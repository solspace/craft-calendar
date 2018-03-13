<?php

namespace Solspace\Calendar\Models;

use craft\base\Model;
use craft\models\Site;
use craft\validators\SiteIdValidator;
use craft\validators\UriFormatValidator;
use Solspace\Calendar\Calendar;
use yii\base\InvalidConfigException;

class CalendarSiteSettingsModel extends Model
{
    /** @var int */
    public $id;

    /** @var int */
    public $calendarId;

    /** @var int */
    public $siteId;

    /** @var bool */
    public $enabledByDefault = true;

    /** @var bool */
    public $hasUrls;

    /** @var string */
    public $uriFormat;

    /** @var string */
    public $template;

    /** @var CalendarModel */
    private $calendar;

    /**
     * @return Site
     */
    public function getSite(): Site
    {
        return \Craft::$app->sites->getSiteById($this->siteId);
    }

    /**
     * Returns the section.
     *
     * @return CalendarModel
     * @throws InvalidConfigException if [[sectionId]] is missing or invalid
     */
    public function getCalendar(): CalendarModel
    {
        if ($this->calendar !== null) {
            return $this->calendar;
        }

        if (!$this->calendarId) {
            throw new InvalidConfigException('Section site settings model is missing its section ID');
        }

        if (($this->calendar = Calendar::getInstance()->calendars->getCalendarById($this->calendarId)) === null) {
            throw new InvalidConfigException('Invalid calendar ID: ' . $this->calendarId);
        }

        return $this->calendar;
    }

    /**
     * Sets the section.
     *
     * @param CalendarModel $calendar
     *
     * @return $this
     */
    public function setCalendar(CalendarModel $calendar): CalendarSiteSettingsModel
    {
        $this->calendar   = $calendar;
        $this->calendarId = $calendar->id;

        return $this;
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels(): array
    {
        return [
            'template'  => \Craft::t('app', 'Template'),
            'uriFormat' => \Craft::t('app', 'URI Format'),
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules(): array
    {
        $rules = [
            [['id', 'calendarId', 'siteId'], 'number', 'integerOnly' => true],
            [['siteId'], SiteIdValidator::class],
            [['template'], 'string', 'max' => 500],
            [['uriFormat'], UriFormatValidator::class],
        ];

        if ($this->hasUrls) {
            $rules[] = [['uriFormat'], 'required'];
        }

        return $rules;
    }
}
