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
        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods([])
            ->getMock()
        ;
        $event->id = 14;

        $model = new OccurrenceModel();
        $model->event = $event;
        $model->startDate = new Carbon('2026-04-15 00:00:00', 'UTC');

        self::assertSame('14-20260415000000', $model->getId());
        self::assertSame('14-20260415000000', $model->getOccurrenceKey());
    }
}
