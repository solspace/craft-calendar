<?php

namespace Solspace\Tests\Unit\Calendar\Library\Configurations;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Configurations\CalendarConfiguration;
use Solspace\Calendar\Library\Exceptions\ConfigurationException;
use Solspace\Calendar\Library\Helpers\DateHelper;

/**
 * @internal
 *
 * @coversNothing
 */
class CalendarConfigurationTest extends TestCase
{
    /**
     * @dataProvider carbonDataProvider
     *
     * @throws \ReflectionException
     * @throws ConfigurationException
     */
    public function testCastToCarbon(Carbon|\DateTime|string|null $input, ?Carbon $expectedOutput)
    {
        $config = new TestConfig(['carbon' => $input]);
        $this->assertEquals($expectedOutput, $config->getCarbon());
    }

    public function carbonDataProvider(): array
    {
        return [
            [null, null],
            [new Carbon('2017-01-01 12:00:00', DateHelper::UTC), new Carbon('2017-01-01 12:00:00', DateHelper::UTC)],
            [new \DateTime('2017-01-01 12:00:00'), new Carbon('2017-01-01 12:00:00', DateHelper::UTC)],
            ['2017-01-01 12:00:00', new Carbon('2017-01-01 12:00:00', DateHelper::UTC)],
        ];
    }
}

class TestConfig extends CalendarConfiguration
{
    protected Carbon|\DateTime|string|null $carbon = null;

    public function getCarbon(): ?Carbon
    {
        return $this->castToCarbon($this->carbon);
    }
}
