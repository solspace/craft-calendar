<?php

namespace Solspace\Tests\Unit\Calendar\Library\Events;

use craft\fieldlayoutelements\CustomField;
use craft\fields\Assets;
use craft\fields\Matrix;
use craft\fields\Number;
use craft\fields\PlainText;
use craft\models\FieldLayout;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Events\CalendarFieldMapper;
use yii\base\InvalidArgumentException;

/**
 * @internal @coversNothing
 *
 * @coversNothing
 */
class CalendarFieldMapperTest extends TestCase
{
    public function testIdentityIsReservedBeforeMatchingHandlesAndLabels(): void
    {
        $mapper = new CalendarFieldMapper();
        $source = $this->layout([
            $this->field('old-location', 1, 'venue', 'Location'),
            $this->field('old-description', 2, 'summary', 'Description'),
        ]);
        $target = $this->layout([
            $this->field('new-summary', 3, 'venue', 'Description'),
            $this->field('new-location', 1, 'renamedVenue', 'Venue'),
        ]);
        self::assertSame(['new-location' => 'old-location', 'new-summary' => 'old-description'], $mapper->suggest($source, $target));
    }

    public function testHandleAndUnambiguousLabelsAreSuggestedButSimilarWordsAreNotGuessed(): void
    {
        $mapper = new CalendarFieldMapper();
        $source = $this->layout([
            $this->field('a', 1, 'place', 'Location'),
            $this->field('b', 2, 'summary', 'Summary'),
        ]);
        $target = $this->layout([
            $this->field('c', 3, 'place', 'Venue'),
            $this->field('d', 4, 'details', ' SUMMARY '),
            $this->field('e', 5, 'notes', 'Summaries'),
        ]);
        self::assertSame(['c' => 'a', 'd' => 'b'], $mapper->suggest($source, $target));
    }

    public function testAmbiguousSameNameFieldsStayUnmapped(): void
    {
        $mapper = new CalendarFieldMapper();
        self::assertSame([], $mapper->suggest($this->layout([
            $this->field('a', 1, 'locationOne', 'Location'),
            $this->field('b', 2, 'locationTwo', 'Location'),
        ]), $this->layout([$this->field('c', 3, 'venue', 'Location')])));
    }

    public function testAmbiguousDestinationLabelsAreNotMappedByTheirOrder(): void
    {
        $mapper = new CalendarFieldMapper();
        self::assertSame([], $mapper->suggest($this->layout([$this->field('a', 1, 'venue', 'Location')]), $this->layout([
            $this->field('b', 2, 'locationOne', 'Location'),
            $this->field('c', 3, 'locationTwo', 'Location'),
        ])));
    }

    public function testOwnedContentAndRelationsRequireTheActualSameField(): void
    {
        $mapper = new CalendarFieldMapper();
        foreach ([Matrix::class, Assets::class] as $class) {
            self::assertFalse($mapper->compatible($this->field('a', 1, 'x', 'X', $class), $this->field('b', 2, 'x', 'X', $class)));
            self::assertTrue($mapper->compatible($this->field('a', 1, 'x', 'X', $class), $this->field('b', 1, 'y', 'Y', $class)));
        }
        self::assertFalse($mapper->compatible($this->field('a', 1, 'x', 'X'), $this->field('b', 2, 'x', 'X', Number::class)));
    }

    public function testManualMappingCanUseCompatibleDifferentlyNamedFields(): void
    {
        $mapper = new CalendarFieldMapper();
        self::assertSame(['b' => 'a'], $mapper->validate(['b' => 'a', 'c' => ''], $this->layout([$this->field('a', 1, 'venue', 'Venue')]), $this->layout([
            $this->field('b', 2, 'location', 'Location'), $this->field('c', 3, 'description', 'Description'),
        ])));
    }

    /** @dataProvider invalidMappings */
    public function testInvalidOrDuplicateMappingsAreRejected(array $mapping): void
    {
        $mapper = new CalendarFieldMapper();
        $this->expectException(InvalidArgumentException::class);
        $mapper->validate($mapping, $this->layout([$this->field('a', 1, 'venue', 'Venue')]), $this->layout([
            $this->field('b', 2, 'location', 'Location'), $this->field('c', 3, 'description', 'Description'),
            $this->field('number', 4, 'capacity', 'Capacity', Number::class),
        ]));
    }

    public static function invalidMappings(): array
    {
        return [
            'unknown source' => [['b' => 'missing']],
            'unknown target' => [['missing' => 'a']],
            'duplicate source' => [['b' => 'a', 'c' => 'a']],
            'wrong type' => [['number' => 'a']],
            'array value' => [['b' => ['a']]],
        ];
    }

    private function field(string $uid, int $id, string $handle, string $label, string $class = PlainText::class): mixed
    {
        $field = $this->getMockBuilder($class)->disableOriginalConstructor()->onlyMethods(['getSettings'])->getMock();
        $field->id = $id;
        $field->handle = $handle;
        $field->name = $label;
        $field->method('getSettings')->willReturn([]);
        $element = $this->getMockBuilder(CustomField::class)->disableOriginalConstructor()->onlyMethods(['label'])->getMock();
        $element->uid = $uid;
        $element->method('label')->willReturn($label);
        $field->layoutElement = $element;

        return $field;
    }

    private function layout(array $fields): FieldLayout
    {
        $layout = $this->getMockBuilder(FieldLayout::class)->disableOriginalConstructor()->onlyMethods(['getCustomFields'])->getMock();
        $layout->method('getCustomFields')->willReturn($fields);

        return $layout;
    }
}
