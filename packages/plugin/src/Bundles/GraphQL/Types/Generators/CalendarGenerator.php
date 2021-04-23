<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types\Generators;

use Solspace\Calendar\Bundles\GraphQL\Arguments\CalendarArguments;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\CalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Types\CalendarType;

class CalendarGenerator extends AbstractGenerator
{
    public static function getTypeClass(): string
    {
        return CalendarType::class;
    }

    public static function getArgumentsClass(): string
    {
        return CalendarArguments::class;
    }

    public static function getInterfaceClass(): string
    {
        return CalendarInterface::class;
    }

    public static function getDescription(): string
    {
        return 'The Calendar entity';
    }
}
