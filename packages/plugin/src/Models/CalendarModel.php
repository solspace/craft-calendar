<?php

namespace Solspace\Calendar\Models;

use craft\base\Field;
use craft\base\Model;
use craft\behaviors\FieldLayoutBehavior;
use craft\helpers\ArrayHelper;
use craft\helpers\UrlHelper;
use craft\models\FieldLayout;
use craft\validators\HandleValidator;
use craft\validators\UniqueValidator;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\ColorHelper;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Records\CalendarRecord;

class CalendarModel extends Model implements \JsonSerializable
{
    public const COLOR_LIGHTEN_MULTIPLIER = 0.2;
    public const COLOR_DARKEN_MULTIPLIER = -0.2;

    public ?int $id = null;

    public ?string $uid = null;

    public ?string $name = null;

    public ?string $handle = null;

    public ?string $description = null;

    public ?string $color = null;

    public ?int $fieldLayoutId = null;

    public ?string $titleFormat = null;

    public ?string $titleLabel = null;

    public ?bool $hasTitleField = null;

    public ?string $titleTranslationMethod = null;

    public ?string $titleTranslationKeyFormat = null;

    public ?string $descriptionFieldHandle = null;

    public ?string $locationFieldHandle = null;

    public ?string $icsHash = null;

    public ?string $icsTimezone = null;

    public ?bool $allowRepeatingEvents = null;

    /** @var CalendarSiteSettingsModel[] */
    private ?array $siteSettings = null;

    private ?FieldLayout $fieldLayout = null;

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
        $model->titleTranslationMethod = Field::TRANSLATION_METHOD_SITE;
        $model->titleTranslationKeyFormat = null;

        return $model;
    }

    public function behaviors(): array
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

    public function getIcsUrl(): ?string
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
            foreach ($this->getFieldLayout()->getCustomFields() as $field) {
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
     */
    public function getFieldLayout(): ?FieldLayout
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
    public function setFieldLayout(FieldLayout $fieldLayout): void
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
    public function setSiteSettings(array $siteSettings): void
    {
        $this->siteSettings = ArrayHelper::index($siteSettings, 'siteId');

        foreach ($this->siteSettings as $settings) {
            $settings->setCalendar($this);
        }
    }

    public function getSiteSettingsForSite(int $siteId): ?CalendarSiteSettingsModel
    {
        $settings = $this->getSiteSettings();

        if (isset($settings[$siteId])) {
            return $settings[$siteId];
        }

        return null;
    }

    public function getUriFormat(int $siteId): ?string
    {
        $settings = $this->getSiteSettingsForSite($siteId);

        if (!$settings) {
            return null;
        }

        return $settings->hasUrls && $settings->uriFormat ? $settings->uriFormat : null;
    }

    public function jsonSerialize(): array
    {
        return $this->getConfig();
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
            },
        ];

        $rules[] = [
            ['titleLabel'],
            'required',
            'when' => function (self $model) {
                return $model->hasTitleField;
            },
        ];

        return $rules;
    }

    public function getConfig(): array
    {
        $config = [
            'id' => $this->id,
            'uid' => $this->uid,
            'name' => $this->name,
            'handle' => $this->handle,
            'description' => $this->description,
            'color' => $this->color,
            'fieldLayoutId' => $this->fieldLayoutId,
            'titleFormat' => $this->titleFormat,
            'titleLabel' => $this->titleLabel,
            'hasTitleField' => $this->hasTitleField,
            'titleTranslationMethod' => $this->titleTranslationMethod,
            'titleTranslationKeyFormat' => $this->titleTranslationKeyFormat,
            'descriptionFieldHandle' => $this->descriptionFieldHandle,
            'locationFieldHandle' => $this->locationFieldHandle,
            'icsHash' => $this->icsHash,
            'icsTimezone' => $this->icsTimezone,
            'allowRepeatingEvents' => $this->allowRepeatingEvents,
        ];

        foreach ($this->getSiteSettings() as $siteId => $siteSettings) {
            $config['siteSettings'][$siteSettings['uid']] = [
                'id' => (int) $siteSettings['id'],
                'uid' => $siteSettings['uid'],
                'calendarId' => (int) $siteSettings['calendarId'],
                'siteId' => (int) $siteSettings['siteId'],
                'enabledByDefault' => (bool) $siteSettings['enabledByDefault'],
                'hasUrls' => (bool) $siteSettings['hasUrls'],
                'uriFormat' => $siteSettings['uriFormat'] ?: null,
                'template' => $siteSettings['template'] ?: null,
            ];
        }

        return $config;
    }
}
