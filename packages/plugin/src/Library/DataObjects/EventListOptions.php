<?php

namespace Solspace\Calendar\Library\DataObjects;

use Carbon\Carbon;
use Solspace\Calendar\Library\Helpers\DateHelper;

class EventListOptions
{
    public const SORT_ASC = 'ASC';
    public const SORT_DESC = 'DESC';

    private ?Carbon $rangeStart = null;

    private ?Carbon $rangeEnd = null;

    private ?int $limit = null;

    private ?int $offset = null;

    private null|bool|int|string $loadOccurrences = null;

    private ?int $overlapThreshold = null;

    private ?string $order = null;

    private ?bool $shuffle = null;

    private ?string $sort = null;

    private ?int $siteId = null;

    private ?string $site = null;

    /**
     * EventListOptions constructor.
     */
    public function __construct()
    {
        $this->sort = self::SORT_ASC;
    }

    public function getRangeStart(): ?Carbon
    {
        return $this->rangeStart;
    }

    public function setRangeStart(null|\DateTime|string $rangeStart = null): self
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

    public function getRangeEnd(): ?Carbon
    {
        return $this->rangeEnd;
    }

    public function setRangeEnd(null|\DateTime|string $rangeEnd = null): self
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

    public function getLimit(): ?int
    {
        return $this->limit;
    }

    public function setLimit(?int $limit = null): self
    {
        $this->limit = $limit;

        return $this;
    }

    public function getOffset(): ?int
    {
        return $this->offset;
    }

    public function setOffset(?int $offset = null): self
    {
        $this->offset = $offset;

        return $this;
    }

    public function getOrder(): ?string
    {
        return $this->order;
    }

    public function setOrder(?string $order = null): self
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

    public function isShuffle(): ?bool
    {
        return $this->shuffle;
    }

    public function setShuffle(?bool $shuffle = null): self
    {
        $this->shuffle = $shuffle;

        return $this;
    }

    public function getSort(): ?string
    {
        return $this->sort;
    }

    public function setSort(?string $sort = null): self
    {
        if (null === $sort) {
            $this->sort = null;
        } else {
            $this->sort = self::SORT_DESC === strtoupper($sort) ? self::SORT_DESC : self::SORT_ASC;
        }

        return $this;
    }

    public function loadOccurrences(): null|bool|int|string
    {
        return $this->loadOccurrences;
    }

    public function setLoadOccurrences(null|bool|int|string $loadOccurrences = null): self
    {
        $this->loadOccurrences = $loadOccurrences;

        return $this;
    }

    public function getOverlapThreshold(): ?int
    {
        return $this->overlapThreshold;
    }

    public function setOverlapThreshold(?int $overlapThreshold = null): self
    {
        $this->overlapThreshold = $overlapThreshold;

        return $this;
    }

    public function getSiteId(): int
    {
        return $this->siteId;
    }

    public function setSiteId(int $siteId): self
    {
        $this->siteId = $siteId;

        return $this;
    }

    public function getSite(): ?string
    {
        return $this->site;
    }

    public function setSite(?string $site = null): self
    {
        $this->site = $site;

        return $this;
    }
}
