<?php

namespace Solspace\Tests\Unit\Calendar\Models;

use craft\fields\Number;
use craft\fields\PlainText;
use craft\models\FieldLayout;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Models\CalendarModel;

/**
 * @internal
 *
 * @coversNothing
 */
class CalendarQuickCreateFieldsTest extends TestCase
{
    public function testOnlyMappedTextFieldsInTheCalendarLayoutAreExposed(): void
    {
        $text = $this->getMockBuilder(PlainText::class)->disableOriginalConstructor()->getMock();
        $number = $this->getMockBuilder(Number::class)->disableOriginalConstructor()->getMock();
        $layout = $this->getMockBuilder(FieldLayout::class)->disableOriginalConstructor()->onlyMethods(['getFieldByHandle'])->getMock();
        $layout->method('getFieldByHandle')->willReturnMap([
            ['venue', $text],
            ['summary', $text],
            ['quantity', $number],
            ['deleted', null],
        ]);
        $calendar = $this->getMockBuilder(CalendarModel::class)->disableOriginalConstructor()->onlyMethods(['getFieldLayout'])->getMock();
        $calendar->method('getFieldLayout')->willReturn($layout);

        self::assertSame([], $calendar->getQuickCreateFieldHandles());

        $calendar->locationFieldHandle = 'venue';
        $calendar->descriptionFieldHandle = 'summary';
        self::assertSame(['location' => 'venue', 'description' => 'summary'], $calendar->getQuickCreateFieldHandles());

        $calendar->descriptionFieldHandle = 'quantity';
        self::assertSame(['location' => 'venue'], $calendar->getQuickCreateFieldHandles());
        self::assertSame('quantity', $calendar->descriptionFieldHandle);

        $calendar->locationFieldHandle = 'deleted';
        self::assertSame([], $calendar->getQuickCreateFieldHandles());
    }

    public function testMissingFieldLayoutsDoNotExposeInputs(): void
    {
        $calendar = $this->getMockBuilder(CalendarModel::class)->disableOriginalConstructor()->onlyMethods(['getFieldLayout'])->getMock();
        $calendar->method('getFieldLayout')->willReturn(null);
        $calendar->locationFieldHandle = 'venue';
        $calendar->descriptionFieldHandle = 'summary';

        self::assertSame([], $calendar->getQuickCreateFieldHandles());
    }
}
