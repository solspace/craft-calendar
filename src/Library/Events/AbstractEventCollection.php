<?php

namespace Solspace\Calendar\Library\Events;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Duration\AbstractDuration;

/**
 * Class AbstractEventCollection
 * Provides iterable interface for a specific variable
 * Which has to be overridden on object instantiation
 */
abstract class AbstractEventCollection implements EventCollectionInterface, \Iterator
{
    /** @var bool */
    protected $eventsBuilt;

    /** @var Event[] */
    protected $cachedEvents;

    /** @var array */
    private $iterableObject;

    /** @var Event[] */
    protected $events;

    /** @var EventQuery */
    private $eventQuery;

    /** @var Carbon */
    private $startDate;

    /** @var Carbon */
    private $endDate;

    /** @var AbstractDuration */
    private $duration;

    /**
     * AbstractEventCollection constructor.
     * Sets start and end dates from $duration
     * And builds the iterable object and populates the event list
     *
     * @param AbstractDuration $duration
     * @param EventQuery       $eventQuery
     */
    final public function __construct(AbstractDuration $duration, EventQuery $eventQuery)
    {
        $this->duration   = $duration;
        $this->startDate  = $duration->getStartDate();
        $this->endDate    = $duration->getEndDate();
        $this->eventQuery = $eventQuery;

        $this->iterableObject = $this->buildIterableObject($eventQuery);
    }

    /**
     * Returns the start date of the event collection
     * For EventMonth this date would be the instantiated date's first day
     * not the actual first day which might be in the previous month
     *
     * @return Carbon
     */
    final public function getDate(): Carbon
    {
        return $this->duration->getStartDate()->copy();
    }

    /**
     * @return Carbon
     */
    final public function getStartDate(): Carbon
    {
        return $this->startDate->copy();
    }

    /**
     * @return Carbon
     */
    final public function getEndDate(): Carbon
    {
        return $this->endDate->copy();
    }

    /**
     * Returns a Carbon object with the duration interval set backwards by 1 iteration
     *
     * @return Carbon
     */
    final public function getPreviousDate(): Carbon
    {
        return $this->getDate()->copy()->sub($this->getInterval());
    }

    /**
     * Returns a Carbon object with the duration interval set forward by 1 iteration
     *
     * @return Carbon
     */
    final public function getNextDate(): Carbon
    {
        return $this->getDate()->copy()->add($this->getInterval());
    }

    /**
     * Returns a list of dates
     * The dates begin $before intervals from self::$date
     * And end $after intervals after self::$date
     * self::$date is included
     *
     * @param int $before
     * @param int $after
     *
     * @return Carbon[]
     */
    final public function getDateRange(int $before = 1, int $after = 1): array
    {
        $before = abs($before);
        $after  = abs($after);

        $date           = $this->getDate();
        $intervalBefore = $date->diff($this->getPreviousDate());
        $intervalAfter  = $date->diff($this->getNextDate());

        $rangeList  = [];
        $dateBefore = $date->copy();
        for ($i = 1; $i <= $before; $i++) {
            $rangeList[] = $dateBefore->add($intervalBefore)->copy();
        }
        $rangeList = array_reverse($rangeList);

        $rangeList[] = $date;

        $dateAfter = $date->copy();
        for ($i = 1; $i <= $after; $i++) {
            $rangeList[] = $dateAfter->add($intervalAfter)->copy();
        }

        return $rangeList;
    }

    /**
     * @return Event[]
     */
    final public function getEvents(): array
    {
        if (null === $this->cachedEvents) {
            $this->cachedEvents = $this->buildEventCache();
        }

        return $this->cachedEvents;
    }

    /**
     * @return int
     */
    final public function getEventCount(): int
    {
        return \count($this->getEvents());
    }

    /**
     * Checks if the given $date is contained in this object
     *
     * @param Carbon $date
     *
     * @return bool
     */
    public function containsDate(Carbon $date): bool
    {
        return $this->duration->containsDate($date);
    }

    /**
     * @return EventQuery
     */
    protected function getEventQuery(): EventQuery
    {
        return $this->eventQuery;
    }

    /**
     * @return AbstractDuration
     */
    protected function getDuration(): AbstractDuration
    {
        return $this->duration;
    }

    /**
     * Get an event list for caching
     *
     * @return Event[]
     */
    abstract protected function buildEventCache(): array;

    /**
     * Gets the interval of this object
     *
     * @return CarbonInterval
     */
    abstract protected function getInterval(): CarbonInterval;

    /**
     * Builds an iterable object
     *
     * @param EventQuery $eventQuery
     *
     * @return array
     */
    abstract protected function buildIterableObject(EventQuery $eventQuery): array;

    /**
     * Return the current element
     *
     * @link  http://php.net/manual/en/iterator.current.php
     * @return mixed Can return any type.
     * @since 5.0.0
     */
    public function current()
    {
        return current($this->iterableObject);
    }

    /**
     * Move forward to next element
     *
     * @link  http://php.net/manual/en/iterator.next.php
     * @return void Any returned value is ignored.
     * @since 5.0.0
     */
    public function next()
    {
        next($this->iterableObject);
    }

    /**
     * Return the key of the current element
     *
     * @link  http://php.net/manual/en/iterator.key.php
     * @return mixed scalar on success, or null on failure.
     * @since 5.0.0
     */
    public function key()
    {
        return key($this->iterableObject);
    }

    /**
     * Checks if current position is valid
     *
     * @link  http://php.net/manual/en/iterator.valid.php
     * @return boolean The return value will be casted to boolean and then evaluated.
     *        Returns true on success or false on failure.
     * @since 5.0.0
     */
    public function valid(): bool
    {
        return null !== $this->key() && $this->key() !== false;
    }

    /**
     * Rewind the Iterator to the first element
     *
     * @link  http://php.net/manual/en/iterator.rewind.php
     * @return void Any returned value is ignored.
     * @since 5.0.0
     */
    public function rewind()
    {
        reset($this->iterableObject);
    }
}
