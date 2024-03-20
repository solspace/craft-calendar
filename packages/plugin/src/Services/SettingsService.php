<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\SettingsModel;

class SettingsService extends Component
{
    public function getOverlapThreshold(): int
    {
        return $this->getSettingsModel()->overlapThreshold;
    }

    public function getTimeInterval(): int
    {
        return $this->getSettingsModel()->timeInterval;
    }

    public function getEventDuration(): int
    {
        return $this->getSettingsModel()->eventDuration;
    }

    public function isAllDayDefault(): bool
    {
        return $this->getSettingsModel()->allDay ?? false;
    }

    public function getDescriptionFieldHandle(): string
    {
        return $this->getSettingsModel()->descriptionFieldHandle;
    }

    public function getLocationFieldHandle(): string
    {
        return $this->getSettingsModel()->locationFieldHandle;
    }

    public function isDemoBannerDisabled(): bool
    {
        return $this->getSettingsModel()->isDemoBannerDisabled();
    }

    public function isMiniCalEnabled(): bool
    {
        return $this->getSettingsModel()->isMiniCalEnabled();
    }

    public function showDisabledEvents(): bool
    {
        return $this->getSettingsModel()->showDisabledEvents;
    }

    public function isQuickCreateEnabled(): bool
    {
        return $this->getSettingsModel()->quickCreateEnabled;
    }

    public function isAuthoredEventEditOnly(): bool
    {
        return (bool) $this->getSettingsModel()->authoredEventEditOnly;
    }

    /**
     * Disables the demo-install banner in month view.
     */
    public function dismissDemoBanner(): bool
    {
        $plugin = Calendar::getInstance();

        return \Craft::$app->plugins->savePluginSettings($plugin, ['demoBannerDisabled' => true]);
    }

    public function getFirstDayOfWeek(): int
    {
        if ($this->getSettingsModel()->getFirstDayOfWeek() >= 0) {
            return $this->getSettingsModel()->getFirstDayOfWeek();
        }

        if (\Craft::$app->user) {
            $user = \Craft::$app->getUsers()->getUserById((int) \Craft::$app->user->id);
            if ($user) {
                return (int) $user->getPreference('weekStartDay');
            }
        }

        return (int) \Craft::$app->config->getGeneral()->defaultWeekStartDay;
    }

    public function getPluginName(): ?string
    {
        return $this->getSettingsModel()->pluginName;
    }

    public function getSettingsModel(): SettingsModel
    {
        return Calendar::getInstance()->getSettings();
    }

    public function isAdminChangesAllowed(): bool
    {
        if (version_compare(\Craft::$app->getVersion(), '3.1', '>=')) {
            return \Craft::$app->getConfig()->getGeneral()->allowAdminChanges;
        }

        return true;
    }
}
