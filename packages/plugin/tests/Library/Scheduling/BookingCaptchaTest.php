<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use GuzzleHttp\ClientInterface;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Scheduling\BookingCaptcha;
use Solspace\Calendar\Models\SettingsModel;

/** @coversNothing */
class BookingCaptchaTest extends TestCase
{
    public function testDisabledCaptchaDoesNotContactAProvider(): void
    {
        $client = $this->createMock(ClientInterface::class);
        $client->expects(self::never())->method('request');
        $captcha = new BookingCaptcha($client);
        self::assertNull($captcha->getClientConfig(new SettingsModel()));
        self::assertTrue($captcha->verify(new SettingsModel(), null));
    }

    public function testEachProviderVerifiesItsTokenWithPrivateServerCredentials(): void
    {
        foreach ([
            'turnstile' => 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            'hcaptcha' => 'https://api.hcaptcha.com/siteverify',
            'recaptcha' => 'https://www.google.com/recaptcha/api/siteverify',
        ] as $provider => $url) {
            $settings = $this->settings($provider);
            $client = $this->createMock(ClientInterface::class);
            $client->expects(self::once())->method('request')->with('POST', $url, self::callback(static function ($options) use ($provider) {
                $expected = ['secret' => 'private-key', 'response' => 'valid-token', 'remoteip' => '192.0.2.1'];
                if ('hcaptcha' === $provider) {
                    $expected['sitekey'] = 'public-key';
                }
                self::assertSame($expected, $options['form_params']);
                self::assertSame(10, $options['timeout']);
                self::assertFalse($options['allow_redirects']);

                return true;
            }))->willReturn(new Response(200, [], '{"success":true,"action":"calendar-booking"}'));
            $captcha = new BookingCaptcha($client);
            self::assertTrue($captcha->verify($settings, 'valid-token', '192.0.2.1'));
            self::assertStringNotContainsString('private-key', json_encode($captcha->getClientConfig($settings)));
        }
    }

    public function testMissingMalformedAndOversizedTokensFailWithoutAnHttpRequest(): void
    {
        $client = $this->createMock(ClientInterface::class);
        $client->expects(self::never())->method('request');
        $captcha = new BookingCaptcha($client);
        foreach ([null, '', ' ', ['token'], true, str_repeat('x', 2049)] as $token) {
            self::assertFalse($captcha->verify($this->settings('turnstile'), $token));
        }
        foreach (['unknown', 'hcaptcha'] as $provider) {
            $settings = $this->settings($provider);
            $settings->bookingCaptchaSecretKey = '';
            self::assertFalse($captcha->verify($settings, 'token'));
        }
    }

    public function testVerificationFailuresAndMalformedResponsesFailClosed(): void
    {
        foreach ([
            new Response(200, [], '{"success":false,"error-codes":["timeout-or-duplicate"]}'),
            new Response(200, [], '{"success":"true"}'),
            new Response(200, [], '{"success":true,"action":"another-form"}'),
            new Response(200, [], '{"success":true}'),
            new Response(200, [], 'null'),
            new Response(200, [], 'invalid JSON'),
            new Response(503, [], '{"success":true,"action":"calendar-booking"}'),
        ] as $response) {
            $client = $this->createMock(ClientInterface::class);
            $client->method('request')->willReturn($response);
            self::assertFalse((new BookingCaptcha($client))->verify($this->settings('turnstile'), 'token'));
        }
        $client = $this->createMock(ClientInterface::class);
        $client->method('request')->willThrowException(new \RuntimeException('A request containing private-key failed.'));
        self::assertFalse((new BookingCaptcha($client))->verify($this->settings('hcaptcha'), 'token'));
        $client = $this->createMock(ClientInterface::class);
        $client->method('request')->willReturn(new Response(200, [], '{"success":true,"score":0.1}'));
        self::assertFalse((new BookingCaptcha($client))->verify($this->settings('recaptcha'), 'v3-token'));
    }

    public function testKeysResolveEnvironmentVariablesWithoutExposingTheSecret(): void
    {
        putenv('CALENDAR_CAPTCHA_TEST_SITE=env-site');
        putenv('CALENDAR_CAPTCHA_TEST_SECRET=env-secret');

        try {
            $settings = $this->settings('recaptcha');
            $settings->bookingCaptchaSiteKey = '$CALENDAR_CAPTCHA_TEST_SITE';
            $settings->bookingCaptchaSecretKey = '$CALENDAR_CAPTCHA_TEST_SECRET';
            self::assertSame('env-secret', $settings->getBookingCaptchaSecretKey());
            self::assertSame(['provider' => 'recaptcha', 'siteKey' => 'env-site', 'responseField' => 'g-recaptcha-response', 'action' => 'calendar-booking'], (new BookingCaptcha())->getClientConfig($settings));
        } finally {
            putenv('CALENDAR_CAPTCHA_TEST_SITE');
            putenv('CALENDAR_CAPTCHA_TEST_SECRET');
        }
    }

