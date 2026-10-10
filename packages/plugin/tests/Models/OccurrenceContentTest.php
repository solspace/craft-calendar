<?php

namespace Solspace\Tests\Unit\Calendar\Models;

use craft\base\FieldInterface;
use craft\models\FieldLayout;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\OccurrenceContent;

/**
 * Occurrences with an override are covered by the integration checks; overrides need Craft 5 to load.
 *
 * @internal
 *
 * @covers \Solspace\Calendar\Models\OccurrenceContent
 */
class OccurrenceContentTest extends TestCase
{
    public function testWithoutAnOverrideEverythingComesFromTheEvent(): void
    {
        $event = $this->makeEvent();
        $content = new OccurrenceContent($event);

        self::assertSame('Yoga', $content->getTitle());
        self::assertSame('Yoga', $content->title);
        self::assertTrue(isset($content->title));
        self::assertFalse($content->isOverridden('title'));
        self::assertSame([], $content->getOverriddenFields());
        self::assertSame($event, $content->getSourceElement('title'));
    }

    public function testOtherPropertiesFallBackToTheEvent(): void
    {
        $content = new OccurrenceContent($this->makeEvent());

        self::assertSame(14, $content->id);
        self::assertTrue(isset($content->id));
    }

    public function testObjectFieldValuesAreCopies(): void
    {
        $value = new \ArrayObject(['speaker']);

        $layout = $this->createMock(FieldLayout::class);
        $layout->method('getFieldByHandle')->willReturn($this->createMock(FieldInterface::class));

        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getFieldLayout', 'getFieldValue'])
            ->getMock()
        ;
        $event->method('getFieldLayout')->willReturn($layout);
        $event->method('getFieldValue')->willReturn($value);

        $content = new OccurrenceContent($event);

        self::assertEquals($value, $content->speakers);
        self::assertNotSame($value, $content->speakers);
        self::assertNotSame($value, $content['speakers']);
        self::assertSame($value, $content->getFieldValue('speakers'));
    }

    private function makeEvent(): Event
    {
        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getFieldLayout'])
            ->getMock()
        ;
        $event->method('getFieldLayout')->willReturn(null);
        $event->id = 14;
        $event->title = 'Yoga';

        return $event;
    }
}
