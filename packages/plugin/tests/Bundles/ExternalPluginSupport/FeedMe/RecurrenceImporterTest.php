<?php

namespace Solspace\Tests\Unit\Calendar\Bundles\ExternalPluginSupport\FeedMe;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Bundles\ExternalPluginSupport\FeedMe\RecurrenceImporter;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\RRule\EventRecurrenceValidator;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Bundles\ExternalPluginSupport\FeedMe\RecurrenceImporter
 */
class RecurrenceImporterTest extends TestCase
{
    public function testSelectedDatesKeepTheEventTimeAndIncludeEachDayOnce(): void
    {
        $event = $this->event();
        (new RecurrenceImporter())->apply($event, ['FREQ' => 'SELECT_DATES'], true, null, [
            new Carbon('2026-10-29', 'UTC'),
            new Carbon('2026-10-30', 'UTC'),
            new Carbon('2026-10-30 18:00:00', 'UTC'),
        ]);

        self::assertSame(['2026-10-29 09:30:00', '2026-10-30 09:30:00'], $this->dates($event));
        self::assertSame('2026-10-29 09:30:00', $event->startDate->toDateTimeString());
        self::assertSame('NEVER', $event->repeatType);
        self::assertStringNotContainsString('FREQ=SELECT_DATES', $event->rrule);
        self::assertSame([], (new EventRecurrenceValidator())->validate($event->repeatType, $event->repeatEndType, $event->rrule));
    }

    public function testFullImportedRuleReplacesOldModifiersAndEndDate(): void
    {
        $event = $this->event("DTSTART:20261029T093000\nRRULE:FREQ=WEEKLY;INTERVAL=3;BYDAY=TH;UNTIL=20261231T235959");
        $event->until = new Carbon('2026-12-31', 'UTC');
        (new RecurrenceImporter())->apply($event, [], true, 'FREQ=DAILY;COUNT=2', null);

        self::assertSame('DAILY', $event->repeatType);
        self::assertSame('AFTER', $event->repeatEndType);
        self::assertNull($event->until);
        self::assertStringNotContainsString('UNTIL', $event->rrule);
        self::assertStringNotContainsString('BYDAY', $event->rrule);
        self::assertStringNotContainsString('INTERVAL=3', $event->rrule);
        self::assertSame(['2026-10-29 09:30:00', '2026-10-30 09:30:00'], $this->dates($event));
    }

    public function testUnmappedRuleAndDatesArePreserved(): void
    {
        $rule = "DTSTART:20261029T093000\nRDATE:20261029T093000,20261103T093000";
        $event = $this->event($rule);
        (new RecurrenceImporter())->apply($event, [], false, null, null);

        self::assertSame($rule, $event->rrule);
    }

    public function testBlankMappedDatesRemovePreviousSelections(): void
    {
        $event = $this->event("DTSTART:20261029T093000\nRDATE:20261103T093000");
        (new RecurrenceImporter())->apply($event, [], false, null, []);

        self::assertSame(['2026-10-29 09:30:00'], $this->dates($event));
    }

    public function testBlankMappedRuleClearsRecurrence(): void
    {
        $event = $this->event("DTSTART:20261029T093000\nRRULE:FREQ=DAILY;COUNT=2");
        $event->repeatType = 'DAILY';
        $event->repeatEndType = 'AFTER';
        (new RecurrenceImporter())->apply($event, [], true, null, null);

        self::assertNull($event->rrule);
        self::assertSame('NEVER', $event->repeatType);
        self::assertSame('NEVER', $event->repeatEndType);
    }

    public function testLegacyMappingsBuildACompleteV6Rule(): void
    {
        $event = $this->event();
        (new RecurrenceImporter())->apply($event, ['FREQ' => 'WEEKLY', 'INTERVAL' => '2', 'COUNT' => '2', 'BYDAY' => 'TH'], false, null, null);

        self::assertSame('WEEKLY', $event->repeatType);
        self::assertSame('AFTER', $event->repeatEndType);
        self::assertSame(['2026-10-29 09:30:00', '2026-11-12 09:30:00'], $this->dates($event));
    }

    public function testLegacySelectedDatesMappingPreservesUnmappedDates(): void
    {
        $event = $this->event("DTSTART:20261029T093000\nRDATE:20261103T093000");
        (new RecurrenceImporter())->apply($event, ['FREQ' => 'SELECT_DATES'], false, null, null);

        self::assertSame(['2026-10-29 09:30:00', '2026-11-03 09:30:00'], $this->dates($event));
    }

    public function testEmptyMappedRuleDoesNotEraseUnmappedLegacySelectedDates(): void
    {
        $event = $this->event("DTSTART:20261029T093000\nRDATE:20261103T093000");
        (new RecurrenceImporter())->apply($event, ['FREQ' => 'SELECT_DATES'], true, null, null);

        self::assertSame(['2026-10-29 09:30:00', '2026-11-03 09:30:00'], $this->dates($event));
    }

    public function testAllDayDatesUseDateOnlyRecurrenceValues(): void
    {
        $event = $this->event();
        $event->allDay = true;
        (new RecurrenceImporter())->apply($event, [], false, null, [new Carbon('2026-11-03', 'UTC')]);

        self::assertStringContainsString('DTSTART:20261029', $event->rrule);
        self::assertStringContainsString('RDATE;VALUE=DATE:20261029,20261103', $event->rrule);
        self::assertStringNotContainsString('T093000', $event->rrule);
    }

    public function testRepeatedImportsDontShareRecurrenceModifiers(): void
    {
        $importer = new RecurrenceImporter();
        $first = $this->event();
        $second = $this->event();
        $importer->apply($first, [], true, 'FREQ=WEEKLY;INTERVAL=3;UNTIL=20261231T235959', null);
        $importer->apply($second, [], true, 'FREQ=DAILY;COUNT=2', null);

        self::assertStringNotContainsString('UNTIL', $second->rrule);
        self::assertStringNotContainsString('INTERVAL=3', $second->rrule);
        self::assertSame('AFTER', $second->repeatEndType);
    }

    public function testInvalidRulesDoNotOverwriteTheSavedSchedule(): void
    {
        $rule = "DTSTART:20261029T093000\nRRULE:FREQ=DAILY;COUNT=2";
        $event = $this->event($rule);

        try {
            (new RecurrenceImporter())->apply($event, [], true, 'FREQ=INVALID', null);
            self::fail('Invalid rules must fail the import.');
        } catch (\InvalidArgumentException) {
            self::assertSame($rule, $event->rrule);
        }
    }

    private function event(?string $rrule = null): Event
    {
        $event = $this->getMockBuilder(Event::class)->disableOriginalConstructor()->onlyMethods([])->getMock();
        $event->startDate = new Carbon('2026-10-29 09:30:00', 'UTC');
        $event->endDate = new Carbon('2026-10-29 10:30:00', 'UTC');
        $event->allDay = false;
        $event->rrule = $rrule;

        return $event;
    }

    private function dates(Event $event): array
    {
        return array_map(static fn (\DateTimeInterface $date) => $date->format('Y-m-d H:i:s'), $event->getOccurrenceDatesBetween());
    }
}
