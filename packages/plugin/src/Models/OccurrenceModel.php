<?php

namespace Solspace\Calendar\Models;

use Carbon\Carbon;
use craft\base\Model;
use Solspace\Calendar\Elements\Event;

class OccurrenceModel extends Model
{
    public Carbon $startDate;
    public Carbon $startDateLocalized;
    public Carbon $endDate;
    public Carbon $endDateLocalized;
    public bool $allDay = false;

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
        return $this->event->id.'-'.$this->startDate->format('YmdHis');
    }
}
