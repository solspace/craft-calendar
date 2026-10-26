<?php

namespace Solspace\Calendar\Widgets;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Resources\Bundles\WidgetAgendaBundle;

class AgendaWidget extends AbstractWidget
{
    public const VIEWS = ['day', 'week', 'month', 'agenda'];

    public ?string $title = null;

    public ?string $view = null;

    public array|string $enabledViews = self::VIEWS;

    public array|string $calendars = '*';

    public ?int $siteId = null;

    public static function displayName(): string
    {
        return Calendar::t('Calendar Agenda');
    }

    public static function icon(): string
    {
        return '@calendar/icon-mask.svg';
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

        \Craft::$app->view->registerAssetBundle(WidgetAgendaBundle::class);

        $calendarLocale = \Craft::$app->locale->id;
        $calendarLocale = str_replace('_', '-', strtolower($calendarLocale));

        return \Craft::$app->view->renderTemplate(
            'calendar/_widgets/agenda/body',
            [
                'settings' => $this,
                'configuration' => [
                    'currentSiteId' => $this->siteId ?: \Craft::$app->sites->currentSite->id,
                    'siteHandle' => \Craft::$app->sites->getSiteById($this->siteId ?: \Craft::$app->sites->currentSite->id)?->handle,
                    'calendars' => $this->calendars,
                    'currentDay' => (new \DateTimeImmutable('now', new \DateTimeZone('UTC')))->format('Y-m-d'),
                    'formats' => DateFormatHelper::toConfig(),
                    'view' => $this->getDefaultView(),
                    'enabledViews' => $this->getEnabledViews(),
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
            [['enabledViews'], 'validateEnabledViews', 'skipOnEmpty' => false],
            [['view'], 'in', 'range' => $this->getEnabledViews()],
        ];
    }

    public function getEnabledViews(): array
    {
        $enabled = \is_array($this->enabledViews)
            ? array_values(array_filter(self::VIEWS, fn (string $view) => \in_array($view, $this->enabledViews, true)))
            : [];

        return $enabled ?: self::VIEWS;
    }

    public function getDefaultView(): string
    {
        $enabled = $this->getEnabledViews();
        if (\in_array($this->view, $enabled, true)) {
            return $this->view;
        }

        return \in_array('month', $enabled, true) ? 'month' : $enabled[0];
    }

    public function validateEnabledViews(string $attribute): void
    {
        if (!\is_array($this->enabledViews) || !$this->enabledViews || array_diff($this->enabledViews, self::VIEWS)) {
            $this->addError($attribute, Calendar::t('Select at least one valid calendar view.'));
        }
    }
}
