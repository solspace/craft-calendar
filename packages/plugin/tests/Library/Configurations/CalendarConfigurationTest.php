<?php
/**
 * Created by PhpStorm.
 * User: gustavs
 * Date: 26/02/2018
 * Time: 13:24.
 */

namespace Solspace\Tests\Unit\Calendar\Library\Configurations;

use Carbon\Carbon;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Configurations\CalendarConfiguration;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Commons\Exceptions\Configurations\ConfigurationException;

/**
 * @internal
 * @coversNothing
 */
class CalendarConfigurationTest extends TestCase
{
    public function carbonDataProvider(): array
    {
        return [
            [null, null],
            [new Carbon('2017-01-01 12:00:00', DateHelper::UTC), new Carbon('2017-01-01 12:00:00', DateHelper::UTC)],
            [new \DateTime('2017-01-01 12:00:00'), new Carbon('2017-01-01 12:00:00', DateHelper::UTC)],
            ['2017-01-01 12:00:00', new Carbon('2017-01-01 12:00:00', DateHelper::UTC)],
        ];
    }

    /**
     * @dataProvider carbonDataProvider
     *
     * @param mixed       $input
     * @param null|Carbon $expectedOutput
     *
     * @throws \ReflectionException
     * @throws ConfigurationException
     */
    public function testCastToCarbon($input, $expectedOutput)
    {
        $config = new TestConfig(['carbon' => $input]);
        $this->assertEquals($expectedOutput, $config->getCarbon());
    }
}

class TestConfig extends CalendarConfiguration
{
    protected $carbon;

    /**
     * @return mixed
     */
    public function getCarbon()
    {
        return $this->castToCarbon($this->carbon);
    }
}
