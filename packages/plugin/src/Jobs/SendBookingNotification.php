<?php

namespace Solspace\Calendar\Jobs;

use craft\queue\BaseJob;
use Solspace\Calendar\Calendar;

class SendBookingNotification extends BaseJob
{
    public string $recipient;
    public string $subject;
    public string $body;

    public function execute($queue): void
    {
        if (!\Craft::$app->getMailer()->compose()->setTo($this->recipient)->setSubject($this->subject)->setTextBody($this->body)->send()) {
            throw new \RuntimeException('Could not send booking notification.');
        }
    }

    protected function defaultDescription(): ?string
    {
        return Calendar::t('Send booking notification');
    }
}
