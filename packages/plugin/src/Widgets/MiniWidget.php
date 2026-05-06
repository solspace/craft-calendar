<?php

namespace Solspace\Calendar\Widgets;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Resources\Bundles\WidgetMiniBundle;

class MiniWidget extends AbstractWidget
{
    public ?string $title = null;
    public array|string $calendars = '*';
    public ?int $siteId = null;

    public static function displayName(): string
    {
        return Calendar::t('Calendar Mini');
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

        \Craft::$app->view->registerAssetBundle(WidgetMiniBundle::class);

        $calendarLocale = \Craft::$app->locale->id;
        $calendarLocale = str_replace('_', '-', strtolower($calendarLocale));

        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/mini/body',
            [
                'settings' => $this,
                'configuration' => [
                    'siteId' => $this->siteId ?: \Craft::$app->sites->currentSite->id,
                    'calendars' => $this->calendars,
                    'currentDay' => (new \DateTimeImmutable('now', new \DateTimeZone('UTC')))->format('Y-m-d'),
                    'formats' => DateFormatHelper::toConfig(),
                    'language' => $calendarLocale,
                    'weekStartDay' => Calendar::getInstance()->settings->getFirstDayOfWeek(),
                    'overlapThreshold' => Calendar::getInstance()->settings->getOverlapThreshold(),
                ],
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
            'calendar/_widgets/mini/settings',
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
            [['calendars'], 'required'],
        ];
    }

    protected static function allowMultipleInstances(): bool
    {
        return false;
    }
}
