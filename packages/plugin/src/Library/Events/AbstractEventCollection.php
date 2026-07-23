<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceList;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Duration\AbstractDuration;
use Solspace\Calendar\Models\OccurrenceModel;

/**
 * Class AbstractEventCollection
 * Provides iterable interface for a specific variable
 * Which has to be overridden on object instantiation.
 */
abstract class AbstractEventCollection implements EventCollectionInterface, \Iterator
{
    protected OccurrenceList $occurrences;
    protected ?OccurrenceList $allDayOccurrences = null;
    protected ?OccurrenceList $timedOccurrences = null;

    private array $iterableObject;
    private Carbon $start;
    private Carbon $end;
    private AbstractDuration $duration;

    public function __construct(AbstractDuration $duration, OccurrenceList $occurrences)
    {
        $this->duration = $duration;
        $this->start = $duration->getStart();
        $this->end = $duration->getEnd();
        $this->occurrences = $occurrences;

        $this->iterableObject = $this->buildIterableObject();
    }

    /**
     * Returns the start date of the event collection
     * For EventMonth this date would be the instantiated date's first day
     * not the actual first day which might be in the previous month.
     */
    public function getDate(): Carbon
    {
        return $this->duration->getStart()->copy();
    }

    public function getDateLocalized(): Carbon
    {
        return $this->duration->getStartLocalized()->copy();
    }

    public function getStart(): Carbon
    {
        return $this->start->copy();
    }

    /**
     * Alias for ::getStart().
     */
    public function getStartDate(): Carbon
    {
        return $this->getStart();
    }

    public function getEnd(): Carbon
    {
        return $this->end->copy();
    }

    /**
     * Alias for ::getEnd().
     */
    public function getEndDate(): Carbon
    {
        return $this->getEnd();
    }

    /**
     * Returns a Carbon object with the duration interval set backwards by 1 iteration.
     */
    public function getPreviousDate(): Carbon
    {
        return $this->getDate()->copy()->sub($this->getInterval());
    }

    public function getPreviousDateLocalized(): Carbon
    {
        return $this->getDateLocalized()->copy()->sub($this->getInterval());
    }

    /**
     * Returns a Carbon object with the duration interval set forward by 1 iteration.
     */
    public function getNextDate(): Carbon
    {
        return $this->getDate()->copy()->add($this->getInterval());
    }

    public function getNextDateLocalized(): Carbon
    {
        return $this->getDateLocalized()->copy()->add($this->getInterval());
    }

    /**
     * Returns a list of dates
     * The dates begin $before intervals from self::$date
     * And end $after intervals after self::$date
     * self::$date is included.
     *
     * @return Carbon[]
     */
    public function getDateRange(int $before = 1, int $after = 1): array
    {
        $before = abs($before);
        $after = abs($after);

        $date = $this->getDate();
        $intervalBefore = $date->diff($this->getPreviousDate());
        $intervalAfter = $date->diff($this->getNextDate());

        $rangeList = [];
        $dateBefore = $date->copy();
        for ($i = 1; $i <= $before; ++$i) {
            $rangeList[] = $dateBefore->add($intervalBefore)->copy();
        }
        $rangeList = array_reverse($rangeList);

        $rangeList[] = $date;

        $dateAfter = $date->copy();
        for ($i = 1; $i <= $after; ++$i) {
            $rangeList[] = $dateAfter->add($intervalAfter)->copy();
        }

        return $rangeList;
    }

    public function getOccurrences(): OccurrenceList
    {
        return $this->occurrences;
    }

    public function getOccurrenceCount(): int
    {
        return \count($this->getOccurrences());
    }

    public function getAllDayOccurrences(): OccurrenceList
    {
        if (null === $this->allDayOccurrences) {
            $this->allDayOccurrences = $this->occurrences->filter(static fn (OccurrenceModel $occurrence) => $occurrence->event->isAllDay());
        }

        return $this->allDayOccurrences;
    }

    public function getAllDayOccurrenceCount(): int
    {
        return \count($this->getAllDayOccurrences());
    }

    public function getTimedOccurrences(): OccurrenceList
    {
        if (null === $this->timedOccurrences) {
            $this->timedOccurrences = $this->occurrences->filter(static fn (OccurrenceModel $occurrence) => !$occurrence->event->isAllDay());
        }

        return $this->timedOccurrences;
    }

    public function getTimedOccurrenceCount(): int
    {
        return \count($this->getTimedOccurrences());
    }

    public function containsDate(Carbon $date): bool
    {
        return $this->duration->containsDate($date);
    }

    /**
     * Return the current element.
     *
     * @see   http://php.net/manual/en/iterator.current.php
     *
     * @return mixed can return any type
     *
     * @since 5.0.0
     */
    public function current(): mixed
    {
        return current($this->iterableObject);
    }

    /**
     * Move forward to next element.
     *
     * @see   http://php.net/manual/en/iterator.next.php
     * @since 5.0.0
     */
    public function next(): void
    {
        next($this->iterableObject);
    }

    /**
     * Return the key of the current element.
     *
     * @see   http://php.net/manual/en/iterator.key.php
     *
     * @return null|int|string scalar on success, or null on failure
     *
     * @since 5.0.0
     */
    public function key(): int|string|null
    {
        return key($this->iterableObject);
    }

    /**
     * Checks if current position is valid.
     *
     * @see   http://php.net/manual/en/iterator.valid.php
     *
     * @return bool The return value will be casted to boolean and then evaluated.
     *              Returns true on success or false on failure.
     *
     * @since 5.0.0
     */
    public function valid(): bool
    {
        return null !== $this->key() && false !== $this->key();
    }

    /**
     * Rewind the Iterator to the first element.
     *
     * @see   http://php.net/manual/en/iterator.rewind.php
     * @since 5.0.0
     */
    public function rewind(): void
    {
        reset($this->iterableObject);
    }

    protected function getDuration(): AbstractDuration
    {
        return $this->duration;
    }

    /**
     * Gets the interval of this object.
     */
    abstract protected function getInterval(): CarbonInterval;

    /**
     * Builds an iterable object.
     */
    abstract protected function buildIterableObject(): array;
}
