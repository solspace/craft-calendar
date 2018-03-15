<?php

namespace Solspace\Calendar\Widgets;

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Resources\Bundles\WidgetMonthBundle;

class MonthWidget extends AbstractWidget
{
    /** @var string */
    public $title;

    /** @var string */
    public $view;

    /** @var array */
    public $calendars = '*';

    /**
     * @return string
     */
    public static function displayName(): string
    {
        return Calendar::t('Mini Calendar');
    }

    /**
     * @inheritDoc
     */
    public function init()
    {
        parent::init();

        if (null === $this->title) {
            $this->title = self::displayName();
        }
    }

    /**
     * @return string
     */
    public function getBodyHtml(): string
    {
        \Craft::$app->view->registerAssetBundle(WidgetMonthBundle::class);

        $calendarLocale   = \Craft::$app->locale->id;
        $calendarLocale   = str_replace('_', '-', strtolower($calendarLocale));
        $localeModulePath = __DIR__ . '/../js/lib/fullcalendar/locale/' . $calendarLocale . '.js';
        if (!file_exists($localeModulePath)) {
            $calendarLocale = 'en';
        }

        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/month/body',
            [
                'locale'   => $calendarLocale,
                'settings' => $this,
            ]
        );
    }

    /**
     * @return string
     */
    public function getSettingsHtml(): string
    {
        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/month/settings',
            [
                'calendars' => Calendar::getInstance()->calendars->getAllCalendarTitles(),
                'settings'  => $this,
            ]
        );
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            [['calendars'], 'required'],
        ];
    }
}