<?php

namespace Solspace\Calendar\FieldTypes;

use craft\base\ElementInterface;
use craft\elements\db\ElementQuery;
use craft\fields\BaseRelationField;
use craft\helpers\Gql as GqlHelper;
use craft\services\Gql as GqlService;
use GraphQL\Type\Definition\Type;
use Solspace\Calendar\Bundles\GraphQL\Arguments\EventArguments;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\EventInterface;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\EventResolver;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;

class EventFieldType extends BaseRelationField
{
    public static function displayName(): string
    {
        return Calendar::t('Calendar Events');
    }

    public static function defaultSelectionLabel(): string
    {
        return Calendar::t('Add an event');
    }

    /**
     * {@inheritdoc}
     */
    public static function valueType(): string
    {
        return EventQuery::class;
    }

    /**
     * @param mixed $value
     */
    public function getTableAttributeHtml(mixed $value, ElementInterface $element): string
    {
        if (\is_array($value)) {
            $html = '';
            foreach ($value as $event) {
                $html .= parent::getTableAttributeHtml([$event], $element);
            }

            return $html;
        }

        return parent::getTableAttributeHtml($value, $element);
    }

    public function getContentGqlType(): array|\GraphQL\Type\Definition\Type
    {
        $gqlType = [
            'name' => $this->handle,
            'type' => Type::listOf(EventInterface::getType()),
            'args' => EventArguments::getArguments(),
            'resolve' => EventResolver::class.'::resolve',
        ];

        if (version_compare(\Craft::$app->getVersion(), '3.6', '>=')) {
            $gqlType['complexity'] = GqlHelper::relatedArgumentComplexity(GqlService::GRAPHQL_COMPLEXITY_EAGER_LOAD);
        }

        return $gqlType;
    }

    /**
     * @param mixed $value
     *
     * @return ElementQuery|mixed
     */
    public function normalizeValue(mixed $value, ?\craft\base\ElementInterface $element = null): mixed
    {
        $query = parent::normalizeValue($value, $element);

        if ($query instanceof EventQuery) {
            $query->setLoadOccurrences(false);
        }

        return $query;
    }

    public static function elementType(): string
    {
        return Event::class;
    }
}
