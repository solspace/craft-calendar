<?php

namespace Solspace\Calendar\FieldTypes;

use craft\base\ElementInterface;
use craft\elements\db\ElementQuery;
use craft\fields\BaseRelationField;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Db\EventQuery;
use Solspace\Calendar\Elements\Event;

class EventFieldType extends BaseRelationField
{
    /**
     * @return string
     */
    public static function displayName(): string
    {
        return Calendar::t('Calendar Events');
    }

    /**
     * @return string
     */
    public static function defaultSelectionLabel(): string
    {
        return Calendar::t('Add an event');
    }

    /**
     * @inheritdoc
     */
    public static function valueType(): string
    {
        return EventQuery::class;
    }

    /**
     * @return string
     */
    protected static function elementType(): string
    {
        return Event::class;
    }

    /**
     * @param mixed            $value
     * @param ElementInterface $element
     *
     * @return string
     */
    public function getTableAttributeHtml($value, ElementInterface $element): string
    {
        if (is_array($value)) {
            $html = '';
            foreach ($value as $event) {
                $html .= parent::getTableAttributeHtml([$event], $element);
            }

            return $html;
        }

        return parent::getTableAttributeHtml($value, $element);
    }

    /**
     * @param mixed                 $value
     * @param ElementInterface|null $element
     *
     * @return ElementQuery|mixed
     */
    public function normalizeValue($value, ElementInterface $element = null)
    {
        $query = parent::normalizeValue($value, $element);

        if ($query instanceof EventQuery) {
            $query->setLoadOccurrences(false);
        }

        return $query;
    }
}