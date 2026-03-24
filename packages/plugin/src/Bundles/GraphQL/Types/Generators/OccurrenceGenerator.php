<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types\Generators;

use Solspace\Calendar\Bundles\GraphQL\Arguments\OccurrenceArguments;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\OccurrenceInterface;
use Solspace\Calendar\Bundles\GraphQL\Types\OccurrenceType;

class OccurrenceGenerator extends AbstractGenerator
{
    public static function getTypeClass(): string
    {
        return OccurrenceType::class;
    }

    public static function getArgumentsClass(): string
    {
        return OccurrenceArguments::class;
    }

    public static function getInterfaceClass(): string
    {
        return OccurrenceInterface::class;
    }

    public static function getDescription(): string
    {
        return 'The Calendar occurrence entity';
    }
}
