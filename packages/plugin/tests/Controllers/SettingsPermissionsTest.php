<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use craft\config\GeneralConfig;
use craft\web\Request;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Controllers\SettingsController;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;

/** @covers \Solspace\Calendar\Controllers\SettingsController */
class SettingsPermissionsTest extends TestCase
{
    public function testSettingsSaveCannotBypassTheCpOrEnvironmentRestrictions(): void
    {
        $previous = \Craft::$app;

        try {
            foreach ([false, true] as $cp) {
                $request = $this->createMock(Request::class);
                $request->method('getIsCpRequest')->willReturn($cp);
                \Craft::$app = new class {
                    public string $language = 'en';

                    public function getI18n(): object
                    {
                        return new class {
                            public function translate($category, $message, $params, $language): string
                            {
                                return $message;
                            }
                        };
                    }

                    public function getConfig(): object
                    {
                        return new class {
                            public function getLoadingConfigFile(): ?string
                            {
                                return null;
                            }

                            public function getGeneral(): GeneralConfig
                            {
                                return new GeneralConfig(['allowAdminChanges' => false]);
                            }
                        };
                    }
                };
                $controller = $this->getMockBuilder(SettingsController::class)->disableOriginalConstructor()->onlyMethods(['getSettingsService'])->getMock();
                $controller->request = $request;
                $controller->expects(self::never())->method('getSettingsService');

                try {
                    $controller->actionSaveSettings();
                    self::fail('The settings write must be rejected before loading or saving settings.');
                } catch (BadRequestHttpException|ForbiddenHttpException $exception) {
                    self::assertInstanceOf($cp ? ForbiddenHttpException::class : BadRequestHttpException::class, $exception);
                }
            }
        } finally {
            \Craft::$app = $previous;
        }
    }
}
