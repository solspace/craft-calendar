<?php

namespace Solspace\Calendar\Library\DataObjects;

use Carbon\Carbon;
use Solspace\Calendar\Library\DateHelper;

class EventListOptions
{
    const SORT_ASC  = 'ASC';
    const SORT_DESC = 'DESC';

    /** @var Carbon */
    private $rangeStart;

    /** @var Carbon */
    private $rangeEnd;

    /** @var int */
    private $limit;

    /** @var int */
    private $offset;

    /** @var bool */
    private $loadOccurrences;

    /** @var int */
    private $overlapThreshold;

    /** @var string */
    private $order;

    /** @var bool */
    private $shuffle;

    /** @var string */
    private $sort;

    /** @var int */
    private $siteId;

    /** @var string */
    private $site;

    /**
     * EventListOptions constructor.
     */
    public function __construct()
    {
        $this->sort = self::SORT_ASC;
    }

    /**
     * @return Carbon|null
     */
    public function getRangeStart()
    {
        return $this->rangeStart;
    }

    /**
     * @param \DateTime|string $rangeStart
     *
     * @return $this
     */
    public function setRangeStart($rangeStart = null): EventListOptions
    {
        if ($rangeStart) {
            if ($rangeStart instanceof \DateTime) {
                $rangeStart = Carbon::createFromTimestampUTC($rangeStart->getTimestamp());
            } else {
                $rangeStart = new Carbon($rangeStart, DateHelper::UTC);
            }
        }

        $this->rangeStart = $rangeStart;

        return $this;
    }

    /**
     * @return Carbon|null
     */
    public function getRangeEnd()
    {
        return $this->rangeEnd;
    }

    /**
     * @param \DateTime|string $rangeEnd
     *
     * @return $this
     */
    public function setRangeEnd($rangeEnd = null): EventListOptions
    {
        if ($rangeEnd) {
            if ($rangeEnd instanceof \DateTime) {
                $rangeEnd = Carbon::createFromTimestampUTC($rangeEnd->getTimestamp());
            } else {
                $rangeEnd = new Carbon($rangeEnd, DateHelper::UTC);
            }
        }

        $this->rangeEnd = $rangeEnd;

        return $this;
    }

    /**
     * @return int|null
     */
    public function getLimit()
    {
        return $this->limit;
    }

    /**
     * @param int $limit
     *
     * @return $this
     */
    public function setLimit(int $limit = null): EventListOptions
    {
        $this->limit = $limit;

        return $this;
    }

    /**
     * @return int|null
     */
    public function getOffset()
    {
        return $this->offset;
    }

    /**
     * @param int $offset
     *
     * @return $this
     */
    public function setOffset(int $offset = null): EventListOptions
    {
        $this->offset = $offset;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * @param string $order
     *
     * @return $this
     */
    public function setOrder(string $order = null): EventListOptions
    {
        if (preg_match('/^rand\(\)$/i', $order)) {
            $this->setShuffle(true);
            $this->setSort(null);
        }

        if (preg_match("/(.+)\s+(DESC|ASC)$/i", $order, $matches)) {
            $order = $matches[1];
            $this->setSort($matches[2]);
        }

        $this->order = $order;

        return $this;
    }

    /**
     * @return bool|null
     */
    public function isShuffle()
    {
        return $this->shuffle;
    }

    /**
     * @param bool $shuffle
     *
     * @return $this
     */
    public function setShuffle(bool $shuffle = null): EventListOptions
    {
        $this->shuffle = $shuffle;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getSort()
    {
        return $this->sort;
    }

    /**
     * @param string $sort
     *
     * @return $this
     */
    public function setSort(string $sort = null): EventListOptions
    {
        if (null === $sort) {
            $this->sort = null;
        } else {
            $this->sort = strtoupper($sort) === self::SORT_DESC ? self::SORT_DESC : self::SORT_ASC;
        }

        return $this;
    }

    /**
     * @return bool|null
     */
    public function loadOccurrences()
    {
        return $this->loadOccurrences;
    }

    /**
     * @param bool $loadOccurrences
     *
     * @return $this
     */
    public function setLoadOccurrences(bool $loadOccurrences = null): EventListOptions
    {
        $this->loadOccurrences = $loadOccurrences;

        return $this;
    }

    /**
     * @return int|null
     */
    public function getOverlapThreshold()
    {
        return $this->overlapThreshold;
    }

    /**
     * @param int $overlapThreshold
     *
     * @return $this
     */
    public function setOverlapThreshold(int $overlapThreshold = null): EventListOptions
    {
        $this->overlapThreshold = $overlapThreshold;

        return $this;
    }

    /**
     * @return int
     */
    public function getSiteId(): int
    {
        return $this->siteId;
    }

    /**
     * @param int|null $siteId
     *
     * @return $this
     */
    public function setSiteId(int $siteId): EventListOptions
    {
        $this->siteId = $siteId;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getSite()
    {
        return $this->site;
    }

    /**
     * @param string $site
     *
     * @return $this
     */
    public function setSite(string $site = null): EventListOptions
    {
        $this->site = $site;

        return $this;
    }
}
