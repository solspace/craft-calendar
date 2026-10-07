<?php

namespace Solspace\Calendar\Elements;

use Carbon\Carbon;
use craft\base\Element;
use craft\base\ElementContainerFieldInterface;
use craft\base\FieldInterface;
use craft\base\NestedElementInterface;
use craft\base\NestedElementTrait;
use craft\db\Query;
use craft\db\Table;
use craft\elements\db\ElementQueryInterface;
use craft\elements\User;
use craft\helpers\Db;
use craft\helpers\ElementHelper;
use craft\helpers\Json;
use craft\models\FieldLayout;
use Solspace\Calendar\Bundles\Occurrences\RecurrenceId;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\OccurrenceOverrideQuery;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\OccurrenceModel;
use Solspace\Calendar\Records\OccurrenceOverrideRecord;
use Solspace\Calendar\Records\OccurrenceOverrideSiteRecord;
use yii\base\InvalidArgumentException;
use yii\base\InvalidConfigException;

/**
 * The changes made to one occurrence of an event.
 *
 * It uses the event's field layout, but only the fields listed in `overriddenFields`
 * belong to it. Every other field is left empty and keeps following the event.
 */
class OccurrenceOverride extends Element implements NestedElementInterface
{
    use NestedElementTrait;

    /**
     * Key used in `overriddenFields` for the title.
     */
    public const TITLE = 'title';

    /**
     * The start the event's schedule produced for the occurrence this override belongs to.
     */
    public ?Carbon $recurrenceId = null;

    /**
     * The occurrence's own times. All three are null while it keeps the event's times.
     */
    public ?Carbon $startDate = null;
    public ?Carbon $endDate = null;
    public ?bool $allDay = null;

    public bool $cancelled = false;

    /**
     * Set when the event's schedule no longer produces this override's occurrence.
     */
    public bool $orphaned = false;

    /**
     * Field layout element UIDs of the fields this override replaces in its site, plus `title`.
     *
     * @var string[]
     */
    public array $overriddenFields = [];

    /**
     * Nested-element fields to copy from the event once this override has an ID.
     *
     * @var array<string, true>
     */
    private array $pendingSeriesCopies = [];

    public function __construct($config = [])
    {
        foreach (['recurrenceId', 'startDate', 'endDate'] as $property) {
            if (isset($config[$property]) && \is_string($config[$property])) {
                $config[$property] = RecurrenceId::toCarbon($config[$property]);
            }
        }

        if (\array_key_exists('overriddenFields', $config) && !\is_array($config['overriddenFields'])) {
            $overriddenFields = Json::decodeIfJson((string) $config['overriddenFields']);
            $config['overriddenFields'] = \is_array($overriddenFields) ? $overriddenFields : [];
        }

        if (isset($config['allDay'])) {
            $config['allDay'] = (bool) $config['allDay'];
        }

        foreach (['cancelled', 'orphaned'] as $property) {
            if (isset($config[$property])) {
                $config[$property] = (bool) $config[$property];
            }
        }

        parent::__construct($config);
    }

    public static function displayName(): string
    {
        return Calendar::t('Occurrence override');
    }

    public static function lowerDisplayName(): string
    {
        return Calendar::t('occurrence override');
    }

    public static function pluralDisplayName(): string
    {
        return Calendar::t('Occurrence overrides');
    }

    public static function pluralLowerDisplayName(): string
    {
        return Calendar::t('occurrence overrides');
    }

    public static function hasTitles(): bool
    {
        return true;
    }

    public static function isLocalized(): bool
    {
        return true;
    }

    /**
     * @return OccurrenceOverrideQuery
     */
    public static function find(): ElementQueryInterface
    {
        return new OccurrenceOverrideQuery(static::class);
    }

    /**
     * The event this override is currently being edited for. That's a draft
     * while it's being edited inside one, otherwise the live event.
     */
    public function getEvent(): ?Event
    {
        $owner = $this->getOwner();

        return $owner instanceof Event ? $owner : null;
    }

    public function getSupportedSites(): array
    {
        $event = $this->getEvent();
        if (!$event) {
            return parent::getSupportedSites();
        }

        return array_map(
            static fn (array $site) => $site['siteId'],
            ElementHelper::supportedSitesForElement($event),
        );
    }

    public function getFieldLayout(): ?FieldLayout
    {
        // The stored layout ID avoids loading the event for every override in a query result
        return parent::getFieldLayout() ?? $this->getEvent()?->getFieldLayout();
    }

