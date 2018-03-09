<?php

namespace Solspace\Calendar\Widgets;

class Calendar_AgendaWidget extends BaseWidget
{
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
        return CRAFT_PLUGINS_PATH . 'calendar/resources/icon-mask.svg';
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
        craft()->templates->includeJsResource('calendar/js/fullcalendar/fullcalendar.js');
        craft()->templates->includeJsResource('calendar/js/calendar-fullcalendar-methods.js');
        craft()->templates->includeJsResource('calendar/js/widget/agenda.js');
        craft()->templates->includeCssResource('calendar/css/fullcalendar/fullcalendar.min.css');
        craft()->templates->includeCssResource('calendar/css/widget/agenda.css');

        $calendarLocale   = craft()->locale->id;
        $calendarLocale   = str_replace('_', '-', strtolower($calendarLocale));
        $localeModulePath = CRAFT_PLUGINS_PATH . 'calendar/resources/js/fullcalendar/lang/' . $calendarLocale . '.js';
        if (!IOHelper::fileExists($localeModulePath)) {
            $calendarLocale = 'en';
        }

        return craft()->templates->render(
            'calendar/_widgets/agenda/body',
            array(
                'calendarLocale' => $calendarLocale,
                'settings'       => $this->getSettings(),
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
            'calendar/_widgets/agenda/settings',
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
            'view'      => array(AttributeType::String, 'required' => true),
            'calendars' => array(AttributeType::Mixed, 'required' => true),
        );
    }
}
