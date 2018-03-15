<?php

namespace Solspace\Calendar\Widgets;

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Resources\Bundles\WidgetAgendaBundle;
use Solspace\Calendar\Resources\Bundles\WidgetUpcomingEventsBundle;

class UpcomingEventsWidget extends AbstractWidget
{
    /** @var string */
    public $title;

    /** @var int */
    public $limit = 5;

    /** @var array */
    public $calendars = '*';

    /**
     * @return string
     */
    public static function displayName(): string
    {
        return Calendar::t('Upcoming Events');
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
        \Craft::$app->view->registerAssetBundle(WidgetUpcomingEventsBundle::class);

        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/upcoming-events/body',
            [
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
            'calendar/_widgets/upcoming-events/settings',
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
            [['calendars', 'limit'], 'required'],
            [['limit'], 'integer', 'min' => 1],
        ];
    }
}