<?php

namespace Solspace\Calendar\FieldTypes;

use craft\base\ElementInterface;
use craft\elements\db\ElementQueryInterface;
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
     * @return string
     */
    protected static function elementType(): string
    {
        return Event::class;
    }

    public function normalizeValue($value, ElementInterface $element = null)
    {
        $query = parent::normalizeValue($value, $element);

        if ($query instanceof EventQuery) {
            $query->setLoadOccurrences(false);
        }

        return $query;
    }
}