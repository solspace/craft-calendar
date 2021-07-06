<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types\Generators;

use Solspace\Calendar\Bundles\GraphQL\Arguments\DurationArguments;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\DurationInterface;
use Solspace\Calendar\Bundles\GraphQL\Types\DurationType;

class DurationGenerator extends AbstractGenerator
{
    public static function getTypeClass(): string
    {
        return DurationType::class;
    }

    public static function getArgumentsClass(): string
    {
        return DurationArguments::class;
    }

    public static function getInterfaceClass(): string
    {
        return DurationInterface::class;
    }

    public static function getDescription(): string
    {
        return 'The event duration object';
    }
}
