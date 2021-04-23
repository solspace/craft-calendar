<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\CalendarInterface;

class CalendarType extends AbstractObjectType
{
    public static function getName(): string
    {
        return 'CalendarType';
    }

    public static function getTypeDefinition(): Type
    {
        return CalendarInterface::getType();
    }
}
