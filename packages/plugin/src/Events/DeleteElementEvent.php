<?php

namespace Solspace\Calendar\Events;

use craft\base\ElementInterface;
use craft\events\CancelableEvent;

class DeleteElementEvent extends CancelableEvent
{
    /** @var ElementInterface */
    private $element;

    /**
     * DeleteModelEvent constructor.
     */
    public function __construct(ElementInterface $element)
    {
        $this->element = $element;

        parent::__construct();
    }

    public function getElement(): ElementInterface
    {
        return $this->element;
    }
}
