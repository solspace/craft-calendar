<?php

namespace Solspace\Calendar\Widgets;

class Calendar_MonthWidget extends BaseWidget
{
    /**
     * @inheritDoc IComponentType::getName()
     *
     * @return string
     */
    public function getName()
    {
        return Craft::t('Mini Calendar');
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
        craft()->templates->includeJsResource('calendar/js/fullcalendar/fullcalendar.js');
        craft()->templates->includeJsResource('calendar/js/calendar-fullcalendar-methods.js');
        craft()->templates->includeJsResource('calendar/js/widget/month.js');
        craft()->templates->includeCssResource('calendar/css/fullcalendar/fullcalendar.min.css');
        craft()->templates->includeCssResource('calendar/css/widget/month.css');

        $calendarLocale   = craft()->locale->id;
        $calendarLocale   = str_replace('_', '-', strtolower($calendarLocale));
        $localeModulePath = CRAFT_PLUGINS_PATH . 'calendar/resources/js/fullcalendar/lang/' . $calendarLocale . '.js';
        if (!IOHelper::fileExists($localeModulePath)) {
            $calendarLocale = 'en';
        }

        return craft()->templates->render(
            'calendar/_widgets/month/body',
            array(
                'settings'       => $this->getSettings(),
                'calendarLocale' => $calendarLocale,
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
            'calendar/_widgets/month/settings',
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
        );
    }
}
