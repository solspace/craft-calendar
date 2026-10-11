<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\config\GeneralConfig;
use craft\i18n\Locale;
use craft\web\Request;
use craft\web\Response;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Controllers\BookingsController;
use Solspace\Calendar\Models\BookingNotificationSettings;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\BookingsService;
use Solspace\Calendar\Services\SettingsService;
use Solspace\Tests\Unit\Calendar\Support\BookingNotificationView;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\MethodNotAllowedHttpException;

require_once __DIR__.'/../_support/BookingNotificationView.php';

/** @coversNothing */
class BookingNotificationsTest extends TestCase
{
    private mixed $previousApp;
    private ?Calendar $previousPlugin;
    private BookingsController $controller;
    private Request $request;
    private array $body = [];
    private bool $cp = true;
    private bool $post = true;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $this->previousPlugin = Calendar::getInstance();
        $this->request = $this->createMock(Request::class);
        $this->request->method('getIsCpRequest')->willReturnCallback(fn () => $this->cp);
        $this->request->method('getIsPost')->willReturnCallback(fn () => $this->post);
        $this->request->method('getAcceptsJson')->willReturn(true);
        $this->request->method('getBodyParam')->willReturnCallback(fn ($name, $default = null) => $this->body[$name] ?? $default);
        \Craft::$app = new class($this->request) {
            public string $language = 'en';
            public string $timeZone = 'America/Winnipeg';
            public array $loadedModules = [];
            public bool $admin = true;
            public bool $allowAdminChanges = true;
            public array $saved = [];

            public function __construct(public Request $request) {}

            public function getRequest(): Request
            {
                return $this->request;
            }

            public function getUser(): object
            {
                return new class($this->admin) {
                    public function __construct(private bool $admin) {}

                    public function getIsGuest(): bool
                    {
                        return false;
                    }

                    public function getIsAdmin(): bool
                    {
                        return $this->admin;
                    }
                };
            }

            public function getConfig(): object
            {
                return new class($this->allowAdminChanges) {
                    public function __construct(private bool $allowed) {}

                    public function getLoadingConfigFile(): ?string
                    {
                        return null;
                    }

                    public function getGeneral(): GeneralConfig
                    {
                        return new GeneralConfig(['allowAdminChanges' => $this->allowed, 'baseCpUrl' => 'https://example.test', 'cpTrigger' => 'admin', 'omitScriptNameInUrls' => true]);
                    }
                };
            }

            public function getIsInitialized(): bool
            {
                return false;
            }

            public function getView(): BookingNotificationView
            {
                return new BookingNotificationView();
            }

            public function getTimeZone(): string
            {
                return 'America/Winnipeg';
            }

            public function getFormattingLocale(): Locale
            {
                return new Locale('en-US');
            }

            public function getProjectConfig(): object
            {
                return new class($this) {
                    public function __construct(private object $app) {}

                    public function set($path, $value): void
                    {
                        $this->app->saved[$path] = $value;
                    }
                };
            }

            public function getSession(): object
            {
                return new class {
                    public function setNotice($message): void {}
                };
            }

            public function getI18n(): object
            {
                return new class {
                    public function format($message, $params, $language): string
                    {
                        return strtr($message, array_combine(array_map(static fn ($key) => '{'.$key.'}', array_keys($params)), array_values($params)));
                    }

                    public function translate($category, $message, $params, $language): string
                    {
                        foreach ($params as $key => $value) {
                            $message = str_replace('{'.$key.'}', $value, $message);
                        }

                        return $message;
                    }
                };
            }
        };
        $this->controller = $this->getMockBuilder(BookingsController::class)->disableOriginalConstructor()->onlyMethods(['renderTemplate', 'asSuccess', 'asFailure', 'redirect'])->getMock();
        $this->controller->request = $this->request;
    }

    protected function tearDown(): void
    {
        \Craft::$app = $this->previousApp;
        Calendar::setInstance($this->previousPlugin);
    }

    public function testEditorsCannotReadSaveOrPreviewTemplates(): void
    {
        \Craft::$app->admin = false;
        foreach (['actionNotifications', 'actionSaveNotifications', 'actionPreviewNotification'] as $action) {
            try {
                $this->controller->{$action}();
                self::fail('Notification template editing must require an administrator.');
            } catch (ForbiddenHttpException) {
                self::assertSame([], \Craft::$app->saved);
            }
        }
    }

    public function testSiteRequestsAndLockedEnvironmentsCannotAccessTemplates(): void
    {
        foreach (['actionNotifications', 'actionSaveNotifications', 'actionPreviewNotification'] as $action) {
            $this->cp = false;

            try {
                $this->controller->{$action}();
                self::fail('Site requests must not access notification templates.');
            } catch (BadRequestHttpException) {
                self::assertSame([], \Craft::$app->saved);
            }
            $this->cp = true;
            \Craft::$app->allowAdminChanges = false;

            try {
                $this->controller->{$action}();
                self::fail('Locked environments must not access notification template editing.');
            } catch (ForbiddenHttpException) {
                self::assertSame([], \Craft::$app->saved);
            }
            \Craft::$app->allowAdminChanges = true;
        }
    }

    public function testSavingAndPreviewRequirePost(): void
    {
        $this->post = false;
        foreach (['actionSaveNotifications', 'actionPreviewNotification'] as $action) {
            try {
                $this->controller->{$action}();
                self::fail('Saving and preview must require POST.');
            } catch (MethodNotAllowedHttpException) {
                self::assertSame([], \Craft::$app->saved);
            }
        }
    }

    public function testValidTemplatesSaveOnlyToTheNotificationProjectConfigPath(): void
    {
        $this->body = ['templates' => ['admin' => ['fromEmail' => 'bookings@example.com', 'fromName' => 'Reservations', 'replyTo' => 'help@example.com', 'cc' => 'manager@example.com', 'bcc' => 'archive@example.com', 'subject' => '{{ calendar.name }}', 'body' => '<p>{{ status }}</p>']]];
        $response = $this->createMock(Response::class);
        $this->controller->expects(self::once())->method('redirect')->with('https://example.test/admin/calendar/bookings/notifications')->willReturn($response);
        self::assertSame($response, $this->controller->actionSaveNotifications());
        self::assertSame([BookingNotificationSettings::PATH => $this->body['templates']], \Craft::$app->saved);
    }

    public function testPreviewReturnsRenderedSampleContentWithoutSavingAnything(): void
    {
        $this->body = ['audience' => 'requester', 'bookingStatus' => 'confirmed', 'templates' => ['requester' => ['subject' => '{{ calendar.name }}: {{ status }}', 'body' => '{% if statusHandle == "confirmed" %}<p>{{ booking.customerName }}</p>{% endif %}']]];
        $response = $this->createMock(Response::class);
        $this->controller->expects(self::once())->method('asSuccess')->with(null, ['subject' => 'Example Calendar: Confirmed', 'html' => '<p>Alex Morgan</p>'])->willReturn($response);
        self::assertSame($response, $this->controller->actionPreviewNotification());
        self::assertSame([], \Craft::$app->saved);
    }

    public function testInvalidTwigPreviewReturnsFieldErrors(): void
    {
        $this->body = ['audience' => 'requester', 'templates' => ['requester' => ['body' => '{% if %}']]];
        $response = $this->createMock(Response::class);
        $this->controller->expects(self::once())->method('asFailure')->with('Could not preview notification.', self::callback(static fn ($data) => isset($data['errors']['templates.requester.body'])))->willReturn($response);
        self::assertSame($response, $this->controller->actionPreviewNotification());
        self::assertSame([], \Craft::$app->saved);
    }

    public function testInvalidDeliveryPreviewReturnsFieldErrorsWithoutSaving(): void
    {
        $this->body = ['audience' => 'requester', 'templates' => ['requester' => ['bcc' => 'not an email']]];
        $response = $this->createMock(Response::class);
        $this->controller->expects(self::once())->method('asFailure')->with('Could not preview notification.', self::callback(static fn ($data) => isset($data['errors']['templates.requester.bcc'])))->willReturn($response);
        self::assertSame($response, $this->controller->actionPreviewNotification());
        self::assertSame([], \Craft::$app->saved);
    }

    public function testInvalidSavePreservesTheSubmittedSourceAndDoesNotChangeProjectConfig(): void
    {
        $bookings = $this->createMock(BookingsService::class);
        $bookings->method('getManageableCalendars')->willReturn([7 => new CalendarModel(['id' => 7, 'type' => 'scheduling'])]);
        $plugin = (new \ReflectionClass(Calendar::class))->newInstanceWithoutConstructor();
        $plugin->setComponents(['bookings' => $bookings, 'settings' => SettingsService::class]);
        Calendar::setInstance($plugin);
        $this->body = ['templates' => ['admin' => ['body' => '{% if %}', 'fromEmail' => 'invalid sender']]];
        $response = $this->createMock(Response::class);
        $this->controller->expects(self::once())->method('renderTemplate')->with('calendar/bookings/notifications', self::callback(static fn ($variables) => $variables['notificationSettings']->hasErrors('templates.admin.body') && $variables['notificationSettings']->hasErrors('templates.admin.fromEmail') && 'invalid sender' === $variables['notificationSettings']->getTemplates()['admin']['fromEmail'] && '{% if %}' === $variables['notificationSettings']->templates['admin']['body']))->willReturn($response);
        self::assertSame($response, $this->controller->actionSaveNotifications());
        self::assertSame([], \Craft::$app->saved);
    }
}
