<?php

namespace Solspace\Calendar\Jobs;

use craft\queue\BaseJob;
use Solspace\Calendar\Calendar;

class UpdateEventsUriJob extends BaseJob
{
    public ?int $siteId = null;

    public ?int $calendarId = null;

    public ?string $uriFormat = null;

    public function execute($queue): void
    {
        $this->updateEventsUri();
        $this->setProgress($queue, 1);
    }

    protected function defaultDescription(): string
    {
        return 'Update Events URI';
    }

    private function updateEventsUri(): void
    {
        $elements = Calendar::getInstance()->events
            ->getEventQuery([
                'calendarId' => $this->calendarId,
            ])
            ->all()
        ;

        foreach ($elements as $element) {
            \Craft::$app->db
                ->createCommand('UPDATE elements_sites SET uri = :uri WHERE elementId = :elementId AND siteId = :siteId')
                ->bindValue(':elementId', $element->id)
                ->bindValue(':siteId', $this->siteId)
                ->bindValue(':uri', $this->uriFormat)
                ->execute()
            ;
        }
    }
}
