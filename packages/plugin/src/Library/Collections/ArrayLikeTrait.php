<?php

namespace Solspace\Calendar\Library\Collections;

/**
 * @template TValue
 */
trait ArrayLikeTrait
{
    public function offsetExists(mixed $offset): bool
    {
        $items = $this->getArrayLikeItems();

        return isset($items[$offset]);
    }

    /**
     * @return null|TValue
     */
    public function offsetGet(mixed $offset): mixed
    {
        $items = $this->getArrayLikeItems();

        return $items[$offset] ?? null;
    }

    public function offsetSet(mixed $offset, mixed $value): void
    {
        $this->assertArrayLikeValue($value);

        $items = $this->getArrayLikeItems();

        if (null === $offset) {
            $items[] = $value;
        } else {
            $items[$offset] = $value;
        }

        $this->setArrayLikeItems($items);
    }

    public function offsetUnset(mixed $offset): void
    {
        $items = $this->getArrayLikeItems();

        unset($items[$offset]);

        $this->setArrayLikeItems($items);
    }

    public function getIterator(): \Traversable
    {
        return new \ArrayIterator($this->getArrayLikeItems());
    }

    public function count(): int
    {
        return \count($this->getArrayLikeItems());
    }

    /**
     * @return array<array-key, TValue>
     */
    abstract protected function getArrayLikeItems(): array;

    /**
     * @param array<array-key, TValue> $items
     */
    abstract protected function setArrayLikeItems(array $items): void;

    protected function assertArrayLikeValue(mixed $value): void {}
}
