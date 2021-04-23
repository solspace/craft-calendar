<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types\Generators;

use Solspace\Calendar\Bundles\GraphQL\Arguments\EventArguments;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\EventInterface;
use Solspace\Calendar\Bundles\GraphQL\Types\EventType;

class EventGenerator extends AbstractGenerator
{
    public static function getTypeClass(): string
    {
        return EventType::class;
    }

    public static function getArgumentsClass(): string
    {
        return EventArguments::class;
    }

    public static function getInterfaceClass(): string
    {
        return EventInterface::class;
    }

    public static function getDescription(): string
    {
        return 'The Calendar Event entity';
    }
}
