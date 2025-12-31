<?php

namespace Solspace\Calendar\Elements\Db;

use craft\db\ActiveQuery;
use craft\helpers\Db;

class OccurrenceQuery extends ActiveQuery
{
    public function event(int|array|string $event): self
    {
        $this->andWhere(['eventId' => $event]);

        return $this;
    }

    public function eventId(int|array|string $eventId): self
    {
        return $this->event($eventId);
    }

    public function calendar(int|array|string $calendar): self
    {
        $this->andWhere(['calendarId' => $calendar]);

        return $this;
    }

    public function calendarId(int|array|string $calendarId): self
    {
        return $this->calendar($calendarId);
    }

    public function startsAt(mixed $date): self
    {
        $this->andWhere(['>=', '[[startUtc]]', Db::prepareValueForDb($date)]);

        return $this;
    }

    public function startsAfter(mixed $date): self
    {
        $this->andWhere(['>', '[[startUtc]]', Db::prepareValueForDb($date)]);

        return $this;
    }

    public function startsBefore(mixed $date): self
    {
        $this->andWhere(['<', '[[startUtc]]', Db::prepareValueForDb($date)]);

        return $this;
    }

    public function endsAt(mixed $date): self
    {
        $this->andWhere(['<=', '[[endUtc]]', Db::prepareValueForDb($date)]);

        return $this;
    }

    public function endsBefore(mixed $date): self
    {
        $this->andWhere(['<', '[[endUtc]]', Db::prepareValueForDb($date)]);

        return $this;
    }

    public function endsAfter(mixed $date): self
    {
        $this->andWhere(['>', '[[endUtc]]', Db::prepareValueForDb($date)]);

        return $this;
    }

    public function inRange(mixed $start, mixed $end, bool $inclusive = true): self
    {
        if ($inclusive) {
            return $this->startsAt($start)->endsAt($end);
        }

        return $this->startsAfter($start)->endsBefore($end);
    }
}
