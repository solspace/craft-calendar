<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types\Generators;

use Solspace\Calendar\Bundles\GraphQL\Arguments\CalendarGraphArguments;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\CalendarGraphInterface;
use Solspace\Calendar\Bundles\GraphQL\Types\CalendarGraphType;

class CalendarGraphGenerator extends AbstractGenerator
{
    public static function getTypeClass(): string
    {
        return CalendarGraphType::class;
    }

    public static function getArgumentsClass(): string
    {
        return CalendarGraphArguments::class;
    }

    public static function getInterfaceClass(): string
    {
        return CalendarGraphInterface::class;
    }

    public static function getDescription(): string
    {
        return 'The Calendar GraphQL root entity';
    }
}
