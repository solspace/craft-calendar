<?php

namespace Solspace\Tests\Unit\Calendar\Controllers;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceList;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceProvider;
use Solspace\Calendar\Controllers\ApiController;
use Solspace\Calendar\Elements\Db\OccurrenceQuery;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Services\CalendarsService;
use Solspace\Calendar\Services\SettingsService;
use yii\web\Response;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Controllers\ApiController
 */
class ApiControllerTest extends TestCase
{
    public function testCancelledVisibilityAppliesToControlPanelFeedsOnly(): void
    {
        $previousApp = \Craft::$app;

        try {
            foreach ([
                [true, true, [], null],
                [true, false, [], false],
                [true, false, ['cancelled' => 'true'], false],
                [true, true, ['cancelled' => 'false'], false],
                [false, false, [], null],
                [false, false, ['cancelled' => 'true'], true],
            ] as [$cpRequest, $showCancelled, $requestedCriteria, $expectedCancelled]) {
                \Craft::$app = new class($cpRequest, $requestedCriteria) {
                    public object $request;

                    public function __construct(bool $cpRequest, array $criteria)
                    {
                        $this->request = new class($cpRequest, $criteria) {
                            public function __construct(private bool $cpRequest, private array $criteria) {}

                            public function getQueryParam(string $name): mixed
                            {
                                return null;
                            }

                            public function getParam(string $name, mixed $default = null): mixed
                            {
                                return match ($name) {
                                    'criteria' => $this->criteria,
                                    'siteId' => 1,
                                    default => $default,
                                };
                            }

                            public function getIsCpRequest(): bool
                            {
                                return $this->cpRequest;
                            }
                        };
                    }

                    public function getIsMultiSite(): bool
                    {
                        return false;
                    }
                };

                $settings = $this->getMockBuilder(SettingsService::class)->onlyMethods(['getSettingsModel'])->getMock();
                $settings->method('getSettingsModel')->willReturn(new SettingsModel(['showCancelledEvents' => $showCancelled]));
                $calendars = $this->createMock(CalendarsService::class);
                $calendars->method('getAllAllowedCalendarTitles')->willReturn([1 => 'Calendar']);
                $query = $this->getMockBuilder(OccurrenceQuery::class)->disableOriginalConstructor()->getMock();
                $provider = $this->createMock(OccurrenceProvider::class);
                $provider->expects(self::once())->method('createQuery')->willReturnCallback(
                    static function (array $criteria) use ($expectedCancelled, $query): OccurrenceQuery {
                        self::assertSame($expectedCancelled, $criteria['cancelled'] ?? null);

                        return $query;
                    },
                );
                $provider->method('getOccurrences')->willReturn(new OccurrenceList());
                $controller = $this->getMockBuilder(ApiController::class)
                    ->disableOriginalConstructor()
                    ->onlyMethods(['getSettingsService', 'getCalendarService', 'asJson'])
                    ->getMock()
                ;
                $controller->method('getSettingsService')->willReturn($settings);
                $controller->method('getCalendarService')->willReturn($calendars);
                $controller->expects(self::once())->method('asJson')->with([])->willReturn($this->createMock(Response::class));
                (new \ReflectionProperty(ApiController::class, 'occurrenceProvider'))->setValue($controller, $provider);
                $controller->actionEvents();
            }
        } finally {
            \Craft::$app = $previousApp;
        }
    }
}
