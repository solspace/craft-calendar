<?php

namespace Solspace\Calendar\Library\Migrations;

class ForeignKey
{
    const CASCADE  = 'CASCADE';
    const SET_NULL = 'SET NULL';

    /** @var Table */
    private $table;

    /** @var string */
    private $column;

    /** @var string */
    private $refTable;

    /** @var string */
    private $refColumn;

    /** @var string */
    private $onDelete;

    /** @var string */
    private $onUpdate;

    /**
     * ForeignKey constructor.
     *
     * @param Table       $table
     * @param string      $column
     * @param string      $refTable
     * @param string      $refColumn
     * @param string|null $onDelete
     * @param string|null $onUpdate
     */
    public function __construct(
        Table $table,
        string $column,
        string $refTable,
        string $refColumn,
        string $onDelete = null,
        string $onUpdate = null
    ) {
        $this->table     = $table;
        $this->column    = $column;
        $this->refTable  = $refTable;
        $this->refColumn = $refColumn;
        $this->onDelete  = $onDelete;
        $this->onUpdate  = $onUpdate;
    }

    /**
     * @return string
     */
    public function generateFullName(): string
    {
        return $this->table . '_' . $this->getName();
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->column . '_fk';
    }

    /**
     * @return Table
     */
    public function getTable(): Table
    {
        return $this->table;
    }

    /**
     * @return string
     */
    public function getColumn(): string
    {
        return $this->column;
    }

    /**
     * @return string
     */
    public function getRefTable(): string
    {
        return $this->refTable;
    }

    /**
     * @return string
     */
    public function getRefColumn(): string
    {
        return $this->refColumn;
    }

    /**
     * @return string|null
     */
    public function getOnDelete()
    {
        return $this->onDelete;
    }

    /**
     * @return string|null
     */
    public function getOnUpdate()
    {
        return $this->onUpdate;
    }
}
