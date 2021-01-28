<?php

namespace Solspace\Calendar\Events;

use craft\base\Element;
use craft\events\CancelableEvent;

class SaveElementEvent extends CancelableEvent
{
    /** @var Element */
    private $element;

    /** @var bool */
    private $new;

    /**
     * SaveElementEvent constructor.
     */
    public function __construct(Element $element, bool $new = false)
    {
        $this->element = $element;
        $this->new = $new;

        parent::__construct();
    }

    public function getElement(): Element
    {
        return $this->element;
    }

    public function isNew(): bool
    {
        return $this->new;
    }
}
