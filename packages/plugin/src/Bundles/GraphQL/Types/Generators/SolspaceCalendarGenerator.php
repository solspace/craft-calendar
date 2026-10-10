<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types\Generators;

use Solspace\Calendar\Bundles\GraphQL\Interfaces\SolspaceCalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Types\SolspaceCalendarType;

/**
 * @deprecated 6.0.0 Use the root-level CalendarGenerator instead.
 * Will be removed in 7.0.0.
 */
class SolspaceCalendarGenerator extends CalendarGenerator
{
    public static function getTypeClass(): string
    {
        return SolspaceCalendarType::class;
    }

    public static function getInterfaceClass(): string
    {
        return SolspaceCalendarInterface::class;
    }
}
