<?php

namespace Solspace\Calendar\Services\SolspaceAi;

use craft\base\Component;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\SettingsModel;

class SolspaceAiService extends Component
{
    public const DEFAULT_API_BASE_URL = 'https://ai.solspace.net/v1';

    public const PLUGIN_HANDLE = 'calendar';

    public function isEnabled(): bool
    {
        return (bool) $this->getSettings()->solspaceAiEnabled;
    }

    public function isConnected(): bool
    {
        return $this->isEnabled() && '' !== trim($this->getApiKey());
    }

    public function getApiKey(): string
    {
        return trim((string) $this->getSettings()->solspaceAiApiKey);
    }

    public function getApiBaseUrl(): string
    {
        $base = trim((string) ($this->getSettings()->solspaceAiApiBaseUrl ?: self::DEFAULT_API_BASE_URL));

        return rtrim($base, '/');
    }

    /**
     * @return array{success: bool, message: string}
     */
    public function connect(bool $force = false): array
    {
        if (!$this->isEnabled()) {
            return ['success' => false, 'message' => Calendar::t('Enable SolspaceAI before connecting.')];
        }

        if (!$force && '' !== $this->getApiKey()) {
            return ['success' => true, 'message' => Calendar::t('Already connected to SolspaceAI.')];
        }

        $contact = trim((string) $this->getSettings()->solspaceAiContactEmail);
        $site = $this->normalizeSiteUrl((string) $this->getSettings()->solspaceAiSiteUrl);

        if ('' === $contact || '' === $site) {
            return [
                'success' => false,
                'message' => Calendar::t('Contact email and site URL are required before connecting to SolspaceAI.'),
            ];
        }

        if (!filter_var($site, \FILTER_VALIDATE_URL)) {
            return [
                'success' => false,
                'message' => Calendar::t(
                    'Enter a valid public site URL with a scheme, e.g. `https://yoursite.com`.'
                ),
            ];
        }

        $licenseKey = $this->getLicenseKey();
        if ('' === $licenseKey) {
            return [
                'success' => false,
                'message' => Calendar::t('Add your Calendar license key in Craft → Settings → Plugins first.'),
            ];
        }

        $url = $this->getApiBaseUrl().'/'.self::PLUGIN_HANDLE.'/enable-ai';

        try {
            $client = new Client(['timeout' => 20]);
            $response = $client->post($url, [
                'json' => [
                    'license_key' => $licenseKey,
                    'contact_email' => $contact,
                    'site_url' => $site,
                    'plugin_handle' => self::PLUGIN_HANDLE,
                ],
                'http_errors' => false,
            ]);
        } catch (GuzzleException $e) {
            return ['success' => false, 'message' => Calendar::t('Could not reach SolspaceAI: {message}', [
                'message' => $e->getMessage(),
            ])];
        }

        $status = $response->getStatusCode();
        $body = (string) $response->getBody();
        $data = json_decode($body, true);

        if (201 !== $status) {
            $detail = $body;
            if (\is_array($data) && \array_key_exists('detail', $data)) {
                $d = $data['detail'];
                if (\is_string($d)) {
                    $detail = $d;
                } else {
                    $encoded = json_encode($d, \JSON_UNESCAPED_UNICODE);
                    $detail = \is_string($encoded) && '' !== $encoded ? $encoded : $body;
                }
            }

            return ['success' => false, 'message' => Calendar::t('SolspaceAI: {detail}', ['detail' => $detail])];
        }

        $apiKey = \is_array($data) ? ($data['api_key'] ?? '') : '';
        if ('' === $apiKey) {
            return ['success' => false, 'message' => Calendar::t('SolspaceAI did not return an API key.')];
        }

        if (!$this->saveApiKey($apiKey, $site)) {
            return [
                'success' => false,
                'message' => Calendar::t('Received API key but could not save settings.'),
            ];
        }

        return ['success' => true, 'message' => Calendar::t('Connected to SolspaceAI.')];
    }

