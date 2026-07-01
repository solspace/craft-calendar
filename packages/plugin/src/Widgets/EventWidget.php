<?php

namespace Solspace\Calendar\Widgets;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Resources\Bundles\WidgetEventsBundle;

class EventWidget extends AbstractWidget
{
    public ?string $title = null;

    public ?int $colspan = 1;

    public static function displayName(): string
    {
        return Calendar::t('Calendar Event');
    }

    public static function icon(): string
    {
        return '@calendar/icon-mask.svg';
    }

    public static function maxColspan(): ?int
    {
        return 1;
    }

    public function init(): void
    {
        parent::init();

        if (null === $this->title) {
            $this->title = self::displayName();
        }
    }

    public function getBodyHtml(): ?string
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
                'configuration' => [
                    'calendars' => Calendar::getInstance()->calendars->getAllAllowedCalendarTitles(),
                    'currentDay' => (new \DateTimeImmutable('now', new \DateTimeZone('UTC')))->format('Y-m-d'),
                    'formats' => DateFormatHelper::toConfig(),
                    'weekStartDay' => Calendar::getInstance()->settings->getFirstDayOfWeek(),
                    'timeInterval' => Calendar::getInstance()->settings->getTimeInterval(),
                    'eventDuration' => Calendar::getInstance()->settings->getEventDuration(),
                    'allDayDefault' => Calendar::getInstance()->settings->isAllDayDefault(),
                    'overlapThreshold' => Calendar::getInstance()->settings->getOverlapThreshold(),
                ],
            ]
        );
    }
}
