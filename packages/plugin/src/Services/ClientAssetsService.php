<?php

namespace Solspace\Calendar\Services;

use craft\helpers\App;
use craft\helpers\Html;
use craft\helpers\Json;
use craft\web\View;
use GuzzleHttp\Exception\GuzzleException;
use yii\base\Component;

class ClientAssetsService extends Component
{
    private const BUILD_DIRECTORY = 'js/app';
    private const MANIFEST_FILE = 'manifest.json';
    private const DEFAULT_DEV_SERVER_URL = 'https://127.0.0.1:8080';
    private const DEFAULT_DEV_PROBE_URL = 'https://127.0.0.1:8080';

    private const ENV_ENABLED = 'CAL_CLIENT_DEV_ENABLED';
    private const ENV_PROBE = 'CAL_CLIENT_DEV_PROBE_URL';
    private const ENV_SERVER = 'CAL_CLIENT_DEV_SERVER_URL';
    private const ENV_LEGACY_CLIENT_PATH = 'CAL_CLIENT_PATH';

    private const ENTRY_SOURCES = [
        'overview' => 'src/index.tsx',
        'event-builder' => 'src/standalone/event-builder/index.tsx',
        'widget-agenda' => 'src/standalone/widgets/agenda/index.tsx',
        'widget-event' => 'src/standalone/widgets/event/index.tsx',
        'widget-mini' => 'src/standalone/widgets/mini/index.tsx',
    ];

    private ?array $manifest = null;
    private ?bool $devServerAvailable = null;

    public function registerEntryAssets(
        View $view,
        string $resourceBaseUrl,
        string $resourceSourcePath,
        string $entryName
    ): void {
        if ($this->registerDevServerAssets($view, $entryName)) {
            return;
        }

        $manifest = $this->getManifest($resourceSourcePath);
        $entry = $this->getEntryChunk($manifest, $entryName);

        $visited = [];
        $preloads = [];
        $stylesheets = [];

        $this->collectChunkGraph($manifest, $entryName, $visited, $preloads, $stylesheets);

        foreach (array_keys($stylesheets) as $cssFile) {
            $view->registerCssFile(
                $this->buildAssetUrl($resourceBaseUrl, $cssFile),
                [],
                'cal-client-css:'.$cssFile
            );
        }

        foreach (array_keys($preloads) as $chunkFile) {
            $view->registerHtml(
                Html::beginTag('link', [
                    'rel' => 'modulepreload',
                    'href' => $this->buildAssetUrl($resourceBaseUrl, $chunkFile),
                ]),
                View::POS_HEAD,
                'cal-client-preload:'.$chunkFile
            );
        }

        $view->registerJsFile(
            $this->buildAssetUrl($resourceBaseUrl, $entry['file']),
            [
                'type' => 'module',
                'position' => View::POS_HEAD,
            ],
            'cal-client-entry:'.$entryName
        );
    }

    private function registerDevServerAssets(View $view, string $entryName): bool
    {
        if (!$this->isDevModeEnabled() || !$this->isDevServerAvailable()) {
            return false;
        }

        $origin = $this->getDevServerUrl();
        $entrySource = $this->getEntrySource($entryName);

        $script = <<<JS
                import RefreshRuntime from '{$origin}/@react-refresh';
                RefreshRuntime.injectIntoGlobalHook(window);
                window.\$RefreshReg\$ = () => {};
                window.\$RefreshSig\$ = () => (type) => type;
                window.__vite_plugin_react_preamble_installed__ = true;
            JS;

        $view->registerScript(
            $script,
            View::POS_HEAD,
            ['type' => 'module'],
            'cal-vite-react-preamble'
        );

        $view->registerJsFile(
            $origin.'/@vite/client',
            [
                'type' => 'module',
                'position' => View::POS_HEAD,
            ],
            'cal-vite-client'
        );

        $view->registerJsFile(
            $origin.'/'.$entrySource,
            [
                'type' => 'module',
                'position' => View::POS_HEAD,
            ],
            'cal-client-entry:'.$entryName
        );

        return true;
    }

    private function isDevModeEnabled(): bool
    {
        $enabled = App::env(self::ENV_ENABLED);
        if (null !== $enabled) {
            return (bool) $enabled;
        }

        return (bool) App::env(self::ENV_LEGACY_CLIENT_PATH);
    }

