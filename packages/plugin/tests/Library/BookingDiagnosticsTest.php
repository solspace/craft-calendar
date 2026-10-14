<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use craft\db\Connection;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Models\SchedulingSettings;
use Solspace\Calendar\Services\DiagnosticsService;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;

/** @coversNothing */
class BookingDiagnosticsTest extends TestCase
{
    public function testBookingCountsExcludeDeletedDraftRevisionAndMissingElements(): void
    {
        if (!\extension_loaded('pdo_sqlite')) {
            self::markTestSkipped('Requires PDO SQLite.');
        }
        $previousApp = \Craft::$app;
        $db = new Connection(['dsn' => 'sqlite::memory:', 'enableLogging' => false, 'enableProfiling' => false]);

        try {
            \Craft::$app = new class($db) {
                public function __construct(public Connection $db) {}

                public function get($id, $throw = true)
                {
                    return null;
                }

                public function getDb(): Connection
                {
                    return $this->db;
                }
            };
            $db->createCommand()->createTable('elements', ['id' => 'integer PRIMARY KEY', 'dateDeleted' => 'datetime', 'draftId' => 'integer', 'revisionId' => 'integer'])->execute();
            $db->createCommand()->createTable('calendar_bookings', ['id' => 'integer PRIMARY KEY', 'calendarId' => 'integer', 'bookingStatus' => 'string'])->execute();
            foreach ([1 => [], 2 => [], 3 => [], 4 => ['dateDeleted' => '2026-10-11'], 5 => ['draftId' => 1], 6 => ['revisionId' => 1], 8 => [], 9 => []] as $id => $attributes) {
                $db->createCommand()->insert('elements', ['id' => $id, ...$attributes])->execute();
            }
            foreach ([1 => [10, 'requested'], 2 => [10, 'confirmed'], 3 => [20, 'requested'], 4 => [10, 'confirmed'], 5 => [10, 'requested'], 6 => [10, 'confirmed'], 7 => [10, 'confirmed'], 8 => [10, 'declined'], 9 => [10, 'cancelled']] as $id => [$calendarId, $status]) {
                $db->createCommand()->insert('calendar_bookings', ['id' => $id, 'calendarId' => $calendarId, 'bookingStatus' => $status])->execute();
            }
            $counts = (new \ReflectionMethod(DiagnosticsService::class, 'bookingCounts'))->invoke(new DiagnosticsService());
            self::assertSame(['cancelled' => 1, 'confirmed' => 1, 'declined' => 1, 'requested' => 1], $counts[10]);
            self::assertSame(['requested' => 1], $counts[20]);
            $db->createCommand()->delete('calendar_bookings')->execute();
            self::assertSame([], (new \ReflectionMethod(DiagnosticsService::class, 'bookingCounts'))->invoke(new DiagnosticsService()));
        } finally {
            $db->close();
            \Craft::$app = $previousApp;
        }
    }

    public function testInvalidRulesAndAvailabilityDatesHaveActionableStatuses(): void
    {
        $rows = $this->rules(new SchedulingSettings(['timezone' => 'invalid/timezone', 'increment' => 0, 'availableFrom' => '2026-10-20', 'availableUntil' => '2026-10-10']));
        self::assertSame('error', $rows['Booking Timezone']['status']);
        self::assertSame('error', $rows['Start-Time Interval (Minutes)']['status']);
        self::assertSame('error', $rows['Available Until']['status']);
        self::assertNotEmpty($rows['Available Until']['note']);
        $settings = new SchedulingSettings(['timezone' => 'America/Winnipeg', 'availableUntil' => '2026-10-10', 'notificationEmail' => 'staff@example.test']);
        // Before midnight in Winnipeg, the inclusive end date is still valid.
        $rows = $this->rules($settings, new \DateTimeImmutable('2026-10-11T04:59:00Z'));
        self::assertSame('none', $rows['Available Until']['status']);
        $rows = $this->rules($settings, new \DateTimeImmutable('2026-10-11T05:00:00Z'));
        self::assertSame('warning', $rows['Available Until']['status']);
        self::assertStringNotContainsString('staff@example.test', json_encode($rows));
        $settings->active = false;
        self::assertSame('none', $this->rules($settings)['Available Until']['status']);
        self::assertSame('disabled', $this->rules($settings)['Active']['status']);
    }

