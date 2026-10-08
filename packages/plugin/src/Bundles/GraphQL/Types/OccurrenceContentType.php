<?php

namespace Solspace\Calendar\Bundles\GraphQL\Types;

use craft\elements\db\ElementQueryInterface;
use craft\gql\GqlEntityRegistry;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\OccurrenceContentInterface;
use Solspace\Calendar\Bundles\GraphQL\Types\Generators\OccurrenceContentGenerator;
use Solspace\Calendar\Models\OccurrenceContent;

class OccurrenceContentType extends AbstractObjectType
{
    public static function getName(): string
    {
        return 'CalendarOccurrenceContentType';
    }

    public static function getTypeDefinition(): Type
    {
        return OccurrenceContentInterface::getType();
    }

    public static function resolveType(mixed $context = null): string
    {
        if ($context instanceof OccurrenceContent) {
            $typeName = OccurrenceContentGenerator::getTypeName($context->getCalendar());
            if (GqlEntityRegistry::getEntity($typeName)) {
                return GqlEntityRegistry::prefixTypeName($typeName);
            }
        }

        return parent::resolveType($context);
    }

    protected function resolve(mixed $source, array $arguments, mixed $context, ResolveInfo $resolveInfo): mixed
    {
        if ('overriddenFields' === $resolveInfo->fieldName) {
            return $source->getOverriddenFields();
        }

        // Read through the magic getter, so a field handle like `event` gets the field's value, not getEvent()
        $value = $source->{$resolveInfo->fieldName};

        return $value instanceof ElementQueryInterface ? $value->all() : $value;
    }
}
