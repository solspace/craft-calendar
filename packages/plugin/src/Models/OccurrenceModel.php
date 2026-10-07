<?php

namespace Solspace\Calendar\Models;

use Carbon\Carbon;
use craft\base\Model;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceCodeGenerator;
use Solspace\Calendar\Elements\Event;

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

    public \DateTime $dateCreated;
    public \DateTime $dateUpdated;
    public string $uid;

    public function getId(): string
    {
        return $this->getOccurrenceKey();
    }

    public function getOccurrenceKey(): string
    {
        return $this->event->id.'-'.$this->recurrenceId->format('YmdHis');
    }

    /**
     * URL-friendly name: the date the occurrence takes place on, followed by its code.
     */
    public function getSlug(): string
    {
        return $this->startDate->format('Y-m-d').'-'.$this->code;
    }
}
