<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use Solspace\Calendar\Library\Collections\ArrayLikeTrait;
use Solspace\Calendar\Models\OccurrenceModel;

/**
 * @implements \ArrayAccess<int, OccurrenceModel>
 * @implements \IteratorAggregate<int, OccurrenceModel>
 */
class OccurrenceList implements \ArrayAccess, \IteratorAggregate, \Countable
{
    use ArrayLikeTrait;

    public function __construct(private array $occurrences = []) {}

    /**
     * @return OccurrenceModel[]
     */
    public function getOccurrences(): array
    {
        return $this->occurrences;
    }

    public function addOccurrence(OccurrenceModel $occurrence): self
    {
        $this->occurrences[] = $occurrence;

        return $this;
    }

    public function filter(callable $callback): self
    {
        $filtered = array_filter($this->occurrences, $callback);

        return new self($filtered);
    }

    public function filterRange(Carbon $start, Carbon $end, bool $includeOverlappingEvents = true): self
    {
        $filtered = array_filter(
            $this->occurrences,
            static function (OccurrenceModel $occurrence) use ($start, $end, $includeOverlappingEvents) {
                $startDate = $occurrence->startDate;
                $endDate = $occurrence->endDate;

                if ($includeOverlappingEvents) {
                    return $startDate->lt($end) && $endDate->gt($start);
                }

                return $startDate->lt($end) && $endDate->gt($start)
                    && $startDate->gt($start) && $endDate->lt($end);
            }
        );

        return new self($filtered);
    }

    protected function getArrayLikeItems(): array
    {
        return $this->occurrences;
    }

    protected function setArrayLikeItems(array $items): void
    {
        $this->occurrences = $items;
    }

    protected function assertArrayLikeValue(mixed $value): void
    {
        if (!$value instanceof OccurrenceModel) {
            throw new \InvalidArgumentException('OccurrenceList values must be instances of OccurrenceModel');
        }
    }
}
