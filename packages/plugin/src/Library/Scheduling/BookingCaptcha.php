<?php

namespace Solspace\Calendar\Library\Scheduling;

use GuzzleHttp\ClientInterface;
use Solspace\Calendar\Models\SettingsModel;

class BookingCaptcha
{
    private const PROVIDERS = [
        'turnstile' => ['url' => 'https://challenges.cloudflare.com/turnstile/v0/siteverify', 'field' => 'cf-turnstile-response'],
        'hcaptcha' => ['url' => 'https://api.hcaptcha.com/siteverify', 'field' => 'h-captcha-response'],
        'recaptcha' => ['url' => 'https://www.google.com/recaptcha/api/siteverify', 'field' => 'g-recaptcha-response'],
    ];

    public function __construct(private ?ClientInterface $client = null) {}

    /** Only public configuration is exposed to templates. */
    public function getClientConfig(SettingsModel $settings): ?array
    {
        if ('none' === $settings->bookingCaptchaProvider) {
            return null;
        }

        return [
            'provider' => $settings->bookingCaptchaProvider,
            'siteKey' => $settings->getBookingCaptchaSiteKey(),
            'responseField' => self::PROVIDERS[$settings->bookingCaptchaProvider]['field'] ?? 'bookingCaptchaToken',
        ];
    }

    public function verify(SettingsModel $settings, mixed $token, ?string $ip = null): bool
    {
        $provider = $settings->bookingCaptchaProvider;
        if ('none' === $provider) {
            return true;
        }
        if (!isset(self::PROVIDERS[$provider]) || !$settings->getBookingCaptchaSiteKey() || !$settings->getBookingCaptchaSecretKey()) {
            \Craft::warning('Booking CAPTCHA is enabled but its provider or keys are not configured.', __METHOD__);

            return false;
        }
        if (!\is_string($token) || '' === trim($token) || \strlen($token) > ('turnstile' === $provider ? 2048 : 8192)) {
            return false;
        }
        $params = ['secret' => $settings->getBookingCaptchaSecretKey(), 'response' => $token];
        if ($ip) {
            $params['remoteip'] = $ip;
        }
        if ('hcaptcha' === $provider) {
            $params['sitekey'] = $settings->getBookingCaptchaSiteKey();
        }

        try {
            $response = ($this->client ?? \Craft::createGuzzleClient())->request('POST', self::PROVIDERS[$provider]['url'], [
                'form_params' => $params,
                'connect_timeout' => 3,
                'timeout' => 10,
                'allow_redirects' => false,
            ]);
            if (200 !== $response->getStatusCode()) {
                return false;
            }
            $result = json_decode((string) $response->getBody(), true, 512, \JSON_THROW_ON_ERROR);

            return \is_array($result) && true === ($result['success'] ?? false)
                && ('turnstile' !== $provider || 'calendar-booking' === ($result['action'] ?? null))
                && ('recaptcha' !== $provider || !\array_key_exists('score', $result));
        } catch (\Throwable) {
            // HTTP exceptions may contain the secret/token. Never log their messages or request bodies.
            \Craft::warning('Booking CAPTCHA verification could not be completed ('.$provider.').', __METHOD__);

            return false;
        }
    }
}
