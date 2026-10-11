<?php

namespace Solspace\Tests\Unit\Calendar\Jobs;

use craft\config\GeneralConfig;
use craft\mail\Mailer;
use craft\mail\Message;
use craft\web\View;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Jobs\SendBookingNotification;
use Symfony\Component\Mailer\Exception\TransportException;
use yii\console\ErrorHandler;
use yii\log\Logger;
use yii\mail\MailEvent;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Jobs\SendBookingNotification
 */
class SendBookingNotificationTest extends TestCase
{
    private mixed $previousApp;
    private Logger $previousLogger;
    private Mailer $mailer;
    private GeneralConfig $config;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousLogger = \Craft::getLogger();
        \Craft::setLogger(new Logger(['flushInterval' => 0, 'traceLevel' => 0]));
        $this->config = new GeneralConfig();
        $this->mailer = new class extends Mailer {
            public ?\Throwable $failure = null;
            public ?Message $sent = null;

            protected function sendMessage($message): bool
            {
                if ($this->failure) {
                    throw $this->failure;
                }
                $this->sent = $message;

                return true;
            }
        };
        $this->mailer->messageClass = Message::class;
        $this->mailer->from = ['sender@example.com' => 'Bookings'];
        $this->mailer->replyTo = 'replies@example.com';
        $view = new class {
            private string $mode = View::TEMPLATE_MODE_CP;

            public function getTemplateMode(): string
            {
                return $this->mode;
            }

            public function setTemplateMode(string $mode): void
            {
                $this->mode = $mode;
            }
        };
        \Craft::$app = new class($this->mailer, $this->config, $view) {
            public string $language = 'en-US';
            public array $loadedModules = [];

            public function __construct(private $mailer, private $general, private $view) {}

            public function getMailer()
            {
                return $this->mailer;
            }

            public function getConfig()
            {
                return new class($this->general) {
                    public function __construct(private $general) {}

                    public function getGeneral()
                    {
                        return $this->general;
                    }
                };
            }

            public function getSites()
            {
                return new class {
                    public function getCurrentSite()
                    {
                        return (object) ['uid' => 'primary'];
                    }
                };
            }

            public function getView()
            {
                return $this->view;
            }

            public function getErrorHandler()
            {
                return new ErrorHandler();
            }

            public function getI18n()
            {
                return new class {
                    public function translate($category, $message, $params, $language)
                    {
                        return $message;
                    }
                };
            }
        };
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        \Craft::setLogger($this->previousLogger);
    }

    public function testUsesCraftSenderReplyToAndTestRecipient(): void
    {
        $this->config->testToEmailAddress = 'developer@example.com';
        $this->job()->execute(null);
        self::assertSame(['sender@example.com' => 'Bookings'], $this->mailer->sent->getFrom());
        self::assertSame(['replies@example.com' => ''], $this->mailer->sent->getReplyTo());
        self::assertSame(['developer@example.com'], array_keys($this->mailer->sent->getTo()));
        self::assertSame('Booking Room — Requested', $this->mailer->sent->getSubject());
        self::assertSame("Booking request\nDate: 2026-10-13", $this->mailer->sent->getSymfonyEmail()->getTextBody());
    }

    public function testSendsCustomSenderReplyToCcAndBccWithoutChangingCraftDefaults(): void
    {
        $job = $this->job();
        $job->fromEmail = 'rooms@example.com';
        $job->fromName = 'Room reservations';
        $job->replyTo = 'support@example.com';
        $job->cc = ['manager@example.com', 'assistant@example.com'];
        $job->bcc = ['archive@example.com'];
        $job->execute(null);
        self::assertSame(['rooms@example.com' => 'Room reservations'], $this->mailer->sent->getFrom());
        self::assertSame(['support@example.com' => ''], $this->mailer->sent->getReplyTo());
        self::assertSame($job->cc, array_keys($this->mailer->sent->getCc()));
        self::assertSame($job->bcc, array_keys($this->mailer->sent->getBcc()));
        $this->job()->execute(null);
        self::assertSame(['sender@example.com' => 'Bookings'], $this->mailer->sent->getFrom());
        self::assertSame(['replies@example.com' => ''], $this->mailer->sent->getReplyTo());
        self::assertEmpty($this->mailer->sent->getCc());
        self::assertEmpty($this->mailer->sent->getBcc());
    }

    public function testIndividualSenderOverridesRetainCraftSiteDefaults(): void
    {
        $this->mailer->siteOverrides = ['primary' => ['fromEmail' => 'site@example.com', 'fromName' => 'Site sender']];
        $job = $this->job();
        $job->fromName = 'Reservations';
        $job->execute(null);
        self::assertSame(['site@example.com' => 'Reservations'], $this->mailer->sent->getFrom());
        $job = $this->job();
        $job->fromEmail = 'rooms@example.com';
        $job->execute(null);
        self::assertSame(['rooms@example.com' => 'Site sender'], $this->mailer->sent->getFrom());
        self::assertSame(['sender@example.com' => 'Bookings'], $this->mailer->from);
    }

    public function testTestRecipientClearsAllAdditionalRecipientsEvenWithCustomDeliverySettings(): void
    {
        $this->config->testToEmailAddress = 'developer@example.com';
        $job = $this->job();
        $job->fromName = 'Reservations';
        $job->cc = ['manager@example.com'];
        $job->bcc = ['archive@example.com'];
        $job->execute(null);
        self::assertSame(['developer@example.com'], array_keys($this->mailer->sent->getTo()));
        self::assertEmpty($this->mailer->sent->getCc());
        self::assertEmpty($this->mailer->sent->getBcc());
    }

    public function testFailedSendDoesNotLeaveASenderOverrideOnTheSharedMailer(): void
    {
        $this->mailer->failure = new TransportException('Connection refused');
        $job = $this->job();
        $job->fromName = 'Reservations';

        try {
            $job->execute(null);
            self::fail('Delivery should fail.');
        } catch (\RuntimeException) {
            self::assertFalse($this->mailer->hasEventHandlers(Mailer::EVENT_BEFORE_SEND));
        }
        $this->mailer->failure = null;
        $this->job()->execute(null);
        self::assertSame(['sender@example.com' => 'Bookings'], $this->mailer->sent->getFrom());
    }

    public function testReportsTransportExceptionSwallowedByCraftMailer(): void
    {
        $error = new TransportException('Connection could not be established with host localhost:1025: Connection refused.');
        $this->mailer->failure = $error;

        try {
            $this->job()->execute(null);
            self::fail('Failed delivery must remain a failed queue job.');
        } catch (\RuntimeException $exception) {
            self::assertStringContainsString('localhost:1025: Connection refused', $exception->getMessage());
            self::assertSame($error, $exception->getPrevious());
        }
    }

    public function testSendsHtmlAndPlainTextTogether(): void
    {
        $job = $this->job();
        $job->htmlBody = '<p>Booking request</p>';
        $job->execute(null);
        self::assertSame('<p>Booking request</p>', $this->mailer->sent->getSymfonyEmail()->getHtmlBody());
        self::assertSame("Booking request\nDate: 2026-10-13", $this->mailer->sent->getSymfonyEmail()->getTextBody());
    }

    public function testCancelledDeliveryDoesNotReuseAnEarlierWorkersError(): void
    {
        \Craft::getLogger()->log(new TransportException('Earlier unrelated SMTP failure'), Logger::LEVEL_ERROR);
        $this->mailer->on(Mailer::EVENT_BEFORE_SEND, static function (MailEvent $event): void {
            $event->isValid = false;
        });
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Craft\'s mailer returned false. Check Settings → Email');
        $this->job()->execute(null);
    }

    public function testReadsMessageErrorWhenAvailable(): void
    {
        $error = new TransportException('SMTP authentication failed.');
        $this->mailer->on(Mailer::EVENT_BEFORE_SEND, static function (MailEvent $event) use ($error): void {
            $event->message->error = $error;
            $event->isValid = false;
        });
        $this->expectExceptionMessage('SMTP authentication failed.');
        $this->job()->execute(null);
    }

    public function testRedactsDsnCredentialsInTheQueueError(): void
    {
        $this->mailer->failure = new TransportException('Connection failed: smtp://username:password@mail.example.com:587');

        try {
            $this->job()->execute(null);
            self::fail('Failed delivery must remain a failed queue job.');
        } catch (\RuntimeException $exception) {
            self::assertStringContainsString('smtp://[redacted]@mail.example.com:587', $exception->getMessage());
            self::assertStringNotContainsString('username:password', $exception->getMessage());
        }
    }

    private function job(): SendBookingNotification
    {
        // Keep the original serialized payload shape so existing failed jobs can be retried.
        return new SendBookingNotification([
            'recipient' => 'customer@example.com',
            'subject' => 'Booking Room — Requested',
            'body' => "Booking request\nDate: 2026-10-13",
        ]);
    }
}
