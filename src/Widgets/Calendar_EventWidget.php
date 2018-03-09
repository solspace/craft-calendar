<?php

namespace Solspace\Calendar\Widgets;

class Calendar_EventWidget extends BaseWidget
{
    /** @var bool */
    public $multipleInstances = true;

    /**
     * @inheritDoc IComponentType::getName()
     *
     * @return string
     */
    public function getName()
    {
        return Craft::t('Calendar Agenda');
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
     * @inheritDoc IWidget::getBodyHtml()
     *
     * @return string|false
     */
    public function getBodyHtml()
    {
        /** @var Calendar_SettingsModel $pluginSettings */
        $pluginSettings = craft()->plugins->getPlugin('calendar')->getSettings();

        /** @var Calendar_CalendarsService $calendarsService */
        $calendarsService = craft()->calendar_calendars;

        craft()->templates->includeJsResource('calendar/js/widget/event.js');
        craft()->templates->includeCssResource('calendar/css/widget/event.css');
        return craft()->templates->render(
            'calendar/_widgets/event/body',
            array(
                'event'           => new Calendar_EventModel(),
                'calendarOptions' => $calendarsService->getAllAllowedCalendarTitles(),
                'settings'        => $this->getSettings(),
            )
        );
    }

    /**
     * @return int
     */
    public function getColspan()
    {
        return 1;
    }
}
