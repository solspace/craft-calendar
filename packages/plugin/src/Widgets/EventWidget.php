<?php

namespace Solspace\Calendar\Widgets;

use craft\helpers\UrlHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Library\Helpers\PermissionHelper;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Resources\Bundles\WidgetEventsBundle;

class EventWidget extends AbstractWidget
{
    public ?string $title = null;
    public ?int $colspan = 1;
    public array|string $calendars = '*';
    public ?int $siteId = null;
    public bool $showRepeating = true;
    public bool $showDetails = true;
    public bool $showOverlapWarnings = true;
    public bool $showMoreDetails = true;

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
        $plugin = Calendar::getInstance();
        if (!$plugin->isPro()) {
            return Calendar::t("Requires <a href='{link}'>Pro</a> edition", ['link' => UrlHelper::cpUrl('plugin-store/calendar')]);
        }

        \Craft::$app->view->registerAssetBundle(WidgetEventsBundle::class);
        $currentSiteId = $this->siteId ?: \Craft::$app->sites->currentSite->id;
        $selectedIds = '*' === $this->calendars ? null : array_map('strval', (array) $this->calendars);
        $configuration = [
            'calendars' => [],
            'calendarColors' => [],
            'calendarAllowRepeating' => [],
            'quickCreateFields' => [],
            'quickCreateRequiredFields' => [],
            'currentSiteId' => $currentSiteId,
            'siteHandle' => \Craft::$app->sites->getSiteById($currentSiteId)?->handle,
            'language' => str_replace('_', '-', \Craft::$app->language),
            'currentDay' => (new \DateTimeImmutable('now', new \DateTimeZone('UTC')))->format('Y-m-d'),
            'formats' => DateFormatHelper::toConfig(),
            'weekStartDay' => $plugin->settings->getFirstDayOfWeek(),
            'timeInterval' => $plugin->settings->getTimeInterval(),
            'eventDuration' => $plugin->settings->getEventDuration(),
            'allDayDefault' => $plugin->settings->isAllDayDefault(),
            'overlapThreshold' => $plugin->settings->getOverlapThreshold(),
            'showOverlapWarnings' => $this->showOverlapWarnings && $plugin->settings->showOverlapWarnings(),
            'showMoreDetails' => $this->showMoreDetails,
        ];
        foreach ($this->getCreatableCalendars($currentSiteId) as $calendar) {
            if (null !== $selectedIds && !\in_array((string) $calendar->id, $selectedIds, true)) {
                continue;
            }
            $id = $calendar->id;
            $configuration['calendars'][$id] = $calendar->name;
            $configuration['calendarColors'][$id] = $calendar->color;
            $configuration['calendarAllowRepeating'][$id] = $this->showRepeating && $calendar->allowRepeatingEvents;
            $required = $calendar->getQuickCreateRequiredFields();
            $fields = $calendar->getQuickCreateFieldHandles();
            $configuration['quickCreateFields'][$id] = array_filter(
                $fields,
                fn ($handle, $name) => $this->showDetails || ($required[$name] ?? false),
                \ARRAY_FILTER_USE_BOTH
            );
            $configuration['quickCreateRequiredFields'][$id] = $required;
        }

        return \Craft::$app->view->renderTemplate('calendar/_widgets/event/body', ['configuration' => $configuration]);
    }

    public function getSettingsHtml(): ?string
    {
        $calendars = [];
        foreach ($this->getCreatableCalendars() as $calendar) {
            $calendars[$calendar->id] = $calendar->name;
        }
        $siteOptions = [];
        foreach (\Craft::$app->sites->getEditableSites() as $site) {
            $siteOptions[$site->id] = $site->name;
        }

        return \Craft::$app->view->renderTemplate('calendar/_widgets/event/settings', [
            'settings' => $this,
            'calendars' => $calendars,
            'siteOptions' => $siteOptions,
        ]);
    }

    public function rules(): array
    {
        return [
            [['calendars'], 'required'],
            [['siteId'], 'integer', 'min' => 1],
            [['showRepeating', 'showDetails', 'showOverlapWarnings', 'showMoreDetails'], 'boolean'],
        ];
    }

    private function getCreatableCalendars(?int $siteId = null): array
    {
        return array_filter(
            Calendar::getInstance()->calendars->getAllAllowedCalendars(),
            static fn (CalendarModel $calendar) => PermissionHelper::canEditCalendar($calendar)
                && (!$siteId || $calendar->getSiteSettingsForSite($siteId))
        );
    }
}
