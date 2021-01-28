<?php

namespace Solspace\Calendar\Library\DataObjects;

use Carbon\Carbon;
use Solspace\Calendar\Library\DateHelper;

class EventListOptions
{
    const SORT_ASC = 'ASC';
    const SORT_DESC = 'DESC';

    /** @var Carbon */
    private $rangeStart;

    /** @var Carbon */
    private $rangeEnd;

    /** @var int */
    private $limit;

    /** @var int */
    private $offset;

    /** @var bool|int|string */
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
     * @return null|Carbon
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
    public function setRangeStart($rangeStart = null): self
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
     * @return null|Carbon
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
    public function setRangeEnd($rangeEnd = null): self
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
     * @return null|int
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
    public function setLimit(int $limit = null): self
    {
        $this->limit = $limit;

        return $this;
    }

    /**
     * @return null|int
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
    public function setOffset(int $offset = null): self
    {
        $this->offset = $offset;

        return $this;
    }

    /**
     * @return null|string
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
    public function setOrder(string $order = null): self
    {
        if (preg_match('/^rand\(\)$/i', $order)) {
            $this->setShuffle(true);
            $this->setSort(null);
        }

        if (preg_match('/(.+)\\s+(DESC|ASC)$/i', $order, $matches)) {
            $order = $matches[1];
            $this->setSort($matches[2]);
        }

        $this->order = $order;

        return $this;
    }

    /**
     * @return null|bool
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
    public function setShuffle(bool $shuffle = null): self
    {
        $this->shuffle = $shuffle;

        return $this;
    }

    /**
     * @return null|string
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
    public function setSort(string $sort = null): self
    {
        if (null === $sort) {
            $this->sort = null;
        } else {
            $this->sort = self::SORT_DESC === strtoupper($sort) ? self::SORT_DESC : self::SORT_ASC;
        }

        return $this;
    }

    /**
     * @return null|bool|int|string
     */
    public function loadOccurrences()
    {
        return $this->loadOccurrences;
    }

    /**
     * @param null|bool|int|string $loadOccurrences
     *
     * @return $this
     */
    public function setLoadOccurrences($loadOccurrences = null): self
    {
        $this->loadOccurrences = $loadOccurrences;

        return $this;
    }

    /**
     * @return null|int
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
    public function setOverlapThreshold(int $overlapThreshold = null): self
    {
        $this->overlapThreshold = $overlapThreshold;

        return $this;
    }

    public function getSiteId(): int
    {
        return $this->siteId;
    }

    /**
     * @param null|int $siteId
     *
     * @return $this
     */
    public function setSiteId(int $siteId): self
    {
        $this->siteId = $siteId;

        return $this;
    }

    /**
     * @return null|string
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
    public function setSite(string $site = null): self
    {
        $this->site = $site;

        return $this;
    }
}
