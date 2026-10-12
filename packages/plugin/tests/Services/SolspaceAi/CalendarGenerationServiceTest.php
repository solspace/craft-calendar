<?php

namespace Solspace\Tests\Unit\Calendar\Services\SolspaceAi;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Services\SolspaceAi\CalendarGenerationService;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Services\SolspaceAi\CalendarGenerationService
 */
class CalendarGenerationServiceTest extends TestCase
{
    public function testNormalizeGeneratedCalendarFillsDefaultsAndUniqueHandle(): void
    {
        $service = new CalendarGenerationService();
        $method = new \ReflectionMethod($service, 'normalizeGeneratedCalendar');
        $method->setAccessible(true);

        $result = $method->invoke(
            $service,
            [
                'name' => 'Staff Meetings',
                'handle' => 'staffMeetings',
                'description' => 'Internal meetings',
                'color' => '3366ff',
                'allowRepeatingEvents' => true,
            ],
            [
                ['name' => 'Staff Meetings', 'handle' => 'staffMeetings'],
            ]
        );

        self::assertTrue($result['success']);
        self::assertSame('Staff Meetings 1', $result['calendar']['name']);
        self::assertSame('staffMeetings1', $result['calendar']['handle']);
        self::assertSame('#3366ff', $result['calendar']['color']);
        self::assertTrue($result['calendar']['hasTitleField']);
        self::assertSame('Title', $result['calendar']['titleLabel']);
        self::assertTrue($result['calendar']['allowRepeatingEvents']);
        self::assertSame(DateHelper::FLOATING_TIMEZONE, $result['calendar']['icsTimezone']);
    }

    public function testNormalizeGeneratedCalendarRequiresName(): void
    {
        $service = new CalendarGenerationService();
        $method = new \ReflectionMethod($service, 'normalizeGeneratedCalendar');
        $method->setAccessible(true);

        $result = $method->invoke($service, ['handle' => 'x'], []);

        self::assertFalse($result['success']);
    }

    public function testExtractJsonObjectFromMarkdownFence(): void
    {
        $service = new CalendarGenerationService();
        $method = new \ReflectionMethod($service, 'extractJsonObject');
        $method->setAccessible(true);

        $decoded = $method->invoke(
            $service,
            "Here you go:\n```json\n{\"name\":\"Holidays\",\"handle\":\"holidays\",\"color\":\"#ff0000\"}\n```"
        );

        self::assertIsArray($decoded);
        self::assertSame('Holidays', $decoded['name']);
        self::assertSame('holidays', $decoded['handle']);
    }
}
