<?php

namespace Solspace\Calendar\Models;

use craft\base\Model;
use craft\behaviors\FieldLayoutBehavior;
use craft\helpers\ArrayHelper;
use craft\helpers\UrlHelper;
use craft\models\FieldLayout;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\ColorHelper;
use Solspace\Calendar\Library\DateHelper;
use craft\validators\HandleValidator;
use craft\validators\UniqueValidator;
use Solspace\Calendar\Records\CalendarRecord;

class CalendarModel extends Model implements \JsonSerializable
{
    const COLOR_LIGHTEN_MULTIPLIER = 0.2;
    const COLOR_DARKEN_MULTIPLIER = -0.2;

    /** @var int */
    public $id;

    /** @var string */
    public $uid;

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

    /** @var string */
    public $icsTimezone;

    /** @var bool */
    public $allowRepeatingEvents;

    /** @var CalendarSiteSettingsModel[] */
    private $siteSettings;

    /** @var FieldLayout */
    private $fieldLayout;

    /**
     * Returns the calendar $name property.
     */
    public function __toString(): string
    {
        return $this->name;
    }

    public static function create(): self
    {
        $model = new self();
        $model->color = ColorHelper::randomColor();
        $model->titleLabel = 'Title';
        $model->hasTitleField = true;
        $model->icsTimezone = DateHelper::FLOATING_TIMEZONE;
        $model->allowRepeatingEvents = true;

        return $model;
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['fieldLayout'] = [
            'class' => FieldLayoutBehavior::class,
            'elementType' => Event::class,
        ];

        return $behaviors;
    }

    /**
     * Regenerates the ICS Hash, sets it and returns it.
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

        $url = UrlHelper::actionUrl('calendar/api/ics', ['hash' => $this->icsHash.'.ics']);

        return str_replace($cpTrigger.'/', '', $url);
    }

    public function getIcsTimezone(): string
    {
        return $this->icsTimezone ?: DateHelper::FLOATING_TIMEZONE;
    }

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

    public function getLocationFieldHandles(): array
    {
        return $this->getDescriptionFieldHandles();
    }

    /**
     * Returns the owner's field layout.
     *
     * @return null|FieldLayout
     */
    public function getFieldLayout()
    {
        if (null === $this->fieldLayout && $this->fieldLayoutId) {
            $this->fieldLayout = \Craft::$app->getFields()->getLayoutById($this->fieldLayoutId);

            if (null === $this->fieldLayout) {
                $this->fieldLayout = new FieldLayout();
                $this->fieldLayout->type = Event::class;
            }
        }

        return $this->fieldLayout;
    }

    /**
     * Sets the owner's field layout.
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

        $this->setSiteSettings(Calendar::getInstance()->calendarSites->getSiteSettingsForCalendar($this));

        return $this->siteSettings;
    }

    /**
     * Sets the section's site-specific settings.
     *
     * @param CalendarSiteSettingsModel[] $siteSettings
     */
    public function setSiteSettings(array $siteSettings)
    {
        $this->siteSettings = ArrayHelper::index($siteSettings, 'siteId');

        foreach ($this->siteSettings as $settings) {
            $settings->setCalendar($this);
        }
    }

    /**
     * @return null|CalendarSiteSettingsModel
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

    public function jsonSerialize(): array
    {
        return [
            'id' => (int) $this->id,
            'name' => $this->name,
            'handle' => $this->handle,
        ];
    }

    public function rules(): array
    {
        return $this->defineRules();
    }

    public function defineRules(): array
    {
	    $rules = parent::defineRules();

	    $rules[] = [
		    ['name', 'handle'],
		    'required',
	    ];

	    $rules[] = [
	        ['name', 'handle'],
	        'string',
	        'max' => 255,
	    ];

	    $rules[] = [
		    ['handle'],
		    HandleValidator::class,
		    'reservedWords' => ['title'],
	    ];

	    $rules[] = [
		    ['name'],
		    UniqueValidator::class,
		    'targetClass' => CalendarRecord::class,
		    'targetAttribute' => ['name'],
		    'comboNotUnique' => \Craft::t('yii', '{attribute} "{value}" has already been taken.'),
	    ];

	    $rules[] = [
		    ['handle'],
		    UniqueValidator::class,
		    'targetClass' => CalendarRecord::class,
		    'targetAttribute' => ['handle'],
		    'comboNotUnique' => \Craft::t('yii', '{attribute} "{value}" has already been taken.'),
	    ];

        $rules[] = [
            ['titleFormat'],
            'required',
            'when' => function (self $model) {
                return !$model->hasTitleField;
            }
        ];

	    $rules[] = [
	        ['titleLabel'],
	        'required',
	        'when' => function (self $model) {
                return $model->hasTitleField;
            }
        ];

        return $rules;
    }
}
