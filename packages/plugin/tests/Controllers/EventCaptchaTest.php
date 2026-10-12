<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\web\Request;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Controllers\EventsApiController;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\SettingsService;

/** @coversNothing */
class EventCaptchaTest extends TestCase
{
    public function testNewPublicEventsRequireVerificationButEditsAndControlPanelEntryDoNot(): void
    {
        $previousApp = \Craft::$app;

        try {
            foreach ([[true, false, true, true], [true, true, true, false], [false, false, true, false], [true, false, false, false]] as [$new, $cp, $enabled, $blocked]) {
                $request = $this->createMock(Request::class);
                $request->method('getIsCpRequest')->willReturn($cp);
                $request->method('getBodyParam')->willReturn(null);
                $request->method('getUserIP')->willReturn('192.0.2.1');
                \Craft::$app = new class($request) {
                    public string $language = 'en-US';

                    public function __construct(public Request $request) {}

                    public function getI18n(): object
                    {
                        return new class {
                            public function translate($category, $message, $params, $language): string
                            {
                                return $message;
                            }
                        };
                    }
                };
                $settings = new SettingsModel(['captchaProvider' => 'recaptcha-v3', 'captchaSiteKey' => 'site-key', 'captchaSecretKey' => 'secret-key', 'captchaProtectEvents' => $enabled]);
                $service = $this->createMock(SettingsService::class);
                $service->method('getSettingsModel')->willReturn($settings);
                $controller = $this->getMockBuilder(EventsApiController::class)->disableOriginalConstructor()->onlyMethods(['getSettingsService'])->getMock();
                $controller->method('getSettingsService')->willReturn($service);
                $event = (new \ReflectionClass(Event::class))->newInstanceWithoutConstructor();
                $event->title = 'Submitted title';
                (new \ReflectionMethod(EventsApiController::class, 'validateSubmissionCaptcha'))->invoke($controller, $event, $new);
                self::assertSame($blocked, $event->hasErrors('captchaToken'));
                self::assertSame('Submitted title', $event->title);
            }
        } finally {
            \Craft::$app = $previousApp;
        }
    }
}
