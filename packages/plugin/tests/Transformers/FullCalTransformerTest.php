<?php

namespace Solspace\Tests\Unit\Calendar\Transformers;

use craft\base\FieldInterface;
use craft\fields\PlainText;
use craft\models\FieldLayout;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\OccurrenceContent;
use Solspace\Calendar\Transformers\FullCalTransformer;

/**
 * @internal
 *
 * @coversNothing
 */
class FullCalTransformerTest extends TestCase
{
    public function testPlainTextPreviewsKeepLiteralMarkupAndCollapseWhitespace(): void
    {
        $field = $this->getMockBuilder(PlainText::class)->disableOriginalConstructor()->getMock();

        self::assertSame(
            ['location' => 'Room <A> & B', 'description' => 'Bring shoes and water'],
            $this->getDetails($field, " Room <A> & B\n", "Bring shoes\n\tand water"),
        );
    }

    public function testRichTextPreviewsAreReadableTextAndAreBounded(): void
    {
        $field = $this->createMock(FieldInterface::class);
        $richText = new class implements \Stringable {
            public function __toString(): string
            {
                return '<p>First &amp; second</p><p>Third<br>Fourth</p>';
            }
        };

        self::assertSame(
            ['location' => 'First & second Third Fourth', 'description' => str_repeat('é', 300).'…'],
            $this->getDetails($field, $richText, str_repeat('é', 301)),
        );
    }

    public function testMissingMappingsAndNonTextValuesAreOmitted(): void
    {
        $field = $this->createMock(FieldInterface::class);

        self::assertSame(['location' => '', 'description' => ''], $this->getDetails(null, 'Old venue', 'Old summary'));
        self::assertSame(['location' => '', 'description' => ''], $this->getDetails($field, new \stdClass(), ['value']));
    }

    private function getDetails(?FieldInterface $field, mixed $location, mixed $description): array
    {
        $layout = $this->getMockBuilder(FieldLayout::class)->disableOriginalConstructor()->onlyMethods(['getFieldByHandle'])->getMock();
        $layout->method('getFieldByHandle')->willReturn($field);
        $calendar = new CalendarModel();
        $calendar->locationFieldHandle = 'venue';
        $calendar->descriptionFieldHandle = 'summary';
        $event = $this->getMockBuilder(Event::class)->disableOriginalConstructor()->onlyMethods(['getFieldLayout'])->getMock();
        $event->method('getFieldLayout')->willReturn($layout);
        $content = $this->getMockBuilder(OccurrenceContent::class)->disableOriginalConstructor()->onlyMethods(['getCalendar', 'getEvent', 'getFieldValue'])->getMock();
        $content->method('getCalendar')->willReturn($calendar);
        $content->method('getEvent')->willReturn($event);
        $content->method('getFieldValue')->willReturnMap([['venue', $location], ['summary', $description]]);

        $method = new \ReflectionMethod(FullCalTransformer::class, 'getDetails');

        return $method->invoke(new FullCalTransformer(), $content);
    }
}