    public function testOpeningExceptionsAndInactiveCalendarsAvoidFalseWarnings(): void
    {
        $settings = new SchedulingSettings(['hours' => [], 'exceptions' => [['type' => 'closed', 'dateFrom' => '2026-10-12', 'dateTo' => '2026-10-13']]]);
        self::assertSame('warning', $this->rules($settings)['Availability Rules']['status']);
        $settings->exceptions = [['type' => 'hours', 'dateFrom' => '2026-10-12', 'dateTo' => '2026-10-13', 'start' => '09:00', 'end' => '12:00']];
        self::assertArrayNotHasKey('Availability Rules', $this->rules($settings));
        $settings->exceptions = [];
        $settings->active = false;
        self::assertArrayNotHasKey('Availability Rules', $this->rules($settings));
        $rows = $this->rules(new SchedulingSettings(), null, true);
        self::assertArrayNotHasKey('Booking Timezone', $rows);
        self::assertArrayNotHasKey('Allow Guest Bookings', $rows);
        self::assertArrayNotHasKey('Availability Exceptions', $rows);
    }

    public function testDiagnosticTemplateShowsBookingDetailsAndHidesEventOnlySettings(): void
    {
        $source = file_get_contents(__DIR__.'/../../src/templates/settings/_diagnostics.twig');
        $twig = new Environment(new ArrayLoader(['diagnostics' => $source, 'calendar/layouts/_settings' => '{% block actionButton %}{% endblock %}{% block content %}{% endblock %}']), ['strict_variables' => true]);
        $twig->addFilter(new TwigFilter('t', static fn ($message, $category, $params = []) => strtr($message, array_combine(array_map(static fn ($key) => '{'.$key.'}', array_keys($params)), array_values($params)))));
        $rows = $this->rules(new SchedulingSettings(['hours' => []]));
        $rows['Handle'] = ['value' => 'room', 'status' => 'none', 'note' => null, 'isBoolean' => false];
        $rows['Bookings'] = ['value' => '7', 'status' => 'none', 'note' => null, 'isBoolean' => false];
        $bookingCalendar = ['title' => '<Room>', 'issueCount' => 1, 'issueNotes' => 'No booking times are available', 'cells' => $rows];
        $calendar = ['title' => 'Events Only', 'handle' => 'events', 'eventCount' => 999, 'timezoneValid' => true, 'siteNames' => 'Main Site', 'siteCount' => 1, 'timezone' => 'Floating', 'repeatingEnabled' => true, 'repeating' => 'Enabled', 'guestAccessEnabled' => false, 'guestAccessLabel' => 'Disabled', 'icsSharingEnabled' => false, 'icsSharingLabel' => 'Disabled'];
        $html = $twig->render('diagnostics', ['sampledAt' => '2026-10-11', 'columns' => [], 'errorCount' => 0, 'advisoryCount' => 1, 'calendars' => [$calendar], 'calendarWarningCount' => 0, 'bookingCalendars' => [$bookingCalendar], 'bookingColumns' => ['Handle', 'Bookings', 'Active', 'Booking Timezone', 'Opening Hours'], 'bookingWarningCount' => 1, 'report' => 'Booking Configuration']);
        self::assertStringContainsString('Booking Calendar Details (1)', $html);
        self::assertStringContainsString('&lt;Room&gt;', $html);
        self::assertStringContainsString('No booking times are available', $html);
        self::assertStringContainsString('Event Calendar Details (1)', $html);
        self::assertStringContainsString('999', $html);
        self::assertStringNotContainsString('calendar.timezone', $html);
        $dom = new \DOMDocument();
        @$dom->loadHTML('<meta charset="utf-8">'.$html);
        $xpath = new \DOMXPath($dom);
        self::assertSame(1, $xpath->query('//div[contains(@class,"calendar-diag-booking-table")]/table/tbody/tr')->length);
        self::assertSame(1, $xpath->query('//div[contains(@class,"calendar-diag-booking-table")]//td[normalize-space(.)="7"]')->length);
        self::assertSame(1, $xpath->query('//details[not(@open)]/div[contains(@class,"calendar-diag-booking-table")]')->length);
        self::assertSame(0, $xpath->query('//details[contains(@class,"calendar-diag-calendars")]//strong[text()="<Room>"]')->length);
        self::assertSame(0, $xpath->query('//div[contains(@class,"calendar-diag-booking-table")]//td[text()="Floating"]')->length);
    }

    private function rules(SchedulingSettings $settings, ?\DateTimeImmutable $now = null, bool $defaults = false): array
    {
        $row = static fn (string $label, mixed $value, string $status = 'none', ?string $note = null, bool $isBoolean = false) => ['label' => $label, 'value' => (string) $value, 'status' => $status, 'note' => $note, 'isBoolean' => $isBoolean, 'isCode' => false, 'isProduct' => false, 'statusLabel' => $status];
        $rows = (new \ReflectionMethod(DiagnosticsService::class, 'bookingRulesRows'))->invoke(new DiagnosticsService(), $settings, $row, $now ?? new \DateTimeImmutable('2026-10-11T12:00:00Z'), $defaults);

        return array_column($rows, null, 'label');
    }
}
