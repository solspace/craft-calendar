<?php

namespace Solspace\Calendar\Transformers;

use Carbon\Carbon;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceList;
use Solspace\Calendar\Bundles\Occurrences\RecurrenceId;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Models\OccurrenceModel;

class FullCalTransformer
{
    private array $readableRepeatRules = [];

    public function fromElement(Event $element): array
    {
        $id = $element->id.'-'.$element->startDate->format('YmdHis');
        $calendar = $element->getCalendar();

        return [
            'id' => $id,
            // 'groupId' => $model->event->id,

            'title' => $element->title,
            'slug' => $element->slug,
            'url' => $element->getCpEditUrl(),

            'start' => $this->formatFloatingDate($element->startDate, (bool) $element->allDay),
            'end' => $this->formatFloatingEnd($element->endDate, (bool) $element->allDay),
            'allDay' => $element->allDay,
            'multiDay' => $element->isMultiDay(),
            'repeats' => $element->isRepeating(),

            'calendar' => $calendar->id,
            'calendarName' => $calendar->name,
            'calendarColor' => $calendar->color,
            'backgroundColor' => $calendar->color,
            'borderColor' => $calendar->getDarkerColor(),
            'textColor' => $calendar->getContrastColor(),

            'editable' => Calendar::getInstance()->settings->isDragAndDropEnabled(),
            'rrule' => $element->getRRuleRFCString(),
            'readableRepeatRule' => $this->getReadableRepeatRule($element),
        ];
    }

    public function fromList(array|OccurrenceList $list): array
    {
        if ($list instanceof OccurrenceList) {
            $list = $list->getOccurrences();
        }

        return array_map(
            [$this, 'fromModel'],
            $list,
        );
    }

    public function fromModel(OccurrenceModel $model): array
    {
        return [
            'id' => $model->getOccurrenceKey(),
            // 'groupId' => $model->event->id,

            'title' => $model->getContent()->getTitle(),
            'slug' => $model->event->slug,
            'occurrenceSlug' => $model->getSlug(),
            'recurrenceId' => $model->recurrenceId->format(RecurrenceId::FORMAT),
            'url' => $model->event->getCpEditUrl(),

            'start' => $this->formatFloatingDate($model->startDate, $model->allDay),
            'end' => $this->formatFloatingEnd($model->endDate, $model->allDay),
            'allDay' => $model->allDay,
            'multiDay' => $model->isMultiDay(),
            'repeats' => $model->event->isRepeating(),
            'cancelled' => $model->cancelled,
            'isEdited' => $model->getIsEdited(),
            'hasOverride' => null !== $model->override,

            'calendar' => $model->calendar->id,
            'calendarName' => $model->calendar->name,
            'calendarColor' => $model->calendar->color,
            'backgroundColor' => $model->calendar->color,
            'borderColor' => $model->calendar->getDarkerColor(),
            'textColor' => $model->calendar->getContrastColor(),

            'editable' => Calendar::getInstance()->settings->isDragAndDropEnabled(),
            'rrule' => $model->event->getRRuleRFCString(),
            'readableRepeatRule' => $this->getReadableRepeatRule($model->event),
        ];
    }

    public function fromArray(array $data): array
    {
        return $data;
    }

    private function getReadableRepeatRule(Event $event): ?string
    {
        if (!\array_key_exists($event->id, $this->readableRepeatRules)) {
            $this->readableRepeatRules[$event->id] = $event->getReadableRepeatRule();
        }

        return $this->readableRepeatRules[$event->id];
    }

    private function formatFloatingDate(Carbon $date, bool $allDay): string
    {
        return $date->format($allDay ? 'Y-m-d' : 'Y-m-d\TH:i:s');
    }

    /**
     * All-day events are stored ending on their last day, but FullCalendar's all-day end is the day after.
     */
    private function formatFloatingEnd(Carbon $date, bool $allDay): string
    {
        return $allDay ? DateHelper::allDayExclusiveEnd($date)->format('Y-m-d') : $this->formatFloatingDate($date, false);
    }
}
