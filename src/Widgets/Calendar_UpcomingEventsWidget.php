<?php

namespace Solspace\Calendar\Widgets;

class Calendar_UpcomingEventsWidget extends BaseWidget
{
    /**
     * @inheritDoc IComponentType::getName()
     *
     * @return string
     */
    public function getName()
    {
        return Craft::t('Upcoming Events');
    }

    /**
     * @return string
     */
    public function getIconPath()
    {
        $icon = CRAFT_PLUGINS_PATH . 'calendar/resources/icon-mask.svg';

        return $icon;
    }

    /**
     * @inheritDoc IWidget::getTitle()
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->getSettings()->title ?: $this->getName();
    }

    /**
     * @return string
     */
    public function getBodyHtml()
    {
        craft()->templates->includeCssResource('calendar/css/widget/upcoming-events.css');

        return craft()->templates->render(
            'calendar/_widgets/upcoming-events/body',
            array(
                'settings' => $this->getSettings(),
            )
        );
    }

    /**
     * @inheritDoc ISavableComponentType::getSettingsHtml()
     *
     * @return string
     */
    public function getSettingsHtml()
    {
        /** @var Calendar_CalendarsService $calendarsService */
        $calendarsService = craft()->calendar_calendars;

        $calendars = $calendarsService->getAllCalendarTitles();
        $settings  = $this->getSettings();

        return craft()->templates->render(
            'calendar/_widgets/upcoming-events/settings',
            array(
                'calendars' => $calendars,
                'settings'  => $settings,
            )
        );
    }

    /**
     * @inheritDoc BaseSavableComponentType::defineSettings()
     *
     * @return array
     */
    protected function defineSettings()
    {
        return array(
            'title'     => array(AttributeType::Name),
            'calendars' => array(AttributeType::Mixed, 'required' => true),
            'limit'     => array(AttributeType::Number, 'min' => 1, 'default' => 5),
        );
    }
}
