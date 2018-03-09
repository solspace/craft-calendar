<?php

namespace Solspace\Calendar\Library\Migrations;

class Index
{
    /** @var Table */
    private $table;

    /** @var array */
    private $columns;

    /** @var bool */
    private $unique;

    /**
     * Index constructor.
     *
     * @param Table $table
     * @param array $columns
     * @param bool  $unique
     */
    public function __construct(Table $table, array $columns, bool $unique = false)
    {
        $this->table   = $table;
        $this->columns = $columns;
        $this->unique  = $unique;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return implode('_', $this->columns) . ($this->unique ? '_unq' : '') . '_idx';
    }

    /**
     * @return array
     */
    public function getColumns(): array
    {
        return $this->columns;
    }

    /**
     * @return bool
     */
    public function isUnique(): bool
    {
        return $this->unique;
    }
}