    public function testSettingsRequireBothKeysOnlyWhenCaptchaIsEnabled(): void
    {
        $settings = new SettingsModel();
        $attributes = ['bookingCaptchaProvider', 'bookingCaptchaSiteKey', 'bookingCaptchaSecretKey'];
        self::assertTrue($settings->validate($attributes));
        $settings->bookingCaptchaProvider = 'turnstile';
        self::assertFalse($settings->validate($attributes));
        self::assertTrue($settings->hasErrors('bookingCaptchaSiteKey'));
        self::assertTrue($settings->hasErrors('bookingCaptchaSecretKey'));
        $settings->bookingCaptchaSiteKey = '$SITE_KEY';
        $settings->bookingCaptchaSecretKey = '$SECRET_KEY';
        self::assertTrue($settings->validate($attributes));
        $settings->bookingCaptchaProvider = 'unrecognized';
        self::assertFalse($settings->validate($attributes));
    }

    public function testSharedSettingsPreserveLegacyConfigAndCanOverrideIt(): void
    {
        $settings = $this->settings('turnstile');
        self::assertSame('turnstile', $settings->getCaptchaProvider());
        $settings->captchaProvider = 'hcaptcha';
        $settings->captchaSiteKey = 'new-public';
        $settings->captchaSecretKey = 'new-private';
        self::assertSame('hcaptcha', $settings->getCaptchaProvider());
        self::assertSame('new-public', $settings->getCaptchaSiteKey());
        self::assertSame('new-private', $settings->getBookingCaptchaSecretKey());
        $settings->captchaProvider = 'none';
        self::assertTrue((new BookingCaptcha())->verify($settings, null));
    }

    public function testBookingAndEventProtectionAreIndependent(): void
    {
        $settings = $this->settings('turnstile');
        $client = $this->createMock(ClientInterface::class);
        $client->expects(self::never())->method('request');
        $captcha = new BookingCaptcha($client);
        self::assertNull($captcha->getClientConfig($settings, 'event'));
        self::assertTrue($captcha->verify($settings, null, null, 'event'));
        $settings->captchaProtectEvents = true;
        $settings->captchaProtectBookings = false;
        self::assertNull($captcha->getClientConfig($settings, 'booking'));
        self::assertTrue($captcha->verify($settings, null));
        self::assertSame('calendar-event', $captcha->getClientConfig($settings, 'event')['action']);
        self::assertFalse($captcha->verify($settings, null, null, 'event'));
    }

    public function testV3ChecksScoresAndPurposeOnTheServer(): void
    {
        $settings = $this->settings('recaptcha-v3');
        $settings->captchaProtectEvents = true;
        foreach ([
            [true, 0.5, 'calendar_booking', 'booking', true],
            [true, 0.9, 'calendar_event', 'event', true],
            [true, 0.49, 'calendar_booking', 'booking', false],
            [true, 0.9, 'calendar_booking', 'event', false],
            [true, null, 'calendar_event', 'event', false],
            [true, '0.9', 'calendar_event', 'event', false],
            [true, 1.1, 'calendar_event', 'event', false],
            [false, 0.9, 'calendar_event', 'event', false],
        ] as [$success, $score, $action, $purpose, $expected]) {
            $client = $this->createMock(ClientInterface::class);
            $client->method('request')->willReturn(new Response(200, [], json_encode(compact('success', 'score', 'action'))));
            self::assertSame($expected, (new BookingCaptcha($client))->verify($settings, 'token', null, $purpose));
        }
        $client = $this->createMock(ClientInterface::class);
        $client->expects(self::never())->method('request');
        $settings->recaptchaMinimumScore = 'invalid';
        self::assertFalse((new BookingCaptcha($client))->verify($settings, 'token'));
        self::assertFalse($settings->validate(['recaptchaMinimumScore']));
    }

    private function settings(string $provider): SettingsModel
    {
        return new SettingsModel(['bookingCaptchaProvider' => $provider, 'bookingCaptchaSiteKey' => 'public-key', 'bookingCaptchaSecretKey' => 'private-key']);
    }
}
