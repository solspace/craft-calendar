<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types\Generators;

use Solspace\Calendar\Bundles\GraphQL\Arguments\SolspaceCalendarArguments;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\SolspaceCalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Types\SolspaceCalendarType;

class SolspaceCalendarGenerator extends AbstractGenerator
{
    public static function getTypeClass(): string
    {
        return SolspaceCalendarType::class;
    }

    public static function getArgumentsClass(): string
    {
        return SolspaceCalendarArguments::class;
    }

    public static function getInterfaceClass(): string
    {
        return SolspaceCalendarInterface::class;
    }

    public static function getDescription(): string
    {
        return 'The Solspace Calendar entity';
    }
}
