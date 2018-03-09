<?php

namespace Solspace\Calendar\Events;

use craft\base\Model;
use craft\events\CancelableEvent;

class SaveModelEvent extends CancelableEvent
{
    /** @var Model */
    private $model;

    /** @var bool */
    private $isNew;

    /**
     * BeforeSaveModelEvent constructor.
     *
     * @param Model $model
     * @param bool  $isNew
     */
    public function __construct(Model $model, bool $isNew)
    {
        $this->model = $model;
        $this->isNew = $isNew;

        parent::__construct();
    }

    /**
     * @return Model
     */
    public function getModel(): Model
    {
        return $this->model;
    }

    /**
     * @return bool
     */
    public function isNew(): bool
    {
        return $this->isNew;
    }
}
