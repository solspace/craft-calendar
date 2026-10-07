<?php

namespace Solspace\Tests\Unit\Calendar\Models;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\OccurrenceModel;

/**
 * @internal
 *
 * @coversNothing
 */
class OccurrenceModelTest extends TestCase
{
    public function testIdMatchesOccurrenceKey(): void
    {
        $model = $this->makeModel(recurrenceId: '2026-04-15 00:00:00', startDate: '2026-04-15 00:00:00');

        self::assertSame('14-20260415000000', $model->getId());
        self::assertSame('14-20260415000000', $model->getOccurrenceKey());
    }

    public function testSlugIsTheDateFollowedByTheCode(): void
    {
        $model = $this->makeModel(recurrenceId: '2026-10-14 10:00:00', startDate: '2026-10-14 10:00:00');

        self::assertSame('2026-10-14-fq4yk', $model->getSlug());
    }

    public function testMovedOccurrenceKeepsItsIdButNotItsSlug(): void
    {
        $model = $this->makeModel(recurrenceId: '2026-10-14 10:00:00', startDate: '2026-10-15 18:30:00');

        self::assertSame('14-20261014100000', $model->getId());
        self::assertSame('2026-10-15-fq4yk', $model->getSlug());
    }

    private function makeModel(string $recurrenceId, string $startDate): OccurrenceModel
    {
        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods([])
            ->getMock()
        ;
        $event->id = 14;

        $model = new OccurrenceModel();
        $model->event = $event;
        $model->code = 'fq4yk';
        $model->recurrenceId = new Carbon($recurrenceId, 'UTC');
        $model->startDate = new Carbon($startDate, 'UTC');

        return $model;
    }
}
