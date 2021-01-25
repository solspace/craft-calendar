<?php

namespace Solspace\Calendar\Widgets;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Resources\Bundles\WidgetAgendaBundle;

class AgendaWidget extends AbstractWidget
{
    /** @var string */
    public $title;

    /** @var string */
    public $view;

    /** @var array */
    public $calendars = '*';

    /** @var int */
    public $siteId;

    public static function displayName(): string
    {
        return Calendar::t('Calendar Agenda');
    }

    /**
     * {@inheritDoc}
     */
    public function init()
    {
        parent::init();

        if (null === $this->title) {
            $this->title = self::displayName();
        }
    }

    public function getBodyHtml(): string
    {
        if (!Calendar::getInstance()->isPro()) {
            return Calendar::t(
                "Requires <a href='{link}'>Pro</a> edition",
                ['link' => UrlHelper::cpUrl('plugin-store/calendar')]
            );
        }

        \Craft::$app->view->registerAssetBundle(WidgetAgendaBundle::class);

        $calendarLocale = \Craft::$app->locale->id;
        $calendarLocale = str_replace('_', '-', strtolower($calendarLocale));
        $localeModulePath = __DIR__.'/../js/lib/fullcalendar/locale/'.$calendarLocale.'.js';
        if (!file_exists($localeModulePath)) {
            $calendarLocale = 'en';
        }

        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/agenda/body',
            [
                'locale' => $calendarLocale,
                'settings' => $this,
            ]
        );
    }

    public function getSettingsHtml(): string
    {
        $siteOptions = [];
        foreach (\Craft::$app->sites->getAllSites() as $site) {
            $siteOptions[$site->id] = $site->name;
        }

        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/agenda/settings',
            [
                'calendars' => Calendar::getInstance()->calendars->getAllCalendarTitles(),
                'settings' => $this,
                'siteOptions' => $siteOptions,
            ]
        );
    }

    public function rules(): array
    {
        return [
            [['view', 'calendars'], 'required'],
        ];
    }
}
