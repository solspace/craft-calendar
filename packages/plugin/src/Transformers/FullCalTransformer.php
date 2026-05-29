<?php

namespace Solspace\Calendar\Transformers;

use Solspace\Calendar\Bundles\Occurrences\OccurrenceList;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\OccurrenceModel;

class FullCalTransformer
{
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

            'start' => $element->startDate,
            'end' => $element->endDate,
            'allDay' => $element->allDay,
            'multiDay' => $element->isMultiDay(),
            'repeats' => $element->isRepeating(),

            'calendar' => $calendar->id,
            'backgroundColor' => $calendar->color,
            'borderColor' => $calendar->getDarkerColor(),
            'textColor' => $calendar->getContrastColor(),

            'editable' => Calendar::getInstance()->settings->allowEventsToBeModifiedByDragAndDrop(),
            'rrule' => $element->getRRuleRFCString(),
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

            'title' => $model->event->title,
            'slug' => $model->event->slug,
            'url' => $model->event->getCpEditUrl(),

            'start' => $model->startDate,
            'end' => $model->endDate,
            'allDay' => $model->allDay,
            'multiDay' => $model->event->isMultiDay(),
            'repeats' => $model->event->isRepeating(),

            'calendar' => $model->calendar->id,
            'backgroundColor' => $model->calendar->color,
            'borderColor' => $model->calendar->getDarkerColor(),
            'textColor' => $model->calendar->getContrastColor(),

            'editable' => Calendar::getInstance()->settings->allowEventsToBeModifiedByDragAndDrop(),
            'rrule' => $model->event->getRRuleRFCString(),
        ];
    }

    public function fromArray(array $data): array
    {
        return $data;
    }
}
