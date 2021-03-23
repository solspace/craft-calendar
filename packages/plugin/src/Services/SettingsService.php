<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\SettingsModel;

class SettingsService extends Component
{
    /** @var SettingsModel */
    private static $settingsModel;

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
        return $this->getSettingsModel()->allDay;
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

    /**
     * @return null|string
     */
    public function getPluginName()
    {
        return $this->getSettingsModel()->pluginName;
    }

    public function getSettingsModel(): SettingsModel
    {
        if (null === self::$settingsModel) {
            /** @var Calendar $plugin */
            $plugin = Calendar::getInstance();
            self::$settingsModel = $plugin->getSettings();
        }

        return self::$settingsModel;
    }

    public function isAdminChangesAllowed(): bool
    {
        if (version_compare(\Craft::$app->getVersion(), '3.1', '>=')) {
            return \Craft::$app->getConfig()->getGeneral()->allowAdminChanges;
        }

        return true;
    }
}
