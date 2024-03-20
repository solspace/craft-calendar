<?php

namespace Solspace\Calendar\Library\Migrations;

class PrimaryKey
{
    private ?array $columns = null;

    public function __construct(array $columns)
    {
        $this->columns = $columns;
    }

    public function __toString(): string
    {
        return implode('_', $this->columns).'_pk';
    }

    public function getColumns(): array
    {
        return $this->columns;
    }
}
