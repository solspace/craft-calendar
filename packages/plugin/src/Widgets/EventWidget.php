<?php

namespace Solspace\Calendar\Widgets;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Resources\Bundles\WidgetEventsBundle;

class EventWidget extends AbstractWidget
{
    /** @var string */
    public $title;

    public static function displayName(): string
    {
        return Calendar::t('Calendar Event');
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

        \Craft::$app->view->registerAssetBundle(WidgetEventsBundle::class);

        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/event/body',
            [
                'event' => Event::create(),
                'calendarOptions' => Calendar::getInstance()->calendars->getAllAllowedCalendarTitles(),
                'settings' => $this,
            ]
        );
    }
}
