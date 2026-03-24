<?php

namespace Solspace\Tests\Unit\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceList;
use Solspace\Calendar\Models\OccurrenceModel;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Bundles\Occurrences\OccurrenceList
 */
class OccurrenceListTest extends TestCase
{
    public function testDefaultsToAnEmptyList(): void
    {
        $list = new OccurrenceList();

        self::assertSame([], $list->getOccurrences());
    }

    public function testSupportsArrayAccessAndIteration(): void
    {
        $first = new OccurrenceModel();
        $second = new OccurrenceModel();
        $replacement = new OccurrenceModel();

        $list = new OccurrenceList([$first]);
        $list[] = $second;
        $list[0] = $replacement;

        self::assertTrue(isset($list[0]));
        self::assertSame($replacement, $list[0]);
        self::assertSame($second, $list[1]);

        $iterated = [];
        foreach ($list as $occurrence) {
            $iterated[] = $occurrence;
        }

        self::assertSame([$replacement, $second], $iterated);

        unset($list[1]);

        self::assertFalse(isset($list[1]));
        self::assertNull($list[1]);
    }

    public function testRejectsInvalidArrayAccessValues(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        $list = new OccurrenceList();
        $list[] = new \stdClass();
    }

    public function testFilterRangeKeepsOccurrencesThatOverlapTheRange(): void
    {
        $spanningOccurrence = $this->createOccurrence('2026-03-25 23:00:00', '2026-03-26 01:00:00');
        $insideOccurrence = $this->createOccurrence('2026-03-26 10:00:00', '2026-03-26 11:00:00');
        $outsideOccurrence = $this->createOccurrence('2026-03-27 10:00:00', '2026-03-27 11:00:00');

        $list = new OccurrenceList([$spanningOccurrence, $insideOccurrence, $outsideOccurrence]);

        $filtered = $list->filterRange(
            new Carbon('2026-03-26 00:00:00', 'UTC'),
            new Carbon('2026-03-27 00:00:00', 'UTC')
        );

        self::assertSame([$spanningOccurrence, $insideOccurrence], array_values($filtered->getOccurrences()));
    }

    public function testFilterRangeExcludesOccurrencesThatOnlyTouchTheRangeBoundary(): void
    {
        $boundaryOccurrence = $this->createOccurrence('2026-03-25 23:00:00', '2026-03-26 00:00:00');

        $list = new OccurrenceList([$boundaryOccurrence]);

        $filtered = $list->filterRange(
            new Carbon('2026-03-26 00:00:00', 'UTC'),
            new Carbon('2026-03-27 00:00:00', 'UTC')
        );

        self::assertSame([], $filtered->getOccurrences());
    }

    private function createOccurrence(string $start, string $end): OccurrenceModel
    {
        $occurrence = new OccurrenceModel();
        $occurrence->startDate = new Carbon($start, 'UTC');
        $occurrence->endDate = new Carbon($end, 'UTC');

        return $occurrence;
    }
}
