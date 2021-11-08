<?php

namespace Solspace\Calendar\Events;

use yii\base\Event;

class JsonValueTransformerEvent extends Event
{
    /** @var string */
    private $key;

    private $value;

    public function __construct(string $key, $value)
    {
        $this->key = $key;
        $this->value = $value;

        parent::__construct([]);
    }

    public function getKey(): string
    {
        return $this->key;
    }

    public function setValue($value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getValue()
    {
        return $this->value;
    }
}
