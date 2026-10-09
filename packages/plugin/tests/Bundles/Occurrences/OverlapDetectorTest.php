<?php

namespace Solspace\Tests\Unit\Calendar\Bundles\Occurrences;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Bundles\Occurrences\OverlapDetector;

/**
 * @internal
 * @covers \Solspace\Calendar\Bundles\Occurrences\OverlapDetector
 */
class OverlapDetectorTest extends TestCase
{
    public function testOverlapIncludesContainmentButNotTouchingOrOtherCalendars(): void
    {
        $target = $this->interval('target', 10, 20);
        $result = (new OverlapDetector())->detect([$target], [
            $target,
            $this->interval('before', 0, 10),
            $this->interval('after', 20, 30),
            $this->interval('other-calendar', 12, 18, 2),
            $this->interval('contains', 0, 30),
            $this->interval('contained', 11, 12),
            $this->interval('partial', 19, 21),
            $this->interval('empty', 12, 12),
        ]);
        self::assertSame(3, $result['target']['count']);
        self::assertSame(['contains', 'contained', 'partial'], array_column($result['target']['events'], 'id'));
    }

    public function testDifferentOccurrencesOfOneEventCanConflict(): void
    {
        $targets = [$this->interval('42-20261014100000', 10, 30), $this->interval('42-20261015100000', 20, 40)];
        $result = (new OverlapDetector())->detect($targets, $targets);
        self::assertSame(1, $result[$targets[0]['id']]['count']);
        self::assertSame(1, $result[$targets[1]['id']]['count']);
    }

    public function testCapsDetailsWithoutLosingConflictCount(): void
    {
        $candidates = [];
        for ($i = 0; $i < 10; ++$i) {
            $candidates[] = $this->interval('conflict-'.$i, 12, 18);
        }
        $result = (new OverlapDetector())->detect([$this->interval('target', 10, 20)], $candidates);
        self::assertSame(10, $result['target']['count']);
        self::assertCount(5, $result['target']['events']);
    }

    public function testEmptyAndInvalidTargetsHaveNoConflicts(): void
    {
        $detector = new OverlapDetector();
        self::assertSame([], $detector->detect([], []));
        self::assertSame([], $detector->detect([$this->interval('invalid', 20, 10)], [$this->interval('candidate', 0, 30)]));
    }

    private function interval(string $id, int $start, int $end, int $calendarId = 1): array
    {
        return compact('id', 'start', 'end', 'calendarId');
    }
}
