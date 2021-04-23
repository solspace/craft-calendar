<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\SolspaceCalendarInterface;

class SolspaceCalendarType extends AbstractObjectType
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
