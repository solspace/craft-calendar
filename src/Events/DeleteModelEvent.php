<?php

namespace Solspace\Calendar\Events;

use craft\base\Model;
use craft\events\CancelableEvent;

class DeleteModelEvent extends CancelableEvent
{
    /** @var Model */
    private $model;

    /**
     * DeleteModelEvent constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;

        parent::__construct();
    }

    /**
     * @return Model
     */
    public function getModel(): Model
    {
        return $this->model;
    }
}
