<?php

namespace Solspace\Calendar\Events;

use yii\base\Event;

class JsonValueTransformerEvent extends Event
{
    private ?string $key = null;

    private mixed $value = null;

    public function __construct(string $key, mixed $value)
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

    public function getValue(): mixed
    {
        return $this->value;
    }
}
