<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\SolspaceCalendarInterface;

/**
 * @deprecated 6.0.0 Use the root-level CalendarType instead.
 * Will be removed in 7.0.0.
 */
class SolspaceCalendarType extends CalendarType
{
    public static function getName(): string
    {
        return 'SolspaceCalendarType';
    }

    public static function getTypeDefinition(): Type
    {
        return SolspaceCalendarInterface::getType();
    }
}
