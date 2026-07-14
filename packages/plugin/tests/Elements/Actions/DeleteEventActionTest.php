<?php

namespace Solspace\Tests\Unit\Calendar\Elements\Actions;

use craft\elements\actions\DeleteActionInterface;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Actions\DeleteEventAction;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Elements\Actions\DeleteEventAction
 */
class DeleteEventActionTest extends TestCase
{
    public function testSupportsHardDeleteMode(): void
    {
        $action = new DeleteEventAction();

        self::assertInstanceOf(DeleteActionInterface::class, $action);
        self::assertTrue($action->canHardDelete());
        self::assertFalse($action->hard);

        $action->setHardDelete();

        self::assertTrue($action->hard);
    }
}
