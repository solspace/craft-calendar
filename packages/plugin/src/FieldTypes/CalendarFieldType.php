<?php

namespace Solspace\Calendar\FieldTypes;

use craft\base\ElementInterface;
use craft\base\Field;
use craft\helpers\Gql as GqlHelper;
use craft\services\Gql as GqlService;
use Solspace\Calendar\Bundles\GraphQL\Arguments\CalendarArguments;
use Solspace\Calendar\Bundles\GraphQL\Interfaces\CalendarInterface;
use Solspace\Calendar\Bundles\GraphQL\Resolvers\CalendarResolver;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\CalendarModel;
use yii\db\Schema;

class CalendarFieldType extends Field
{
    /**
     * {@inheritDoc}
     */
    public static function displayName(): string
    {
        return Calendar::t('Calendar Calendars');
    }

    /**
     * {@inheritDoc}
     */
    public static function defaultSelectionLabel(): string
    {
        return Calendar::t('Add a calendar');
    }

    /**
     * {@inheritDoc}
     */
    public function getContentColumnType(): string
    {
        return Schema::TYPE_INTEGER;
    }

    /**
     * {@inheritDoc IFieldType::getInputHtml()}.
     *
     * @param mixed $value
     */
    public function getInputHtml($value, ElementInterface $element = null): string
    {
        $calendars = Calendar::getInstance()->calendars->getAllAllowedCalendars();

        $calendarOptions = [
            '' => Calendar::t('Select a calendar'),
        ];

        /** @var CalendarModel $calendar */
        foreach ($calendars as $calendar) {
            if (\is_array($calendar)) {
                $calendarOptions[(int) $calendar['id']] = $calendar['name'];
            } elseif ($calendar instanceof CalendarModel) {
                $calendarOptions[(int) $calendar->id] = $calendar->name;
            }
        }

        return \Craft::$app->view->renderTemplate(
            'calendar/_components/fieldTypes/calendar',
            [
                'name' => $this->handle,
                'calendars' => $calendars,
                'calendarOptions' => $calendarOptions,
                'selectedCalendar' => $value instanceof CalendarModel ? $value->id : null,
            ]
        );
    }

    public function getContentGqlType()
    {
        $gqlType = [
            'name' => $this->handle,
            'type' => CalendarInterface::getType(),
            'args' => CalendarArguments::getArguments(),
            'resolve' => CalendarResolver::class.'::resolveOne',
        ];

        if (version_compare(\Craft::$app->getVersion(), '3.6', '>=')) {
            $gqlType['complexity'] = GqlHelper::relatedArgumentComplexity(GqlService::GRAPHQL_COMPLEXITY_EAGER_LOAD);
        }

        return $gqlType;
    }

    public static function supportedTranslationMethods(): array
    {
        return [];
    }

    public function getIsTranslatable(ElementInterface $element = null): bool
    {
        return false;
    }

    /**
     * {@inheritDoc}
     */
    public function serializeValue($value, ElementInterface $element = null)
    {
        if ($value instanceof CalendarModel) {
            return $value->id;
        }

        return parent::serializeValue($value, $element);
    }

    /**
     * {@inheritDoc}
     */
    public function normalizeValue($value, ElementInterface $element = null)
    {
        if ($value instanceof CalendarModel) {
            return $value;
        }

        return Calendar::getInstance()->calendars->getCalendarById((int) $value);
    }

    /**
     * {@inheritdoc}
     */
    protected function optionsSettingLabel(): string
    {
        return Calendar::t('Calendar Options');
    }
}
