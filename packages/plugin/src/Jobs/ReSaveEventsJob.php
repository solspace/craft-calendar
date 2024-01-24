<?php

namespace Solspace\Calendar\Jobs;

use craft\elements\db\ElementQueryInterface;
use craft\queue\BaseJob;
use Solspace\Calendar\Elements\Event;

class ReSaveEventsJob extends BaseJob
{
    public function execute($queue): void
    {
        $this->saveElements(Event::find());
        $this->setProgress($queue, 1);
    }

    protected function defaultDescription(): string
    {
        return 'Re-Save Events';
    }

    private function saveElements(ElementQueryInterface $query): void
    {
        // @var ElementQuery|EventQuery $query
        $query->setLoadOccurrences(false);

        if ($query->count() > 0) {
            \Craft::$app->getElements()->resaveElements($query, true, true, false);
        }
    }
}