    public function getTitleTranslationDescription(): ?string
    {
        $calendar = $this->getCalendar();

        return $calendar
            ? ElementHelper::translationDescription($calendar->titleTranslationMethod)
            : parent::getTitleTranslationDescription();
    }

    public function getTitleTranslationKey(): string
    {
        $calendar = $this->getCalendar();

        return $calendar
            ? ElementHelper::translationKey($this, $calendar->titleTranslationMethod, $calendar->titleTranslationKeyFormat)
            : parent::getTitleTranslationKey();
    }

    public function getUiLabel(): string
    {
        if ($this->isFieldOverridden(self::TITLE) && '' !== (string) $this->title) {
            return (string) $this->title;
        }

        return $this->recurrenceId?->format('Y-m-d H:i') ?? parent::getUiLabel();
    }

    public function canView(User $user): bool
    {
        return $this->getEvent()?->canView($user) ?? false;
    }

    public function canSave(User $user): bool
    {
        return $this->getEvent()?->canSave($user) ?? false;
    }

    public function canDelete(User $user): bool
    {
        return $this->canSave($user);
    }

    public function canDuplicate(User $user): bool
    {
        return false;
    }

    public function canCreateDrafts(User $user): bool
    {
        return false;
    }

    public function isFieldOverridden(string $handle): bool
    {
        return \in_array($this->overrideKey($handle), $this->overriddenFields, true);
    }

    /**
     * @return string[] `title` and the handles of the custom fields this override replaces
     */
    public function getOverriddenFieldHandles(): array
    {
        $handles = \in_array(self::TITLE, $this->overriddenFields, true) ? [self::TITLE] : [];

        foreach ($this->getFieldLayout()?->getCustomFields() ?? [] as $field) {
            if (\in_array($field->layoutElement->uid, $this->overriddenFields, true)) {
                $handles[] = $field->handle;
            }
        }

        return $handles;
    }

    /**
     * Gives this occurrence its own value for a field (or `title`).
     */
    public function overrideField(string $handle, mixed $value): static
    {
        if (self::TITLE === $handle) {
            $this->title = $value;
        } else {
            $this->getCustomField($handle);
            $this->setFieldValue($handle, $value);
        }

        unset($this->pendingSeriesCopies[$handle]);
        $this->markOverridden($handle, true);

        return $this;
    }

    /**
     * Gives this occurrence its own copy of the event's current value for a field (or `title`),
     * to be edited from there.
     */
    public function overrideFieldWithSeriesValue(string $handle): static
    {
        $event = $this->getEvent() ?? throw new InvalidConfigException('An occurrence override needs its event.');

        if (self::TITLE === $handle) {
            return $this->overrideField($handle, $event->title);
        }

        $field = $this->getCustomField($handle);

        if ($field instanceof ElementContainerFieldInterface) {
            // Nested elements need an owner with an ID, so they're copied once this override is saved
            $this->setFieldValue($handle, '');
            $this->pendingSeriesCopies[$handle] = true;
        } else {
            $field->copyValue($event, $this);
        }

        $this->markOverridden($handle, true);

        return $this;
    }

    /**
     * Lets a field (or `title`) follow the event again.
     */
    public function inheritField(string $handle): static
    {
        // Clearing the value keeps stale relations and nested elements out of queries and search
        if (self::TITLE === $handle) {
            $this->title = null;
        } else {
            $this->getCustomField($handle);
            $this->setFieldValue($handle, '');
        }

        unset($this->pendingSeriesCopies[$handle]);
        $this->markOverridden($handle, false);

        return $this;
    }

    public function hasOwnTimes(): bool
    {
        return null !== $this->startDate;
    }

    /**
     * Gives the occurrence its own times. For an all-day occurrence, `$endDate` is the last day it
     * covers; like all-day events, it then runs from the start of the first day to the end of the last.
     */
    public function reschedule(Carbon $startDate, Carbon $endDate, bool $allDay): static
    {
        if ($allDay) {
            $startDate = $startDate->copy()->startOfDay();
            $endDate = $endDate->copy()->setTime(23, 59, 59);
        }

        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->allDay = $allDay;

        return $this;
    }

    public function inheritTimes(): static
    {
        $this->startDate = null;
        $this->endDate = null;
        $this->allDay = null;

        return $this;
    }

    public function hasCustomSlug(): bool
    {
        return null !== $this->slug && '' !== $this->slug;
    }

