<?php

namespace Solspace\Calendar\Models;

use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use yii\base\InvalidArgumentException;

/**
 * An occurrence's title and custom field values: the override's value for every field
 * the occurrence overrides, and the event's value for everything else.
 *
 * Read it like an element: `occurrence.content.title`, `occurrence.content.<fieldHandle>`.
 */
class OccurrenceContent
{
    // Same key as OccurrenceOverride::TITLE, kept here so occurrences without an override never load that class
    private const TITLE = 'title';

    public function __construct(
        private Event $event,
        private ?OccurrenceOverride $override = null,
    ) {}

    public function __get(string $name): mixed
    {
        if (self::TITLE === $name) {
            return $this->getTitle();
        }

        if ($this->hasField($name)) {
            return $this->getFieldValue($name);
        }

        return $this->event->{$name};
    }

    public function __isset(string $name): bool
    {
        return self::TITLE === $name || $this->hasField($name) || isset($this->event->{$name});
    }

    public function getTitle(): ?string
    {
        return $this->isOverridden(self::TITLE) ? $this->override->title : $this->event->title;
    }

    public function getFieldValue(string $handle): mixed
    {
        return $this->getSourceElement($handle)->getFieldValue($handle);
    }

    public function isOverridden(string $handle): bool
    {
        if (!$this->override) {
            return false;
        }

        try {
            return $this->override->isFieldOverridden($handle);
        } catch (InvalidArgumentException) {
            return false;
        }
    }

    /**
     * @return string[] `title` and the handles of the custom fields the occurrence overrides
     */
    public function getOverriddenFields(): array
    {
        return $this->override?->getOverriddenFieldHandles() ?? [];
    }

    /**
     * The element a field's value comes from for this occurrence.
     */
    public function getSourceElement(string $handle): Event|OccurrenceOverride
    {
        return $this->isOverridden($handle) ? $this->override : $this->event;
    }

    public function getEvent(): Event
    {
        return $this->event;
    }

    public function getCalendar(): CalendarModel
    {
        return $this->event->getCalendar();
    }

    private function hasField(string $handle): bool
    {
        return null !== $this->event->getFieldLayout()?->getFieldByHandle($handle);
    }
}