    private function isDevServerAvailable(): bool
    {
        if (null !== $this->devServerAvailable) {
            return $this->devServerAvailable;
        }

        try {
            $url = $this->getDevProbeUrl().'/@vite/client';
            $config = [
                'connect_timeout' => 0.5,
                'timeout' => 1.0,
                'http_errors' => false,
                'verify' => false,
            ];

            $response = \Craft::createGuzzleClient($config)->get($url);

            $this->devServerAvailable = 200 === $response->getStatusCode();
        } catch (GuzzleException|\Throwable) {
            $this->devServerAvailable = false;
        }

        return $this->devServerAvailable;
    }

    private function getDevServerUrl(): string
    {
        return rtrim(
            App::env(self::ENV_SERVER)
                ?: App::env(self::ENV_LEGACY_CLIENT_PATH)
                ?: self::DEFAULT_DEV_SERVER_URL,
            '/'
        );
    }

    private function getDevProbeUrl(): string
    {
        return rtrim(
            App::env(self::ENV_PROBE)
                ?: App::env(self::ENV_SERVER)
                ?: App::env(self::ENV_LEGACY_CLIENT_PATH)
                ?: self::DEFAULT_DEV_PROBE_URL,
            '/'
        );
    }

    private function getManifest(string $resourceSourcePath): array
    {
        if (null !== $this->manifest) {
            return $this->manifest;
        }

        $manifestPath = $resourceSourcePath.'/'.self::BUILD_DIRECTORY.'/'.self::MANIFEST_FILE;
        if (!is_file($manifestPath)) {
            throw new \RuntimeException(\sprintf('Calendar client manifest not found at "%s"', $manifestPath));
        }

        $contents = file_get_contents($manifestPath);
        $manifest = Json::decode($contents);
        if (!\is_array($manifest)) {
            throw new \RuntimeException(\sprintf('Calendar client manifest at "%s" is invalid', $manifestPath));
        }

        $this->manifest = $manifest;

        return $this->manifest;
    }

    private function collectChunkGraph(
        array $manifest,
        string $entryName,
        array &$visited,
        array &$preloads,
        array &$stylesheets
    ): void {
        $chunkKey = $this->resolveChunkKey($manifest, $entryName);
        if (isset($visited[$chunkKey])) {
            return;
        }

        $visited[$chunkKey] = true;
        $chunk = $this->getChunk($manifest, $chunkKey);

        foreach ($chunk['css'] ?? [] as $cssFile) {
            $stylesheets[$cssFile] = true;
        }

        foreach ($chunk['imports'] ?? [] as $importKey) {
            $importChunk = $this->getChunk($manifest, $importKey);
            $preloads[$importChunk['file']] = true;

            $this->collectChunkGraph($manifest, $importKey, $visited, $preloads, $stylesheets);
        }
    }

    private function getEntryChunk(array $manifest, string $entryName): array
    {
        return $this->getChunk($manifest, $this->resolveChunkKey($manifest, $entryName));
    }

    private function resolveChunkKey(array $manifest, string $chunkKey): string
    {
        if (isset($manifest[$chunkKey]) && \is_array($manifest[$chunkKey])) {
            return $chunkKey;
        }

        $entrySource = self::ENTRY_SOURCES[$chunkKey] ?? null;
        if ($entrySource && isset($manifest[$entrySource]) && \is_array($manifest[$entrySource])) {
            return $entrySource;
        }

        foreach ($manifest as $manifestKey => $manifestEntry) {
            if (!\is_array($manifestEntry)) {
                continue;
            }

            $file = $manifestEntry['file'] ?? null;
            $name = $manifestEntry['name'] ?? null;
            $src = $manifestEntry['src'] ?? null;

            if (
                $file === $chunkKey
                || $name === $chunkKey
                || $src === $chunkKey
                || ($entrySource && $src === $entrySource)
            ) {
                return $manifestKey;
            }
        }

        throw new \RuntimeException(\sprintf('Calendar client manifest entry "%s" is missing', $chunkKey));
    }

    private function getChunk(array $manifest, string $chunkKey): array
    {
        $chunkKey = $this->resolveChunkKey($manifest, $chunkKey);

        return $manifest[$chunkKey];
    }

    private function getEntrySource(string $entryName): string
    {
        if (!isset(self::ENTRY_SOURCES[$entryName])) {
            throw new \InvalidArgumentException(\sprintf('Unknown Calendar client entry "%s"', $entryName));
        }

        return self::ENTRY_SOURCES[$entryName];
    }

    private function buildAssetUrl(string $resourceBaseUrl, string $relativePath): string
    {
        $chunks = [
            rtrim($resourceBaseUrl, '/'),
            self::BUILD_DIRECTORY,
            ltrim($relativePath, '/'),
        ];

        return implode('/', $chunks);
    }
}
