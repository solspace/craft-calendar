<?php

namespace Solspace\Calendar\Library\SpamProtection;

use GuzzleHttp\ClientInterface;
use Solspace\Calendar\Models\SettingsModel;

class Captcha
{
    private const PROVIDERS = [
        'turnstile' => ['url' => 'https://challenges.cloudflare.com/turnstile/v0/siteverify', 'field' => 'cf-turnstile-response'],
        'hcaptcha' => ['url' => 'https://api.hcaptcha.com/siteverify', 'field' => 'h-captcha-response'],
        'recaptcha-v3' => ['url' => 'https://www.google.com/recaptcha/api/siteverify', 'field' => 'g-recaptcha-response'],
        'recaptcha' => ['url' => 'https://www.google.com/recaptcha/api/siteverify', 'field' => 'g-recaptcha-response'],
    ];

    public function __construct(private ?ClientInterface $client = null) {}

    /** Only public configuration is exposed to templates. */
    public function getClientConfig(SettingsModel $settings, string $purpose = 'booking'): ?array
    {
        if (!$this->enabled($settings, $purpose)) {
            return null;
        }

        return [
            'provider' => $settings->getCaptchaProvider(),
            'siteKey' => $settings->getCaptchaSiteKey(),
            'responseField' => self::PROVIDERS[$settings->getCaptchaProvider()]['field'] ?? 'captchaToken',
            'action' => $this->action($settings->getCaptchaProvider(), $purpose),
        ];
    }

    public function verify(SettingsModel $settings, mixed $token, ?string $ip = null, string $purpose = 'booking'): bool
    {
        $provider = $settings->getCaptchaProvider();
        if (!$this->enabled($settings, $purpose)) {
            return true;
        }
        if (!isset(self::PROVIDERS[$provider]) || !$settings->getCaptchaSiteKey() || !$settings->getCaptchaSecretKey()) {
            \Craft::warning('Calendar CAPTCHA is enabled but its provider or keys are not configured.', __METHOD__);

            return false;
        }
        if ('recaptcha-v3' === $provider && (!is_numeric($settings->recaptchaMinimumScore) || (float) $settings->recaptchaMinimumScore < 0 || (float) $settings->recaptchaMinimumScore > 1)) {
            return false;
        }
        if (!\is_string($token) || '' === trim($token) || \strlen($token) > ('turnstile' === $provider ? 2048 : 8192)) {
            return false;
        }
        $params = ['secret' => $settings->getCaptchaSecretKey(), 'response' => $token];
        if ($ip) {
            $params['remoteip'] = $ip;
        }
        if ('hcaptcha' === $provider) {
            $params['sitekey'] = $settings->getCaptchaSiteKey();
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
                && ('turnstile' !== $provider || $this->action($provider, $purpose) === ($result['action'] ?? null))
                && ('recaptcha' !== $provider || !\array_key_exists('score', $result))
                && ('recaptcha-v3' !== $provider || (\is_int($result['score'] ?? null) || \is_float($result['score'] ?? null))
                    && $result['score'] >= (float) $settings->recaptchaMinimumScore && $result['score'] <= 1
                    && $this->action($provider, $purpose) === ($result['action'] ?? null));
        } catch (\Throwable) {
            // HTTP exceptions may contain the secret/token. Never log their messages or request bodies.
            \Craft::warning('Calendar CAPTCHA verification could not be completed ('.$provider.').', __METHOD__);

            return false;
        }
    }

    private function enabled(SettingsModel $settings, string $purpose): bool
    {
        if (!\in_array($purpose, ['booking', 'event'], true)) {
            throw new \InvalidArgumentException('Choose booking or event spam protection.');
        }

        return 'none' !== $settings->getCaptchaProvider() && ('booking' === $purpose ? $settings->captchaProtectBookings : $settings->captchaProtectEvents);
    }

    private function action(string $provider, string $purpose): string
    {
        return 'calendar'.('recaptcha-v3' === $provider ? '_' : '-').$purpose;
    }
}
