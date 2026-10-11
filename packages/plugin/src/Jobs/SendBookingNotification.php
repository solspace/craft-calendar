<?php

namespace Solspace\Calendar\Jobs;

use craft\mail\Mailer;
use craft\mail\Message;
use craft\queue\BaseJob;
use Solspace\Calendar\Calendar;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use yii\log\Logger;
use yii\mail\MailEvent;
use yii\mail\MessageInterface;

class SendBookingNotification extends BaseJob
{
    public string $recipient;
    public string $subject;
    public string $body;
    public ?string $htmlBody = null;
    public ?string $fromEmail = null;
    public ?string $fromName = null;
    public ?string $replyTo = null;
    public array $cc = [];
    public array $bcc = [];

    public function execute($queue): void
    {
        $mailer = \Craft::$app->getMailer();
        $message = $mailer->compose()->setTo($this->recipient)->setCc($this->cc)->setBcc($this->bcc)->setSubject($this->subject)->setTextBody($this->body);
        if (null !== $this->replyTo) {
            $message->setReplyTo($this->replyTo);
        }
        if (null !== $this->htmlBody) {
            $message->setHtmlBody($this->htmlBody);
        }
        // Apply individual sender overrides after Craft has resolved its site defaults.
        $senderOverride = function (MailEvent $event) use ($message): void {
            if ($event->message !== $message) {
                return;
            }
            $from = $message->getFrom();
            $email = $this->fromEmail ?? array_key_first($from);
            $name = $this->fromName ?? reset($from);
            $message->setFrom([$email => false === $name ? '' : $name]);
        };
        $overrideSender = null !== $this->fromEmail || null !== $this->fromName;
        if ($overrideSender) {
            $mailer->on(Mailer::EVENT_BEFORE_SEND, $senderOverride);
        }
        $startedAt = microtime(true);

        try {
            if (!$message->send()) {
                throw $this->deliveryFailure($message, $startedAt);
            }
        } finally {
            // Queue workers reuse the mailer; do not leak these overrides to later mail.
            if ($overrideSender) {
                $mailer->off(Mailer::EVENT_BEFORE_SEND, $senderOverride);
            }
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
