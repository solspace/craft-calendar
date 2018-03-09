<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\SettingsModel;

class SettingsService extends Component
{
    /** @var SettingsModel */
    private static $settingsModel;

    /**
     * @return int
     */
    public function getOverlapThreshold(): int
    {
        return $this->getSettingsModel()->overlapThreshold;
    }

    /**
     * @return int
     */
    public function getTimeInterval(): int
    {
        return $this->getSettingsModel()->timeInterval;
    }

    /**
     * @return int
     */
    public function getEventDuration(): int
    {
        return $this->getSettingsModel()->eventDuration;
    }

    /**
     * @return bool
     */
    public function isAllDayDefault(): bool
    {
        return $this->getSettingsModel()->allDay;
    }

    /**
     * @return string
     */
    public function getDescriptionFieldHandle(): string
    {
        return $this->getSettingsModel()->descriptionFieldHandle;
    }

    /**
     * @return string
     */
    public function getLocationFieldHandle(): string
    {
        return $this->getSettingsModel()->locationFieldHandle;
    }

    /**
     * @return bool
     */
    public function isDemoBannerDisabled(): bool
    {
        return $this->getSettingsModel()->isDemoBannerDisabled();
    }

    /**
     * @return bool
     */
    public function isMiniCalEnabled(): bool
    {
        return $this->getSettingsModel()->isMiniCalEnabled();
    }

    /**
     * @return bool
     */
    public function showDisabledEvents(): bool
    {
        return $this->getSettingsModel()->showDisabledEvents;
    }

    /**
     * @return bool
     */
    public function isQuickCreateEnabled(): bool
    {
        return $this->getSettingsModel()->quickCreateEnabled;
    }

    /**
     * @return bool
     */
    public function isAuthoredEventEditOnly(): bool
    {
        return (bool) $this->getSettingsModel()->authoredEventEditOnly;
    }

    /**
     * Disables the demo-install banner in month view
     *
     * @return bool
     */
    public function dismissDemoBanner(): bool
    {
        $plugin = Calendar::getInstance();

        return \Craft::$app->plugins->savePluginSettings($plugin, ['demoBannerDisabled' => true]);
    }

    /**
     * @return SettingsModel
     */
    public function getSettingsModel(): SettingsModel
    {
        if (null === self::$settingsModel) {
            /** @var Calendar $plugin */
            $plugin              = Calendar::getInstance();
            self::$settingsModel = $plugin->getSettings();
        }

        return self::$settingsModel;
    }
}
