<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\DurationInterface;

class DurationType extends AbstractObjectType
{
    public static function getName(): string
    {
        return 'DurationType';
    }

    public static function getTypeDefinition(): Type
    {
        return DurationInterface::getType();
    }
}
