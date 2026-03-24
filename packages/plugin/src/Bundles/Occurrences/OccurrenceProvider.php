<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Solspace\Calendar\Elements\Db\OccurrenceQuery;
use Solspace\Calendar\Records\OccurrenceRecord;

class OccurrenceProvider
{
    public function createQuery(array $criteria = []): OccurrenceQuery
    {
        return new OccurrenceQuery(OccurrenceRecord::class, $criteria);
    }

    public function getOccurrences(OccurrenceQuery $query): OccurrenceList
    {
        $occurrences = $query->all();

        return new OccurrenceList($occurrences);
    }
}