    /**
     * @return array{success: bool, content?: string, error?: string, usage?: mixed, model?: string}
     */
    public function chatCompletion(string $systemPrompt, string $userContent, array $options = []): array
    {
        if (!$this->isConnected()) {
            return ['success' => false, 'error' => Calendar::t('SolspaceAI is not connected.')];
        }

        try {
            $client = new Client([
                'timeout' => $options['timeout'] ?? 60,
                'headers' => [
                    'Authorization' => 'Bearer '.$this->getApiKey(),
                    'Content-Type' => 'application/json',
                ],
            ]);

            $messages = [];
            if ('' !== trim($systemPrompt)) {
                $messages[] = ['role' => 'system', 'content' => $systemPrompt];
            }
            $messages[] = ['role' => 'user', 'content' => $userContent];

            $model = trim((string) ($options['model'] ?? 'gpt-4o-mini'));
            if ('' === $model) {
                $model = 'gpt-4o-mini';
            }

            $payload = [
                'model' => $model,
                'messages' => $messages,
            ];

            if (isset($options['temperature'])) {
                $payload['temperature'] = $options['temperature'];
            }

            if (isset($options['max_tokens']) && (int) $options['max_tokens'] > 0) {
                $payload['max_tokens'] = (int) $options['max_tokens'];
            }

            $response = $client->post($this->getApiBaseUrl().'/chat/completions', [
                'json' => $payload,
            ]);

            $data = json_decode((string) $response->getBody(), true);

            return [
                'success' => true,
                'content' => $data['choices'][0]['message']['content'] ?? '',
                'usage' => $data['usage'] ?? null,
                'model' => $data['model'] ?? $model,
            ];
        } catch (GuzzleException $e) {
            return [
                'success' => false,
                'error' => Calendar::t('SolspaceAI request failed: {message}', ['message' => $e->getMessage()]),
            ];
        }
    }

    public function checkConnection(): bool
    {
        if ('' === $this->getApiKey()) {
            return false;
        }

        try {
            $client = new Client([
                'timeout' => 15,
                'headers' => [
                    'Authorization' => 'Bearer '.$this->getApiKey(),
                ],
                'http_errors' => false,
            ]);

            $response = $client->get($this->getApiBaseUrl().'/models');
            $data = json_decode((string) $response->getBody(), true);

            return 200 === $response->getStatusCode()
                && isset($data['data'])
                && \is_array($data['data']);
        } catch (GuzzleException) {
            return false;
        }
    }

    public function getLicenseKey(): string
    {
        $plugin = Calendar::getInstance();

        return trim((string) \Craft::$app->plugins->getPluginLicenseKey($plugin->id));
    }

    public function getDefaultContactEmail(): string
    {
        $fromEmail = \Craft::$app->projectConfig->get('email.fromEmail');

        return \is_string($fromEmail) ? trim($fromEmail) : '';
    }

    public function getDefaultSiteUrl(): string
    {
        $site = \Craft::$app->sites->getPrimarySite();

        return trim((string) ($site->baseUrl ?? ''));
    }

    private function getSettings(): SettingsModel
    {
        return Calendar::getInstance()->getSettings();
    }

    private function saveApiKey(string $apiKey, string $siteUrl): bool
    {
        $plugin = Calendar::getInstance();
        $settings = $plugin->getSettings()->toArray();
        $settings['solspaceAiApiKey'] = $apiKey;
        $settings['solspaceAiSiteUrl'] = $siteUrl;

        return \Craft::$app->plugins->savePluginSettings($plugin, $settings);
    }

    private function normalizeSiteUrl(string $raw): string
    {
        $raw = trim($raw);
        if ('' === $raw) {
            return '';
        }
        if (!preg_match('#^https?://#i', $raw)) {
            $raw = 'https://'.ltrim($raw, '/');
        }

        return $raw;
    }
}
