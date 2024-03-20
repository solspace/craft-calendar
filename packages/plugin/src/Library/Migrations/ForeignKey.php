<?php

namespace Solspace\Calendar\Library\Migrations;

use Solspace\Calendar\Library\Exceptions\DatabaseException;

class ForeignKey
{
    public const CASCADE = 'CASCADE';
    public const UPDATE = 'UPDATE';
    public const RESTRICT = 'RESTRICT';
    public const SET_NULL = 'SET NULL';
    public const SET_DEFAULT = 'SET DEFAULT';

    private static array $handlers = [
        self::CASCADE,
        self::UPDATE,
        self::RESTRICT,
        self::SET_NULL,
        self::SET_DEFAULT,
    ];

    private ?Table $table = null;

    private ?string $column = null;

    private ?string $referenceTable = null;

    private ?string $referenceColumn = null;

    private ?string $onDelete = null;

    private ?string $onUpdate = null;

    public function __construct(
        Table $table,
        string $column,
        string $referenceTable,
        string $referenceColumn,
        ?string $onDelete = null,
        ?string $onUpdate = null
    ) {
        $this->table = $table;
        $this->column = $column;
        $this->referenceTable = $referenceTable;
        $this->referenceColumn = $referenceColumn;
        $this->onDelete = self::getHandler($onDelete);
        $this->onUpdate = self::getHandler($onUpdate);
    }

    public function __toString(): string
    {
        return $this->getName();
    }

    public function getName(): string
    {
        return $this->table.'_'.$this->column.'_fk';
    }

    public function getColumn(): string
    {
        return $this->column;
    }

    public function getReferenceTable(): string
    {
        return $this->referenceTable;
    }

    public function getDatabaseReferenceTableName(): string
    {
        return '{{%'.$this->referenceTable.'}}';
    }

    public function getReferenceColumn(): string
    {
        return $this->referenceColumn;
    }

    public function getOnDelete(): ?string
    {
        return $this->onDelete;
    }

    public function getOnUpdate(): ?string
    {
        return $this->onUpdate;
    }

    private static function getHandler(?string $handler = null): ?string
    {
        if (null === $handler) {
            return null;
        }

        if (!\in_array($handler, self::$handlers, true)) {
            $message = sprintf(
                'Cannot set "%s" as onDelete or onUpdate. Use one of these instead: "%s"',
                $handler,
                implode('", "', self::$handlers)
            );

            throw new DatabaseException($message);
        }

        return $handler;
    }
}
