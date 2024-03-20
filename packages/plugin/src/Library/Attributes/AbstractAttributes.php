<?php

namespace Solspace\Calendar\Library\Attributes;

use craft\db\Query;
use Solspace\Calendar\Library\Exceptions\AttributeException;
use Solspace\Calendar\Library\Helpers\DatabaseHelper;

abstract class AbstractAttributes
{
    public const SORT_ASC = 'ASC';
    public const SORT_DESC = 'DESC';

    protected ?array $validAttributes = null;

    private ?Query $query = null;

    private ?string $order = null;

    private ?string $sort = null;

    private ?int $limit = null;

    private ?array $attributes = null;

    private ?array $conditions = null;

    /**
     * @throws AttributeException
     */
    final public function __construct(Query $query, ?array $attributes = null)
    {
        // A list of valid attributes must be present in the child class
        // If none are provided - an exception is thrown
        if (null === $this->validAttributes) {
            throw new AttributeException('No valid attributes defined for '.__CLASS__);
        }

        $this->query = $query;
        $this->attributes = [];
        $this->conditions = [];
        $this->setSort(self::SORT_ASC);
        $this->parseAttributes($attributes);
        $this->buildConditions();
    }

    public function getQuery(): Query
    {
        $query = $this->query;

        foreach ($this->attributes as $name => $value) {
            [$operator, $value] = DatabaseHelper::prepareOperator($value);

            $query->andWhere([$operator, $name, $value]);
        }

        if ($this->order) {
            $query->orderBy([$this->order => $this->sort]);
        }

        if ($this->limit) {
            $query->limit($this->limit);
        }

        return $query;
    }

    private function setOrder(string $value): void
    {
        $this->order = $value;
    }

    private function setLimit(int $value): void
    {
        $this->limit = $value;
    }

    private function setSort(string $value): void
    {
        $this->sort = self::SORT_ASC === strtoupper($value) ? \SORT_ASC : \SORT_DESC;
    }

    /**
     * Parses all attributes, if any of the passed attributes does not exist in self::$validAttributes
     * An exception is thrown.
     *
     * @throws AttributeException
     */
    private function parseAttributes(?array $attributes = null): void
    {
        if (empty($attributes)) {
            return;
        }

        foreach ($attributes as $attribute => $value) {
            if (null === $value) {
                unset($attributes[$attribute]);

                continue;
            }

            if (\in_array($attribute, ['order', 'orderBy', 'limit', 'sort'], true)) {
                switch ($attribute) {
                    case 'order':
                    case 'orderBy':
                        $this->setOrder($value);

                        break;

                    case 'limit':
                        $this->setLimit($value);

                        break;

                    case 'sort':
                        $this->setSort($value);

                        break;
                }

                unset($attributes[$attribute]);

                continue;
            }

            if (!\in_array($attribute, $this->validAttributes, true)) {
                throw new AttributeException(
                    sprintf(
                        'Attribute "%s" is not allowed. Allowed attributes are: "%s"',
                        $attribute,
                        implode('", "', $this->validAttributes)
                    )
                );
            }
        }

        $this->attributes = $attributes;
    }

    /**
     * Builds the conditions array.
     */
    private function buildConditions(): void
    {
        $conditions = [];

        if (null !== $this->order) {
            if (\in_array($this->order, $this->validAttributes, true)) {
                $conditions['order'] = $this->order;
                $conditions['order'] .= ' '.$this->sort;
            } else {
                throw new AttributeException(
                    sprintf(
                        'Cannot order by "%s". Allowed order fields are: "%s"',
                        $this->order,
                        implode('", "', $this->validAttributes)
                    )
                );
            }
        }

        if (null !== $this->limit) {
            $conditions['limit'] = $this->limit;
        }

        $this->conditions = $conditions;
    }
}
