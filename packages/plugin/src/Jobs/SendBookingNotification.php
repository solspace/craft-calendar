<?php

namespace Solspace\Calendar\Jobs;

use craft\mail\Mailer;
use craft\mail\Message;
use craft\queue\BaseJob;
use Solspace\Calendar\Calendar;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use yii\log\Logger;
use yii\mail\MessageInterface;

class SendBookingNotification extends BaseJob
{
    public string $recipient;
    public string $subject;
    public string $body;
    public ?string $htmlBody = null;

    public function execute($queue): void
    {
        $message = \Craft::$app->getMailer()->compose()->setTo($this->recipient)->setSubject($this->subject)->setTextBody($this->body);
        if (null !== $this->htmlBody) {
            $message->setHtmlBody($this->htmlBody);
        }
        $startedAt = microtime(true);
        if (!$message->send()) {
            throw $this->deliveryFailure($message, $startedAt);
        }
    }

    protected function defaultDescription(): ?string
    {
        return Calendar::t('Send booking notification');
    }

    private function deliveryFailure(MessageInterface $message, float $startedAt): \RuntimeException
    {
        $error = $message instanceof Message && isset($message->error) ? $message->error : null;
        $detail = $error?->getMessage();
        if (!$detail) {
            // Some Craft versions log and swallow transport exceptions without setting Message::$error.
            // Only inspect this send's mail errors; a queue worker may have earlier failures in its log.
            foreach (array_reverse(\Craft::getLogger()->messages) as [$logged, $level, $category, $timestamp]) {
                if ($timestamp < $startedAt) {
                    break;
                }
                if ($logged instanceof TransportExceptionInterface) {
                    $error = $logged;
                    $detail = $logged->getMessage();

                    break;
                }
                if (Mailer::class.'::send' === $category && Logger::LEVEL_WARNING === $level && \is_string($logged)) {
                    $detail = $logged;

                    break;
                }
            }
        }
        $detail ??= 'Craft\'s mailer returned false. Check Settings → Email and storage/logs for mail errors; a mail event handler may also have cancelled delivery.';
        // Transport errors can include a DSN. Keep authentication credentials out of the queue error.
        $detail = preg_replace('~([a-z][a-z0-9+.-]*://)[^\s/@]+@~i', '$1[redacted]@', $detail);

        return new \RuntimeException('Could not send booking notification: '.$detail, 0, $error);
    }
}