    /**
     * Whether the occurrence differs from its event in any way, a custom slug included.
     */
    public function hasChanges(): bool
    {
        return $this->hasOwnTimes()
            || $this->cancelled
            || $this->hasCustomSlug()
            || [] !== $this->getOverriddenFieldHandles();
    }

    /**
     * Fields this override doesn't replace are deliberately empty, so only overridden ones are validated.
     *
     * @param null|mixed $attributeNames
     * @param mixed      $clearErrors
     */
    public function validate($attributeNames = null, $clearErrors = true)
    {
        if (null === $attributeNames) {
            $attributeNames = $this->activeAttributes();

            foreach ($this->getOverriddenFieldHandles() as $handle) {
                if (self::TITLE !== $handle) {
                    $attributeNames[] = "field:{$handle}";
                }
            }
        }

        return parent::validate($attributeNames, $clearErrors);
    }

    public function validateTimes(): void
    {
        if (null === $this->startDate && null === $this->endDate) {
            return;
        }

        if (null === $this->startDate || null === $this->endDate) {
            $this->addError('startDate', Calendar::t('An occurrence needs both a start and an end date.'));

            return;
        }

        if ($this->endDate < $this->startDate) {
            $this->addError('endDate', Calendar::t('The end date must be after the start date.'));
        }
    }

    /**
     * Custom slugs are unique per event and site. A taken slug gets a `-1`, `-2`, … suffix.
     */
    public function validateSlug(string $attribute): void
    {
        $slug = ElementHelper::normalizeSlug((string) $this->slug);

        if ('' === $slug) {
            $this->slug = null;

            return;
        }

        if (preg_match(OccurrenceModel::GENERATED_SLUG_PATTERN, $slug)) {
            $this->addError($attribute, Calendar::t('Custom slugs can’t look like generated occurrence slugs.'));

            return;
        }

        $this->slug = self::pickAvailableSlug($slug, $this->findTakenSlugs($slug));
    }

    public function beforeSave(bool $isNew): bool
    {
        if ($this->propagating && $this->propagatingFrom instanceof self) {
            $this->mirrorSharedOverrides($this->propagatingFrom);
        }

        $this->fieldLayoutId = $this->getEvent()?->getFieldLayout()?->id ?? $this->fieldLayoutId;

        return parent::beforeSave($isNew);
    }

    public function afterSave(bool $isNew): void
    {
        if (!$this->propagating) {
            Db::upsert(OccurrenceOverrideRecord::TABLE, [
                'id' => $this->id,
                'primaryOwnerId' => $this->getPrimaryOwnerId(),
                'recurrenceId' => $this->recurrenceId?->format(RecurrenceId::FORMAT),
                'startDate' => $this->startDate?->format(RecurrenceId::FORMAT),
                'endDate' => $this->endDate?->format(RecurrenceId::FORMAT),
                'allDay' => $this->allDay,
                'cancelled' => $this->cancelled,
                'orphaned' => $this->orphaned,
            ]);

            $this->saveFieldlessOwnership();
        }

        Db::upsert(OccurrenceOverrideSiteRecord::TABLE, [
            'id' => $this->id,
            'siteId' => $this->siteId,
            // A JSON column, so the array is encoded by the query builder
            'overriddenFields' => array_values(array_unique($this->overriddenFields)),
        ]);

        parent::afterSave($isNew);
    }

    public function afterPropagate(bool $isNew): void
    {
        parent::afterPropagate($isNew);

        if (!$this->pendingSeriesCopies) {
            return;
        }

        $event = $this->getEvent();
        if ($event) {
            foreach (array_keys($this->pendingSeriesCopies) as $handle) {
                $this->copyNestedElementsFromSeries($event, $handle);
            }
        }

        $this->pendingSeriesCopies = [];
    }

    protected function defineRules(): array
    {
        $rules = parent::defineRules();
        $rules[] = [['recurrenceId'], 'required'];
        $rules[] = [['startDate'], 'validateTimes', 'skipOnEmpty' => false];
        $rules[] = [
            ['slug'],
            'validateSlug',
            'on' => [self::SCENARIO_DEFAULT, self::SCENARIO_LIVE, self::SCENARIO_ESSENTIALS],
        ];

        return $rules;
    }

    protected function shouldValidateTitle(): bool
    {
        return \in_array(self::TITLE, $this->overriddenFields, true);
    }

    private function getCalendar(): ?CalendarModel
    {
        return $this->getEvent()?->getCalendar();
    }

