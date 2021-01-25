<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\DatabaseHelper;

/**
 * @internal
 * @coversNothing
 */
class DatabaseHelperTest extends TestCase
{
    public function operatorDataProvider(): array
    {
        return [
            ['!= 1', '!=', '1'],
            ['string', '=', 'string'],
            [['5', '4', '3'], 'in', ['5', '4', '3']],
            ['not 1', 'NOT IN', ['1']],
            ['not 1,2,3', 'NOT IN', ['1', '2', '3']],
        ];
    }

    /**
     * Tests if passed values generate the desired operator and value set.
     *
     * @param string $input
     * @param mixed  $expectedValue
     *
     * @dataProvider operatorDataProvider
     */
    public function testOperators($input, string $expectedOperator, $expectedValue): void
    {
        list($operator, $value) = DatabaseHelper::prepareOperator($input);

        self::assertSame($expectedOperator, $operator);
        self::assertSame($expectedValue, $value);
    }
}
