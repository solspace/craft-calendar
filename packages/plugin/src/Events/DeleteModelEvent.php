<?php

namespace Solspace\Calendar\Events;

use craft\base\Model;
use craft\events\CancelableEvent;

class DeleteModelEvent extends CancelableEvent
{
    private ?Model $model = null;

    /**
     * DeleteModelEvent constructor.
     */
    public function __construct(Model $model)
    {
        $this->model = $model;

        parent::__construct();
    }

    public function getModel(): Model
    {
        return $this->model;
    }
}
