<?php

namespace Solspace\Calendar;

class Calendar_EventFieldType extends BaseElementFieldType
{
    /** @var string $elementType */
    protected $elementType = 'Calendar_Event';

    /**
     * Returns the label for the "Add" button.
     *
     * @access protected
     * @return string
     */
    protected function getAddButtonLabel()
    {
        return Craft::t('Add an event');
    }
}
