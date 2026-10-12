<?php

namespace Solspace\Calendar\Library\Attributes;

class CalendarAttributes extends AbstractAttributes
{
    protected ?array $validAttributes = [
        'id',
        'type',
        'name',
        'handle',
        'color',
        'titleTranslationMethod',
        'titleTranslationKeyFormat',
    ];
}
