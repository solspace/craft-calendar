<?php

namespace Solspace\Calendar\Integrations\Plugins\Freeform\CalendarEvents;

use Carbon\Carbon;
use craft\base\Element;
use craft\helpers\ElementHelper;
use craft\helpers\UrlHelper;
use Solspace\Calendar\Elements\Event;
use Solspace\Freeform\Attributes\Integration\Type;
use Solspace\Freeform\Attributes\Property\Flag;
use Solspace\Freeform\Attributes\Property\Implementations\FieldMapping\FieldMapping;
use Solspace\Freeform\Attributes\Property\Input;
use Solspace\Freeform\Attributes\Property\Input\Special\Properties\FieldMappingTransformer;
use Solspace\Freeform\Attributes\Property\Validators\Required;
use Solspace\Freeform\Attributes\Property\ValueTransformer;
use Solspace\Freeform\Attributes\Property\VisibilityFilter;
use Solspace\Freeform\Form\Form;
use Solspace\Freeform\Library\Integrations\IntegrationInterface;
use Solspace\Freeform\Library\Integrations\Types\Elements\ElementIntegration;

\define('BASE_CP_URL', UrlHelper::baseCpUrl());
\define('CP_TRIGGER_URL', UrlHelper::prependCpTrigger(''));

#[Type(
    name: 'Calendar Events',
    type: Type::TYPE_ELEMENTS,
    readme: __DIR__.'/README.md',
    iconPath: __DIR__.'/icon.svg',
)]
class CalendarEvents extends ElementIntegration
{
    #[Required]
    #[Input\Select(
        label: 'Calendar',
        emptyOption: 'Select a default calendar',
        options: CalendarOptionsGenerator::class,
    )]
    protected string $calendarId = '';

    #[Input\Boolean(
        label: 'All Day',
    )]
    protected bool $allDay = false;

    #[Input\Boolean(
        label: 'Disabled',
    )]
    protected bool $disabled = false;

    #[Flag(IntegrationInterface::FLAG_INSTANCE_ONLY)]
    #[ValueTransformer(FieldMappingTransformer::class)]
    #[VisibilityFilter('!!values.calendarId')]
    #[Input\Special\Properties\FieldMapping(
        instructions: 'Select the Freeform fields to be mapped to the applicable Calendar Event attributes',
        source: BASE_CP_URL.'/'.CP_TRIGGER_URL.'/calendar/events/api/attributes',
    )]
    protected ?FieldMapping $attributeMapping = null;

    #[Flag(IntegrationInterface::FLAG_INSTANCE_ONLY)]
    #[ValueTransformer(FieldMappingTransformer::class)]
    #[VisibilityFilter('!!values.calendarId')]
    #[Input\Special\Properties\FieldMapping(
        instructions: 'Select the Freeform fields to be mapped to the applicable custom Calendar Event fields',
        source: BASE_CP_URL.'/'.CP_TRIGGER_URL.'/calendar/events/api/custom-fields',
        parameterFields: ['values.calendarId' => 'calendarId'],
    )]
    protected ?FieldMapping $fieldMapping = null;

    public function isConnectable(): bool
    {
        return null !== $this->getCalendarId();
    }

    public function getCalendarId(): int
    {
        return $this->calendarId;
    }

    public function isAllDay(): bool
    {
        return $this->allDay;
    }

    public function isDisabled(): bool
    {
        return $this->disabled;
    }

    public function getAttributeMapping(): ?FieldMapping
    {
        return $this->attributeMapping;
    }

    public function getFieldMapping(): ?FieldMapping
    {
        return $this->fieldMapping;
    }

    public function buildElement(Form $form): Element
    {
        $currentSiteId = \Craft::$app->sites->currentSite->id;

        $element = $this->getAssignedFormElement($form);
        if ($element instanceof Event) {
            $entry = $element;
        } else {
            $entry = Event::create($currentSiteId, $this->getCalendarId());
        }

        if (empty($entry->title)) {
            $entry->title = 'New Event - '.$entry->postDate->toDateTimeString();
        }

        if (empty($entry->slug)) {
            $entry->slug = ElementHelper::normalizeSlug($entry->title ?? '');
        }

        $entry->siteId = $currentSiteId;
        $entry->enabled = !$this->isDisabled();
        $entry->allDay = $this->isAllDay();

        $this->processMapping($entry, $form, $this->attributeMapping);
        $this->processMapping($entry, $form, $this->fieldMapping);

        if (!$entry->postDate instanceof Carbon) {
            $entry->postDate = Carbon::parse($entry->postDate);
        }

        if (!$entry->startDate instanceof Carbon) {
            $entry->startDate = Carbon::parse($entry->startDate);
        }

        if (!$entry->endDate instanceof Carbon) {
            $entry->endDate = Carbon::parse($entry->endDate);
        }

        return $entry;
    }

    public function onValidate(Form $form, Element $element): void
    {
        $calendar = $element->getCalendar();

        if (!$calendar->hasTitleField && !$element->title) {
            // If no title is present - generate one to remove errors
            $element->title = sha1(uniqid('', true).time());
            $element->slug = $element->title;
        }
    }
}
