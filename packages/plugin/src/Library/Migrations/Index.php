<?php

namespace Solspace\Calendar\Library\Migrations;

class Index
{
    private ?array $columns = null;

    private ?bool $unique = null;

    private ?string $prefix = null;

    public function __construct(array $columns, bool $unique = false, ?string $prefix = null)
    {
        $this->columns = $columns;
        $this->unique = $unique;
        $this->prefix = $prefix;
    }

    public function getName(): string
    {
        return ($this->prefix ?? '').implode('_', $this->columns).($this->unique ? '_unq' : '').'_idx';
    }

    public function getColumns(): array
    {
        return $this->columns;
    }

    public function isUnique(): bool
    {
        return $this->unique;
    }
}
