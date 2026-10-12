<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Helpers\TimezoneHelper;
use Solspace\Calendar\Twig\Extensions\CalendarGlobalExtension;
use Twig\Environment;
use Twig\Loader\ArrayLoader;

/** @coversNothing */
class TimezoneHelperTest extends TestCase
{
    public function testGenericNamesAreLocalizedAndUtcRemainsRecognizable(): void
    {
        if (!class_exists(\IntlTimeZone::class)) {
            self::markTestSkipped('Requires intl.');
        }
        self::assertSame('Central Time', TimezoneHelper::name('America/Winnipeg', 'en-CA'));
        self::assertSame('Central Time', TimezoneHelper::name('America/Chicago', 'en-CA'));
        self::assertSame('India Standard Time', TimezoneHelper::name('Asia/Kolkata', 'en-CA'));
        self::assertNotSame('Central Time', TimezoneHelper::name('America/Winnipeg', 'fr-CA'));
        self::assertSame('UTC', TimezoneHelper::name('UTC', 'fr-CA'));
        self::assertSame('UTC', TimezoneHelper::name('Etc/UTC', 'en-CA'));
    }

    public function testAbbreviationsUseTheBookingInstantIncludingBothOccurrencesOfAFold(): void
    {
        if (!class_exists(\IntlDateFormatter::class)) {
            self::markTestSkipped('Requires intl.');
        }
        foreach ([
            ['2026-01-15T15:00:00Z', 'CST'],
            ['2026-07-15T15:00:00Z', 'CDT'],
            ['2026-11-01T01:30:00-05:00', 'CDT'],
            ['2026-11-01T01:30:00-06:00', 'CST'],
        ] as [$date, $expected]) {
            self::assertSame($expected, TimezoneHelper::abbreviation($date, 'America/Winnipeg', 'en-CA'));
        }
        $date = new \DateTime('2026-07-15T15:00:00Z');
        self::assertSame('CDT', TimezoneHelper::abbreviation($date, 'America/Winnipeg', 'en-CA'));
        self::assertSame('2026-07-15T15:00:00+00:00', $date->format(\DATE_ATOM));
        self::assertSame('UTC', TimezoneHelper::abbreviation($date, 'UTC', 'en-CA'));
        self::assertStringContainsString('5:30', TimezoneHelper::abbreviation($date, 'Asia/Kolkata', 'de-DE'));
    }

    public function testBookingTemplatesCanUseBothTimezoneFilters(): void
    {
        if (!class_exists(\IntlDateFormatter::class)) {
            self::markTestSkipped('Requires intl.');
        }
        $twig = new Environment(new ArrayLoader(['timezone' => '{{ zone|calendarTimezoneName("en-CA") }} · {{ date|calendarTimezoneAbbreviation(zone, "en-CA") }}']));
        foreach ((new CalendarGlobalExtension())->getFilters() as $filter) {
            $twig->addFilter($filter);
        }
        self::assertSame('Central Time · CDT', $twig->render('timezone', ['zone' => 'America/Winnipeg', 'date' => '2026-07-15T15:00:00Z']));
        self::assertSame('Central Time · CST', $twig->render('timezone', ['zone' => 'America/Winnipeg', 'date' => '2026-01-15T15:00:00Z']));
    }
}
