<?php

namespace Solspace\Calendar\Widgets;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Resources\Bundles\WidgetUpcomingEventsBundle;

class UpcomingEventsWidget extends AbstractWidget
{
    public ?string $title = null;

    public int $limit = 5;

    public array|string $calendars = '*';

    public ?int $siteId = null;

    public static function displayName(): string
    {
        return Calendar::t('Upcoming Events');
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

        \Craft::$app->view->registerAssetBundle(WidgetUpcomingEventsBundle::class);

        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/upcoming-events/body',
            [
                'settings' => $this,
            ]
        );
    }

    public function getSettingsHtml(): ?string
    {
        $siteOptions = [];
        foreach (\Craft::$app->sites->getAllSites() as $site) {
            $siteOptions[$site->id] = $site->name;
        }

        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/upcoming-events/settings',
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
            [['calendars', 'limit'], 'required'],
            [['limit'], 'integer', 'min' => 1],
        ];
    }
}
