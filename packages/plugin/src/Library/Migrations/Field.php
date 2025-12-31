<?php

namespace Solspace\Calendar\Library\Migrations;

use yii\db\ColumnSchemaBuilder;

class Field implements \Stringable
{
    public function __construct(
        private string $name,
        private ColumnSchemaBuilder $definition
    ) {}

    public function __toString(): string
    {
        return $this->getName();
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDefinition(): ColumnSchemaBuilder
    {
        return $this->definition;
    }
}
