<?php

namespace Solspace\Calendar\Transformers;

use Solspace\Calendar\Models\OccurrenceModel;
use Solspace\Calendar\Records\OccurrenceRecord;

class FullCalTransformer
{
    public function fromRecord(OccurrenceRecord $record): array
    {
        return [
            'id' => $record->id,
            'startDate' => $record->startUtc,
        ];
    }

    public function fromModel(OccurrenceModel $model): array
    {
        return [
            'id' => $model->getOccurrenceKey(),
            //'groupId' => $model->event->id,

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

            'editable' => true,
            'rrule' => $model->event->getRRuleRFCString(),
        ];
    }

    public function fromArray(array $data): array
    {
        return $data;
    }
}
