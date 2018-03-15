<?php

namespace Solspace\Calendar\Widgets;

use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Resources\Bundles\WidgetEventsBundle;

class EventWidget extends AbstractWidget
{
    /** @var string */
    public $title;

    /**
     * @return string
     */
    public static function displayName(): string
    {
        return Calendar::t('Calendar Event');
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
        \Craft::$app->view->registerAssetBundle(WidgetEventsBundle::class);

        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/event/body',
            [
                'event'           => Event::create(),
                'calendarOptions' => Calendar::getInstance()->calendars->getAllAllowedCalendarTitles(),
                'settings'        => $this,
            ]
        );
    }
}