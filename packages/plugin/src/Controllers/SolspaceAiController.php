<?php

namespace Solspace\Calendar\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Services\SolspaceAi\EventGenerationService;
use Solspace\Calendar\Services\SolspaceAi\SolspaceAiService;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class SolspaceAiController extends BaseController
{
    public function init(): void
    {
        parent::init();

        if (!\Craft::$app->request->getIsConsoleRequest()) {
            $this->requireLogin();
        }
    }

    public function actionUsage(): Response
    {
        $this->requireAcceptsJson();
        Calendar::getInstance()->requirePro();
        PermissionHelper::requirePermission(Calendar::PERMISSION_SETTINGS);

        $solspaceAi = $this->getSolspaceAiService();
        if (!$solspaceAi->isConnected()) {
            return $this->asJson([
                'success' => false,
                'error' => Calendar::t('SolspaceAI is not connected.'),
            ]);
        }

        $licenseKey = $solspaceAi->getLicenseKey();
        if ('' === $licenseKey) {
            return $this->asJson([
                'success' => false,
                'error' => Calendar::t('Calendar license key is missing in Craft.'),
            ]);
        }

        $url = $solspaceAi->getApiBaseUrl().'/'.SolspaceAiService::PLUGIN_HANDLE.'/usage?user_id='.rawurlencode($licenseKey);

        return $this->proxyJsonGet($url, Calendar::t('Failed to reach SolspaceAI usage service.'));
    }

    public function actionPlans(): Response
    {
        $this->requireAcceptsJson();
        Calendar::getInstance()->requirePro();
        PermissionHelper::requirePermission(Calendar::PERMISSION_SETTINGS);

        $solspaceAi = $this->getSolspaceAiService();
        if (!$solspaceAi->isConnected()) {
            throw new NotFoundHttpException('SolspaceAI is not connected.');
        }

        $request = \Craft::$app->getRequest();
        $currency = $request->getQueryParam('currency');
        $locale = \Craft::$app->locale->id;

        $params = ['locale' => $locale];
        if (\is_string($currency) && \in_array(strtolower($currency), ['eur', 'usd'], true)) {
            $params['currency'] = strtolower($currency);
        }

        $url = $solspaceAi->getApiBaseUrl().'/'.SolspaceAiService::PLUGIN_HANDLE.'/plans?'.http_build_query($params);

        return $this->proxyJsonGet($url, Calendar::t('Failed to reach SolspaceAI plans service.'));
    }

    public function actionCreateCheckoutSession(): Response
    {
        $this->requireAcceptsJson();
        $this->requirePostRequest();
        Calendar::getInstance()->requirePro();
        PermissionHelper::requirePermission(Calendar::PERMISSION_SETTINGS);

        $solspaceAi = $this->getSolspaceAiService();
        if (!$solspaceAi->isConnected()) {
            throw new NotFoundHttpException('SolspaceAI is not connected.');
        }

        $licenseKey = $solspaceAi->getLicenseKey();
        if ('' === $licenseKey) {
            $this->response->statusCode = 400;

            return $this->asJson(['error' => Calendar::t('License key is not configured.')]);
        }

        $request = \Craft::$app->getRequest();
        $rawBody = $request->getIsPost() ? json_decode($request->getRawBody(), true) : null;
        $body = \is_array($rawBody) ? $rawBody : [];

        $successUrl = $request->getBodyParam('success_url') ?: $request->getQueryParam('success_url') ?: ($body['success_url'] ?? null);
        $cancelUrl = $request->getBodyParam('cancel_url') ?: $request->getQueryParam('cancel_url') ?: ($body['cancel_url'] ?? null);

        if (empty($successUrl) || empty($cancelUrl)) {
            $this->response->statusCode = 400;

            return $this->asJson([
                'success' => false,
                'error' => Calendar::t('success_url and cancel_url are required.'),
            ]);
        }

        $url = $solspaceAi->getApiBaseUrl().'/'.SolspaceAiService::PLUGIN_HANDLE.'/create-checkout-session';

        $payload = array_filter([
            'license_key' => $licenseKey,
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
            'bundle_key' => $body['bundle_key'] ?? null,
            'currency' => $body['currency'] ?? null,
            'plugin_handle' => SolspaceAiService::PLUGIN_HANDLE,
        ], static fn ($v) => null !== $v && '' !== $v);

        try {
            $client = new Client(['timeout' => 20]);
            $resp = $client->post($url, [
                'json' => $payload,
                'headers' => ['Accept' => 'application/json', 'Content-Type' => 'application/json'],
                'http_errors' => false,
            ]);
        } catch (GuzzleException $e) {
            return $this->asJson([
                'success' => false,
                'error' => Calendar::t('Failed to reach SolspaceAI.'),
                'message' => $e->getMessage(),
            ]);
        }

        $this->response->statusCode = $resp->getStatusCode();
        $this->response->format = Response::FORMAT_RAW;
        $this->response->content = (string) $resp->getBody();
        $this->response->headers->set('Content-Type', 'application/json');

        return $this->response;
    }

    public function actionGenerateEvent(): Response
    {
        $this->requireAcceptsJson();
        $this->requirePostRequest();
        Calendar::getInstance()->requirePro();

        $solspaceAi = $this->getSolspaceAiService();
        if (!$solspaceAi->isConnected()) {
            $this->response->setStatusCode(400);

            return $this->asJson([
                'success' => false,
                'error' => Calendar::t('SolspaceAI is not connected. Enable it in Calendar Settings.'),
            ]);
        }

        $request = \Craft::$app->getRequest();
        $rawBody = json_decode($request->getRawBody(), true);
        $body = \is_array($rawBody) ? $rawBody : [];

        $prompt = trim((string) ($body['prompt'] ?? $request->getBodyParam('prompt', '')));
        $timezone = $body['timezone'] ?? $request->getBodyParam('timezone');

        $calendars = [];
        foreach ($this->getCalendarService()->getAllAllowedCalendars() as $calendar) {
            $calendars[] = [
                'id' => (int) $calendar->id,
                'handle' => (string) $calendar->handle,
                'title' => (string) $calendar->name,
            ];
        }

        if ([] === $calendars) {
            $this->response->setStatusCode(403);

            return $this->asJson([
                'success' => false,
                'error' => Calendar::t('You do not have permission to create events in any calendar.'),
            ]);
        }

        $generation = $this->getEventGenerationService()->generateFromPrompt(
            $prompt,
            $calendars,
            \is_string($timezone) ? $timezone : null
        );

        if (!$generation['success']) {
            $this->response->setStatusCode(400);

            return $this->asJson([
                'success' => false,
                'error' => $generation['error'] ?? Calendar::t('Could not generate event.'),
            ]);
        }

        return $this->asJson([
            'success' => true,
            'event' => $generation['event'],
        ]);
    }

    private function getSolspaceAiService(): SolspaceAiService
    {
        return Calendar::getInstance()->solspaceAi;
    }

    private function getEventGenerationService(): EventGenerationService
    {
        return Calendar::getInstance()->eventGeneration;
    }

    private function proxyJsonGet(string $url, string $errorMessage): Response
    {
        try {
            $client = new Client(['timeout' => 20]);
            $resp = $client->get($url, [
                'headers' => ['Accept' => 'application/json'],
                'http_errors' => false,
            ]);
        } catch (GuzzleException $e) {
            return $this->asJson([
                'success' => false,
                'error' => $errorMessage,
                'message' => $e->getMessage(),
            ]);
        }

        $this->response->statusCode = $resp->getStatusCode();
        $this->response->format = Response::FORMAT_RAW;
        $this->response->content = (string) $resp->getBody();
        $this->response->headers->set('Content-Type', 'application/json');

        return $this->response;
    }
}
