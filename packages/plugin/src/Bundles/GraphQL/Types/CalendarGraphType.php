<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\CalendarGraphInterface;

class CalendarGraphType extends AbstractObjectType
{
    public static function getName(): string
    {
        return 'CalendarGraphType';
    }

    public static function getTypeDefinition(): Type
    {
        return CalendarGraphInterface::getType();
    }
}
