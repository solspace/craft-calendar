<?php

namespace Solspace\Tests\Unit\Calendar\Services;

use Carbon\Carbon;
use craft\db\Connection;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Elements\OccurrenceOverride;
use Solspace\Calendar\Services\OccurrencesService;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Bundles\Occurrences\OverrideReconciler
 * @covers \Solspace\Calendar\Services\OccurrencesService
 */
class OccurrencePreviewTest extends TestCase
{
    public function testUnsavedShiftProjectsInheritedTimesButKeepsOwnTimesAndOriginalIdentities(): void
    {
        $previousApp = \Craft::$app;
        $db = new Connection(['dsn' => 'sqlite::memory:']);
        \Craft::$app = new class($db) {
            public function __construct(private Connection $db) {}

            public function getDb(): Connection
            {
                return $this->db;
            }
        };

        try {
            $db->createCommand('CREATE TABLE calendar_events_occurrences (eventId INTEGER, recurrenceId TEXT)')->execute();
            $db->createCommand('CREATE TABLE calendar_events_occurrence_windows (eventId INTEGER, generatedThrough TEXT)')->execute();
            foreach (['2026-10-06 10:00:00', '2026-10-13 10:00:00', '2026-10-20 10:00:00'] as $id) {
                $db->createCommand()->insert('calendar_events_occurrences', ['eventId' => 12, 'recurrenceId' => $id])->execute();
            }

            $event = $this->getMockBuilder(Event::class)->disableOriginalConstructor()->onlyMethods(['getCanonicalId'])->getMock();
            $event->method('getCanonicalId')->willReturn(12);
            $event->id = 34;
            $event->startDate = new Carbon('2026-10-07 10:00:00', 'UTC');
            $event->endDate = new Carbon('2026-10-07 12:00:00', 'UTC');
            $event->rrule = "DTSTART:20261007T100000\nRRULE:FREQ=WEEKLY;COUNT=3";
            $event->repeatType = 'WEEKLY';

            $inherited = $this->override('2026-10-13 10:00:00');
            $ownTimes = $this->override('2026-10-20 10:00:00');
            $ownTimes->startDate = new Carbon('2026-10-24 18:00:00', 'UTC');
            $ownTimes->endDate = new Carbon('2026-10-24 19:00:00', 'UTC');
            $ownTimes->allDay = false;
            $alreadyOnNewSchedule = $this->override('2026-10-14 10:00:00');
            $orphan = $this->override('2026-10-27 10:00:00');
            $orphan->orphaned = true;
            $service = $this->getMockBuilder(OccurrencesService::class)->onlyMethods(['getOverrides'])->getMock();
            $service->method('getOverrides')->willReturn([$inherited, $ownTimes, $alreadyOnNewSchedule, $orphan]);
            $preview = $service->previewSchedule($event);

            self::assertSame(86400, $preview['shift']);
            self::assertSame(['2026-10-27 10:00:00'], $preview['orphaned']);
            self::assertSame('2026-10-14 10:00:00', $preview['occurrences'][0]['scheduleRecurrenceId']);
            self::assertSame('2026-10-13 10:00:00', $preview['occurrences'][0]['recurrenceId']);
            self::assertSame((new Carbon('2026-10-14 10:00:00', 'UTC'))->timestamp, $preview['occurrences'][0]['start']);
            self::assertSame((new Carbon('2026-10-14 12:00:00', 'UTC'))->timestamp, $preview['occurrences'][0]['end']);
            self::assertSame($ownTimes->startDate->timestamp, $preview['occurrences'][1]['start']);
            self::assertSame('2026-10-14 10:00:00', $preview['occurrences'][2]['scheduleRecurrenceId']);
            self::assertSame('2026-10-13 10:00:00', $inherited->recurrenceId->format('Y-m-d H:i:s'));
            self::assertSame(3, (int) $db->createCommand('SELECT COUNT(*) FROM calendar_events_occurrences')->queryScalar());
        } finally {
            $db->close();
            \Craft::$app = $previousApp;
        }
    }

    private function override(string $id): OccurrenceOverride
    {
        $override = (new \ReflectionClass(OccurrenceOverride::class))->newInstanceWithoutConstructor();
        $override->recurrenceId = new Carbon($id, 'UTC');

        return $override;
    }
}