    private function getCustomField(string $handle): FieldInterface
    {
        $field = $this->getFieldLayout()?->getFieldByHandle($handle);
        if (!$field) {
            throw new InvalidArgumentException("The event’s field layout has no field with the handle “{$handle}”.");
        }

        return $field;
    }

    private function overrideKey(string $handle): string
    {
        return self::TITLE === $handle ? self::TITLE : $this->getCustomField($handle)->layoutElement->uid;
    }

    private function markOverridden(string $handle, bool $overridden): void
    {
        $this->overriddenFields = self::withKey($this->overriddenFields, $this->overrideKey($handle), $overridden);
    }

    /**
     * Fields and titles that share one value across sites also share whether they're overridden,
     * following the same translation keys Craft uses when it propagates their values.
     */
    private function mirrorSharedOverrides(self $source): void
    {
        $keys = $this->overriddenFields;

        if ($this->getTitleTranslationKey() === $source->getTitleTranslationKey()) {
            $keys = self::withKey($keys, self::TITLE, \in_array(self::TITLE, $source->overriddenFields, true));
        }

        foreach ($this->getFieldLayout()?->getCustomFields() ?? [] as $field) {
            if ($field->getTranslationKey($this) === $field->getTranslationKey($source)) {
                $uid = $field->layoutElement->uid;
                $keys = self::withKey($keys, $uid, \in_array($uid, $source->overriddenFields, true));
            }
        }

        $this->overriddenFields = $keys;
    }

    private function copyNestedElementsFromSeries(Event $event, string $handle): void
    {
        $value = $event->getFieldValue($handle);
        $nestedElements = $value instanceof ElementQueryInterface
            ? (clone $value)->status(null)->all()
            : $value->all();

        foreach ($nestedElements as $nestedElement) {
            \Craft::$app->getElements()->duplicateElement($nestedElement, [
                'owner' => $this,
                'primaryOwner' => $this,
            ]);
        }

        // Let the field load the copies the next time it's read
        $this->setFieldValue($handle, null);
    }

    /**
     * NestedElementTrait::saveOwnership() only handles elements that belong to a field.
     */
    private function saveFieldlessOwnership(): void
    {
        $ownerId = $this->getOwnerId();
        if (!$ownerId || !$this->saveOwnership || $this->resaving) {
            return;
        }

        foreach (array_unique([$ownerId, $this->getPrimaryOwnerId()]) as $id) {
            $exists = (new Query())
                ->from(Table::ELEMENTS_OWNERS)
                ->where(['elementId' => $this->id, 'ownerId' => $id])
                ->exists()
            ;

            if (!$exists) {
                Db::insert(Table::ELEMENTS_OWNERS, [
                    'elementId' => $this->id,
                    'ownerId' => $id,
                    'sortOrder' => $this->sortOrder ?? 1,
                ]);
            }
        }
    }

    /**
     * @return string[]
     */
    private function findTakenSlugs(string $slug): array
    {
        return (new Query())
            ->select(['elements_sites.slug'])
            ->from(['elements_sites' => Table::ELEMENTS_SITES])
            ->innerJoin(['overrides' => OccurrenceOverrideRecord::TABLE], '[[overrides.id]] = [[elements_sites.elementId]]')
            ->innerJoin(['elements' => Table::ELEMENTS], '[[elements.id]] = [[elements_sites.elementId]]')
            ->where([
                'overrides.primaryOwnerId' => $this->getPrimaryOwnerId(),
                'elements_sites.siteId' => $this->siteId,
                'elements.dateDeleted' => null,
            ])
            ->andWhere(['or', ['elements_sites.slug' => $slug], ['like', 'elements_sites.slug', $slug.'-%', false]])
            ->andWhere(['not', ['elements_sites.elementId' => $this->id ?? 0]])
            ->column()
        ;
    }

    /**
     * @param string[] $taken
     */
    private static function pickAvailableSlug(string $slug, array $taken): string
    {
        $taken = array_flip($taken);
        if (!isset($taken[$slug])) {
            return $slug;
        }

        for ($suffix = 1;; ++$suffix) {
            if (!isset($taken["{$slug}-{$suffix}"])) {
                return "{$slug}-{$suffix}";
            }
        }
    }

    /**
     * @param string[] $keys
     *
     * @return string[]
     */
    private static function withKey(array $keys, string $key, bool $present): array
    {
        $keys = array_values(array_diff($keys, [$key]));
        if ($present) {
            $keys[] = $key;
        }

        return $keys;
    }
}
