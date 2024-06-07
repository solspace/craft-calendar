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
    public ?int $id = null;

    public ?string $uid = null;

    public ?int $calendarId = null;

    public ?int $siteId = null;

    public bool $enabledByDefault = true;

    public ?bool $hasUrls = null;

    public ?string $uriFormat = null;

    public ?string $template = null;

    private ?CalendarModel $calendar = null;

    public function getSite(): ?Site
    {
        return \Craft::$app->sites->getSiteById($this->siteId);
    }

    /**
     * Returns the section.
     *
     * @throws InvalidConfigException if [[sectionId]] is missing or invalid
     */
    public function getCalendar(): CalendarModel
    {
        if (null !== $this->calendar) {
            return $this->calendar;
        }

        if (!$this->calendarId) {
            throw new InvalidConfigException('Section site settings model is missing its section ID');
        }

        if (($this->calendar = Calendar::getInstance()->calendars->getCalendarById($this->calendarId)) === null) {
            throw new InvalidConfigException('Invalid calendar ID: '.$this->calendarId);
        }

        return $this->calendar;
    }

    /**
     * Sets the section.
     */
    public function setCalendar(CalendarModel $calendar): self
    {
        $this->calendar = $calendar;
        $this->calendarId = $calendar->id;

        return $this;
    }

    public function attributeLabels(): array
    {
        return [
            'template' => \Craft::t('app', 'Template'),
            'uriFormat' => \Craft::t('app', 'URI Format'),
        ];
    }

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
