<?php

namespace Solspace\Calendar\Models;

use craft\base\Model;
use craft\helpers\ArrayHelper;
use craft\helpers\UrlHelper;
use craft\models\FieldLayout;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\ColorHelper;

class CalendarModel extends Model implements \JsonSerializable
{
    const COLOR_LIGHTEN_MULTIPLIER = 0.2;
    const COLOR_DARKEN_MULTIPLIER  = -0.2;

    /** @var int */
    public $id;

    /** @var string */
    public $name;

    /** @var string */
    public $handle;

    /** @var string */
    public $description;

    /** @var string */
    public $color;

    /** @var int */
    public $fieldLayoutId;

    /** @var string */
    public $titleFormat;

    /** @var string */
    public $titleLabel;

    /** @var bool */
    public $hasTitleField;

    /** @var string */
    public $descriptionFieldHandle;

    /** @var string */
    public $locationFieldHandle;

    /** @var string */
    public $icsHash;

    /** @var CalendarSiteSettingsModel[] */
    private $siteSettings;

    /** @var FieldLayout */
    private $fieldLayout;

    /**
     * @return CalendarModel
     */
    public static function create(): CalendarModel
    {
        $model                = new self();
        $model->color         = ColorHelper::randomColor();
        $model->titleLabel    = 'Title';
        $model->hasTitleField = true;

        return $model;
    }

    /**
     * Returns the calendar $name property
     *
     * @return string
     */
    public function __toString(): string
    {
        return $this->name;
    }

    /**
     * Regenerates the ICS Hash, sets it and returns it
     *
     * @return string
     */
    public function regenerateIcsHash(): string
    {
        $hash = uniqid(sha1($this->id), true);

        $this->icsHash = $hash;

        return $hash;
    }

    /**
     * @return string - hex
     */
    public function getLighterColor(): string
    {
        return ColorHelper::lightenDarkenColour($this->color, self::COLOR_LIGHTEN_MULTIPLIER);
    }

    /**
     * @return string
     */
    public function getDarkerColor(): string
    {
        return ColorHelper::lightenDarkenColour($this->color, self::COLOR_DARKEN_MULTIPLIER);
    }

    /**
     * @return string - "black" or "white"
     */
    public function getContrastColor(): string
    {
        return ColorHelper::getContrastYIQ($this->color);
    }

    /**
     * @return null|string
     */
    public function getIcsUrl()
    {
        if (null === $this->icsHash) {
            return null;
        }

        $cpTrigger = \Craft::$app->config->general->cpTrigger;

        $url = UrlHelper::actionUrl('calendar/api/ics', ['hash' => $this->icsHash . '.ics']);

        return str_replace($cpTrigger . '/', '', $url);
    }

    /**
     * @return array
     */
    public function getDescriptionFieldHandles(): array
    {
        $fieldList = [Calendar::t('None')];
        if ($this->getFieldLayout()) {
            foreach ($this->getFieldLayout()->getFields() as $field) {
                $fieldList[$field->handle] = $field->name;
            }
        }

        return $fieldList;
    }

    /**
     * @return array
     */
    public function getLocationFieldHandles(): array
    {
        return $this->getDescriptionFieldHandles();
    }

    /**
     * Returns the owner's field layout.
     *
     * @return FieldLayout|null
     */
    public function getFieldLayout()
    {
        if ($this->fieldLayout === null && $this->fieldLayoutId) {
            $this->fieldLayout = \Craft::$app->getFields()->getLayoutById($this->fieldLayoutId);

            if ($this->fieldLayout === null) {
                $this->fieldLayout       = new FieldLayout();
                $this->fieldLayout->type = Event::class;
            }
        }

        return $this->fieldLayout;
    }

    /**
     * Sets the owner's field layout.
     *
     * @param FieldLayout $fieldLayout
     *
     * @return void
     */
    public function setFieldLayout(FieldLayout $fieldLayout)
    {
        $this->fieldLayout = $fieldLayout;
    }

    /**
     * Returns the section's site-specific settings, indexed by site ID.
     *
     * @return CalendarSiteSettingsModel[]
     */
    public function getSiteSettings(): array
    {
        if (null !== $this->siteSettings) {
            return $this->siteSettings;
        }

        if (!$this->id) {
            return [];
        }

        $this->setSiteSettings(Calendar::getInstance()->calendars->getCalendarSiteSettings($this->id));

        return $this->siteSettings;
    }

    /**
     * Sets the section's site-specific settings.
     *
     * @param CalendarSiteSettingsModel[] $siteSettings
     *
     * @return void
     */
    public function setSiteSettings(array $siteSettings)
    {
        $this->siteSettings = ArrayHelper::index($siteSettings, 'siteId');

        foreach ($this->siteSettings as $settings) {
            $settings->setCalendar($this);
        }
    }

    /**
     * @param int $siteId
     *
     * @return CalendarSiteSettingsModel|null
     */
    public function getSiteSettingsForSite(int $siteId)
    {
        $settings = $this->getSiteSettings();

        if (isset($settings[$siteId])) {
            return $settings[$siteId];
        }

        return null;
    }

    /**
     * @param int $siteId
     *
     * @return null|string
     */
    public function getUriFormat(int $siteId)
    {
        $settings = $this->getSiteSettingsForSite($siteId);

        if (!$settings) {
            return null;
        }

        return $settings->hasUrls && $settings->uriFormat ? $settings->uriFormat : null;
    }

    /**
     * @return array
     */
    public function jsonSerialize(): array
    {
        return [
            'id'     => (int)$this->id,
            'name'   => $this->name,
            'handle' => $this->handle,
        ];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            [['titleFormat'], 'required', 'when' => function (CalendarModel $model) {
                return !$model->hasTitleField;
            }],
            [['titleLabel'], 'required', 'when' => function (CalendarModel $model) {
                return $model->hasTitleField;
            }],
        ];
    }
}
