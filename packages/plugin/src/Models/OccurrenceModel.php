<?php

namespace Solspace\Calendar\Models;

use Carbon\Carbon;
use craft\base\Model;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceCodeGenerator;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Library\Duration\EventDuration;
use Solspace\Calendar\Library\Helpers\DateHelper;

class OccurrenceModel extends Model
{
    /**
     * Generated slugs are the occurrence's date followed by its code, e.g. `2026-10-14-fq4yk`.
     */
    public const GENERATED_SLUG_PATTERN = '/^(\d{4}-\d{2}-\d{2})-([0-9a-z]{'.OccurrenceCodeGenerator::LENGTH.'})$/';

    /**
     * The start the event's schedule originally produced for this occurrence.
     * It never changes, even when the occurrence itself is moved.
     */
    public Carbon $recurrenceId;

    /**
     * Short code that identifies this occurrence across the whole install.
     */
    public string $code;

    public Carbon $startDate;
    public Carbon $startDateLocalized;
    public Carbon $endDate;
    public Carbon $endDateLocalized;
    public bool $allDay = false;
    public bool $cancelled = false;

    public Event $event;
    public CalendarModel $calendar;

    /**
     * What this occurrence changes compared to its event, if anything.
     */
    public ?OccurrenceOverride $override = null;

    public \DateTime $dateCreated;
    public \DateTime $dateUpdated;
    public string $uid;

    private ?OccurrenceContent $content = null;

    public function getId(): string
    {
        return $this->getOccurrenceKey();
    }

    public function getOccurrenceKey(): string
    {
        return $this->event->id.'-'.$this->recurrenceId->format('YmdHis');
    }

    /**
     * The occurrence's title and field values, with its own values where it overrides the event's.
     */
    public function getContent(): OccurrenceContent
    {
        return $this->content ??= new OccurrenceContent($this->event, $this->override);
    }

    public function getOverride(): ?OccurrenceOverride
    {
        return $this->override;
    }

    /**
     * Whether the occurrence has its own times or content, or is cancelled.
     * A custom slug on its own doesn't count.
     */
    public function getIsEdited(): bool
    {
        if ($this->cancelled) {
            return true;
        }

        return null !== $this->override
            && ($this->override->hasOwnTimes() || [] !== $this->override->getOverriddenFieldHandles());
    }

    public function isMultiDay(): bool
    {
        return DateHelper::isMultiDay($this->startDate, $this->endDate, Calendar::getInstance()->settings->getOverlapThreshold());
    }

    /**
     * How long the occurrence lasts. Like an event's, an all-day duration counts whole days.
     */
    public function getDuration(): EventDuration
    {
        return new EventDuration($this->startDate->diff($this->allDay ? $this->endDate->copy()->addSecond() : $this->endDate));
    }

    /**
     * URL-friendly name. Editors can set one per site; otherwise it's the date
     * the occurrence takes place on, followed by its code.
     */
    public function getSlug(): string
    {
        if ($this->override?->hasCustomSlug()) {
            return $this->override->slug;
        }

        return $this->startDate->format('Y-m-d').'-'.$this->code;
    }
}
