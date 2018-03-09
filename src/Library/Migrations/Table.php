<?php

namespace Solspace\Calendar\Library\Migrations;

use yii\db\ColumnSchemaBuilder;

class Table
{
    /** @var string */
    private $name;

    /** @var array */
    private $fields;

    /** @var ForeignKey[] */
    private $foreignKeys;

    /** @var Index[] */
    private $indexes;

    /**
     * Table constructor.
     *
     * @param string $name
     */
    public function __construct(string $name)
    {
        $this->name        = $name;
        $this->fields      = [];
        $this->foreignKeys = [];
        $this->indexes     = [];
    }

    /**
     * @return string
     */
    public function __toString(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return array
     */
    public function getFields(): array
    {
        return $this->fields;
    }

    /**
     * @return ForeignKey[]
     */
    public function getForeignKeys(): array
    {
        return $this->foreignKeys;
    }

    /**
     * @return Index[]
     */
    public function getIndexes(): array
    {
        return $this->indexes;
    }

    /**
     * @param string              $name
     * @param ColumnSchemaBuilder $type
     *
     * @return Table
     */
    public function addField(string $name, ColumnSchemaBuilder $type): Table
    {
        $this->fields[$name] = $type;

        return $this;
    }

    /**
     * @param array $columns
     * @param bool  $unique
     *
     * @return $this
     */
    public function addIndex(array $columns, bool $unique = false): Table
    {
        $this->indexes[] = new Index($this, $columns, $unique);

        return $this;
    }

    /**
     * @param string      $column
     * @param string      $refTable
     * @param string      $refColumn
     * @param string|null $onDelete
     * @param string|null $onUpdate
     *
     * @return Table
     */
    public function addForeignKey(
        string $column,
        string $refTable,
        string $refColumn,
        string $onDelete = null,
        string $onUpdate = null
    ): Table {
        $this->foreignKeys[] = new ForeignKey(
            $this,
            $column,
            $refTable,
            $refColumn,
            $onDelete,
            $onUpdate
        );

        return $this;
    }
}
